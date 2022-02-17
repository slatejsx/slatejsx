import {
	TagOutlined,
	TagsOutlined,
	SoundOutlined,
	ThunderboltOutlined,
	StarOutlined,
	SettingOutlined,
	ScheduleOutlined,
	PushpinOutlined,
	MessageOutlined,
	HeartOutlined,
	EditOutlined,
	SnippetsOutlined,
	AliwangwangOutlined,
	WarningOutlined,
	CaretUpOutlined,
	CaretDownOutlined,
	SmileOutlined,
	QuestionCircleOutlined,
	WechatOutlined,
	WeiboOutlined,
} from '@ant-design/icons';
import React from 'react';

const iconMap = {
	tag: color => {
		return <TagOutlined style={{ color }} />;
	},
	tags: color => {
		return <TagsOutlined style={{ color }} />;
	},
	sound: color => {
		return <SoundOutlined style={{ color }} />;
	},
	question: color => {
		return <QuestionCircleOutlined style={{ color }} />;
	},
	thunderbolt: color => {
		return <ThunderboltOutlined style={{ color }} />;
	},
	star: color => {
		return <StarOutlined style={{ color }} />;
	},
	setting: color => {
		return <SettingOutlined style={{ color }} />;
	},
	schedule: color => {
		return <ScheduleOutlined style={{ color }} />;
	},
	pushpin: color => {
		return <PushpinOutlined style={{ color }} />;
	},
	message: color => {
		return <MessageOutlined style={{ color }} />;
	},
	heart: color => {
		return <HeartOutlined style={{ color }} />;
	},
	edit: color => {
		return <EditOutlined style={{ color }} />;
	},
	snipets: color => {
		return <SnippetsOutlined style={{ color }} />;
	},
	aliwangwang: color => {
		return <AliwangwangOutlined style={{ color }} />;
	},
	wechat: color => {
		return <WechatOutlined style={{ color }} />;
	},
	weibo: color => {
		return <WeiboOutlined style={{ color }} />;
	},
	warning: color => {
		return <WarningOutlined style={{ color }} />;
	},
	careUP: color => {
		return <CaretUpOutlined style={{ color }} />;
	},
	careDown: color => {
		return <CaretDownOutlined style={{ color }} />;
	},
	smile: color => {
		return <SmileOutlined style={{ color }} />;
	},
};

const iconColorList = ['#cf1322', '#fadb14', '#08979c', '#096dd9', '#000000'];

export { iconMap, iconColorList };
