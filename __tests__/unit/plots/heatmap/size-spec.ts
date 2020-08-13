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

    it('work with both shapeType&sizeField', () => {
      const heatmap = new Heatmap(createDiv('shapeType&sizeField and sizeRatio'), {
        width: 400,
        height: 300,
        data: semanticBasicHeatmapData,
        xField: 'name',
        yField: 'day',
        colorField: 'sales',
        shapeType: 'circle',
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
    });

    it('work with shapeType', () => {
      const heatmap = new Heatmap(createDiv('shapeType and sizeRatio'), {
        width: 400,
        height: 300,
        data: semanticBasicHeatmapData,
        xField: 'name',
        yField: 'day',
        colorField: 'sales',
        shapeType: 'circle',
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
    });

    it('not take effect while shapeType and sizeField are both missing', () => {
      const heatmap = new Heatmap(createDiv('sizeRatio without shapeType and sizeField'), {
        width: 400,
        height: 300,
        data: semanticBasicHeatmapData,
        xField: 'name',
        yField: 'day',
        colorField: 'sales',
        // both shapeType and sizeField missing
        sizeRatio: 0.5,
      });

      heatmap.render();

      expect(console.warn).toHaveBeenCalledWith('sizeRatio is not in effect: Must define shapeType or sizeField first');
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
    });
  });
});
