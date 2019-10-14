import TinyColumn from '../../../src/tinyPlots/tiny-column';
import { expect } from 'chai';
import { getMean, getMedian } from '../../../src/util/math';
import * as _ from '@antv/util';

describe.skip('tiny column', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '200px';
  canvasDiv.style.height = '100px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas';
  document.body.appendChild(canvasDiv);

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

  it('initialize & destory', () => {
    const tinyColumn = new TinyColumn(canvasDiv, {
      width: 200,
      height: 100,
      data,
      xField: 'year',
      yField: 'value',
    });
    tinyColumn.render();
    expect(tinyColumn).to.be.an.instanceOf(TinyColumn);
    const canvas = tinyColumn.plot.get('canvas');
    expect(canvas.get('width')).to.be.equal(200);
    expect(canvas.get('height')).to.be.equal(100);
    const geoms = tinyColumn.plot.get('elements');
    expect(geoms[0].get('type')).to.be.equal('interval');
    tinyColumn.destroy();
    expect(tinyColumn.plot.destroyed).to.be.true;
    expect(canvasDiv.childNodes.length).equal(0);
  });

  it('color mapping', () => {
    const tinyColumn = new TinyColumn(canvasDiv, {
      width: 200,
      height: 100,
      data,
      xField: 'year',
      yField: 'value',
      colorField: 'year',
      color: ['#c43a22', '#e86e3e', '#f6ad5b', '#f0e086', '#f9fab8', '#d9e882', '#a7d268', '#70b65e', '#169437'],
    });
    tinyColumn.render();
    const geom = tinyColumn.plot.get('elements')[0];
    const shapes = geom.getShapes();
    expect(shapes[0].attr('fill')).to.be.equal('#c43a22');
    expect(shapes[1].attr('fill')).to.be.equal('#e86e3e');
    tinyColumn.destroy();
  });

  it('color as string', () => {
    const tinyColumn = new TinyColumn(canvasDiv, {
      width: 200,
      height: 100,
      data,
      xField: 'year',
      yField: 'value',
      color: 'red',
    });
    tinyColumn.render();
    const geom = tinyColumn.plot.get('elements')[0];
    const shapes = geom.getShapes();
    expect(shapes[0].attr('fill')).to.be.equal('red');
    tinyColumn.destroy();
  });

  it('color as callback', () => {
    const tinyColumn = new TinyColumn(canvasDiv, {
      width: 200,
      height: 100,
      data,
      xField: 'year',
      yField: 'value',
      colorField: 'value',
      color: (val) => {
        if (val < 20) {
          return 'red';
        }
        return 'blue';
      },
    });
    tinyColumn.render();
    const geom = tinyColumn.plot.get('elements')[0];
    const shapes = geom.getShapes();
    expect(shapes[0].attr('fill')).to.be.equal('blue');
    expect(shapes[5].attr('fill')).to.be.equal('red');
    expect(shapes[6].attr('fill')).to.be.equal('red');
    tinyColumn.destroy();
  });

  it('column style', () => {
    const tinyColumn = new TinyColumn(canvasDiv, {
      width: 200,
      height: 100,
      data,
      xField: 'year',
      yField: 'value',
      columnStyle: {
        stroke: 'black',
        lineWidth: 1,
      },
    });
    tinyColumn.render();
    const geom = tinyColumn.plot.get('elements')[0];
    const shapes = geom.getShapes();
    expect(shapes[0].attr('stroke')).to.be.equal('black');
    expect(shapes[0].attr('lineWidth')).to.be.equal(1);
    tinyColumn.destroy();
  });

  it('responsive columnSize', () => {
    const tinyColumn = new TinyColumn(canvasDiv, {
      width: 200,
      height: 100,
      data,
      xField: 'year',
      yField: 'value',
    });
    tinyColumn.render();
    const dataLength = data.length;
    const { width } = tinyColumn.plot.get('coord');
    const columnWidth = (width / dataLength) * 0.6;
    const geom = tinyColumn.plot.get('elements')[0];
    const shapes = geom.getShapes();
    const bbox = shapes[0].getBBox();
    expect(bbox.width).to.be.equal(columnWidth);
    tinyColumn.destroy();
  });
});
