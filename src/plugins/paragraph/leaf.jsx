import React from 'react';

const Leaf = ({ attributes, children, leaf }) => {
	// 加粗
	if (leaf.bold) {
		children = <b>{children}</b>;
	}

	// 斜线
	if (leaf.italic) {
		children = <i>{children}</i>;
	}

	// 下划线
	if (leaf.underline) {
		children = <u>{children}</u>;
	}

	// 处理删除线
	if (leaf.strikethrough) {
		children = <s>{children}</s>;
	}

	// 处理代码块
	if (leaf.code) {
		children = (
			<span style={{ backgroundColor: '#DCDCDC', borderRadius: '5px' }}>
				<span style={{ marginLeft: '5px', marginRight: '5px' }}>{children}</span>
			</span>
		);
	}

	// // 处理超链接
	// if (leaf.link) {
	//     children = (
	//         <Tooltip title={leaf.link}>
	//             <span
	//                 style={{
	//                     color: '#007FFF',
	//                     cursor: 'pointer',
	//                 }}
	//                 onMouseDown={() => {
	//                     window.open(leaf.link, '_blank');
	//                 }}
	//             >
	//                 {children}
	//             </span>
	//         </Tooltip>
	//     )
	// }

	// 处理文字颜色
	if (leaf.fontColor) {
		children = (
			<span
				style={{
					color: leaf.fontColor,
				}}
			>
				{children}
			</span>
		);
	}

	// 处理背景颜色
	let backgroundColor = '';
	if (leaf.backgroundColor) {
		backgroundColor = leaf.backgroundColor;
	}

	return (
		<span style={{ backgroundColor: backgroundColor }} {...attributes}>
			{children}
		</span>
	);
};

export { Leaf };
