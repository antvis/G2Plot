/**
 * @author linhuiw
 * @description 仪表盘形状
 */
import { get,clone, deepMix } from '@antv/util';
import { registerShape } from '@antv/g2';
import { IGroup, IShape } from '@antv/g-base';
import { GaugeViewConfig } from '../../options';
import { getGlobalTheme } from '../../../../theme';
import { sortedLastIndex } from '../../../../util/common';
import { GraphicStyle, TextStyle, LineStyle } from '../../../../interface/config';

interface PointerStyle {
  /** 指针颜色 */
  fill: string;
  /** 指针粗细 */
  thickness: number;
  /** 指针长度  */
  radius: number;
}

interface AxisStyle {
  /** 数目 */
  amount: number;
  /** 偏移量 */
  offset: number;
  /** 刻度线长度 */
  length: number;
  /** 刻度线厚度 */
  thickness: number;
  /** 刻度线颜色 */
  color: string;
}

interface GaugeAxis {
  visible?:boolean;
  offset?:number;
  tickCount?: number;
  tickLine?:{
    visible?: boolean;
    length?: number;
    thickness?: number;
    style?: GraphicStyle;
  },
  label?:{
    visible?: boolean;
    style?: TextStyle;
    formatter?:()=>string;
  }
}

interface RingStyle {
  /** 环高亮颜色 */
  color: string;
  /** 环底色 */
  background: string;
  /** 圆环粗细  */
  thickness: number;
  /** 圆环半径  */
  radius: number;
  /** 角度  */
  angle: number;
  /** 刻度线样式 */
  axis: AxisStyle;
}

/**
 * 仪表盘指针图形
 * 指针主体由梯形和一大一小圆形组成，
 * 中心处由灰色圆底和小白圆加以装饰
 */
export class GaugeShape {
  uid: any;

  ringRadius: number;

  center: any;

  group: any;

  options: GaugeViewConfig;

  ringStyle: RingStyle;

  pointerStyle: PointerStyle;

  axis: GaugeAxis;

  type: string;

  constructor(uid: any) {
    this.uid = uid;
  }

  setOption(type, options: GaugeViewConfig, cfg) {
    this.type = type;
    this.options = options;
    this.pointerStyle = cfg.pointerStyle;
    this.ringStyle = cfg.ringStyle;
    this.axis = cfg.axis;
  }

  render() {
    const Gauge = this; // eslint-disable-line
    registerShape('point', 'gauge', {
      draw(cfg: any, group: IGroup) {
        this.gauge = {} as any;
        this.gauge.options = Gauge.options;
        this.gauge.pointerStyle = Gauge.pointerStyle;
        this.gauge.ringStyle = Gauge.ringStyle;
        this.gauge.axis = Gauge.axis;
        this.gauge.type = Gauge.type;
        const gauge = this.gauge;
        const type = this.gauge.type;
        const point = cfg.points[0];
        const center = this.parsePoint({
          x: 0,
          y: 0,
        });

        const target = this.parsePoint({
          x: point.x || 0,
          y: 1,
        });

        gauge.center = center;
        gauge.group = group;

        const r = { x: center.x - target.x, y: center.y - target.y };
        this.gauge.ringRadius = Math.sqrt(r.x * r.x + r.y * r.y) - 10;

        const { starAngle, endAngle } = this.getAngleRange();
        const currentAngle = point.x * (endAngle - starAngle) + starAngle;

        switch (type) {
          case 'meterGauge':
            this.drawBarGauge(currentAngle);
            this.drawInSideAxis();
            break;
          case 'fanGauge':
            this.drawGauge(currentAngle);
            this.drawOutSideAxis();
            break;
          case 'standardGauge':
          default:
            this.drawGauge(currentAngle);
            if(this.gauge.axis.visible){
              this.drawAxis();
            }
            break;
        }

        // 绘制指针
        this.drawPoniter(cfg, group);
      },

      drawGauge(currentAngle: number) {
        const { range } = this.gauge.options;
        this.drawBottomRing(); // 绘制灰底色

        if (range && range.length) {
          this.drawRangeColor();
        } else {
          this.drawCurrentRing(currentAngle);
        }
      },

      drawRangeColor() {
        const { min, max, range, styleMix, color } = this.gauge.options;
        const colors = color || getGlobalTheme().colors;
        const { starAngle, endAngle } = this.getAngleRange();
        const config = {
          min,
          max,
          starAngle,
          endAngle,
        };
        for (let i = 0; i < range.length; i++) {
          const start = this.valueToAngle(range[i], config);
          const end = this.valueToAngle(range[i + 1], config);

          if (end >= start) {
            const path2 = this.getPath(start, end);
            this.drawRing(path2, colors[i]);
          }
        }
      },

      drawBottomRing() {
        const { starAngle, endAngle } = this.getAngleRange();
        const { background } = this.gauge.ringStyle;
        const path = this.getPath(starAngle, endAngle);
        this.drawRing(path, background);
      },

      drawCurrentRing(current: number) {
        const { starAngle } = this.getAngleRange();
        const { color } = this.gauge.ringStyle;
        const path3 = this.getPath(starAngle, current);
        this.drawRing(path3, color);
      },

      drawInSideAxis() {
        const { axis } = this;
        const { min, max } = this.gauge.options;
        const { starAngle, endAngle } = this.getAngleRange();
        const config = {
          min,
          max,
          starAngle,
          endAngle,
        };
        const interval = (max - min) / axis.tickCount;
        for (let i = 0; i < axis.tickCount; i++) {
          const startValue = min + i * interval;
          const angle = this.valueToAngle(startValue + interval / 2, config);

          this.drawRect(angle);
        }
      },

      drawAxis() {
        const axis = this.gauge.axis;
        const { min, max } = this.gauge.options;
        const { starAngle, endAngle } = this.getAngleRange();
        const config = {
          min,
          max,
          starAngle,
          endAngle,
        };
        const interval = (max - min) / (axis.tickCount - 1);
        for (let i = 0; i < axis.tickCount; i++) {
          const startValue = min + i * interval;
          const angle = this.valueToAngle(startValue, config);
          const tickLineStyle = clone(axis.tickLine.style);
          if(i%5 !== 0){
            tickLineStyle.lineWidth = tickLineStyle.lineWidth / 2;
          }
          this.drawRect(angle, {
            length: i % 5 === 0 ? axis.tickLine.length : axis.tickLine.length / 2,
            style: tickLineStyle
          });
        }
      },

      drawOutSideAxis() {
        const { axis } = this.gauge.ringStyle;
        const { amount } = axis;
        const { min, max } = this.gauge.options;
        const { starAngle, endAngle } = this.getAngleRange();
        const config = {
          min,
          max,
          starAngle,
          endAngle,
        };
        const interval = (max - min) / (amount - 1);
        for (let i = 0; i < amount; i++) {
          const startValue = min + i * interval;
          const angle = this.valueToAngle(startValue, config);

          this.drawRect(angle);
        }
      },

      drawBarGauge(current: number) {
        const { min, max, range, styleMix } = this.gauge.options;
        const colors = styleMix.colors || getGlobalTheme().colors;
        const { color, background } = this.gauge.ringStyle;
        const { starAngle, endAngle } = this.getAngleRange();
        const config = {
          min,
          max,
          starAngle,
          endAngle,
        };
        const interval = (endAngle - starAngle) / (50 - 1);
        const offset = interval / 3;

        // 由50个柱子组成
        for (let i = 0; i < 50; i++) {
          const start = starAngle + i * interval;
          const path2 = this.getPath(start - offset / 2, start + offset - offset / 2);

          let fillColor = background;
          if (range && range.length) {
            const result1 = range.map((item: any) => {
              return this.valueToAngle(item, config);
            });

            const index = sortedLastIndex(result1, start);
            /** 最后一个值也在最后一个区间内 */
            const colorIndex = Math.min(index, range.length - 1);
            fillColor = colors[colorIndex - 1] || background;
          } else {
            fillColor = current >= start ? color : background;
          }

          this.drawRing(path2, fillColor);
        }
      },

      getAngleRange() {
        const { angle } = this.gauge.ringStyle;
        const angleValue = 90 - (360 - angle) * 0.5;
        const starAngle = ((270 - 90 - angleValue) * Math.PI) / 180;
        const endAngle = ((270 + 90 + angleValue) * Math.PI) / 180;

        return { starAngle, endAngle };
      },

      valueToAngle(value: number, config: any) {
        const { min, max, starAngle, endAngle } = config;
        if (value === max) {
          return endAngle;
        }
        if (value === min) {
          return starAngle;
        }
        let ratio = (value - min) / (max - min);
        if (max === min) {
          ratio = 1;
        }
        let angle = ratio * (endAngle - starAngle) + starAngle;
        angle = Math.max(angle, starAngle);
        angle = Math.min(angle, endAngle);

        return angle;
      },

      drawRing(path: string, color: string) {
        this.gauge.group.addShape('path', {
          attrs: {
            path,
            fill: color,
          },
        });
      },

      drawRect(angle: number, param?: any) {
        const { axis } = this.gauge;
        const config = { ...axis, ...param };
        const { offset, length } = config;
        const center = this.gauge.center;
        const radius = this.gauge.ringRadius + offset;

        const xA1 = radius * Math.cos(angle) + center.x;
        const yA1 = radius * Math.sin(angle) + center.y;

        const xB1 = (radius + length) * Math.cos(angle) + center.x;
        const yB1 = (radius + length) * Math.sin(angle) + center.y;

        this.gauge.group.addShape('line', {
          attrs: deepMix({},{
            x1: xA1,
            y1: yA1,
            x2: xB1,
            y2: yB1,
          },param.style)
        });
      },

      getPath(starAngle: number, endAngle: number) {
        const gauge = (this as any).gauge;
        const type = this.gauge.type;
        const height = get(gauge, 'options.height');
        const width = get(gauge, 'options.width');
        const center = this.gauge.center;
        const length = this.gauge.ringRadius;
        const { thickness, minThickness, minThickCanvsSize, miniThickness, bigThickness } = this.gauge.ringStyle;
        let thick;
        const size = Math.min(width, height);
        if (type === 'fan' && size < minThickCanvsSize) {
          thick = length - minThickness;
        } else {
          thick = thickness;
        }

        const xA1 = length * Math.cos(starAngle) + center.x;
        const yA1 = length * Math.sin(starAngle) + center.y;
        const xA2 = (length - thick) * Math.cos(starAngle) + center.x;
        const yA2 = (length - thick) * Math.sin(starAngle) + center.y;
        const xB1 = length * Math.cos(endAngle) + center.x;
        const yB1 = length * Math.sin(endAngle) + center.y;
        const xB2 = (length - thick) * Math.cos(endAngle) + center.x;
        const yB2 = (length - thick) * Math.sin(endAngle) + center.y;

        const largeArcFlag = Math.abs(starAngle - endAngle) > Math.PI ? 1 : 0;
        return [
          ['M', xA1, yA1],
          ['A', length, length, 0, largeArcFlag, 1, xB1, yB1],
          ['L', xB2, yB2],
          ['A', length - thick, length - thick, 0, largeArcFlag, 0, xA2, yA2],
          ['Z'],
        ];
      },

      drawPoniter(cfg: any) {
        const { starAngle, endAngle } = this.getAngleRange();

        const { color, circleColorTop, circleColorBottom, radius, thickness } = this.gauge.pointerStyle;
        const bigCircle = thickness;
        const smCircle = thickness / 2.5;
        const group = this.gauge.group;
        const point = cfg.points[0];
        const center = this.parsePoint({
          x: 0,
          y: 0,
        });

        // *radius
        const current = point.x * (endAngle - starAngle) + starAngle;
        const x = this.gauge.ringRadius * radius * Math.cos(current) + this.gauge.center.x;
        const y = this.gauge.ringRadius * radius * Math.sin(current) + this.gauge.center.y;

        const target = {
          x,
          y,
        };

        // 外底色灰圆
        group.addShape('circle', {
          attrs: {
            x: center.x,
            y: center.y,
            r: bigCircle * 2.2,
            fill: circleColorBottom,
          },
        });

        const dirVec = { x: center.x - target.x, y: center.y - target.y };

        const length = Math.sqrt(dirVec.x * dirVec.x + dirVec.y * dirVec.y);
        dirVec.x *= 1 / length;
        dirVec.y *= 1 / length;

        const angle1 = -Math.PI / 2;
        const x1 = Math.cos(angle1) * dirVec.x - Math.sin(angle1) * dirVec.y;
        const y1 = Math.sin(angle1) * dirVec.x + Math.cos(angle1) * dirVec.y;

        const angle2 = Math.PI / 2;
        const x2 = Math.cos(angle2) * dirVec.x - Math.sin(angle2) * dirVec.y;
        const y2 = Math.sin(angle2) * dirVec.x + Math.cos(angle2) * dirVec.y;
        const path = [
          ['M', target.x + x1 * smCircle, target.y + y1 * smCircle],
          ['L', center.x + x1 * bigCircle, center.y + y1 * bigCircle],
          ['L', center.x + x2 * bigCircle, center.y + y2 * bigCircle],
          ['L', target.x + x2 * smCircle, target.y + y2 * smCircle],
          ['Z'],
        ];

        group.addShape('path', {
          attrs: {
            path,
            fill: color,
            stroke: color,
          },
        });
        group.addShape('circle', {
          attrs: {
            x: target.x,
            y: target.y,
            r: smCircle,
            fill: color,
          },
        });
        group.addShape('circle', {
          attrs: {
            x: center.x,
            y: center.y,
            r: bigCircle,
            fill: color,
          },
        });

        // 内部白色小圆
        group.addShape('circle', {
          attrs: {
            x: center.x,
            y: center.y,
            r: smCircle / 1.2,
            fill: circleColorTop,
          },
        });
      },
    } as any);
  }
}
