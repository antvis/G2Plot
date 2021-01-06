import { Data } from '../../types';

export function getScaleMax(maxAngle: number, yField: string, data: Data): number {
  const yData = data.map((item) => item[yField]);
  const maxValue = Math.max(...yData.filter((v) => v !== undefined));
  const formatRadian = Math.abs(maxAngle) % 360;
  if (!formatRadian) {
    return maxValue;
  }
  return (maxValue * 360) / formatRadian;
}
