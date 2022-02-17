import { ReactEditor } from 'slate-react';
import { Editor, Range, Transforms, Point, Path } from 'slate';
import { setTitle, setQuote, setList, setListOrder, setIndentation } from './utils/node';

const formatPrinter = (editor, format) => {
    if (format['normal'].length > 0) {
        const normalArr = format['normal']
        for (var i = 0; i < normalArr.length; i++) {
            // 修改基础样式
            Editor.addMark(editor, normalArr[i], true)
        }
    }
    if (format['fontColor']) {
        Editor.addMark(editor, 'fontColor', format['fontColor'])
    }
    if (format['backgroundColor']) {
        // 修改背景色
        Editor.addMark(editor, 'backgroundColor', format['backgroundColor'])
    }
}

const insertEndBreak = (editor, element, path) => {
    const nextData = {
        ...element,
        children: [
            {
                text: ''
            }
        ]
    }

    const at = Path.next(path)
    Transforms.insertNodes(editor, nextData, { at })

    if (element.title) {
        Transforms.setNodes(editor, { ['title']: null }, { at })
    }

    const point = Editor.start(editor, at)
    Transforms.select(editor, { anchor: point, focus: point });
}

const withParagraph = editor => {
    const { insertText, insertBreak, deleteBackward, insertData, getFragment, isEmpty, onTabDown, normalizeNode } = editor

    // 保证第一行是title
    editor.normalizeNode = ([node, path]) => {
        if (path.length === 0) {
            const line1 = editor.children[0]
            if (line1.type !== 'paragraph' || line1.title !== 'h1') {
                const titleLine = {
                    type: 'paragraph',
                    title: 'h1',
                    children: [
                        {
                            text: '',
                        }
                    ],
                }
                Transforms.insertNodes(editor, titleLine, { at: [0] })
            }
        }

        return normalizeNode([node, path])
    }


    // 重写部分拷贝方法，保证纯paragraph拷贝时，不拷贝父元素属性
    editor.getFragment = () => {
        let fragment = getFragment()

        while (true) {
            if (fragment.length > 1) {
                // 只有纯文本段落的，就返回段落
                let allParagraph = true
                for (var child of fragment) {
                    if (child.type !== 'paragraph') {
                        allParagraph = false
                        break
                    }
                }
                if (allParagraph) {
                    return fragment
                }

                // 如果不是段落文本，则不处理
                break
            }

            if (fragment.length === 0) {
                break
            }

            const current = fragment[0]
            if (!current.type || !current.children) {
                break
            }

            if (current.type === 'paragraph') {
                return fragment
            }

            fragment = current.children
        }

        return getFragment()
    }

    // 插入拦截
    editor.insertText = text => {
        const { selection } = editor;

        const block = Editor.above(editor, {
            match: n => Editor.isBlock(editor, n),
        });

        const isCollapsed = Range.isCollapsed(selection)

        // 处理markdown指令
        if (block) {
            const [element, path] = block;

            // 未设置类型或者是paragraph，同时输入了空格，并且有光标
            if (text === ' ' && element.type === 'paragraph' && isCollapsed) {
                const { anchor } = selection;
                const start = Editor.start(editor, path);
                const range = { anchor, focus: start };
                const beforeText = Editor.string(editor, range);
                const config = markdownKeys[beforeText];

                // 正常的模式，config内容存在，则命中markdow语法，删除辅助词
                if (config) {
                    Transforms.select(editor, range);
                    Transforms.delete(editor);

                    // 正常的模式
                    if (config.key === 'title') {
                        setTitle(editor, null, config.value);
                        return;
                    }
                    if (config.key === 'quote') {
                        setQuote(editor, null, config.value);
                        return;
                    }
                    if (config.key === 'list') {
                        setList(editor, null, config.value);
                        return;
                    }
                }

                // 有序列表处理
                const r = /^\+?[1-9][0-9]*$/;
                const strArr = beforeText.split('.');
                if (strArr.length === 2 && r.test(strArr[0])) {
                    const order = parseInt(strArr[0]);

                    if (order > 0) {
                        Transforms.select(editor, range);
                        Transforms.delete(editor);
                        setList(editor, null, 'ol');
                        setListOrder(editor, null, order);

                        return;
                    }
                }
            }
        }

        // 处理格式刷
        if (!isCollapsed && text.indexOf('&_FORMAT_CACHE') === 0) {
            const format = JSON.parse(text.split('&_FORMAT_CACHE')[1])
            if (format) {
                formatPrinter(editor, format)

                return
            }
        }

        insertText(text);
    };

    editor.insertData = data => {
        const text = data.getData('text/plain');
        const { selection } = editor;
        // 处理格式刷
        if (!Range.isCollapsed(selection) && text.indexOf('&_FORMAT_CACHE') === 0) {
            const format = JSON.parse(text.split('&_FORMAT_CACHE')[1])
            if (format) {
                formatPrinter(editor, format)

                return
            }
        }

        insertData(data)
    }

    // 分行事件，主要处理list和缩进相关
    editor.insertBreak = () => {
        const block = Editor.above(editor, {
            match: n => Editor.isBlock(editor, n),
        });
        if (!!block) {
            const [element, path] = block;

            if (element.type === 'paragraph') {
                // 对所有富文本在第一个位置点击分行。则减少缩进不分行。
                const { selection } = editor;
                // 判断是不是光标
                if (element.list && !!selection && Range.isCollapsed(selection)) {
                    const { anchor } = selection;
                    const start = Editor.start(editor, path);
                    const range = { anchor, focus: start };

                    // 如果是list在块的第一个位置拆分，则不做拆分，改为减少缩进
                    if (Range.isCollapsed(range)) {
                        // 如果是没有缩进了，则删除list效果
                        if (!element.indentation || element.indentation <= 0) {
                            setList(editor, null, null);
                        } else {
                            setIndentation(editor, null, element.indentation - 1, path);
                        }

                        return;
                    }
                }

                const end = Editor.end(editor, path)

                // 如果是对有序列表的分行
                if (!!element.list && element.list === 'ol') {
                    // 换行不带上行样式
                    if (Point.equals(selection.anchor, end)) {
                        insertEndBreak(editor, element, path)
                    } else {
                        insertBreak();
                    }

                    setListOrder(editor, null, element.listOrder + 1)
                    return
                }

                // 换行不带上行样式
                if (Point.equals(selection.anchor, end)) {
                    insertEndBreak(editor, element, path)
                    return
                }
            }
        }

        insertBreak();
    };

    editor.deleteBackward = (...args) => {
        const block = Editor.above(editor, {
            match: n => Editor.isBlock(editor, n),
        });
        if (!!block) {
            const [element, path] = block;

            if (element.type === 'paragraph') {
                // 对所有富文本在第一个位置点击分行。则减少缩进不分行。
                const { selection } = editor;
                // 判断是不是光标
                if (!!selection && Range.isCollapsed(selection)) {
                    const { anchor } = selection;
                    const start = Editor.start(editor, path);
                    const range = { anchor, focus: start };

                    // 如果是第一个位置，则处理
                    if (Range.isCollapsed(range)) {
                        // 如果是list效果，优先删除效果
                        if (element.list) {
                            setList(editor, null, null);
                            return;
                        }
                        // 如果不是list，但是有缩进，先删除缩进
                        if (element.indentation && element.indentation > 0) {
                            setIndentation(editor, null, element.indentation - 1, path);
                            return;
                        }
                    }
                }
            }
        }

        deleteBackward(...args);
    };

    // 当前行是不是一个空的
    editor.isEmpty = element => {
        if (element.type === 'paragraph') {
            const at = ReactEditor.findPath(editor, element);
            const text = Editor.string(editor, at);
            // 文本如果没空就是没空
            if (text !== '') {
                return false;
            }

            // 还有字段标记，则认为非空
            if (
                !!element.list ||
                !!element.quote ||
                !!element.title ||
                !!element.textAlign ||
                !!element.indentation ||
                !!element.listOrder
            ) {
                return false;
            }

            // 兼容星星还有却判断为空的case
            if (element.children && element.children.length > 1) {
                return false
            }

            return true;
        }

        // 最底层的，直接用Editor提供的判断
        return isEmpty(element)
    };

    // 输入tab事件拦截，return的是true就代码事件被重置
    editor.onTabDown = () => {
        const block = Editor.above(editor, {
            match: n => Editor.isBlock(editor, n),
        });
        if (!!block) {
            const [element, path] = block;

            if (!element.type || element.type === 'paragraph') {
                const offset = element.indentation || 0;
                setIndentation(editor, null, offset + 1, path);

                return true;
            }
        }

        if (!onTabDown) {
            return false
        }

        return onTabDown()
    };

    return editor
}

const withLink = editor => {
    const { isInline } = editor

    editor.isInline = element => element.type === 'link' || isInline(element)

    return editor
}

const withStar = editor => {
    const { isInline, isVoid, isEmpty } = editor

    editor.isInline = element => element.type === 'star' || isInline(element)

    editor.isVoid = element => {
        return element.type === 'star' ? true : isVoid(element);
    }

    editor.isEmpty = element => {
        if (element.type === 'star') {
            return false
        }

        return isEmpty(element)
    }

    return editor
}

// 支持的markdown快捷键
const markdownKeys = {
    '#': {
        key: 'title',
        value: 'h1',
    },
    '##': {
        key: 'title',
        value: 'h2',
    },
    '###': {
        key: 'title',
        value: 'h3',
    },
    '####': {
        key: 'title',
        value: 'h4',
    },
    '#####': {
        key: 'title',
        value: 'h5',
    },
    '>': {
        key: 'quote',
        value: 'quote',
    },
    '》': { // 兼容中文输入法
        key: 'quote',
        value: 'quote',
    },
    '*': {
        key: 'list',
        value: 'ul',
    },
    '+': {
        key: 'list',
        value: 'ul',
    },
    '-': {
        key: 'list',
        value: 'ul',
    },
    '[]': {
        key: 'list',
        value: 'checkbox',
    },
    '【】': { // 兼容中文输入法
        key: 'list',
        value: 'checkbox',
    },
};

export { withParagraph, withLink, withStar }