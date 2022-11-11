import { Params } from '../../../core/adaptor';
import { deepAssign, flow } from '../../../utils';
import { FunnelOptions } from '../types';
import { basicFunnel } from './basic';

/**
 * 处理字段数据
 * @param params
 */
function field(params: Params<FunnelOptions>): Params<FunnelOptions> {
  const { chart, options } = params;
  const { data = [], yField } = options;
  // 绘制漏斗图
  chart.data(data);
  chart.scale({
    [yField]: {
      sync: true,
    },
  });
  return params;
}

/**
 * geometry处理
 * @param params
 */
function geometry(params: Params<FunnelOptions>): Params<FunnelOptions> {
  const { chart, options } = params;
  const { seriesField, isTransposed, showFacetTitle } = options;

  chart.facet('rect', {
    fields: [seriesField],
    padding: [isTransposed ? 0 : 32, 10, 0, 10],
    showTitle: showFacetTitle,
    eachView(view, facet) {
      basicFunnel(
        deepAssign({}, params, {
          chart: view,
          options: {
            data: facet.data,
          },
        })
      );
    },
  });

  return params;
}

/**
 * 分面漏斗
 * @param chart
 * @param options
 */
export function facetFunnel(params: Params<FunnelOptions>) {
  return flow(field, geometry)(params);
}
