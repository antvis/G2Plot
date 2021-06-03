import { Sunburst } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { delay } from '../../../utils/delay';
import { SUNBRUST_DATA } from '../../../data/sunburst';

describe('sunburst', () => {
  it('旧版本', async () => {
    const sunburstPlot = new Sunburst(createDiv(), {
      width: 400,
      height: 400,
      data: [],
      // @ts-ignore
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
    await delay(200);
    sunburstPlot.changeData(SUNBRUST_DATA);
    const geometry = sunburstPlot.chart.geometries[0];
    expect(geometry.type).toBe('polygon');
    expect(sunburstPlot.options.color).toEqual(['#BAE7FF', '#1890FF', '#0050B3']);
    const {
      // @ts-ignore
      labelOption: { fields, cfg },
      coordinate,
    } = geometry;
    // 默认展示 name（不进行兼容））
    expect(fields).toEqual(['name']);
    expect(cfg.position).toBe('middle');
    const positionFields = geometry.getAttribute('position').getFields();
    expect(geometry.elements.length).toBe(geometry.data.length);
    expect(positionFields).toHaveLength(2);
    expect(positionFields).toEqual(['x', 'y']);
    expect(coordinate.innerRadius).toBe(0.3);
    expect(coordinate.radius).toBe(1);

    sunburstPlot.destroy();
  });

  it('旧版本: update', async () => {
    const sunburstPlot = new Sunburst(createDiv(), {
      width: 400,
      height: 400,
      data: SUNBRUST_DATA,
      // @ts-ignore
      seriesField: 'sum',
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
      labelOption: { fields },
      coordinate,
    } = geometry;
    // 默认展示 name（不进行兼容））
    expect(fields).toEqual(['name']);
    expect(coordinate.innerRadius).toBe(0.3);
    // @ts-ignore
    sunburstPlot.update({
      innerRadius: 0.6,
    });
    expect(sunburstPlot.chart.geometries[0].coordinate.innerRadius).toBe(0.6);

    sunburstPlot.destroy();
  });
});
