import {
	DeleteOutlined,
	PlusCircleOutlined,
	EditOutlined,
	UpCircleOutlined,
	DownCircleOutlined,
} from '@ant-design/icons';
import { Popover, Button } from 'antd';
import { ReactEditor, useSlate } from 'slate-react';
import React, { useState } from 'react';
import { deleteNode, insertNextEmptyNode, insertPreviousEmptyNode } from './node';

const Menu = props => {
	const { element, children, plugins, editMenu } = props;
	const editor = useSlate();

	// 如果editor有设置isEmpty函数就用editor的
	const isEmpty = editor.isEmpty(element);

	const AddMenu = props => {
		const at = ReactEditor.findPath(editor, element);
		const level = at.length;

		const addMenuList = [];
		for (var i = 0; i < plugins.length; i++) {
			if (!plugins[i].IsBlock) {
				continue;
			}

			if (plugins[i].Level && plugins[i].Level < level) {
				continue;
			}

			addMenuList.push(<span key={i}>{plugins[i].AddMenu(props)}</span>);
			addMenuList.push(<hr key={`${i}hr`} style={{ border: '1px solid #f5f5f5' }} />);
		}

		return <div style={{ width: '200px' }}>{addMenuList}</div>;
	};

	const EditMenu = props => {
		return (
			<div style={{ width: '200px' }}>
				{editMenu ? editMenu(props) : null}
				{editMenu ? <hr style={{ border: '1px solid #f5f5f5' }} /> : null}
				<Button
					type="text"
					icon={<DeleteOutlined style={{ color: 'red' }} />}
					style={{ width: '100%', textAlign: 'left' }}
					onMouseDown={() => deleteNode(editor, element)}
				>
					清空当前行
				</Button>
				<hr style={{ border: '1px solid #f5f5f5' }} />
				<Button
					type="text"
					icon={<UpCircleOutlined style={{ color: '#096dd9' }} />}
					style={{ width: '100%', textAlign: 'left' }}
					onMouseDown={() => insertPreviousEmptyNode(editor, element)}
				>
					上方插入空白行
				</Button>
				<hr style={{ border: '1px solid #f5f5f5' }} />
				<Button
					type="text"
					icon={<DownCircleOutlined style={{ color: '#237804' }} />}
					style={{ width: '100%', textAlign: 'left' }}
					onMouseDown={() => insertNextEmptyNode(editor, element)}
				>
					下方插入空白行
				</Button>
			</div>
		);
	};

	const EditIcon = () => {
		if (isEmpty) {
			return <PlusCircleOutlined />;
		} else {
			return <EditOutlined />;
		}
	};

	const LeftMenu = () => {
		if (isEmpty) {
			return <AddMenu {...props} />;
		} else {
			return <EditMenu {...props} />;
		}
	};

	const [isEdit, setIsEdit] = useState(false);

	const HoverMenu = () => {
		return (
			<div onMouseOver={() => setIsEdit(true)} onMouseLeave={() => setIsEdit(false)}>
				{isEdit ? <LeftMenu /> : <EditIcon />}
			</div>
		);
	};

	return (
		<Popover content={<HoverMenu />} placement="leftTop">
			<div
				style={{
					backgroundColor: isEdit ? '#e6f7ff' : '',
				}}
			>
				{children}
			</div>
		</Popover>
	);
};

export { Menu };
