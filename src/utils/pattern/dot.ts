import { DotPatternCfg } from '../../types/pattern';
import { deepAssign } from '../../utils';

export function createDotPattern(cfg: DotPatternCfg): HTMLCanvasElement {
  const dotOptions = deepAssign(
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

  const canvas = document.createElement('canvas');
  const { radius, padding, isStagger } = dotOptions;
  const unitSize = isStagger ? (radius + padding) * 4 : (radius + padding) * 2;
  const dots = isStagger
    ? [
        [(unitSize / 4) * 1, (unitSize / 4) * 1],
        [(unitSize / 4) * 3, (unitSize / 4) * 1],
        [(unitSize / 4) * 0, (unitSize / 4) * 3],
        [(unitSize / 4) * 2, (unitSize / 4) * 3],
        [(unitSize / 4) * 4, (unitSize / 4) * 3],
      ]
    : [[unitSize / 2, unitSize / 2]];

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

  drawBackground(dotOptions, canvas, unitSize);
  // 绘制图案
  for (const [x, y] of dots) {
    drawDot(dotOptions, canvas, x, y);
  }

  return canvas;
}

function drawBackground(options: DotPatternCfg, canvas: HTMLCanvasElement, unitSize: number) {
  const { backgroundColor, opacity } = options;
  const ctx = canvas.getContext('2d');

  canvas.width = unitSize;
  canvas.height = unitSize;
  ctx.globalAlpha = opacity;
  ctx.globalAlpha = opacity;
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, unitSize, unitSize);
}

function drawDot(options: DotPatternCfg, canvas: HTMLCanvasElement, x: number, y: number) {
  const { radius, fill, lineWidth, stroke, fillOpacity } = options;
  const ctx = canvas.getContext('2d');

  ctx.beginPath();
  ctx.globalAlpha = fillOpacity;
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = lineWidth;
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
}
