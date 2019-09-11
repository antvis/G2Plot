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

  it('initialize & destory',() => {
    const liquidPlot = new Liquid(canvasDiv, {
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
    const canvas = liquidPlot.plot.get('canvas');
    expect(canvas.get('width')).to.be.equal(400);
    expect(canvas.get('height')).to.be.equal(450);
    const geometry = liquidPlot.plot.get('elements')[0];
    expect(geometry.get('type')).to.be.equal('interval');
    liquidPlot.destroy();
    expect(liquidPlot.plot.destroyed).to.be.true;
  });


  const titleText = '水位图测试';
  const descriptionText = '水位图用来展示数据在总集合中的占比情况，通过水位的样式展示信息。';
  it('title & description',() => {
    const liquidPlot = new Liquid(canvasDiv, {
      title: {
        text: titleText,
      },
      description: {
        text: descriptionText,
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
    expect(liquidPlot.title.text).to.be.equal(titleText);
    expect(liquidPlot.description.text).to.be.equal(descriptionText);
    liquidPlot.destroy();
  });


  it('liquid-normal', () => {
    Theme.setTheme('ali-light');
    const liquidPlot = new Liquid(canvasDiv, {
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
    const element = liquidPlot.plot.get('elements')[0];
    const data = element.get('data')[0].value;
    expect(data).to.be.equal(6640);
    const positionField = element.get('position').fields;
    expect(positionField[0]).to.be.equal('1');
    expect(positionField[1]).to.be.equal('value');
    expect(liquidPlot.plot.get('coord').type).to.be.equal('cartesian');
    liquidPlot.destroy();
  });


  it('liquid-percent', () => {
    const liquidPlot = new Liquid(canvasDiv, {
      width: 400,
      height: 450,

      type: 'percent',
      min: 0,
      max: 10000,
      value: 6640,
      showValue: true,
      format: (d) => `[${d}]`,
    });
    liquidPlot.render();
    const annotationText = liquidPlot.plot.cfg.annotationController.annotations[0].cfg.content;
    expect(annotationText).to.be.equal('[66.40%]');
    liquidPlot.destroy();
  });


  it('liquid-showValue', () => {
    const liquidPlot = new Liquid(canvasDiv, {
      width: 400,
      height: 450,

      type: 'normal',
      min: 0,
      max: 10000,
      value: 6640,
      showValue: true,
      format: (d) => `[${d}]`,
    });
    liquidPlot.render();
    const annotationText = liquidPlot.plot.cfg.annotationController.annotations[0].cfg.content;
    expect(annotationText).to.be.equal('[6640]');
    liquidPlot.destroy();
  });


  it('liquid-scale', () => {
    const liquidPlot = new Liquid(canvasDiv, {
      width: 400,
      height: 450,

      type: 'percent',
      min: 0,
      max: 10000,
      value: 6640,
    });
    liquidPlot.render();
    const scale = liquidPlot.plot.get('scales')['value'];
    expect(scale.min).to.be.equal(0);
    expect(scale.max).to.be.equal(10000);
    liquidPlot.destroy();
  });


  it('liquid-style', () => {
    const liquidPlot = new Liquid(canvasDiv, {
      width: 400,
      height: 450,

      type: 'normal',
      min: 0,
      max: 10000,
      value: 6640,
      showValue: true,
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
    liquidPlot.destroy();
  });
});
