import { Editor, Element as SlateElement, Range } from 'slate';

const isColorActive = (editor, key, color) => {
    const { selection } = editor
    if (selection && Range.isCollapsed(selection)) {
        return false
    }

    const [match] = Editor.nodes(editor, {
        match: n => n[key] === color,
        mode: 'all',
    });
    return !!match;
};

const isFormatActive = (editor, format) => {
    const { selection } = editor
    if (selection && Range.isCollapsed(selection)) {
        return false
    }

    const [match] = Editor.nodes(editor, {
        match: n => n[format] === true,
        mode: 'all',
    });
    return !!match;
};

const isLinkActive = (editor) => {
    const { selection } = editor
    if (selection && Range.isCollapsed(selection)) {
        return false
    }

    const [link] = Editor.nodes(editor, {
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    })
    return !!link
}

export { isColorActive, isFormatActive, isLinkActive }