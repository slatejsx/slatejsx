import { MergeCellsOutlined, SplitCellsOutlined } from '@ant-design/icons';
import Single from '@/components/button/single';
import { useSlate } from 'slate-react';
import { mergeCells, splitCells } from './utils/node';
import React from 'react';

const LeafBar = props => {
	const editor = useSlate();

	return (
		<>
			<Single
				selected={false}
				description="合并单元格"
				content={<MergeCellsOutlined style={{ color: '#237804' }} />}
				onClick={() => {
					mergeCells(editor);
				}}
			/>
			<Single
				selected={false}
				description="拆分单元格"
				content={<SplitCellsOutlined style={{ color: '#237804' }} />}
				onClick={() => {
					splitCells(editor);
				}}
			/>
		</>
	);
};

export { LeafBar };
