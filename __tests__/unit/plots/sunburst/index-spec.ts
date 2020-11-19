import { clone } from '@antv/util';
import { Sunburst } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { SUNBRUST_DATA } from '../../../data/sunburst';
import { mobile } from '../../../data/mobile';

const MOBILE_DATA = clone(mobile);
MOBILE_DATA.forEach((m) => {
  m.value = null;
});

describe('sunburst', () => {
  it('init: default', async () => {
    const sunburstPlot = new Sunburst(createDiv(), {
      width: 400,
      height: 400,
      data: SUNBRUST_DATA,
      seriesField: 'sum',
      colorField: 'value',
      color: ['#BAE7FF', '#1890FF', '#0050B3'],
      innerRadius: 0.3,
      radius: 1,
      label: {
        position: 'middle',
      },
      interactions: [{ type: 'element-active' }],
    });
    sunburstPlot.render();
    const geometry = sunburstPlot.chart.geometries[0];
    expect(geometry.type).toBe('polygon');
    const {
      // @ts-ignore
      labelOption: { fields, cfg },
      coordinate,
    } = geometry;
    expect(fields).toEqual(['sum']);
    expect(cfg.position).toBe('middle');
    const positionFields = geometry.getAttribute('position').getFields();
    expect(geometry.elements.length).toBe(geometry.data.length);
    expect(positionFields).toHaveLength(2);
    expect(positionFields).toEqual(['x', 'y']);
    expect(coordinate.innerRadius).toBe(0.3);
    expect(coordinate.radius).toBe(1);

    sunburstPlot.destroy();
  });
});

describe('sunburst', () => {
  it('init: type treemap', async () => {
    const data = {
      name: 'root',
      children: MOBILE_DATA,
    };
    const sunburstPlot = new Sunburst(createDiv(), {
      width: 400,
      height: 400,
      data,
      type: 'treemap',
      seriesField: 'value',
      reflect: 'y',
      colorField: 'brand',
      sunburstStyle: {
        lineWidth: 1,
        stroke: '#fff',
      },
      interactions: [{ type: 'element-active' }],
    });
    sunburstPlot.render();
    const geometry = sunburstPlot.chart.geometries[0];

    expect(geometry.type).toBe('polygon');
    // @ts-ignore
    const {
      attributeOption: { color },
      coordinate,
      styleOption,
    } = geometry;
    expect(color.fields).toEqual(['brand']);
    const positionFields = geometry.getAttribute('position').getFields();
    expect(geometry.elements.length).toBe(geometry.data.length);
    expect(positionFields).toHaveLength(2);
    expect(positionFields).toEqual(['x', 'y']);
    expect(coordinate.type).toBe('polar');
    // @ts-ignore
    expect(coordinate.isReflectY).toBeTruthy();
    expect(styleOption.cfg).toEqual({
      lineWidth: 1,
      stroke: '#fff',
    });

    sunburstPlot.destroy();
  });
});

describe('sunburst', () => {
  it('init: hierarchy config', async () => {
    const data = {
      name: 'root',
      children: MOBILE_DATA,
    };
    const sunburstPlot = new Sunburst(createDiv('sunburst*config', document.body, 'sunburst-id-one'), {
      width: 400,
      height: 400,
      data,
      type: 'treemap',
      seriesField: 'value',
      reflect: 'y',
      colorField: 'brand',
      hierarchyConfig: {
        size: [1, 0.1],
      },
      sunburstStyle: {
        lineWidth: 1,
        stroke: '#fff',
      },
      interactions: [{ type: 'element-active' }],
    });
    sunburstPlot.render();
    const geometry = sunburstPlot.chart.geometries[0];
    expect(geometry.type).toBe('polygon');
    // @ts-ignore
    const {
      attributeOption: { color },
      coordinate,
      styleOption,
    } = geometry;
    expect(color.fields).toEqual(['brand']);
    const positionFields = geometry.getAttribute('position').getFields();
    expect(geometry.elements.length).toBe(geometry.data.length);
    expect(positionFields).toHaveLength(2);
    expect(positionFields).toEqual(['x', 'y']);
    expect(coordinate.type).toBe('polar');
    // @ts-ignore
    expect(coordinate.isReflectY).toBeTruthy();
    expect(styleOption.cfg).toEqual({
      lineWidth: 1,
      stroke: '#fff',
    });
    const transformData = geometry.data[0];
    expect(transformData.ext).toEqual({
      size: [1, 0.1],
    });
    const elements = geometry.elements;
    const bbox = elements[elements.length - 1].getBBox();
    sunburstPlot.chart.showTooltip({ x: bbox.maxX, y: bbox.maxY });
    expect(
      document.getElementById('sunburst-id-one').getElementsByClassName('g2-tooltip-list-item-value')[0].innerHTML
    ).toBe('0.0153');
    sunburstPlot.chart.hideTooltip();

    sunburstPlot.destroy();
  });
});

describe('sunburst', () => {
  it('formatter: tooltip formatter', async () => {
    const data = {
      name: 'root',
      children: MOBILE_DATA,
    };
    const sunburstPlot = new Sunburst(createDiv('sunburset', document.body, 'sunburset-id'), {
      width: 400,
      height: 400,
      data,
      type: 'treemap',
      seriesField: 'value',
      reflect: 'y',
      colorField: 'brand',
      hierarchyConfig: {
        size: [1, 0.1],
      },
      sunburstStyle: {
        lineWidth: 1,
        stroke: '#fff',
      },
      tooltip: {
        formatter: () => ({ name: 'name', value: '123' }),
      },
      interactions: [{ type: 'element-active' }],
    });
    sunburstPlot.render();
    const geometry = sunburstPlot.chart.geometries[0];
    expect(geometry.type).toBe('polygon');
    // @ts-ignore
    const {
      attributeOption: { color },
      coordinate,
      styleOption,
    } = geometry;

    expect(color.fields).toEqual(['brand']);
    const positionFields = geometry.getAttribute('position').getFields();
    expect(geometry.elements.length).toBe(geometry.data.length);
    expect(positionFields).toHaveLength(2);
    expect(positionFields).toEqual(['x', 'y']);
    expect(coordinate.type).toBe('polar');
    // @ts-ignore
    expect(coordinate.isReflectY).toBeTruthy();
    expect(styleOption.cfg).toEqual({
      lineWidth: 1,
      stroke: '#fff',
    });
    const transformData = geometry.data[0];
    expect(transformData.ext).toEqual({
      size: [1, 0.1],
    });
    const elements = geometry.elements;
    const bbox = elements[elements.length - 1].getBBox();
    sunburstPlot.chart.showTooltip({ x: bbox.maxX, y: bbox.maxY });
    expect(
      document.getElementById('sunburset-id').getElementsByClassName('g2-tooltip-list-item-value')[0].innerHTML
    ).toBe('123');
    sunburstPlot.chart.hideTooltip();

    sunburstPlot.destroy();
  });
});
