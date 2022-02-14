import { DualAxes } from '../../src';
import { createDiv } from '../utils/dom';

const data = [
  { year: '1991', value: 3, count: 10 },
  { year: '1992', value: 4, count: 4 },
  { year: '1993', value: 3.5, count: 5 },
  { year: '1994', value: 5, count: 5 },
  { year: '1995', value: 4.9, count: 4.9 },
  { year: '1996', value: 6, count: 35 },
  { year: '1997', value: 7, count: 7 },
  { year: '1998', value: 9, count: 1 },
  { year: '1999', value: 13, count: 20 },
];

describe('#3084', () => {
  it('addAnnotations on view', () => {
    const dualAxes = new DualAxes(createDiv(), {
      data: [data, data],
      xField: 'year',
      yField: ['value', 'count'],
      geometryOptions: [
        {
          geometry: 'line',
          color: '#5B8FF9',
        },
        {
          geometry: 'line',
          color: '#5AD8A6',
        },
      ],
    });

    dualAxes.render();
    dualAxes.addAnnotations([
      {
        type: 'text',
        position: ['median', 'median'],
        content: '辅助文本',
        style: {
          fill: 'red',
        },
      },
    ]);
    expect(dualAxes.chart.getController('annotation').getComponents().length).toBe(1);
    expect(dualAxes.chart.views[0].getController('annotation').getComponents().length).toBe(0);
    expect(dualAxes.chart.views[1].getController('annotation').getComponents().length).toBe(0);
    dualAxes.addAnnotations(
      [
        {
          type: 'text',
          position: ['median', 'median'],
          content: '辅助文本',
          style: {
            fill: 'red',
          },
        },
      ],
      dualAxes.chart.views[0]
    );
    expect(dualAxes.chart.getController('annotation').getComponents().length).toBe(1);
    expect(dualAxes.chart.views[0].getController('annotation').getComponents().length).toBe(1);
    expect(dualAxes.chart.views[1].getController('annotation').getComponents().length).toBe(0);
    dualAxes.addAnnotations(
      [
        {
          type: 'text',
          position: ['median', 'median'],
          content: '辅助文本',
          style: {
            fill: 'red',
          },
        },
      ],
      dualAxes.chart.views[1]
    );
    expect(dualAxes.chart.getController('annotation').getComponents().length).toBe(1);
    expect(dualAxes.chart.views[0].getController('annotation').getComponents().length).toBe(1);
    expect(dualAxes.chart.views[1].getController('annotation').getComponents().length).toBe(1);
    dualAxes.destroy();
  });
});
