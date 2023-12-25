import { set, pick, get } from '../utils';
import { COORDIANTE_OPTIONS } from '../constants';
import type { Adaptor } from '../types';

/**
 * 主要为极坐标配置， 饼图、雷达图等
 * 通用坐标系配置, coordinate 配置根据图表默认进行配置，例如 coordinate 饼图 { type: 'theta' } 玉珏图 { type: 'radial' }。
 * 也可直接通过 options.coordinate 进行穿透。
 * 同样 coordinate 但其他配置需要直接在 options 中配置，例如 主要配置内径 innerRadius 结束角度 endAngle 等, 次要配置 focusX distortionX。
 * @param params Adaptor
 * @returns params Adaptor
 */
export function coordinate<P extends Adaptor>(params: P) {
  const { options } = params;
  const { coordinate = {} } = options;

  set(params, ['options', 'coordinate'], {
    ...coordinate,
    ...pick(options, COORDIANTE_OPTIONS),
    outerRadius: get(options, 'radius'),
  });

  return params;
}
