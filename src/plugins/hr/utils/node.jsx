import { Transforms } from 'slate';
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

const setHr = (editor, element) => {
    setNodeTag(editor, element, 'type', 'hr')
}

export { setHr }