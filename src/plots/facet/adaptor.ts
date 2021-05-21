import { each, omit } from '@antv/util';
import { theme } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { AXIS_META_CONFIG_KEYS } from '../../constant';
import { pick, flow, deepAssign } from '../../utils';
import { Axis, Interaction } from '../../types';
import { execPlotAdaptor } from '../mix/utils';
import { FacetOptions, IPlot, IView } from './types';
import { execViewAdaptor } from './utils';

function facetAdaptor(params: Params<FacetOptions>): Params<FacetOptions> {
  const { chart, options } = params;
  const { type: facetType, data, fields, eachView } = options;

  const restFacetCfg = omit(options as any, [
    'type',
    'data',
    'fields',
    'eachView',
    'axes',
    'meta',
    'tooltip',
    'coordinate',
    'theme',
    'legend',
    'interactions',
    'annotations',
  ]);

  // 1. data
  chart.data(data);

  // 2. facet
  chart.facet(facetType, {
    ...restFacetCfg,
    fields,
    eachView: (viewOfG2, facet) => {
      const viewOptions = eachView(viewOfG2, facet);
      if ((viewOptions as IView).geometries) {
        execViewAdaptor(viewOfG2, viewOptions as IView);
      } else {
        const plot = viewOptions as IPlot;
        const plotOptions = plot.options;
        // @ts-ignore 仪表盘没 tooltip
        if (plotOptions.tooltip) {
          // 配置 tooltip 交互
          viewOfG2.interaction('tooltip');
        }
        execPlotAdaptor(plot.type, viewOfG2, plotOptions);
      }
    },
  });

  return params;
}

function component(params: Params<FacetOptions>): Params<FacetOptions> {
  const { chart, options } = params;
  const { axes, meta, tooltip, coordinate, theme, legend, interactions, annotations } = options;

  // 3. meta 配置
  let scales: Record<string, any> = {};
  if (axes) {
    each(axes, (axis: Axis, field: string) => {
      scales[field] = pick(axis, AXIS_META_CONFIG_KEYS);
    });
  }

  scales = deepAssign({}, meta, scales);
  chart.scale(scales);

  // 4. coordinate 配置
  chart.coordinate(coordinate);

  // 5. axis 轴配置 (默认不展示)
  if (!axes) {
    chart.axis(false);
  } else {
    each(axes, (axis: Axis, field: string) => {
      chart.axis(field, axis);
    });
  }

  // 6. tooltip 配置
  if (tooltip) {
    chart.interaction('tooltip');
    chart.tooltip(tooltip);
  } else if (tooltip === false) {
    chart.removeInteraction('tooltip');
  }

  // 7. legend 配置（默认展示）
  chart.legend(legend);

  // theme 配置
  if (theme) {
    chart.theme(theme);
  }

  // 8. interactions
  each(interactions, (interaction: Interaction) => {
    if (interaction.enable === false) {
      chart.removeInteraction(interaction.type);
    } else {
      chart.interaction(interaction.type, interaction.cfg);
    }
  });

  // 9. annotations
  each(annotations, (annotation) => {
    chart.annotation()[annotation.type]({
      ...annotation,
    });
  });

  return params;
}

/**
 * 分面图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<FacetOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(theme, facetAdaptor, component)(params);
}
