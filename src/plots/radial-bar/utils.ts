import { Data } from '../../types';

export function getScaleMax(maxAngle: number, yField: string, data: Data): number {
  const yData = data.map((item) => item[yField]).filter((v) => v !== undefined);
  const maxValue = yData.length > 0 ? Math.max(...yData) : 0;
  const formatRadian = Math.abs(maxAngle) % 360;
  if (!formatRadian) {
    return maxValue;
  }
  return (maxValue * 360) / formatRadian;
}

// 获取isStack 下的最大值
export function getScaleIsStackMax(maxAngle: number, yField: string, xField: string, data: Data) {
  const newData: Data = [];
  data.forEach((item) => {
    const valueItem = newData.find((v) => v[xField] === item[xField]);
    if (valueItem) {
      valueItem[yField] += item[yField];
    } else {
      newData.push({ ...item });
    }
  });
  return getScaleMax(maxAngle, yField, newData);
}
