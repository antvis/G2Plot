import { Geometry, Types, View } from '@antv/g2';
import { each, isFunction } from '@antv/util';
import { Options } from '../types';
import { Animation } from '../types/animation';

/**
 * 在 Chart 中查找特定 id 的子 View
 * @param chart
 * @param id
 */
export function findViewById(chart: View, id: string): View {
  return chart.views.find((view: View) => view.id === id);
}

/**
 * 获取同 view 同一级的所有 views
 * @param view 当前 view
 * @returns 同一级的 views
 * @ignore
 */
export function getViews(view: View): View[] {
  const parent = view.parent;
  return parent ? parent.views : [];
}

/**
 * 获取同 view 同一级的 views，不包括自身
 * @param view 当前 view
 * @returns 同一级的 views
 * @ignore
 */
export function getSiblingViews(view: View): View[] {
  return getViews(view).filter((sub) => sub !== view);
}

/**
 * 所有的 Geometries 都使用同一动画（各个图形如有区别，自行覆盖）并添加处理动画回调
 * @param view View
 * @param animation 动画配置
 */
export function addViewAnimation(
  view: View,
  animation: Options['animation'],
  geometries: Geometry<Types.ShapePoint>[] = view.geometries
) {
  // 同时设置整个 view 动画选项
  if (typeof animation === 'boolean') {
    view.animate(animation);
  } else {
    view.animate(true);
  }

  // 所有的 Geometry 都使用同一动画（各个图形如有区别，自行覆盖）
  each(geometries, (g: Geometry) => {
    let animationCfg;
    if (isFunction(animation)) {
      animationCfg = animation(g.type || g.shapeType, g) || true;
    } else {
      animationCfg = animation;
    }

    g.animate(animationCfg as Animation);
  });
}
