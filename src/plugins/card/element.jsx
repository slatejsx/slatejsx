import { Alert } from 'antd';
import { iconMap } from './utils/icon';
import { memo } from 'react';
import React from 'react';

const Element = memo(props => {
	// 基础配置
	const { attributes, children, element } = props;

	let icon = null;
	if (element.icon && iconMap[element.icon]) {
		icon = iconMap[element.icon](element.iconColor);
	}

	return (
		<div {...attributes} style={{ paddingTop: '5px', paddingBottom: '5px' }}>
			<Alert type={element.cardType} message={children} icon={icon} showIcon={!!icon} />
		</div>
	);
});

export { Element };
