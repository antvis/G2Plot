import Theme from './theme';

const commonTheme = {
  defaultPadding: [ 20, 20, 20, 20 ],
  title: {
    top_margin: 20,
    fontFamily: 'PingFang SC',
    fontSize: 18,
    fontWeight: 'bold',
    fill: 'black',
    textAlign: 'left',
    textBaseline: 'top',
    lineHeight: 20,
    alignWidthAxis: true,
  },
  description: {
    top_margin:20,
    bottom_margin: 20,
    fontFamily: 'PingFang SC',
    fontSize: 12,
    fill: 'grey',
    textAlign: 'left',
    textBaseline: 'top',
    lineHeight: 16,
    alignWidthAxis: true,
  },
  axis: {
    y: {
      visible: true,
      position: 'left',
      autoHideLabel: false,
      autoRotateLabel: true,
      autoRotateTitle: true,
      grid: {
        visible: true,
        style: {
          stroke: '#E3E8EC',
          lineWidth: 1,
          lineDash: [ 0, 0 ],
        },
      },
      line: {
        visible: false,
        style: {
          stroke: '#BFBFBF',
          lineWidth: 1,
        },
      },
      tickLine: {
        visible: false,
        style: {
          stroke: '#bdc8d3',
          lineWidth: 0.5,
          length: 4,
        },
      },
      label: {
        visible: true,
        offset: 8,
        style: {
          fill: '#a0a4aa',
          fontSize: 12,
        },
      },
      title: {
        visible: true,
        offset: 48,
        style: {
          fill: '#767b84',
          fontSize: 12,
        },
      },
    },
    x: {
      visible: true,
      position: 'bottom',
      autoHideLabel: false,
      autoRotateLabel: true,
      autoRotateTitle: true,
      grid: {
        visible: false,
      },
      line: {
        visible: false,
      },
      tickLine: {
        visible: true,
        style: {
          length: 4,
          stroke: '#bdc8d3',
          lineWidth: 0.5,
        },
      },
      label: {
        visible: true,
        style: {
          fill: '#a0a4aa', fontSize: 12,
        },
        offset: 16,
      },
      title: {
        visible: false,
        offset: 48,
        style: { fill: '#767b84', fontSize: 12 },
      },
    },
    circle: {
      autoHideLabel: false,
      autoRotateLabel: true,
      autoRotateTitle: true,
      // gridType: 'line',
      grid: {
        style: {
          lineDash: null,
          lineWidth: 1,
          stroke: '#E3E8EC',
        },
      },
      line: {
        style: {
          lineWidth: 1,
          stroke: '#BFBFBF',
        },
      },
      tickLine: {
        style: {
          lineWidth: 1,
          stroke: '#bdc8d3',
          length: 4,
          alignWithLabel: true,
        },
      },
      label: {
        offset: 16,
        style: {
          fill: '#a0a4aa',
          fontSize: 12,
        },
      },
      title: {
        offset: 48,
        style: { fill: '#767b84', fontSize: 12 },
      },
    },
  },
};

const theme = new Theme('default');
theme.registerGlobalTheme(commonTheme);
// theme.registerPlotTheme('bar', {
//   axis: {
//     x: {
//       visible: false,
//       position: 'top',
//       line: {
//         visible: false
//       },
//     },
//     y: {
//       visible: false,
//       line: {
//         visible: false,
//       },
//     }
//   }
// });

// theme.registerPlotTheme('column', {
//   axis: {
//     x: {
//       visible: false,
//       position: 'top',
//       line: {
//         visible: false
//       },
//     },
//     y: {
//       visible: false,
//       line: {
//         visible: false,
//       },
//     }
//   }
// });

export default theme;
