import { Types } from '@antv/g2';
import { isArray } from '@antv/util';
import { flow, deepAssign } from '../../../utils';
import { Params } from '../../../core/adaptor';
import { Datum, Data } from '../../../types/common';
import { getTooltipMapping } from '../../../utils/tooltip';
import { geometry as baseGeometry } from '../../../adaptor/geometries/base';
import { FunnelOptions } from '../types';
import { FUNNEL_PERCENT, FUNNEL_CONVERSATION, FUNNEL_MAPPING_VALUE } from '../constant';
import { conversionTagComponent, transformData } from './common';

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
  const {
    data,
    xField,
    yField,
    color,
    compareField,
    isTransposed,
    tooltip,
    maxSize,
    minSize,
    label,
    funnelStyle,
    state,
    showFacetTitle,
  } = options;

  chart.facet('mirror', {
    fields: [compareField],
    // 漏斗图的转置规则与分面相反，默认是垂直布局
    transpose: !isTransposed,
    padding: isTransposed ? 0 : [32, 0, 0, 0],
    showTitle: showFacetTitle,
    eachView(view, facet) {
      const index = isTransposed ? facet.rowIndex : facet.columnIndex;

      if (!isTransposed) {
        view.coordinate({
          type: 'rect',
          actions: [['transpose'], ['scale', index === 0 ? -1 : 1, -1]],
        });
      }

      const formatterData = transformData(facet.data, data, {
        yField,
        maxSize,
        minSize,
      });

      view.data(formatterData);

      // 绘制图形
      const { fields, formatter } = getTooltipMapping(tooltip, [xField, yField, compareField]);

      const defaultFacetLabel = isTransposed
        ? {
            offset: index === 0 ? 10 : -23,
            position: (index === 0 ? 'bottom' : 'top') as Types.IntervalGeometryLabelPosition,
          }
        : {
            offset: 10,
            position: 'left' as Types.IntervalGeometryLabelPosition,
            style: {
              textAlign: index === 0 ? 'end' : 'start',
            },
          };

      baseGeometry({
        chart: view,
        options: {
          type: 'interval',
          xField: xField,
          yField: FUNNEL_MAPPING_VALUE,
          colorField: xField,
          tooltipFields: isArray(fields) && fields.concat([FUNNEL_PERCENT, FUNNEL_CONVERSATION]),
          mapping: {
            // todo 暂时不提供 金字塔 shape，后续需要自定义下形状
            shape: 'funnel',
            tooltip: formatter,
            color,
            style: funnelStyle,
          },
          label: label === false ? false : deepAssign({}, defaultFacetLabel, label),
          state,
        },
      });
    },
  });

  return params;
}

/**
 * 转化率组件
 * @param params
 */
function conversionTag(params: Params<FunnelOptions>): Params<FunnelOptions> {
  const { chart, options } = params;
  const { conversionTag, isTransposed } = options;
  // @ts-ignore
  chart.once('beforepaint', () => {
    chart.views.forEach((view, viewIndex) => {
      const getLineCoordinate = (
        datum: Datum,
        datumIndex: number,
        data: Data,
        initLineOption: Record<string, any>
      ): Types.LineOption => {
        const ratio = viewIndex === 0 ? -1 : 1;
        return deepAssign({}, initLineOption, {
          start: [datumIndex - 0.5, datum[FUNNEL_MAPPING_VALUE]],
          end: [datumIndex - 0.5, datum[FUNNEL_MAPPING_VALUE] + 0.05],
          text: isTransposed
            ? {
                style: {
                  textAlign: 'start',
                },
              }
            : {
                offsetX: conversionTag !== false ? ratio * conversionTag.offsetX : 0,
                style: {
                  textAlign: viewIndex === 0 ? 'end' : 'start',
                },
              },
        });
      };

      conversionTagComponent(getLineCoordinate)(
        deepAssign(
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
  return flow(field, geometry, conversionTag)(params);
}
