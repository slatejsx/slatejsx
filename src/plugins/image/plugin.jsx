import { getInsertImageCallBack } from "./utils/node"
import { Editor } from 'slate'

const withImage = editor => {
    const { isEmpty, isVoid, insertData } = editor

    editor.isEmpty = element => {
        if (element.type === 'image') {
            return false
        }

        return isEmpty(element)
    }

    editor.isVoid = element => {
        return element.type === 'image' ? true : isVoid(element);
    }

    editor.insertData = data => {
        const { files } = data;
        if (files && files.length > 0) {
            for (const file of files) {
                const [mime] = file.type.split('/');

                if (mime === 'image') {
                    const { onUploadImage } = editor.param
                    if (onUploadImage) {
                        const block = Editor.above(editor, {
                            match: n => Editor.isBlock(editor, n),
                        });
                        if (!!block) {
                            const [element] = block;
                            onUploadImage(file, getInsertImageCallBack(editor, element))
                        }
                    }

                    return
                }
            }
        }

        insertData(data);
    }

    return editor
}

export { withImage }