import { Bar } from '../../../../src';
import { salesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('bar label', () => {
  it('position: right', () => {
    const bar = new Bar(createDiv(), {
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
      expect(label.get('children')[0].attr('text')).toBe(`${Math.floor(salesByArea[index].sales / 10000)}万`);
    });
  });

  it('label position middle', () => {
    const bar = new Bar(createDiv(), {
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
      label: {
        position: 'middle',
      },
    });

    bar.render();

    const geometry = bar.chart.geometries[0];

    // @ts-ignore
    expect(geometry.labelOption.cfg).toEqual({ position: 'middle' });
  });

  it('label position left', () => {
    const bar = new Bar(createDiv(), {
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
      label: {
        position: 'left',
      },
    });

    bar.render();

    const geometry = bar.chart.geometries[0];

    // @ts-ignore
    expect(geometry.labelOption.cfg).toEqual({ position: 'left' });
  });
});
