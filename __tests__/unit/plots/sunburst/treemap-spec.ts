import { clone } from '@antv/util';
import { Sunburst } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { mobile } from '../../../data/mobile';

const MOBILE_DATA = clone(mobile);
MOBILE_DATA.forEach((m) => {
  m.value = null;
});

// 目前已经不支持 treemap 旭日图，暂时为了兼容旧版本，继续保留
describe.skip('treemap sunburst', () => {
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
    // @ts-ignore
    const {
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
    // expect(styleOption.cfg).toMatchObject({
    //   lineWidth: 1,
    //   stroke: '#fff',
    // });
    const transformData = geometry.data[0];
    expect(transformData.ext).toEqual({
      size: [1, 0.1],
    });
    const elements = geometry.elements;
    const bbox = elements[elements.length - 1].getBBox();
    sunburstPlot.chart.showTooltip({ x: bbox.maxX, y: bbox.maxY });
    expect(
      document.getElementById('sunburst-id-one').getElementsByClassName('g2-tooltip-list-item-value')[0].innerHTML
    ).toBe('0.0211');
    sunburstPlot.chart.hideTooltip();

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
    // expect(styleOption.cfg).toMatchObject({
    //   lineWidth: 1,
    //   stroke: '#fff',
    // });
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
