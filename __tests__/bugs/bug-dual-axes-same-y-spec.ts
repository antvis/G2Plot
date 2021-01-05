import { DualAxes } from '../../src';
import { createDiv } from '../utils/dom';

const uv = [
  { time: '2019-03', value: 350, type: 'uv' },
  { time: '2019-04', value: 900, type: 'uv' },
  { time: '2019-05', value: 300, type: 'uv' },
  { time: '2019-06', value: 450, type: 'uv' },
  { time: '2019-07', value: 470, type: 'uv' },
  { time: '2019-03', value: 220, type: 'bill' },
  { time: '2019-04', value: 300, type: 'bill' },
  { time: '2019-05', value: 250, type: 'bill' },
  { time: '2019-06', value: 220, type: 'bill' },
  { time: '2019-07', value: 362, type: 'bill' },
];

const pv = [
  { time: '2019-03', value: 800, name: 'a' },
  { time: '2019-04', value: 600, name: 'a' },
  { time: '2019-05', value: 400, name: 'a' },
  { time: '2019-06', value: 380, name: 'a' },
  { time: '2019-07', value: 220, name: 'a' },
  { time: '2019-03', value: 750, name: 'b' },
  { time: '2019-04', value: 650, name: 'b' },
  { time: '2019-05', value: 450, name: 'b' },
  { time: '2019-06', value: 400, name: 'b' },
  { time: '2019-07', value: 320, name: 'b' },
  { time: '2019-03', value: 900, name: 'c' },
  { time: '2019-04', value: 600, name: 'c' },
  { time: '2019-05', value: 450, name: 'c' },
  { time: '2019-06', value: 300, name: 'c' },
  { time: '2019-07', value: 200, name: 'c' },
];

describe('dual-axes same y fields', () => {
  it('same y fields', () => {
    const dualAxes = new DualAxes(createDiv(), {
      data: [uv, pv],
      xField: 'time',
      yField: ['value', 'value'],
      yAxis: [
        {
          title: {
            text: 'y1',
          },
        },
        {
          title: {
            text: 'y2',
          },
        },
      ],
      geometryOptions: [
        {
          geometry: 'line',
          seriesField: 'type',
        },
        {
          geometry: 'column',
          seriesField: 'name',
          point: {},
        },
      ],
    });

    dualAxes.render();

    expect(dualAxes.chart.views[0].getController('axis').getComponents()[0].component.get('title').text).toBe('y1');
    expect(dualAxes.chart.views[1].getController('axis').getComponents()[0].component.get('title').text).toBe('y2');

    dualAxes.destroy();
  });
});
