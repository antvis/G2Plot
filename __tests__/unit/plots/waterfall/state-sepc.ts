import { Waterfall } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('waterfall', () => {
  const data = [
    { type: '日用品', money: 300 },
    { type: '伙食费', money: 900 },
    { type: '交通费', money: -200 },
    { type: '水电费', money: 300 },
    { type: '房租', money: 1200 },
    { type: '商场消费', money: 1000 },
    { type: '应酬交际', money: 2000 },
    { type: '总费用', money: 5900 },
  ];

  const waterfall = new Waterfall(createDiv(), {
    width: 400,
    height: 300,
    xField: 'type',
    yField: 'money',
    data: data,
  });

  afterAll(() => {
    waterfall.destroy();
  });

  it('set statesStyle', () => {
    waterfall.update({
      ...waterfall.options,
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

    waterfall.render();

    waterfall.setState('selected', (d: any) => d.type === data[0].type);
    const shape = waterfall.chart.geometries[0].elements[0].shape;

    expect(shape.attr('lineWidth')).toBe(4);
    expect(shape.attr('fill')).toBe('red');

    // // 取消 selected
    waterfall.setState('selected', (d: any) => d.type === data[0].type, false);
    waterfall.setState('inactive', (d: any) => d.type === data[0].type);
    expect(shape.attr('fill')).toBe('blue');
    expect(waterfall.getStates()[0].state).toBe('inactive');
  });

  it('set statesStyle by theme', () => {
    waterfall.update({
      ...waterfall.options,
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

    waterfall.render();

    waterfall.setState('active', (d: any) => d.type === data[2].type);
    const shape = waterfall.chart.geometries[0].elements[2].shape;

    expect(shape.attr('fill')).toBe('yellow');
    expect(shape.attr('fillOpacity')).toBe(0.65);
    expect(waterfall.getStates()[0].state).toBe('active');
  });
});
