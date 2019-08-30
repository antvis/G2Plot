import { Gauge } from '../../src';
import Theme from '../../src/theme/theme';

describe('Gauge plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  it.only('gauge', () => {
    Theme.setTheme('ali-light');
    const gaugePlot = new Gauge(canvasDiv, {
      title: {
        text: '水位图测试',
      },
      description: {
        text: '水位图用来展示数据在总集合中的占比情况，通过水位的样式展示信息。',
      },
      width: 600,
      height: 650,

      value: 64,
      min: 0,
      max: 100,
      range: [20, 40, 60, 80],
      label: true,
      // label: (value, formatted) => `<div>${value}+++${formatted}</div>`,
      format: (d) => `[${d}]`,
      gaugeStyle: {
        // colors: [ '#1890FF', '#2FC25B', '#FACC14', '#223273', '#8543E0', '#13C2C2', '#3436C7', '#F04864' ],
        // stripWidth: 30,
        // stripBackColor: '#ddd',
        // tickInterval: 20,
        // tickLabelPos: 'inner',
        // tickLabelSize: 16,
        // tickLabelColor: '#aaa',
        // tickLineColor: '#aaa',
        // subTickCount: 4,
        // pointerColor: '#1890FF',
        // labelPos: [ '80%', '50%' ],
        // labelColor: '#666',
        // labelSize: 30,
      },
    });
    gaugePlot.render();
  });
});
