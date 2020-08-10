import { Pie } from '@antv/g2plot';

const data = [
  { sex: '男', sold: 0.45 },
  { sex: '女', sold: 0.55 },
];

const piePlot = new Pie(document.getElementById('container'), {
  width: 400,
  height: 300,
  appendPadding: 10,
  data,
  angleField: 'sold',
  colorField: 'sex',
  radius: 0.8,
  legend: false,
  label: {
    type: 'inner',
    style: {
      fill: '#fff',
      fontSize: 18,
    },
  },
  pieStyle: (solid, sex) => {
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
