import { LinePatternCfg } from '../../types/pattern';
import { deepAssign } from '../../utils';

export function createLinePattern(cfg: LinePatternCfg): HTMLCanvasElement {
  const lineOptions = deepAssign(
    {},
    {
      rotate: 45,
      spacing: 10,
      opacity: 1,
      bgColor: 'transparent',
      strokeOpacity: 1,
      stroke: '#FFF',
      strokeWidth: 1,
    },
    cfg
  );

  const canvas = document.createElement('canvas');
  const { spacing } = lineOptions;
  const rotate = lineOptions.rotate % 360;
  const radians = rotate * (Math.PI / 180);
  // w, h 画布宽高
  let w = Math.floor(Math.abs(spacing / Math.sin(radians)));
  let h = Math.floor(Math.abs(spacing / Math.sin(Math.PI / 2 - radians)));

  // 画布大小遇到特殊角度，特殊处理
  if (Math.abs(rotate) === 90 || Math.abs(rotate) === 0) {
    (w = spacing), (h = spacing);
  }

  let d;
  // 遇到特殊角度，绘线方向特殊处理
  if (Math.abs(rotate) === 90 || Math.abs(rotate) === 270) {
    d = `
    M 0 0 L 0 ${h}
    M ${w} 0 L ${w} ${h}
    `;
  } else if (Math.abs(rotate) === 0 || Math.abs(rotate) === 180) {
    d = `
    M 0 0 L ${w} 0
    M 0 ${h} L ${w} ${h}
    `;
  } else {
    // 角度（包含正负）在第二、四象限时，直线斜向下， 在一、三象限时，直线斜向上
    if (
      (0 < rotate && rotate < 90) ||
      (180 < rotate && rotate < 270) ||
      (-180 < rotate && rotate < -90) ||
      (-360 < rotate && rotate < -270)
    ) {
      d = `
      M 0 0 L ${w} ${h}
      M ${w / 2} ${-h / 2} L ${w + w / 2} ${h - h / 2}
      M ${-w / 2} ${h / 2} L ${w - w / 2} ${h + h / 2}
      `;
    } else if (
      (90 < rotate && rotate < 180) ||
      (270 < rotate && rotate < 360) ||
      (-90 < rotate && rotate < 0) ||
      (-270 < rotate && rotate < -180)
    ) {
      d = `
      M 0 ${h} L ${w} 0
      M ${w / 2} ${h + h / 2} L ${w + w / 2} ${h / 2}
      M ${-w / 2} ${h - h / 2} L ${w - w / 2} ${-h / 2}
      `;
    }
  }

  drawBackground(lineOptions, canvas, w, h);
  drawLine(lineOptions, canvas, d);

  return canvas;
}

function drawBackground(options: LinePatternCfg, canvas: HTMLCanvasElement, w: number, h: number) {
  const { bgColor, opacity } = options;
  const ctx = canvas.getContext('2d');

  canvas.width = w;
  canvas.height = h;
  ctx.globalAlpha = opacity;
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, w, h);
  ctx.fill();
}

function drawLine(options: LinePatternCfg, canvas: HTMLCanvasElement, d: string) {
  const { stroke, strokeWidth, strokeOpacity } = options;
  const path = new Path2D(d);
  const ctx = canvas.getContext('2d');

  ctx.globalAlpha = strokeOpacity;
  ctx.lineCap = 'square';
  ctx.strokeStyle = stroke;
  ctx.lineWidth = strokeWidth;
  ctx.stroke(path);
}
