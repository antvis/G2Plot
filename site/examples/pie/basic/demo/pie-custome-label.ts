import { Pie, G2 } from '@antv/g2plot';
const G = G2.getEngine('canvas');

const data = [
  { type: '分类一', value: 100 },
  { type: '分类二', value: 200 },
  { type: '分类三', value: 300 },
  { type: '分类四', value: 100 },
  { type: '分类五', value: 100 },
  { type: '其他', value: 200 },
];

const cfg = {
  appendPadding: 10,
  data,
  angleField: 'value',
  colorField: 'type',
  radius: 0.75,
  legend: false,
  label: {
    type: 'spider',
    labelHeight: 40,
    formatter: (data, mappingData) => {
      const group = new G.Group({});
      group.addShape({
        type: 'circle',
        attrs: {
          x: 0,
          y: 0,
          width: 40,
          height: 50,
          r: 5,
          fill: mappingData.color
        },
      });
      group.addShape({
        type: 'text',
        attrs: {
          x: 10,
          y: 8,
          text: `${data.type}`,
          fill: mappingData.color,
        },
      });
      group.addShape({
        type: 'text',
        attrs: {
          x: 0,
          y: 25,
          text: `${data.value}个 ${data.percent * 100}%`,
          fill: 'rgba(0, 0, 0, 0.65)',
          fontWeight: 700,
        },
      });
      return group;
    },
  },
  interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
}
const piePlot = new Pie('container', cfg);
piePlot.render();
