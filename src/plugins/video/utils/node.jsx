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

const setVideo = (editor, element, src) => {
    if (element) {
        const at = ReactEditor.findPath(editor, element);
        const cardBlock = {
            type: 'video',
            src: src,
            width: 700,
            children: [
                {
                    text: '',
                }
            ]
        };

        Transforms.setNodes(editor, cardBlock, { at });
    }
}

const setTextAlign = (editor, element, textAlign) => {
    setNodeTag(editor, element, 'textAlign', textAlign)
}

const setWidth = (editor, element, width) => {
    if (width < 40 || width > 2000) {
        return
    }

    setNodeTag(editor, element, 'width', width)
}

export { setTextAlign, setWidth, setVideo }