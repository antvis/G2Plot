import { deepMix } from '@antv/util';
import { Params } from '../../core/adaptor';
import { tooltip } from '../../common/adaptor';
import { flow } from '../../utils';
import { DualLineOption } from './types';
import { meta, axis, legend, getDefaultOptions, drawLine, drawPoint } from '../common/adaptor';
import { DEFAULT_LINE_CONFIG } from './constant';

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
  const { data } = options;
  chart.data(data);
  return params;
}

/**
 * 绘制图形
 * @param params
 */
function geometry(params: Params<DualLineOption>): Params<DualLineOption> {
  const { chart, options } = params;
  const { data, xField, yField, lineConfigs } = options;

  chart.data(data);
  const [leftLineConfig, rightLineConfig] = lineConfigs;

  // 绘制第一条线
  drawLine(chart, { x: xField, y: yField[0] }, leftLineConfig);
  // 绘制第二条线
  drawLine(chart, { x: xField, y: yField[1] }, rightLineConfig);

  if (leftLineConfig.point) {
    drawPoint(chart, { x: xField, y: yField[0] }, leftLineConfig.point);
  }

  if (rightLineConfig.point) {
    drawPoint(chart, { x: xField, y: yField[1] }, rightLineConfig.point);
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
  flow(getOptions, field, geometry, meta, axis, legend, tooltip)(params);
}
