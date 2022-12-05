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
      // ❌ 不支持混搭
      // position: ['42%', 10],
      // ✅ 1. 支持源数据
      // position: ['分类三', 19],
      // position: { type: '分类三', value: 19 },
      // ✅ 2. 支持百分比例。y: 35% 自上而下，canvas 相对起点在左上方
      // position: ['42%', '35%'],
      // ✅ 3. 支持回调设置，转换为百分比例。yScale 有多个，需要获取到具体 y轴字段对应的 scale
      position: (xScale, yScale) => {
        return [`${xScale.scale('分类三') * 100}%`, `${(1 - yScale.value.scale(19)) * 100}%`];
      },
      // ✅ 4. 支持直接设置 x,y 坐标 (相对于 canvas 坐标，相对起点在左上方) - 需要外部自我感知画布大小，不建议使用
      // x: 180,
      // y: 105,
      /** 图形样式属性 */
      style: {
        textAlign: 'center',
        fill: 'rgba(0,0,0,0.85)',
      },
    },
  ],
});

plot.render();
