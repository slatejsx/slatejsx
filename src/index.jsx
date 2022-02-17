import React, { useMemo, useCallback, useState } from 'react';
import { createEditor, Transforms } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { Paragraph, Link, Star } from './plugins/paragraph';
import { Card } from './plugins/card';
import { Image } from './plugins/image';
import { Table, TableRow, TableCell, TableCellMerged } from './plugins/table';
import { Divider } from './plugins/divider';
import { Hr } from './plugins/hr';
import { Code, CodeLine } from './plugins/code';
import { Video } from './plugins/video';
import { Menu } from './menu';
import _ from 'lodash';
import { Affix } from 'antd';

import './index.css';

const defaultPlugins = [
	// 段落
	Paragraph,
	Link,
	Star,
	// 卡片
	Card,
	// 图片
	Image,
	// 表格
	Table,
	TableRow,
	TableCell,
	TableCellMerged,
	// 代码块
	Code,
	CodeLine,
	// 分割线
	Divider,
	Hr,
	// 视频
	Video,
];

const withCommon = editor => {
	editor.readOnly = false;
	editor.param = {};
	const { onChange } = editor;
	const _onChange = _.throttle(onChange, 16);
	editor.onChange = () => {
		_onChange();
	};
	return editor;
};

const SEditor = props => {
	const { value, onChange, plugins, param } = props;
	const readOnly = !!props.readOnly;

	const newPlugins = [...defaultPlugins, ...plugins];

	const editor = useMemo(() => {
		let reditor = withCommon(withHistory(withReact(createEditor())));

		// 排在前边的插件，在wrap的时候放在最外层，保证优先执行
		for (var i = newPlugins.length - 1; i >= 0; i--) {
			if (newPlugins[i].Plugin) {
				reditor = newPlugins[i].Plugin(reditor);
			}
		}

		return reditor;
	}, []);

	editor.readOnly = readOnly;
	editor.param = param;

	const renderElement = useCallback(props => {
		const { attributes, children, element } = props;

		if (!element.type) {
			element.type = 'paragraph';
		}

		for (var i = 0; i < newPlugins.length; i++) {
			const Ele = newPlugins[i].Element;
			if (newPlugins[i].type === element.type) {
				if (newPlugins[i].IsBlock) {
					return (
						<Menu element={element} plugins={newPlugins} editMenu={newPlugins[i].EditMenu}>
							<Ele attributes={attributes} children={children} element={element} />
						</Menu>
					);
				} else {
					return <Ele attributes={attributes} children={children} element={element} />;
				}
			}
		}

		return <span {...attributes}>{children}</span>;
	}, []);

	const renderElementReadOnly = useCallback(props => {
		const { attributes, children, element } = props;

		if (!element.type) {
			element.type = 'paragraph';
		}

		for (var i = 0; i < newPlugins.length; i++) {
			if (newPlugins[i].type === element.type) {
				return newPlugins[i].Element({ attributes, children, element });
			}
		}

		return <span {...attributes}>{children}</span>;
	}, []);

	const renderLeaf = useCallback(({ attributes, children, leaf }) => {
		for (var i = 0; i < newPlugins.length; i++) {
			if (newPlugins[i].Leaf) {
				children = newPlugins[i].Leaf({ attributes, children, leaf });
			}
		}

		return <span {...attributes}>{children}</span>;
	}, []);

	const Toolbar = props => {
		const tools = [];
		for (var i = 0; i < newPlugins.length; i++) {
			if (newPlugins[i].LeafBar) {
				tools.push(<span key={newPlugins[i].type}>{newPlugins[i].LeafBar(props)}</span>);
			}
		}

		return <div>{tools}</div>;
	};

	const onKeyDown = useCallback(event => {
		// 监听tab的快捷方式
		if (event.key == 'Tab' && editor.onTabDown && editor.onTabDown()) {
			event.preventDefault();
		}
	}, []);

	const Decorate = useCallback(([node, path]) => {
		for (var i = 0; i < newPlugins.length; i++) {
			if (newPlugins[i].Decorate && newPlugins[i].type === node.type) {
				return newPlugins[i].Decorate(editor, [node, path]);
			}
		}

		return [];
	}, []);
	return (
		<Slate editor={editor} value={value} onChange={onChange}>
			{readOnly ? null : (
				<>
					<Affix offsetTop={0}>
						<div style={{ padding: '10px', background: '#bae7ff' }}>
							<Toolbar />
						</div>
					</Affix>
					<br />
				</>
			)}
			<Editable
				style={{
					fontSize: '16px',
					fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
                    'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
                    'Noto Color Emoji'`,
				}}
				renderElement={readOnly ? renderElementReadOnly : renderElement}
				renderLeaf={renderLeaf}
				onKeyDown={onKeyDown}
				decorate={Decorate}
				spellCheck={false}
				readOnly={readOnly}
				scrollSelectionIntoView={(editor, domRange) => {}}
				placeholder="输入文本"
			/>
		</Slate>
	);
};

export default SEditor;
