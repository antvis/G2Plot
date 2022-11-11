import { Geometry } from '@antv/g2';
import { each } from '@antv/util';
import { animation, annotation, interaction, theme, tooltip } from '../../adaptor/common';
import { geometry as geometryAdaptor } from '../../adaptor/geometries/base';
import { AXIS_META_CONFIG_KEYS } from '../../constant';
import { Params } from '../../core/adaptor';
import { PLOT_CONTAINER_OPTIONS } from '../../core/plot';
import { Axis } from '../../types/axis';
import { Interaction } from '../../types/interaction';
import { Legend } from '../../types/legend';
import { deepAssign, flow, pick } from '../../utils';
import { IGeometry, IView, MixOptions } from './types';
import { execPlotAdaptor } from './utils';

/**
 * geometry 处理
 * @param params
 */
function multiView(params: Params<MixOptions>): Params<MixOptions> {
  const { chart, options } = params;
  const { views, legend } = options;

  each(views, (v: IView) => {
    const { region, data, meta, axes, coordinate, interactions, annotations, tooltip, geometries } = v;

    // 1. 创建 view
    const viewOfG2 = chart.createView({
      region,
    });

    // 2. data
    viewOfG2.data(data);

    // 3. meta
    let scales: Record<string, any> = {};
    if (axes) {
      each(axes, (axis: Axis, field: string) => {
        scales[field] = pick(axis, AXIS_META_CONFIG_KEYS);
      });
    }

    scales = deepAssign({}, meta, scales);
    viewOfG2.scale(scales);

    // 4. x y axis
    if (!axes) {
      viewOfG2.axis(false);
    } else {
      each(axes, (axis: Axis, field: string) => {
        viewOfG2.axis(field, axis);
      });
    }

    // 5. coordinate
    viewOfG2.coordinate(coordinate);

    // 6. geometry
    each(geometries, (geometry: IGeometry) => {
      const { ext } = geometryAdaptor({
        chart: viewOfG2,
        options: geometry,
      });

      // adjust
      const { adjust } = geometry;
      if (adjust) {
        ext.geometry.adjust(adjust);
      }
    });

    // 7. interactions
    each(interactions, (interaction: Interaction) => {
      if (interaction.enable === false) {
        viewOfG2.removeInteraction(interaction.type);
      } else {
        viewOfG2.interaction(interaction.type, interaction.cfg);
      }
    });

    // 8. annotations
    each(annotations, (annotation) => {
      viewOfG2.annotation()[annotation.type]({
        ...annotation,
      });
    });

    // 9. animation (先做动画)
    if (typeof v.animation === 'boolean') {
      viewOfG2.animate(false);
    } else {
      viewOfG2.animate(true);
      // 9.1 所有的 Geometry 都使用同一动画（各个图形如有区别，todo 自行覆盖）
      each(viewOfG2.geometries, (g: Geometry) => {
        g.animate(v.animation);
      });
    }

    if (tooltip) {
      // 10. tooltip
      viewOfG2.interaction('tooltip');
      viewOfG2.tooltip(tooltip);
    }
  });

  // legend
  if (!legend) {
    chart.legend(false);
  } else {
    each(legend, (l: Legend, field: string) => {
      chart.legend(field, l);
    });
  }

  // tooltip
  chart.tooltip(options.tooltip);
  return params;
}

/**
 * 支持嵌套使用 g2plot 内置图表
 * @param params
 */
function multiPlot(params: Params<MixOptions>): Params<MixOptions> {
  const { chart, options } = params;
  const { plots, data = [] } = options;

  each(plots, (plot) => {
    const { type, region, options = {}, top } = plot;
    const { tooltip } = options;

    if (top) {
      execPlotAdaptor(type, chart, { ...options, data });
      return;
    }

    const viewOfG2 = chart.createView({ region, ...pick(options, PLOT_CONTAINER_OPTIONS) });
    if (tooltip) {
      // 配置 tooltip 交互
      viewOfG2.interaction('tooltip');
    }

    execPlotAdaptor(type, viewOfG2, { data, ...options });
  });

  return params;
}

/**
 * 处理缩略轴的 adaptor (mix)
 * @param params
 */
export function slider(params: Params<MixOptions>): Params<MixOptions> {
  const { chart, options } = params;

  chart.option('slider', options.slider);

  return params;
}

/**
 * 图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<MixOptions>) {
  return flow(
    animation, // 多 view 的图，动画配置放到最前面
    multiView,
    multiPlot,
    interaction,
    animation,
    theme,
    tooltip,
    slider,
    annotation()
    // ... 其他的 adaptor flow
  )(params);
}
