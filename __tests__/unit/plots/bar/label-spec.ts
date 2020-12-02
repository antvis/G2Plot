import { Bar } from '../../../../src';
import { salesByArea, subSalesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('bar label', () => {
  it('position: right', () => {
    const bar = new Bar(createDiv(), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'sales',
      yField: 'area',
      meta: {
        sales: {
          nice: true,
          formatter: (v) => `${Math.floor(v / 10000)}万`,
        },
      },
      label: {
        position: 'right',
      },
    });

    bar.render();

    const geometry = bar.chart.geometries[0];
    const labelGroups = geometry.labelsContainer.getChildren();

    // @ts-ignore
    expect(geometry.labelOption.cfg).toEqual({
      position: 'right',
    });
    expect(labelGroups).toHaveLength(salesByArea.length);
    labelGroups.forEach((label, index) => {
      expect(label.get('children')[0].attr('text')).toBe(
        `${Math.floor(salesByArea[salesByArea.length - index - 1].sales / 10000)}万`
      );
    });

    bar.destroy();
  });

  it('label position middle', () => {
    const bar = new Bar(createDiv(), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'sales',
      yField: 'area',
      meta: {
        sales: {
          nice: true,
          formatter: (v) => `${Math.floor(v / 10000)}万`,
        },
      },
      label: {
        position: 'middle',
      },
    });

    bar.render();

    const geometry = bar.chart.geometries[0];

    // @ts-ignore
    expect(geometry.labelOption.cfg).toEqual({ position: 'middle' });

    bar.destroy();
  });

  it('label position left', () => {
    const bar = new Bar(createDiv(), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'sales',
      yField: 'area',
      meta: {
        sales: {
          nice: true,
          formatter: (v) => `${Math.floor(v / 10000)}万`,
        },
      },
      label: {
        position: 'left',
      },
    });

    bar.render();

    const geometry = bar.chart.geometries[0];

    // @ts-ignore
    expect(geometry.labelOption.cfg).toEqual({ position: 'left' });

    bar.destroy();
  });

  it('group bar position right', () => {
    const bar = new Bar(createDiv('group bar position middle'), {
      width: 400,
      height: 300,
      data: subSalesByArea,
      xField: 'sales',
      yField: 'area',
      seriesField: 'series',
      isGroup: true,
      meta: {
        sales: {
          nice: true,
          formatter: (v) => `${Math.floor(v / 10000)}万`,
        },
      },
      label: {
        position: 'right',
      },
    });

    bar.render();

    const geometry = bar.chart.geometries[0];
    const labelGroups = geometry.labelsContainer.getChildren();

    // @ts-ignore
    expect(geometry.labelOption.cfg).toEqual({
      position: 'right',
    });
    expect(labelGroups).toHaveLength(subSalesByArea.length);
    labelGroups.forEach((label) => {
      const origin = label.get('origin')._origin;
      expect(label.get('children')[0].attr('text')).toBe(`${Math.floor(origin.sales / 10000)}万`);
    });

    bar.destroy();
  });

  it('group column position middle', () => {
    const bar = new Bar(createDiv('group column position middle'), {
      width: 400,
      height: 300,
      data: subSalesByArea,
      xField: 'sales',
      yField: 'area',
      seriesField: 'series',
      isGroup: true,
      meta: {
        sales: {
          nice: true,
          formatter: (v) => `${Math.floor(v / 10000)}万`,
        },
      },
      label: {
        position: 'middle',
      },
    });

    bar.render();

    const geometry = bar.chart.geometries[0];
    const labelGroups = geometry.labelsContainer.getChildren();

    // @ts-ignore
    expect(geometry.labelOption.cfg).toEqual({
      position: 'middle',
    });
    expect(labelGroups).toHaveLength(subSalesByArea.length);
    labelGroups.forEach((label) => {
      const origin = label.get('origin')._origin;
      expect(label.get('children')[0].attr('text')).toBe(`${Math.floor(origin.sales / 10000)}万`);
    });

    bar.destroy();
  });

  it('group bar position left', () => {
    const bar = new Bar(createDiv('group bar position bottom'), {
      width: 400,
      height: 300,
      data: subSalesByArea,
      xField: 'sales',
      yField: 'area',
      seriesField: 'series',
      isGroup: true,
      meta: {
        sales: {
          nice: true,
          formatter: (v) => `${Math.floor(v / 10000)}万`,
        },
      },
      label: {
        position: 'left',
      },
    });

    bar.render();

    const geometry = bar.chart.geometries[0];
    const labelGroups = geometry.labelsContainer.getChildren();

    // @ts-ignore
    expect(geometry.labelOption.cfg).toEqual({
      position: 'left',
    });
    expect(labelGroups).toHaveLength(subSalesByArea.length);
    labelGroups.forEach((label) => {
      const origin = label.get('origin')._origin;
      expect(label.get('children')[0].attr('text')).toBe(`${Math.floor(origin.sales / 10000)}万`);
    });

    bar.destroy();
  });

  it('default layout, off', () => {
    const plot = new Bar(createDiv('default layout, off'), {
      width: 400,
      height: 300,
      data: salesByArea,
      yField: 'area',
      xField: 'sales',
      meta: {
        sales: {
          nice: true,
          formatter: (v) => `${Math.floor(v / 10000)}万`,
        },
      },
    });

    plot.render();

    expect(plot.chart.geometries[0].labelOption).toBeFalsy();

    plot.destroy();
  });

  it('default layout, on', () => {
    const plot = new Bar(createDiv('default layout, on'), {
      width: 400,
      height: 300,
      data: salesByArea,
      yField: 'area',
      xField: 'sales',
      meta: {
        sales: {
          nice: true,
          formatter: (v) => `${Math.floor(v / 10000)}万`,
        },
      },
      label: {},
    });

    plot.render();

    // @ts-ignore
    expect(plot.chart.geometries[0].labelOption.cfg).toEqual({
      position: 'left',
      layout: [
        { type: 'interval-adjust-position' },
        { type: 'interval-hide-overlap' },
        { type: 'adjust-color' },
        { type: 'limit-in-plot', cfg: { action: 'hide' } },
      ],
    });

    plot.destroy();
  });

  it('default layout, custom', () => {
    const plot = new Bar(createDiv('default layout, custom'), {
      width: 400,
      height: 300,
      data: salesByArea,
      yField: 'area',
      xField: 'sales',
      meta: {
        sales: {
          nice: true,
          formatter: (v) => `${Math.floor(v / 10000)}万`,
        },
      },
      label: {
        layout: [
          {
            type: 'adjust-color',
          },
        ],
      },
    });

    plot.render();
    // @ts-ignore
    expect(plot.chart.geometries[0].labelOption.cfg).toEqual({
      layout: [{ type: 'adjust-color' }],
      position: 'left',
    });

    plot.destroy();
  });
});
