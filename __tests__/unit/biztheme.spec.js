import { StackBar, Pie, Line, GroupColumn } from '../../src';
import Theme from '../../src/theme/theme';
import { expect } from 'chai';
import genTheme from './genTheme';


const lightThemeCfg = genTheme({
  colors: [ '#5574f0', '#25dfd2', '#ac92ed', '#5fc8ff', '#ec87d1', '#7986cb', '#8abde5', '#feb46d', '#ffd76e', '#ff8b8b' ],
  backgroundColor: '#fff',
  fontFamily: '',
  fontSizeTitle: 26,
  fontColorTitle: '#36415E',
  fontSizeSubTitle: 14,
  fontColorSubTitle: '#676e7f',
  fontSizeLabel: 12,
  fontColorLabel: '#8f9aa7',
  lineColor: '#dbe2e9',
});

describe('主题测试', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '500px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  const lightTheme = new Theme('test-light');
  lightTheme.registerGlobalTheme(lightThemeCfg);

  const data = [ {
    year: '1991',
    value: 3,
    type: 'Lon'
  }, {
    year: '1992',
    value: 4,
    type: 'Lon'
  }, {
    year: '1993',
    value: 3.5,
    type: 'Lon'
  }, {
    year: '1994',
    value: 5,
    type: 'Lon'
  }, {
    year: '1995',
    value: 4.9,
    type: 'Lon'
  }, {
    year: '1996',
    value: 6,
    type: 'Lon'
  }, {
    year: '1997',
    value: 7,
    type: 'Lon'
  }, {
    year: '1998',
    value: 9,
    type: 'Lon'
  }, {
    year: '1999',
    value: 13,
    type: 'Lon'
  }, {
    year: '1991',
    value: 9,
    type: 'Bor'
  }, {
    year: '1992',
    value: 9,
    type: 'Bor'
  }, {
    year: '1993',
    value: 13.5,
    type: 'Bor'
  }, {
    year: '1994',
    value: 7,
    type: 'Bor'
  }, {
    year: '1995',
    value: 1,
    type: 'Bor'
  }, {
    year: '1996',
    value: 9,
    type: 'Bor'
  }, {
    year: '1997',
    value: 9.7,
    type: 'Bor'
  }, {
    year: '1998',
    value: 3,
    type: 'Bor'
  }, {
    year: '1999',
    value: 8,
    type: 'Bor'
  }, ];

  const data2 = [ {
    year: '1991',
    value: 3,
    type: 'Lon'
  }, {
    year: '1992',
    value: 4,
    type: 'Lon'
  }, {
    year: '1993',
    value: 3.5,
    type: 'Lon'
  }, {
    year: '1994',
    value: 5,
    type: 'Lon'
  }, {
    year: '1995',
    value: 4.9,
    type: 'Lon'
  }, {
    year: '1996',
    value: 6,
    type: 'Lon'
  }, {
    year: '1997',
    value: 7,
    type: 'Lon'
  }, {
    year: '1998',
    value: 9,
    type: 'Lon'
  }, {
    year: '1999',
    value: 13,
    type: 'Lon'
  }, ];

  it('全局主题 默认色', () => {
    Theme.setTheme('test-light');

    const piePlot = new Pie(canvasDiv, {
      data: data2,
      angleField: 'value',
      colorField: 'year',
      title: {
        text: '这是一个饼图',
      },
      description: {
        text: '饼图一般用于观察数据占比',
      },
      padding: 'auto',
      legend: {
        position: 'bottom'
      }
    });
    piePlot.render();

    const barPlot = new StackBar(canvasDiv, {
      data,
      padding: 'auto',
      xField: 'value',
      yField: 'year',
      stackField: 'year',
      yAxis: {
        min: 0
      }
    });
    barPlot.render();

    const barPlot2 = new GroupColumn(canvasDiv, {
      data,
      padding: 'auto',
      xField: 'year',
      yField: 'value',
      groupField: 'type',
      yAxis: {
        min: 0
      }
    });
    barPlot2.render();

    const linePlot = new Line(canvasDiv, {
      data,
      xField: 'year',
      yField: 'value',
      seriesField: 'type'
    });
    linePlot.render();

  });

});
