import { Pie } from '../../src';
import { expect } from 'chai';

describe('Pie plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  const data = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: 'Other',
      value: 5,
    },
  ];

  it('初始化及销毁图表', () => {
    const piePlot = new Pie(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'value',
    });
    piePlot.render();
    const positionField = piePlot.plot.get('elements')[0].get('position').fields;
    expect(piePlot).to.be.instanceOf(Pie);
    expect(positionField[0]).to.be.equal('1');
    expect(positionField[1]).to.be.equal('value');
    piePlot.destroy();
    expect(piePlot.plot.destroyed).to.be.true;
  });

  it('radius', () => {
    const piePlot = new Pie(canvasDiv, {
      width: 600,
      height: 600,
      data,
      padding: [0, 0, 0, 0],
      angleField: 'value',
      radius: 0.5,
    });
    piePlot.render();
    const coord = piePlot.plot.get('coord');
    expect(coord.radius * 2).to.be.equal(coord.width / 2);
    piePlot.destroy();
  });

  it('单色饼图', () => {
    const piePlot = new Pie(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'value',
    });
    piePlot.render();
    const shapes = piePlot.plot.get('elements')[0].getShapes();
    expect(shapes[0].attr('stroke')).to.be.equal('white');
    expect(shapes[0].attr('lineWidth')).to.be.equal(1);
    piePlot.destroy();
  });

  it('饼图颜色', () => {
    const piePlot = new Pie(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'value',
      colorField: 'type',
      color: ['yellow', 'green', 'blue'],
    });
    piePlot.render();
    const shapes = piePlot.plot.get('elements')[0].getShapes();
    expect(shapes[0].attr('fill')).to.be.equal('yellow');
    expect(shapes[1].attr('fill')).to.be.equal('green');
    expect(shapes[2].attr('fill')).to.be.equal('blue');
    piePlot.destroy();
  });

  it('图形style', () => {
    const piePlot = new Pie(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'value',
      colorField: 'type',
      pieStyle: {
        stroke: 'red',
        lineWidth: 2,
      },
    });
    piePlot.render();
    const shapes = piePlot.plot.get('elements')[0].getShapes();
    expect(shapes[0].attr('stroke')).to.be.equal('red');
    expect(shapes[0].attr('lineWidth')).to.be.equal(2);
    piePlot.destroy();
  });

  it('inner label', () => {
    const piePlot = new Pie(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'value',
      label: {
        visible: true,
        type: 'inner',
        formatter: () => {
          return 'test';
        },
        style: {
          fill: 'red',
        },
      },
    });
    piePlot.render();
    const labelGroup = piePlot.plot
      .get('elements')[0]
      .get('container')
      .get('children')[1]
      .get('children')[0]
      .get('children');
    const coord = piePlot.plot.get('coord');
    expect(labelGroup[0].attr('text')).to.be.equal('test');
    expect(labelGroup[0].attr('fill')).to.be.equal('red');
    const distX = Math.abs(coord.center.x - labelGroup[0].attr('x'));
    const distY = Math.abs(coord.center.y - labelGroup[0].attr('y'));
    const dist = Math.sqrt(distX * distX + distY * distY);
    expect(dist < coord.radius).to.be.true;
    piePlot.destroy();
  });

  it('outter label', () => {
    const piePlot = new Pie(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'value',
      label: {
        visible: true,
        type: 'outter',
        formatter: () => {
          return 'test';
        },
        style: {
          fill: 'red',
        },
      },
    });
    piePlot.render();
    const labelGroup = piePlot.plot
      .get('elements')[0]
      .get('container')
      .get('children')[1]
      .get('children')[0]
      .get('children');
    const coord = piePlot.plot.get('coord');
    expect(labelGroup[0].attr('text')).to.be.equal('test');
    expect(labelGroup[0].attr('fill')).to.be.equal('red');
    const distX = Math.abs(coord.center.x - labelGroup[0].attr('x'));
    const distY = Math.abs(coord.center.y - labelGroup[0].attr('y'));
    const dist = Math.sqrt(distX * distX + distY * distY);
    expect(dist > coord.radius).to.be.true;
    piePlot.destroy();
  });

  it('spider label', () => {
    const piePlot = new Pie(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'value',
      colorField: 'type',
      label: {
        type: 'spider',
        style: {
          lineWidth: 2,
          text: {
            fontSize: 14,
            fill: '#ccc',
          },
          anchorSize: 3,
        },
      },
    });
    piePlot.render();
    const spiderLabel = piePlot.spiderLabel;
    const labelShapes = spiderLabel.container.get('children');
    const shapes = piePlot.plot.get('elements')[0].getShapes();
    expect(labelShapes.length / 3).to.be.equal(shapes.length);
    expect(labelShapes[0].get('children')[0].attr('text')).to.be.equal(5);
    expect(labelShapes[0].get('children')[1].attr('text')).to.be.equal('Other');
    expect(labelShapes[0].get('children')[1].attr('fill')).to.be.equal('#ccc');
    expect(labelShapes[1].attr('lineWidth')).to.be.equal(2);
    expect(labelShapes[1].attr('stroke')).to.be.equal(shapes[shapes.length - 1].attr('fill'));
    piePlot.destroy();
  });

  it('auto padding', () => {
    const piePlot = new Pie(canvasDiv, {
      width: 600,
      height: 600,
      title: {
        text: 'title',
      },
      description: {
        text: 'description',
      },
      padding: 'auto',
      data,
      angleField: 'value',
    });
    const padding = piePlot.plot.get('padding');
    expect(padding[0] >= 20).to.be.true;
    expect(padding[1] >= 20).to.be.true;
    expect(padding[2] >= 40).to.be.true;
    expect(padding[3] >= 20).to.be.true;
    piePlot.destroy();
  });

  it('title & description', () => {
    const piePlot = new Pie(canvasDiv, {
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
      padding: 'auto',
      data,
      angleField: 'value',
    });
    const title = piePlot.title;
    const description = piePlot.description;
    expect(title.attr('text')).to.be.equal('title');
    expect(title.attr('fill')).to.be.equal('red');
    expect(description.shape.attr('text')).to.be.equal('description');
    expect(description.shape.attr('fill')).to.be.equal('red');
    piePlot.destroy();
  });
});
