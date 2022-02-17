import { Transforms, Editor } from 'slate';
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

const setImage = (editor, element, src) => {
    if (element) {
        const at = ReactEditor.findPath(editor, element);
        const cardBlock = {
            type: 'image',
            src: src,
            width: 300,
            children: [
                {
                    text: '',
                }
            ]
        };

        Transforms.setNodes(editor, cardBlock, { at });
    }
}

// 插入图片，如果行是空的就在本行插入
const insertImage = (editor, src) => {
    const block = Editor.above(editor, {
        match: n => Editor.isBlock(editor, n),
    });
    if (!!block) {
        const [element] = block
        const image = {
            type: 'image',
            width: 300,
            src,
            children: [{ text: '' }]
        }

        if (editor.isEmpty(element)) {
            Transforms.setNodes(editor, image);
        } else {
            Transforms.insertNodes(editor, image);
        }
    }
};


const getInsertImageCallBack = (editor, element) => {
    return (src) => {
        insertImage(editor, src)
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

export { insertImage, setTextAlign, setWidth, getInsertImageCallBack, setImage }