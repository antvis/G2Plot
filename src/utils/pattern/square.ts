import { SquarePatternCfg } from '../../types/pattern';
import { deepAssign } from '../../utils';
import { drawBackground, initCanvas } from './dot';

function drawSquare(context: CanvasRenderingContext2D, cfg: SquarePatternCfg, x: number, y: number) {
  const { stroke, size, fill, lineWidth, fillOpacity, rotation } = cfg;
  const radians = (rotation % 360) * (Math.PI / 180);

  context.globalAlpha = fillOpacity;
  context.strokeStyle = stroke;
  context.lineWidth = lineWidth;
  context.fillStyle = fill;
  context.fillRect(x, y, size, size);

  // todo 控制旋转
  // ctx.translate(x, y);
  // ctx.rotate(radians);
  // ctx.translate(-x, -y);
  // ctx.strokeRect(x - size / 2, y - size / 2, size, size);
  // // reset to identity matrix 重制成单位矩阵
  // ctx.setTransform(1, 0, 0, 1, 0, 0);
}

export function createSquarePattern(cfg: SquarePatternCfg): CanvasPattern {
  const squareCfg = deepAssign(
    {},
    {
      size: 4,
      padding: 4,
      backgroundColor: 'transparent',
      opacity: 1,
      rotation: 0,
      fill: '#FFF',
      fillOpacity: 1,
      stroke: 'transparent',
      lineWidth: 0,
      isStagger: true,
    },
    cfg
  );

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const { size, padding, isStagger } = squareCfg;
  const squares = [[padding / 2, padding / 2]];

  let unitSize = size + padding;
  // 如果交错, size 放大两倍 交错绘制 dot
  if (isStagger) {
    squares.push([unitSize + padding / 2, unitSize + padding / 2]);
    unitSize *= 2;
  }

  initCanvas(canvas, size, unitSize);
  drawBackground(ctx, squareCfg, unitSize);
  for (const [x, y] of squares) {
    drawSquare(ctx, squareCfg, x, y);
  }
  return ctx.createPattern(canvas, cfg.mode || 'repeat');
}
