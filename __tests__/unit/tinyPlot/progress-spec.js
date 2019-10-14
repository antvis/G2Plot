import Progress from '../../../src/tinyPlots/progress';
import { expect } from 'chai';

describe.skip('progress', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '200px';
  canvasDiv.style.height = '100px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas';
  document.body.appendChild(canvasDiv);

  it('initialize & destory', () => {
    const progress = new Progress('canvas', {
      width: 200,
      height: 100,
      percent: 0.3,
    });
    progress.render();
    expect(progress).to.be.an.instanceOf(Progress);
    const canvas = progress.plot.get('canvas');
    expect(canvas.get('width')).to.be.equal(200);
    expect(canvas.get('height')).to.be.equal(100);
    const geometry = progress.plot.get('elements')[0];
    expect(geometry.get('type')).to.be.equal('interval');
    const totalLength = geometry.get('container').getBBox().width;
    const shapes = geometry.getShapes();
    const currentLength = shapes[0].getBBox().width;
    expect(currentLength / totalLength).to.be.equal(0.3);
    progress.destroy();
    expect(progress.plot.destroyed).to.be.true;
    expect(canvasDiv.childNodes.length).equal(0);
  });

  it('progress color - number', () => {
    const progress = new Progress('canvas', {
      width: 200,
      height: 100,
      percent: 0.3,
      color: 'red',
    });
    progress.render();
    const geometry = progress.plot.get('elements')[0];
    const shapes = geometry.getShapes();
    expect(shapes[0].attr('fill')).to.be.equal('red');
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
    const geometry = progress.plot.get('elements')[0];
    const shapes = geometry.getShapes();
    expect(shapes[0].attr('fill')).to.be.equal('red');
    expect(shapes[1].attr('fill')).to.be.equal('blue');
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
    const geometry = progress.plot.get('elements')[0];
    const shapes = geometry.getShapes();
    expect(shapes[0].attr('fill')).to.be.equal('red');
    expect(shapes[1].attr('fill')).to.be.equal('blue');
    expect(currentPrecent).to.be.equal(0.3);
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
    const geometry = progress.plot.get('elements')[0];
    const shapes = geometry.getShapes();
    expect(shapes[0].attr('stroke')).to.be.equal('black');
    expect(shapes[0].attr('lineWidth')).to.be.equal(1);
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
      const geometry = progress.plot.get('elements')[0];
      const totalLength = geometry.get('container').getBBox().width;
      const shapes = geometry.getShapes();
      const currentLength = shapes[0].getBBox().width;
      expect(currentLength / totalLength).to.be.equal(0.5);
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
    const geometry = progress.plot.get('elements')[0];
    const shapes = geometry.getShapes();
    expect(shapes[0].attr('fill')).to.be.equal('green');
    progress.destroy();
  });
});
