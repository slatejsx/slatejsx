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

const setIcon = (editor, element, icon) => {
    setNodeTag(editor, element, 'icon', icon)
}

const setIconColor = (editor, element, iconColor) => {
    setNodeTag(editor, element, 'iconColor', iconColor)
}

const setCardType = (editor, element, cardType) => {
    setNodeTag(editor, element, 'cardType', cardType)
}

const setCard = (editor, element) => {
    if (element) {
        const at = ReactEditor.findPath(editor, element);
        const cardBlock = {
            type: 'card',
            cardType: 'success',
            icon: 'tag',
            children: [
                {
                    type: 'paragraph',
                    children: [
                        {
                            text: '',
                        },
                    ],
                },
            ],
        };

        Transforms.removeNodes(editor, { at: at });
        Transforms.insertNodes(editor, cardBlock, { at });
    }
}

export { setCard, setIcon, setIconColor, setCardType }