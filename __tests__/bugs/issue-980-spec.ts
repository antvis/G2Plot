import { Funnel, GroupedBar } from '../../src';
import { getLegendComponents } from '../../src/util/common';
import { createDiv } from '../utils/dom';

describe('#980', () => {
  const data = [
    {
      text: '复杂应用总数',
      value: 132,
    },
    {
      text: '30 日活跃',
      value: 59,
    },
    {
      text: '7 日活跃',
      value: 50,
    },
  ];
  it('funnel padding with legend hidden', () => {
    const funnelPlot = new Funnel(createDiv(), {
      data,
      xField: 'text',
      yField: 'value',
      legend: {
        visible: false,
      },
      label: {
        visible: true,
      },
    });
    funnelPlot.render();
    const { options } = funnelPlot.getLayers()[0];
    expect(options.padding[2]).toBeGreaterThan(20);
  });
  it('funnel padding', () => {
    const funnelPlot = new Funnel(createDiv(), {
      data,
      xField: 'text',
      yField: 'value',
      legend: {
        visible: true,
      },
      label: {
        visible: true,
      },
    });
    funnelPlot.render();
    const { view, options } = funnelPlot.getLayers()[0];
    const legend = getLegendComponents(view)[0];
    const { height } = legend.getLayoutBBox();
    expect(options.padding[2]).toBeGreaterThan(height);
  });

  it('funnel padding with title', () => {
    const funnelPlot = new Funnel(createDiv(), {
      data,
      xField: 'text',
      yField: 'value',
      legend: {
        visible: true,
      },
      label: {
        visible: true,
      },
      title: {
        visible: true,
        text: 'aaa',
      },
      description: {
        visible: true,
        text: 'bbb',
      },
    });
    funnelPlot.render();
    const { view, options } = funnelPlot.getLayers()[0];
    const legend = getLegendComponents(view)[0];
    const { height } = legend.getLayoutBBox();
    expect(options.padding[2]).toBeGreaterThan(height);
  });
  it('bar xAxis hide title', () => {
    const data = [
      {
        year: '1991',
        value: 3,
        type: 'Lon',
      },
      {
        year: '1992',
        value: 4,
        type: 'Lon',
      },
      {
        year: '1993',
        value: 3.5,
        type: 'Lon',
      },
      {
        year: '1994',
        value: 5,
        type: 'Lon',
      },
      {
        year: '1995',
        value: 4.9,
        type: 'Lon',
      },
      {
        year: '1996',
        value: 6,
        type: 'Lon',
      },
      {
        year: '1997',
        value: 7,
        type: 'Lon',
      },
      {
        year: '1998',
        value: 9,
        type: 'Lon',
      },
      {
        year: '1999',
        value: 13,
        type: 'Lon',
      },
      {
        year: '1991',
        value: 3,
        type: 'Bor',
      },
      {
        year: '1992',
        value: 4,
        type: 'Bor',
      },
      {
        year: '1993',
        value: 3.5,
        type: 'Bor',
      },
      {
        year: '1994',
        value: 5,
        type: 'Bor',
      },
      {
        year: '1995',
        value: 4.9,
        type: 'Bor',
      },
      {
        year: '1996',
        value: 6,
        type: 'Bor',
      },
      {
        year: '1997',
        value: 7,
        type: 'Bor',
      },
      {
        year: '1998',
        value: 9,
        type: 'Bor',
      },
      {
        year: '1999',
        value: 13,
        type: 'Bor',
      },
    ];

    const barPlot = new GroupedBar(createDiv(), {
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'value',
      yField: 'year',
      xAxis: {
        title: {
          visible: false,
        },
      },
      groupField: 'type',
    });
    barPlot.render();
    const { options } = barPlot.getLayers()[0];
    expect(options.padding[2]).toBeGreaterThan(20);
  });
});
