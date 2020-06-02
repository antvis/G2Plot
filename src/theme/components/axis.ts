import { deepMix } from '@antv/util';
import { COLOR_PALETTE } from '../color';

const axis_label_offset = 8;

const axis_title_spacing = 12;

const axis_title_style_light = {
  fill: COLOR_PALETTE.greyScale['0.7'],
};

const axis_title_style_dark = {
  fill: COLOR_PALETTE.greyScale['0.3'],
};

const axis_line_style_light = {
  stroke: COLOR_PALETTE.greyScale['0.5'],
  lineWidth: 1,
};

const axis_line_style_dark = {
  stroke: COLOR_PALETTE.greyScale['0.3'],
  lineWidth: 1,
};

const axis_grid_line_style_light = {
  stroke: COLOR_PALETTE.greyScale['0.3'],
  lineWidth: 1,
  lineDash: null,
};

const axis_grid_line_style_dark = {
  stroke: COLOR_PALETTE.greyScale['0.7'],
  lineWidth: 1,
  lineDash: null,
};

const axis_tickLine_style_light = {
  stroke: COLOR_PALETTE.greyScale['0.5'],
  lineWidth: 0.5,
  length: 4,
};

const axis_tickLine_style_dark = {
  stroke: COLOR_PALETTE.greyScale['0.3'],
  lineWidth: 0.5,
  length: 4,
};

const axis_label_text_style_light = {
  fill: COLOR_PALETTE.greyScale['0.5'],
  fontSize: 12,
};

const axis_label_text_style_dark = {
  fill: COLOR_PALETTE.greyScale['0.3'],
  fontSize: 12,
};

export const xAxis_base = (mode: string) => {
  return {
    visible: true,
    position: 'bottom',
    title: {
      visible: false,
      spacing: axis_title_spacing,
      style: mode === 'light' ? axis_title_style_light : axis_title_style_dark,
    },
    line: {
      visible: true,
      style: mode === 'light' ? axis_line_style_light : axis_line_style_dark,
    },
    grid: {
      visible: false,
      line: {
        style: mode === 'light' ? axis_grid_line_style_light : axis_grid_line_style_dark,
      },
      alternateColor: null,
    },
    tickLine: {
      visible: true,
      style: mode === 'light' ? axis_tickLine_style_light : axis_tickLine_style_dark,
    },
    label: {
      visible: true,
      offset: axis_label_offset,
      style: deepMix({}, mode === 'light' ? axis_label_text_style_light : axis_label_text_style_dark, {
        textBaseline: 'top',
      }),
      autoEllipsis: false,
      autoRotate: false,
      autoHide: false,
    },
  };
};

export const yAxis_base = (mode: string) => {
  return {
    visible: true,
    position: 'left',
    title: {
      visible: false,
      spacing: axis_title_spacing,
      style: mode === 'light' ? axis_title_style_light : axis_title_style_dark,
    },
    line: {
      visible: false,
      style: mode === 'light' ? axis_line_style_light : axis_line_style_dark,
    },
    grid: {
      visible: true,
      line: {
        style: mode === 'light' ? axis_grid_line_style_light : axis_grid_line_style_dark,
      },
      alternateColor: null,
    },
    tickLine: {
      visible: true,
      style: mode === 'light' ? axis_tickLine_style_light : axis_tickLine_style_dark,
    },
    label: {
      visible: true,
      offset: axis_label_offset,
      style: deepMix({}, mode === 'light' ? axis_label_text_style_light : axis_label_text_style_dark, {
        textBaseline: 'middle',
      }),
      autoRotate: false,
      autoHide: true,
    },
  };
};

export const xAxis_value = (mode: string) => {
  return {
    visible: true,
    position: 'bottom',
    title: {
      visible: false,
      spacing: axis_title_spacing,
      style: mode === 'light' ? axis_title_style_light : axis_title_style_dark,
    },
    line: {
      visible: true,
      style: mode === 'light' ? axis_line_style_light : axis_line_style_dark,
    },
    grid: {
      visible: false,
      line: {
        style: mode === 'light' ? axis_grid_line_style_light : axis_grid_line_style_dark,
      },
      alternateColor: null,
    },
    tickLine: {
      visible: true,
      style: mode === 'light' ? axis_tickLine_style_light : axis_tickLine_style_dark,
    },
    label: {
      visible: true,
      offset: axis_label_offset,
      style: deepMix({}, mode === 'light' ? axis_label_text_style_light : axis_label_text_style_dark, {
        textBaseline: 'top',
      }),
      autoFormat: false,
      autoFormatUnit: 1000,
      autoFormatSuffix: 'k',
      autoRotate: false,
      autoHide: false,
    },
    overlapOrder: ['autoFormat', 'autoRotate', 'autoHide'],
  };
};

export const yAxis_value = (mode: string) => {
  return {
    visible: true,
    position: 'left',
    title: {
      visible: false,
      spacing: axis_title_spacing,
      style: mode === 'light' ? axis_title_style_light : axis_title_style_dark,
    },
    line: {
      visible: false,
      style: mode === 'light' ? axis_line_style_light : axis_line_style_dark,
    },
    grid: {
      visible: true,
      line: {
        style: mode === 'light' ? axis_grid_line_style_light : axis_grid_line_style_dark,
      },
      alternateColor: null,
    },
    tickLine: {
      visible: true,
      style: mode === 'light' ? axis_tickLine_style_light : axis_tickLine_style_dark,
    },
    label: {
      visible: true,
      offset: axis_label_offset,
      style: deepMix({}, mode === 'light' ? axis_label_text_style_light : axis_label_text_style_dark, {
        textBaseline: 'middle',
      }),
      autoFormat: false,
      autoFormatUnit: 1000,
      autoFormatSuffix: 'k',
      autoRotate: false,
      autoHide: true,
    },
    overlapOrder: ['autoFormat', 'autoHide'],
  };
};

export const xAxis_category = (mode: string) => {
  return {
    visible: true,
    position: 'bottom',
    title: {
      visible: false,
      spacing: axis_title_spacing,
      style: mode === 'light' ? axis_title_style_light : axis_title_style_dark,
    },
    line: {
      visible: true,
      style: mode === 'light' ? axis_line_style_light : axis_line_style_dark,
    },
    grid: {
      visible: false,
      line: {
        style: mode === 'light' ? axis_grid_line_style_light : axis_grid_line_style_dark,
      },
      alternateColor: null,
    },
    tickLine: {
      visible: false,
      style: mode === 'light' ? axis_tickLine_style_light : axis_tickLine_style_dark,
    },
    label: {
      visible: true,
      offset: axis_label_offset,
      style: deepMix({}, mode === 'light' ? axis_label_text_style_light : axis_label_text_style_dark, {
        textBaseline: 'top',
      }),
      autoWrap: false,
      autoEllipsisPosition: 'tail',
      autoEllipsis: false,
      autoRotate: false,
    },
    overlapOrder: ['autoWrap', 'autoEllipsis', 'autoRotate'],
  };
};

export const yAxis_category = (mode: string) => {
  return {
    visible: true,
    position: 'left',
    title: {
      visible: false,
      spacing: axis_title_spacing,
      style: mode === 'light' ? axis_title_style_light : axis_title_style_dark,
    },
    line: {
      visible: false,
      style: mode === 'light' ? axis_line_style_light : axis_line_style_dark,
    },
    grid: {
      visible: true,
      line: {
        style: mode === 'light' ? axis_grid_line_style_light : axis_grid_line_style_dark,
      },
      alternateColor: null,
    },
    tickLine: {
      visible: false,
      style: mode === 'light' ? axis_tickLine_style_light : axis_tickLine_style_dark,
    },
    label: {
      visible: true,
      offset: axis_label_offset,
      style: deepMix({}, mode === 'light' ? axis_label_text_style_light : axis_label_text_style_dark, {
        textBaseline: 'middle',
      }),
      autoWrap: false,
      autoEllipsisPosition: 'tail',
      autoEllipsis: false,
      autoRotate: false,
    },
    overlapOrder: ['autoWrap', 'autoEllipsis'],
  };
};

export const xAxis_time = (mode: string) => {
  return {
    visible: true,
    position: 'bottom',
    title: {
      visible: false,
      spacing: axis_title_spacing,
      style: mode === 'light' ? axis_title_style_light : axis_title_style_dark,
    },
    line: {
      visible: true,
      style: mode === 'light' ? axis_line_style_light : axis_line_style_dark,
    },
    grid: {
      visible: false,
      line: {
        style: mode === 'light' ? axis_grid_line_style_light : axis_grid_line_style_dark,
      },
      alternateColor: null,
    },
    tickLine: {
      visible: true,
      style: mode === 'light' ? axis_tickLine_style_light : axis_tickLine_style_dark,
    },
    label: {
      visible: true,
      offset: axis_label_offset,
      style: deepMix({}, mode === 'light' ? axis_label_text_style_light : axis_label_text_style_dark, {
        textBaseline: 'top',
      }),
      autoEllipsis: false,
      autoRotate: false,
      autoHide: false,
    },
    overlapOrder: ['autoEllipsis', 'autoRotate', 'autoHide'],
  };
};

export const yAxis_time = (mode: string) => {
  return {
    visible: true,
    position: 'left',
    title: {
      visible: false,
      spacing: axis_title_spacing,
      style: mode === 'light' ? axis_title_style_light : axis_title_style_dark,
    },
    line: {
      visible: false,
      style: mode === 'light' ? axis_line_style_light : axis_line_style_dark,
    },
    grid: {
      visible: true,
      line: {
        style: mode === 'light' ? axis_grid_line_style_light : axis_grid_line_style_dark,
      },
      alternateColor: null,
    },
    tickLine: {
      visible: false,
      style: mode === 'light' ? axis_tickLine_style_light : axis_tickLine_style_dark,
    },
    label: {
      visible: true,
      offset: axis_label_offset,
      style: deepMix({}, mode === 'light' ? axis_label_text_style_light : axis_label_text_style_dark, {
        textBaseline: 'middle',
      }),
      autoEllipsis: false,
      autoRotate: false,
      autoHide: false,
    },
    overlapOrder: ['autoEllipsis', 'autoHide'],
  };
};

export const radiusAxis = (mode: string) => {
  return {
    visible: true,
    grid: {
      visible: true,
      line: {
        style: mode === 'light' ? axis_grid_line_style_light : axis_grid_line_style_dark,
      },
      alternateColor: ['rgba(0, 0, 0, 0.04)', null],
    },
    line: {
      visible: true,
      style: mode === 'light' ? axis_line_style_light : axis_line_style_dark,
    },
    tickLine: {
      visible: true,
      style: mode === 'light' ? axis_tickLine_style_light : axis_tickLine_style_dark,
    },
    label: {
      offset: axis_label_offset,
      style: mode === 'light' ? axis_label_text_style_light : axis_label_text_style_dark,
      autoRotate: true,
      autoHide: true,
    },
    title: {
      visible: false,
      offset: axis_title_spacing,
      style: mode === 'light' ? axis_title_style_light : axis_title_style_dark,
    },
  };
};

export const angleAxis = (mode: string) => {
  return {
    visible: true,
    grid: {
      visible: true,
      line: {
        visible: true,
        style: mode === 'light' ? axis_grid_line_style_light : axis_grid_line_style_dark,
      },
    },
    line: {
      visible: true,
      style: mode === 'light' ? axis_line_style_light : axis_line_style_dark,
    },
    label: {
      visible: true,
      offset: axis_label_offset,
      style: mode === 'light' ? axis_label_text_style_light : axis_label_text_style_dark,
    },
    tickLine: {
      visible: false,
      style: mode === 'light' ? axis_tickLine_style_light : axis_tickLine_style_dark,
    },
    title: {
      visible: false,
      spacing: axis_title_spacing,
      style: mode === 'light' ? axis_title_style_light : axis_title_style_dark,
    },
  };
};
