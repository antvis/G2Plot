import { Heatmap } from '../../../../src';
import { basicHeatmapData, semanticBasicHeatmapData } from '../../../data/basic-heatmap';
import { createDiv } from '../../../utils/dom';
import { DEFAULT_COLORS } from '../../../../src/constant';
import { DEFAULT_OPTIONS } from '../../../../src/plots/heatmap/constant';

describe('heatmap', () => {
  it('x*y with color', () => {
    const heatmap = new Heatmap(createDiv('basic heatmap'), {
      width: 400,
      height: 300,
      data: semanticBasicHeatmapData,
      xField: 'name',
      yField: 'day',
      colorField: 'sales',
    });

    heatmap.render();

    // @ts-ignore
    expect(heatmap.getDefaultOptions()).toBe(Heatmap.getDefaultOptions());

    const geometry = heatmap.chart.geometries[0];

    const { elements } = geometry;

    let maxElementIndex = 0;
    let minElementIndex = 0;

    elements.forEach((e, i) => {
      const value = e.getData().sales;
      if (elements[maxElementIndex].getData().sales < value) {
        maxElementIndex = i;
      }
      if (elements[minElementIndex].getData().sales > value) {
        minElementIndex = i;
      }
    });

    const colors = DEFAULT_COLORS.GRADIENT.CONTINUOUS.split('-');
    expect(elements[maxElementIndex].getModel().color.toUpperCase()).toBe(colors[colors.length - 1]);
    expect(elements[minElementIndex].getModel().color.toUpperCase()).toBe(colors[0]);

    heatmap.destroy();
  });

  it('x*y with color and meta', () => {
    const NAMES = ['Alexander', 'Marie', 'Maximilian', 'Sophia', 'Lukas', 'Maria', 'Leon', 'Anna', 'Tim', 'Laura'];
    const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    const heatmap = new Heatmap(createDiv('basic heatmap by meta'), {
      width: 400,
      height: 300,
      data: basicHeatmapData,
      xField: 'name',
      yField: 'day',
      meta: {
        name: {
          type: 'cat',
          values: NAMES,
        },
        day: {
          type: 'cat',
          values: DAYS,
        },
      },
      colorField: 'sales',
    });

    heatmap.render();

    const geometry = heatmap.chart.geometries[0];

    expect(geometry.scales.name.isCategory).toBe(true);
    expect(geometry.scales.name.values).toStrictEqual(NAMES);
    expect(geometry.scales.day.isCategory).toBe(true);
    expect(geometry.scales.day.values).toStrictEqual(DAYS);

    const { elements } = geometry;

    expect(elements.length).toBe(NAMES.length * DAYS.length);
    let maxElementIndex = 0;
    let minElementIndex = 0;

    elements.forEach((e, i) => {
      const value = e.getData().sales;
      if (elements[maxElementIndex].getData().sales < value) {
        maxElementIndex = i;
      }
      if (elements[minElementIndex].getData().sales > value) {
        minElementIndex = i;
      }
    });

    const colors = DEFAULT_COLORS.GRADIENT.CONTINUOUS.split('-');
    expect(elements[maxElementIndex].getModel().color.toUpperCase()).toBe(colors[colors.length - 1]);
    expect(elements[minElementIndex].getModel().color.toUpperCase()).toBe(colors[0]);

    heatmap.destroy();
  });

  it('defaultOptions 保持从 constants 中获取', () => {
    expect(Heatmap.getDefaultOptions()).toEqual(DEFAULT_OPTIONS);
  });
});
