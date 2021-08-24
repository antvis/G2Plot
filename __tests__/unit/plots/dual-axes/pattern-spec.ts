import { DualAxes } from '../../../../src';
import { PV_DATA, UV_DATA } from '../../../data/pv-uv';
import { createDiv } from '../../../utils/dom';
import { MultipleData } from '../../../data/common';

describe('dual-axes: pattern', () => {
  it('column pattern: obj', () => {
    const dualAxes = new DualAxes(createDiv(), {
      width: 400,
      height: 500,
      data: [PV_DATA, UV_DATA],
      xField: 'date',
      yField: ['pv', 'uv'],
      geometryOptions: [
        {
          geometry: 'column',
          pattern: {
            type: 'dot',
          },
        },
        {
          geometry: 'line',
        },
      ],
    });

    dualAxes.render();

    const [leftView] = dualAxes.chart.views;
    expect(leftView.geometries[0].elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(leftView.geometries[0].elements[1].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(leftView.geometries[0].elements[2].shape.attr('fill') instanceof CanvasPattern).toEqual(true);

    dualAxes.destroy();
  });

  it('column pattern: callback', () => {
    const dualAxes = new DualAxes(createDiv(), {
      width: 400,
      height: 500,
      data: [PV_DATA, UV_DATA],
      xField: 'date',
      yField: ['pv', 'uv'],
      geometryOptions: [
        {
          geometry: 'column',
          pattern: ({ pv }) => {
            if (pv > 630000) {
              return { type: 'line' };
            }
          },
        },
        {
          geometry: 'line',
        },
      ],
    });

    dualAxes.render();

    const [leftView] = dualAxes.chart.views;
    expect(leftView.geometries[0].elements[3].shape.attr('fill') instanceof CanvasPattern).toEqual(false);
    expect(leftView.geometries[0].elements[4].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(leftView.geometries[0].elements[5].shape.attr('fill') instanceof CanvasPattern).toEqual(false);

    dualAxes.destroy();
  });

  it('stack column pattern: obj', () => {
    const dualAxes = new DualAxes(createDiv('stack column and stack line'), {
      height: 500,
      data: [MultipleData, MultipleData],
      xField: 'month',
      yField: ['value', 'value'],
      geometryOptions: [
        {
          geometry: 'column',
          isGroup: true,
          isStack: true,
          seriesField: 'type',
          groupField: 'name',
          pattern: {
            type: 'line',
          },
        },
        {
          geometry: 'line',
          seriesField: 'type',
          smooth: true,
          isGroup: true,
          isStack: true,
          groupField: 'name',
        },
      ],
      tooltip: false,
    });

    dualAxes.render();

    const [leftView] = dualAxes.chart.views;
    expect(leftView.geometries[0].elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(leftView.geometries[0].elements[1].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(leftView.geometries[0].elements[2].shape.attr('fill') instanceof CanvasPattern).toEqual(true);

    dualAxes.destroy();
  });

  it('stack column pattern: callback', () => {
    const dualAxes = new DualAxes(createDiv('stack column and stack line'), {
      height: 500,
      data: [MultipleData, MultipleData],
      xField: 'month',
      yField: ['value', 'value'],
      geometryOptions: [
        {
          geometry: 'column',
          isGroup: true,
          isStack: true,
          seriesField: 'type',
          groupField: 'name',
          pattern: ({ type }) => {
            if (type === '语文') {
              return {
                type: 'line',
              };
            }
          },
        },
        {
          geometry: 'line',
          seriesField: 'type',
          smooth: true,
          isGroup: true,
          isStack: true,
          groupField: 'name',
        },
      ],
      tooltip: false,
    });

    dualAxes.render();

    const [leftView] = dualAxes.chart.views;
    expect(leftView.geometries[0].elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(leftView.geometries[0].elements[1].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(leftView.geometries[0].elements[2].shape.attr('fill') instanceof CanvasPattern).toEqual(true);
    expect(leftView.geometries[0].elements[3].shape.attr('fill') instanceof CanvasPattern).toEqual(false);
    expect(leftView.geometries[0].elements[4].shape.attr('fill') instanceof CanvasPattern).toEqual(false);

    dualAxes.destroy();
  });
});
