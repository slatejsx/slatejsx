import { Button } from 'antd';
import { CodepenOutlined } from '@ant-design/icons';
import { setCode, setLanguage } from './utils/node';
import { useSlate } from 'slate-react';
import { Select } from 'antd';
import Prism from 'prismjs';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';
import React from 'react';

const { Option } = Select;

const EditMenu = props => {
	const { element } = props;
	const editor = useSlate();

	const options = [];
	for (var language in Prism.languages) {
		options.push(
			<Option key={language} value={language}>
				{language}
			</Option>
		);
	}

	return (
		<Select
			value={element.language}
			onChange={v => {
				setLanguage(editor, element, v);
			}}
			showSearch
			style={{ width: '100%' }}
			placeholder="搜索语言"
			optionFilterProp="children"
			filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
			filterSort={(optionA, optionB) =>
				optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
			}
		>
			{options}
		</Select>
	);
};

const AddMenu = props => {
	const editor = useSlate();
	const { element } = props;

	return (
		<Button
			type="text"
			icon={<CodepenOutlined style={{ color: '#262626' }} />}
			style={{ width: '100%', textAlign: 'left' }}
			onMouseDown={() => {
				setCode(editor, element);
			}}
		>
			代码块
		</Button>
	);
};

export { EditMenu, AddMenu };
