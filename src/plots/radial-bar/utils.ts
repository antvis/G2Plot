export function getScaleMax(maxRadian: number, yField: string, data: Record<string, any>[]): number {
  const defaultMaxRadian = 240; // 默认最大弧度240度
  const yData = data.map((item) => item[yField]);
  const maxValue = Math.max(...yData);
  if (maxRadian) {
    const formatRadian = Math.abs(maxRadian) % 360;
    return (maxValue * 360) / formatRadian;
  }
  return (maxValue * 360) / defaultMaxRadian;
}
