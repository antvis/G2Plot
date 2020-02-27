import { Ring } from '../../../../src';

describe('responsive ring plot', () => {
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

  it('canvas size 500x500', () => {
    const plot = createPlot(500, 500);
  });

  it('canvas size 400x400', () => {
    const plot = createPlot(250, 400);
  });

  it('canvas size 300x300', () => {
    const plot = createPlot(300, 300);
  });

  it('canvas size 200x200', () => {
    const plot = createPlot(100, 100);
  });

  function createPlot(width, height) {
    const canvasDiv = document.createElement('div');
    canvasDiv.style.width = `${width}px`;
    canvasDiv.style.height = `${height}px`;
    canvasDiv.id = 'canvas1';
    document.body.appendChild(canvasDiv);
    const ringPlot = new Ring(canvasDiv, {
      width,
      height,
      padding: 'auto',
      data,
      angleField: 'value',
      colorField: 'type',
      responsive: true,
    });
    ringPlot.render();
    return ringPlot;
  }
});
