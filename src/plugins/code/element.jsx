import { useSlate, ReactEditor } from 'slate-react';
import { Editor } from 'slate';
import { Button, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { memo } from 'react';
import React from 'react';

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

const Element = memo(props => {
	// 子组件
	const { element, children } = props;
	// 基础配置
	const { attributes } = props;

	const [hover, setHover] = useState();

	const editor = useSlate();

	return (
		<div
			style={{
				backgroundColor: '#fafafa',
				width: '100%',
				padding: '10px',
				color: '#000000',
				fontSize: '1em',
				tabSize: 4,
				marginTop: '10px',
				marginBottom: '10px',
				position: 'relative',
			}}
			onMouseOver={() => {
				setHover(true);
			}}
			onMouseLeave={() => {
				setHover(false);
			}}
			{...attributes}
		>
			<div
				contentEditable={false}
				onClick={() => {
					const codeStringArr = [];
					for (var child of element.children) {
						const at = ReactEditor.findPath(editor, child);
						codeStringArr.push(Editor.string(editor, at));
					}

					execCoy(codeStringArr.join('\n'));
					message.success('代码拷贝成功～');
				}}
				style={{
					display: hover ? 'inline' : 'none',
					position: 'absolute',
					top: '0.5em',
					right: '0.5em',
				}}
			>
				<Button icon={<CopyOutlined style={{ color: '#5b8c00' }} />}>{element.language}</Button>
			</div>
			<div style={{ overflowX: 'auto' }}>{children}</div>
		</div>
	);
});

const CodeLineElement = props => {
	// 子组件
	const { children } = props;
	// 基础配置
	const { attributes } = props;

	return (
		<div
			style={{
				minWidth: '3000px', // 宽度至少3000px，保证代码行内不换行
				fontFamily: `monospace`,
			}}
			{...attributes}
		>
			{children}
		</div>
	);
};

export { Element, CodeLineElement };
