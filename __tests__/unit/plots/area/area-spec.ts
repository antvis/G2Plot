import { Area, StackedArea } from '../../../../src';

const data = [
  {
    year: '1991',
    value: 31,
  },
  {
    year: '1992',
    value: 41,
  },
  {
    year: '1993',
    value: 35,
  },
  {
    year: '1994',
    value: 55,
  },
  {
    year: '1995',
    value: 49,
  },
  {
    year: '1996',
    value: 15,
  },
  {
    year: '1997',
    value: 17,
  },
  {
    year: '1998',
    value: 29,
  },
  {
    year: '1999',
    value: 33,
  },
];

const data2 = [
  {
    date: '2018/8/1',
    type: 'download',
    value: 4623,
  },
  {
    date: '2018/8/1',
    type: 'register',
    value: 2208,
  },
  {
    date: '2018/8/1',
    type: 'bill',
    value: 182,
  },
  {
    date: '2018/8/2',
    type: 'download',
    value: 6145,
  },
  {
    date: '2018/8/2',
    type: 'register',
    value: 2016,
  },
  {
    date: '2018/8/2',
    type: 'bill',
    value: 257,
  },
  {
    date: '2018/8/3',
    type: 'download',
    value: 508,
  },
  {
    date: '2018/8/3',
    type: 'register',
    value: 2916,
  },
  {
    date: '2018/8/3',
    type: 'bill',
    value: 289,
  },
  {
    date: '2018/8/4',
    type: 'download',
    value: 6268,
  },
  {
    date: '2018/8/4',
    type: 'register',
    value: 4512,
  },
  {
    date: '2018/8/4',
    type: 'bill',
    value: 428,
  },
  {
    date: '2018/8/5',
    type: 'download',
    value: 6411,
  },
  {
    date: '2018/8/5',
    type: 'register',
    value: 8281,
  },
  {
    date: '2018/8/5',
    type: 'bill',
    value: 619,
  },
  {
    date: '2018/8/6',
    type: 'download',
    value: 1890,
  },
  {
    date: '2018/8/6',
    type: 'register',
    value: 2008,
  },
  {
    date: '2018/8/6',
    type: 'bill',
    value: 87,
  },
  {
    date: '2018/8/7',
    type: 'download',
    value: 4251,
  },
  {
    date: '2018/8/7',
    type: 'register',
    value: 1963,
  },
  {
    date: '2018/8/7',
    type: 'bill',
    value: 706,
  },
  {
    date: '2018/8/8',
    type: 'download',
    value: 2978,
  },
  {
    date: '2018/8/8',
    type: 'register',
    value: 2367,
  },
  {
    date: '2018/8/8',
    type: 'bill',
    value: 387,
  },
  {
    date: '2018/8/9',
    type: 'download',
    value: 3880,
  },
  {
    date: '2018/8/9',
    type: 'register',
    value: 2956,
  },
  {
    date: '2018/8/9',
    type: 'bill',
    value: 488,
  },
  {
    date: '2018/8/10',
    type: 'download',
    value: 3606,
  },
  {
    date: '2018/8/10',
    type: 'register',
    value: 678,
  },
  {
    date: '2018/8/10',
    type: 'bill',
    value: 507,
  },
  {
    date: '2018/8/11',
    type: 'download',
    value: 4311,
  },
  {
    date: '2018/8/11',
    type: 'register',
    value: 3188,
  },
  {
    date: '2018/8/11',
    type: 'bill',
    value: 548,
  },
  {
    date: '2018/8/12',
    type: 'download',
    value: 4116,
  },
  {
    date: '2018/8/12',
    type: 'register',
    value: 3491,
  },
  {
    date: '2018/8/12',
    type: 'bill',
    value: 456,
  },
  {
    date: '2018/8/13',
    type: 'download',
    value: 6419,
  },
  {
    date: '2018/8/13',
    type: 'register',
    value: 2852,
  },
  {
    date: '2018/8/13',
    type: 'bill',
    value: 689,
  },
  {
    date: '2018/8/14',
    type: 'download',
    value: 1643,
  },
  {
    date: '2018/8/14',
    type: 'register',
    value: 4788,
  },
  {
    date: '2018/8/14',
    type: 'bill',
    value: 280,
  },
  {
    date: '2018/8/15',
    type: 'download',
    value: 445,
  },
  {
    date: '2018/8/15',
    type: 'register',
    value: 4319,
  },
  {
    date: '2018/8/15',
    type: 'bill',
    value: 176,
  },
];

// TODO: area-spec
describe.skip('Area plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  it('初始化以及销毁', () => {
    const areaPlot = new Area(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
      xAxis: {
        visible: true,
      },
      yAxis: {
        visible: true,
      },
      areaStyle: {
        stroke: 'black',
        lineWidth: 2,
      },
      point: {
        visible: true,
        size: 8,
      },
      line: {
        visible: true,
      },
      label: {
        visible: true,
        type: 'point',
      },
      color: 'green',
      responsive: true,
    });
    areaPlot.render();
    const view = areaPlot.getLayer().view;
    const positionField = view.geometries[0].attributeOption.position.fields;
    const axes = view
      .getController('axis')
      .getComponents()
      .filter((co) => co.type === 'axis');

    expect(areaPlot).toBeInstanceOf(Area);
    expect(positionField[0]).toBe('year');
    expect(positionField[1]).toBe('value');
    expect(axes.length).toBe(2);
    areaPlot.destroy();
    expect(view.destroyed).toBe(true);
  });

  it('area style', () => {
    const areaPlot = new Area(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
      xAxis: {
        visible: true,
      },
      yAxis: {
        visible: true,
      },
      areaStyle: {
        strokeStyle: 'black',
        lineWidth: 2,
      },
      point: {
        visible: true,
        size: 8,
        style: {
          color: 'red',
        },
      },
      line: {
        visible: true,
        style: {
          size: 6,
          color: 'blue',
        },
      },
      label: {
        visible: true,
        type: 'point',
      },
      color: 'green',
      responsive: true,
    });
    areaPlot.render();
    const view = areaPlot.getLayer().view;
    const elements = view.geometries;
    expect(elements[0].type).toBe('area');
    expect(elements[0].styleOption.cfg.strokeStyle).toBe('black');
    areaPlot.destroy();
    expect(view.destroyed).toBe(true);
  });

  it('line shape attr map', () => {
    const areaPlot = new Area(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
      xAxis: {
        visible: true,
      },
      yAxis: {
        visible: true,
      },
      line: {
        visible: true,
        size: 6,
        color: 'pink',
      },
      label: {
        visible: true,
        type: 'point',
      },
      color: 'green',
      responsive: true,
    });
    areaPlot.render();
    const view = areaPlot.getLayer().view;
    const elements = view.geometries;
    expect(elements[1].type).toBe('line');
    expect(elements[1].attributeOption.size.values[0]).toBe(6);
    expect(elements[1].attributeOption.color.values[0]).toBe('pink');
    areaPlot.destroy();
    expect(view.destroyed).toBe(true);
  });

  it('line style obj', () => {
    const areaPlot = new Area(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
      xAxis: {
        visible: true,
      },
      yAxis: {
        visible: true,
      },
      // areaStyle: {
      //   stroke: 'black',
      //   lineWidth: 2
      // },
      // point: {
      //   visible: true,
      //   size: 8,
      //   style: {
      //     color: 'red',
      //   }
      // },
      line: {
        visible: true,
        size: 6,
        style: {
          color: 'blue',
        },
      },
      label: {
        visible: true,
        type: 'point',
      },
      color: 'green',
      responsive: true,
    });
    areaPlot.render();
    const view = areaPlot.getLayer().view;
    const elements = view.geometries;
    expect(elements[1].type).toBe('line');
    expect(elements[1].attributeOption.size.values[0]).toBe(6);
    expect(elements[1].styleOption.cfg.color).toBe('blue');
    areaPlot.destroy();
    expect(view.destroyed).toBe(true);
  });

  // it('line style func', () => {
  //   const areaPlot = new Area(canvasDiv, {
  //     width: 600,
  //     height: 600,
  //     padding: 'auto',
  //     data,
  //     xField: 'year',
  //     yField: 'value',
  //     xAxis: {
  //       visible: true,
  //     },
  //     yAxis: {
  //       visible: true,
  //     },
  //     areaStyle: {
  //       stroke: 'black',
  //       lineWidth: 2
  //     },
  //     point: {
  //       visible: true,
  //       size: 8,
  //       style: {
  //         color: 'red',
  //       }
  //     },
  //     line: {
  //       visible: true,
  //       style: {
  //         size: 6,
  //         color: 'blue'
  //       }
  //     },
  //     label: {
  //       visible: true,
  //       type: 'point'
  //     },
  //     color: 'green',
  //     responsive: true
  //   });
  //   areaPlot.render();
  //   const positionField = areaPlot.plot.geometries[0].attributeOption.position.fields;
  //   const axes = areaPlot.getController('axis').getComponents();

  //   expect(areaPlot). toBeInstanceOf(Area);
  //   expect(positionField[0]).toBe('year');
  //   expect(positionField[1]).toBe('value');
  //   expect(axes.length).toBe(2);
  //   // areaPlot.destroy();
  //   // expect(areaPlot.plot.destroyed).toBe(true);
  // });

  it('point shape attr map', () => {
    const areaPlot = new Area(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
      xAxis: {
        visible: true,
      },
      yAxis: {
        visible: true,
      },
      point: {
        visible: true,
        size: 8,
        color: 'yellow',
      },
      line: {
        visible: true,
        size: 6,
        color: 'pink',
        style: {
          strokeStyle: 'blue',
        },
      },
      label: {
        visible: true,
        type: 'point',
      },
      color: 'green',
      responsive: true,
    });
    areaPlot.render();
    const view = areaPlot.getLayer().view;
    const elements = view.geometries;
    expect(elements[1].type).toBe('line');
    expect(elements[1].attributeOption.size.values[0]).toBe(6);
    expect(elements[1].styleOption.cfg.strokeStyle).toBe('blue');
    expect(elements[2].type).toBe('point');
    expect(elements[2].attributeOption.size.values[0]).toBe(8);
    expect(elements[2].attributeOption.color.values[0]).toBe('yellow');
    areaPlot.destroy();
    expect(view.destroyed).toBe(true);
  });

  it('point style obj', () => {
    const areaPlot = new Area(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
      xAxis: {
        visible: true,
      },
      yAxis: {
        visible: true,
      },
      // areaStyle: {
      //   stroke: 'black',
      //   lineWidth: 2
      // },
      point: {
        visible: true,
        size: 8,
        color: 'yellow',
        style: {
          fillStyle: 'red',
        },
      },
      line: {
        visible: true,
        size: 6,
        color: 'pink',
        style: {
          strokeStyle: 'blue',
        },
      },
      label: {
        visible: true,
        type: 'point',
      },
      color: 'green',
      responsive: true,
    });
    areaPlot.render();
    const view = areaPlot.getLayer().view;
    const elements = view.geometries;
    expect(elements[1].type).toBe('line');
    expect(elements[1].attributeOption.size.values[0]).toBe(6);
    expect(elements[1].styleOption.cfg.strokeStyle).toBe('blue');
    expect(elements[2].type).toBe('point');
    expect(elements[2].attributeOption.size.values[0]).toBe(8);
    expect(elements[2].styleOption.cfg.fillStyle).toBe('red');
    areaPlot.destroy();
    expect(view.destroyed).toBe(true);
  });

  it('area seriesField', () => {
    const areaPlot = new Area(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data: data2,
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      xAxis: {
        visible: true,
      },
      yAxis: {
        visible: true,
      },
      areaStyle: {
        stroke: 'black',
        lineWidth: 2,
      },
      point: {
        visible: true,
        size: 8,
        color: 'yellow',
        style: {
          fillStyle: 'red',
        },
      },
      line: {
        visible: true,
        size: 6,
        color: 'pink',
        style: {
          strokeStyle: 'blue',
        },
      },
      label: {
        visible: true,
        type: 'point',
      },
      color: ['green', 'pink', 'yellow'],
      responsive: true,
    });
    areaPlot.render();
    const view = areaPlot.getLayer().view;
    const elements = view.geometries;
    expect(elements[0].type).toBe('area');
    expect(elements[0].attributeOption.color.values[0]).toBe('green');
    expect(elements[0].attributeOption.color.fields[0]).toBe('type');
    areaPlot.destroy();
    expect(view.destroyed).toBe(true);
  });
});

describe('Area plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  it('area defaultCfg', () => {
    const areaPlot = new StackedArea(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data: data2,
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
    });

    areaPlot.render();

    const plot = areaPlot.getLayer().getPlot();
    const legend = plot.getController('legend').getComponents()[0].component;
    const area = plot.geometries[0];

    expect(legend.get('position')).toBe('top-left');
    // expect(legend.get('wordSpacing')).toBe(8);
    expect(area.styleOption.cfg.opacity).toBe(0.25);
    areaPlot.destroy();
  });
});
