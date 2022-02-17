import React, { useState } from 'react';

import { Card } from 'antd';

const TableInput = (props) => {
  const {
    rowLength, // 行数
    colLength, // 列数
    normalColor, // 正常颜色
    selectedColor, // 选中区域颜色
    onChange, // 坐标变化回调
    onClick, // 点击格子回调
  } = props;
  // 初始化位置
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);

  // 没有规定长度则默认9*9大小
  const rLength = rowLength || 9;
  const cLength = colLength || 9;
  // 没有设置颜色则使用默认颜色
  const sColor = selectedColor || '#A6E6F8';
  const nColor = normalColor || '#EDF1F1';

  const onMouseOver = (r, c) => {
    resetRowCol(r, c);
  };

  const resetRowCol = (r, c) => {
    setRow(r);
    setCol(c);

    onChange && onChange(r, c);
  };

  const grids = [];
  for (let i = 1; i <= rLength; i++) {
    const rowGrids = [];
    for (let j = 1; j <= cLength; j++) {
      const selected = i <= row && j <= col;

      rowGrids.push(
        <div
          key={j}
          style={{
            backgroundColor: selected ? sColor : nColor,
            height: '25px',
            width: '25px',
            margin: '3px',
            display: 'inline-block',
          }}
          onMouseOver={() => onMouseOver(i, j)}
          onClick={() => onClick && onClick(i, j)}
        />,
      )
    }
    grids.push(<div key={i}>{rowGrids}</div>);
  }

  const width = rLength * 31 + 3;
  const height = cLength * 31 + 3;

  return (
    <Card>
      <div
        style={{
          cursor: 'pointer',
          fontSize: 0,
          height: height,
          width: width,
        }}
        onMouseLeave={() => {resetRowCol(0, 0)}}
      >
        {grids}
      </div>
    </Card>
  )
}

export default TableInput