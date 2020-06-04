import { COLOR_PALETTE } from '../color';

const legend_text_style_light = {
  fill: COLOR_PALETTE.greyScale['0.7'],
  fontSize: 12,
};

const legend_text_style_dark = {
  fill: COLOR_PALETTE.greyScale['0.3'],
  fontSize: 12,
};

export const legend = (mode: string) => {
  return {
    margin: [12, 12, 12, 12],
    maxWidth: null,
    maxHeight: null,
    title: {
      visible: false,
      style: mode === 'light' ? legend_text_style_light : legend_text_style_dark,
      spacing: 12,
    },
    itemSpacing: 10,
    itemWidth: null,
    itemHeight: null,
    itemName: {
      visible: true,
      spacing: 10,
      style: mode === 'light' ? legend_text_style_light : legend_text_style_dark,
      autoEllipsis: false,
      ellipsisPosition: 'tail',
    },
    itemValue: {
      visible: false,
      alignRight: true,
      style: mode === 'light' ? legend_text_style_light : legend_text_style_dark,
      autoEllipsis: false,
      ellipsisPosition: 'tail',
      autoHide: false,
    },
    marker: {
      symbole: 'circle',
      spacing: 10,
      style: {
        r: 4,
      },
    },
    responsiveOrder: ['autoEllipsisValue', 'autoHideValue', 'autoEllipsisName'],
  };
};
