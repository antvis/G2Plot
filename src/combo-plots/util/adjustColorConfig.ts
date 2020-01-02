import * as _ from '@antv/util';
import { ViewLayerConfig } from '../../base/view-layer';
import { getGlobalTheme } from '../../theme/global';

const SINGLE_TYPE = ['line', 'area', 'column', 'bar', 'bubble', 'scatter'];

export function getColorConfig(type: string, props: ViewLayerConfig, count: number) {
  if (props.color) {
    return { single: false, color: props.color };
  }
  const isSingle = isSingleGraph(type, props);
  const { colors } = getGlobalTheme();
  if (isSingle && !props.color) {
    return { single: true, color: colors[count] };
  }
}

/** 判断是不是单图元类型的图表：单折线图、基础柱状图、散点图、基础面积图等 */
export function isSingleGraph(type: string, props: ViewLayerConfig) {
  if (_.contains(SINGLE_TYPE, type)) {
    if (type === 'line' && _.has(props, 'seriesField')) {
      return false;
    }
    if (type === 'column' && _.has(props, 'colorField')) {
      return false;
    }
    return true;
  }
  return false;
}
