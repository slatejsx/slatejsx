import { memo } from 'react';
import React from 'react';

const Element = memo(props => {
	// 基础配置
	const { attributes, children, element } = props;

	return (
		<div {...attributes} style={{ width: '100%', textAlign: element.textAlign || 'left' }}>
			<iframe
				src={element.src}
				scrolling="no"
				border={0}
				frameBorder="no"
				framespacing={0}
				allowFullScreen={true}
				style={{
					width: `${element.width}px`,
					height: `${element.width * 0.7}px`,
					maxWidth: '100%',
				}}
			></iframe>
			{children}
		</div>
	);
});

export { Element };
