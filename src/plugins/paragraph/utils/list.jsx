// 通过order转数字
const getLetterByOrder = order => {
  const result = []
  while (order) {
    var t = order % 26;
    if (!t) {
      t = 26;
      --order;
    }
    result.push(String.fromCodePoint(t + 64));
    order = ~~(order / 26);
  }
  return result.reverse().join('');
};

const orderUse = (offset, order) => {
  const type = offset % 3;
  if (type === 0) {
    return order;
  } else if (type === 1) {
    return getLetterByOrder(order);
  } else {
    return getLetterByOrder(order).toLowerCase();
  }
};

const uListUse = offset => {
  const type = offset % 4;
  if (type === 0) {
    return '•';
  } else if (type === 1) {
    return '◦';
  } else if (type === 2) {
    return '▪';
  } else {
    return '▫';
  }
};

export { orderUse, uListUse };
