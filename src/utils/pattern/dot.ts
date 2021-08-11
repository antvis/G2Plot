import { DotPatternCfg } from '../../types/pattern';
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
  cfg: DotPatternCfg,
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

function drawDot(context: CanvasRenderingContext2D, cfg: DotPatternCfg, x: number, y: number) {
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
  const dotCfg = deepAssign(
    {
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
    },
    cfg
  );

  /** 大小 */
  const { radius, padding, isStagger } = dotCfg;

  let unitSize = radius * 2 + padding;

  const dotCenterPos = unitSize / 2;
  const dots = [[dotCenterPos, dotCenterPos]];

  // 如果交错, size 放大两倍 交错绘制 dot
  if (isStagger) {
    dots.push([dotCenterPos * 3, dotCenterPos * 3]);
    unitSize *= 2;
  }

  const canvas = initCanvas(unitSize, unitSize);
  const ctx = canvas.getContext('2d');

  drawBackground(ctx, dotCfg, unitSize);
  // 绘制图案
  for (const [x, y] of dots) {
    drawDot(ctx, dotCfg, x, y);
  }

  return ctx.createPattern(canvas, dotCfg.mode);
}
