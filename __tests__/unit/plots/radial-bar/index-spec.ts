import { RadialBar } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('radial-bar', () => {
  const data = [
    { question: '问题 1', percent: 0.2 },
    { question: '问题 2', percent: 0.4 },
    { question: '问题 3', percent: 0.49 },
    { question: '问题 4', percent: 0.52 },
    { question: '问题 5', percent: 0.53 },
    { question: '问题 6', percent: 0.84 },
    { question: '问题 7', percent: 1.0 },
    { question: '问题 8', percent: 1.2 },
  ];
  it('xField*yField', () => {
    const bar = new RadialBar(createDiv(), {
      width: 400,
      height: 300,
      data,
      xField: 'question',
      yField: 'percent',
      maxRadian: 600,
    });
    bar.render();
    const geometry = bar.chart.geometries[0];
    const positionFields = geometry.getAttribute('position').getFields();
    expect(geometry.type).toBe('interval');
    expect(geometry.coordinate.type).toBe('polar');
    expect(geometry.coordinate.innerRadius).toBe(0.1);
    expect(geometry.coordinate.isTransposed).toBe(true);
    expect(bar.chart.geometries[0].elements.length).toBe(data.length);
    expect(positionFields).toHaveLength(2);
    expect(positionFields[0]).toBe('question');
    expect(positionFields[1]).toBe('percent');
  });

  it('xField*yField*color', () => {
    const color = 'red';
    const bar = new RadialBar(createDiv(), {
      width: 400,
      height: 300,
      data,
      xField: 'question',
      yField: 'percent',
      color,
    });

    bar.render();
    const geometry = bar.chart.geometries[0];
    const colorFields = geometry.getAttribute('color').getFields();
    expect(colorFields).toHaveLength(1);
    expect(colorFields[0]).toBe(color);
  });
});
