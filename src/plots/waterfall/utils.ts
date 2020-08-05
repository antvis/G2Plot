import { isNumber, isNaN } from 'lodash';

/**
 * @desc 数据处理函数，统一将数据处理成[start, end]
 * @param data 
 * @param xField 
 * @param yField 
 * @param showTotal 
 * @param totalLabel 
 */
export function processData (data: any[], xField, yField, showTotal, totalLabel) {
  try {
    let preSum = 0; // 前置项总和
    const newData = [];
    data.forEach((item, index) => {
      // 校验数据合法性
      if ( !isNumber(item[yField]) || isNaN(item[yField]) ) {
        throw(`${item[yField]} 必须是有效数字`);
      }
      // 处理数据
      if (index === 0) {
        newData.push({
          ...item,
          [yField]: [0, item[yField]]
        })
      } else {
        newData.push({
          ...item,
          [yField]: [preSum, preSum + item[yField]]
        })
      }
      preSum = preSum + item[yField];
    });
    // 如果需要展示总和
    if (showTotal) {
      newData.push({
        [xField]: totalLabel || '总和',
        [yField]: [0, preSum],
      })
    }
    return newData;
  } catch (err) {
    console.error(err);
    return [];
  }
}