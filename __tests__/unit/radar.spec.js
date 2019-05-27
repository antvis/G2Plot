import { Radar } from '../../src';
import { expect } from 'chai';

describe('Radar plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);
  const data = [
    {
      item: 'Design',
      user: 'a',
      score: 70,
    },
    {
      item: 'Design',
      user: 'b',
      score: 30
    },
    {
      item: 'Development',
      user: 'a',
      score: 60,
    },
    {
      item: 'Development',
      user: 'b',
      score: 70
    },
    {
      item: 'Marketing',
      user: 'a',
      score: 60
    },
    {
      item: 'Marketing',
      user: 'b',
      score: 50,
    },
    {
      item: 'Users',
      user: 'a',
      score: 40,
    },
    {
      item: 'Users',
      user: 'b',
      score: 50
    },
    {
      item: 'Test',
      user: 'a',
      score: 60,
    },
    {
      item: 'Test',
      user: 'b',
      score: 70
    },
    {
      item: 'Language',
      user: 'a',
      score: 70,
    },
    {
      item: 'Language',
      user: 'b',
      score: 50
    },
    {
      item: 'Technology',
      user: 'a',
      score: 50,
    },
    {
      item: 'Technology',
      user: 'b',
      score: 40
    },
    {
      item: 'Support',
      user: 'a',
      score: 30,
    },
    {
      item: 'Support',
      user: 'b',
      score: 40
    },
    {
      item: 'Sales',
      user: 'a',
      score: 60,
    },
    {
      item: 'Sales',
      user: 'b',
      score: 40
    },
    {
      item: 'UX',
      user: 'a',
      score: 50
    },
    {
      item: 'UX',
      user: 'b',
      score: 60
    } ];

  it('创建 & 销毁图表', () => {
    const radarPlot = new Radar(canvasDiv, {
      data,
      xField: 'item',
      yField: 'score',
      seriesField: 'user',
    });
    radarPlot.render();
    const positionField = radarPlot.plot.get('elements')[0].get('position').fields;
    const colorField = radarPlot.plot.get('elements')[0].get('color').fields;
    expect(radarPlot).to.be.instanceOf(Radar);
    expect(positionField[0]).to.be.equal('item');
    expect(positionField[1]).to.be.equal('score');
    expect(colorField[0]).to.be.equal('user');
    radarPlot.destroy();
  });

  it('x 坐标轴', () => {
    const radarPlot = new Radar(canvasDiv, {
      data,
      xField: 'item',
      yField: 'score',
      seriesField: 'user',
      xAxis: {
        formatter: () => {
          return 'a';
        },
        style: {
          line: { stroke: 'red' },
          tickLine: { stroke: 'red', length: 5, lineWidth: 1 },
          label: { fill: 'red', }
        }
      }
    });
    radarPlot.render();
    const axis = radarPlot.plot.get('axisController').axes[0];
    // formatter
    const labels = axis.get('labelItems');
    expect(labels[0].text).to.be.equal('a');
    // style
    const line = axis.get('line');
    const tickLine = axis.get('tickLine');
    expect(line.stroke).to.be.equal('red');
    expect(tickLine.stroke).to.be.equal('red');
    expect(labels[0].textStyle.fill).to.be.equal('red');
    radarPlot.destroy();
  });

  it('y 坐标轴', () => {
    const radarPlot = new Radar(canvasDiv, {
      data,
      xField: 'item',
      yField: 'score',
      seriesField: 'user',
      yAxis: {
        formatter: () => {
          return 'a';
        },
        style: {
          line: { stroke: 'red' },
          tickLine: { stroke: 'red', length: 5, lineWidth: 1 },
          label: { fill: 'red', }
        }
      }
    });
    radarPlot.render();
    const axis = radarPlot.plot.get('axisController').axes[1];
    // formatter
    const labels = axis.get('labelItems');
    expect(labels[0].text).to.be.equal('a');
    // style
    const line = axis.get('line');
    const tickLine = axis.get('tickLine');
    expect(line.stroke).to.be.equal('red');
    expect(tickLine.stroke).to.be.equal('red');
    expect(labels[0].textStyle.fill).to.be.equal('red');
    radarPlot.destroy();
  });

  it('label', () => {
  });

  it('ploygon 显示及样式', () => {
    /** polygon不显示 */
    let radarPlot = new Radar(canvasDiv, {
      data,
      xField: 'item',
      yField: 'score',
      seriesField: 'user',
      polygon: {
        visible: false
      }
    });
    radarPlot.render();
    const elements = radarPlot.plot.get('elements');
    expect(elements.length).to.be.equal(1);
    expect(elements[0].get('type')).to.be.equal('line');
    radarPlot.destroy();
    /** polygon样式 */
    radarPlot = new Radar(canvasDiv, {
      data,
      xField: 'item',
      yField: 'score',
      seriesField: 'user',
      polygon: {
        style: {
          stroke: 'red',
          lineWidth: 2
        }
      },
      line: {
        visible: false
      }
    });
    radarPlot.render();
    const shapes = radarPlot.plot.get('elements')[0].getShapes();
    expect(shapes[0].attr('stroke')).to.be.equal('red');
    expect(shapes[0].attr('lineWidth')).to.be.equal(2);
    radarPlot.destroy();
  });

  it('line 显示及样式', () => {
    /** line不显示 */
    let radarPlot = new Radar(canvasDiv, {
      data,
      xField: 'item',
      yField: 'score',
      seriesField: 'user',
      line: {
        visible: false
      }
    });
    radarPlot.render();
    const elements = radarPlot.plot.get('elements');
    expect(elements.length).to.be.equal(1);
    expect(elements[0].get('type')).to.be.equal('area');
    radarPlot.destroy();
    /** line样式 */
    radarPlot = new Radar(canvasDiv, {
      data,
      xField: 'item',
      yField: 'score',
      seriesField: 'user',
      polygon: {
        visible: false
      },
      line: {
        style: {
          lineDash: [ 2, 2 ]
        }
      }
    });
    radarPlot.render();
    const shapes = radarPlot.plot.get('elements')[0].getShapes();
    expect(shapes[0].attr('lineDash')[0]).to.be.equal(2);
    radarPlot.destroy();
  });

  it('point 显示及样式', () => {
    /** 显示point */
    const radarPlot = new Radar(canvasDiv, {
      data,
      xField: 'item',
      yField: 'score',
      seriesField: 'user',
      point: {
        visible: true,
        style: {
          lineWidth: 4
        }
      }
    });
    radarPlot.render();
    const elements = radarPlot.plot.get('elements');
    expect(elements.length).to.be.equal(3);
    expect(elements[2].get('type')).to.be.equal('point');
    const shapes = radarPlot.plot.get('elements')[2].getShapes();
    expect(shapes[0].attr('lineWidth')).to.be.equal(4);
    radarPlot.destroy();
  });

  it('auto padding', () => {
    const radarPlot = new Radar(canvasDiv, {
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
      padding: 'auto',
      data,
      xField: 'item',
      yField: 'score',
      seriesField: 'user',
    });
    radarPlot.render();
    const padding = radarPlot.plot.get('padding');
    expect(padding[0] >= 20).to.be.true;
    expect(padding[1] >= 20).to.be.true;
    expect(padding[2] >= 40).to.be.true;
    expect(padding[3] >= 20).to.be.true;
    radarPlot.destroy();
  });

  it('title & description', () => {
    const radarPlot = new Radar(canvasDiv, {
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
      data,
      xField: 'item',
      yField: 'score',
      seriesField: 'user',
    });
    const title = radarPlot.title;
    const description = radarPlot.description;
    expect(title.attr('text')).to.be.equal('title');
    expect(title.attr('fill')).to.be.equal('red');
    expect(description.attr('text')).to.be.equal('description');
    expect(description.attr('fill')).to.be.equal('red');
    radarPlot.destroy();
  });

});
