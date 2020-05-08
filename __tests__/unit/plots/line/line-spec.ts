import { Line } from '../../../../src';

const data1 = [
  {
    year: '1991',
    value: 3,
  },
  {
    year: '1992',
    value: 4,
  },
  {
    year: '1993',
    value: 3.5,
  },
  {
    year: '1994',
    value: 5,
  },
  {
    year: '1995',
    value: 4.9,
  },
  {
    year: '1996',
    value: 6,
  },
  {
    year: '1997',
    value: 7,
  },
  {
    year: '1998',
    value: 9,
  },
  {
    year: '1999',
    value: 13,
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

describe('Line plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '400px';
  canvasDiv.style.height = '400px';
  //canvasDiv.style.position = 'absolute';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.style.display = 'block';
  document.body.appendChild(canvasDiv);

  it('初始化及销毁图表', () => {
    const linePlot = new Line(canvasDiv, {
      width: 400,
      height: 400,
      data: data1,
      xField: 'year',
      yField: 'value',
      /*label: {
        visible: true,
        type: 'line',
      },*/
    });
    linePlot.render();
    /* const plot = linePlot.getLayer().plot;
    const positionField = plot.geometries[0].get('position').fields;
    expect(linePlot).toBeInstanceOf(Line);
    expect(positionField[0]).toBe('year');
    expect(positionField[1]).toBe('value');
    linePlot.destroy();
    expect(plot.destroyed).toBe(true);
    expect(canvasDiv.childNodes.length).equal(0);*/
  });

  it.skip('smooth line', () => {
    const linePlot = new Line(canvasDiv, {
      width: 600,
      height: 600,
      data: data1,
      xField: 'year',
      yField: 'value',
      smooth: true,
    });
    const plot = linePlot.getLayer().view;
    const elementShape = plot.config.elements[0].shape.values[0];
    expect(elementShape).toBe('smooth');
    linePlot.destroy();
  });

  it('折线size', () => {
    const linePlot = new Line(canvasDiv, {
      width: 600,
      height: 600,
      data: data1,
      xField: 'year',
      yField: 'value',
      size: 5,
    });
    linePlot.render();
    const plot = linePlot.getLayer().plot;
    const lineSize = plot.geometries[0].get('size').values[0];
    expect(lineSize).toBe(5);
    linePlot.destroy();
  });

  it('折线数据点 line point', () => {
    const linePlot = new Line(canvasDiv, {
      width: 600,
      height: 600,
      data: data1,
      xField: 'year',
      yField: 'value',
      point: {
        visible: true,
        color: 'red',
        size: 5,
        style: {
          fillStyle: 'pink',
          lineWidth: 2,
          strokeStyle: 'black',
        },
      },
    });
    linePlot.render();
    const plot = linePlot.getLayer().plot;
    const elements = plot.geometries;
    expect(elements[1].get('type')).toBe('point');
    expect(elements[1].get('size').values[0]).toBe(5);
    expect(elements[1].get('color').values[0]).toBe('red');
    expect(elements[1].get('style').cfg.fillStyle).toBe('pink');
    expect(elements[1].get('style').cfg.strokeStyle).toBe('black');
    linePlot.destroy();
  });

  it('x 坐标轴', () => {
    const linePlot = new Line(canvasDiv, {
      width: 600,
      height: 600,
      data: data1,
      xField: 'year',
      yField: 'value',
      xAxis: {
        line: {
          visible: true,
          style: { stroke: 'red' },
        },
        tickLine: {
          visible: true,
          style: { stroke: 'red' },
        },
        label: {
          visible: true,
          formatter: () => {
            return 'a';
          },
          style: { fill: 'red' },
        },
      },
    });
    linePlot.render();
    const plot = linePlot.getLayer().plot;
    const axes = plot.getController('axis').getComponents();
    const axis = axes[0].component;
    // formatter
    const labels = axis.get('labelItems');
    expect(labels[0].text).toBe('a');
    // style
    const line = axis.get('line');
    const tickLine = axis.get('tickLine');
    expect(line.stroke).toBe('red');
    expect(tickLine.stroke).toBe('red');
    expect(labels[0].textStyle.fill).toBe('red');
    linePlot.destroy();
  });

  it('y坐标轴', () => {
    const linePlot = new Line(canvasDiv, {
      width: 600,
      height: 600,
      data: data1,
      xField: 'year',
      yField: 'value',
      yAxis: {
        line: {
          visible: true,
          style: { stroke: 'red' },
        },
        tickLine: {
          visible: true,
          style: { stroke: 'red' },
        },
        label: {
          formatter: () => {
            return 'a';
          },
          style: { fill: 'red' },
        },
      },
    });
    linePlot.render();
    const plot = linePlot.getLayer().plot;
    const axes = plot.getController('axis').getComponents();
    const axis = axes[1].component;
    // formatter
    const labels = axis.get('labelItems');
    expect(labels[0].text).toBe('a');
    // style
    const line = axis.get('line');

    const tickLine = axis.get('tickLine');
    expect(line.stroke).toBe('red');
    expect(tickLine.stroke).toBe('red');
    expect(labels[0].textStyle.fill).toBe('red');
    linePlot.destroy();
  });

  it('point label', () => {
    const linePlot = new Line(canvasDiv, {
      width: 600,
      height: 600,
      data: data1,
      xField: 'year',
      yField: 'value',
      label: {
        type: 'point',
        formatter: () => {
          return 'test';
        },
        style: {
          fill: 'red',
        },
      },
    });
    linePlot.render();
    const plot = linePlot.getLayer().plot;
    const labelGroup = plot.get('elements')[0].get('container').get('children')[1].get('children')[0].get('children');
    expect(labelGroup[0].attr('text')).toBe('test');
    expect(labelGroup[0].attr('fill')).toBe('red');
    linePlot.destroy();
  });

  it('padding', () => {
    const linePlot = new Line(canvasDiv, {
      width: 600,
      height: 600,
      title: {
        text: 'title',
      },
      description: {
        text: 'description',
      },
      padding: 'auto',
      data: data1,
      xField: 'year',
      yField: 'value',
    });
    linePlot.render();
    const padding = linePlot.plot.get('padding');
    expect(padding[0] >= 15).toBe(true);
    expect(padding[1] >= 20).toBe(true);
    expect(padding[2] >= 20).toBe(true);
    expect(padding[3] >= 20).toBe(true);
    linePlot.destroy();
  });

  it('title and description', () => {
    const linePlot = new Line(canvasDiv, {
      width: 600,
      height: 600,
      title: {
        text: 'title',
        style: {
          fill: 'red',
        },
      },
      description: {
        text: 'description',
        style: {
          fill: 'red',
        },
      },
      data: data1,
      xField: 'year',
      yField: 'value',
    });
    const plot = linePlot.getLayer().plot;
    const title = plot.title.shape;
    const description = plot.description.shape;
    expect(title.attr('text')).toBe('title');
    expect(title.attr('fill')).toBe('red');
    expect(description.attr('text')).toBe('description');
    expect(description.attr('fill')).toBe('red');
    linePlot.destroy();
  });

  it('多折线', () => {
    const linePlot = new Line(canvasDiv, {
      width: 600,
      height: 600,
      data: data2,
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      point: {
        visible: true,
        color: 'red',
        size: 5,
        style: {
          fillStyle: 'pink',
          lineWidth: 2,
          strokeStyle: 'black',
        },
      },
    });

    linePlot.render();
    const plot = linePlot.getLayer().plot;
    const elements = plot.geometries;
    const shapes = plot.get('elements')[0].get('shapeContainer').get('children');
    expect(shapes.length).toBe(3);
    expect(elements[1].get('type')).toBe('point');
    expect(elements[1].get('size').values[0]).toBe(5);
    expect(elements[1].get('color').values[0]).toBe('red');
    expect(elements[1].get('style').cfg.fillStyle).toBe('pink');
    expect(elements[1].get('style').cfg.strokeStyle).toBe('black');
    linePlot.destroy();
  });

  it('line label', () => {
    const linePlot = new Line(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data: data2,
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      label: {
        type: 'line',
      },
    });
    linePlot.render();
    const plot = linePlot.getLayer().plot;
    const labelGroup = plot.get('elements')[0].get('container').get('children')[1].get('children')[0].get('children');
    const panelGroup = linePlot.plot.get('panelRange');
    expect(labelGroup[0].attr('x') > panelGroup.maxX).toBe(true);
    linePlot.destroy();
  });
});

describe('Line plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  it('line defaultCfg', () => {
    const linePlot = new Line(canvasDiv, {
      width: 600,
      height: 600,
      padding: 'auto',
      data: data2,
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      label: {
        type: 'line',
      },
    });

    linePlot.render();

    const plot = linePlot.getLayer().getPlot();
    const legend = plot.getController('legend').getComponents()[0].component;

    expect(legend.get('position')).toBe('top-left');
    expect(legend.get('wordSpacing')).toBe(8);
    linePlot.destroy();
  });
});
