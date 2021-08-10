import { isObjectLike } from '@antv/util';
import { deepAssign } from '../../utils';
import { Pattern, PatternCfg } from './base';

export type LineCfg = PatternCfg & {
  spacing?: number;
  rotate?: number;
  strokeOpacity?: number;
  //...
};

export class LinePattern extends Pattern<LineCfg> {
  private static defaultCfg = {
    rotate: 45,
    spacing: 10,
    opacity: 1,
    bgColor: 'transparent',
    strokeOpacity: 1,
    stroke: '#FFF',
    strokeWidth: 1,
  };

  protected init() {
    const { spacing } = this.options;
    const rotate = this.options.rotate % 360;
    const radians = rotate * (Math.PI / 180);
    // w, h 画布宽高
    let w = Math.floor(Math.abs(spacing / Math.sin(radians)));
    let h = Math.floor(Math.abs(spacing / Math.sin(Math.PI / 2 - radians)));

    // 画布大小遇到特殊角度，特殊处理
    if (Math.abs(rotate) === 90 || Math.abs(rotate) === 0) {
      (w = spacing), (h = spacing);
    }

    this.drawBackground(w, h);

    let d;
    // 遇到特殊角度，绘线方向特殊处理
    if (Math.abs(rotate) === 90 || Math.abs(rotate) === 270) {
      d = `
      M 0 0 L 0 ${h}
      M ${w} 0 L ${w} ${h}
      `;
    } else if (Math.abs(rotate) === 0 || Math.abs(rotate) === 180) {
      d = `
      M 0 0 L ${w} 0
      M 0 ${h} L ${w} ${h}
      `;
    } else {
      // 角度（包含正负）在第二、四象限时，直线斜向下， 在一、三象限时，直线斜向上
      if (
        (0 < rotate && rotate < 90) ||
        (180 < rotate && rotate < 270) ||
        (-180 < rotate && rotate < -90) ||
        (-360 < rotate && rotate < -270)
      ) {
        d = `
        M 0 0 L ${w} ${h}
        M ${w / 2} ${-h / 2} L ${w + w / 2} ${h - h / 2}
        M ${-w / 2} ${h / 2} L ${w - w / 2} ${h + h / 2}
        `;
      } else if (
        (90 < rotate && rotate < 180) ||
        (270 < rotate && rotate < 360) ||
        (-90 < rotate && rotate < 0) ||
        (-270 < rotate && rotate < -180)
      ) {
        d = `
        M 0 ${h} L ${w} 0
        M ${w / 2} ${h + h / 2} L ${w + w / 2} ${h / 2}
        M ${-w / 2} ${h - h / 2} L ${w - w / 2} ${-h / 2}
        `;
      }
    }
    this.drawLine(d);
  }

  private drawBackground(w: number, h: number) {
    const { bgColor, opacity } = this.options;
    const ctx = this.patternContext;

    this.patternCanvas.width = w;
    this.patternCanvas.height = h;
    ctx.globalAlpha = opacity;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, w, h);
    ctx.fill();
  }

  private drawLine(d: string) {
    const { stroke, strokeWidth, strokeOpacity } = this.options;
    const ctx = this.patternContext;

    ctx.globalAlpha = strokeOpacity;
    ctx.lineCap = 'square';
    ctx.strokeStyle = stroke;
    ctx.lineWidth = strokeWidth;
    const path = new Path2D(d);
    ctx.stroke(path);
  }

  protected initOptions(options?: LineCfg) {
    const cfg = isObjectLike(options) ? options : {};
    return deepAssign({}, LinePattern.defaultCfg, cfg);
  }
}
