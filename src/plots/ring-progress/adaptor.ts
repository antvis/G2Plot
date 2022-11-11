import { get, isNil } from '@antv/util';
import { animation, annotation, scale, theme } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { deepAssign, flow, renderStatistic } from '../../utils';
import { geometry } from '../progress/adaptor';
import { RingProgressOptions } from './types';

/**
 * coordinate 配置
 * @param params
 */
function coordinate(params: Params<RingProgressOptions>): Params<RingProgressOptions> {
  const { chart, options } = params;
  const { innerRadius, radius } = options;

  // coordinate
  chart.coordinate('theta', {
    innerRadius,
    radius,
  });

  return params;
}

/**
 * statistic 配置
 * @param params
 */
export function statistic(params: Params<RingProgressOptions>, updated?: boolean): Params<RingProgressOptions> {
  const { chart, options } = params;
  const { innerRadius, statistic, percent, meta } = options;

  // 先清空标注，再重新渲染
  chart.getController('annotation').clear(true);

  /** 中心文本 指标卡 */
  if (innerRadius && statistic) {
    const metaFormatter = get(meta, ['percent', 'formatter']) || ((v) => `${(v * 100).toFixed(2)}%`);
    let contentOpt = statistic.content;
    if (contentOpt) {
      contentOpt = deepAssign({}, contentOpt, {
        content: !isNil(contentOpt.content) ? contentOpt.content : metaFormatter(percent),
      });
    }
    renderStatistic(
      chart,
      { statistic: { ...statistic, content: contentOpt }, plotType: 'ring-progress' },
      { percent }
    );
  }

  if (updated) {
    chart.render(true);
  }

  return params;
}

/**
 * 环形进度图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<RingProgressOptions>) {
  return flow(geometry, scale({}), coordinate, statistic, animation, theme, annotation())(params);
}
