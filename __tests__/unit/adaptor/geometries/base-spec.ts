import { P, Params } from '../../../../src';
import { geometry, GeometryOptions } from '../../../../src/adaptor/geometries/base';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

function adaptor(params: Params<GeometryOptions>): Params<GeometryOptions> {
  const { chart, options } = params;
  const { data } = options;

  chart.data(data);

  // 直接使用 geometry 进行测试
  geometry(params);

  return params;
}

function getPlot(type: string, opts: Partial<GeometryOptions>) {
  const plot = new P(
    createDiv(),
    {
      width: 400,
      height: 300,
      data: partySupport,
      appendPadding: 10,
      type,
      mapping: {},
      ...opts,
    },
    adaptor
  );

  plot.render();

  return plot;
}

describe('adaptor - geometry', () => {
  it('color without colorField', () => {
    let p;
    const plot = getPlot('line', {
      xField: 'date',
      yField: 'value',
      args: {
        connectNulls: true,
      },
      mapping: {
        color: 'red',
      },
    });

    expect(plot.chart.geometries[0].type).toBe('line');
    // @ts-ignore
    expect(plot.chart.geometries[0].connectNulls).toBe(true);

    expect(plot.chart.geometries[0].getAttribute('position').getFields()).toEqual(['date', 'value']);
    expect(plot.chart.geometries[0].getAttribute('color').values).toEqual(['red']);

    plot.update({
      ...plot.options,
      mapping: {
        color: ['red', 'green'],
      },
    });
    // 这种情况直接忽略
    expect(plot.chart.geometries[0].getAttribute('color')).toBe(undefined);

    plot.update({
      ...plot.options,
      mapping: {
        color: (data) => {
          p = data;
          return 'red';
        },
      },
    });
    expect(plot.chart.geometries[0].getAttribute('color').getFields()).toEqual(['']);

    expect(plot.chart.geometries[0].getAttribute('color').values).toEqual(['']);
    expect(plot.chart.geometries[0].getAttribute('color').callback).toBeDefined();

    expect(p).toEqual({
      date: [''],
    });

    plot.destroy();
  });

  it('color with colorField', () => {
    let p;
    const plot = getPlot('line', {
      xField: 'date',
      yField: 'value',
      colorField: 'type',
      args: {
        connectNulls: true,
      },
      mapping: {
        color: 'red',
      },
    });

    expect(plot.chart.geometries[0].type).toBe('line');
    // @ts-ignore
    expect(plot.chart.geometries[0].connectNulls).toBe(true);

    expect(plot.chart.geometries[0].getAttribute('position').getFields()).toEqual(['date', 'value']);
    expect(plot.chart.geometries[0].getAttribute('color').values).toEqual('red');

    plot.update({
      ...plot.options,
      mapping: {
        color: ['red', 'green'],
      },
    });
    expect(plot.chart.geometries[0].getAttribute('color').values).toEqual(['red', 'green']);
    expect(plot.chart.geometries[0].getAttribute('color').getFields()).toEqual(['type']);

    plot.update({
      ...plot.options,
      mapping: {
        color: (data) => {
          p = data;
          return 'red';
        },
      },
    });
    expect(plot.chart.geometries[0].getAttribute('color').getFields()).toEqual(['type']);

    expect(plot.chart.geometries[0].getAttribute('color').values).toEqual([]);
    expect(plot.chart.geometries[0].getAttribute('color').callback).toBeDefined();

    expect(p).toEqual({
      type: 'Ind/Oth',
    });

    plot.destroy();
  });

  it('color with colorField and interval', () => {
    const plot = getPlot('interval', {
      xField: 'date',
      yField: 'value',
      colorField: 'type',
      mapping: {
        color: function () {
          return 'red';
        },
      },
    });

    expect(plot.chart.geometries[0].type).toBe('interval');
    expect(plot.chart.geometries[0].getAttribute('color').getFields()).toEqual(['type']);

    plot.destroy();
  });

  it('size without sizeField', () => {
    let p;
    const plot = getPlot('interval', {
      xField: 'date',
      yField: 'value',
      mapping: {
        size: 10,
      },
    });

    expect(plot.chart.geometries[0].type).toBe('interval');

    expect(plot.chart.geometries[0].getAttribute('position').getFields()).toEqual(['date', 'value']);
    expect(plot.chart.geometries[0].getAttribute('size').values).toEqual([10]);

    plot.update({
      ...plot.options,
      mapping: {
        size: [10, 100],
      },
    });
    // 这种情况直接忽略
    expect(plot.chart.geometries[0].getAttribute('size')).toBe(undefined);

    plot.update({
      ...plot.options,
      mapping: {
        size: (data) => {
          p = data;
          return 20;
        },
      },
    });
    expect(plot.chart.geometries[0].getAttribute('size').getFields()).toEqual(['date']);

    expect(plot.chart.geometries[0].getAttribute('size').values).toEqual([]);
    expect(plot.chart.geometries[0].getAttribute('size').callback).toBeDefined();

    expect(p).toEqual({
      date: '25/01/2018',
    });

    plot.destroy();
  });

  it('size with sizeField', () => {
    let p;
    const plot = getPlot('interval', {
      xField: 'date',
      yField: 'value',
      sizeField: 'value',
      mapping: {
        size: 10,
      },
    });

    expect(plot.chart.geometries[0].type).toBe('interval');

    expect(plot.chart.geometries[0].getAttribute('position').getFields()).toEqual(['date', 'value']);
    expect(plot.chart.geometries[0].getAttribute('size').values).toEqual(10);

    plot.update({
      ...plot.options,
      mapping: {
        size: [10, 100],
      },
    });
    expect(plot.chart.geometries[0].getAttribute('size').values).toEqual([10, 100]);
    expect(plot.chart.geometries[0].getAttribute('size').getFields()).toEqual(['value']);

    plot.update({
      ...plot.options,
      mapping: {
        size: (data) => {
          p = data;
          return 20;
        },
      },
    });
    expect(plot.chart.geometries[0].getAttribute('size').getFields()).toEqual(['value']);

    expect(plot.chart.geometries[0].getAttribute('size').values).toEqual([]);
    expect(plot.chart.geometries[0].getAttribute('size').callback).toBeDefined();

    expect(p).toEqual({
      value: 1800,
    });

    plot.destroy();
  });

  it('shape without shapeField', () => {
    let p;
    const plot = getPlot('point', {
      xField: 'date',
      yField: 'value',
      mapping: {
        shape: 'circle',
      },
    });

    expect(plot.chart.geometries[0].type).toBe('point');

    expect(plot.chart.geometries[0].getAttribute('position').getFields()).toEqual(['date', 'value']);
    expect(plot.chart.geometries[0].getAttribute('shape').values).toEqual(['circle']);

    plot.update({
      ...plot.options,
      mapping: {
        shape: ['circle', 'rect'],
      },
    });
    // 这种情况直接忽略
    expect(plot.chart.geometries[0].getAttribute('shape')).toBe(undefined);

    plot.update({
      ...plot.options,
      mapping: {
        shape: (data) => {
          p = data;
          return 'circle';
        },
      },
    });
    expect(plot.chart.geometries[0].getAttribute('shape').getFields()).toEqual(['date']);
    expect(plot.chart.geometries[0].getAttribute('shape').values).toEqual([]);
    expect(plot.chart.geometries[0].getAttribute('shape').callback).toBeDefined();

    expect(p).toEqual({
      date: '25/01/2018',
    });

    plot.destroy();
  });

  it('shape with shapeField', () => {
    let p;
    const plot = getPlot('point', {
      xField: 'date',
      yField: 'value',
      shapeField: 'type',
      mapping: {
        shape: 'circle',
      },
    });

    expect(plot.chart.geometries[0].type).toBe('point');

    expect(plot.chart.geometries[0].getAttribute('position').getFields()).toEqual(['date', 'value']);
    expect(plot.chart.geometries[0].getAttribute('shape').values).toEqual(['circle']);

    plot.update({
      ...plot.options,
      mapping: {
        shape: ['circle', 'rect'],
      },
    });
    expect(plot.chart.geometries[0].getAttribute('shape').values).toEqual(['circle', 'rect']);
    expect(plot.chart.geometries[0].getAttribute('shape').getFields()).toEqual(['type']);

    plot.update({
      ...plot.options,
      mapping: {
        shape: (data) => {
          p = data;
          return 'circle';
        },
      },
    });
    expect(plot.chart.geometries[0].getAttribute('shape').getFields()).toEqual(['type']);

    expect(plot.chart.geometries[0].getAttribute('shape').values).toEqual([]);
    expect(plot.chart.geometries[0].getAttribute('shape').callback).toBeDefined();

    expect(p).toEqual({
      type: 'Ind/Oth',
    });

    plot.destroy();
  });

  it('style', () => {
    let p;
    const plot = getPlot('point', {
      xField: 'date',
      yField: 'value',
      mapping: {
        style: { fill: 'red' },
      },
    });

    expect(plot.chart.geometries[0].type).toBe('point');

    expect(plot.chart.geometries[0].getAttribute('position').getFields()).toEqual(['date', 'value']);

    // @ts-ignore
    expect(plot.chart.geometries[0].styleOption).toEqual({
      cfg: { fill: 'red' },
    });

    plot.update({
      ...plot.options,
      mapping: {
        // @ts-ignore
        style: true, // ignore
      },
    });

    // @ts-ignore
    expect(plot.chart.geometries[0].styleOption).toEqual(undefined);

    plot.update({
      ...plot.options,
      mapping: {
        style: (data) => {
          p = data;
          return { fill: 'red' };
        },
      },
    });

    // @ts-ignore
    expect(plot.chart.geometries[0].styleOption.fields).toEqual(['date', 'value']);
    // @ts-ignore
    expect(plot.chart.geometries[0].styleOption.callback).toBeDefined();

    expect(p).toEqual({
      date: '25/01/2018',
      value: 1800,
    });

    plot.destroy();
  });

  it('tooltip', () => {
    const plot = getPlot('point', {
      xField: 'date',
      yField: 'value',
      mapping: {
        style: { fill: 'red' },
      },
    });

    expect(plot.chart.geometries[0].type).toBe('point');

    expect(plot.chart.geometries[0].getAttribute('position').getFields()).toEqual(['date', 'value']);

    expect(plot.chart.geometries[0].tooltipOption).toBe(undefined);

    const fn = jest.fn();
    plot.update({
      ...plot.options,
      mapping: {
        tooltip: fn,
      },
    });

    // @ts-ignore
    expect(plot.chart.geometries[0].tooltipOption).toBeUndefined();

    plot.update({
      ...plot.options,
      tooltipFields: ['date'],
      mapping: {
        tooltip: fn,
      },
    });

    // @ts-ignore
    expect(plot.chart.geometries[0].tooltipOption.fields).toEqual(['date']);
    // @ts-ignore
    expect(plot.chart.geometries[0].tooltipOption.callback).toBeDefined();

    plot.update({
      ...plot.options,
      tooltipFields: ['date'],
      mapping: {
        tooltip: null,
      },
    });

    // @ts-ignore
    expect(plot.chart.geometries[0].tooltipOption.fields).toEqual(['date']);
    // @ts-ignore
    expect(plot.chart.geometries[0].tooltipOption.callback).toBeUndefined();

    plot.destroy();
  });

  it('no mapping', () => {
    const plot = getPlot('point', {
      xField: 'date',
      yField: 'value',
      mapping: null,
    });

    // 非法情况
    expect(plot.chart.geometries.length).toBe(0);

    plot.destroy();
  });
});
