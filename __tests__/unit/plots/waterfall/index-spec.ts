import { Waterfall } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('waterfall plot', () => {
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

  it('basic', () => {
    waterfall.render();
    const geometry = waterfall.chart.geometries[0];
    expect(geometry.elements.length).toBe(data.length + 1);
  });

  it('total: false', () => {
    waterfall.update({ ...waterfall.options, total: false });
    expect(waterfall.chart.geometries[0].elements.length).toBe(data.length);
  });

  it('total: label', () => {
    waterfall.update({ ...waterfall.options, total: { label: 'test' } });

    const xScale = waterfall.chart.getScaleByField('type');
    expect(xScale.values.slice(-1)[0]).toBe('test');
  });

  it('total: style', () => {
    waterfall.update({ ...waterfall.options, total: { style: { fill: 'red' } } });

    expect(waterfall.chart.geometries[0].elements.length).toBe(data.length + 1);
    expect(waterfall.chart.geometries[0].elements[data.length].shape.get('children')[0].attr('fill')).toBe('red');
  });

  it('leaderLine: false', () => {
    const shapes = waterfall.chart.geometries[0].getShapes();
    shapes.forEach((shape, idx) => {
      if (idx !== shapes.length - 1) {
        expect(shape.get('children').length).toBe(2);
      }
    });

    waterfall.update({ ...waterfall.options, leaderLine: false });
    waterfall.chart.geometries[0].getShapes().forEach((shape) => {
      expect(shape.get('children').length).toBe(1);
    });
  });

  it('leaderLine: style', () => {
    waterfall.update({ ...waterfall.options, leaderLine: { style: { stroke: 'red' } } });
    const shapes = waterfall.chart.geometries[0].getShapes();
    shapes.forEach((shape, idx) => {
      if (idx !== shapes.length - 1) {
        expect(shape.get('children')[1].attr('stroke')).toBe('red');
      }
    });
  });

  it('color: risingFill & fallingFill', () => {
    waterfall.update({ ...waterfall.options, risingFill: 'pink', fallingFill: '#000' });

    // @ts-ignore
    window.waterfall = waterfall;

    expect(waterfall.chart.geometries[0].elements[0].shape.get('children')[0].attr('fill')).toBe('pink');
    expect(waterfall.chart.geometries[0].elements[2].shape.get('children')[0].attr('fill')).toBe('#000');
  });
});
