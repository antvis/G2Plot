import { View } from '@antv/g2';
import { size, valuesOfKey } from '@antv/util';

/**
 * @ignore
 * Determines whether between is
 * @param value
 * @param start
 * @param end
 * @returns true if between
 */
export function isBetween(value: number, start: number, end: number): boolean {
  const min = Math.min(start, end);
  const max = Math.max(start, end);

  return value >= min && value <= max;
}

export const renderWithSlider = (view: View, sliderValue: [number, number]) => {
  const [min, max] = sliderValue;
  const data = view.getOptions().data;
  const xScale = view.getXScale();
  const isHorizontal = true;
  const values = valuesOfKey(data, xScale.field);
  const xValues = isHorizontal ? values : values.reverse();
  const dataSize = size(data);

  if (!xScale || !dataSize) {
    return;
  }
  const xTickCount = size(xValues);

  const minIndex = Math.floor(min * (xTickCount - 1));
  const maxIndex = Math.floor(max * (xTickCount - 1));

  // 增加 x 轴的过滤器
  view.filter(xScale.field, (value: any) => {
    const idx: number = xValues.indexOf(value);
    return idx > -1 ? isBetween(idx, minIndex, maxIndex) : true;
  });
  view.render(true);
};
