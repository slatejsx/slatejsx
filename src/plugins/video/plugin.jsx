const withVideo = editor => {
    const { isEmpty, isVoid } = editor

    editor.isEmpty = element => {
        if (element.type === 'video') {
            return false
        }

        return isEmpty(element)
    }

    editor.isVoid = element => {
        return element.type === 'video' ? true : isVoid(element);
    }

    return editor
}

export { withVideo }