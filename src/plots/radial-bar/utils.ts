import { Data } from '../../types';

type Option = {
  xField?: string;
  yField?: string;
  maxAngle?: number;
  isStack?: boolean;
  isGroup?: boolean;
};

export function getScaleMax(data: Data, option: Option): number {
  const { xField, yField, maxAngle, isStack, isGroup } = option;
  // 有堆叠并且没有分组 则叠加数据
  const newData =
    isStack && !isGroup
      ? data.reduce((value: Data, item) => {
          const valueItem = value.find((v) => v[xField] === item[xField]);
          if (valueItem) {
            valueItem[yField] += item[yField];
          } else {
            value.push({ ...item });
          }
          return value;
        }, [])
      : data;

  const yData = newData.map((item) => item[yField]).filter((v) => v !== undefined);
  const maxValue = yData.length > 0 ? Math.max(...yData) : 0;
  const formatRadian = Math.abs(maxAngle) % 360;
  if (!formatRadian) {
    return maxValue;
  }
  return (maxValue * 360) / formatRadian;
}
