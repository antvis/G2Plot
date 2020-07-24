import { deepMix } from '@antv/util';
import { Params } from '../../core/adaptor';
import { tooltip } from '../../common/adaptor';
import { flow } from '../../utils';
import { DualLineOption } from './types';
import { meta, axis, legend, getDefaultOptions } from '../common/adaptor';

export const DEFAULT_LINE_CONFIG = {
  lineSize: 2,
  connectNulls: true,
  smooth: false,
  point: {
    visible: false,
    size: 3,
    shape: 'circle',
    style: {
      stroke: '#fff',
    },
  },
  label: {
    visible: false,
  },
};

/**
 * 获取默认参数设置
 * 因 deepMix 对数组类型无效，为防止出现lineConfigs: [{ color: 1}, {}] 类似的情况，加一个判断
 * TODO 这里最好还是在再封装一个函数吧，因为 YAxis 也可能有这种情况
 * @param params
 */
export function getOptions(params: Params<DualLineOption>): Params<DualLineOption> {
  const mixOption = {
    options: {
      lineConfigs: [
        deepMix(
          {},
          DEFAULT_LINE_CONFIG,
          { color: '#5B8FF9' },
          params.options.lineConfigs && params.options.lineConfigs[0]
        ),
        deepMix(
          {},
          DEFAULT_LINE_CONFIG,
          { color: '#e76c5e' },
          params.options.lineConfigs && params.options.lineConfigs[1]
        ),
      ],
    },
  };

  return deepMix({}, { options: getDefaultOptions() }, params, mixOption);
}

/**
 * 字段
 * TODO 这里面应该有可以再抽一层的的地方，写下一个混合图表时加上吧
 * @param params
 */
function field(params: Params<DualLineOption>): Params<DualLineOption> {
  const { chart, options } = params;
  const { data, xField, yField, lineConfigs } = options;

  chart.data(data);
  const [leftLineConfig, rightLineConfig] = lineConfigs;

  // 绘制第一条线
  chart
    .line({ connectNulls: leftLineConfig.connectNulls })
    .position(`${xField}*${yField[0]}`)
    .color(leftLineConfig.color)
    .size(Number(leftLineConfig.lineSize))
    .shape(leftLineConfig.smooth ? 'smooth' : 'line');

  if (leftLineConfig.point && leftLineConfig.point.visible) {
    chart.point().size(leftLineConfig.point.size).position(`${xField}*${yField[0]}`).shape(leftLineConfig.point.shape);
  }

  // 绘制第二条线
  chart
    .line({ connectNulls: rightLineConfig.connectNulls })
    .position(`${xField}*${yField[1]}`)
    .color(rightLineConfig.color)
    .size(Number(rightLineConfig.lineSize))
    .shape(rightLineConfig.smooth ? 'smooth' : 'line');

  if (rightLineConfig.point && rightLineConfig.point.visible) {
    chart
      .point()
      .size(rightLineConfig.point.size)
      .position(`${xField}*${yField[0]}`)
      .shape(rightLineConfig.point.shape);
  }
  return params;
}

/**
 * 双折线图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<DualLineOption>) {
  // flow 的方式处理所有的配置到 G2 API
  flow(getOptions, field, meta, axis, legend, tooltip)(params);
}
