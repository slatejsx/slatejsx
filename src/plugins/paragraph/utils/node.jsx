import { Transforms, Range, Editor, Element as SlateElement } from 'slate';
import { ReactEditor } from 'slate-react';


const setNodeTag = (editor, element, key, value, at = null) => {
    if (at) {
        Transforms.setNodes(editor, { [key]: value }, { at: at });
    } else if (!element) {
        // 如果没有传入对象，则操作当前行
        Transforms.setNodes(editor, { [key]: value });
    } else {
        const checkedAt = ReactEditor.findPath(editor, element);
        Transforms.setNodes(editor, { [key]: value }, { at: checkedAt });
    }
}

const setChecked = (editor, element, checked) => {
    setNodeTag(editor, element, 'checked', checked);
}

const setTitle = (editor, element, title) => {
    setNodeTag(editor, element, 'title', title);
}

const setTextAlign = (editor, element, textAlign) => {
    setNodeTag(editor, element, 'textAlign', textAlign);
}

const setQuote = (editor, element, quote) => {
    setNodeTag(editor, element, 'quote', quote);
}

// 设置有序列表的前边顺序符
const setListOrder = (editor, element, listOrder, path = null) => {
    setNodeTag(editor, element, 'listOrder', listOrder, path);

    // 向下查找，把下边连接的相同区域的有序列表序号都重置
    if (!!path) {
        setNextListOrder(editor, element, path, listOrder + 1);
    } else if (!!element) {
        const path = ReactEditor.findPath(editor, element);
        setNextListOrder(editor, element, path, listOrder + 1);
    } else {
        const { selection } = editor;
        // 如果不是光标点，不操作
        if (!selection || !Range.isCollapsed(selection)) {
            return;
        }
        // 获取当前对象
        const block = Editor.above(editor, {
            match: n => Editor.isBlock(editor, n),
        });
        if (!block) {
            return;
        }
        const [el, path] = block;
        setNextListOrder(editor, el, path, listOrder + 1);
    }
};

const setNextListOrder = (editor, element, path, listOrder) => {
    // 这个函数在insertBreak的时候有bug，path是准的，但是内容不准
    const nextBlock = Editor.next(editor, { at: path });

    if (!nextBlock) {
        return;
    }

    const [el, nextPath] = nextBlock;
    // 如果下一个不是有序列表，不做操作
    if (!!el.type && el.type != 'paragraph') {
        return;
    }
    if (!el.list || el.list != 'ol') {
        return;
    }

    const nowOffset = element.indentation || 0;
    const nextOffset = el.indentation || 0;

    // 如果缩进不一致，不做操作
    if (nowOffset != nextOffset) {
        return;
    }

    setListOrder(editor, el, listOrder, nextPath);
};

const setList = (editor, element, list) => {
    // 如果是去除list效果，则所有附加属性全部清空
    if (!list) {
        setNodeTag(editor, element, 'list', null);
        setNodeTag(editor, element, 'checked', null);
        setNodeTag(editor, element, 'listOrder', null);
    } else {
        setNodeTag(editor, element, 'list', list);
        if (list != 'checkbox') {
            setNodeTag(editor, element, 'checked', null);
        }
        if (list != 'ol') {
            setNodeTag(editor, element, 'listOrder', null);
        }
    }
};

const setIndentation = (editor, element, indentation, at = null) => {
    if (!indentation || indentation <= 0) {
        setNodeTag(editor, element, 'indentation', null, at);
    } else {
        setNodeTag(editor, element, 'indentation', indentation, at);
    }
}

const wrapLink = (editor) => {
    const { selection } = editor
    if (!selection) {
        return
    }

    const isCollapsed = Range.isCollapsed(selection)
    if (isCollapsed) {
        return
    }

    const link = {
        type: 'link',
        url: 'http://',
        target: '_self',
        children: [],
    }

    Transforms.wrapNodes(editor, link, { split: true })
}

const unWrapLink = (editor, element = null) => {
    if (element) {
        const at = ReactEditor.findPath(editor, element);
        Transforms.unwrapNodes(editor, {
            match: n =>
                !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
            at
        })
    } else {
        Transforms.unwrapNodes(editor, {
            match: n =>
                !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',

        })
    }
}

const setURL = (editor, element, url) => {
    if (element.type && element.type === 'link') {
        setNodeTag(editor, element, 'url', url);
    }
}

const setLinkTarget = (editor, element, target) => {
    if (element.type && element.type === 'link') {
        setNodeTag(editor, element, 'target', target);
    }
}

const setStarNum = (editor, element, number) => {
    setNodeTag(editor, element, 'number', number);
}

const insertStar = (editor) => {
    const star = {
        type: 'star',
        number: 5,
        children: [{ text: '' }],
    }
    Transforms.insertNodes(editor, star)
}

export {
    setChecked,
    setTitle,
    setTextAlign,
    setQuote,
    setList,
    setListOrder,
    setIndentation,
    wrapLink,
    unWrapLink,
    setURL,
    setLinkTarget,
    insertStar,
    setStarNum,
}