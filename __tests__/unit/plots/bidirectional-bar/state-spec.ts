import { BidirectionalBar } from '../../../../src';
import { data } from '../../../data/bi-directional';
import { createDiv } from '../../../utils/dom';

describe('Bidirectional', () => {
  const plot = new BidirectionalBar(createDiv('default'), {
    width: 400,
    height: 400,
    data,
    xField: 'country',
    yField: ['2016年耕地总面积', '2016年转基因种植面积'],
    state: {
      active: {
        style: {
          stroke: 'blue',
        },
      },
      selected: {
        style: {
          fill: 'red',
        },
      },
    },
    animation: false,
  });
  plot.render();

  it('setState & getState', () => {
    plot.setState('selected', (data: any) => {
      return data.country === '加拿大';
    });

    expect(plot.getStates().length).toBe(2);
    expect(
      plot.chart.views[0].geometries[0].elements
        .find((ele) => (ele.getModel().data as any).country === '加拿大')
        .shape.attr('fill')
    ).toBe('red');
    expect(
      plot.chart.views[1].geometries[0].elements
        .find((ele) => (ele.getModel().data as any).country === '加拿大')
        .shape.attr('fill')
    ).toBe('red');

    plot.setState('active', (data: any) => {
      return data.country === '巴西';
    });

    expect(plot.getStates().length).toBe(4);
    expect(
      plot.chart.views[0].geometries[0].elements
        .find((ele) => (ele.getModel().data as any).country === '巴西')
        .shape.attr('stroke')
    ).toBe('blue');
    expect(
      plot.chart.views[1].geometries[0].elements
        .find((ele) => (ele.getModel().data as any).country === '巴西')
        .shape.attr('stroke')
    ).toBe('blue');
  });

  afterAll(() => {
    plot.destroy();
  });
});
