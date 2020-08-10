import { ColumnLine } from '../../src';
import { createDiv } from '../utils/dom';

describe('#1005', () => {
  const uvData = [
    { time: '2019-03', value: 350 },
    { time: '2019-04', value: 900 },
    { time: '2019-05', value: 300 },
    { time: '2019-06', value: 450 },
    { time: '2019-07', value: 470 },
  ];

  const transformData = [
    { time: '2019-03', count: 800 },
    { time: '2019-04', count: 600 },
    { time: '2019-05', count: 400 },
    { time: '2019-06', count: 380 },
    { time: '2019-07', count: 220 },
  ];
  const plot = new ColumnLine(createDiv(), {
    title: {
      visible: true,
      text: '柱线混合图1',
      alignTo: 'left',
    },
    description: {
      visible: true,
      text: '柱线混合图表',
      alignTo: 'left',
    },
    data: [uvData, transformData],
    xField: 'time',
    yField: ['value', 'count'],
    tooltip: {
      visible: true,
    },
    legend: {
      visible: true,
    },
    yAxis: {
      leftConfig: {
        visible: true,
      },
      rightConfig: {
        visible: false,
      },
    },
    lineConfig: {},
  });
  plot.render();

  it('render', () => {
    // @ts-ignore
    const view = plot.getLayer().geomLayers[0].view;
    const element = view.geometries[0].elements[0];
    const bbox = element.getBBox();
    view.showTooltip({ x: bbox.minX, y: bbox.minY });
    expect(document.getElementsByClassName('g2-tooltip-list-item').length).toBe(2);
  });
});
