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
      shape: 'square',
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

    heatmap.destroy();
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
      shape: 'square',
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

    heatmap.destroy();
  });

  it('x*y*color and shape*size', () => {
    const heatmap = new Heatmap(createDiv('shape with size'), {
      width: 400,
      height: 300,
      data: semanticBasicHeatmapData,
      xField: 'name',
      yField: 'day',
      colorField: 'sales',
      shape: 'circle',
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

    heatmap.destroy();
  });
  it('x*y*color and shape*circle', () => {
    const heatmap = new Heatmap(createDiv('shape*fill'), {
      width: 400,
      height: 300,
      data: semanticBasicHeatmapData,
      xField: 'name',
      yField: 'day',
      shape: 'circle',
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
    expect(elements[0].shape.cfg.type).toEqual('circle');
    // default fill
    expect(elements[0].getModel().color).toBeUndefined();
    expect(elements[0].getModel().defaultStyle.fill).toBe('#5B8FF9');
    expect(elements[0].shape.attr('fill')).toBe('#5B8FF9');
    expect(heatmap.chart.geometries[0].labelOption).toBeUndefined();
    heatmap.update({
      colorField: 'sales',
    });
    expect(heatmap.chart.geometries[0].elements[0].getModel().color).toBeDefined();
    const currentElements = heatmap.chart.geometries[0].elements;
    const firstColor = currentElements[0].shape.attr('fill');
    const lastColor = currentElements[currentElements.length - 1].shape.attr('fill');
    expect(firstColor !== lastColor).toBeTruthy();
    // @ts-ignore
    expect(heatmap.chart.geometries[0].labelOption.fields).toEqual(['sales']);
    heatmap.update({
      heatmapStyle: {
        fill: 'red',
      },
    });
    expect(heatmap.chart.geometries[0].elements[0].getModel().style.fill).toBe('red');
    const updateElements = heatmap.chart.geometries[0].elements;
    expect(updateElements[0].shape.attr('fill')).toBe('red');
    expect(updateElements[updateElements.length - 1].shape.attr('fill')).toBe('red');
    // @ts-ignore
    expect(heatmap.chart.geometries[0].styleOption.cfg.fill).toBe('red');
    heatmap.destroy();
  });
  it('x*y*color and shape*square', () => {
    const heatmap = new Heatmap(createDiv('shape*fill'), {
      width: 400,
      height: 300,
      data: semanticBasicHeatmapData.sort((p, n) => p.sales - n.sales),
      xField: 'name',
      yField: 'day',
      shape: 'square',
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
    // default fill
    expect(elements[0].getModel().color).toBeUndefined();
    expect(elements[0].getModel().defaultStyle.fill).toBe('#5B8FF9');
    expect(elements[0].shape.attr('fill')).toBe('#5B8FF9');
    expect(heatmap.chart.geometries[0].labelOption).toBeUndefined();

    heatmap.update({
      colorField: 'sales',
    });
    expect(heatmap.chart.geometries[0].elements[0].getModel().color).toBeDefined();
    const currentElements = heatmap.chart.geometries[0].elements;
    const firstColor = currentElements[0].shape.attr('fill');
    const lastColor = currentElements[currentElements.length - 1].shape.attr('fill');
    expect(firstColor !== lastColor).toBeTruthy();
    // @ts-ignore
    expect(heatmap.chart.geometries[0].labelOption.fields).toEqual(['sales']);
    heatmap.update({
      heatmapStyle: {
        fill: 'red',
      },
    });
    expect(heatmap.chart.geometries[0].elements[0].getModel().style.fill).toBe('red');
    const updateElements = heatmap.chart.geometries[0].elements;
    expect(updateElements[0].shape.attr('fill')).toBe('red');
    expect(updateElements[updateElements.length - 1].shape.attr('fill')).toBe('red');
    // @ts-ignore
    expect(heatmap.chart.geometries[0].styleOption.cfg.fill).toBe('red');
    heatmap.destroy();
  });
});
