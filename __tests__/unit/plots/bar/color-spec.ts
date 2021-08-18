import { Bar } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('bar color callback', () => {
  const data = [
    {
      type: '生鲜水果',
      sales: 61,
    },
    {
      type: '美容洗护',
      sales: 145,
    },
  ];

  const plot = new Bar(createDiv(), {
    data,
    xField: 'sales',
    yField: 'type',
    seriesField: 'type',
    color: ({ type }) => {
      console.info(type);
      return type === '美容洗护' ? '#FAAD14' : '#5B8FF9';
    },
    legend: false,
  });

  plot.render();

  it('conditional color', () => {
    expect(plot.chart.geometries[0].elements[1].shape.attr('fill')).toBe('#5B8FF9');
    expect(plot.chart.geometries[0].elements[0].shape.attr('fill')).toBe('#FAAD14');
  });

  afterAll(() => {
    plot.destroy();
  });
});
