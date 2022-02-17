import { Popover, Button } from 'antd';
import { TableOutlined } from '@ant-design/icons';
import { setTable } from './utils/node';
import { useSlate } from 'slate-react';
import TableInput from '@/components/table-input';
import { useState } from 'react';
import React from 'react';

const AddMenu = props => {
	const editor = useSlate();
	const { element } = props;

	const [title, settitle] = useState('0行0列');

	const onChange = (r, c) => {
		settitle(`${r}行${c}列`);
	};

	const onClick = (r, c) => {
		setTable(editor, element, r, c);
	};

	return (
		<Popover
			title={title}
			content={<TableInput onChange={onChange} onClick={onClick} />}
			placement="topRight"
		>
			<Button
				type="text"
				icon={<TableOutlined style={{ color: '#91d5ff' }} />}
				style={{ width: '100%', textAlign: 'left' }}
			>
				表格
			</Button>
		</Popover>
	);
};

export { AddMenu };
