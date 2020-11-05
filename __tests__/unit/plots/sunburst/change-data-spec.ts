import { Sunburst } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { delay } from '../../../utils/delay';

describe('sunburst', () => {
  it('init: change data', async () => {
    const data = await fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json').then((res) =>
      res.json()
    );
    const sunburstPlot = new Sunburst(createDiv(), {
      width: 400,
      height: 400,
      data: [],
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
    sunburstPlot.changeData(data);
    const geometry = sunburstPlot.chart.geometries[0];
    expect(geometry.type).toBe('polygon');
    expect(sunburstPlot.options.color).toEqual(['#BAE7FF', '#1890FF', '#0050B3']);
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

  it('init: update', async () => {
    const data = await fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json').then((res) =>
      res.json()
    );
    const sunburstPlot = new Sunburst(createDiv(), {
      width: 400,
      height: 400,
      data,
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
    expect(fields).toEqual(['sum']);
    expect(coordinate.innerRadius).toBe(0.3);
    // @ts-ignore
    sunburstPlot.update({
      innerRadius: 0.6,
    });
    expect(sunburstPlot.chart.geometries[0].coordinate.innerRadius).toBe(0.6);

    sunburstPlot.destroy();
  });
});
