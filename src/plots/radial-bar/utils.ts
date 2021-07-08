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

/**
 * 获取堆叠之后的数据
 */
export function getStackedData(data: Data, xField: string, yField: string) {
  const stackedData: Data = [];
  data.forEach((item) => {
    const valueItem = stackedData.find((v) => v[xField] === item[xField]);
    if (valueItem) {
      valueItem[yField] += item[yField] || null;
    } else {
      stackedData.push({ ...item });
    }
  });
  return stackedData;
}
