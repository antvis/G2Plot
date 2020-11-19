import { Line } from '../../src';
import { createDiv } from '../utils/dom';

describe('#1944', () => {
  it('xAxis mask', () => {
    const uv = [
      { time: '2019-03', value: 35 },
      { time: '2019-04', value: 90 },
      { time: '2019-05', value: 30 },
      { time: '2019-06', value: 45 },
      { time: '2019-07', value: 47 },
    ];

    const line = new Line(createDiv(), {
      data: uv,
      xField: 'time',
      yField: 'value',
      xAxis: {
        type: 'time',
        mask: 'YYYY-MM-DD HH:mm:ss',
      },
    });

    line.render();

    // @ts-ignore mask 是放入到 scale 中
    expect(line.chart.getXScale().mask).toBe('YYYY-MM-DD HH:mm:ss');
    // label tick 是经过格式化的
    expect(line.chart.getController('axis').getComponents()[0].component.get('ticks')[0].name).toBe(
      '2019-03-01 00:00:00'
    );

    line.destroy();
  });
});
