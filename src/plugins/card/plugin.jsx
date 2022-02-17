const withCard = editor => {
    const { isEmpty } = editor

    editor.isEmpty = element => {
        if (element.type === 'card') {
            return false
        }

        return isEmpty(element)
    }

    return editor
}

export { withCard }