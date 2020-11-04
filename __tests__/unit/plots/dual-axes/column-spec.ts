import { DualAxes } from '../../../../src';
import { PV_DATA, UV_DATA } from '../../../data/pv-uv';
import { createDiv } from '../../../utils/dom';
import { LEFT_AXES_VIEW, RIGHT_AXES_VIEW } from '../../../../src/plots/dual-axes/constant';
import { findViewById } from '../../../../src/utils/view';

const RANGE_DATA = [
  { time: '2019-03', value: [200, 350], count: 800 },
  { time: '2019-04', value: [400, 650], count: 600 },
  { time: '2019-05', value: [150, 350], count: 400 },
  { time: '2019-06', value: [100, 450], count: 380 },
  { time: '2019-07', value: [500, 550], count: 220 },
];

describe('Line-Column', () => {
  it('Line-Colomn', () => {
    const dualAxes = new DualAxes(createDiv(), {
      height: 500,
      data: [PV_DATA, UV_DATA],
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
  it('Colomn-Line', () => {
    const dualAxes = new DualAxes(createDiv(), {
      height: 500,
      data: [PV_DATA, UV_DATA],
      xField: 'date',
      yField: ['pv', 'uv'],
      geometryOptions: [
        {
          geometry: 'column',
        },
        {
          geometry: 'line',
        },
      ],
    });

    dualAxes.render();
    // 先柱后线
    expect(dualAxes.chart.views[0].id).toBe(LEFT_AXES_VIEW);
    expect(dualAxes.chart.views[1].id).toBe(RIGHT_AXES_VIEW);

    const leftView = findViewById(dualAxes.chart, LEFT_AXES_VIEW);
    const rightView = findViewById(dualAxes.chart, RIGHT_AXES_VIEW);

    // line
    const leftGeometry = leftView.geometries.find((g) => g.type === 'interval');
    const rightGeometry = rightView.geometries.find((g) => g.type === 'line');

    // @ts-ignore
    expect(leftGeometry.shapeType).toBe('interval');
    expect(rightGeometry.shapeType).toBe('line');
    dualAxes.destroy();
  });
  it('Colomn-Style', () => {
    const dualAxes = new DualAxes(createDiv(), {
      height: 500,
      data: [PV_DATA, UV_DATA],
      xField: 'date',
      yField: ['pv', 'uv'],
      geometryOptions: [
        {
          geometry: 'column',
          columnWidthRatio: 0.5,
          color: '#f00',
        },
        {
          geometry: 'line',
        },
      ],
    });

    dualAxes.render();
    // 先柱后线
    expect(dualAxes.chart.views[0].id).toBe(LEFT_AXES_VIEW);
    expect(dualAxes.chart.views[1].id).toBe(RIGHT_AXES_VIEW);

    const leftView = findViewById(dualAxes.chart, LEFT_AXES_VIEW);
    const rightView = findViewById(dualAxes.chart, RIGHT_AXES_VIEW);
    const leftGeometry = leftView.geometries.find((g) => g.type === 'interval');
    const rightGeometry = rightView.geometries.find((g) => g.type === 'line');

    expect(leftGeometry.shapeType).toBe('interval');
    expect(leftGeometry.attributes.color.values[0]).toBe('#f00');
    expect(leftGeometry.theme.columnWidthRatio).toBe(0.5);
    expect(rightGeometry.shapeType).toBe('line');
    dualAxes.destroy();
  });

  it('Range-Colomn', () => {
    const dualAxes = new DualAxes(createDiv(), {
      height: 500,
      data: [RANGE_DATA, RANGE_DATA],
      xField: 'time',
      yField: ['value', 'count'],
      geometryOptions: [
        {
          geometry: 'column',
          isRange: true,
          label: {
            position: 'top',
          },
        },
        {
          geometry: 'line',
        },
      ],
    });
    dualAxes.render();
    // 依赖于 geometry，测试label 即可
    const leftView = findViewById(dualAxes.chart, LEFT_AXES_VIEW);
    const leftGeometry = leftView.geometries.find((g) => g.type === 'interval');
    // @ts-ignore
    const cfg = leftGeometry.labelOption.cfg;
    expect(cfg.content(RANGE_DATA[0])).toBe('200-350');
    expect(cfg.position).toBe('top');
    dualAxes.destroy();
  });
});
