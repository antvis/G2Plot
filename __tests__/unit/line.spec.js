import { Line } from '../../src';
import { expect } from 'chai';

describe('Line plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  const data1 = [ {
    year: '1991',
    value: 3
  }, {
    year: '1992',
    value: 4
  }, {
    year: '1993',
    value: 3.5
  }, {
    year: '1994',
    value: 5
  }, {
    year: '1995',
    value: 4.9
  }, {
    year: '1996',
    value: 6
  }, {
    year: '1997',
    value: 7
  }, {
    year: '1998',
    value: 9
  }, {
    year: '1999',
    value: 13
  } ];

  const data2 = [ {
    date: '2018/8/1',
    type: 'download',
    value: 4623
  }, {
    date: '2018/8/1',
    type: 'register',
    value: 2208
  }, {
    date: '2018/8/1',
    type: 'bill',
    value: 182
  }, {
    date: '2018/8/2',
    type: 'download',
    value: 6145
  }, {
    date: '2018/8/2',
    type: 'register',
    value: 2016
  }, {
    date: '2018/8/2',
    type: 'bill',
    value: 257
  }, {
    date: '2018/8/3',
    type: 'download',
    value: 508
  }, {
    date: '2018/8/3',
    type: 'register',
    value: 2916
  }, {
    date: '2018/8/3',
    type: 'bill',
    value: 289
  }, {
    date: '2018/8/4',
    type: 'download',
    value: 6268
  }, {
    date: '2018/8/4',
    type: 'register',
    value: 4512
  }, {
    date: '2018/8/4',
    type: 'bill',
    value: 428
  }, {
    date: '2018/8/5',
    type: 'download',
    value: 6411
  }, {
    date: '2018/8/5',
    type: 'register',
    value: 8281
  }, {
    date: '2018/8/5',
    type: 'bill',
    value: 619
  }, {
    date: '2018/8/6',
    type: 'download',
    value: 1890
  }, {
    date: '2018/8/6',
    type: 'register',
    value: 2008
  }, {
    date: '2018/8/6',
    type: 'bill',
    value: 87
  }, {
    date: '2018/8/7',
    type: 'download',
    value: 4251
  }, {
    date: '2018/8/7',
    type: 'register',
    value: 1963
  }, {
    date: '2018/8/7',
    type: 'bill',
    value: 706
  }, {
    date: '2018/8/8',
    type: 'download',
    value: 2978
  }, {
    date: '2018/8/8',
    type: 'register',
    value: 2367
  }, {
    date: '2018/8/8',
    type: 'bill',
    value: 387
  }, {
    date: '2018/8/9',
    type: 'download',
    value: 3880
  }, {
    date: '2018/8/9',
    type: 'register',
    value: 2956
  }, {
    date: '2018/8/9',
    type: 'bill',
    value: 488
  }, {
    date: '2018/8/10',
    type: 'download',
    value: 3606
  }, {
    date: '2018/8/10',
    type: 'register',
    value: 678
  }, {
    date: '2018/8/10',
    type: 'bill',
    value: 507
  }, {
    date: '2018/8/11',
    type: 'download',
    value: 4311
  }, {
    date: '2018/8/11',
    type: 'register',
    value: 3188
  }, {
    date: '2018/8/11',
    type: 'bill',
    value: 548
  }, {
    date: '2018/8/12',
    type: 'download',
    value: 4116
  }, {
    date: '2018/8/12',
    type: 'register',
    value: 3491
  }, {
    date: '2018/8/12',
    type: 'bill',
    value: 456
  }, {
    date: '2018/8/13',
    type: 'download',
    value: 6419
  }, {
    date: '2018/8/13',
    type: 'register',
    value: 2852
  }, {
    date: '2018/8/13',
    type: 'bill',
    value: 689
  }, {
    date: '2018/8/14',
    type: 'download',
    value: 1643
  }, {
    date: '2018/8/14',
    type: 'register',
    value: 4788
  }, {
    date: '2018/8/14',
    type: 'bill',
    value: 280
  }, {
    date: '2018/8/15',
    type: 'download',
    value: 445
  }, {
    date: '2018/8/15',
    type: 'register',
    value: 4319
  }, {
    date: '2018/8/15',
    type: 'bill',
    value: 176
  } ];


  it('初始化及销毁图表', () => {
    const linePlot = new Line(canvasDiv, {
      data: data1,
      xField: 'year',
      yField: 'value',
    });
    linePlot.render();
    const positionField = linePlot.plot.get('elements')[0].get('position').fields;
    expect(linePlot).to.be.instanceOf(Line);
    expect(positionField[0]).to.be.equal('year');
    expect(positionField[1]).to.be.equal('value');
    linePlot.destroy();
    expect(linePlot.plot.destroyed).to.be.true;
    // expect(canvasDiv.childNodes.length).equal(0);
  });

  it('smooth line', () => {
    const linePlot = new Line(canvasDiv, {
      data: data1,
      xField: 'year',
      yField: 'value',
      smooth: true
    });
    const elementShape = linePlot._config.elements[0].shape.values[0];
    expect(elementShape).to.be.equal('smooth');
    linePlot.destroy();
  });

  it('折线size', () => {
    const linePlot = new Line(canvasDiv, {
      data: data1,
      xField: 'year',
      yField: 'value',
      size: 5
    });
    linePlot.render();
    const lineSize = linePlot.plot.get('elements')[0].get('size').values[0];
    expect(lineSize).to.be.equal(5);
    linePlot.destroy();
  });

  it('折线数据点', () => {
    const linePlot = new Line(canvasDiv, {
      data: data1,
      xField: 'year',
      yField: 'value',
      point: {
        visible: true,
        style: {
          size: 5,
          color: 'red'
        }
      }
    });
    linePlot.render();
    const elements = linePlot.plot.get('elements');
    expect(elements[1].get('type')).to.be.equal('point');
    expect(elements[1].get('size').values[0]).to.be.equal(5);
    expect(elements[1].get('color').values[0]).to.be.equal('red');
    linePlot.destroy();
  });

  it('x 坐标轴', () => {
    const linePlot = new Line(canvasDiv, {
      data: data1,
      xField: 'year',
      yField: 'value',
      xAxis: {
        tickCount: 5,
        line: {
          style: { stroke: 'red' },
        },
        tickLine: {
          style: { stroke: 'red' },
        },
        label: {
          text: () => {
            return 'a';
          },
          style: { fill: 'red' }
        }
      }
    });
    linePlot.render();
    const axis = linePlot.plot.get('axisController').axes[0];
    // tickCount
    const ticks = axis.get('ticks');
    expect(ticks.length).to.be.equal(5);
    // formatter
    const labels = axis.get('labelItems');
    expect(labels[0].text).to.be.equal('a');
    // style
    const line = axis.get('line');
    const tickLine = axis.get('tickLine');
    expect(line.stroke).to.be.equal('red');
    expect(tickLine.stroke).to.be.equal('red');
    expect(labels[0].textStyle.fill).to.be.equal('red');
    linePlot.destroy();
  });

  it('y坐标轴', () => {
    const linePlot = new Line(canvasDiv, {
      data: data1,
      xField: 'year',
      yField: 'value',
      yAxis: {
        line: {
          style: { stroke: 'red' },
        },
        tickLine: {
          style: { stroke: 'red' },
        },
        label: {
          text: () => {
            return 'a';
          },
          style: { fill: 'red' }
        }
      }
    });
    linePlot.render();
    const axis = linePlot.plot.get('axisController').axes[1];
    // formatter
    const labels = axis.get('labelItems');
    expect(labels[0].text).to.be.equal('a');
    // style
    const line = axis.get('line');
    const tickLine = axis.get('tickLine');
    expect(line.stroke).to.be.equal('red');
    expect(tickLine.stroke).to.be.equal('red');
    expect(labels[0].textStyle.fill).to.be.equal('red');
    linePlot.destroy();
  });

  it('point label', () => {
    const linePlot = new Line(canvasDiv, {
      data: data1,
      xField: 'year',
      yField: 'value',
      label: {
        type: 'point',
        formatter: () => {
          return 'test';
        },
        style: {
          fill: 'red'
        }
      }
    });
    linePlot.render();
    const labelGroup = linePlot.plot.get('elements')[0].get('container').get('children')[1].get('children')[0].get('children');
    expect(labelGroup[0].attr('text')).to.be.equal('test');
    expect(labelGroup[0].attr('fill')).to.be.equal('red');
    linePlot.destroy();
  });

  it('padding', () => {
    const linePlot = new Line(canvasDiv, {
      title: {
        text: 'title'
      },
      description: {
        text: 'description'
      },
      padding: 'auto',
      data: data1,
      xField: 'year',
      yField: 'value',
    });
    linePlot.render();
    const padding = linePlot.plot.get('padding');
    expect(padding[0] >= 20).to.be.true;
    expect(padding[1] >= 20).to.be.true;
    expect(padding[2] >= 40).to.be.true;
    expect(padding[3] >= 20).to.be.true;
    linePlot.destroy();
  });

  it('title and description', () => {
    const linePlot = new Line(canvasDiv, {
      title: {
        text: 'title',
        style: {
          fill: 'red'
        }
      },
      description: {
        text: 'description',
        style: {
          fill: 'red'
        }
      },
      data: data1,
      xField: 'year',
      yField: 'value',
    });
    const title = linePlot.title;
    const description = linePlot.description;
    expect(title.attr('text')).to.be.equal('title');
    expect(title.attr('fill')).to.be.equal('red');
    expect(description.attr('text')).to.be.equal('description');
    expect(description.attr('fill')).to.be.equal('red');
    linePlot.destroy();
  });

  it('多折线', () => {
    const linePlot = new Line(canvasDiv, {
      data: data2,
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
    });
    linePlot.render();
    const shapes = linePlot.plot.get('elements')[0].get('shapeContainer').get('children');
    expect(shapes.length).to.be.equal(3);
    linePlot.destroy();
  });

  it('line label', () => {
    const linePlot = new Line(canvasDiv, {
      padding: 'auto',
      data: data2,
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      label: {
        type: 'line'
      }
    });
    linePlot.render();
    const labelGroup = linePlot.plot.get('elements')[0].get('container').get('children')[1].get('children')[0].get('children');
    const panelGroup = linePlot.plot.get('panelRange');
    expect(labelGroup[0].attr('x') > panelGroup.maxX).to.be.true;
    // linePlot.destroy();
  });


});
