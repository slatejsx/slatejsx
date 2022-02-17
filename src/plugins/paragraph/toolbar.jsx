import {
	LinkOutlined,
	BgColorsOutlined,
	FontColorsOutlined,
	BoldOutlined,
	UnderlineOutlined,
	ItalicOutlined,
	CodeOutlined,
	StrikethroughOutlined,
	StarFilled,
	FormatPainterOutlined,
} from '@ant-design/icons';
import { useSlate } from 'slate-react';
import { Editor } from 'slate';
import { isColorActive, isFormatActive, isLinkActive } from './utils/active';
import { wrapLink, unWrapLink, insertStar } from './utils/node';
import { message } from 'antd';
import Select from '@/components/button/select';
import Muti from '@/components/button/muti';
import Single from '@/components/button/single';
import React from 'react';

const backgroundColorList = ['#ffd666', '#ffccc7', '#95de64', '#91d5ff', '#d3adf7', '#bfbfbf'];
const fontColorList = ['#f5222d', '#d4b106', '#389e0d', '#096dd9', '#722ed1', '#595959'];

const normalConfig = [
	{
		key: 'bold',
		description: '加粗',
		content: <BoldOutlined />,
	},
	{
		key: 'italic',
		description: '斜体',
		content: <ItalicOutlined />,
	},
	{
		key: 'underline',
		description: '下划线',
		content: <UnderlineOutlined />,
	},
	{
		key: 'strikethrough',
		description: '删除线',
		content: <StrikethroughOutlined />,
	},
	{
		key: 'code',
		description: '代码',
		content: <CodeOutlined />,
	},
];

const execCoy = text => {
	const input = document.createElement('TEXTAREA');
	input.style.opacity = 0;
	input.style.position = 'absolute';
	input.style.left = '-100000px';
	document.body.appendChild(input);

	input.value = text;
	input.select();
	input.setSelectionRange(0, text.length);
	document.execCommand('copy');
	document.body.removeChild(input);
};

const LeafBar = props => {
	const editor = useSlate();

	const getActiveColor = (type, colorList) => {
		for (var i = 0; i < colorList.length; i++) {
			const color = colorList[i];

			if (isColorActive(editor, type, color)) {
				return color;
			}
		}

		return '';
	};

	const getColorList = (type, colorList) => {
		const buttons = [];
		for (var i = 0; i < colorList.length; i++) {
			const color = colorList[i];
			buttons.push({
				key: color,
				description: color,
				content:
					type === 'backgroundColor' ? (
						<BgColorsOutlined style={{ color: color, backgroundColor: color }} />
					) : (
						<FontColorsOutlined style={{ color: color }} />
					),
			});
		}

		const onChange = color => {
			// 重置颜色
			Editor.addMark(editor, type, color);
		};

		return (
			<Select
				selected={getActiveColor(type, colorList)}
				notNull={false}
				onChange={onChange}
				buttons={buttons}
			/>
		);
	};

	const getFormatActiveKeys = () => {
		const keys = [];
		for (let i = 0; i < normalConfig.length; i++) {
			const key = normalConfig[i].key;
			if (isFormatActive(editor, key)) {
				keys.push(key);
			}
		}

		return keys;
	};

	const getNormalList = () => {
		const onChange = key => {
			// 修改基础样式
			Editor.addMark(editor, key, isFormatActive(editor, key) ? null : true);
		};

		return <Muti selectedKeys={getFormatActiveKeys()} onChange={onChange} buttons={normalConfig} />;
	};

	const GetFormatPainter = props => {
		const setFormatCache = () => {
			const cache = {};

			cache['backgroundColor'] = getActiveColor('backgroundColor', backgroundColorList);
			cache['fontColor'] = getActiveColor('fontColor', fontColorList);
			cache['normal'] = getFormatActiveKeys();

			execCoy('&_FORMAT_CACHE' + JSON.stringify(cache));
			message.info('样式已经复制到剪贴板');
		};

		return (
			<Single
				selected={false}
				description="点击复制样式到剪贴板，选中其他文本ctrl+v即可复用样式"
				content={
					<span style={{ color: '#003a8c' }}>
						<FormatPainterOutlined style={{ color: '#d4380d' }} />
						&nbsp;格式刷
					</span>
				}
				onClick={() => {
					setFormatCache();
				}}
			/>
		);
	};

	return (
		<>
			<span>{getColorList('backgroundColor', backgroundColorList)}</span>
			<span>{getColorList('fontColor', fontColorList)}</span>
			<hr style={{ border: '1px solid #91d5ff' }} />
			<span>{getNormalList()}</span>&nbsp;&nbsp;
			{GetFormatPainter()}&nbsp;&nbsp;
		</>
	);
};

const LinkBar = props => {
	const editor = useSlate();

	const selected = isLinkActive(editor);

	return (
		<>
			<Single
				selected={selected}
				description="加入超链接，点击后悬停于文字上修改链接内容"
				content={<LinkOutlined style={{ color: '#0000cc' }} />}
				onClick={() => {
					selected ? unWrapLink(editor) : wrapLink(editor);
				}}
			/>
			&nbsp;&nbsp;
		</>
	);
};

const StarBar = props => {
	const editor = useSlate();

	return (
		<>
			<Single
				selected={false}
				description="新增评分"
				content={<StarFilled style={{ color: '#fadb14' }} />}
				onClick={() => {
					insertStar(editor);
				}}
			/>
			&nbsp;&nbsp;
		</>
	);
};

export { LeafBar, LinkBar, StarBar };
