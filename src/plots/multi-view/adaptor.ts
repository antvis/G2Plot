import { each } from '@antv/util';
import { Geometry } from '@antv/g2';
import { geometry as geometryAdaptor } from '../../adaptor/geometries/base';
import { interaction, animation, theme, tooltip } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { AXIS_META_CONFIG_KEYS } from '../../constant';
import { deepAssign, flow, pick } from '../../utils';
import { Axis } from '../../types/axis';
import { Legend } from '../../types/legend';
import { Interaction } from '../../types/interaction';
import { MultiViewOptions, IView, IGeometry } from './types';

/**
 * geometry 处理
 * @param params
 */
function multiView(params: Params<MultiViewOptions>): Params<MultiViewOptions> {
  const { chart, options } = params;
  const { views, legend, tooltip } = options;

  each(views, (v: IView) => {
    const { region, data, meta, axes, coordinate, interactions, annotations, geometries } = v;

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
  chart.tooltip(tooltip);
  return params;
}

/**
 * 图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<MultiViewOptions>) {
  return flow(
    animation, // 多 view 的图，动画配置放到最前面
    multiView,
    interaction,
    animation,
    theme,
    tooltip
    // ... 其他的 adaptor flow
  )(params);
}
