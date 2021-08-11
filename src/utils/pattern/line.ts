import { LinePatternCfg } from '../../types/pattern';
import { deepAssign } from '../../utils';
import { drawBackground, initCanvas } from './dot';

/**
 * linePattern 的 默认配置
 */
export const defaultLinePatternCfg = {
  rotation: 45,
  spacing: 10,
  opacity: 1,
  backgroundColor: 'transparent',
  strokeOpacity: 1,
  stroke: '#FFF',
  lineWidth: 1,
  mode: 'repeat',
};

/**
 * 绘制line
 *
 * @param context canvasContext
 * @param cfg linePattern 的配置
 * @param d 绘制 path 所需的 d
 */
function drawLine(context: CanvasRenderingContext2D, cfg: LinePatternCfg, d: string) {
  const { stroke, lineWidth, strokeOpacity } = cfg;
  const path = new Path2D(d);

  context.globalAlpha = strokeOpacity;
  context.lineCap = 'square';
  context.strokeStyle = stroke;
  context.lineWidth = lineWidth;
  context.stroke(path);
}

/**
 * 计算 linePath 所需的 d
 *
 * @param rotation
 * @param w
 * @param h
 * @return 返回绘制 path 所需的 d
 */
function getLinePath(rotation: number, w: number, h: number): string {
  let d;
  // 遇到特殊角度，绘线方向特殊处理
  if (Math.abs(rotation) === 90 || Math.abs(rotation) === 270) {
    d = `
    M 0 0 L 0 ${h}
    M ${w} 0 L ${w} ${h}
    `;
  } else if (Math.abs(rotation) === 0 || Math.abs(rotation) === 180) {
    d = `
    M 0 0 L ${w} 0
    M 0 ${h} L ${w} ${h}
    `;
  } else {
    // 角度（包含正负）在第二、四象限时，直线斜向下， 在一、三象限时，直线斜向上
    if (
      (0 < rotation && rotation < 90) ||
      (180 < rotation && rotation < 270) ||
      (-180 < rotation && rotation < -90) ||
      (-360 < rotation && rotation < -270)
    ) {
      d = `
      M 0 0 L ${w} ${h}
      M ${w / 2} ${-h / 2} L ${w + w / 2} ${h - h / 2}
      M ${-w / 2} ${h / 2} L ${w - w / 2} ${h + h / 2}
      `;
    } else if (
      (90 < rotation && rotation < 180) ||
      (270 < rotation && rotation < 360) ||
      (-90 < rotation && rotation < 0) ||
      (-270 < rotation && rotation < -180)
    ) {
      d = `
      M 0 ${h} L ${w} 0
      M ${w / 2} ${h + h / 2} L ${w + w / 2} ${h / 2}
      M ${-w / 2} ${h - h / 2} L ${w - w / 2} ${-h / 2}
      `;
    }
  }
  return d;
}

/**
 * 计算 unit贴图单元的size
 *
 * @param rotation
 * @param rotation 旋转角度
 * @param spacing 两条线之间的间隔
 * @return 返回 { width, height  }
 */
function getUnitPatternSize(rotation: number, spacing: number) {
  const radians = rotation * (Math.PI / 180);
  // w, h 画布宽高
  let width = Math.floor(Math.abs(spacing / Math.sin(radians)));
  let height = Math.floor(Math.abs(spacing / Math.sin(Math.PI / 2 - radians)));

  // 画布大小遇到特殊角度，特殊处理
  if (Math.abs(rotation) === 90 || Math.abs(rotation) === 0) {
    (width = spacing), (height = spacing);
  }
  return { width, height };
}

/**
 * 创建 linePattern
 */
export function createLinePattern(cfg?: LinePatternCfg): CanvasPattern {
  const lineCfg = deepAssign({}, defaultLinePatternCfg, cfg);

  const { spacing } = lineCfg;
  const rotation = lineCfg.rotation % 360;

  // 计算 pattern 画布的大小， path 所需的 d
  const { width, height } = getUnitPatternSize(rotation, spacing);
  const d = getLinePath(rotation, width, height);

  // 初始化 patternCanvas
  const canvas = initCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // 绘制 background，line
  drawBackground(ctx, lineCfg, width, height);
  drawLine(ctx, lineCfg, d);

  // 返回 Pattern 对象
  return ctx.createPattern(canvas, lineCfg.mode);
}
