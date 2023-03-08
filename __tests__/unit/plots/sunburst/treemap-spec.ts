import { clone } from '@antv/util';
import { Sunburst } from '../../../../src';
import { mobile } from '../../../data/mobile';
import { SUNBRUST_DATA } from '../../../data/sunburst';
import { createDiv } from '../../../utils/dom';

const MOBILE_DATA = clone(mobile);
MOBILE_DATA.forEach((m) => {
  m.value = null;
});

// 目前已经不支持 treemap 旭日图，暂时为了兼容旧版本，继续保留
describe('treemap sunburst', () => {
  it('旧版本', async () => {
    const sunburstPlot = new Sunburst(createDiv(), {
      width: 400,
      height: 400,
      data: SUNBRUST_DATA,
      // @ts-ignore
      seriesField: 'sum',
      colorField: 'value',
      color: ['#BAE7FF', '#1890FF', '#0050B3'],
      innerRadius: 0.3,
      radius: 1,
      interactions: [{ type: 'element-active' }],
    });
    sunburstPlot.render();
    const geometry = sunburstPlot.chart.geometries[0];
    expect(geometry.type).toBe('polygon');
    const { coordinate } = geometry;
    const positionFields = geometry.getAttribute('position').getFields();
    expect(geometry.elements.length).toBe(geometry.data.length);
    expect(positionFields).toHaveLength(2);
    expect(positionFields).toEqual(['x', 'y']);
    expect(coordinate.innerRadius).toBe(0.3);
    expect(coordinate.radius).toBe(1);

    sunburstPlot.destroy();
  });

  it('init: type treemap', async () => {
    const data = {
      name: 'root',
      children: MOBILE_DATA,
    };
    const sunburstPlot = new Sunburst(createDiv(), {
      width: 400,
      height: 400,
      data,
      // @ts-ignore
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
    const {
      // @ts-ignore
      attributeOption: { color },
      coordinate,
    } = geometry;
    expect(color.fields).toEqual(['brand']);
    const positionFields = geometry.getAttribute('position').getFields();
    expect(geometry.elements.length).toBe(geometry.data.length);
    expect(positionFields).toHaveLength(2);
    expect(positionFields).toEqual(['x', 'y']);
    expect(coordinate.type).toBe('polar');
    // @ts-ignore
    expect(coordinate.isReflectY).toBeTruthy();

    sunburstPlot.destroy();
  });

  it('init: hierarchy config', async () => {
    const data = {
      name: 'root',
      children: MOBILE_DATA,
    };
    const sunburstPlot = new Sunburst(createDiv('sunburst*config', document.body, 'sunburst-id-one'), {
      width: 400,
      height: 400,
      data,
      // @ts-ignore
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
    const {
      // @ts-ignore
      attributeOption: { color },
      coordinate,
    } = geometry;
    expect(color.fields).toEqual(['brand']);
    const positionFields = geometry.getAttribute('position').getFields();
    expect(geometry.elements.length).toBe(geometry.data.length);
    expect(positionFields).toHaveLength(2);
    expect(positionFields).toEqual(['x', 'y']);
    expect(coordinate.type).toBe('polar');
    // @ts-ignore
    expect(coordinate.isReflectY).toBeTruthy();
    const transformData = geometry.data[0];
    expect(transformData.ext).toMatchObject({
      size: [1, 0.1],
    });

    sunburstPlot.destroy();
  });

  it('formatter: tooltip formatter', async () => {
    const data = {
      name: 'root',
      children: MOBILE_DATA,
    };
    const sunburstPlot = new Sunburst(createDiv('sunburset', document.body, 'sunburset-id'), {
      width: 400,
      height: 400,
      data,
      // @ts-ignore
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
    const {
      // @ts-ignore
      attributeOption: { color },
      coordinate,
    } = geometry;

    expect(color.fields).toEqual(['brand']);
    const positionFields = geometry.getAttribute('position').getFields();
    expect(geometry.elements.length).toBe(geometry.data.length);
    expect(positionFields).toHaveLength(2);
    expect(positionFields).toEqual(['x', 'y']);
    expect(coordinate.type).toBe('polar');
    // @ts-ignore
    expect(coordinate.isReflectY).toBeTruthy();
    const transformData = geometry.data[0];
    expect(transformData.ext).toMatchObject({
      size: [1, 0.1],
    });
    sunburstPlot.chart.hideTooltip();

    sunburstPlot.destroy();
  });
});
