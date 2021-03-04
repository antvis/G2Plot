import { registerShape, Types, Util } from '@antv/g2';
import { GaugeCustomInfo } from '../types';

type ShapeCfg = Omit<Types.ShapeInfo, 'customInfo'> & {
  customInfo: GaugeCustomInfo;
};

// 自定义Shape 部分
registerShape('interval', 'meter-gauge', {
  draw(cfg: ShapeCfg, container) {
    // 使用 customInfo 传递参数
    const { meter = {} } = cfg.customInfo;
    const { steps: STEP = 50, stepRatio = 0.5 } = meter;

    const total = this.coordinate.endAngle - this.coordinate.startAngle;
    let interval = total / STEP;
    let gap = 0;

    /**
     * stepRatio 取值范围: (0, 1]
     * 1: interval : gap = stepRatio : (1 - stepRatio)
     * 2: interval * STEP + stepRatio * (STEP - 1) = total
     */
    if (stepRatio > 0 && stepRatio <= 1) {
      interval = total / (((1 - stepRatio) / stepRatio) * (STEP - 1) + STEP);
      gap = (interval * (1 - stepRatio)) / stepRatio;
    }

    const group = container.addGroup();
    // 绘制 gap
    if (gap > 0) {
      const center = this.coordinate.getCenter();
      const radius = this.coordinate.getRadius();
      const { startAngle, endAngle } = Util.getAngle(cfg, this.coordinate);
      for (let i = startAngle, j = 0; i < endAngle && j < 2 * STEP - 1; j++) {
        const drawn = j % 2;
        if (drawn) {
          const path = Util.getSectorPath(
            center.x,
            center.y,
            radius,
            i,
            Math.min(i + gap, endAngle),
            radius * this.coordinate.innerRadius
          );
          group.addShape('path', {
            name: 'meter-gauge-mask',
            attrs: {
              path,
              fill: cfg.color,
              stroke: cfg.color,
              lineWidth: 0.5,
            },
            // mask 不需要捕捉事件
            capture: false,
          });
        }
        i += drawn ? gap : interval;
      }
    }

    return group;
  },
});
