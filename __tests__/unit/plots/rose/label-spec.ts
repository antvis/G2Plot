import { deepMix } from '@antv/util';
import { Rose } from '../../../../src';
import { salesByArea, subSalesByArea } from '../../../data/sales';
import { delay } from '../../../utils/delay';
import { createDiv } from '../../../utils/dom';

describe('rose label', () => {
  const options = {
    width: 400,
    height: 300,
    data: salesByArea,
    xField: 'area',
    yField: 'sales',
    meta: {
      sales: {
        nice: true,
        formatter: (v) => `${Math.floor(v / 10000)}万`,
      },
    },
  };

  it('false', () => {
    const rose = new Rose(
      createDiv('false'),
      deepMix({}, options, {
        label: false,
      })
    );

    rose.render();
    const geometry = rose.chart.geometries[0];

    // @ts-ignore
    expect(geometry.labelOption.cfg).toBeUndefined();

    rose.destroy();
  });

  it('null', () => {
    const rose = new Rose(
      createDiv('null'),
      deepMix({}, options, {
        label: null,
      })
    );

    rose.render();
    const geometry = rose.chart.geometries[0];

    // @ts-ignore
    expect(geometry.labelOption.cfg).toBeUndefined();

    rose.destroy();
  });

  it('offset less 0', () => {
    const rose = new Rose(
      createDiv('offset'),
      deepMix({}, options, {
        label: {
          offset: -1,
        },
      })
    );

    rose.render();
    const geometry = rose.chart.geometries[0];

    // @ts-ignore
    expect(geometry.labelOption.cfg).toEqual({
      offset: -1,
      layout: { type: 'limit-in-shape' }, // 默认配置
    });

    rose.destroy();
  });

  it('layout is object', () => {
    const rose = new Rose(
      createDiv('layout'),
      deepMix({}, options, {
        label: {
          fields: ['sales'],
          layout: {
            type: 'other',
          },
        },
      })
    );

    rose.render();

    const geometry = rose.chart.geometries[0];

    // @ts-ignore
    expect(geometry.labelOption.cfg).toEqual({
      layout: [{ type: 'other' }],
    });

    rose.destroy();
  });

  it('layout is array', () => {
    const rose = new Rose(
      createDiv('layout'),
      deepMix({}, options, {
        label: {
          fields: ['sales'],
          position: 'top',
          layout: [
            {
              type: 'limit-in-shape',
            },
            {
              type: 'other',
            },
          ],
        },
      })
    );

    rose.render();

    const geometry = rose.chart.geometries[0];

    // @ts-ignore
    expect(geometry.labelOption.cfg).toEqual({
      position: 'top',
      layout: [{ type: 'other' }],
    });

    rose.destroy();
  });

  it('layout is null', () => {
    const rose = new Rose(
      createDiv('layout'),
      deepMix({}, options, {
        label: {
          fields: ['sales'],
          layout: null,
        },
      })
    );

    rose.render();

    const geometry = rose.chart.geometries[0];

    // @ts-ignore
    expect(geometry.labelOption.cfg).toEqual({});

    rose.destroy();
  });

  it('position top', async () => {
    const rose = new Rose(
      createDiv('position top'),
      deepMix({}, options, {
        label: {
          fields: ['sales'],
          position: 'top',
        },
      })
    );

    rose.render();

    const geometry = rose.chart.geometries[0];
    await delay(0);
    const labelGroups = geometry.labelsContainer.getChildren();

    // @ts-ignore
    expect(geometry.labelOption.cfg).toEqual({
      position: 'top',
    });
    expect(labelGroups).toHaveLength(salesByArea.length);
    labelGroups.forEach((label, index) => {
      expect(label.get('children')[0].attr('text')).toBe(`${Math.floor(salesByArea[index].sales / 10000)}万`);
    });

    rose.destroy();
  });

  it('position middle', () => {
    const rose = new Rose(
      createDiv('position middle'),
      deepMix({}, options, {
        label: {
          position: 'middle',
        },
      })
    );

    rose.render();
    const geometry = rose.chart.geometries[0];

    // @ts-ignore
    expect(geometry.labelOption.cfg).toEqual({ position: 'middle' });

    rose.destroy();
  });

  it('position bottom', () => {
    const rose = new Rose(
      createDiv('position bottom'),
      deepMix({}, options, {
        label: {
          position: 'bottom',
        },
      })
    );

    rose.render();
    const geometry = rose.chart.geometries[0];

    // @ts-ignore
    expect(geometry.labelOption.cfg).toEqual({ position: 'bottom' });

    rose.destroy();
  });

  it('group rose position top', async () => {
    const rose = new Rose(
      createDiv('group rose position top'),
      deepMix({}, options, {
        data: subSalesByArea,
        seriesField: 'series',
        isGroup: true,
        label: {
          fields: ['sales'],
          position: 'top',
        },
      })
    );

    rose.render();

    const geometry = rose.chart.geometries[0];
    await delay(0);
    const labelGroups = geometry.labelsContainer.getChildren();

    // @ts-ignore
    expect(geometry.labelOption.cfg).toEqual({
      position: 'top',
    });
    expect(labelGroups).toHaveLength(subSalesByArea.length);
    labelGroups.forEach((label) => {
      const origin = label.get('origin')._origin;
      expect(label.get('children')[0].attr('text')).toBe(`${Math.floor(origin.sales / 10000)}万`);
    });

    rose.destroy();
  });

  it('group rose position middle', async () => {
    const rose = new Rose(
      createDiv('group rose position middle'),
      deepMix({}, options, {
        data: subSalesByArea,
        seriesField: 'series',
        isGroup: true,
        label: {
          fields: ['sales'],
          position: 'middle',
        },
      })
    );

    rose.render();

    const geometry = rose.chart.geometries[0];
    await delay(0);
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

    rose.destroy();
  });

  it('group rose position bottom', async () => {
    const rose = new Rose(
      createDiv('group rose position bottom'),
      deepMix({}, options, {
        data: subSalesByArea,
        seriesField: 'series',
        isGroup: true,
        label: {
          fields: ['sales'],
          position: 'bottom',
        },
      })
    );

    rose.render();

    const geometry = rose.chart.geometries[0];
    await delay(0);
    const labelGroups = geometry.labelsContainer.getChildren();

    // @ts-ignore
    expect(geometry.labelOption.cfg).toEqual({
      position: 'bottom',
    });
    expect(labelGroups).toHaveLength(subSalesByArea.length);
    labelGroups.forEach((label) => {
      const origin = label.get('origin')._origin;
      expect(label.get('children')[0].attr('text')).toBe(`${Math.floor(origin.sales / 10000)}万`);
    });

    rose.destroy();
  });
});
