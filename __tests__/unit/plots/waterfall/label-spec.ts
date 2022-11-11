import { Waterfall } from '../../../../src';
import { salesByArea } from '../../../data/sales';
import { delay } from '../../../utils/delay';
import { createDiv } from '../../../utils/dom';

describe('waterfall label', () => {
  it('position top', async () => {
    const waterfall = new Waterfall(createDiv('position top'), {
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

    waterfall.render();

    const geometry = waterfall.chart.geometries[0];
    await delay(0);
    const labelGroups = geometry.labelsContainer.getChildren();

    // @ts-ignore
    expect(geometry.labelOption.cfg).toEqual({
      position: 'top',
    });
    expect(labelGroups).toHaveLength(salesByArea.length + 1);
    labelGroups.forEach((label, index) => {
      if (index !== salesByArea.length) {
        expect(label.get('children')[0].attr('text')).toBe(`${Math.floor(salesByArea[index].sales / 10000)}万`);
      }
    });

    waterfall.destroy();
  });

  it('position middle', () => {
    const waterfall = new Waterfall(createDiv('position middle'), {
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

    waterfall.render();

    const geometry = waterfall.chart.geometries[0];

    // @ts-ignore
    expect(geometry.labelOption.cfg).toEqual({ position: 'middle' });

    waterfall.destroy();
  });

  it('position bottom', () => {
    const waterfall = new Waterfall(createDiv('position bottom'), {
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

    waterfall.render();

    const geometry = waterfall.chart.geometries[0];

    // @ts-ignore
    expect(geometry.labelOption.cfg).toEqual({ position: 'bottom' });

    waterfall.destroy();
  });

  it('callback', async () => {
    const waterfall = new Waterfall(createDiv('position top'), {
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
        callback: (value, area) => {
          return {
            style: {
              fill: area === salesByArea[0].area ? 'red' : 'green',
            },
          };
        },
      },
    });

    waterfall.render();
    await delay(0);
    const labels = waterfall.chart.geometries[0].labelsContainer.getChildren();
    // @ts-ignore
    expect(labels[0].getChildByIndex(0).attr('fill')).toBe('red');
    // @ts-ignore
    expect(labels[1].getChildByIndex(0).attr('fill')).toBe('green');

    waterfall.destroy();
  });
});
