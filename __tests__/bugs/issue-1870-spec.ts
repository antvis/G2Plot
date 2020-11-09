import { DualAxes } from '../../src';
import { createDiv } from '../utils/dom';

const uvBillData = [
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

const transformData = [
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

describe('#1870', () => {
  it('1870', () => {
    const dualAxes = new DualAxes(createDiv(), {
      data: [uvBillData, transformData],
      xField: 'time',
      yField: ['value', 'value'],
      geometryOptions: [
        {
          geometry: 'column',
          isGroup: true,
          seriesField: 'type',
          columnWidthRatio: 0.4,
          color: ['#5B8FF9', '#5AD8A6'],
        },
        {
          geometry: 'line',
          seriesField: 'name',
          color: ['#CDDDFD', '#CDF3E4', '#CED4DE'],
          lineStyle: ({ name }) => {
            if (name === 'a') {
              return {
                lineDash: [2, 2],
                opacity: 1,
              };
            }
            return {
              opacity: 0.5,
            };
          },
        },
      ],
    });

    dualAxes.render();

    // @ts-ignore
    expect(dualAxes.chart.views[0].getOptions().axes.value).toEqual({
      label: {
        autoHide: true,
        autoRotate: false,
      },
      nice: true,
      position: 'left',
    });
    // @ts-ignore
    expect(dualAxes.chart.views[1].getOptions().axes.value).toEqual({
      label: {
        autoHide: true,
        autoRotate: false,
      },
      nice: true,
      grid: null,
      position: 'right',
    });

    dualAxes.destroy();
  });
});
