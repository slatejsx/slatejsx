import { Divider } from 'antd';
import { memo } from 'react';
import React from 'react';

const Element = memo(props => {
	// 基础配置
	const { attributes, children, element } = props;

	return (
		<div {...attributes}>
			<Divider orientation={element.textAlign || 'center'} style={{ color: '#262626' }}>
				{children}
			</Divider>
		</div>
	);
});

export { Element };
