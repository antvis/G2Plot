import Progress from '../../../src/sparkline/progress';

describe('progress', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '200px';
  canvasDiv.style.height = '100px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas';
  document.body.appendChild(canvasDiv);

  it('initialize & destory', () => {
    const progress = new Progress(canvasDiv, {
      width: 200,
      height: 100,
      percent: 0.3,
      marker: [
        {
          value: 0.2,
          style: {
            stroke: 'red',
          },
        },
      ],
    });
    progress.render();
    //progress.update({ percent: 0 });
    /*expect(progress).toBeInstanceOf(Progress);
    const canvas = progress.plot.get('canvas');
    expect(canvas.get('width')).toBe(200);
    expect(canvas.get('height')).toBe(100);
    const geometry = progress.plot.geometries[0];
    expect(geometry.get('type')).toBe('interval');
    const totalLength = geometry.get('container').getBBox().width;
    const shapes = geometry.getShapes();
    const currentLength = shapes[0].getBBox().width;
    expect(currentLength / totalLength).toBe(0.3);
    progress.destroy();
    expect(progress.plot.destroyed).toBe(true);
    expect(canvasDiv.childNodes.length).equal(0);*/
  });

  it('progress color - number', () => {
    const progress = new Progress('canvas', {
      width: 200,
      height: 100,
      percent: 0.3,
      color: 'red',
    });
    progress.render();
    const geometry = progress.plot.geometries[0];
    const shapes = geometry.getShapes();
    expect(shapes[0].attr('fill')).toBe('red');
    progress.destroy();
  });

  it('progress color - array', () => {
    const progress = new Progress('canvas', {
      width: 200,
      height: 100,
      percent: 0.3,
      color: ['red', 'blue'],
    });
    progress.render();
    const geometry = progress.plot.geometries[0];
    const shapes = geometry.getShapes();
    expect(shapes[0].attr('fill')).toBe('red');
    expect(shapes[1].attr('fill')).toBe('blue');
    progress.destroy();
  });

  it('progress color - callback', () => {
    let currentPrecent;
    const progress = new Progress('canvas', {
      width: 200,
      height: 100,
      percent: 0.3,
      color: (v) => {
        currentPrecent = v;
        return ['red', 'blue'];
      },
    });
    progress.render();
    const geometry = progress.plot.geometries[0];
    const shapes = geometry.getShapes();
    expect(shapes[0].attr('fill')).toBe('red');
    expect(shapes[1].attr('fill')).toBe('blue');
    expect(currentPrecent).toBe(0.3);
    progress.destroy();
  });

  it('progressStyle', () => {
    const progress = new Progress('canvas', {
      width: 200,
      height: 100,
      percent: 0.3,
      progressStyle: {
        stroke: 'black',
        lineWidth: 1,
      },
    });
    progress.render();
    const geometry = progress.plot.geometries[0];
    const shapes = geometry.getShapes();
    expect(shapes[0].attr('stroke')).toBe('black');
    expect(shapes[0].attr('lineWidth')).toBe(1);
    progress.destroy();
  });

  it('update', (done) => {
    const progress = new Progress('canvas', {
      width: 200,
      height: 100,
      percent: 0.3,
    });
    progress.render();
    progress.update(0.5);
    setTimeout(() => {
      const geometry = progress.plot.geometries[0];
      const totalLength = geometry.get('container').getBBox().width;
      const shapes = geometry.getShapes();
      const currentLength = shapes[0].getBBox().width;
      expect(currentLength / totalLength).toBe(0.5);
      progress.destroy();
      done();
    }, 500);
  });

  it('updateConfig', () => {
    const progress = new Progress('canvas', {
      width: 200,
      height: 100,
      percent: 0.3,
      color: 'red',
    });
    progress.render();
    progress.updateConfig({
      color: 'green',
    });
    progress.render();
    const geometry = progress.plot.geometries[0];
    const shapes = geometry.getShapes();
    expect(shapes[0].attr('fill')).toBe('green');
    progress.destroy();
  });
});
