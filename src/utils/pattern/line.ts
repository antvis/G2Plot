import { LinePatternCfg } from '../../types/pattern';
import { deepAssign } from '../../utils';
import { initCanvas, drawBackground, transformMatrix } from './util';

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
export function drawLine(context: CanvasRenderingContext2D, cfg: LinePatternCfg, d: string) {
  const { stroke, lineWidth, strokeOpacity } = cfg;
  const path = new Path2D(d);

  context.globalAlpha = strokeOpacity;
  context.lineCap = 'square';
  context.strokeStyle = stroke;
  context.lineWidth = lineWidth;
  context.stroke(path);
}

/**
 * 创建 linePattern
 */
export function createLinePattern(cfg?: LinePatternCfg): CanvasPattern {
  const lineCfg = deepAssign({}, defaultLinePatternCfg, cfg);

  const { spacing, rotation } = lineCfg;

  // 计算 pattern 画布的大小， path 所需的 d
  const width = spacing;
  const height = spacing;
  const d = `
            M 0 0 L ${width} 0
            M 0 ${height} L ${width} ${height}
            `;

  // 初始化 patternCanvas
  const canvas = initCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // 绘制 background，line
  drawBackground(ctx, lineCfg, width, height);
  drawLine(ctx, lineCfg, d);

  const pattern = ctx.createPattern(canvas, lineCfg.mode);

  if (pattern) {
    const dpr = window?.devicePixelRatio || 2;
    const matrix = transformMatrix(dpr, rotation);
    pattern.setTransform(matrix);
  }

  // 返回 Pattern 对象
  return pattern;
}
