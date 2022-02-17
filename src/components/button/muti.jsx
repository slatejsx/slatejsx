import React from 'react';
import { Button, Tooltip } from 'antd';

// 多选组件，selected表示选中的按钮，notNull代表不能有空选择
const Muti = props => {
  const { selectedKeys, onChange, buttons } = props;

  const onMouseDown = (event, key) => {
    event.preventDefault();

    onChange(key);
  };

  const isKeySelected = key => {
    for (let i = 0; i < selectedKeys.length; i++) {
      if (selectedKeys[i] == key) {
        return true;
      }
    }

    return false;
  };

  const buttonArray = [];
  for (let i = 0; i < buttons.length; i++) {
    buttonArray.push(
      <Tooltip key={buttons[i].key} title={buttons[i].description}>
        <Button
          size="small"
          type={isKeySelected(buttons[i].key) ? 'primary' : 'default'}
          onMouseDown={event => onMouseDown(event, buttons[i].key)}
          style={{ marginLeft: '2px', marginRight: '2px' }}
        >
          {buttons[i].content}
        </Button>
      </Tooltip>
    )
  }

  return <span>{buttonArray}</span>
}

export default Muti