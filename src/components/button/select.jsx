import React from 'react';
import { Button, Tooltip } from 'antd';

// 单选组件，selected表示选中的按钮，notNull代表不能有空选择
const Select = props => {
  const { selected, notNull, onChange, buttons } = props;

  const onMouseDown = (event, key) => {
    event.preventDefault();

    if (notNull) {
      // 如果必填，点击按钮和当前一致，则不做操作
      if (isKeySelected(key)) {
        return;
      } else {
        onChange(key);
      }
    } else {
      // 如果非必填，点击选中的等于取消
      if (isKeySelected(key)) {
        onChange(null);
      } else {
        onChange(key);
      }
    }
  };

  const isKeySelected = key => {
    return selected && selected == key;
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
    );
  }

  return <span>{buttonArray}</span>;
}

export default Select
