import { AddMenu } from "./menu"
import { Element, RowElement, CellElement, MergedElement } from "./element"
import { withTable, withTableCell, withTableRow, withTableCellMerged } from "./plugin"
import { LeafBar } from "./toolbar"

const Table = {
    type: 'table',
    IsBlock: true,
    Level: 1,
    AddMenu,
    Element,
    Plugin: withTable,
    LeafBar,
}

const TableRow = {
    type: 'table-row',
    IsBlock: false,
    Element: RowElement,
    Plugin: withTableRow,
}

const TableCell = {
    type: 'table-cell',
    IsBlock: false,
    Element: CellElement,
    Plugin: withTableCell,
}

const TableCellMerged = {
    type: 'table-cell-merged',
    IsBlock: false,
    Element: MergedElement,
    Plugin: withTableCellMerged,
}

export { Table, TableRow, TableCell, TableCellMerged }