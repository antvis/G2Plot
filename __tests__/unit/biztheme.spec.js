import { StackBar, Pie, Line, GroupColumn } from '../../src';
import Theme from '../../src/theme/theme';
import genTheme from './genTheme';


const lightThemeCfg = genTheme({
  colors: [ '#718DFF', '#25DFD2', '#B89BFF', '#61D5FF', '#FF9CE5', '#7D8CDB', '#8ABDE5', '#FEB46D', '#FFD76E', '#FF8B8B' ],
  backgroundColor: '#fff',
  fontFamily: '"-apple-system", BlinkMacSystemFont, "Segoe UI", Roboto,"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",SimSun, "sans-serif"',
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
        text: '饼图一般用于观察数据占比成双成对开始就发动机佛得角粉底及佛；低筋粉',
      },
      label: {
        visible: true,
      },
      padding: 'auto'
      // padding: 0,
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
      },
      title: {
        text: '这是一个条形图',
      },
      description: {
        text: '测试得分就哦了发链接据占比成双成对开始就发动机佛得角粉底及佛；低筋粉',
      },
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
      },
      title: {
        text: '这是一个柱状图但除了',
      },
      label: {
        visible: true,
      },
      description: {
        text: '测试得分就哦了发链接据占比成双成对开始就发动机佛得角粉底及佛；低筋粉',
      },
    });
    barPlot2.render();

    const linePlot = new Line(canvasDiv, {
      data,
      xField: 'year',
      yField: 'value',
      seriesField: 'type',
      title: {
        text: '这是一个折线图xxxs但除了',
      },
      description: {
        text: '测试得分就哦了发链接据占比成双成对开始就发动机佛得角粉底及佛；低筋粉',
      },
    });
    linePlot.render();

    const linePlot2 = new Line(canvasDiv, {
      data: data2,
      xField: 'year',
      yField: 'value',
      color: 'red',
      point: {
        visible: true,
      },
      // title: {
      //   text: '这是一个xxx',
      // },
      // description: {
      //   text: 'xxx一般用于观察数据占比成双成对开始就发动机佛得角粉底及佛；低筋粉',
      // },
      // label: {
      //   visible: true,
      // },
      padding: 'auto'
      // padding: 0,
    });
    linePlot2.render();

  });

});
