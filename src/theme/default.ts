import * as G2 from '@antv/g2';
import * as _ from '@antv/util';

const G2_DEFAULT_THEME = G2.Global.theme;

const themeConfig: G2.Interface.DataPointType =  {
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
    left: {
      autoHideLabel: false,
      autoRotateLabel: true,
      autoRotateTitle: true,
      grid:{
        stroke:'#E3E8EC',
        lineWidth: 1,
        lineDash: [ 0, 0 ],
      },
      line: {  },
      tickLine: {  },
      label: {
        offset: 8,
        textStyle:{ fill:'#a0a4aa', fontSize:12 },
      },
      title:{
        offset: 48,
        textStyle: { fill:'#767b84', fontSize:12 },
      },
    },
    bottom:{
      autoHideLabel: false,
      autoRotateLabel: true,
      autoRotateTitle: true,
      grid:{},
      line: {  },
      tickLine: { length: 4, stroke:'#bdc8d3', lineWidth:0.5 },
      label: {
        offset: 16,
        textStyle:{ fill:'#a0a4aa', fontSize:12 },
      },
      title:{
        offset:48,
        textStyle: { fill:'#767b84', fontSize:12 },
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
  },
};

const plot_global_theme = _.assign(G2_DEFAULT_THEME, themeConfig);

G2.registerTheme('plot-global', G2_DEFAULT_THEME);
