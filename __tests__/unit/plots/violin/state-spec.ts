import { Violin } from '../../../../src';
import { BASE_VIOLIN_DATA } from '../../../data/violin';
import { createDiv } from '../../../utils/dom';

describe('violin', () => {
  const plot = new Violin(createDiv(), {
    width: 400,
    height: 500,
    data: BASE_VIOLIN_DATA,
    xField: 'type',
    yField: 'value',
    animation: false,
    state: {
      selected: {
        style: {
          stroke: 'blue',
          fill: 'red',
        },
      },
    },
    box: {
      state: {
        selected: {
          style: {
            stroke: 'green',
            fill: 'red',
          },
        },
      },
    },
  });

  plot.render();

  it('setState', () => {
    plot.setState('selected', (data) => {
      // @ts-ignore
      return data.x === 'SepalLength';
    });
    expect(plot.getStates().length).toBe(plot.chart.views.length);
    // @ts-ignore
    expect(
      plot.chart.views[0].geometries[0].elements
        .find((ele) => (ele.getModel().data as any).x === 'SepalLength')
        .shape.attr('stroke')
    ).toBe('blue');
    // @ts-ignore
    expect(
      plot.chart.views[1].geometries[0].elements
        .find((ele) => (ele.getModel().data as any).x === 'SepalLength')
        .shape.attr('stroke')
    ).toBe('green');
    // @ts-ignore
    expect(
      plot.chart.views[2].geometries[0].elements
        .find((ele) => (ele.getModel().data as any).x === 'SepalLength')
        .shape.attr('stroke')
    ).toBe('green');
    // @ts-ignore
    expect(
      plot.chart.views[3].geometries[0].elements
        .find((ele) => (ele.getModel().data as any).x === 'SepalLength')
        .shape.attr('stroke')
    ).toBe('green');

    plot.setState('active', (data) => {
      // @ts-ignore
      return data.x === 'SepalLength';
    });
    expect(plot.getStates().length).toBe(plot.chart.views.length * 2);
  });

  afterAll(() => {
    plot.destroy();
  });
});
