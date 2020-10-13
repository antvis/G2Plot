import { map } from '@antv/util';
import { flow } from '../../../utils';
import { Params } from '../../../core/adaptor';
import { FunnelAdaptorOptions } from '../types';
import { FUNNEL_PERCENT } from '../constant';

/**
 * 处理字段数据
 * @param params
 */
function field(params: Params<FunnelAdaptorOptions>): Params<FunnelAdaptorOptions> {
  const { chart, options } = params;
  const { data = [], yField, compareField } = options;
  // 处理数据
  let formatData = [];
  if (data[0][yField]) {
    // format 数据
    const firstRecord = {};
    formatData = map(data, (row) => {
      if (row[yField] !== undefined && row[compareField]) {
        if (!firstRecord[row[compareField]]) {
          firstRecord[row[compareField]] = row[yField];
        }
        row[FUNNEL_PERCENT] = row[yField] / firstRecord[row[compareField]];
      }
      return row;
    });
  }

  // 绘制漏斗图
  chart.data(formatData);
  return params;
}

/**
 * geometry处理
 * @param params
 */
function geometry(params: Params<FunnelAdaptorOptions>): Params<FunnelAdaptorOptions> {
  const { chart, options } = params;
  const { xField, yField, color, compareField, label, transpose } = options;

  const { data: formatData } = chart.getOptions();

  chart.scale({
    [yField]: {
      sync: true,
    },
  });

  chart.facet('mirror', {
    fields: [compareField, null],
    // 漏斗图的转置规则与分面相反，默认是垂直布局
    transpose: !transpose,
    padding: 0,
    eachView(view, facet) {
      if (!transpose) {
        // 垂直布局
        view
          .coordinate('rect')
          .transpose()
          .scale(facet.columnIndex === 0 ? -1 : 1, -1);
      }
      // 绘制图形
      const funnelGeometry = view
        .interval()
        .position(`${xField}*${yField}*${FUNNEL_PERCENT}`)
        .shape('funnel')
        .color(xField, color)
        .style({
          lineWidth: 1,
          stroke: '#fff',
        });

      // 对比漏斗图中，使用分面无法同步获取到 chart.views，因此 label 和 annotation 不做拆分，逻辑直接写在下方

      // 绘制 label
      if (!label) {
        funnelGeometry.label(false);
      } else {
        const { callback, ...cfg } = label;
        funnelGeometry.label({
          fields: [xField, yField, FUNNEL_PERCENT],
          callback,
          cfg,
        });
      }

      // 绘制 annotation
      formatData.map((obj) => {
        if (obj[compareField] === facet.columnValue) {
          view.annotation().text({
            top: true,
            position: [obj[xField], 'min'],
            content: obj[yField],
            style: {
              fill: '#fff',
              stroke: null,
              fontSize: 12,
              textAlign: facet.columnIndex ? 'start' : 'end',
            },
            offsetX: facet.columnIndex ? 10 : -10,
          });
        }
        return null;
      });
    },
  });

  return params;
}

/**
 * 对比漏斗
 * @param chart
 * @param options
 */
export function compareFunnel(params: Params<FunnelAdaptorOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(field, geometry)(params);
}
