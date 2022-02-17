import {
	InsertRowLeftOutlined,
	InsertRowRightOutlined,
	DeleteColumnOutlined,
	InsertRowAboveOutlined,
	DeleteRowOutlined,
	InsertRowBelowOutlined,
	MinusCircleOutlined,
	PlusCircleOutlined,
} from '@ant-design/icons';
import { Popover, Button } from 'antd';
import { useSlate, ReactEditor } from 'slate-react';
import { Editor, Node, Path } from 'slate';
import {
	getCellPathInTable,
	addRow,
	deleteRow,
	addCol,
	deleteCol,
	setColWidth,
	getTableSelection,
	isCellInTableSelection,
} from './utils/node';
import { memo } from 'react';
import React from 'react';

const Element = memo(props => {
	// 基础配置
	const { attributes, children, element } = props;

	const editor = useSlate();
	editor.tableSelection = getTableSelection(editor);

	let width = 0;
	const tr0 = element.children[0];
	for (var i = 0; i < tr0.children.length; i++) {
		width += tr0.children[i].width;
	}

	return (
		<div style={{ marginTop: '10px', marginBottom: '10px', overflow: 'auto' }}>
			<table style={{ borderCollapse: 'collapse', width: `${width}px` }}>
				<tbody {...attributes}>{children}</tbody>
			</table>
		</div>
	);
});

const RowElement = props => {
	// 基础配置
	const { attributes, children, element } = props;

	const editor = useSlate();
	const rowPath = ReactEditor.findPath(editor, element);
	const rowPathInTable = rowPath[rowPath.length - 1];

	const colEditor = () => {
		if (rowPathInTable !== 0) {
			return null;
		}

		const cells = [<td key="-1" style={{ width: '7px', height: '6px' }} />];

		const editorColMenu = (cellSort, width) => {
			return (
				<>
					<Button
						size="small"
						type="text"
						icon={<InsertRowLeftOutlined style={{ color: '#096dd9' }} />}
						onMouseDown={() => {
							addCol(editor, [...rowPath, cellSort], false);
						}}
					/>
					<Button
						size="small"
						type="text"
						icon={<MinusCircleOutlined style={{ color: '#389e0d' }} />}
						onMouseDown={() => {
							setColWidth(editor, [...rowPath, cellSort], width - 20);
						}}
					/>
					<Button
						size="small"
						type="text"
						icon={<DeleteColumnOutlined style={{ color: '#f5222d' }} />}
						onMouseDown={() => {
							deleteCol(editor, [...rowPath, cellSort]);
						}}
					/>
					<Button
						size="small"
						type="text"
						icon={<PlusCircleOutlined style={{ color: '#389e0d' }} />}
						onMouseDown={() => {
							setColWidth(editor, [...rowPath, cellSort], width + 20);
						}}
					/>
					<Button
						size="small"
						type="text"
						icon={<InsertRowRightOutlined style={{ color: '#096dd9' }} />}
						onMouseDown={() => {
							addCol(editor, [...rowPath, cellSort], true);
						}}
					/>
					<br />
				</>
			);
		};

		for (var i = 0; i < element.children.length; i++) {
			const width = element.children[i].width;
			cells.push(
				<Popover key={i} content={editorColMenu(i, width)} placement="topLeft">
					<td
						key={i}
						style={{
							width: `${width}px`,
							border: '1px solid #d9d9d9',
							backgroundColor: '#f0f0f0',
							cursor: 'pointer',
						}}
					>
						<div style={{ height: '6px' }} />
					</td>
				</Popover>
			);
		}

		return <tr contentEditable={false}>{cells}</tr>;
	};

	return (
		<>
			{colEditor()}
			<tr {...attributes} style={{ textAlign: 'left', border: '1px solid #d9d9d9' }}>
				{children}
			</tr>
		</>
	);
};

const RowEditor = props => {
	// 基础配置
	const { element } = props;

	const editor = useSlate();
	const cellPath = ReactEditor.findPath(editor, element);
	const [, c] = getCellPathInTable(cellPath);

	if (c !== 0) {
		return null;
	}

	const editorRowMenu = () => {
		return (
			<>
				<Button
					size="small"
					type="text"
					icon={<InsertRowAboveOutlined style={{ color: '#096dd9' }} />}
					onMouseDown={() => addRow(editor, cellPath, false)}
				/>
				<br />
				<Button
					size="small"
					type="text"
					icon={<DeleteRowOutlined style={{ color: '#f5222d' }} />}
					onMouseDown={() => deleteRow(editor, cellPath)}
				/>
				<br />
				<Button
					size="small"
					type="text"
					icon={<InsertRowBelowOutlined style={{ color: '#096dd9' }} />}
					onMouseDown={() => addRow(editor, cellPath, true)}
				/>
			</>
		);
	};

	return (
		<Popover content={editorRowMenu()} placement="leftTop">
			<td
				contentEditable={false}
				style={{
					border: '1px solid #d9d9d9',
					backgroundColor: '#f0f0f0',
					cursor: 'pointer',
				}}
			>
				<div style={{ width: '6px' }} />
			</td>
		</Popover>
	);
};

const CellElement = props => {
	// 基础配置
	const { attributes, children, element } = props;
	const { colSpan, rowSpan } = element;

	const editor = useSlate();

	const style = {
		border: '1px solid #d9d9d9',
		verticalAlign: 'top',
		textAlign: 'left',
	};
	if (isCellInTableSelection(editor, element)) {
		style.backgroundColor = '#f0f5ff';
	}

	let tdProps = {
		style,
	};

	let width = element.width;
	if (colSpan) {
		tdProps.colSpan = colSpan;

		// 计算横向合并后的长度
		const [nodeEntry] = Editor.node(editor, {});
		const at = ReactEditor.findPath(editor, element);
		let next = at;
		for (var c = 2; c <= colSpan; c++) {
			next = Path.next(next);
			const nextCell = Node.get(nodeEntry, next);

			width += nextCell.width + 1;
		}
	}
	if (rowSpan) {
		tdProps.rowSpan = rowSpan;
	}

	return (
		<>
			{<RowEditor {...props} />}
			<td {...tdProps}>
				<div {...attributes} style={{ padding: '8px', width: `${width}px`, overflow: 'auto' }}>
					{children}
				</div>
			</td>
		</>
	);
};

const MergedElement = props => {
	// 基础配置
	const { attributes, children } = props;

	return (
		<>
			{<RowEditor {...props} />}
			<td {...attributes} style={{ display: 'none' }}>
				{children}
			</td>
		</>
	);
};

export { Element, RowElement, CellElement, MergedElement };
