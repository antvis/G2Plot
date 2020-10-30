import { DualAxes } from '../../../../src';
import { PV_DATA_MULTI, UV_DATA_MULTI } from '../../../data/pv-uv';
import { createDiv } from '../../../utils/dom';
import { LEFT_AXES_VIEW } from '../../../../src/plots/dual-axes/constant';
import { findViewById } from '../../../../src/utils/view';

describe('stack', () => {
  it('stack line/column', () => {
    const dualAxes = new DualAxes(createDiv('test DualAxes doubal line'), {
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
          point: {},
        },
      ],
    });

    dualAxes.render();

    expect(dualAxes.chart.views[0].geometries[0].type).toBe('interval');
    expect(dualAxes.chart.views[0].geometries[0].getAdjust('stack')).toBeDefined();

    expect(dualAxes.chart.views[1].geometries[0].type).toBe('line');
    expect(dualAxes.chart.views[1].geometries[1].type).toBe('point');
    expect(dualAxes.chart.views[1].geometries[0].getAdjust('stack')).toBeDefined();
    expect(dualAxes.chart.views[1].geometries[1].getAdjust('stack')).toBeDefined();
  });

  it('stack percent column', () => {
    const option = {
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
          isPercent: true,
        },
        {
          geometry: 'line',
          seriesField: 'site',
          isStack: true,
          point: {},
        },
      ],
    };
    // 依赖于百分比柱状图，测试下 tooltip
    const dualAxes = new DualAxes(createDiv('stack percent column', undefined, 'stack_percent_column'), option);

    dualAxes.render();
    const leftView = findViewById(dualAxes.chart, LEFT_AXES_VIEW);
    const leftGeometry = leftView.geometries.find((g) => g.type === 'interval');

    const bbox = leftGeometry.elements[leftGeometry.elements.length - 1].getBBox();
    dualAxes.chart.showTooltip({ x: bbox.maxX, y: bbox.maxY });
    expect(document.querySelectorAll('#stack_percent_column .g2-tooltip-list-item .g2-tooltip-name')[0].innerHTML).toBe(
      'a'
    );
    expect(
      document.querySelectorAll('#stack_percent_column .g2-tooltip-list-item .g2-tooltip-value')[0].innerHTML
    ).toBe('90.90%');

    dualAxes.update({
      ...option,
      tooltip: {
        formatter: () => ({
          name: 'test',
          value: '123',
        }),
      },
    });
    dualAxes.chart.showTooltip({ x: bbox.maxX, y: bbox.maxY });
    expect(document.querySelectorAll('#stack_percent_column .g2-tooltip-list-item .g2-tooltip-name')[0].innerHTML).toBe(
      'test'
    );
    expect(
      document.querySelectorAll('#stack_percent_column .g2-tooltip-list-item .g2-tooltip-value')[0].innerHTML
    ).toBe('123');
  });
});
