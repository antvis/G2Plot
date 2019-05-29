import Theme from './theme';

const commonTheme = {
  title:{
    fontFamily: 'PingFang SC',
    fontSize: 18,
    fontWeight: 'bold',
    fill: 'black',
    textAlign: 'left',
    textBaseline:'bottom',
    lineHeight: 20,
  },
  description: {
    fontFamily: 'PingFang SC',
    fontSize: 12,
    fill: 'grey',
    textAlign: 'left',
    textBaseline:'bottom',
    lineHeight: 16,
  },
  description_top_margin: 20,
  axis:{
    y: {
      visible: true,
      position: 'left',
      autoHideLabel: false,
      autoRotateLabel: true,
      autoRotateTitle: true,
      grid:{
        visible: true,
        stroke: 'red',
      },
      line: {
        visible: true,
        stroke: 'black',
        lineWidth: 1
      },
      tickLine: {
        visible: true,
        stroke: 'green',
        lineWidth: 3,
        length: 10
      },
      label: {
        visible: true,
        offset: 8,
        textStyle: {
          fill: 'purple'
        }
      },
      title:{
        visible: true,
        offset: 48,
      },
    },
    x:{
      visible: true,
      position: 'bottom',
      autoHideLabel: false,
      autoRotateLabel: true,
      autoRotateTitle: true,
      grid: {
        visible: false,
      },
      line: {
        visible: true,
        stroke: 'black',
        lineWidth: 3
      },
      tickLine: {
        visible: true,
        length: 10,
        stroke: 'purple',
       },
      label: {
        visible: true,
        textStyle: {
          fill: 'gray',
          fontSize: 20
        }
      },
      title:{
        visible: false
      },
    },
    circle:{
      autoHideLabel: false,
      autoRotateLabel: true,
      autoRotateTitle: true,
      // gridType: 'line',
      grid: {
        lineDash:null,
        lineWidth: 1,
        stroke: '#E3E8EC',
      },
      line: {
        lineWidth: 1,
        stroke: '#BFBFBF',
      },
      tickLine: {
        lineWidth: 1,
        stroke: '#bdc8d3',
        length: 4,
        alignWithLabel: true,
      },
      label: {
        offset: 16,
        textStyle:{ fill:'#a0a4aa', fontSize:12 },
      },
      title:{
        offset:48,
        textStyle: { fill:'#767b84', fontSize:12 },
      },
    },
  }
};

const theme = new Theme('default');
theme.registerGlobalTheme(commonTheme);
theme.registerPlotTheme('bar', {
  axis: {
    x: {
      visible: false,
      position: 'top',
      line: {
        visible: false
      },
    },
    y: {
      visible: false,
      line: {
        visible: false,
      },
    }
  }
});

theme.registerPlotTheme('column', {
  axis: {
    x: {
      visible: false,
      position: 'top',
      line: {
        visible: false
      },
    },
    y: {
      visible: false,
      line: {
        visible: false,
      },
    }
  }
});

export default theme;