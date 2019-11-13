const DEFAULT_COLOR = '#1890FF';

const COLOR_PLATE_10 = [
  '#5B8FF9',
  '#5AD8A6',
  '#5D7092',
  '#F6BD16',
  '#E8684A',
  '#6DC8EC',
  '#9270CA',
  '#FF9D4D',
  '#269A99',
  '#FF99C3',
];

const COLOR_PLATE_20 = [
  '#5B8FF9',
  '#BDD2FD',
  '#5AD8A6',
  '#BDEFDB',
  '#5D7092',
  '#C2C8D5',
  '#F6BD16',
  '#FBE5A2',
  '#E8684A',
  '#F6C3B7',
  '#6DC8EC',
  '#B6E3F5',
  '#9270CA',
  '#D3C6EA',
  '#FF9D4D',
  '#FFD8B8',
  '#269A99',
  '#AAD8D8',
  '#FF99C3',
  '#FFD6E7',
];





const DESCRIPTION_BOTTOM_MARGIN = function(legendPosition) {
  if (legendPosition && legendPosition.split('-')[0] === 'top') {
    return 0;
  }
  return 24;
};

const TOP_BLEEDING = function(props) {
  if (props.title || props.description) {
    return 16;
  }
  return 24;
};

export const DEFAULT_GLOBAL_THEME = {
  width: 400,
  height: 400,
  bleeding: [TOP_BLEEDING, 24, 24, 24],
  padding: 'auto',
  defaultColor: DEFAULT_COLOR, // 默认主题色
  colors: COLOR_PLATE_10,
  colors_20: COLOR_PLATE_20,
  title: {
    padding: [24, 24, 24, 24],
    fontFamily: 'PingFang SC',
    fontSize: 18,
    fontWeight: 'bold',
    fill: 'black',
    textAlign: 'left',
    textBaseline: 'top',
    lineHeight: 20,
    alignWithAxis: false,
  },
  description: {
    padding: [10, 24, DESCRIPTION_BOTTOM_MARGIN, 24],
    fontFamily: 'PingFang SC',
    fontSize: 12,
    fill: 'grey',
    textAlign: 'left',
    textBaseline: 'top',
    lineHeight: 16,
    alignWithAxis: false,
  },
  axis: {
    y: {
      visible: true,
      position: 'left',
      autoHideLabel: false,
      autoRotateLabel: false,
      autoRotateTitle: true,
      grid: {
        visible: true,
        style: {
          stroke: '#e3e8ec',
          lineWidth: 1,
          lineDash: [0, 0],
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
        visible: false,
        offset: 12,
        style: {
          fill: '#595959',
          fontSize: 12,
          textBaseline: 'bottom',
        },
      },
    },
    x: {
      visible: true,
      position: 'bottom',
      autoHideLabel: false,
      autoRotateLabel: false,
      autoRotateTitle: false,
      grid: {
        visible: false,
        style: {
          stroke: '#e3e8ec',
          lineWidth: 1,
          lineDash: [0, 0],
        },
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
          fill: '#a0a4aa',
          fontSize: 12,
        },
        offset: 16,
      },
      title: {
        visible: false,
        offset: 12,
        style: { fill: '#595959', fontSize: 12 },
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
        offset: 12,
        style: { fill: '#767b84', fontSize: 12 },
      },
    },
  },
  legend: {
    flipPage: false,
    position: 'bottom-center',
    // 距离panelRange的距离
    innerPadding: [16, 16, 16, 16],
  },
  label:{
    offset: 12,
    style:{
      stroke:'#ffffff',
      lineWidth:2
    }
  }
};
