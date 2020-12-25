import { each } from '@antv/util';
import { geometry as geometryAdaptor } from '../../adaptor/geometries/base';
import { interaction, animation, theme, tooltip } from '../../adaptor/common';
import { Params } from '../../core/adaptor';
import { deepAssign, flow, pick } from '../../utils';
import { Axis } from '../../types/axis';
import { AXIS_META_CONFIG_KEYS } from '../../constant';
import { Legend } from '../../types/legend';
import { MultiViewOptions, IView, IGeometry } from './types';

/**
 * geometry 处理
 * @param params
 */
function multiView(params: Params<MultiViewOptions>): Params<MultiViewOptions> {
  const { chart, options } = params;
  const { views, legend, tooltip } = options;

  each(views, (v: IView) => {
    const { region, data, meta, axes, coordinate, annotations, geometries } = v;

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

    // 8. annotations
    each(annotations, (annotation) => {
      viewOfG2.annotation()[annotation.type]({
        ...annotation,
      });
    });
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
