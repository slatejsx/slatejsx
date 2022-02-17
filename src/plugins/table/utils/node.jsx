import { Editor, Path, Transforms, Node, Range } from 'slate';
import { ReactEditor } from 'slate-react';

const setTable = (editor, element, r, c) => {
    if (element) {
        const at = ReactEditor.findPath(editor, element);

        const rows = []
        for (var i = 0; i < r; i++) {
            const cells = []
            for (var j = 0; j < c; j++) {
                cells.push({
                    type: 'table-cell',
                    width: 100, // 默认长度100
                    children: [
                        {
                            type: 'paragraph',
                            children: [
                                {
                                    text: ''
                                }
                            ]
                        }
                    ],
                })
            }

            rows.push({
                type: 'table-row',
                children: cells,
            })
        }

        const tableBlock = {
            type: 'table',
            children: rows,
        };

        Transforms.removeNodes(editor, { at: at });
        Transforms.insertNodes(editor, tableBlock, { at });
    }
}

const addRow = (editor, cellPath, isNext = true) => {
    const table = getTableFromCell(editor, cellPath)

    let at = Path.parent(cellPath)
    if (isNext) {
        at = Path.next(at)
    }
    const tablePath = Path.parent(at)

    const atRow = at[at.length - 1]

    const mergedCols = []
    // 判断是否需要增加span
    for (var r = 0; r < atRow; r++) {
        const row = table.children[r]
        for (var c = 0; c < row.children.length; c++) {
            const cellElement = row.children[c]
            if (!cellElement.rowSpan || r + cellElement.rowSpan <= atRow) {
                continue
            }

            Transforms.setNodes(editor, { ['rowSpan']: cellElement.rowSpan + 1 }, { at: [...tablePath, r, c] });

            let colSpan = 1
            if (cellElement.colSpan) {
                colSpan = cellElement.colSpan
            }

            // 计算所有需要merged的cell
            for (var offset = 0; offset < colSpan; offset++) {
                mergedCols.push(c + offset)
            }
        }
    }

    const cells = []
    let col = 0
    for (var cell of table.children[0].children) {
        let newCell = {
            type: 'table-cell',
            width: cell.width,
            children: [
                {
                    type: 'paragraph',
                    children: [
                        {
                            text: '',
                        }
                    ]
                },
            ]
        }

        if (mergedCols.indexOf(col) > -1) {
            newCell = {
                type: 'table-cell-merged',
                width: cell.width,
                children: [
                    {
                        text: '',
                    },
                ]
            }
        }

        cells.push(newCell)
        col++
    }

    const emptyRow = {
        type: 'table-row',
        children: cells,
    }

    Transforms.insertNodes(editor, emptyRow, { at });
}

const deleteRow = (editor, cellPath) => {
    const table = getTableFromCell(editor, cellPath)

    // 只有表格行数大于1才允许删除行
    if (table.children.length <= 1) {
        return
    }

    const at = Path.parent(cellPath)
    const atRow = at[at.length - 1]

    const tablePath = Path.parent(at)

    // 计算span的变化
    // 判断是否需要减少span
    for (var r = 0; r <= atRow; r++) {
        const row = table.children[r]
        for (var c = 0; c < row.children.length; c++) {
            const cellElement = row.children[c]
            if (!cellElement.rowSpan || r + cellElement.rowSpan <= atRow) {
                continue
            }

            let newRowSpan = cellElement.rowSpan - 1
            if (newRowSpan === 1) {
                newRowSpan = null
            }

            // 如果当前行就有span
            if (r === atRow) {
                const newCell = {
                    type: 'table-cell',
                    width: cellElement.width,
                    children: cellElement.children,
                }

                if (newRowSpan) {
                    newCell.rowSpan = newRowSpan
                }
                if (cellElement.colSpan) {
                    newCell.colSpan = cellElement.colSpan
                }

                Transforms.removeNodes(editor, { at: [...tablePath, r + 1, c] })
                Transforms.insertNodes(editor, newCell, { at: [...tablePath, r + 1, c] })
            } else {
                Transforms.setNodes(editor, { ['rowSpan']: newRowSpan }, { at: [...tablePath, r, c] })
            }
        }
    }

    Transforms.removeNodes(editor, { at })
}

const addCol = (editor, cellPath, isNext = true) => {
    const table = getTableFromCell(editor, cellPath)
    let [, col] = getCellPathInTable(cellPath)
    const tablePath = Path.parent(Path.parent(cellPath))

    if (isNext) {
        col++
    }

    const mergedRows = []
    // 判断是否需要增加span
    for (var r = 0; r < table.children.length; r++) {
        const row = table.children[r]
        for (var c = 0; c < col; c++) {
            const cellElement = row.children[c]
            if (!cellElement.colSpan || c + cellElement.colSpan <= col) {
                continue
            }

            Transforms.setNodes(editor, { ['colSpan']: cellElement.colSpan + 1 }, { at: [...tablePath, r, c] });

            let rowSpan = 1
            if (cellElement.rowSpan) {
                rowSpan = cellElement.rowSpan
            }

            // 计算所有需要merged的cell
            for (var offset = 0; offset < rowSpan; offset++) {
                mergedRows.push(r + offset)
            }
        }
    }

    for (var i = 0; i < table.children.length; i++) {
        let at = [...tablePath, i, col]

        let emptyCol = {
            type: 'table-cell',
            width: 100,
            children: [
                {
                    type: 'paragraph',
                    children: [
                        {
                            text: '',
                        }
                    ]
                },
            ]
        }

        if (mergedRows.indexOf(i) > -1) {
            emptyCol = {
                type: 'table-cell-merged',
                width: 100,
                children: [
                    {
                        text: '',
                    },
                ]
            }
        }

        Transforms.insertNodes(editor, emptyCol, { at });
    }
}

const deleteCol = (editor, cellPath) => {
    const row = getRowFromCell(editor, cellPath)

    // 大于1列才能删除
    if (row.children.length <= 1) {
        return
    }

    const table = getTableFromCell(editor, cellPath)
    const [, atCol] = getCellPathInTable(cellPath)
    const tablePath = Path.parent(Path.parent(cellPath))

    // 计算span的变化
    // 判断是否需要减少span
    for (var r = 0; r < table.children.length; r++) {
        const row = table.children[r]
        for (var c = 0; c <= atCol; c++) {
            const cellElement = row.children[c]
            if (!cellElement.colSpan || c + cellElement.colSpan <= atCol) {
                continue
            }

            let newColSpan = cellElement.colSpan - 1
            if (newColSpan === 1) {
                newColSpan = null
            }

            // 如果当前行就有span
            if (c === atCol) {
                const newCell = {
                    type: 'table-cell',
                    width: cellElement.width,
                    children: cellElement.children,
                }

                if (newColSpan) {
                    newCell.colSpan = newColSpan
                }
                if (cellElement.rowSpan) {
                    newCell.rowSpan = cellElement.rowSpan
                }

                Transforms.removeNodes(editor, { at: [...tablePath, r, c + 1] })
                Transforms.insertNodes(editor, newCell, { at: [...tablePath, r, c + 1] })
            } else {
                Transforms.setNodes(editor, { ['colSpan']: newColSpan }, { at: [...tablePath, r, c] })
            }
        }
    }

    // 删除对应列
    for (var i = 0; i < table.children.length; i++) {
        const at = [...tablePath, i, atCol]
        Transforms.removeNodes(editor, { at });
    }
}

const setColWidth = (editor, cellPath, width) => {
    // 单元格最小宽度为40
    if (width < 40) {
        return
    }

    const table = getTableFromCell(editor, cellPath)
    const [, c] = getCellPathInTable(cellPath)
    const tablePath = Path.parent(Path.parent(cellPath))

    for (var i = 0; i < table.children.length; i++) {
        const at = [...tablePath, i, c]

        Transforms.setNodes(editor, { ['width']: width }, { at: at });
    }
}

// 拆分单元格
const splitCells = (editor) => {
    const { selection } = editor
    // 鼠标必须是单点
    if (!selection || !Range.isCollapsed(selection)) {
        return
    }

    const { anchor, focus } = selection
    const [nodeEntry,] = Editor.node(editor, {})
    const common = Node.common(nodeEntry, anchor.path, focus.path)
    const [, path] = common

    // 获得cellPath
    let cellPath = [...path]
    while (true) {
        // 如果不是在同一个table中，不再继续处理
        if (cellPath.length < 3) {
            return
        }

        const n = Node.get(nodeEntry, cellPath)
        if (n.type && n.type == 'table-cell') {
            break
        }
        cellPath = Path.parent(cellPath)
    }

    const tablePath = Path.parent(Path.parent(cellPath))
    const cellInTable = getCellPathInTable(cellPath)
    const tableElement = Node.get(nodeEntry, tablePath)
    const cellElement = Node.get(tableElement, cellInTable)

    if (!cellElement.rowSpan && !cellElement.colSpan) {
        return
    }

    // 去掉span
    Transforms.setNodes(editor, { ['rowSpan']: null, ['colSpan']: null }, { at: cellPath })
    // 插入数据
    const rowSpan = cellElement.rowSpan ? cellElement.rowSpan : 1
    const colSpan = cellElement.colSpan ? cellElement.colSpan : 1

    for (var r = cellInTable[0]; r <= cellInTable[0] + rowSpan - 1; r++) {
        for (var c = cellInTable[1]; c <= cellInTable[1] + colSpan - 1; c++) {
            // 跳过第一个
            if (r === cellInTable[0] && c === cellInTable[1]) {
                continue
            }

            const current = Node.get(tableElement, [r, c])
            const newCell = {
                type: 'table-cell',
                width: current.width,
                children: [
                    {
                        type: 'paragraph',
                        children: [
                            {
                                text: '',
                            }
                        ]
                    }
                ],
            }
            // 继承所有宽度数据，其余都删除掉
            Transforms.removeNodes(editor, { at: [...tablePath, r, c] })
            Transforms.insertNodes(editor, newCell, { at: [...tablePath, r, c] })
        }
    }
}

// 合并单元格
const mergeCells = (editor) => {
    const { tableSelection } = editor
    if (!tableSelection) {
        return
    }

    const { start, end } = tableSelection

    const startInTable = getCellPathInTable(start)
    const endInTable = getCellPathInTable(end)

    // 其余单元格全部设置成空
    const tablePath = Path.parent(Path.parent(start))
    const [nodeEntry,] = Editor.node(editor, {})
    const tableElement = Node.get(nodeEntry, tablePath)

    const children = []
    const startElement = Node.get(tableElement, startInTable)
    children.push(...startElement.children)

    for (var r = startInTable[0]; r <= endInTable[0]; r++) {
        for (var c = startInTable[1]; c <= endInTable[1]; c++) {
            // 跳过第一个
            if (r === startInTable[0] && c === startInTable[1]) {
                continue
            }
            const current = Node.get(tableElement, [r, c])

            if (current.type === 'table-cell' && Node.string(current).length > 0) {
                children.push(...current.children)
            }

            const cellMerged = {
                type: 'table-cell-merged',
                width: current.width,
                children: [{ text: '' }],
            }
            // 继承所有宽度数据，其余都删除掉
            Transforms.removeNodes(editor, { at: [...tablePath, r, c] })
            Transforms.insertNodes(editor, cellMerged, { at: [...tablePath, r, c] })
        }
    }

    // 设置初始单元格的span
    const rowSpan = endInTable[0] - startInTable[0] + 1
    const colSpan = endInTable[1] - startInTable[1] + 1

    const newCell = {
        type: 'table-cell',
        width: startElement.width,
        children: children,
    }

    if (rowSpan > 1) {
        newCell.rowSpan = rowSpan
    }
    if (colSpan > 1) {
        newCell.colSpan = colSpan
    }

    Transforms.removeNodes(editor, { at: start })
    Transforms.insertNodes(editor, newCell, { at: start })
}

const clearTableSelection = (editor, tableSelection) => {
    const { start, end } = tableSelection

    const startInTable = getCellPathInTable(start)
    const endInTable = getCellPathInTable(end)

    // 其余单元格全部设置成空
    const tablePath = Path.parent(Path.parent(start))
    const tableElement = Node.get(editor, tablePath)

    for (var r = startInTable[0]; r <= endInTable[0]; r++) {
        for (var c = startInTable[1]; c <= endInTable[1]; c++) {
            const current = Node.get(tableElement, [r, c])

            const newCell = { ...current }

            // 继承所有数据，内容都删除掉
            if (newCell.type === 'table-cell') {
                newCell.children = [
                    {
                        type: "paragraph",
                        children: [
                            {
                                text: ''
                            }
                        ]
                    }
                ]
            } else {
                newCell.children = [
                    {
                        text: '',
                    }
                ]
            }

            Transforms.removeNodes(editor, { at: [...tablePath, r, c] })
            Transforms.insertNodes(editor, newCell, { at: [...tablePath, r, c] })
        }
    }
}

const getAllSpanCells = (tableElement) => {
    const mergedCellRowCols = []
    for (var r = 0; r < tableElement.children.length; r++) {
        const rowElement = tableElement.children[r]
        for (var c = 0; c < rowElement.children.length; c++) {
            const cellElement = rowElement.children[c]
            if (!cellElement.rowSpan && !cellElement.colSpan) {
                continue
            }

            mergedCellRowCols.push([
                [r - 1, c - 1],
                [r + (cellElement.rowSpan ? cellElement.rowSpan : 1) - 1, c + (cellElement.colSpan ? cellElement.colSpan : 1) - 1],
            ])
        }
    }

    return mergedCellRowCols
}

// 计算表格内的选择情况
const getTableSelection = (editor) => {
    const { selection } = editor
    if (!selection || Range.isCollapsed(selection)) {
        return null
    }

    const { anchor, focus } = selection
    const [nodeEntry,] = Editor.node(editor, {})
    const common = Node.common(nodeEntry, anchor.path, focus.path)
    const [, path] = common

    // 获得tablePath
    let tablePath = [...path]
    while (true) {
        // 如果不是在同一个table中，不再继续处理
        if (tablePath.length == 0) {
            return null
        }

        const n = Node.get(nodeEntry, tablePath)
        if (n.type && n.type == 'table') {
            break
        }

        tablePath = Path.parent(tablePath)
    }

    const tableElement = Node.get(nodeEntry, tablePath)
    const mergedCellRowCols = getAllSpanCells(tableElement)

    const row = tableElement.children.length
    const col = tableElement.children[0].children.length

    const level = tablePath.length
    const anchorPathInTable = [anchor.path[level], anchor.path[level + 1]]
    const focusPathInTable = [focus.path[level], focus.path[level + 1]]

    if (Path.equals(anchorPathInTable, focusPathInTable)) {
        return null
    }

    let [minRow, maxRow] = [anchorPathInTable[0], focusPathInTable[0]]
    if (anchorPathInTable[0] > focusPathInTable[0]) {
        [minRow, maxRow] = [focusPathInTable[0], anchorPathInTable[0]]
    }
    let [minCol, maxCol] = [anchorPathInTable[1], focusPathInTable[1]]
    if (anchorPathInTable[1] > focusPathInTable[1]) {
        [minCol, maxCol] = [focusPathInTable[1], anchorPathInTable[1]]
    }

    [minRow, minCol] = [minRow - 1, minCol - 1]
    while (true) {
        const [minR, minC, maxR, maxC] = getCuerrentSelection([minRow, minCol, maxRow, maxCol], mergedCellRowCols, row, col)

        let change = false
        if (minRow > minR) {
            minRow = minR
            change = true
        }
        if (maxRow < maxR) {
            maxRow = maxR
            change = true
        }
        if (minCol > minC) {
            minCol = minC
            change = true
        }
        if (maxCol < maxC) {
            maxCol = maxC
            change = true
        }

        if (!change) {
            break
        }
    }

    return {
        start: [...tablePath, minRow + 1, minCol + 1],
        end: [...tablePath, maxRow, maxCol],
    }
}

const isCellInTableSelection = (editor, element) => {
    const { tableSelection } = editor
    if (!tableSelection) {
        return false
    }

    const at = ReactEditor.findPath(editor, element)
    const { start, end } = tableSelection

    // 判断有没有在一个table中
    const [nodeEntry,] = Editor.node(editor, {})
    const common = Node.common(nodeEntry, at, start)
    const [, path] = common

    // 获得tablePath
    let tablePath = [...path]
    while (true) {
        // 如果不是在同一个table中，不再继续处理
        if (tablePath.length == 0) {
            return false
        }

        const n = Node.get(nodeEntry, tablePath)
        if (n.type && n.type == 'table') {
            break
        }

        tablePath = Path.parent(tablePath)
    }

    // 防止表格嵌套表格导致错误识别
    if (tablePath.length + 2 != at.length || tablePath.length + 2 != start.length) {
        return false
    }

    const atInTable = getCellPathInTable(at)
    const startInTable = getCellPathInTable(start)
    const endInTable = getCellPathInTable(end)

    return startInTable[0] <= atInTable[0] && startInTable[1] <= atInTable[1] && atInTable[0] <= endInTable[0] && atInTable[1] <= endInTable[1]
}

const getCuerrentSelection = (current, mergedCellRowCols, row, col) => {
    let [minRow, minCol, maxRow, maxCol] = current
    // 向上
    for (var ir = minRow; ir >= -1; ir--) {
        minRow = ir
        if (!isLineCrossAnyCells([[ir, minCol], [ir, maxCol]], mergedCellRowCols)) {
            break
        }
    }

    // 向下
    for (var ar = maxRow; ar <= row; ar++) {
        maxRow = ar
        if (!isLineCrossAnyCells([[ar, minCol], [ar, maxCol]], mergedCellRowCols)) {
            break
        }
    }

    // 向左
    for (var ic = minCol; ic >= -1; ic--) {
        minCol = ic
        if (!isLineCrossAnyCells([[minRow, ic], [maxRow, ic]], mergedCellRowCols)) {
            break
        }
    }

    // 向右
    for (var ac = maxCol; ac <= col; ac++) {
        maxCol = ac
        if (!isLineCrossAnyCells([[minRow, ac], [maxRow, ac]], mergedCellRowCols)) {
            break
        }
    }

    return [minRow, minCol, maxRow, maxCol]
}

const isLineCrossAnyCells = (line, cells) => {
    for (var cell of cells) {
        if (isLineCrossCell(line, cell)) {
            return true
        }
    }

    return false
}

const isLineCrossCell = (line, cell) => {
    const [lineStart, lineEnd] = line
    const [cellStart, cellEnd] = cell

    if (lineStart[0] >= cellEnd[0] || lineEnd[0] <= cellStart[0]) {
        return false
    }

    if (lineStart[1] >= cellEnd[1] || lineEnd[1] <= cellStart[1]) {
        return false
    }

    return true
}

const getRowFromCell = (editor, cellPath) => {
    const [nodeEntry,] = Editor.node(editor, [])
    const rowPath = Path.parent(cellPath)

    return Node.get(nodeEntry, rowPath)
}

const getTableFromCell = (editor, cellPath) => {
    const [nodeEntry,] = Editor.node(editor, [])
    const rowPath = Path.parent(cellPath)
    const tablePath = Path.parent(rowPath)

    return Node.get(nodeEntry, tablePath)
}

const getCellPathInTable = (path) => {
    const len = path.length
    return [path[len - 2], path[len - 1]]
}

export {
    setTable,
    getCellPathInTable,
    addRow,
    deleteRow,
    addCol,
    deleteCol,
    setColWidth,
    getTableSelection,
    isCellInTableSelection,
    mergeCells,
    splitCells,
    clearTableSelection,
}