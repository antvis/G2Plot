import Theme from './theme';

const commonConfig = {
  defaultColor: '#718DFF',
  colors: [
    '#718DFF',
    '#25DFD2',
    '#B89BFF',
    '#61D5FF',
    '#FF9CE5',
    '#7D8CDB',
    '#8ABDE5',
    '#FEB46D',
    '#FFD76E',
    '#FF8B8B',
  ],
  backgroundStyle: {
    fill: '#3C4454',
  },
  title: {
    /*tslint:disable*/
    fontFamily:
      "'-apple-system', BlinkMacSystemFont, 'Segoe UI', Roboto,'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',SimSun, 'sans-serif'",
    fontSize: 26,
    fill: '#fff',
  },
  description: {
    /*tslint:disable*/
    fontFamily:
      "'-apple-system', BlinkMacSystemFont, 'Segoe UI', Roboto,'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',SimSun, 'sans-serif'",
    fontSize: 14,
    fill: '#ABACB9',
  },
  axis: {
    y: {
      grid: {
        style: {
          stroke: '#676E7F',
        },
      },
      line: {
        style: {
          stroke: '#676E7F',
        },
      },
      tickLine: {
        style: {
          stroke: '#676E7F',
        },
      },
      label: {
        style: {
          fill: '#DFDFDF',
          fontSize: 12,
        },
      },
      title: {
        style: {
          fill: '#DFDFDF',
          fontSize: 12,
        },
      },
    },
    x: {
      grid: {
        visible: false,
        style: {
          stroke: '#676E7F',
        },
      },
      line: {
        visible: false,
        style: {
          stroke: '#676E7F',
        },
      },
      tickLine: {
        visible: true,
        style: {
          stroke: '#676E7F',
        },
      },
      label: {
        visible: true,
        style: {
          fill: '#DFDFDF',
          fontSize: 12,
        },
      },
      title: {
        visible: false,
        style: {
          fill: '#DFDFDF',
          fontSize: 12,
        },
      },
    },
    circle: {
      grid: {
        style: {
          stroke: '#676E7F',
        },
      },
      line: {
        style: {
          stroke: '#676E7F',
        },
      },
      tickLine: {
        style: {
          stroke: '#676E7F',
        },
      },
      label: {
        style: {
          fill: '#DFDFDF',
          fontSize: 12,
        },
      },
      title: {
        style: {
          fill: '#DFDFDF',
          fontSize: 12,
        },
      },
    },
  },
  defaultLegendPosition: 'top-left',
  shape: {
    area: {
      area: {
        default: {
          fill: '#718DFF',
        },
      },
      smooth: {
        default: {
          fill: '#718DFF',
        },
      },
      line: {
        default: {
          stroke: '#718DFF',
        },
      },
      smoothLine: {
        default: {
          stroke: '#718DFF',
        },
      },
    },
    box: {
      box: {
        default: {
          stroke: '#718DFF',
        },
      },
    },
    edge: {
      line: {
        default: {
          stroke: '#718DFF',
        },
      },
      vhv: {
        default: {
          stroke: '#718DFF',
        },
      },
      smooth: {
        default: {
          stroke: '#718DFF',
        },
      },
      arc: {
        default: {
          stroke: '#718DFF',
        },
      },
    },
    interval: {
      rect: {
        default: {
          fill: '#718DFF',
          fillOpacity: 1,
        },
      },
      hollowInterval: {
        default: {
          stroke: '#718DFF',
        },
      },
      line: {
        default: {
          stroke: '#718DFF',
        },
      },
      tick: {
        default: {
          stroke: '#718DFF',
        },
      },
      funnel: {
        default: {
          fill: '#718DFF',
          fillOpacity: 1,
        },
      },
      pyramid: {
        default: {
          fill: '#718DFF',
          fillOpacity: 1,
        },
      },
      'top-line': {
        default: {
          fill: '#718DFF',
          fillOpacity: 1,
        },
      },
    },
    kline: {
      kline: {
        default: {
          fill: '#718DFF',
          stroke: '#718DFF',
        },
      },
    },
    line: {
      line: {
        default: {
          stroke: '#718DFF',
        },
      },
      dot: {
        default: {
          stroke: '#718DFF',
        },
      },
      dash: {
        default: {
          stroke: '#718DFF',
        },
      },
      smooth: {
        default: {
          stroke: '#718DFF',
        },
      },
      hv: {
        default: {
          stroke: '#718DFF',
        },
      },
      vh: {
        default: {
          stroke: '#718DFF',
        },
      },
      hvh: {
        default: {
          stroke: '#718DFF',
        },
      },
      vhv: {
        default: {
          stroke: '#718DFF',
        },
      },
    },
    polygon: {
      polygon: {
        default: {
          fill: '#718DFF',
          fillOpacity: 1,
        },
      },
      hollow: {
        default: {
          stroke: '#718DFF',
        },
      },
    },
    point: {
      circle: {
        default: {
          fill: '#718DFF',
          fillOpacity: 1,
        },
      },
      square: {
        default: {
          fill: '#718DFF',
          fillOpacity: 1,
        },
      },
      bowtie: {
        default: {
          fill: '#718DFF',
          fillOpacity: 1,
        },
      },
      diamond: {
        default: {
          fill: '#718DFF',
          fillOpacity: 1,
        },
      },
      hexagon: {
        default: {
          fill: '#718DFF',
          fillOpacity: 1,
        },
      },
      triangle: {
        default: {
          fill: '#718DFF',
          fillOpacity: 1,
        },
      },
      triangleDown: {
        default: {
          fill: '#718DFF',
          fillOpacity: 1,
        },
      },
      hollowCircle: {
        default: {
          stroke: '#718DFF',
        },
      },
      hollowSquare: {
        default: {
          stroke: '#718DFF',
        },
      },
      hollowBowtie: {
        default: {
          stroke: '#718DFF',
        },
      },
      hollowDiamond: {
        default: {
          stroke: '#718DFF',
        },
      },
      hollowHexagon: {
        default: {
          stroke: '#718DFF',
        },
      },
      hollowTriangle: {
        default: {
          stroke: '#718DFF',
        },
      },
      hollowTriangleDown: {
        default: {
          stroke: '#718DFF',
        },
      },
      cross: {
        default: {
          stroke: '#718DFF',
        },
      },
      tick: {
        default: {
          stroke: '#718DFF',
        },
      },
      plus: {
        default: {
          stroke: '#718DFF',
        },
      },
      hyphen: {
        default: {
          stroke: '#718DFF',
        },
      },
      line: {
        default: {
          stroke: '#718DFF',
        },
      },
      rect: {
        default: {
          fill: '#718DFF',
          fillOpacity: 1,
        },
      },
      image: {
        default: {
          fill: '#718DFF',
          fillOpacity: 1,
        },
      },
      path: {
        default: {
          fill: '#718DFF',
          fillOpacity: 1,
        },
      },
    },
    text: {
      text: {
        default: {
          fill: '#718DFF',
        },
      },
    },
  },
  label: {
    textStyle: {
      fontSize: 12,
      fill: '#DFDFDF',
      /*tslint:disable*/
      fontFamily:
        "'-apple-system', BlinkMacSystemFont, 'Segoe UI', Roboto,'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',SimSun, 'sans-serif'",
    },
  },
  treemapLabels: {
    textStyle: {
      fill: '#DFDFDF',
      fontSize: 12,
      /*tslint:disable*/
      fontFamily:
        "'-apple-system', BlinkMacSystemFont, 'Segoe UI', Roboto,'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',SimSun, 'sans-serif'",
    },
  },
  innerLabels: {
    textStyle: {
      fill: '#DFDFDF',
      fontSize: 12,
      /*tslint:disable*/
      fontFamily:
        "'-apple-system', BlinkMacSystemFont, 'Segoe UI', Roboto,'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',SimSun, 'sans-serif'",
    },
  },
  legend: {
    right: {
      textStyle: {
        fill: '#DFDFDF',
        fontSize: 12,
        /*tslint:disable*/
        fontFamily:
          "'-apple-system', BlinkMacSystemFont, 'Segoe UI', Roboto,'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',SimSun, 'sans-serif'",
      },
      titleStyle: {
        fill: '#DFDFDF',
        fontSize: 12,
        /*tslint:disable*/
        fontFamily:
          "'-apple-system', BlinkMacSystemFont, 'Segoe UI', Roboto,'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',SimSun, 'sans-serif'",
      },
    },
    left: {
      textStyle: {
        fill: '#DFDFDF',
        fontSize: 12,
        /*tslint:disable*/
        fontFamily:
          "'-apple-system', BlinkMacSystemFont, 'Segoe UI', Roboto,'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',SimSun, 'sans-serif'",
      },
      titleStyle: {
        fill: '#DFDFDF',
        fontSize: 12,
        /*tslint:disable*/
        fontFamily:
          "'-apple-system', BlinkMacSystemFont, 'Segoe UI', Roboto,'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',SimSun, 'sans-serif'",
      },
    },
    top: {
      textStyle: {
        fill: '#DFDFDF',
        fontSize: 12,
        /*tslint:disable*/
        fontFamily:
          "'-apple-system', BlinkMacSystemFont, 'Segoe UI', Roboto,'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',SimSun, 'sans-serif'",
      },
      titleStyle: {
        fill: '#DFDFDF',
        fontSize: 12,
        /*tslint:disable*/
        fontFamily:
          "'-apple-system', BlinkMacSystemFont, 'Segoe UI', Roboto,'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',SimSun, 'sans-serif'",
      },
    },
    bottom: {
      textStyle: {
        fill: '#DFDFDF',
        fontSize: 12,
        /*tslint:disable*/
        fontFamily:
          "'-apple-system', BlinkMacSystemFont, 'Segoe UI', Roboto,'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',SimSun, 'sans-serif'",
      },
      titleStyle: {
        fill: '#DFDFDF',
        fontSize: 12,
        /*tslint:disable*/
        fontFamily:
          "'-apple-system', BlinkMacSystemFont, 'Segoe UI', Roboto,'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',SimSun, 'sans-serif'",
      },
    },
    html: {
      backgroundStyle: {
        fontSize: 12,
        /*tslint:disable*/
        fontFamily:
          "'-apple-system', BlinkMacSystemFont, 'Segoe UI', Roboto,'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',SimSun, 'sans-serif'",
        color: '#DFDFDF',
      },
    },
  },
  tooltip: {
    useHtml: true,
    'g2-tooltip': {
      'background-color': 'rgba(255, 255, 255, 0.9)',
      color: '#3c4454',
      boxShadow: null,
      fontSize: '12px',
      /*tslint:disable*/
      fontFamily:
        "'-apple-system', BlinkMacSystemFont, 'Segoe UI', Roboto,'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',SimSun, 'sans-serif'",
    },
  },
};

const theme = new Theme('ali-dark');
theme.registerGlobalTheme(commonConfig);

theme.registerPlotTheme('liquid', {
  color: '#FEB46D',
  borderWidth: 10,
  borderOpacity: 0.2,
  fontColor: '#FFEECC',
  fontOpacity: 1,
});

theme.registerPlotTheme('gauge', {
  stripWidth: 30,
  stripBackColor: '#ddd',
  tickInterval: 20,
  tickLabelPos: 'inner',
  tickLabelSize: 16,
  tickLabelColor: '#aaa',
  tickLineColor: '#aaa',
  subTickCount: 4,
  labelPos: ['50%', '80%'],
  labelColor: '#666',
  labelSize: 30,
});

export default theme;
