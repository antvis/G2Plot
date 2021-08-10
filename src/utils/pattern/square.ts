import { SquarePatternCfg } from '../../types/pattern';
import { deepAssign } from '../../utils';

export function createSquarePattern(cfg: SquarePatternCfg): HTMLCanvasElement {
  const squareOptions = deepAssign(
    {},
    {
      size: 7,
      bgColor: 'transparent',
      opacity: 1,
      rotate: 45,
      fill: '#FFF',
      fillOpacity: 1,
      padding: 10,
      stroke: 'transparent',
      strokeWidth: 0,
      isStagger: true,
    },
    cfg
  );

  const canvas = document.createElement('canvas');
  const { size, padding, isStagger } = squareOptions;
  // 计算 贴图单元的大小
  const unitSize = isStagger ? (size + padding * 2) * 2 : size + padding * 2;
  const squares = isStagger
    ? [
        [(unitSize / 4) * 1, (unitSize / 4) * 1],
        [(unitSize / 4) * 3, (unitSize / 4) * 1],
        [(unitSize / 4) * 0, (unitSize / 4) * 3],
        [(unitSize / 4) * 2, (unitSize / 4) * 3],
        [(unitSize / 4) * 4, (unitSize / 4) * 3],
      ]
    : [[unitSize / 2, unitSize / 2]];

  drawBackground(squareOptions, canvas, unitSize);
  for (const [x, y] of squares) {
    drawSquare(squareOptions, canvas, x, y);
  }
  return canvas;
}

function drawBackground(options: SquarePatternCfg, canvas: HTMLCanvasElement, unitSize: number) {
  const { bgColor, opacity } = options;
  const ctx = canvas.getContext('2d');

  canvas.width = unitSize;
  canvas.height = unitSize;
  ctx.globalAlpha = opacity;
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, unitSize, unitSize);
}

function drawSquare(options: SquarePatternCfg, canvas: HTMLCanvasElement, x: number, y: number) {
  const { stroke, size, fill, strokeWidth, fillOpacity } = options;
  const ctx = canvas.getContext('2d');
  const rotate = options.rotate % 360;
  const radians = rotate * (Math.PI / 180);

  ctx.globalAlpha = fillOpacity;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = strokeWidth;
  ctx.translate(x, y);
  ctx.rotate(radians);
  ctx.translate(-x, -y);
  ctx.strokeRect(x - size / 2, y - size / 2, size, size);
  ctx.fillStyle = fill;
  ctx.fillRect(x - size / 2, y - size / 2, size, size);
  // reset to identity matrix 重制成单位矩阵
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
