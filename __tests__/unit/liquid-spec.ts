import { Liquid } from '../../src';
import Theme from '../../src/theme/theme';

describe.skip('Liquid plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  it.only('initialize & destory', () => {
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
    /*const plot = liquidPlot.getLayer().plot;
    expect(liquidPlot).toBeInstanceOf(Liquid);
    const canvas = liquidPlot.plot.get('canvas');
    expect(canvas.get('width')).toBe(400);
    expect(canvas.get('height')).toBe(450);
    const geometry = plot.get('elements')[0];
    expect(geometry.get('type')).toBe('interval');
    liquidPlot.destroy();
    expect(plot.destroyed).toBe(true);*/
  });

  const titleText = '水位图测试';
  const descriptionText = '水位图用来展示数据在总集合中的占比情况，通过水位的样式展示信息。';
  it('title & description', () => {
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
    const plot = liquidPlot.getLayer().plot;
    expect(plot.title.text).toBe(titleText);
    expect(plot.description.text).toBe(descriptionText);
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
    const plot = liquidPlot.getLayer().plot;
    expect(liquidPlot).toBeInstanceOf(Liquid);
    const element = plot.get('elements')[0];
    const data = element.get('data')[0].value;
    expect(data).toBe(6640);
    const positionField = element.get('position').fields;
    expect(positionField[0]).toBe('1');
    expect(positionField[1]).toBe('value');
    expect(plot.get('coord').type).toBe('cartesian');
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
    const plot = liquidPlot.getLayer().plot;
    const annotationText = plot.cfg.annotationController.annotations[0].cfg.content;
    expect(annotationText).toBe('[66.40%]');
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
    const plot = liquidPlot.getLayer().plot;
    const annotationText = plot.cfg.annotationController.annotations[0].cfg.content;
    expect(annotationText).toBe('[6640]');
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
    const plot = liquidPlot.getLayer().plot;
    const scale = plot.get('scales')['value'];
    expect(scale.min).toBe(0);
    expect(scale.max).toBe(10000);
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
        fontSize: 40,
      },
    });
    liquidPlot.render();
    const plot = liquidPlot.getLayer().plot;
    const colorCfg = plot.get('elements')[0].get('color').values;
    expect(colorCfg[0]).toBe('#3B76FF');
    liquidPlot.destroy();
  });
});
