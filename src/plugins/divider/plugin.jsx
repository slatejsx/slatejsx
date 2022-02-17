const withDivider = editor => {
    const { isEmpty } = editor

    editor.isEmpty = element => {
        if (element.type === 'divider') {
            return false
        }

        return isEmpty(element)
    }

    return editor
}

export { withDivider }