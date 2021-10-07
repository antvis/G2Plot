import { Mix } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { MIX_POINT_DATAS as data } from '../../../data/mix-data';

describe('mix', () => {
  it('plots, setState', () => {
    const plot = new Mix(createDiv(), {
      appendPadding: 8,
      tooltip: { shared: true },
      syncViewPadding: true,
      plots: [
        {
          type: 'column',
          options: {
            data: [
              { date: '2015-02', value: 160 },
              { date: '2015-08', value: 245 },
              { date: '2016-01', value: 487 },
              { date: '2017-02', value: 500 },
              { date: '2018-01', value: 503 },
              { date: '2018-08', value: 514 },
            ],
            xField: 'date',
            yField: 'value',
            state: {
              selected: {
                style: {
                  fill: 'red',
                },
              },
              active: {
                style: {
                  stroke: 'green',
                },
              },
            },
            animation: false,
          },
        },
        {
          type: 'line',
          options: {
            data: [
              { date: '2015-02', value: null },
              { date: '2015-08', value: 0.029 },
              { date: '2016-01', value: 0.094 },
              { date: '2017-02', value: 0.148 },
              { date: '2018-01', value: 0.055 },
              { date: '2018-08', value: 0.045 },
            ],
            xField: 'date',
            yField: 'value',
          },
        },
      ],
    });

    plot.render();

    plot.setState('selected', (data) => {
      return Array.isArray(data) ? false : data.date === '2018-08';
    });
    expect(plot.getStates().length).toBe(1);
    expect(plot.chart.views[0].geometries[0].elements[5].shape.attr('fill')).toBe('red');

    plot.setState('active', (data) => {
      return Array.isArray(data) ? false : data.date === '2018-08';
    });
    expect(plot.getStates().length).toBe(2);
    expect(plot.chart.views[0].geometries[0].elements[5].shape.attr('stroke')).toBe('green');

    plot.destroy();
  });

  it('views, setState', () => {
    const plot = new Mix(createDiv(), {
      tooltip: false,
      views: [
        {
          region: {
            start: { x: 0, y: 0 },
            end: { x: 0.5, y: 1 },
          },
          data: data.slice(0, 400),
          meta: {
            price: { nice: true },
          },
          axes: {},
          geometries: [
            {
              type: 'point',
              xField: 'carat',
              yField: 'price',
              state: {
                selected: {
                  style: {
                    stroke: 'red',
                  },
                },
              },
              mapping: {},
            },
          ],
        },
        {
          region: {
            start: { x: 0.5, y: 0 },
            end: { x: 1, y: 1 },
          },
          data: data.slice(0, 400),
          meta: {
            x: { nice: true },
          },
          axes: { x: { min: 0, tickCount: 5 } },
          geometries: [
            {
              type: 'point',
              xField: 'depth',
              yField: 'x',
              state: {
                selected: {
                  style: {
                    stroke: 'yellow',
                  },
                },
              },
              mapping: { shape: 'circle' },
            },
          ],
        },
      ],
    });

    plot.render();
    plot.setState('selected', (data) => {
      // @ts-ignore
      return data.cut === 'Fair';
    });
    // @ts-ignore
    plot.chart.views[0].geometries[0].elements
      .filter((ele) => (ele.getModel().data as any).cut === 'Fair')
      .forEach((ele) => {
        expect(ele.shape.attr('stroke')).toBe('red');
      });
    // @ts-ignore
    plot.chart.views[1].geometries[0].elements
      .filter((ele) => (ele.getModel().data as any).cut === 'Fair')
      .forEach((ele) => {
        expect(ele.shape.attr('stroke')).toBe('yellow');
      });

    plot.destroy();
  });
});
