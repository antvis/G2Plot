import { reduce } from '@antv/util';
import { Pie } from '../../src';
import { createDiv } from '.././utils/dom';
import { simulateMouseEvent } from '../utils/event';

describe('donut plot', () => {
  test('statistic content formatter', () => {
    const data = [
      {
        type: '分类一',
        value: 27,
      },
      {
        type: '分类二',
        value: 25,
      },
      {
        type: '分类三',
        value: 18,
      },
      {
        type: '分类四',
        value: 15,
      },
      {
        type: '分类五',
        value: 10,
      },
      {
        type: '其它',
        value: 5,
      },
    ];

    const donutPlot = new Pie(createDiv(), {
      width: 400,
      height: 400,
      radius: 1,
      innerRadius: 0.3,
      padding: [0, 0, 0, 0],
      data,
      angleField: 'value',
      colorField: 'type',
      interactions: [{ type: 'element-active' }, { type: 'pie-statistic-active' }],
      statistic: {
        content: {
          formatter: (datum, data) => {
            return datum ? `${datum.value} 万` : `${reduce(data, (r, d) => r + d.value, 0)}万`;
          },
        },
      },
    });

    donutPlot.render();

    const contentAnnotation = donutPlot.chart.getController('annotation').getComponents()[1];
    expect(contentAnnotation.component.get('content')).toBe(`${reduce(data, (r, d) => r + d.value, 0)}万`);

    setTimeout(() => {
      const element = donutPlot.chart.geometries[0].elements[0];
      simulateMouseEvent(element.shape, 'mouseenter');
      expect(contentAnnotation.component.get('content')).toBe(`${data[0].value}万`);
    }, 0);
  });
});
