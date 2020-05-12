const COLOR = '#5B8FF9';

export const COLOR_PLATE_10 = [
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

export const COLOR_PLATE_20 = [
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
import { some } from '@antv/util';
import { ViewConfig } from '../base/view-layer';

export const DESCRIPTION_BOTTOM_MARGIN = function (legendPosition) {
  if (legendPosition && legendPosition.split('-')[0] === 'top') {
    return 12;
  }
  return 24;
};

export const TOP_BLEEDING = (props: ViewConfig) => {
  const titleVisible = props.title && props.title.visible;
  const descriptionVisible = props.description && props.description.visible;
  if (titleVisible || descriptionVisible) {
    // 由 title/description 的 bottom-padding 负责
    return 12;
  }
  return 24;
};

export const BOTTOM_BLEEDING = (props: ViewConfig) => {
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
  bleeding: [TOP_BLEEDING, 24, BOTTOM_BLEEDING, 24],
  padding: 'auto',
  defaultColor: COLOR, // 默认主题色
  colors: COLOR_PLATE_10,
  colors_20: COLOR_PLATE_20,
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
      autoRotateTitle: true,
      grid: {
        visible: true,
        line: {
          style: {
            stroke: 'rgba(0, 0, 0, 0.15)',
            lineWidth: 1,
            lineDash: [0, 0],
          },
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
        textStyle: {
          fill: 'rgba(0,0,0,0.45)',
          fontSize: 12,
        },
        autoRotate: false,
        autoHide: true,
      },
      title: {
        visible: false,
        spacing: 8,
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
      autoRotateTitle: false,
      grid: {
        visible: false,
        line: {
          style: {
            stroke: 'rgba(0, 0, 0, 0.15)',
            lineWidth: 1,
            lineDash: [0, 0],
          },
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
        textStyle: {
          fill: 'rgba(0,0,0,0.45)',
          fontSize: 12,
        },
        offset: 16,
        autoRotate: true,
        autoHide: true,
      },
      title: {
        visible: false,
        spacing: 8,
        style: { fill: 'rgba(0, 0, 0, 0.65)', fontSize: 12 },
      },
    },
    circle: {
      autoHideLabel: false,
      // gridType: 'line',
      grid: {
        line: {
          style: {
            lineDash: null,
            lineWidth: 1,
            stroke: 'rgba(0, 0, 0, 0.15)',
          },
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
        textStyle: {
          fill: 'rgba(0,0,0,0.45)',
          fontSize: 12,
        },
        autoRotate: true,
        autoHide: true,
      },
      title: {
        offset: 12,
        style: { fill: 'rgba(0, 0, 0, 0.65)', fontSize: 12 },
      },
    },
    radius: {
      label: {
        textStyle: {
          fill: 'rgba(0,0,0,0.45)',
          fontSize: 12,
        },
      },
    },
  },
  legend: {
    flipPage: false,
    position: 'bottom',
    // 距离panelRange的距离
    innerPadding: [16, 16, 16, 16],
    margin: [0, 24, 24, 24],
  },
  label: {
    offset: 12,
    textStyle: {
      fill: '#595959',
    },
    style: {
      fill: '#595959',
      stroke: '#ffffff',
      lineWidth: 2,
    },
  },
  tooltip: {
    'g2-tooltip': {
      boxShadow: '0px 0px 8px rgba(0,0,0,0.15)',
    },
    offset: 10,
  },
};
