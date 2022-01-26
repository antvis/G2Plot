import { View } from '@antv/g2';
import { size, valuesOfKey } from '@antv/util';
import { isBetween } from '../../../utils';

/**
 * 右侧 View 进行 slider 过滤
 * 由于双轴图是多 View , 需要监听左侧 Slider 的 change 事件来同步右侧 View
 * @param { View } view 右侧视图
 * @param { number[] } sliderValue 滑块当前值
 * @returns void
 */
export const doSliderFilter = (view: View, sliderValue: [number, number]) => {
  const [min, max] = sliderValue;
  const data = view.getOptions().data;
  const xScale = view.getXScale();
  const dataSize = size(data);
  if (!xScale || !dataSize) {
    return;
  }
  const isHorizontal = true;
  const values = valuesOfKey(data, xScale.field);
  const xValues = isHorizontal ? values : values.reverse();
  const xTickCount = size(xValues);
  const minIndex = Math.floor(min * (xTickCount - 1));
  const maxIndex = Math.floor(max * (xTickCount - 1));

  // 增加 x 轴的过滤器
  view.filter(xScale.field, (value: any) => {
    const idx: number = xValues.indexOf(value);
    return idx > -1 ? isBetween(idx, minIndex, maxIndex) : true;
  });
  view.getRootView().render(true);
};
