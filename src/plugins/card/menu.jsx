import { Button } from 'antd';
import {
	CreditCardOutlined,
	FontSizeOutlined,
	CheckCircleOutlined,
	InfoCircleOutlined,
	ExclamationCircleOutlined,
	CloseCircleOutlined,
} from '@ant-design/icons';
import Select from '@/components/button/select';
import { setCard, setCardType, setIcon, setIconColor } from './utils/node';
import { useSlate } from 'slate-react';
import { iconMap, iconColorList } from './utils/icon';
import React from 'react';

// 'success', 'info', 'warning', 'error'
const cardTypeList = [
	{
		key: 'success',
		content: <CheckCircleOutlined />,
		description: 'success',
	},
	{
		key: 'info',
		content: <InfoCircleOutlined />,
		description: 'info',
	},
	{
		key: 'warning',
		content: <ExclamationCircleOutlined />,
		description: 'warning',
	},
	{
		key: 'error',
		content: <CloseCircleOutlined />,
		description: 'error',
	},
];

const EditMenu = props => {
	const { element } = props;
	const editor = useSlate();

	const getCardTypeList = () => {
		return (
			<Select
				selected={element.cardType}
				notNull={true}
				onChange={key => {
					setCardType(editor, element, key);
				}}
				buttons={cardTypeList}
			/>
		);
	};

	const getIconList = () => {
		const buttons = [];
		for (var key in iconMap) {
			buttons.push({
				key: key,
				content: iconMap[key](element.iconColor),
				description: key,
			});
		}

		return (
			<Select
				selected={element.icon}
				notNull={false}
				onChange={key => {
					setIcon(editor, element, key);
				}}
				buttons={buttons}
			/>
		);
	};

	const getIconColorList = () => {
		const buttons = [];
		for (var i = 0; i < iconColorList.length; i++) {
			buttons.push({
				key: iconColorList[i],
				content: <FontSizeOutlined style={{ color: iconColorList[i] }} />,
				description: iconColorList[i],
			});
		}

		return (
			<Select
				selected={element.iconColor}
				notNull={false}
				onChange={key => {
					setIconColor(editor, element, key);
				}}
				buttons={buttons}
			/>
		);
	};

	return (
		<>
			{getCardTypeList()}
			<hr style={{ border: '1px solid #f5f5f5' }} />
			{getIconList()}
			<hr style={{ border: '1px solid #f5f5f5' }} />
			{getIconColorList()}
		</>
	);
};

const AddMenu = props => {
	const editor = useSlate();
	const { element } = props;

	return (
		<Button
			type="text"
			icon={<CreditCardOutlined style={{ color: '#ad4e00' }} />}
			style={{ width: '100%', textAlign: 'left' }}
			onMouseDown={() => {
				setCard(editor, element);
			}}
		>
			卡片
		</Button>
	);
};

export { EditMenu, AddMenu };
