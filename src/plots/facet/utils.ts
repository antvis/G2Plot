import { View } from '@antv/g2';
import { each } from '@antv/util';
import { geometry as geometryAdaptor } from '../../adaptor/geometries/base';
import { AXIS_META_CONFIG_KEYS } from '../../constant';
import { Axis, Interaction, Options } from '../../types';
import { addViewAnimation, deepAssign, pick } from '../../utils';
import { IView } from './types';

/**
 *
 * @param params 分面图 参数
 * @returns facet eachView 的回调设置每个 view 的展示
 */
export function execViewAdaptor(viewOfG2: View, options: IView): void {
  const { data, coordinate, interactions, annotations, animation, tooltip, axes, meta, geometries } = options;

  // 1. data, optional
  if (data) {
    viewOfG2.data(data);
  }

  // 2. meta 配置
  let scales: Record<string, any> = {};
  if (axes) {
    each(axes, (axis: Axis, field: string) => {
      scales[field] = pick(axis, AXIS_META_CONFIG_KEYS);
    });
  }

  scales = deepAssign({}, meta, scales);
  viewOfG2.scale(scales);

  // 3. coordinate 配置 (默认由顶层决定)
  if (coordinate) {
    viewOfG2.coordinate(coordinate);
  }

  // 4. axis 轴配置 (默认由顶层决定，但可以通过 false 强制关闭)
  if (axes === false) {
    viewOfG2.axis(false);
  } else {
    each(axes, (axis: Axis, field: string) => {
      viewOfG2.axis(field, axis);
    });
  }

  each(geometries, (geometry) => {
    // Geometry
    const { ext } = geometryAdaptor({
      chart: viewOfG2,
      options: geometry,
    });

    // Geometry adjust
    const { adjust } = geometry;
    if (adjust) {
      ext.geometry.adjust(adjust);
    }
  });

  // 5. interactions
  each(interactions, (interaction: Interaction) => {
    if (interaction.enable === false) {
      viewOfG2.removeInteraction(interaction.type);
    } else {
      viewOfG2.interaction(interaction.type, interaction.cfg);
    }
  });
  // 6. annotations
  each(annotations, (annotation) => {
    viewOfG2.annotation()[annotation.type]({
      ...annotation,
    });
  });

  // 7. animation (先做动画)
  addViewAnimation(viewOfG2, animation as Options['animation']);

  if (tooltip) {
    // 8. tooltip
    viewOfG2.interaction('tooltip');
    viewOfG2.tooltip(tooltip);
  } else if (tooltip === false) {
    viewOfG2.removeInteraction('tooltip');
  }
}
