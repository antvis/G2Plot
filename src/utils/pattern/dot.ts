import { DotPatternCfg } from '../../types/pattern';
import { deepAssign } from '../../utils';

export function drawRect(options: DotPatternCfg, canvas: HTMLCanvasElement, unitSize: number) {
  const { backgroundColor, opacity } = options;
  const ctx = canvas.getContext('2d');

  canvas.width = unitSize;
  canvas.height = unitSize;
  ctx.globalAlpha = opacity;
  ctx.fillStyle = backgroundColor;

  ctx.beginPath();
  ctx.fillRect(0, 0, unitSize, unitSize);
  ctx.closePath();
}

function drawDot(options: DotPatternCfg, canvas: HTMLCanvasElement, x: number, y: number) {
  const { radius, fill, lineWidth, stroke, fillOpacity } = options;
  const ctx = canvas.getContext('2d');

  ctx.beginPath();
  ctx.globalAlpha = fillOpacity;
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = lineWidth;
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.fill();
  if (lineWidth) {
    ctx.stroke();
  }
  ctx.closePath();
}

/**
 * 创建 dot pattern，返回 HTMLCanvasElement
 *
 * @param cfg
 * @returns HTMLCanvasElement
 */
export function createDotPattern(cfg: DotPatternCfg): CanvasPattern {
  const pixelRatio = typeof window === 'object' && window.devicePixelRatio ? window.devicePixelRatio : 1;

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

  drawRect(dotCfg, canvas, size);
  // 绘制图案
  for (const [x, y] of dots) {
    drawDot(dotCfg, canvas, x, y);
  }

  return ctx.createPattern(canvas, cfg.mode || 'repeat');
}
