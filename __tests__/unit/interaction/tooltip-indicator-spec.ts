import { Canvas } from '@antv/g-canvas';
import { StackedColumn } from '../../../src';
import { createDiv } from '../../utils/dom';
import subsales from '../../data/subsales.json';

const drawGrid = (canvas: Canvas) => {
  const tick = 100;
  for (let val = 0; val <= 500; val += tick) {
    canvas.addShape({
      type: 'line',
      attrs: {
        x1: val,
        y1: 0,
        x2: val,
        y2: 500,
        stroke: '#ccc',
        strokeOpacity: 0.5,
      },
    });
    canvas.addShape({
      type: 'line',
      attrs: {
        x1: 0,
        y1: val,
        x2: 500,
        y2: val,
        stroke: '#ccc',
        strokeOpacity: 0.5,
      },
    });
  }
};

describe('Tooltip Indicator', () => {
  const plot = new StackedColumn(createDiv(), {
    data: subsales,
    width: 500,
    height: 400,
    xField: 'area',
    yField: 'sales',
    seriesField: 'series',
    stackField: 'series',
    // title: {
    //   visible: true,
    //   text: '图表标题',
    // },
    yAxis: {
      nice: true,
    },
    meta: {
      sales: {
        formatter: (v) => Number(v / 10000).toFixed(2) + '万',
      },
    },
    interactions: [
      {
        // @ts-ignore
        type: 'tooltip-indicator',
      },
    ],
  });

  plot.render();
  drawGrid(plot.canvas);
  // @ts-ignore
  window.__plot__ = plot;

  it('render', () => {
    expect(plot).toBeDefined();
  });
});
