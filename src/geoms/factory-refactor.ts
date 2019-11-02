import * as _ from '@antv/util';
import Area from './area/index';
import Interval from './interval/index-refactor';
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

export function getGeom(name, type, cfg) {
  const Geom = GEOMETRY_MAP[name][type];
  return new Geom(cfg).config;
}
