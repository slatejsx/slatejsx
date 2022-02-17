import { Transforms, Path, Editor } from 'slate';
import { ReactEditor } from 'slate-react';

const deleteNode = (editor, element, at = null) => {
    if (!at) {
        at = ReactEditor.findPath(editor, element);
    }
    // 判断当前内容同级别是否还有内容，如果只有自己，则只清空格式
    let [el,] = Editor.node(editor, {})
    el = getFromNodeEntry(el, Path.parent(at))
    if (el.children.length > 1) {
        Transforms.removeNodes(editor, { at });
    } else {
        Transforms.removeNodes(editor, { at });
        const node = {
            type: 'paragraph',
            children: [{ text: '' }],
        }
        Transforms.insertNodes(editor, node, { at })
    }
}

const insertNextEmptyNode = (editor, element) => {
    const node = {
        type: 'paragraph',
        children: [{ text: '' }],
    }

    const at = ReactEditor.findPath(editor, element);

    Transforms.insertNodes(editor, node, { at: Path.next(at) })
}

const insertPreviousEmptyNode = (editor, element) => {
    const node = {
        type: 'paragraph',
        children: [{ text: '' }],
    }

    const at = ReactEditor.findPath(editor, element);

    Transforms.insertNodes(editor, node, { at })
}

const getFromNodeEntry = (nodeEntry, path) => {
    let element = nodeEntry

    for (var i of path) {
        element = element.children[i]
    }

    return element
}

export { deleteNode, insertNextEmptyNode, insertPreviousEmptyNode }