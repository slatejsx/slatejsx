import { codeColorConfig } from './utils/config';
import React from 'react';

const Leaf = ({ attributes, children, leaf }) => {
	if (!leaf.codeType || !codeColorConfig[leaf.codeType]) {
		return <span {...attributes}>{children}</span>;
	}

	return (
		<span style={{ color: codeColorConfig[leaf.codeType] }} {...attributes}>
			{children}
		</span>
	);
};

export { Leaf };
