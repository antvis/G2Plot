import { Column } from '../../../../src';

describe.skip('responsive column plot', () => {
  const data = [
    {
      type: '家具家电',
      value: 34000,
    },
    {
      type: '粮油副食',
      value: 25000,
    },
    {
      type: '生鲜水果',
      value: 11000,
    },
    {
      type: '美容洗护',
      value: 9000,
    },
    {
      type: '母婴用品',
      value: 7000,
    },
    {
      type: '进口食品',
      value: 6000,
    },
    {
      type: '食品饮料',
      value: 4800,
    },
    {
      type: '家庭清洁',
      value: 500,
    },
  ];

  it('canvas size 500x500', () => {
    createPlot(500, 500);
  });

  it('canvas size 400x400', () => {
    createPlot(250, 400);
  });

  it('canvas size 300x300', () => {
    createPlot(300, 300);
  });

  it('canvas size 200x200', () => {
    createPlot(150, 100);
  });

  function createPlot(width, height) {
    const canvasDiv = document.createElement('div');
    canvasDiv.style.width = `${width}px`;
    canvasDiv.style.height = `${height}px`;
    canvasDiv.id = 'canvas1';
    document.body.appendChild(canvasDiv);
    const columnPlot = new Column(canvasDiv, {
      width,
      height,
      padding: 'auto',
      data,
      xField: 'type',
      yField: 'value',
      xAxis: {
        label:{
           autoRotate: false,
        }
      },
      yAxis: {
        visible: true,
      },
      forceFit: false,
      responsive: true,
    });
    columnPlot.render();
    return columnPlot;
  }
});
