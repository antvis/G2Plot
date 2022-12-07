import { Column } from '@antv/g2plot';

const data = [
  { type: '分类一', value: 27 },
  { type: '分类二', value: 25 },
  { type: '分类三', value: 18 },
  { type: '分类四', value: 15 },
  { type: '分类五', value: 10 },
  { type: '其他', value: 5 },
];

const plot = new Column('container', {
  width: 400,
  height: 300,
  autoFit: false,
  appendPadding: 0,
  data,
  yField: 'value',
  xField: 'type',
  label: false,
  annotations: [
    {
      type: 'text',
      content: 'Hello',
      /** 位置 */
      // ✅ 3. 支持回调设置，转换为百分比例。yScale 有多个，需要获取到具体 y轴字段对应的 scale
      position: (xScale, yScale) => {
        return [`${xScale.scale('分类三') * 100}%`, `${(1 - yScale.value.scale(19)) * 100}%`];
      },
      /** 图形样式属性 */
      style: {
        textAlign: 'center',
        fill: 'rgba(0,0,0,0.85)',
      },
      // 设置偏移
      offsetY: -8,
      // 设置文本包围框
      background: {
        padding: 4,
        style: {
          radius: 4,
          fill: 'rgba(255,0,0,0.25)',
        },
      },
    },
  ],
});

plot.render();
