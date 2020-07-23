// 进行转换得到值所在的range
export function getBinKey(value: number, binWidth: number): [number, number] {
  const index = Math.floor(value / binWidth);
  return [binWidth * index, binWidth * (index + 1)];
}

export function sturges(values: Array<number>): number {
  return Math.ceil(Math.log(values.length) / Math.LN2) + 1;
}
