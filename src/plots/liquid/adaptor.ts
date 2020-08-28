import { Params } from '../../core/adaptor';
// import { AreaOptions } from './types';
// import { flow } from '../../utils';

const data = [
  {
    gender: 'male',
    value: 50,
  },
  {
    gender: 'middle',
    value: 25,
  },
  {
    gender: 'female',
    value: 25,
  },
];

export function adaptor(params: Params<any>) {
  const { chart } = params;
  // flow 的方式处理所有的配置到 G2 API
  chart.source(data);
  chart.scale({
    value: {
      min: 0,
      max: 100,
    },
  });
  // chart.legend(false);
  chart.axis(false);
  chart
    .interval()
    .position('gender*value')
    .color('gender')
    // .shape('path', path => [ 'liquid-fill-path', path ])
    .shape('liquid-fill-gauge');

  data.forEach((row) => {
    chart.guide().text({
      top: true,
      position: {
        gender: row.gender,
        value: 50,
      },
      content: `${row.value}%`,
      style: {
        opacity: 0.75,
        fontSize: 30,
        textAlign: 'center',
      },
    });
  });
}
