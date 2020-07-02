import { Donut } from '../../src';

describe('Statistics scale format', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  it('test', () => {
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
        type: '其它',
        value: 5,
      },
    ];

    const donutPlot = new Donut(canvasDiv, {
      forceFit: false,
      width: 400,
      height: 400,
      title: {
        visible: true,
        text: '环图',
      },
      description: {
        visible: true,
        text: '环图的外半径决定环图的大小，而内半径决定环图的厚度。',
      },
      meta: {
        value: {
          formatter: (v) => `-${v}-`,
        },
      },
      radius: 0.8,
      padding: 'auto',
      data,
      angleField: 'value',
      colorField: 'type',
      animation: false,
      statistic: {
        htmlContent: (data, size) => {
          const { name, value, color } = data;
          return `<div class="statistic" style="width: ${size}px; text-align: center">
            <h3 class="ring-guide-name" style="color: ${color}">${name}</h3>
            <p class="ring-guide-value">${value}</p>
            </div>`;
        },
      },
    });
    donutPlot.render();
    // @ts-ignore
    expect(donutPlot.getLayers()[0].labelComponent.arcPoints[0].name).toBe('-27-');
    expect(canvasDiv.getElementsByClassName('ring-guide-value')[0].textContent).toBe('-100-');
    // @ts-ignore
    expect(canvasDiv.getElementsByClassName('statistic')[0].style.width).toBe('153.088px');
  });
});
