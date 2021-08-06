import { Pattern, PatternCfg } from './pattern';

export type LineCfg = PatternCfg & {
  spacing: number;
  //...
};

export class LinePattern extends Pattern<LineCfg> {
  protected init() {
    const patternContext = this.patternCanvas.getContext('2d');

    const { size, bgColor } = this.options;

    this.patternCanvas.width = size[0];
    this.patternCanvas.height = size[1];

    patternContext.fillStyle = bgColor;
    patternContext.fillRect(0, 0, this.patternCanvas.width, this.patternCanvas.height);

    patternContext.fillStyle = '#fff';
    patternContext.beginPath();
    patternContext.arc(size[0] / 2, size[0] / 2, size[0] / 4, 0, 2 * Math.PI);
    patternContext.fill();
  }

  protected initOptions(options?: LineCfg) {
    // 给定默认的 cfg
    return {
      size: [10, 20],
      bgColor: 'pink',
    };
  }
}
