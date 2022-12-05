import { Column } from '@antv/g2plot';

const data = [
  { type: '分类一', value: 27 },
  { type: '分类二', value: 25 },
  { type: '分类三', value: 18 },
  { type: '分类四', value: 15 },
  { type: '其他', value: 5 },
];

function drawCircle(context, x, y, r, fill) {
  context.beginPath();
  context.fillStyle = fill;
  context.arc(x, y, r, 0, 2 * Math.PI, false);
  context.fill();
  context.closePath();
}

function strokeRectangle(context, x, y, w, h, fill, lineWidth) {
  context.strokeStyle = fill;
  context.lineWidth = lineWidth;
  context.strokeRect(x, y, w, h);
}

function drawRectangle(context, x, y, w, h, fill) {
  context.fillStyle = fill;
  context.fillRect(x, y, w, h);
}

function createPattern(width = 200, height = width, color, rotation = 0) {
  const pixelRatio = window.devicePixelRatio || 2;

  // 1. 创建 canvas
  const canvas = document.createElement('canvas');
  // 画布尺寸
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  // 显示尺寸
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const context = canvas.getContext('2d');
  context.scale(pixelRatio, pixelRatio);

  // 2. 绘制
  context.globalAlpha = 1;
  context.lineWidth = 0;

  const padding = 4;

  drawRectangle(context, 0, 0, width, height, color);
  drawCircle(context, width / 2, height / 2, Math.min(width / 4, height / 4), '#fff');
  drawRectangle(context, width / 2 - padding / 2, 0, padding, height, '#fff');
  drawRectangle(context, 0, height / 2 - padding / 2, width, padding, '#fff');
  strokeRectangle(context, 0, 0, width, height, color, 0.5);

  const pattern = context.createPattern(canvas, 'repeat');

  if (pattern) {
    const radian = (rotation * Math.PI) / 180;
    pattern.setTransform({
      a: Math.cos(radian) * (1 / pixelRatio),
      b: Math.sin(radian) * (1 / pixelRatio),
      c: -Math.sin(radian) * (1 / pixelRatio),
      d: Math.cos(radian) * (1 / pixelRatio),
      e: 0,
      f: 0,
    });
  }

  return pattern;
}

const plot = new Column('container', {
  data,
  yField: 'value',
  xField: 'type',
  pattern: createPattern(20, 20, '#9c88ff', 45),
  columnStyle: { stroke: '#9c88ff', strokeOpacity: 0.85 },
  interactions: [{ type: 'element-active' }],
});

plot.render();
