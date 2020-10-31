import { map } from '@antv/util';
import { LineOption } from '@antv/g2/lib/interface';
import { flow, findGeometry, deepMix } from '../../../utils';
import { Params } from '../../../core/adaptor';
import { Datum, Data } from '../../../types/common';
import { FunnelOptions } from '../types';
import { FUNNEL_PERCENT } from '../constant';
import { geometryLabel, conversionTagComponent } from './common';

/**
 * 处理字段数据
 * @param params
 */
function field(params: Params<FunnelOptions>): Params<FunnelOptions> {
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
  const { xField, yField, color, compareField, isTransposed } = options;

  chart.facet('mirror', {
    fields: [compareField],
    // 漏斗图的转置规则与分面相反，默认是垂直布局
    transpose: !isTransposed,
    padding: 0,
    eachView(view, facet) {
      if (!isTransposed) {
        view.coordinate({
          type: 'rect',
          actions: [['transpose'], ['scale', facet.columnIndex === 0 ? -1 : 1, -1]],
        });
      }
      // 绘制图形
      view.interval().position(`${xField}*${yField}*${FUNNEL_PERCENT}`).shape('funnel').color(xField, color).style({
        lineWidth: 1,
        stroke: '#fff',
      });
    },
  });

  return params;
}

/**
 * label 处理
 * @param params
 */
function label(params: Params<FunnelOptions>): Params<FunnelOptions> {
  const { chart, options } = params;
  const { label } = options;

  chart.once('beforepaint', () => {
    chart.views.forEach((view, index) => {
      const geometry = findGeometry(view, 'interval');
      geometryLabel(geometry)(
        label
          ? deepMix({}, params, {
              options: {
                label: {
                  offset: 10,
                  position: 'left',
                  style: {
                    textAlign: index === 0 ? 'end' : 'start',
                  },
                },
              },
            })
          : params
      );
    });
  });
  return params;
}

/**
 * 转化率组件
 * @param params
 */
function conversionTag(params: Params<FunnelOptions>): Params<FunnelOptions> {
  const { chart, options } = params;
  const { yField, conversionTag } = options;

  chart.once('beforepaint', () => {
    chart.views.forEach((view, viewIndex) => {
      const getLineCoordinate = (datum: Datum, datumIndex: number, data: Data): LineOption => {
        const ratio = viewIndex === 0 ? -1 : 1;
        return {
          start: [datumIndex - 0.5, data[0][yField] * datum[FUNNEL_PERCENT]],
          end: [datumIndex - 0.5, data[0][yField] * (datum[FUNNEL_PERCENT] + 0.05)],
          text: {
            content: undefined,
            offsetX: conversionTag !== false ? ratio * conversionTag.offsetX : 0,
            style: {
              textAlign: viewIndex === 0 ? 'end' : 'start',
            },
          },
        };
      };

      conversionTagComponent(getLineCoordinate)(
        deepMix(
          {},
          {
            chart: view,
            options,
          }
        )
      );
    });
  });
  return params;
}

/**
 * 对比漏斗
 * @param chart
 * @param options
 */
export function compareFunnel(params: Params<FunnelOptions>) {
  return flow(field, geometry, label, conversionTag)(params);
}
