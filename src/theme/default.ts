const DESCRIPTION_BOTTOM_MARGIN = function(legendPosition) {
  if (legendPosition && legendPosition.split('-')[0] === 'top') {
    return 12;
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
  defaultColor: '#5B8FF9',
  bleeding: [TOP_BLEEDING, 24, 24, 24],
  padding: 'auto',
  title: {
    padding: [24, 24, 24, 24],
    fontFamily: 'PingFang SC',
    fontSize: 18,
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
        style: {
          stroke: '#BFBFBF',
          lineWidth: 1,
        },
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
  label: {
    offset: 12,
    style: {
      fill: 'rgba(0, 0, 0, 0.95)',
      stroke:'#ffffff',
      lineWidth:2
    },
  },
};
