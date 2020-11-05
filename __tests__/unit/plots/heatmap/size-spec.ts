import { Heatmap } from '../../../../src';
import { semanticBasicHeatmapData } from '../../../data/basic-heatmap';
import { createDiv } from '../../../utils/dom';

describe('heatmap', () => {
  describe('sizeRatio should', () => {
    const warn = console.warn;

    beforeEach(() => {
      console.warn = jest.fn();
    });

    afterAll(() => {
      console.warn = warn;
    });

    it('work with both shape&sizeField', () => {
      const heatmap = new Heatmap(createDiv('shape&sizeField and sizeRatio'), {
        width: 400,
        height: 300,
        data: semanticBasicHeatmapData,
        xField: 'name',
        yField: 'day',
        colorField: 'sales',
        shape: 'circle',
        sizeField: 'sales',
      });

      heatmap.render();

      // @ts-ignore
      const beforeRadius0 = heatmap.chart.geometries[0].elements[0].shape.attrs.r;

      heatmap.update({
        ...heatmap.options,
        sizeRatio: 0.5,
      });

      // @ts-ignore
      const afterRadius0 = heatmap.chart.geometries[0].elements[0].shape.attrs.r;

      expect(beforeRadius0 / afterRadius0).toBeCloseTo(Math.sqrt(1 / 0.5), 5);

      heatmap.destroy();
    });

    it('work with sizeField', () => {
      const heatmap = new Heatmap(createDiv('sizeField and sizeRatio'), {
        width: 400,
        height: 300,
        data: semanticBasicHeatmapData,
        xField: 'name',
        yField: 'day',
        colorField: 'sales',
        sizeField: 'sales',
        shape: 'square',
      });

      heatmap.render();

      // @ts-ignore
      const beforeRadius0 = heatmap.chart.geometries[0].elements[0].shape.attrs.width;

      heatmap.update({
        ...heatmap.options,
        sizeRatio: 0.2,
      });

      // @ts-ignore
      const afterRadius0 = heatmap.chart.geometries[0].elements[0].shape.attrs.width;

      expect(beforeRadius0 / afterRadius0).toBeCloseTo(Math.sqrt(1 / 0.2), 5);

      heatmap.destroy();
    });

    it('work with shape', () => {
      const heatmap = new Heatmap(createDiv('shape and sizeRatio'), {
        width: 400,
        height: 300,
        data: semanticBasicHeatmapData,
        xField: 'name',
        yField: 'day',
        colorField: 'sales',
        shape: 'circle',
        sizeRatio: 0.5,
      });

      heatmap.render();

      // @ts-ignore
      const beforeRadius0 = heatmap.chart.geometries[0].elements[0].shape.attrs.r;

      heatmap.update({
        ...heatmap.options,
        sizeRatio: 0.8,
      });

      // @ts-ignore
      const afterRadius0 = heatmap.chart.geometries[0].elements[0].shape.attrs.r;

      expect(beforeRadius0 / afterRadius0).toBeCloseTo(Math.sqrt(0.5 / 0.8), 5);

      heatmap.destroy();
    });

    it('not take effect while shape and sizeField are both missing', () => {
      const heatmap = new Heatmap(createDiv('sizeRatio without shape and sizeField'), {
        width: 400,
        height: 300,
        data: semanticBasicHeatmapData,
        xField: 'name',
        yField: 'day',
        colorField: 'sales',
        // both shape and sizeField missing
        sizeRatio: 0.5,
      });

      heatmap.render();

      expect(console.warn).toHaveBeenCalledWith('sizeRatio is not in effect: Must define shape or sizeField first');

      heatmap.destroy();
    });

    it('not take effect if exceeds range [0,1]', () => {
      const heatmap = new Heatmap(createDiv('sizeRatio test'), {
        width: 400,
        height: 300,
        data: semanticBasicHeatmapData,
        xField: 'name',
        yField: 'day',
        colorField: 'sales',
        sizeField: 'sales',
        sizeRatio: 5, // larger than 1
      });

      heatmap.render();

      expect(console.warn).toHaveBeenCalledWith('sizeRatio is not in effect: It must be a number in [0,1]');
      expect(console.warn).toHaveBeenCalledTimes(1);

      heatmap.update({
        ...heatmap.options,
        sizeRatio: -1, // less than 0
      });

      expect(console.warn).toHaveBeenCalledWith('sizeRatio is not in effect: It must be a number in [0,1]');
      expect(console.warn).toHaveBeenCalledTimes(2);

      heatmap.update({
        ...heatmap.options,
        sizeRatio: 0.2, // fine
      });

      expect(console.warn).toHaveBeenCalledTimes(2);

      heatmap.destroy();
    });
  });
});
