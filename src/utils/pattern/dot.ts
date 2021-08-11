import { DotPatternCfg, SquarePatternCfg, LinePatternCfg } from '../../types/pattern';
import { deepAssign } from '../../utils';

/**
 * 初始化 cavnas，设置宽高等
 */
export function initCanvas(width: number, height: number = width): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  // ~~~ 后续再行测试 ~~~
  // const pixelRatio = window?.devicePixelRatio || 2;
  // const logicalWidth = width;
  // const logicalHeight = height;
  // 画布尺寸
  // canvas.width = logicalWidth * pixelRatio;
  // canvas.height = logicalHeight * pixelRatio;
  // 显示尺寸
  // canvas.style.width = `${logicalWidth}px`;
  // canvas.style.height = `${logicalHeight}px`;
  // ~~~ 后续再行测试 ~~~
  canvas.width = width;
  canvas.height = height;

  return canvas;
}

/**
 * 绘制背景
 *
 * @param context
 * @param cfg
 * @param width
 * @param height
 */
export function drawBackground(
  context: CanvasRenderingContext2D,
  cfg: DotPatternCfg | LinePatternCfg | SquarePatternCfg,
  width: number,
  height: number = width
) {
  const { backgroundColor, opacity } = cfg;

  context.globalAlpha = opacity;
  context.fillStyle = backgroundColor;

  context.beginPath();
  context.fillRect(0, 0, width, height);
  context.closePath();
}

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
 * 计算贴图单元大小
 *
 * @param radius 圆点半径
 * @param padding 圆点间隔
 * @param isStagger 是否交错
 * @reutrn 返回贴图单元大小
 */
export function getUnitPatternSize(radius: number, padding: number, isStagger: boolean): number {
  // 如果交错, unitSize 放大两倍
  const unitSize = radius * 2 + padding;
  return isStagger ? unitSize * 2 : unitSize;
}

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
 * 计算圆点坐标
 *
 * @param unitSize 贴图单元大小
 * @param isStagger 是否交错
 * @reutrn 圆点中心坐标 x,y 数组集合
 */
export function getDots(unitSize: number, isStagger: boolean): number[][] {
  // 如果交错, 交错绘制 dot
  const dots = isStagger
    ? [
        [unitSize * (1 / 4), unitSize * (1 / 4)],
        [unitSize * (3 / 4), unitSize * (3 / 4)],
      ]
    : [[unitSize * (1 / 2), unitSize * (1 / 2)]];
  return dots;
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
  const unitSize = getUnitPatternSize(radius, padding, isStagger);
  const dots = getDots(unitSize, isStagger);

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
