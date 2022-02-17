import { Image } from 'antd';
import { config } from './utils/config';
import { memo } from 'react';
import React from 'react';

const Element = memo(props => {
	// 基础配置
	const { attributes, children, element } = props;

	return (
		<div {...attributes} style={{ textAlign: element.textAlign || 'left' }}>
			<Image
				src={element.src}
				style={{ maxWidth: '100%', width: `${element.width}px` }}
				fallback={config.fallback}
			/>
			{children}
		</div>
	);
});

export { Element };
