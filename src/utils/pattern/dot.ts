import { DotPatternOptions } from '../../types/pattern';
import { deepAssign } from '../../utils';

function drawDot(options: DotPatternOptions, ctx: CanvasRenderingContext2D, x: number, y: number) {
  const { radius, fill, strokeWidth, stroke, fillOpacity } = options;
  ctx.beginPath();
  ctx.globalAlpha = fillOpacity;
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = strokeWidth;
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
}

export function createDotPattern(options: DotPatternOptions): HTMLCanvasElement {
  const dotOptions = deepAssign(
    {},
    {
      radius: 20,
      bgColor: 'transparent',
      opacity: 1,
      fill: '#FFF',
      fillOpacity: 1,
      padding: 5,
      stroke: 'transparent',
      strokeWidth: 0,
      isStagger: true,
    },
    options
  );

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const { radius, bgColor, padding, isStagger, opacity } = dotOptions;
  let size = (radius + padding) * 2;
  if (isStagger) {
    size = (radius + padding) * 4;
  }

  canvas.width = size;
  canvas.height = size;

  // 后续再行测试
  // const dpr = window.devicePixelRatio;
  // const logicalWidth = size / 2
  // const logicalHeight = size / 2
  // canvas.width = logicalWidth * dpr;
  // canvas.height = logicalHeight * dpr;
  // canvas.style.width = logicalWidth + 'px';
  // canvas.style.height = logicalHeight + 'px';
  // ctx.scale(dpr, dpr);

  // console.info('dpr', dpr)

  // 贴图背景：颜色+大小
  ctx.globalAlpha = opacity;
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, size, size);
  // 图案
  if (isStagger) {
    drawDot(dotOptions, ctx, (size / 4) * 1, (size / 4) * 1);
    drawDot(dotOptions, ctx, (size / 4) * 3, (size / 4) * 1);
    drawDot(dotOptions, ctx, (size / 4) * 0, (size / 4) * 3);
    drawDot(dotOptions, ctx, (size / 4) * 2, (size / 4) * 3);
    drawDot(dotOptions, ctx, (size / 4) * 4, (size / 4) * 3);
  } else {
    drawDot(dotOptions, ctx, size / 2, size / 2);
  }

  return canvas;
}
