import {
    Editor,
    Range,
    Point,
    Element as SlateElement,
    Transforms,
    Node,
    Path,
} from 'slate'

const withCode = editor => {
    const { isEmpty, deleteBackward, insertFragment } = editor

    editor.isEmpty = element => {
        if (element.type === 'code') {
            return false
        }

        return isEmpty(element)
    }

    editor.insertFragment = node => {
        if (!Array.isArray(node)) {
            insertFragment(node)
            return
        }

        const { selection } = editor

        if (selection) {
            const { anchor, focus } = selection
            const commom = Node.common(editor, anchor.path, focus.path)
            const path = commom[1]

            // 获得tablePath
            let codePath = [...path]
            while (true) {
                // 如果不是在同一个table中，不再继续处理
                if (codePath.length == 0) {
                    return insertFragment(node)
                }

                const n = Node.get(editor, codePath)
                if (n.type && n.type == 'code') {
                    break
                }

                codePath = Path.parent(codePath)
            }

            const texts = []
            for (var child of node) {
                if (child.type === 'code') {
                    for (var c of child.children) {
                        texts.push({
                            type: 'codeLine',
                            children: [
                                {
                                    text: Node.string(c)
                                }
                            ]
                        })
                    }
                } else {
                    texts.push({
                        type: 'codeLine',
                        children: [
                            {
                                text: Node.string(child)
                            }
                        ]
                    })
                }
            }

            Transforms.insertNodes(editor, texts)

            return
        }

        return insertFragment(node)
    }

    editor.deleteBackward = unit => {
        const { selection } = editor

        if (selection && Range.isCollapsed(selection)) {
            const [code] = Editor.nodes(editor, {
                match: n =>
                    !Editor.isEditor(n) &&
                    SlateElement.isElement(n) &&
                    n.type === 'code',
            })

            if (code) {
                const [, codePath] = code
                const start = Editor.start(editor, codePath)

                if (Point.equals(selection.anchor, start)) {
                    Transforms.setNodes(editor, { type: 'paragraph' }, { at: [...codePath, 0] })

                    deleteBackward(unit)

                    return
                }
            }
        }

        deleteBackward(unit)
    }

    return editor
}

const withCodeLine = editor => {
    const { isEmpty, insertBreak, insertText, onTabDown } = editor

    editor.isEmpty = element => {
        if (element.type === 'codeLine') {
            return false
        }

        return isEmpty(element)
    }

    // 输入tab事件拦截，return的是true就代码事件被重置
    editor.onTabDown = () => {
        const block = Editor.above(editor, {
            match: n => Editor.isBlock(editor, n),
        });
        if (!!block) {
            const [element, path] = block;

            if (!element.type || element.type === 'codeLine') {
                insertText("\t");

                return true;
            }
        }

        if (!onTabDown) {
            return false
        }

        return onTabDown();
    };

    editor.insertBreak = () => {
        const block = Editor.above(editor, {
            match: n => Editor.isBlock(editor, n),
        });
        if (!!block) {
            const [element, path] = block;

            if (element.type && element.type == 'codeLine') {
                const codeArr = Editor.string(editor, path).split(/\t/);

                if (codeArr.length === 1) {
                    insertBreak();
                } else {
                    const tabArr = [];
                    for (let i = 0; i < codeArr.length - 1; i++) {
                        if (codeArr[i] != '') {
                            break
                        }

                        tabArr.push("\t");
                    }
                    insertBreak();

                    if (tabArr.length > 0) {
                        insertText(tabArr.join(''));
                    }
                }

                return;
            }
        }

        insertBreak();
    };


    return editor
}

export { withCode, withCodeLine }