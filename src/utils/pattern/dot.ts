import { DotPatternCfg } from '../../types/pattern';
import { deepAssign } from '../../utils';

export function drawRect(canvas: HTMLCanvasElement, cfg: DotPatternCfg, width: number, height: number = width) {
  const { backgroundColor, opacity } = cfg;
  const ctx = canvas.getContext('2d');

  const w = width;
  const h = height || width;

  canvas.width = w;
  canvas.height = h;
  ctx.globalAlpha = opacity;
  ctx.fillStyle = backgroundColor;

  ctx.beginPath();
  ctx.fillRect(0, 0, w, h);
  ctx.closePath();
}

function drawDot(cfg: DotPatternCfg, context: CanvasRenderingContext2D, x: number, y: number) {
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
  const pixelRatio = window?.devicePixelRatio || 2;

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

  // ~~~ 后续再行测试 ~~~
  const logicalWidth = size;
  const logicalHeight = size;
  // 画布尺寸
  canvas.width = logicalWidth * pixelRatio;
  canvas.height = logicalHeight * pixelRatio;
  // 显示尺寸
  canvas.style.width = `${logicalWidth}px`;
  canvas.style.height = `${logicalHeight}px`;
  // ~~~ 后续再行测试 ~~~

  drawRect(canvas, dotCfg, size);
  // 绘制图案
  for (const [x, y] of dots) {
    drawDot(dotCfg, ctx, x, y);
  }

  return ctx.createPattern(canvas, cfg.mode || 'repeat');
}
