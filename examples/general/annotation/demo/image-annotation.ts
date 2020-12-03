import { Pie } from '@antv/g2plot';

const data = [
  { type: '分类一', value: 27 },
  { type: '分类二', value: 25 },
  { type: '分类三', value: 18 },
  { type: '分类四', value: 15 },
  { type: '分类五', value: 10 },
  { type: '其他', value: 5 },
];

const piePlot = new Pie('container', {
  appendPadding: 10,
  data,
  angleField: 'value',
  colorField: 'type',
  radius: 0.8,
  innerRadius: 0.64,
  label: {
    type: 'inner',
    offset: '-50%',
    content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
    style: {
      fill: '#fff',
      fontSize: 14,
      textAlign: 'center',
    },
  },
  statistic: null,
  annotations: [
    {
      type: 'image',
      src: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*ELYbTIVCgPoAAAAAAAAAAABkARQnAQ',
      /** 位置 */
      position: ['50%', '50%'],
      /** 图形样式属性 */
      style: {
        width: 50,
        height: 50,
      },
      /** x 方向的偏移量 */
      offsetX: -25,
      /** y 方向的偏移量 */
      offsetY: 40,
    },
  ],
});

piePlot.render();
