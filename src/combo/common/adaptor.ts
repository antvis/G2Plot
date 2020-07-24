import { deepMix } from '@antv/util';
import { Params } from '../../core/adaptor';
import { pick } from '../../utils';
import { ComboOption } from '../utils/interface';

export const DEFAULT_YAXIS_CONFIG = {
  visible: true,
  colorMapping: true,
  grid: {
    visible: true,
  },
  line: {
    visible: false,
  },
  tickLine: {
    visible: false,
  },
  label: {
    visible: true,
    autoHide: true,
    autoRotate: false,
  },
  title: {
    autoRotate: true,
    visible: false,
    offset: 12,
  },
};

/**
 * getDefaultOptions 获取默认Option，
 * @param params
 */
export function getDefaultOptions(): ComboOption {
  return {
    // TODO: width meta等应该是在基础 adaptor 中声明，待基础adaptor 完善后，优化此处，去除ts-ignore
    // @ts-ignore
    yAxis: [DEFAULT_YAXIS_CONFIG, DEFAULT_YAXIS_CONFIG],
    legend: {
      position: 'top',
    },
    tooltip: {
      showCrosshairs: true,
      shared: true,
    },
  };
}

/**
 * meta 配置
 * @param params
 */
export function meta(params: Params<ComboOption>): Params<ComboOption> {
  const { chart, options } = params;
  const { meta, xAxis, yAxis, xField, yField } = options;

  // 组装双 Y 轴度量  
  const KEYS = ['type', 'tickCount', 'tickInterval', 'nice', 'max', 'min'];

  const scales = deepMix({}, meta, {
    [xField]: pick(xAxis, KEYS),
    [yField[0]]: pick(yAxis[0], KEYS),
    [yField[1]]: pick(yAxis[1], KEYS),
  });

  chart.scale(scales);
  return params;
}

/**
 * axis 配置
 * @param params
 */
export function axis(params: Params<ComboOption>): Params<ComboOption> {
  const { chart, options } = params;
  const { xAxis, yAxis, xField, yField } = options;
  chart.axis(xField, xAxis);
  chart.axis(yField[0], yAxis[0]);
  chart.axis(yField[1], yAxis[1]);
  return params;
}

/**
 * legend 配置
 * @param params
 */
export function legend(params: Params<ComboOption>): Params<ComboOption> {
  const { chart, options } = params;
  const { legend, yField } = options;
  console.log(legend);
  if (legend) {
    chart.legend(yField[0], legend);
    chart.legend(yField[1], legend);
  }
  return params;
}
