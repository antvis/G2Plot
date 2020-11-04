import { DualAxes } from '../../../../src';
import { PV_DATA, UV_DATA, PV_DATA_MULTI, UV_DATA_MULTI } from '../../../data/pv-uv';
import {} from '../../../data/pv-uv';
import { createDiv } from '../../../utils/dom';
import { LEFT_AXES_VIEW, RIGHT_AXES_VIEW } from '../../../../src/plots/dual-axes/constant';
import { findViewById } from '../../../../src/utils/view';

describe('Line-Column', () => {
  it('Line-Colomn', () => {
    const dualAxes = new DualAxes(createDiv(), {
      height: 500,
      data: [[], []],
      xField: 'date',
      yField: ['pv', 'uv'],
      geometryOptions: [
        {
          geometry: 'line',
          connectNulls: false,
          smooth: true,
          color: '#f00',
        },
        {
          geometry: 'column',
        },
      ],
    });

    dualAxes.render();
    // 先柱后线
    expect(dualAxes.chart.views[0].id).toBe(RIGHT_AXES_VIEW);
    expect(dualAxes.chart.views[1].id).toBe(LEFT_AXES_VIEW);
    dualAxes.changeData([PV_DATA, UV_DATA]);
    const leftView = findViewById(dualAxes.chart, LEFT_AXES_VIEW);
    const rightView = findViewById(dualAxes.chart, RIGHT_AXES_VIEW);
    // line
    const leftGeometry = leftView.geometries.find((g) => g.type === 'line');
    const rightGeometry = rightView.geometries.find((g) => g.type === 'interval');
    // @ts-ignore
    expect(leftGeometry.shapeType).toBe('line');
    expect(rightGeometry.shapeType).toBe('interval');
    dualAxes.destroy();
  });

  it('stack column and mutilpe line', () => {
    const dualAxes = new DualAxes(createDiv('test DualAxes change data'), {
      width: 400,
      height: 500,
      data: [[], []],
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
    expect(dualAxes.chart.getOptions().data.length).toBe(0);
    dualAxes.changeData([PV_DATA_MULTI, UV_DATA_MULTI]);
    const element = dualAxes.chart.views[1].geometries[1].elements[0];
    expect(element.getModel().shape).toBe('circle');
    expect(element.getData().site).toBeDefined();
    expect(element.getModel().style.fill).toBe('red');
  });
});
