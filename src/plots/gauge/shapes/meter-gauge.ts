import { registerShape, Types, Util } from '@antv/g2';
import { clamp } from '@antv/util';
import { GaugeCustomInfo } from '../types';

type ShapeCfg = Omit<Types.ShapeInfo, 'customInfo'> & {
  customInfo: GaugeCustomInfo;
};

/**
 * 自定义 Shape 部分: 自定义米轨仪表盘
 * 定义 STEP, STEP_RATIO. 可绘制区域: 1 / (STEP + 1) * i -> 1 / (STEP + 1) * i + (STEP_RATIO / (STEP + 1))
 */
registerShape('interval', 'meter-gauge', {
  draw(cfg: ShapeCfg, container) {
    // 使用 customInfo 传递参数
    const { meter = {} } = cfg.customInfo;
    let { steps: STEP = 50, stepRatio: STEP_RATIO = 0.5 } = meter;
    STEP = STEP < 1 ? 1 : STEP;
    // stepRatio 取值范围: (0, 1]
    STEP_RATIO = clamp(STEP_RATIO, 0, 1);

    const { startAngle: COORD_START_ANGLE, endAngle: COORD_END_ANGLE } = this.coordinate;
    let GAP = 0;
    if (STEP_RATIO > 0 && STEP_RATIO < 1) {
      const TOTAL = COORD_END_ANGLE - COORD_START_ANGLE;
      GAP = TOTAL / STEP / (STEP_RATIO / (1 - STEP_RATIO) + 1 - 1 / STEP);
    }
    const INTERVAL = (GAP / (1 - STEP_RATIO)) * STEP_RATIO;

    const group = container.addGroup();
    // 绘制图形的时候，留下 gap
    const center = this.coordinate.getCenter();
    const radius = this.coordinate.getRadius();
    const { startAngle: START_ANGLE, endAngle: END_ANGLE } = Util.getAngle(cfg, this.coordinate);

    for (let startAngle = START_ANGLE; startAngle < END_ANGLE; ) {
      let endAngle;
      const r = (startAngle - COORD_START_ANGLE) % (INTERVAL + GAP);
      if (r < INTERVAL) {
        endAngle = startAngle + (INTERVAL - r);
      } else {
        startAngle += INTERVAL + GAP - r;
        endAngle = startAngle + INTERVAL;
      }
      const path = Util.getSectorPath(
        center.x,
        center.y,
        radius,
        startAngle,
        Math.min(endAngle, END_ANGLE),
        radius * this.coordinate.innerRadius
      );
      group.addShape('path', {
        name: 'meter-gauge',
        attrs: {
          path,
          fill: cfg.color,
          stroke: cfg.color,
          lineWidth: 0.5,
        },
      });
      startAngle = endAngle + GAP;
    }

    return group;
  },
});
