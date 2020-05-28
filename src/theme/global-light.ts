import { COLOR_PALETTE } from './color';

export const DESCRIPTION_BOTTOM_MARGIN = function (legendPosition) {
  if (legendPosition && legendPosition.split('-')[0] === 'top') {
    return 12;
  }
  return 24;
};

const axis_label_offset = 8;

const axis_title_spacing = 12;

const axis_title_style = {
  fill: COLOR_PALETTE.greyScale['0.6'],
};

const axis_line_style = {
  stroke: COLOR_PALETTE.greyScale['0.4'],
  lineWidth: 1,
};

const axis_grid_line_style = {
  stroke: COLOR_PALETTE.greyScale['0.2'],
  lineWidth: 1,
  lineDash: null,
};

const axis_tickLine_style = {
  stroke: COLOR_PALETTE.greyScale['0.4'],
  lineWidth: 0.5,
  length: 4,
};

const axis_label_text_style = {
  fill: COLOR_PALETTE.greyScale['0.4'],
  fontSize: 12,
};

const xAxis_value = {
  visible: true,
  position: 'bottom',
  title: {
    visible: false,
    spacing: axis_title_spacing,
    style: axis_title_style,
  },
  line: {
    visible: true,
    style: axis_line_style,
  },
  grid: {
    visible: false,
    line: {
      style: axis_grid_line_style,
    },
    alternateColor: null,
  },
  tickLine: {
    visible: true,
    style: axis_tickLine_style,
  },
  label: {
    visible: true,
    offset: axis_label_offset,
    textStyle: axis_label_text_style,
    autoFormat: false,
    autoFormatUnit: 1000,
    autoFormatSuffix: 'k',
    autoRotate: false,
    autoHide: false,
  },
  overlapOrder: ['autoFormat', 'autoRotate', 'autoHide'],
};

const yAxis_value = {
  visible: true,
  position: 'left',
  title: {
    visible: false,
    spacing: axis_title_spacing,
    style: axis_title_style,
  },
  line: {
    visible: false,
    style: axis_line_style,
  },
  grid: {
    visible: true,
    line: {
      style: axis_grid_line_style,
    },
    alternateColor: null,
  },
  tickLine: {
    visible: true,
    style: axis_tickLine_style,
  },
  label: {
    visible: true,
    offset: axis_label_offset,
    textStyle: axis_label_text_style,
    autoFormat: false,
    autoFormatUnit: 1000,
    autoFormatSuffix: 'k',
    autoRotate: false,
    autoHide: true,
  },
  overlapOrder: ['autoFormat', 'autoHide'],
};

const xAxis_category = {
  visible: true,
  position: 'bottom',
  title: {
    visible: false,
    spacing: axis_title_spacing,
    style: axis_title_style,
  },
  line: {
    visible: true,
    style: axis_line_style,
  },
  grid: {
    visible: false,
    line: {
      style: axis_grid_line_style,
    },
    alternateColor: null,
  },
  tickLine: {
    visible: false,
    style: axis_tickLine_style,
  },
  label: {
    visible: true,
    offset: axis_label_offset,
    textStyle: axis_label_text_style,
    autoWrap: false,
    autoEllipsisPosition: 'tail',
    autoEllipsis: false,
    autoRotate: false,
  },
  overlapOrder: ['autoWrap', 'autoEllipsis', 'autoRotate'],
};

const yAxis_category = {
  visible: true,
  position: 'left',
  title: {
    visible: false,
    spacing: axis_title_spacing,
    style: axis_title_style,
  },
  line: {
    visible: false,
    style: axis_line_style,
  },
  grid: {
    visible: true,
    line: {
      style: axis_grid_line_style,
    },
    alternateColor: null,
  },
  tickLine: {
    visible: false,
    style: axis_tickLine_style,
  },
  label: {
    visible: true,
    offset: axis_label_offset,
    textStyle: axis_label_text_style,
    autoWrap: false,
    autoEllipsisPosition: 'tail',
    autoEllipsis: false,
    autoRotate: false,
  },
  overlapOrder: ['autoWrap', 'autoEllipsis'],
};

const xAxis_time = {
  visible: true,
  position: 'bottom',
  title: {
    visible: false,
    spacing: axis_title_spacing,
    style: axis_title_style,
  },
  line: {
    visible: true,
    style: axis_line_style,
  },
  grid: {
    visible: false,
    line: {
      style: axis_grid_line_style,
    },
    alternateColor: null,
  },
  tickLine: {
    visible: true,
    style: axis_tickLine_style,
  },
  label: {
    visible: true,
    offset: axis_label_offset,
    textStyle: axis_label_text_style,
    autoEllipsis: false,
    autoRotate: false,
    autoHide: false,
  },
  overlapOrder: ['autoEllipsis', 'autoRotate', 'autoHide'],
};

const yAxis_time = {
  visible: true,
  position: 'left',
  title: {
    visible: false,
    spacing: axis_title_spacing,
    style: axis_title_style,
  },
  line: {
    visible: false,
    style: axis_line_style,
  },
  grid: {
    visible: true,
    line: {
      style: axis_grid_line_style,
    },
    alternateColor: null,
  },
  tickLine: {
    visible: false,
    style: axis_tickLine_style,
  },
  label: {
    visible: true,
    offset: axis_label_offset,
    textStyle: axis_label_text_style,
    autoEllipsis: false,
    autoRotate: false,
    autoHide: false,
  },
  overlapOrder: ['autoEllipsis', 'autoHide'],
};

const radiusAxis = {
  visible: true,
  grid: {
    visible: true,
    line: {
      style: axis_grid_line_style,
    },
    alternateColor: ['rgba(0, 0, 0, 0.04)', null],
  },
  line: {
    visible: true,
    style: axis_line_style,
  },
  tickLine: {
    visible: true,
    style: axis_tickLine_style,
  },
  label: {
    offset: axis_label_offset,
    textStyle: axis_label_text_style,
    autoRotate: true,
    autoHide: true,
  },
  title: {
    visible: false,
    offset: axis_title_spacing,
    style: axis_title_style,
  },
};

const angleAxis = {
  visible: true,
  grid: {
    visible: true,
    line: {
      visible: true,
      style: axis_grid_line_style,
    },
  },
  line: {
    visible: true,
    style: axis_line_style,
  },
  label: {
    visible: true,
    offset: axis_label_offset,
    textStyle: axis_label_text_style,
  },
  tickLine: {
    visible: false,
    style: axis_tickLine_style,
  },
  title: {
    visible: false,
    spacing: axis_title_spacing,
    style: axis_title_style,
  },
};

export const GLOBAL_LIGHT_THEME = {
  /* 图表级 */
  width: 400,
  height: 400,
  bleeding: [24, 24, 24, 24],
  forceFit: true,
  backgroundStyle: null,
  panelStyle: null,
  /* 图形级 */
  defaultColor: COLOR_PALETTE.default,
  colorPalette: {
    type: 'qualitative',
    colors: [COLOR_PALETTE.qualitative['10'], COLOR_PALETTE.qualitative['20']],
  },
  /** 组件级 */
  title: {
    visible: false,
    alignTo: 'left',
    padding: [24, 24, 24, 24],
    style: {
      fontFamily: 'PingFang SC',
      fontSize: 18,
      fill: COLOR_PALETTE.greyScale['0'],
      textAlign: 'left',
      textBaseline: 'top',
      lineHeight: 20,
    },
  },
  description: {
    visible: false,
    alignTo: 'left',
    padding: [10, 24, DESCRIPTION_BOTTOM_MARGIN, 24],
    style: {
      fontFamily: 'PingFang SC',
      fontSize: 12,
      fill: COLOR_PALETTE.greyScale['0.6'],
      textAlign: 'left',
      textBaseline: 'top',
      lineHeight: 16,
    },
  },
  xAxis: {
    value: xAxis_value,
    category: xAxis_category,
    time: xAxis_time,
  },
  yAxis: {
    value: yAxis_value,
    category: yAxis_category,
    time: yAxis_time,
  },
  angleAxis,
  radiusAxis,
};
