import { DualAxes } from '../../../../src';
import { LEFT_AXES_VIEW, RIGHT_AXES_VIEW } from '../../../../src/plots/dual-axes/constant';
import { findViewById } from '../../../../src/utils/view';
import { createDiv } from '../../../utils/dom';

export const UV_DATA = [
  { date: '0601', uv: -1000 },
  { date: '0602', uv: -4000 },
  { date: '0603', uv: 5000 },
  { date: '0604', uv: 5500 },
  { date: '0605', uv: 7000 },
  { date: '0606', uv: 4000 },
  { date: '0607', uv: 6400 },
  { date: '0608', uv: 1500 },
  { date: '0609', uv: 2000 },
];

export const PV_DATA = [
  { date: '0601', pv: -1000 },
  { date: '0602', pv: -4000 },
  { date: '0603', pv: 5000 },
  { date: '0604', pv: 5500 },
  { date: '0605', pv: 7000 },
  { date: '0606', pv: 4000 },
  { date: '0607', pv: 6400 },
  { date: '0608', pv: 1500 },
  { date: '0609', pv: 2000 },
];

let dualAxes;

describe('dual-axes: limitInPlot', () => {
  beforeAll(() => {
    dualAxes = new DualAxes(createDiv(), {
      height: 300,
      data: [UV_DATA, PV_DATA],
      xField: 'date',
      yField: ['uv', 'pv'],
      geometryOptions: [
        {
          geometry: 'line',
        },
        {
          geometry: 'column',
        },
      ],
    });

    dualAxes.render();
  });

  it('default', () => {
    expect(findViewById(dualAxes.chart, LEFT_AXES_VIEW).limitInPlot).toBeFalsy();
    expect(findViewById(dualAxes.chart, RIGHT_AXES_VIEW).limitInPlot).toBeFalsy();
  });

  it('default: yaxis min', () => {
    dualAxes.update({
      yAxis: {
        uv: {},
        pv: {
          max: 4000,
          min: -2000,
        },
      },
    });
    expect(findViewById(dualAxes.chart, LEFT_AXES_VIEW).limitInPlot).toBeFalsy();
    expect(findViewById(dualAxes.chart, RIGHT_AXES_VIEW).limitInPlot).toBeTruthy();
  });

  it('limitinplot: config false', () => {
    dualAxes.update({
      limitInPlot: false,
      yAxis: {
        uv: {},
        pv: {
          max: 4000,
          min: -2000,
        },
      },
    });
    expect(findViewById(dualAxes.chart, LEFT_AXES_VIEW).limitInPlot).toBeFalsy();
    expect(findViewById(dualAxes.chart, RIGHT_AXES_VIEW).limitInPlot).toBeFalsy();
  });

  it('limitinplot: config true', () => {
    dualAxes.update({
      limitInPlot: true,
      yAxis: {},
    });
    expect(findViewById(dualAxes.chart, LEFT_AXES_VIEW).limitInPlot).toBeTruthy();
    expect(findViewById(dualAxes.chart, RIGHT_AXES_VIEW).limitInPlot).toBeTruthy();
  });

  afterAll(() => {
    dualAxes.destroy();
  });
});
