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

    bar.destroy();
  });

  it('xField*yField*color', () => {
    const color = 'red';
    const bar = new RadialBar(createDiv(), {
      width: 400,
      height: 300,
      data: antvStar,
      xField,
      yField,
      colorField: yField,
      color,
      xAxis: false,
    });
    bar.render();
    const geometry = bar.chart.geometries[0];
    const colorFields = geometry.getAttribute('color').getFields();
    expect(colorFields).toHaveLength(1);
    expect(colorFields[0]).toBe('star');
    // @ts-ignore
    const colorValue = geometry.getAttribute('color').values;
    expect(colorValue).toBe(color);
    bar.destroy();
  });

  it('xField*yField*type', () => {
    const bar = new RadialBar(createDiv(), {
      width: 400,
      height: 300,
      data: antvStar,
      xField,
      yField,
      type: 'line',
      annotations: [
        {
          type: 'text',
          position: ['50%', '50%'],
          content: 'Music',
          style: {
            textAlign: 'center',
            fontSize: 24,
          },
        },
      ],
    });
    bar.render();
    const geometry = bar.chart.geometries[0];
    const point = bar.chart.geometries[1];
    expect(geometry.attributes.shape.values[0]).toBe('line');
    expect(point.type).toBe('point');
    expect(bar.chart.getController('annotation').getComponents().length).toBe(1);
    expect(bar.chart.getController('annotation').getComponents()[0].component.get('content')).toBe('Music');
    bar.destroy();
  });

  it('展示形式为 line，自动带 point 且颜色可以对应上', () => {
    const bar = new RadialBar(createDiv(), {
      width: 400,
      height: 300,
      data: antvStar,
      xField,
      yField,
      type: 'line',
      color: (datum) => (datum[yField] < 800 ? 'red' : 'green'),
    });
    bar.render();
    const line = bar.chart.geometries[0];
    const point = bar.chart.geometries[1];
    expect(line.attributes.shape.values[0]).toBe('line');
    expect(point.type).toBe('point');
    line.elements.forEach((ele, idx) => expect(ele.shape.attr('color')).toBe(point.elements[idx].shape.attr('color')));
    bar.destroy();
  });
});
