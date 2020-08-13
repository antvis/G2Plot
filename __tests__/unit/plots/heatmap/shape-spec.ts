import { Heatmap } from '../../../../src';
import { semanticBasicHeatmapData } from '../../../data/basic-heatmap';
import { createDiv } from '../../../utils/dom';

describe('heatmap', () => {
  it('x*y*color and shape', () => {
    const heatmap = new Heatmap(createDiv('just change shape'), {
      width: 400,
      height: 300,
      data: semanticBasicHeatmapData,
      xField: 'name',
      yField: 'day',
      colorField: 'sales',
      shapeType: 'square',
      label: {
        offset: -2,
        style: {
          fill: '#fff',
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)',
        },
      },
    });

    heatmap.render();

    const geometry = heatmap.chart.geometries[0];
    const { elements } = geometry;
    expect(elements[0].shape.cfg.type).toEqual('rect');
  });

  it('x*y*color and size', () => {
    const heatmap = new Heatmap(createDiv('just change size'), {
      width: 400,
      height: 300,
      data: semanticBasicHeatmapData,
      xField: 'name',
      yField: 'day',
      colorField: 'sales',
      sizeField: 'sales',
      label: {
        offset: -2,
        style: {
          fill: '#fff',
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)',
        },
      },
    });

    heatmap.render();

    const geometry = heatmap.chart.geometries[0];
    expect(geometry.scales.sales.isContinuous).toBe(true);
    // @ts-ignore
    expect(geometry.attributeOption.shape.fields).toEqual(['sales']);

    const { elements } = geometry;
    expect(elements[0].shape.cfg.type).toEqual('rect');
  });

  it('x*y*color and shape*size', () => {
    const heatmap = new Heatmap(createDiv('shape with size'), {
      width: 400,
      height: 300,
      data: semanticBasicHeatmapData,
      xField: 'name',
      yField: 'day',
      colorField: 'sales',
      shapeType: 'circle',
      sizeField: 'sales',
      label: {
        offset: -2,
        style: {
          fill: '#fff',
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)',
        },
      },
    });

    heatmap.render();

    const geometry = heatmap.chart.geometries[0];
    expect(geometry.scales.sales.isContinuous).toBe(true);
    // @ts-ignore
    expect(geometry.attributeOption.shape.fields).toEqual(['sales']);

    const { elements } = geometry;
    expect(elements[0].shape.cfg.type).toEqual('circle');
  });
});
