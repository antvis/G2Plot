import { expect } from 'chai';
import { Liquid } from '../../src';
import Theme from '../../src/theme/theme';

describe('Liquid plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  it.only('liquid', () => {
    Theme.setTheme('ali-light');
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
    });
    liquidPlot.render();
    expect(liquidPlot).to.be.instanceOf(Liquid);
    const positionField = liquidPlot.plot.get('elements')[0].get('position').fields;
    expect(positionField[0]).to.be.equal('1');
    expect(positionField[1]).to.be.equal('value');
    expect(liquidPlot.plot.get('coord').type).to.be.equal('cartesian');
    liquidPlot.destroy();
    expect(liquidPlot.plot.destroyed).to.be.true;
  });


  it.only('liquid-style', () => {
    // Theme.setTheme('ali-light');
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
      liquidStyle: {
        borderOpacity: 0.2,
        borderWidth: 10,
        color: '#3B76FF',
        fontColor: '#233F7E',
        fontOpacity: 1,
        fontSize: 40
      },
    });
    liquidPlot.render();
    const colorCfg = liquidPlot.plot.get('elements')[0].get('color').values;
    expect(colorCfg[0]).to.be.equal('#3B76FF');
    const annotationText = liquidPlot.plot.cfg.annotationController.annotations[0].cfg.content;
    expect(annotationText).to.be.equal('[6640]');
    liquidPlot.destroy();
    expect(liquidPlot.plot.destroyed).to.be.true;
  });
});
