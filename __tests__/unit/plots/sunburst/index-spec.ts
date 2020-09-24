import { Sunburst } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('sunburst', () => {
  it('init: default', async () => {
    const data = await fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json').then((res) =>
      res.json()
    );
    const sunburstPlot = new Sunburst(createDiv(), {
      width: 400,
      height: 400,
      data,
      seriesField: 'sum',
      colorField: 'value',
      color: ['#BAE7FF', '#1890FF', '#0050B3'],
      innerRadius: 0.3,
      label: {
        position: 'middle',
      },
      tooltip: {
        customContent: (_, item) => {
          const mappingData = item?.[0]?.mappingData;
          const originData = mappingData?._origin?.data;
          return `<div>${originData?.label} - ${originData?.sum}</div>`;
        },
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
  });
});

describe('sunburst', () => {
  it('init: type treemap', async () => {
    const fetchData = await fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/mobile.json').then((res) =>
      res.json()
    );
    fetchData.forEach((mobile) => {
      mobile.value = null;
    });
    const data = {
      name: 'root',
      children: fetchData,
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
  });
});
