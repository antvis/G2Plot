import { get } from '@antv/util';
import { Params } from '../../core/adaptor';
import { flow, renderStatistic } from '../../utils';
import { scale, animation, theme, annotation } from '../../adaptor/common';
import { geometry } from '../progress/adaptor';
import { PERCENT } from '../gauge/constants';
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
    const transformContent = statistic.content;
    if (transformContent && !transformContent.formatter) {
      // @ts-ignore
      transformContent.formatter = ({ percent }) => {
        const metaFormatter = get(meta, [PERCENT, 'formatter']);
        if (metaFormatter) {
          return metaFormatter(percent);
        }
        return percent;
      };
    }
    renderStatistic(
      chart,
      { statistic: { ...statistic, content: transformContent }, plotType: 'ring-progress' },
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
