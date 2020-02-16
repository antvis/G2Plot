import TinyArea from '../../../src/sparkline/tiny-area';
import { fireWorks } from '../../data/fireworks-sales';
import { getMean, getMedian } from '../../../src/util/math';
import * as _ from '@antv/util';

describe('tiny area', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '200px';
  canvasDiv.style.height = '100px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas';
  document.body.appendChild(canvasDiv);

  it.only('initialize & destory', () => {
    const tinyArea = new TinyArea(canvasDiv, {
      width: 200,
      height: 100,
      data: fireWorks,
      xField: 'Data',
      yField: 'scales',
    });
    tinyArea.render();
    /*expect(tinyArea).toBeInstanceOf(TinyArea);
    const canvas = tinyArea.plot.get('canvas');
    expect(canvas.get('width')).toBe(200);
    expect(canvas.get('height')).toBe(100);
    const geoms = tinyArea.plot.get('elements');
    expect(geoms[0].get('type')).toBe('area');
    expect(geoms[1].get('type')).toBe('line');
    tinyArea.destroy();
    expect(tinyArea.plot.destroyed).toBe(true);
    expect(canvasDiv.childNodes.length).equal(0);*/
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
    expect(shapes[0].attr('fill')).toBe('l(90) 0:#039919 1:#ffffff');
    expect(shapes[1].attr('stroke')).toBe('#039919');
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
    expect(shapes[0].attr('path')[2][0]).toBe('C');
    expect(shapes[1].attr('path')[2][0]).toBe('C');
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
    expect(shapes[1].attr('stroke')).toBe('red');
    expect(shapes[1].attr('lineWidth')).toBe(4);
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
    expect(meanAnnotation.get('start')[1]).toBe(meanPos);
    expect(medianAnnotation.get('start')[1]).toBe(medianPos);
    expect(minAnnotation.get('start')[1]).toBe(minPos);
    expect(maxAnnotation.get('start')[1]).toBe(maxPos);
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
    expect(lineShape.attr('path')).to.eql([
      ['M', x0, y0],
      ['L', x1, y1],
    ]);
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
    expect(lineShape.attr('stroke')).toBe('black');
    expect(lineShape.attr('lineWidth')).toBe(5);
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
    expect(text.attr('text')).toBe('test');
    expect(text.attr('fontSize')).toBe(30);
    expect(text.attr('x')).toBe(0);
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
