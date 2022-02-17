import { message } from 'antd'
import {
    Editor,
    Range,
    Point,
    Element as SlateElement,
    Node,
    Path,
    Transforms,
} from 'slate'
import { getCellPathInTable, clearTableSelection } from './utils/node'

const withTable = editor => {
    const { isEmpty, getFragment, insertFragment, deleteFragment } = editor

    // 记录表格内被选中的单元格
    editor.tableSelection = null

    editor.deleteFragment = () => {
        const { tableSelection } = editor
        // 如果选中了表格的区域，则清空内容
        if (tableSelection) {
            clearTableSelection(editor, tableSelection)

            return
        }

        const { selection } = editor
        if (selection) {
            const { anchor, focus } = selection
            const common = Node.common(editor, anchor.path, focus.path)

            if (common[1].length > 2) {
                deleteFragment()
                return
            }

            const startEl = Node.get(editor, [anchor.path[0]])
            const endEl = Node.get(editor, [focus.path[0]])
            if (startEl.type === 'table' || endEl.type === 'table') {
                message.error('选中区域边缘包含表格，无法删除')
                return
            }
        }

        deleteFragment()
    }

    editor.insertFragment = node => {
        if (editor.tableSelection) {
            message.error('禁止向table拷贝')

            return
        }

        if (!Array.isArray(node)) {
            insertFragment(node)
            return
        }

        let hasTable = false
        for (var child of node) {
            if (child.type === 'table') {
                hasTable = true
            }
        }

        if (!hasTable) {
            insertFragment(node)
            return
        }

        // 只允许在第一层空位置插入表格
        const { selection } = editor
        if (selection) {
            if (!Range.isCollapsed(selection)) {
                message.error('拷贝内容含有表格，只能粘贴到光标上')
                return
            }
        }

        const { anchor } = selection

        Transforms.insertNodes(editor, node, { at: [anchor.path[0] + 1] })
    }

    // 重写部分拷贝方法，保证纯paragraph拷贝时，不拷贝父元素属性
    editor.getFragment = () => {
        // 如果表格有被选中的，那么复制为选中大小的表格
        if (editor.tableSelection) {
            const { start, end } = editor.tableSelection
            const tablePath = Path.parent(Path.parent(start))
            const [startRow, startCol] = getCellPathInTable(start)
            const [endRow, endCol] = getCellPathInTable(end)

            const rows = []
            for (var r = startRow; r <= endRow; r++) {
                const cells = []
                for (var c = startCol; c <= endCol; c++) {
                    const cell = Node.get(editor, [...tablePath, r, c])
                    cells.push(cell)
                }
                const row = {
                    type: 'table-row',
                    children: cells,
                }
                rows.push(row)
            }

            return [
                {
                    type: 'table',
                    children: rows,
                }
            ]
        }

        let fragment = getFragment()

        if (fragment.length < 2) {
            return fragment
        }
        // 如果包含部分table，则不会拷贝上table的内容
        if (fragment[0].type === 'table' || fragment[fragment.length - 1].type === 'table') {
            const newFagment = []
            for (var i = 0; i < fragment.length; i++) {
                if (i != 0 && i != fragment.length - 1) {
                    newFagment.push(fragment[i])
                    continue
                }
                if (fragment[i].type !== 'table') {
                    newFagment.push(fragment[i])
                }
            }
            return newFagment
        }

        return fragment
    }

    editor.isEmpty = element => {
        if (element.type === 'table') {
            return false
        }

        return isEmpty(element)
    }

    return editor
}

const withTableRow = editor => {
    return editor
}

const withTableCell = editor => {
    const { deleteBackward, deleteForward } = editor

    editor.deleteBackward = unit => {
        const { selection } = editor

        if (selection && Range.isCollapsed(selection)) {
            const [cell] = Editor.nodes(editor, {
                match: n =>
                    !Editor.isEditor(n) &&
                    SlateElement.isElement(n) &&
                    n.type === 'table-cell',
            })

            if (cell) {
                const [, cellPath] = cell
                const start = Editor.start(editor, cellPath)

                if (Point.equals(selection.anchor, start)) {
                    return
                }
            }
        }

        deleteBackward(unit)
    }

    editor.deleteForward = unit => {
        const { selection } = editor

        if (selection && Range.isCollapsed(selection)) {
            const [cell] = Editor.nodes(editor, {
                match: n =>
                    !Editor.isEditor(n) &&
                    SlateElement.isElement(n) &&
                    n.type === 'table-cell',
            })

            if (cell) {
                const [, cellPath] = cell
                const end = Editor.end(editor, cellPath)

                if (Point.equals(selection.anchor, end)) {
                    return
                }
            }
        }

        deleteForward(unit)
    }

    return editor
}

const withTableCellMerged = editor => {
    const { isVoid } = editor

    editor.isVoid = element => {
        return element.type === 'table-cell-merged' ? true : isVoid(element);
    }

    return editor
}

export { withTable, withTableRow, withTableCell, withTableCellMerged }