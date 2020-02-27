import TinyLine from '../../../../src/sparkline/tiny-line';
import { income } from '../../../data/income';
import { getMean, getMedian } from '../../../../src/util/math';
import * as _ from '@antv/util';

describe('tiny line', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '200px';
  canvasDiv.style.height = '100px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas';
  document.body.appendChild(canvasDiv);

  it.only('initialize & destory', () => {
    const tinyLine = new TinyLine(canvasDiv, {
      width: 200,
      height: 100,
      data: income,
      xField: 'time',
      yField: 'rate',
    });
    tinyLine.render();
    /*expect(tinyLine).toBeInstanceOf(TinyLine);
    const canvas = tinyLine.plot.get('canvas');
    expect(canvas.get('width')).toBe(200);
    expect(canvas.get('height')).toBe(100);
    const geometry = tinyLine.plot.geometries[0];
    expect(geometry.get('type')).toBe('line');
    const dataArray = geometry.get('dataArray')[0];
    const p0 = dataArray[0];
    const p1 = dataArray[1];
    const dx = p1.x - p0.x;
    const dy = p1.y - p0.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    expect(dist >= 2).toBe(true);
    tinyLine.destroy();
    expect(tinyLine.plot.destroyed).toBe(true);
    expect(canvasDiv.childNodes.length).equal(0);*/
  });

  it('size', () => {
    const tinyLine = new TinyLine(canvasDiv, {
      width: 200,
      height: 100,
      data: income,
      xField: 'time',
      yField: 'rate',
      size: 4,
    });
    tinyLine.render();
    const geometry = tinyLine.plot.geometries[0];
    const shape = geometry.getShapes()[0];
    expect(shape.attr('lineWidth')).toBe(4);
    tinyLine.destroy();
  });

  it('smooth', () => {
    const tinyLine = new TinyLine(canvasDiv, {
      width: 200,
      height: 100,
      data: income,
      xField: 'time',
      yField: 'rate',
      smooth: true,
    });
    tinyLine.render();
    const geometry = tinyLine.plot.geometries[0];
    const shape = geometry.getShapes()[0];
    const path = shape.attr('path');
    expect(path[1][0]).toBe('C');
    tinyLine.destroy();
  });

  it('color', () => {
    const tinyLine = new TinyLine(canvasDiv, {
      width: 200,
      height: 100,
      data: income,
      xField: 'time',
      yField: 'rate',
      color: 'red',
    });
    tinyLine.render();
    const geometry = tinyLine.plot.geometries[0];
    const shape = geometry.getShapes()[0];
    expect(shape.attr('stroke')).toBe('red');
    tinyLine.destroy();
  });

  it('lineStyle', () => {
    const tinyLine = new TinyLine(canvasDiv, {
      width: 200,
      height: 100,
      data: income,
      xField: 'time',
      yField: 'rate',
      lineStyle: {
        lineDash: [2, 2],
        opacity: 0.5,
      },
    });
    tinyLine.render();
    const geometry = tinyLine.plot.geometries[0];
    const shape = geometry.getShapes()[0];
    expect(shape.attr('lineDash')[0]).toBe(2);
    expect(shape.attr('opacity')).toBe(0.5);
    tinyLine.destroy();
  });

  it('guideline statistic', () => {
    const tinyLine = new TinyLine(canvasDiv, {
      width: 200,
      height: 100,
      data: income,
      xField: 'time',
      yField: 'rate',
      guideLine: [{ type: 'mean' }, { type: 'median' }, { type: 'min' }, { type: 'max' }],
    });
    tinyLine.render();
    const scale = tinyLine.plot.get('scales').rate;
    const values = extractValues(income, 'rate');
    const max = Math.max(...values);
    const maxPos = ((max - scale.min) / (scale.max - scale.min)) * 100 + '%';
    const min = Math.min(...values);
    const minPos = ((min - scale.min) / (scale.max - scale.min)) * 100 + '%';
    const mean = getMean(values);
    const meanPos = ((mean - scale.min) / (scale.max - scale.min)) * 100 + '%';
    const median = getMedian(values);
    const medianPos = ((median - scale.min) / (scale.max - scale.min)) * 100 + '%';
    const annotations = tinyLine.plot.get('annotationController').annotations;
    const meanAnnotation = annotations[0];
    const medianAnnotation = annotations[1];
    const minAnnotation = annotations[2];
    const maxAnnotation = annotations[3];
    expect(meanAnnotation.get('start')[1]).toBe(meanPos);
    expect(medianAnnotation.get('start')[1]).toBe(medianPos);
    expect(minAnnotation.get('start')[1]).toBe(minPos);
    expect(maxAnnotation.get('start')[1]).toBe(maxPos);
    tinyLine.destroy();
  });

  it('guideline self-defined', () => {
    const tinyLine = new TinyLine(canvasDiv, {
      width: 200,
      height: 100,
      data: income,
      xField: 'time',
      yField: 'rate',
      guideLine: [{ start: ['5%', '10%'], end: ['50%', '50%'] }],
    });
    tinyLine.render();
    const { width, height } = tinyLine.plot.get('coord');
    const annotation = tinyLine.plot.get('annotationController').annotations[0];
    const lineShape = annotation.get('el').get('children')[0];
    const x0 = width * 0.05;
    const y0 = height * 0.1;
    const x1 = width * 0.5;
    const y1 = height * 0.5;
    expect(lineShape.attr('path')).to.eql([
      ['M', x0, y0],
      ['L', x1, y1],
    ]);
    tinyLine.destroy();
  });

  it('guideline lineStyle', () => {
    const tinyLine = new TinyLine(canvasDiv, {
      width: 200,
      height: 100,
      data: income,
      xField: 'time',
      yField: 'rate',
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
    tinyLine.render();
    const annotation = tinyLine.plot.get('annotationController').annotations[0];
    const lineShape = annotation.get('el').get('children')[0];
    expect(lineShape.attr('stroke')).toBe('black');
    expect(lineShape.attr('lineWidth')).toBe(5);
    tinyLine.destroy();
  });

  it('guideline text', () => {
    const tinyLine = new TinyLine(canvasDiv, {
      width: 200,
      height: 100,
      data: income,
      xField: 'time',
      yField: 'rate',
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
    tinyLine.render();
    const annotation = tinyLine.plot.get('annotationController').annotations[0];
    const text = annotation.get('el').get('children')[1];
    expect(text.attr('text')).toBe('test');
    expect(text.attr('fontSize')).toBe(30);
    expect(text.attr('x')).toBe(0);
    tinyLine.destroy();
  });

  it('update config', () => {
    const tinyLine = new TinyLine(canvasDiv, {
      width: 200,
      height: 100,
      data: income,
      xField: 'time',
      yField: 'rate',
      size: 4,
    });
    tinyLine.render();
    tinyLine.updateConfig({
      size: 5,
    });
    tinyLine.render();
    const geometry = tinyLine.plot.geometries[0];
    const shape = geometry.getShapes()[0];
    expect(shape.attr('lineWidth')).toBe(5);
    tinyLine.destroy();
  });

  function extractValues(data, field) {
    const values = [];
    _.each(data, (d) => {
      values.push(d[field]);
    });
    return values;
  }
});
