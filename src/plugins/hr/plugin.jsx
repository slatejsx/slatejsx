const withHr = editor => {
    const { isEmpty, isVoid } = editor

    editor.isEmpty = element => {
        if (element.type === 'hr') {
            return false
        }

        return isEmpty(element)
    }

    editor.isVoid = element => {
        return element.type === 'hr' ? true : isVoid(element);
    }

    return editor
}

export { withHr }