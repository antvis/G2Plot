import { Liquid } from '../../src';

describe('Liquid plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  it.only('liquid', () => {
    const liquidPlot = new Liquid(canvasDiv, {
      title: {
        text: '水位图测试',
      },
      description: {
        text: '水位图用来展示数据在总集合中的占比情况，通过水位的样式展示信息。',
      },
      width: 400,
      height: 450,

      type: 'normal',
      min: 0,
      max: 10000,
      value: 6640,
      showValue: true,
      format: (d) => `[${d}]`,
      style: {
        borderOpacity: 0.2,
        borderWidth: 10,
        color: '#3B76FF',
        fontColor: '#233F7E',
        fontOpacity: 1,
        // fontSize: 40
      },
    });
    liquidPlot.render();
  });


});
