import { isObjectLike } from '@antv/util';
import { deepAssign } from '../../utils';
import { Pattern, PatternCfg } from './base';

export type DotCfg = PatternCfg & {
  radius?: number;
  padding?: number;
  /** 是否交错，默认: true. 即 staggered dots. */
  isStagger?: boolean;
  fill?: string;
  //...
};

export class DotPattern extends Pattern<DotCfg> {
  private static defaultCfg = {
    radius: 20,
    bgColor: 'transparent',
    opacity: 1,
    fill: '#FFF',
    padding: 5,
    stroke: '#FFF',
    lineWidth: 0,
    isStagger: true,
  };

  protected init() {
    const { radius, bgColor, padding, opacity, isStagger } = this.options;
    const ctx = this.patternContext;
    let size = (radius + padding) * 2;
    if (isStagger) {
      size = (radius + padding) * 4;
    }

    this.patternCanvas.width = size;
    this.patternCanvas.height = size;

    // 贴图背景：颜色+大小
    ctx.globalAlpha = opacity;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);

    // 图案
    if (isStagger) {
      this.drawDot((size / 4) * 1, (size / 4) * 1);
      this.drawDot((size / 4) * 3, (size / 4) * 1);
      this.drawDot((size / 4) * 0, (size / 4) * 3);
      this.drawDot((size / 4) * 2, (size / 4) * 3);
      this.drawDot((size / 4) * 4, (size / 4) * 3);
    } else {
      this.drawDot(size / 2, size / 2);
    }
  }

  private drawDot(x: number, y: number) {
    const { radius, fill, strokeWidth, stroke } = this.options;
    const ctx = this.patternContext;

    ctx.beginPath();
    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = strokeWidth;
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }

  protected initOptions(options?: DotCfg) {
    let cfg = {};
    // 如果option是字符串，给定默认的 cfg；如果是对象，就更新 cfg
    if (isObjectLike(options)) {
      cfg = options;
    }
    return deepAssign({}, DotPattern.defaultCfg, cfg);
  }
}
