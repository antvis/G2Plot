import { Pie } from '@antv/g2plot';

const data = [];
for (let i = 1; i < 50; i++) {
  data.push({ type: `分类 ${i}`, value: (Math.random() * 10).toFixed(0) + 1 });
}

const piePlot = new Pie(document.getElementById('container'), {
  forceFit: true,
  title: {
    visible: true,
    text: '饼图-外部圆形图形标签(outer-center label)',
  },
  description: {
    visible: true,
    text:
      '当把饼图label的类型设置为outer-center时，标签在切片外部拉线显示。outer-center布局的label发生遮挡会直接隐藏而不偏移躲避，相对于outer label布局来说，更美观',
  },
  radius: 0.8,
  data,
  angleField: 'value',
  colorField: 'type',
  label: {
    visible: true,
    type: 'outer-center',
    formatter: (text, item) => `${item._origin.type}: ${item._origin.value}`,
  },
});

piePlot.render();
