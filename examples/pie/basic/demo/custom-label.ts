import { Pie } from '@antv/g2plot';

const data = [
  { sex: '男', sold: 0.45 },
  { sex: '女', sold: 0.55 },
];

const piePlot = new Pie('container', {
  width: 400,
  height: 300,
  appendPadding: 10,
  data,
  angleField: 'sold',
  colorField: 'sex',
  radius: 0.8,
  label: {
    content: (obj) => {
      const group = new (window as any).G.Group({});
      group.addShape({
        type: 'image',
        attrs: {
          x: 0,
          y: 0,
          width: 40,
          height: 50,
          img:
            obj.sex === '男'
              ? 'https://gw.alipayobjects.com/zos/rmsportal/oeCxrAewtedMBYOETCln.png'
              : 'https://gw.alipayobjects.com/zos/rmsportal/mweUsJpBWucJRixSfWVP.png',
        },
      });

      group.addShape({
        type: 'text',
        attrs: {
          x: 20,
          y: 54,
          text: obj.sex,
          textAlign: 'center',
          textBaseline: 'top',
          fill: obj.sex === '男' ? '#1890ff' : '#f04864',
        },
      });
      return group;
    },
  },
});

piePlot.render();
