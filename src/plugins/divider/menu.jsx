import { Button } from 'antd';
import {
	MinusSquareOutlined,
	AlignLeftOutlined,
	AlignCenterOutlined,
	AlignRightOutlined,
} from '@ant-design/icons';
import Select from '@/components/button/select';
import { setDivider, setTextAlign } from './utils/node';
import { useSlate } from 'slate-react';
import React from 'react';

const EditMenu = props => {
	const editor = useSlate();
	const { element } = props;

	return (
		<Select
			selected={element.textAlign}
			buttons={textAlignButtonList}
			onChange={key => {
				setTextAlign(editor, element, key);
			}}
		/>
	);
};

const AddMenu = props => {
	const editor = useSlate();
	const { element } = props;

	return (
		<Button
			type="text"
			icon={<MinusSquareOutlined style={{ color: '#237804' }} />}
			style={{ width: '100%', textAlign: 'left' }}
			onMouseDown={() => {
				setDivider(editor, element);
			}}
		>
			文字分割线
		</Button>
	);
};

const textAlignButtonList = [
	{
		key: 'left',
		content: <AlignLeftOutlined />,
		description: '左对齐',
	},
	{
		key: 'center',
		content: <AlignCenterOutlined />,
		description: '居中',
	},
	{
		key: 'right',
		content: <AlignRightOutlined />,
		description: '右对齐',
	},
];

export { EditMenu, AddMenu };
