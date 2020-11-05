import { Pie } from '../../../../src';
import { POSITIVE_NEGATIVE_DATA } from '../../../data/common';
import { createDiv } from '../../../utils/dom';

describe('pie', () => {
  const data = POSITIVE_NEGATIVE_DATA.filter((o) => o.value > 0).map((d, idx) =>
    idx === 1 ? { ...d, type: 'item1' } : d
  );

  const options = {
    width: 400,
    height: 300,
    data,
    angleField: 'value',
    colorField: 'type',
    color: ['blue', 'red', 'yellow', 'lightgreen', 'lightblue', 'pink'],
    radius: 0.8,
    autoFit: false,
  };

  it('set statesStyle', () => {
    const pie = new Pie(createDiv(), {
      ...options,
      animation: false,
      state: {
        selected: {
          style: {
            lineWidth: 4,
            fill: 'red',
          },
        },
        inactive: {
          style: {
            fill: 'blue',
          },
        },
      },
    });

    pie.render();

    pie.setState('selected', (d: any) => d.type === data[0].type);
    const shape = pie.chart.geometries[0].elements[0].shape;

    expect(shape.attr('lineWidth')).toBe(4);
    expect(shape.attr('fill')).toBe('red');

    // // 取消 selected
    pie.setState('selected', (d: any) => d.type === data[0].type, false);
    pie.setState('inactive', (d: any) => d.type === data[0].type);
    expect(shape.attr('fill')).toBe('blue');
    expect(pie.getStates()[0].state).toBe('inactive');

    pie.destroy();
  });

  it('set statesStyle by theme', () => {
    const pie = new Pie(createDiv(), {
      ...options,
      animation: false,
      theme: {
        geometries: {
          interval: {
            rect: {
              active: {
                style: {
                  fill: 'yellow',
                  fillOpacity: 0.65,
                },
              },
            },
          },
        },
      },
    });

    pie.render();

    pie.setState('active', (d: any) => d.type === data[2].type);
    const shape = pie.chart.geometries[0].elements[2].shape;

    expect(shape.attr('fill')).toBe('yellow');
    expect(shape.attr('fillOpacity')).toBe(0.65);
    expect(pie.getStates()[0].state).toBe('active');

    pie.destroy();
  });
});
