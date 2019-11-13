import { Gauge } from '../../src';
import Theme from '../../src/theme/theme';

describe.skip('Gauge plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  it('initialize & destory', () => {
    const gaugePlot = new Gauge(canvasDiv, {
      width: 600,
      height: 650,

      value: 64,
      range: [0, 100],
    });
    gaugePlot.render();
    const plot = gaugePlot.getLayer().plot;
    expect(gaugePlot).toBeInstanceOf(Gauge);
    const canvas = plot.get('canvas');
    expect(canvas.get('width')).toBe(600);
    expect(canvas.get('height')).toBe(650);
    const geometry = gaugePlot.plot.get('elements')[0];
    expect(geometry.get('type')).toBe('point');
    gaugePlot.destroy();
    expect(plot.destroyed).toBe(true);
  });

  const titleText = '仪表图测试';
  const descriptionText = '仪表图';
  it('title & description', () => {
    const gaugePlot = new Gauge(canvasDiv, {
      title: {
        text: titleText,
      },
      description: {
        text: descriptionText,
      },
      width: 600,
      height: 650,

      value: 64,
      range: [0, 100],
    });
    gaugePlot.render();
    const plot = gaugePlot.getLayer().plot;
    expect(plot.title.text).toBe(titleText);
    expect(plot.description.text).toBe(descriptionText);
    gaugePlot.destroy();
  });

  it('gauge-value', () => {
    Theme.setTheme('ali-light');
    const gaugePlot = new Gauge(canvasDiv, {
      width: 600,
      height: 650,

      value: 64,
      min: 0,
      max: 100,
      range: [20, 40, 60, 80],
      label: true,
    });
    gaugePlot.render();
    const plot = gaugePlot.getLayer().plot;
    expect(gaugePlot).toBeInstanceOf(Gauge);
    const element = plot.get('elements')[0];
    const data = element.get('data')[0].value;
    expect(data).toBe(64);
    const positionField = element.get('position').fields;
    expect(positionField[0]).toBe('value');
    expect(positionField[1]).toBe('1');
    expect(plot.get('coord').type).toBe('polar');
    gaugePlot.destroy();
  });

  it('gauge-label', () => {
    const gaugePlot = new Gauge(canvasDiv, {
      width: 600,
      height: 650,

      value: 64,
      min: 0,
      max: 100,
      range: [20, 40, 60, 80],
      label: true,
      format: (d) => `[${d}]`,
    });
    gaugePlot.render();
    const plot = gaugePlot.getLayer().plot;
    const annotationText = plot.cfg.annotationController.annotations[0].cfg.content;
    expect(annotationText).toBe('[64]');
    gaugePlot.destroy();
  });

  it('gauge-scale', () => {
    const gaugePlot = new Gauge(canvasDiv, {
      width: 600,
      height: 650,

      value: 64,
      min: 0,
      max: 100,
      range: [20, 40, 60, 80],
    });
    gaugePlot.render();
    const plot = gaugePlot.getLayer().plot;
    const scale = plot.get('scales')['value'];
    expect(scale.min).toBe(0);
    expect(scale.max).toBe(100);
    gaugePlot.destroy();
  });

  it('gauge style', () => {
    // Theme.setTheme('ali-light');
    const gaugePlot = new Gauge(canvasDiv, {
      width: 600,
      height: 650,

      value: 64,
      min: 0,
      max: 100,
      range: [20, 40, 60, 80],
      // label: (value, formatted) => `<div>${value}+++${formatted}</div>`,
      label: (value, formatted) => {
        const a = document.createElement('div');
        a.innerText = `${formatted}`;
        return a;
      },
      gaugeStyle: {
        colors: ['#1890FF', '#2FC25B', '#FACC14', '#223273', '#8543E0', '#13C2C2', '#3436C7', '#F04864'],
        // stripWidth: 30,
        // stripBackColor: '#ddd',
        // tickInterval: 20,
        // tickLabelPos: 'inner',
        // tickLabelSize: 16,
        // tickLabelColor: '#aaa',
        // tickLineColor: '#aaa',
        // subTickCount: 4,
        pointerColor: '#1890FF',
        // labelPos: [ '80%', '50%' ],
        // labelColor: '#666',
        // labelSize: 30,
      },
    });
    gaugePlot.render();
    const plot = gaugePlot.getLayer().plot;
    const colorCfg = plot.get('elements')[0].get('color').values;
    expect(colorCfg[0]).toBe('#1890FF');
    gaugePlot.destroy();
  });
});
