import { Rose } from '../../../../src';
import { salesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('rose label', () => {
  it('position top', () => {
    const rose = new Rose(createDiv('position top'), {
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
        fields: ['sales'],
        position: 'top',
      },
    });

    rose.render();

    const geometry = rose.chart.geometries[0];
    const labelGroups = geometry.labelsContainer.getChildren();

    // @ts-ignore
    expect(geometry.labelOption.cfg).toEqual({
      position: 'top',
    });
    expect(labelGroups).toHaveLength(salesByArea.length);
    labelGroups.forEach((label, index) => {
      expect(label.get('children')[0].attr('text')).toBe(`${Math.floor(salesByArea[index].sales / 10000)}万`);
    });
  });

  it('position middle', () => {
    const rose = new Rose(createDiv('position middle'), {
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

    rose.render();

    const geometry = rose.chart.geometries[0];

    // @ts-ignore
    expect(geometry.labelOption.cfg).toEqual({ position: 'middle' });
  });

  it('position bottom', () => {
    const rose = new Rose(createDiv('position bottom'), {
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
        position: 'bottom',
      },
    });

    rose.render();

    const geometry = rose.chart.geometries[0];

    // @ts-ignore
    expect(geometry.labelOption.cfg).toEqual({ position: 'bottom' });
  });
});
