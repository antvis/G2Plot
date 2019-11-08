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
      legend: {
        visible: true,
        position: 'top-left',
      },
      title: {
        text: 'title title',
      },
      colorField: 'type',
    });
    piePlot.render();
    const plot = piePlot.getLayer().view;
    const positionField = plot.get('elements')[0].get('position').fields;
    expect(piePlot).to.be.instanceOf(Pie);
    expect(positionField[0]).to.be.equal('1');
    expect(positionField[1]).to.be.equal('value');
    piePlot.destroy();
    expect(plot.destroyed).to.be.true;
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
    const plot = piePlot.getLayer().view;
    const coord = plot.get('coord');
    expect(coord.getRadius() * 2).to.be.equal(coord.getWidth() / 2);
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
    const plot = piePlot.getLayer().view;
    const shapes = plot.get('elements')[0].getShapes();
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
    const plot = piePlot.getLayer().view;
    const shapes = plot.get('elements')[0].getShapes();
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
    const plot = piePlot.getLayer().view;
    const shapes = plot.get('elements')[0].getShapes();
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
    const plot = piePlot.getLayer().view;
    const labelGroup = plot
      .get('elements')[0]
      .get('container')
      .get('children')[1]
      .get('children')[0]
      .get('children');
    const coord = plot.get('coord');
    expect(labelGroup[0].attr('text')).to.be.equal('test');
    expect(labelGroup[0].attr('fill')).to.be.equal('red');
    const distX = Math.abs(coord.getCenter().x - labelGroup[0].attr('x'));
    const distY = Math.abs(coord.getCenter().y - labelGroup[0].attr('y'));
    const dist = Math.sqrt(distX * distX + distY * distY);
    expect(dist < coord.getRadius()).to.be.true;
    piePlot.destroy();
  });

  it('outer label', () => {
    const piePlot = new Pie(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'value',
      label: {
        visible: true,
        type: 'outer',
        formatter: () => {
          return 'test';
        },
        style: {
          fill: 'red',
        },
      },
    });
    piePlot.render();
    const plot = piePlot.getLayer().view;
    const labelGroup = plot
      .get('elements')[0]
      .get('container')
      .get('children')[1]
      .get('children')[0]
      .get('children');
    const coord = plot.get('coord');
    expect(labelGroup[0].attr('text')).to.be.equal('test');
    expect(labelGroup[0].attr('fill')).to.be.equal('red');
    const distX = Math.abs(coord.getCenter().x - labelGroup[0].attr('x'));
    const distY = Math.abs(coord.getCenter().y - labelGroup[0].attr('y'));
    const dist = Math.sqrt(distX * distX + distY * distY);
    expect(dist > coord.getRadius()).to.be.true;
    piePlot.destroy();
  });

  it.skip('spider label', () => {
    const piePlot = new Pie(canvasDiv, {
      width: 600,
      height: 600,
      data,
      angleField: 'value',
      colorField: 'type',
      label: {
        visible: true,
        type: 'spider',
        style: {
          fontSize: 14,
          fill: '#ccc',
        },
      },
    });
    piePlot.render();
    const pieLayer = piePlot.getLayer();
    const plot = pieLayer.plot;
    const spiderLabel = pieLayer.spiderLabel;
    const labelShapes = pieLayer.container.get('children');
    const shapes = plot.get('elements')[0].getShapes();
    expect(labelShapes.length / 3).to.be.equal(shapes.length);
    expect(labelShapes[0].get('children')[0].attr('text')).to.be.equal(5);
    expect(labelShapes[0].get('children')[1].attr('text')).to.be.equal('Other');
    expect(labelShapes[0].get('children')[1].attr('fill')).to.be.equal('#ccc');
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
        text: 'descriptiondescriptiondescriptiondescription',
      },
      padding: 'auto',
      data,
      angleField: 'value',
    });
    piePlot.render();
    const plot = piePlot.getLayer().view;
    const padding = plot.get('padding');
    expect(padding[0] >= 16).to.be.true;
    expect(padding[1] >= 20).to.be.true;
    expect(padding[2] >= 20).to.be.true;
    expect(padding[3] >= 20).to.be.true;
    piePlot.destroy();
  });

  it('title & description', () => {
    const piePlot = new Pie(canvasDiv, {
      width: 600,
      height: 600,
      title: {
        visible: true,
        text: 'title',
        style: {
          fill: 'red',
        },
      },
      description: {
        visible: true,
        text: 'description',
        style: {
          fill: 'red',
        },
      },
      padding: 'auto',
      data,
      angleField: 'value',
    });
    piePlot.render();
    const pieLayer = piePlot.getLayer();
    const title = pieLayer.title;
    const description = pieLayer.description;
    expect(title.text).to.be.equal('title');
    expect(title.style.fill).to.be.equal('red');
    expect(description.shape.attr('text')).to.be.equal('description');
    expect(description.shape.attr('fill')).to.be.equal('red');
    piePlot.destroy();
  });
});
