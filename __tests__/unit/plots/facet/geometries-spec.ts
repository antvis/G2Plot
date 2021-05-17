import { groupBy, size } from '@antv/util';
import { Facet } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { simulateMouseEvent } from '../../../utils/event';

describe('facet', () => {
  const data = [
    { type: '1', date: '2014-01', value: 1, name: 'a' },
    { type: '1', date: '2015-01', value: 1, name: 'b' },
    { type: '1', date: '2016-01', value: 1, name: 'c' },
    { type: '1', date: '2017-01', value: 1, name: 'd' },
    { type: '2', date: '2014-01', value: 1, name: 'a' },
    { type: '2', date: '2015-01', value: 1, name: 'b' },
    { type: '2', date: '2016-01', value: 1, name: 'a' },
    { type: '2', date: '2017-01', value: 1, name: 'd' },
    { type: '3', date: '2014-01', value: 1, name: 'b' },
    { type: '4', date: '2015-01', value: 1, name: 'd' },
    { type: '4', date: '2016-01', value: 10, name: 'b' },
    { type: '4', date: '2017-01', value: 1, name: 'c' },
  ];
  const plot = new Facet(createDiv(), {
    data,
    type: 'rect',
    fields: ['type'],
    eachView: (view, facet) => {
      return {
        geometries: [
          { type: 'interval', xField: 'date', yField: 'value', colorField: 'name' },
          { type: 'point', xField: 'date', yField: 'value', colorField: 'name' },
        ],
      };
    },
    theme: {
      colors10: ['red', 'green', 'yellow', 'blue'],
    },
    showTitle: false,
    meta: { date: { sync: true } },
  });
  plot.render();

  it('default', () => {
    expect(plot.chart.views.length).toBe(size(groupBy(data, 'type')));

    const geometries = [];
    plot.chart.views.forEach((view) => geometries.push(...view.geometries));
    expect(geometries.length).toBe(size(groupBy(data, 'type')) * 2);
  });

  afterAll(() => {
    plot.destroy();
  });
});
