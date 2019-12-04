import { some } from '@antv/util';
import { ViewConfig } from '../base/view-layer';

const DESCRIPTION_BOTTOM_MARGIN = function(legendPosition) {
  if (legendPosition && legendPosition.split('-')[0] === 'top') {
    return 12;
  }
  return 24;
};

const TOP_BLEEDING = (props: ViewConfig) => {
  if (props.title || props.description) {
    return 16;
  }
  return 24;
};

const BOTTOM_BLEEDING = (props: ViewConfig) => {
  if (
    some(
      props.interactions || [],
      (interaction) =>
        (interaction.type === 'slider' || interaction.type === 'scrollbar') &&
        (interaction.cfg && interaction.cfg.type) !== 'vertical'
    )
  ) {
    return 8;
  }
  return 24;
};

export const DEFAULT_GLOBAL_THEME = {
  width: 400,
  height: 400,
  defaultColor: '#5B8FF9',
  bleeding: [TOP_BLEEDING, 24, BOTTOM_BLEEDING, 24],
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
          stroke: 'rgba(0, 0, 0, 0.15)',
          lineWidth: 1,
          lineDash: [0, 0],
        },
      },
      line: {
        visible: false,
        style: {
          stroke: 'rgba(0, 0, 0, 0.45)',
          lineWidth: 1,
        },
      },
      tickLine: {
        visible: false,
        style: {
          stroke: 'rgba(0,0,0,0.45)',
          lineWidth: 0.5,
          length: 4,
        },
      },
      label: {
        visible: true,
        offset: 8,
        style: {
          fill: 'rgba(0,0,0,0.45)',
          fontSize: 12,
        },
      },
      title: {
        visible: false,
        offset: 12,
        style: {
          fill: 'rgba(0, 0, 0, 0.65)',
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
          stroke: 'rgba(0, 0, 0, 0.15)',
          lineWidth: 1,
          lineDash: [0, 0],
        },
      },
      line: {
        visible: false,
        style: {
          stroke: 'rgba(0, 0, 0, 0.45)',
          lineWidth: 1,
        },
      },
      tickLine: {
        visible: true,
        style: {
          length: 4,
          stroke: 'rgba(0, 0, 0, 0.45)',
          lineWidth: 0.5,
        },
      },
      label: {
        visible: true,
        style: {
          fill: 'rgba(0,0,0,0.45)',
          fontSize: 12,
        },
        offset: 16,
      },
      title: {
        visible: false,
        offset: 12,
        style: { fill: 'rgba(0, 0, 0, 0.65)', fontSize: 12 },
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
          stroke: 'rgba(0, 0, 0, 0.15)',
        },
      },
      line: {
        style: {
          lineWidth: 1,
          stroke: 'rgba(0, 0, 0, 0.45)',
        },
      },
      tickLine: {
        style: {
          lineWidth: 1,
          stroke: 'rgba(0, 0, 0, 0.45)',
          length: 4,
          alignWithLabel: true,
        },
      },
      label: {
        offset: 16,
        style: {
          fill: 'rgba(0,0,0,0.45)',
          fontSize: 12,
        },
      },
      title: {
        offset: 12,
        style: { fill: 'rgba(0, 0, 0, 0.65)', fontSize: 12 },
      },
    },
  },
  legend: {
    flipPage: false,
    position: 'bottom-center',
    // 距离panelRange的距离
    innerPadding: [16, 16, 16, 16],
    margin: [0, 24, 24, 24],
  },
  label: {
    offset: 12,
    style: {
      fill: 'rgba(0, 0, 0, 0.65)',
      stroke: '#ffffff',
      lineWidth: 2,
    },
  },
  tooltip: {
    'g2-tooltip': {
      boxShadow: '0px 0px 8px rgba(0,0,0,0.15)',
    },
  },
};
