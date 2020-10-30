import { DualAxes } from '../../../../src';
import { PV_DATA_MULTI, UV_DATA_MULTI } from '../../../data/pv-uv';
import { createDiv } from '../../../utils/dom';

describe('point', () => {
  it('point style', () => {
    const dualAxes = new DualAxes(createDiv('test DualAxes point'), {
      width: 400,
      height: 500,
      data: [PV_DATA_MULTI, UV_DATA_MULTI],
      xField: 'date',
      yField: ['pv', 'uv'],
      geometryOptions: [
        {
          geometry: 'column',
          seriesField: 'site',
          isStack: true,
        },
        {
          geometry: 'line',
          seriesField: 'site',
          isStack: true,
          point: {
            style: () => ({ fill: 'red' }),
          },
        },
      ],
    });

    dualAxes.render();

    const element = dualAxes.chart.views[1].geometries[1].elements[0];
    expect(element.getModel().shape).toBe('circle');
    expect(element.getData().site).toBeDefined();
    expect(element.getModel().style.fill).toBe('red');
  });
  it('point false', () => {
    const dualAxes = new DualAxes(createDiv('test DualAxes point false'), {
      width: 400,
      height: 500,
      data: [PV_DATA_MULTI, UV_DATA_MULTI],
      xField: 'date',
      yField: ['pv', 'uv'],
      geometryOptions: [
        {
          geometry: 'column',
          seriesField: 'site',
          isStack: true,
        },
        {
          geometry: 'line',
          seriesField: 'site',
          isStack: true,
          point: false,
        },
      ],
    });

    dualAxes.render();
    const element = dualAxes.chart.views[1].geometries[1];
    expect(element).toBeUndefined();
  });

  it('point undefined', () => {
    const dualAxes = new DualAxes(createDiv('test DualAxes point undefined'), {
      width: 400,
      height: 500,
      data: [PV_DATA_MULTI, UV_DATA_MULTI],
      xField: 'date',
      yField: ['pv', 'uv'],
      geometryOptions: [
        {
          geometry: 'column',
          seriesField: 'site',
          isStack: true,
        },
        {
          geometry: 'line',
          seriesField: 'site',
          isStack: true,
        },
      ],
    });

    dualAxes.render();
    const element = dualAxes.chart.views[1].geometries[1];
    expect(element).toBeUndefined();
  });
});
