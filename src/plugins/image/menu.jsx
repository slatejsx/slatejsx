import { Button, Popover, Input, message } from 'antd';
import {
	PictureOutlined,
	AlignLeftOutlined,
	AlignCenterOutlined,
	AlignRightOutlined,
	MinusCircleOutlined,
	PlusCircleOutlined,
} from '@ant-design/icons';
import Select from '@/components/button/select';
import { setImage, setTextAlign, setWidth } from './utils/node';
import { useSlate } from 'slate-react';
import Single from '@/components/button/single';
import { useState } from 'react';
import isUrl from 'is-url';
import imageExtensions from 'image-extensions';
import React from 'react';

// 判断是不是图片链接
const isImageUrl = url => {
	if (!url) return false;
	if (!isUrl(url)) return false;
	const ext = new URL(url).pathname.split('.').pop();
	return imageExtensions.includes(ext);
};

const EditMenu = props => {
	const editor = useSlate();
	const { element } = props;

	return (
		<>
			<Select
				selected={element.textAlign}
				buttons={textAlignButtonList}
				onChange={key => {
					setTextAlign(editor, element, key);
				}}
			/>
			<hr style={{ border: '1px solid #f5f5f5' }} />
			<Button
				size="small"
				type="text"
				icon={<MinusCircleOutlined style={{ color: '#389e0d' }} />}
				onMouseDown={() => {
					setWidth(editor, element, element.width - 20);
				}}
			/>
			<Button
				size="small"
				type="text"
				icon={<PlusCircleOutlined style={{ color: '#f5222d' }} />}
				onMouseDown={() => {
					setWidth(editor, element, element.width + 20);
				}}
			/>
		</>
	);
};

const AddMenu = props => {
	const editor = useSlate();
	const { element } = props;

	const URL = Props => {
		const [value, setValue] = useState('');

		return (
			<>
				<div style={{ display: 'inline-block', width: '280px' }}>
					<Input value={value} placeholder="输入图片地址" onChange={v => setValue(v.target.value)} />
				</div>
				&nbsp;
				<Single
					selected={true}
					description="使用图片的url"
					content="确认"
					onClick={() => {
						if (!isImageUrl(value)) {
							message.error('输入有效的图片地址');
							return;
						}

						setImage(editor, element, value);
					}}
				/>
			</>
		);
	};

	const edit = () => {
		return <>{<URL />}</>;
	};

	return (
		<Popover content={edit()} placement="topRight">
			<Button
				type="text"
				icon={<PictureOutlined style={{ color: '#fadb14' }} />}
				style={{ width: '100%', textAlign: 'left' }}
			>
				图片
			</Button>
		</Popover>
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
