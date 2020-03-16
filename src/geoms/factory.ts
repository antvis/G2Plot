import Area from './area/index';
import Interval from './interval/index';
import Line from './line/index';
import Point from './point/index';
/**
 * 将element的配置逻辑拆离出来，并将每类element细分为主体图形、辅助图形、mini图形三种
 * 这样也方便未来更灵活的调用和组装g2的element模块
 */

const GEOMETRY_MAP = {
  area: Area,
  line: Line,
  point: Point,
  interval: Interval,
};

type FirstCtrParam<T> = T extends new (first: infer R) => any ? R : never;

type MapType = typeof GEOMETRY_MAP;

export function getGeom<T extends keyof MapType, U extends keyof MapType[T]>(
  name: T,
  type: U,
  cfg: FirstCtrParam<MapType[T][U]>
) {
  const Geom: any = GEOMETRY_MAP[name][type];
  return new Geom(cfg).config;
}
