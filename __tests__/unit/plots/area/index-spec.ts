import { G2, Area } from '../../../../src';
import { DEFAULT_OPTIONS } from '../../../../src/plots/area/constants';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('area', () => {
  it('x*y', () => {
    const area = new Area(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data: partySupport.filter((o) => o.type === 'FF'),
      xField: 'date',
      yField: 'value',
    });

    area.render();

    expect(area.chart.geometries[0].elements.length).toBe(1);

    area.destroy();
  });

  it('x cat scale', () => {
    const data = [
      { x: 1, y: 1 },
      { x: 2, y: 4 },
      { x: 3, y: 5 },
      { x: 4, y: 2 },
    ];
    const area = new Area(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data: data,
      xField: 'x',
      yField: 'y',
    });

    area.render();

    expect(area.chart.getScale('x').type).toBe('cat');
    expect(area.chart.getScale('x').range).toEqual([1 / 8, 7 / 8]);
    area.update({
      ...area.options,
      meta: {
        x: {
          type: 'linear',
          range: [0.1, 0.9],
        },
      },
    });

    expect(area.options.meta.x.type).toBe('linear');
    expect(area.chart.getScale('x').range).toEqual([0.1, 0.9]);

    area.destroy();
  });

  it('x*y with color', () => {
    const area = new Area(createDiv(), {
      width: 400,
      height: 300,
      data: partySupport.filter((o) => ['FF', 'Lab'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      color: ['blue', 'red'],
      appendPadding: 10,
      meta: {
        value: {
          min: 0,
          max: 5000,
        },
      },
    });

    area.render();

    const geometry = area.chart.geometries[0];
    const elements = geometry.elements;

    expect(elements.length).toBe(2);
    expect(elements[0].getModel().color).toBe('blue');
    expect(elements[1].getModel().color).toBe('red');

    expect(geometry.scales.value.min).toBe(0);
    expect(geometry.scales.value.max).toBe(5000);

    area.destroy();
  });

  it('update annotations', () => {
    const plot = new Area(createDiv(), {
      data: partySupport.filter((o) => o.type === 'FF'),
      xField: 'date',
      yField: 'value',
      annotations: [
        { type: 'line', start: ['min', 'median'], end: ['max', 'median'], id: 'ID' },
        { type: 'line', start: ['min', 'median'], end: ['max', 'median'] },
      ],
    });

    plot.render();

    expect(plot.chart.getController('annotation').getComponents().length).toBe(2);

    plot.addAnnotations([{ type: 'image', start: ['min', 'median'], end: ['max', 'median'], src: 'xx', id: 'ID' }]);

    const annotations = plot.chart.getController('annotation').getComponents();
    expect(annotations.length).toBe(2);
    expect(annotations.find((co) => co.extra.id === 'ID').component.get('type')).toBe('image');

    plot.addAnnotations([{ type: 'image', start: ['min', 'median'], end: ['max', 'median'], src: 'xx' }]);
    expect(plot.chart.getController('annotation').getComponents().length).toBe(3);

    plot.addAnnotations([{ type: 'image', start: ['min', 'median'], end: ['max', 'median'], src: 'xx', id: 'ID2' }]);
    expect(plot.chart.getController('annotation').getComponents().length).toBe(4);

    plot.removeAnnotations([{ id: 'ID' }]);
    expect(plot.chart.getController('annotation').getComponents().length).toBe(3);

    plot.removeAnnotations([{ id: '' }]);
    expect(plot.chart.getController('annotation').getComponents().length).toBe(3);

    plot.destroy();
  });

  it('customInfo', () => {
    const data = [
      { x: 1, y: 1 },
      { x: 2, y: 4 },
      { x: 3, y: 5 },
      { x: 4, y: 2 },
    ];
    const area = new Area(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data: data,
      xField: 'x',
      yField: 'y',
      customInfo: { test: 'hello' },
      line: {},
    });

    area.render();

    // @ts-ignore
    expect(area.chart.geometries[0].customOption).toEqual({ test: 'hello' });
    // @ts-ignore
    expect(area.chart.geometries[1].customOption).toEqual({ test: 'hello' });
  });

  it('custom shape', () => {
    G2.registerShape('area', 'my-custom-area', {
      draw(shapeInfo, container) {
        return container.addShape('circle', {
          attrs: {
            x: 100,
            y: 100,
            r: 4,
          },
        });
      },
    });
    const data = [
      { x: 1, y: 1 },
      { x: 2, y: 4 },
      { x: 3, y: 5 },
      { x: 4, y: 2 },
    ];
    const area = new Area(createDiv(), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data: data,
      xField: 'x',
      yField: 'y',
      areaShape: 'my-custom-area',
      customInfo: { test: 'hello' },
      line: {
        shape: 'smooth',
      },
    });
    area.render();

    // @ts-ignore shapeType 是私有属性
    expect(area.chart.geometries[0].elements[0].shapeType).toBe('my-custom-area');
    // @ts-ignore shapeType 是私有属性
    expect(area.chart.geometries[1].elements[0].shapeType).toBe('smooth');
  });

  it('defaultOptions 保持从 constants 中获取', () => {
    expect(Area.getDefaultOptions()).toEqual(DEFAULT_OPTIONS);
  });
});
