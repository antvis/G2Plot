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

  // todo 控制旋转
  context.translate(x, y);
  context.rotate(radians);
  context.translate(-x, -y);
  context.strokeRect(x - size / 2, y - size / 2, size, size);
  // 因为正方形绘制从左上角开始，所以x，y做个偏移
  context.fillRect(x - size / 2, y - size / 2, size, size);
  // reset to identity matrix 重制成单位矩阵
  context.setTransform(1, 0, 0, 1, 0, 0);
}

export function createSquarePattern(cfg?: SquarePatternCfg): CanvasPattern {
  const squareCfg = deepAssign(
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
      mode: 'repeat',
    },
    cfg
  );

  const { size, padding, isStagger } = squareCfg;

  let unitSize = size + padding;

  const squareCenterPos = unitSize / 2;
  const squares = [[squareCenterPos, squareCenterPos]];

  // 如果交错, size 放大两倍 交错绘制 square
  if (isStagger) {
    squares.push([squareCenterPos * 3, squareCenterPos * 3]);
    unitSize *= 2;
  }
  const canvas = initCanvas(unitSize, unitSize);
  const ctx = canvas.getContext('2d');

  drawBackground(ctx, squareCfg, unitSize);
  for (const [x, y] of squares) {
    drawSquare(ctx, squareCfg, x, y);
  }
  return ctx.createPattern(canvas, squareCfg.mode);
}
