import { clone } from '@antv/util';
import { Sunburst } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { SUNBRUST_DATA } from '../../../data/sunburst';
import { mobile } from '../../../data/mobile';
import { DEFAULT_OPTIONS } from '../../../../src/plots/sunburst/constant';

const MOBILE_DATA = clone(mobile);
MOBILE_DATA.forEach((m) => {
  m.value = null;
});

describe('sunburst', () => {
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

  it('defaultOptions 保持从 constants 中获取', () => {
    expect(Sunburst.getDefaultOptions()).toEqual(DEFAULT_OPTIONS);
  });
});
