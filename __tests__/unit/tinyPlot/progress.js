import Progress from '../../../src/tinyPlots/progress';
import RingProgress from '../../../src/tinyPlots/ring-progress';

describe('tinyProgress plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '200px';
  canvasDiv.style.height = '100px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas';
  document.body.appendChild(canvasDiv);

  it('条形进度图', () => {
    const tinyProgress = new Progress('canvas', {
      width: 200,
      height: 100,
      percent: 0.3,
      color:['red','blue'],
      style:{
        stroke:'black',
        lineWidth: 1
      }
    });
    tinyProgress.render();
    let percent = 0.3;
    window.setInterval(() => {
      percent += 0.1;
      percent = Math.min(1.0, percent);
      tinyProgress.update(percent);
    }, 800);
  });

  it.only('环形进度图', () => {
    const tinyProgress = new RingProgress(canvasDiv, {
      width: 200,
      height: 100,
      percent: 0.4,
      color:['red','blue'],
      style:{
        stroke:'black',
        lineWidth: 1
      }
    });
    tinyProgress.render();
    let percent = 0.4;
    window.setInterval(() => {
      percent += 0.05;
      tinyProgress.update(percent);
    }, 2000);
  });
});
