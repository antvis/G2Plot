import { Column } from '../../../../src';
import { salesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('column label', () => {
  it('position: top', () => {
    const column = new Column(createDiv(), {
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
        position: 'top',
      },
    });

    column.render();

    const geometry = column.chart.geometries[0];

    // @ts-ignore
    expect(geometry.labelOption.cfg).toEqual({
      position: 'top',
    });
  });

  it('label position middle', () => {
    const column = new Column(createDiv(), {
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

    column.render();

    const geometry = column.chart.geometries[0];

    // @ts-ignore
    expect(geometry.labelOption.cfg).toEqual({ position: 'middle' });
  });

  it('label position bottom', () => {
    const column = new Column(createDiv(), {
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

    column.render();

    const geometry = column.chart.geometries[0];

    // @ts-ignore
    expect(geometry.labelOption.cfg).toEqual({ position: 'bottom' });
  });
});
