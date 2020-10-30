import { RadialBar } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { antvStar } from '../../../data/antv-star';

const xField = 'name';
const yField = 'star';

describe('radial-bar', () => {
  it('xField*yField', () => {
    const bar = new RadialBar(createDiv(), {
      width: 400,
      height: 300,
      data: antvStar,
      xField,
      yField,
      radius: 0.8,
      innerRadius: 0.2,
      xAxis: false,
    });
    bar.render();
    const geometry = bar.chart.geometries[0];
    const positionFields = geometry.getAttribute('position').getFields();
    expect(geometry.type).toBe('interval');
    expect(geometry.coordinate.type).toBe('polar');
    expect(geometry.coordinate.innerRadius).toBe(0.2);
    expect(geometry.coordinate.isTransposed).toBe(true);
    expect(bar.chart.geometries[0].elements.length).toBe(antvStar.length);
    expect(positionFields).toHaveLength(2);
    expect(positionFields[0]).toBe(xField);
    expect(positionFields[1]).toBe(yField);
  });

  it('xField*yField*color', () => {
    const color = 'red';
    const bar = new RadialBar(createDiv(), {
      width: 400,
      height: 300,
      data: antvStar,
      xField,
      yField,
      color,
      xAxis: false,
    });

    bar.render();
    const geometry = bar.chart.geometries[0];
    const colorFields = geometry.getAttribute('color').getFields();
    expect(colorFields).toHaveLength(1);
    expect(colorFields[0]).toBe(color);
  });
});
