/**
 * @author linhuiw
 * @description 仪表盘形状
 */
import { clone, deepMix } from '@antv/util';
import { registerShape } from '@antv/g2';
import { IGroup } from '@antv/g-base';
import { GaugeViewConfig, GaugeAxis, GaugePivot } from '../../interface';
import { getGlobalTheme } from '../../../../theme';
import { sortedLastIndex } from '../../../../util/common';

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

  axis: GaugeAxis;

  pivot: GaugePivot;

  type: string;

  constructor(uid: any) {
    this.uid = uid;
  }

  setOption(type, options: any) {
    this.type = type;
    this.options = options;
    this.axis = options.axis;
    this.pivot = options.pivot;
  }

  render() {
    const Gauge = this; // eslint-disable-line @typescript-eslint/no-this-alias
    registerShape('point', 'gauge', {
      draw(cfg: any, group: IGroup) {
        this.gauge = {} as any;
        this.gauge.options = Gauge.options;
        this.gauge.axis = Gauge.axis;
        this.gauge.pivot = Gauge.pivot;
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

        this.gauge.ringRadius = Math.sqrt(r.x * r.x + r.y * r.y);

        const { starAngle, endAngle } = this.getAngleRange();
        const currentAngle = point.x * (endAngle - starAngle) + starAngle;

        switch (type) {
          case 'meterGauge':
            this.drawBarGauge(currentAngle);
            if (this.gauge.axis.visible && this.gauge.axis.tickLine?.visible) {
              this.drawInSideAxis();
            }
            break;
          case 'fanGauge':
            this.drawGauge(currentAngle);
            if (this.gauge.axis.visible && this.gauge.axis.tickLine?.visible) {
              this.drawOutSideAxis();
            }
            break;
          case 'standardGauge':
          default:
            this.drawGauge(currentAngle);
            if (this.gauge.axis.visible && this.gauge.axis.tickLine?.visible) {
              this.drawAxis();
            }
            break;
        }

        // 绘制指针
        if (this.gauge.pivot.visible) {
          this.drawPivot(cfg, group);
        }
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
        const { min, max, range, color, rangeStyle } = this.gauge.options;
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
            const style = deepMix({ fill: colors[i] }, rangeStyle);
            this.drawRing(path2, style);
          }
        }
      },

      drawBottomRing() {
        const { starAngle, endAngle } = this.getAngleRange();
        const backgroundStyle = this.gauge.options.rangeBackgroundStyle;
        const path = this.getPath(starAngle, endAngle);
        this.drawRing(path, backgroundStyle);
      },

      drawCurrentRing(current: number) {
        const { starAngle } = this.getAngleRange();
        const rangeStyle = this.gauge.rangeStyle;
        const path3 = this.getPath(starAngle, current);
        this.drawRing(path3, rangeStyle);
      },

      drawInSideAxis() {
        const { min, max, axis } = this.gauge.options;
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
          this.drawRect(angle, {
            length: axis.tickLine.length,
            style: axis.tickLine.style,
          });
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
          if (i % 5 !== 0) {
            tickLineStyle.lineWidth = tickLineStyle.lineWidth / 2;
          }
          this.drawRect(angle, {
            length: i % 5 === 0 ? axis.tickLine.length : axis.tickLine.length / 2,
            style: tickLineStyle,
          });
        }
      },

      drawOutSideAxis() {
        const { axis } = this.gauge;
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
          this.drawRect(angle, {
            length: axis.tickLine.length,
            style: axis.tickLine.style,
          });
        }
      },

      drawBarGauge(current: number) {
        const { min, max, range, color, rangeStyle, rangeBackgroundStyle } = this.gauge.options;
        const colors = color || getGlobalTheme().colors;
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

          let style = rangeBackgroundStyle;
          if (range && range.length) {
            const result1 = range.map((item: any) => {
              return this.valueToAngle(item, config);
            });

            const index = sortedLastIndex(result1, start);
            /** 最后一个值也在最后一个区间内 */
            const colorIndex = Math.min(index, range.length - 1);
            style = deepMix({}, { fill: colors[colorIndex - 1] }, rangeStyle) || rangeBackgroundStyle;
          } else {
            style = current >= start ? deepMix({}, { fill: color }, rangeStyle) : rangeBackgroundStyle;
          }

          this.drawRing(path2, style);
        }
      },

      getAngleRange() {
        const { angle } = this.gauge.options;
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

      drawRing(path: string, style: any) {
        this.gauge.group.addShape('path', {
          attrs: deepMix(
            {},
            {
              path,
            },
            style
          ),
        });
      },

      drawRect(angle: number, param?: any) {
        const { axis } = this.gauge;
        const config = { ...axis, ...param };
        const { offset, length } = config;
        const center = this.gauge.center;

        let radius;
        if (offset < 0) {
          radius = this.gauge.ringRadius - this.gauge.options.rangeSize + offset;
        } else {
          radius = this.gauge.ringRadius + offset;
        }

        const xA1 = radius * Math.cos(angle) + center.x;
        const yA1 = radius * Math.sin(angle) + center.y;

        const xB1 = (radius + length) * Math.cos(angle) + center.x;
        const yB1 = (radius + length) * Math.sin(angle) + center.y;

        const line = this.gauge.group.addShape('line', {
          attrs: deepMix(
            {},
            {
              x1: xA1,
              y1: yA1,
              x2: xB1,
              y2: yB1,
            },
            param.style
          ),
        });
        line.set('name', 'axis-tickLine');
      },

      getPath(starAngle: number, endAngle: number) {
        /* const type = this.gauge.type;
        const height = get(gauge, 'options.height');
        const width = get(gauge, 'options.width');*/
        const center = this.gauge.center;
        const length = this.gauge.ringRadius;
        /*let thick;
         const { minThickness, minThickCanvsSize } = this.gauge.ringStyle;
        const size = Math.min(width, height);
        if (type === 'fan' && size < minThickCanvsSize) {
          thick = length - minThickness;
        } else {*/
        const thick = this.gauge.options.rangeSize;
        //}

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

      drawPivot(cfg: any) {
        const { starAngle, endAngle } = this.getAngleRange();
        const { radius, rangeSize } = this.gauge.options;
        const pivotConfig = this.gauge.pivot;
        const bigCircle = pivotConfig.thickness;
        const smCircle = pivotConfig.thickness / 2.5;
        const group = this.gauge.group;
        const point = cfg.points[0];
        const center = this.parsePoint({
          x: 0,
          y: 0,
        });

        // radius
        const current = point.x * (endAngle - starAngle) + starAngle;
        const x = (this.gauge.ringRadius - rangeSize) * radius * Math.cos(current) + this.gauge.center.x;
        const y = (this.gauge.ringRadius - rangeSize) * radius * Math.sin(current) + this.gauge.center.y;

        const target = {
          x,
          y,
        };

        // 外底色灰圆
        if (pivotConfig.base.visible) {
          group.addShape('circle', {
            attrs: deepMix(
              {},
              {
                x: center.x,
                y: center.y,
                r: pivotConfig.base.size ? pivotConfig.base.size / 2 : bigCircle * 2.2,
              },
              pivotConfig.base.style
            ),
          });
        }
        // 指针
        if (pivotConfig.pointer.visible) {
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
            attrs: deepMix(
              {},
              {
                path,
              },
              pivotConfig.pointer.style
            ),
          });

          group.addShape('circle', {
            attrs: {
              x: target.x,
              y: target.y,
              r: smCircle,
              fill: pivotConfig.pointer.style.fill,
            },
          });
          group.addShape('circle', {
            attrs: {
              x: center.x,
              y: center.y,
              r: bigCircle,
              fill: pivotConfig.pointer.style.fill,
            },
          });
        }

        if (pivotConfig.pin.visible) {
          // 内部白色小圆
          group.addShape('circle', {
            attrs: deepMix(
              {},
              {
                x: center.x,
                y: center.y,
                r: smCircle / 1.2,
              },
              pivotConfig.pin.style
            ),
          });
        }
      },
    } as any);
  }
}
