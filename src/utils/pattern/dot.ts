import { DotPatternCfg } from '../../types/pattern';
import { deepAssign } from '../../utils';
import { getUnitPatternSize, initCanvas, drawBackground, getSymbolsPosition } from './util';

/**
 * dotPattern的默认配置
 */
export const defaultDotPatternCfg = {
  radius: 4,
  padding: 4,
  backgroundColor: 'transparent',
  opacity: 1,
  fill: '#FFF',
  fillOpacity: 1,
  stroke: 'transparent',
  lineWidth: 0,
  isStagger: true,
  mode: 'repeat',
};

/**
 * 绘制圆点
 *
 * @param context
 * @param cfg
 * @param x 圆点中心坐标x
 * @param y 圆点中心坐标y
 */
export function drawDot(context: CanvasRenderingContext2D, cfg: DotPatternCfg, x: number, y: number) {
  const { radius, fill, lineWidth, stroke, fillOpacity } = cfg;

  context.beginPath();
  context.globalAlpha = fillOpacity;
  context.fillStyle = fill;
  context.strokeStyle = stroke;
  context.lineWidth = lineWidth;
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fill();
  if (lineWidth) {
    context.stroke();
  }
  context.closePath();
}

/**
 * 创建 dot pattern，返回 HTMLCanvasElement
 *
 * @param cfg
 * @returns HTMLCanvasElement
 */
export function createDotPattern(cfg?: DotPatternCfg): CanvasPattern {
  const dotCfg = deepAssign({}, defaultDotPatternCfg, cfg);

  const { radius, padding, isStagger } = dotCfg;

  // 计算 画布大小，dots的位置
  const unitSize = getUnitPatternSize(radius * 2, padding, isStagger);
  const dots = getSymbolsPosition(unitSize, isStagger);

  // 初始化 patternCanvas
  const canvas = initCanvas(unitSize, unitSize);
  const ctx = canvas.getContext('2d');

  // 绘制 background，dots
  drawBackground(ctx, dotCfg, unitSize);
  for (const [x, y] of dots) {
    drawDot(ctx, dotCfg, x, y);
  }

  return ctx.createPattern(canvas, dotCfg.mode);
}
