import { Button } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import { setHr } from './utils/node';
import { useSlate } from 'slate-react';
import React from 'react';

const AddMenu = props => {
	const editor = useSlate();
	const { element } = props;

	return (
		<Button
			type="text"
			icon={<MinusCircleOutlined style={{ color: '#d48806' }} />}
			style={{ width: '100%', textAlign: 'left' }}
			onMouseDown={() => {
				setHr(editor, element);
			}}
		>
			纯分割线
		</Button>
	);
};

export { AddMenu };
