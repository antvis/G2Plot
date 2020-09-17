import { Pie } from '@antv/g2plot';

const data = [
  { sex: '男', sold: 0.45 },
  { sex: '女', sold: 0.55 },
];

const piePlot = new Pie('container', {
  appendPadding: 10,
  data,
  angleField: 'sold',
  colorField: 'sex',
  radius: 0.8,
  legend: false,
  label: {
    type: 'inner',
    // @ts-ignore 偏移 50% TODO 后续支持直接配置 -50%
    offset: '-0.5',
    style: {
      fill: '#fff',
      fontSize: 18,
      textAlign: 'center',
    },
  },
  pieStyle: ({ sex }) => {
    if (sex === '男') {
      return {
        fill: 'p(a)https://gw.alipayobjects.com/zos/rmsportal/nASTPWDPJDMgkDRlAUmw.jpeg',
      };
    }
    return {
      fill: 'p(a)https://gw.alipayobjects.com/zos/rmsportal/ziMWHpHSTlTzURSzCarw.jpeg',
    };
  },
});

piePlot.render();
