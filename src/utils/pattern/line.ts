import { LinePatternCfg } from '../../types/pattern';
import { deepAssign } from '../../utils';
import { drawBackground, getPixelRatio, initCanvas, transformMatrix } from './util';

/**
 * linePattern 的 默认配置
 */
export const defaultLinePatternCfg = {
  rotation: 45,
  spacing: 5,
  opacity: 1,
  backgroundColor: 'transparent',
  strokeOpacity: 0.5,
  stroke: '#fff',
  lineWidth: 2,
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
  context.strokeStyle = lineWidth ? stroke : 'transparent';
  context.lineWidth = lineWidth;
  context.stroke(path);
}

/**
 * 创建 linePattern
 */
export function createLinePattern(cfg?: LinePatternCfg): CanvasPattern {
  const lineCfg = deepAssign({}, defaultLinePatternCfg, cfg);

  const { spacing, rotation, lineWidth } = lineCfg;

  // 计算 pattern 画布的大小， path 所需的 d
  const width = spacing + lineWidth || 1;
  const height = spacing + lineWidth || 1;
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

  const pattern = ctx.createPattern(canvas, 'repeat');

  if (pattern) {
    const dpr = getPixelRatio();
    const matrix = transformMatrix(dpr, rotation);
    pattern.setTransform(matrix);
  }

  // 返回 Pattern 对象
  return pattern;
}
