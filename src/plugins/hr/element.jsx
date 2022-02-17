import { Divider } from 'antd';
import { memo } from 'react';
import React from 'react';

const Element = memo(props => {
	// 基础配置
	const { attributes, children } = props;

	return (
		<div {...attributes} style={{ height: '10px' }}>
			<Divider />
			{children}
		</div>
	);
});

export { Element };
