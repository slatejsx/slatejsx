import Select from '@/components/button/select';
import { useSlate } from 'slate-react';
import { setTitle, setTextAlign, setQuote, setList, setListOrder } from './utils/node';
import {
	UnorderedListOutlined,
	OrderedListOutlined,
	CheckSquareOutlined,
	InfoCircleOutlined,
	AlignLeftOutlined,
	AlignCenterOutlined,
	AlignRightOutlined,
} from '@ant-design/icons';
import React from 'react';

const Menu = props => {
	const { element } = props;
	const editor = useSlate();

	const titleButton = () => {
		// 变更标题
		const onChange = key => {
			setTitle(editor, element, key);
		};
		return <Select selected={element.title} buttons={titleButtonList} onChange={onChange} />;
	};

	const listButton = () => {
		// 变更标题
		const onChange = key => {
			setList(editor, element, key);

			if (key === 'ol') {
				setListOrder(editor, element, 1);
			}
		};
		return <Select selected={element.list} buttons={listButtonList} onChange={onChange} />;
	};

	const textAlignButton = () => {
		// 变更标题
		const onChange = key => {
			setTextAlign(editor, element, key);
		};
		return <Select selected={element.textAlign} buttons={textAlignButtonList} onChange={onChange} />;
	};

	const quoteButton = () => {
		// 变更标题
		const onChange = key => {
			setQuote(editor, element, key);
		};
		return <Select selected={element.quote} buttons={quoteButtonList} onChange={onChange} />;
	};

	return (
		<>
			{titleButton()}
			<hr style={{ border: '1px solid #f5f5f5' }} />
			{listButton()}&nbsp;&nbsp;&nbsp;&nbsp;
			{quoteButton()}
			<hr style={{ border: '1px solid #f5f5f5' }} />
			{textAlignButton()}
		</>
	);
};

const titleButtonList = [
	{
		key: 'h1',
		content: 'h1',
		description: '标题1; MarkDown:#',
	},
	{
		key: 'h2',
		content: 'h2',
		description: '标题2; MarkDown:##',
	},
	{
		key: 'h3',
		content: 'h3',
		description: '标题3; MarkDown:###',
	},
	{
		key: 'h4',
		content: 'h4',
		description: '标题4; MarkDown:####',
	},
	{
		key: 'h5',
		content: 'h5',
		description: '标题5; MarkDown:#####',
	},
];

const listButtonList = [
	{
		key: 'ul',
		content: <UnorderedListOutlined />,
		description: '无序列表; MarkDown:-/+/*',
	},
	{
		key: 'ol',
		content: <OrderedListOutlined />,
		description: '有序列表; MarkDown:1.',
	},
	{
		key: 'checkbox',
		content: <CheckSquareOutlined />,
		description: 'checkbox; MarkDown:[]',
	},
];

const quoteButtonList = [
	{
		key: 'quote',
		content: <InfoCircleOutlined />,
		description: '引用; MarkDown:>',
	},
];

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

export { Menu };
