import { DotPatternCfg } from '../../types/pattern';
import { deepAssign } from '../../utils';

/**
 * 初始化 cavnas，设置宽高等
 */
export function initCanvas(canvas: HTMLCanvasElement, width: number, height: number = width) {
  // ~~~ 后续再行测试 ~~~
  const pixelRatio = window?.devicePixelRatio || 2;
  const logicalWidth = width;
  const logicalHeight = height;
  // 画布尺寸
  canvas.width = logicalWidth * pixelRatio;
  canvas.height = logicalHeight * pixelRatio;
  // 显示尺寸
  canvas.style.width = `${logicalWidth}px`;
  canvas.style.height = `${logicalHeight}px`;
  // ~~~ 后续再行测试 ~~~
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
export function createDotPattern(cfg: DotPatternCfg): CanvasPattern {
  const dotCfg = deepAssign(
    {},
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
    },
    cfg
  );

  /** 大小 */
  const { radius, padding, isStagger } = dotCfg;
  const dots = [[padding / 2 + radius, padding / 2 + radius]];

  let size = radius * 2 + padding;
  // 如果交错, size 放大两倍 交错绘制 dot
  if (isStagger) {
    dots.push([size + radius, size + radius]);
    size *= 2;
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  initCanvas(canvas, size);
  drawBackground(ctx, dotCfg, size);
  // 绘制图案
  for (const [x, y] of dots) {
    drawDot(ctx, dotCfg, x, y);
  }

  return ctx.createPattern(canvas, cfg.mode || 'repeat');
}
