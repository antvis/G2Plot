import TinyArea from '../../../src/tiny-plots/tiny-area';
import { expect } from 'chai';
import { fireWorks } from '../../data/fireworks-sales';
import { getMean, getMedian } from '../../../src/util/math';
import * as _ from '@antv/util';

describe.skip('tiny area', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '200px';
  canvasDiv.style.height = '100px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas';
  document.body.appendChild(canvasDiv);

  it('initialize & destory', () => {
    const tinyArea = new TinyArea(canvasDiv, {
      width: 200,
      height: 100,
      data: fireWorks,
      xField: 'Data',
      yField: 'scales',
    });
    tinyArea.render();
    expect(tinyArea).to.be.an.instanceOf(TinyArea);
    const canvas = tinyArea.plot.get('canvas');
    expect(canvas.get('width')).to.be.equal(200);
    expect(canvas.get('height')).to.be.equal(100);
    const geoms = tinyArea.plot.get('elements');
    expect(geoms[0].get('type')).to.be.equal('area');
    expect(geoms[1].get('type')).to.be.equal('line');
    tinyArea.destroy();
    expect(tinyArea.plot.destroyed).to.be.true;
    expect(canvasDiv.childNodes.length).equal(0);
  });

  it('color', () => {
    const tinyArea = new TinyArea(canvasDiv, {
      width: 200,
      height: 100,
      data: fireWorks,
      xField: 'Data',
      yField: 'scales',
      color: '#039919',
    });
    tinyArea.render();
    const geoms = tinyArea.plot.get('elements');
    const shapes = [];
    _.each(geoms, (geom) => {
      shapes.push(...geom.getShapes());
    });
    expect(shapes[0].attr('fill')).to.be.equal('l(90) 0:#039919 1:#ffffff');
    expect(shapes[1].attr('stroke')).to.be.equal('#039919');
    tinyArea.destroy();
  });

  it('smooth', () => {
    const tinyArea = new TinyArea(canvasDiv, {
      width: 200,
      height: 100,
      data: fireWorks,
      xField: 'Data',
      yField: 'scales',
      smooth: true,
    });
    tinyArea.render();
    const geoms = tinyArea.plot.get('elements');
    const shapes = [];
    _.each(geoms, (geom) => {
      shapes.push(...geom.getShapes());
    });
    expect(shapes[0].attr('path')[2][0]).to.be.equal('C');
    expect(shapes[1].attr('path')[2][0]).to.be.equal('C');
    tinyArea.destroy();
  });

  it('lineStyle', () => {
    const tinyArea = new TinyArea(canvasDiv, {
      width: 200,
      height: 100,
      data: fireWorks,
      xField: 'Data',
      yField: 'scales',
      lineStyle: {
        stroke: 'red',
        lineWidth: 4,
      },
    });
    tinyArea.render();
    const geoms = tinyArea.plot.get('elements');
    const shapes = [];
    _.each(geoms, (geom) => {
      shapes.push(...geom.getShapes());
    });
    expect(shapes[1].attr('stroke')).to.be.equal('red');
    expect(shapes[1].attr('lineWidth')).to.be.equal(4);
    tinyArea.destroy();
  });

  it('guideline statistic', () => {
    const tinyArea = new TinyArea(canvasDiv, {
      width: 200,
      height: 100,
      data: fireWorks,
      xField: 'Data',
      yField: 'scales',
      guideLine: [{ type: 'mean' }, { type: 'median' }, { type: 'min' }, { type: 'max' }],
    });
    tinyArea.render();
    const scale = tinyArea.plot.get('scales').scales;
    const values = extractValues(fireWorks, 'scales');
    const max = Math.max(...values);
    const maxPos = ((max - scale.min) / (scale.max - scale.min)) * 100 + '%';
    const min = Math.min(...values);
    const minPos = ((min - scale.min) / (scale.max - scale.min)) * 100 + '%';
    const mean = getMean(values);
    const meanPos = ((mean - scale.min) / (scale.max - scale.min)) * 100 + '%';
    const median = getMedian(values);
    const medianPos = ((median - scale.min) / (scale.max - scale.min)) * 100 + '%';
    const annotations = tinyArea.plot.get('annotationController').annotations;
    const meanAnnotation = annotations[0];
    const medianAnnotation = annotations[1];
    const minAnnotation = annotations[2];
    const maxAnnotation = annotations[3];
    expect(meanAnnotation.get('start')[1]).to.be.equal(meanPos);
    expect(medianAnnotation.get('start')[1]).to.be.equal(medianPos);
    expect(minAnnotation.get('start')[1]).to.be.equal(minPos);
    expect(maxAnnotation.get('start')[1]).to.be.equal(maxPos);
    tinyArea.destroy();
  });

  it('guideline self-defined', () => {
    const tinyArea = new TinyArea(canvasDiv, {
      width: 200,
      height: 100,
      data: fireWorks,
      xField: 'Data',
      yField: 'scales',
      guideLine: [{ start: ['5%', '10%'], end: ['50%', '50%'] }],
    });
    tinyArea.render();
    const { width, height } = tinyArea.plot.get('coord');
    const annotation = tinyArea.plot.get('annotationController').annotations[0];
    const lineShape = annotation.get('el').get('children')[0];
    const x0 = width * 0.05;
    const y0 = height * 0.1;
    const x1 = width * 0.5;
    const y1 = height * 0.5;
    expect(lineShape.attr('path')).to.eql([['M', x0, y0], ['L', x1, y1]]);
    tinyArea.destroy();
  });

  it('guideline lineStyle', () => {
    const tinyArea = new TinyArea(canvasDiv, {
      width: 200,
      height: 100,
      data: fireWorks,
      xField: 'Data',
      yField: 'scales',
      guideLine: [
        {
          type: 'mean',
          line: {
            style: {
              stroke: 'black',
              lineWidth: 5,
            },
          },
        },
      ],
    });
    tinyArea.render();
    const annotation = tinyArea.plot.get('annotationController').annotations[0];
    const lineShape = annotation.get('el').get('children')[0];
    expect(lineShape.attr('stroke')).to.be.equal('black');
    expect(lineShape.attr('lineWidth')).to.be.equal(5);
    tinyArea.destroy();
  });

  it('guideline text', () => {
    const tinyArea = new TinyArea(canvasDiv, {
      width: 200,
      height: 100,
      data: fireWorks,
      xField: 'Data',
      yField: 'scales',
      guideLine: [
        {
          type: 'mean',
          text: {
            position: 'start',
            content: 'test',
            style: {
              fontSize: 30,
            },
          },
        },
      ],
    });
    tinyArea.render();
    const annotation = tinyArea.plot.get('annotationController').annotations[0];
    const text = annotation.get('el').get('children')[1];
    expect(text.attr('text')).to.be.equal('test');
    expect(text.attr('fontSize')).to.be.equal(30);
    expect(text.attr('x')).to.be.equal(0);
    tinyArea.destroy();
  });

  function extractValues(data, field) {
    const values = [];
    _.each(data, (d) => {
      values.push(d[field]);
    });
    return values;
  }
});
