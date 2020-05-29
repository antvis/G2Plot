import { COLOR_PALETTE } from '../color';

const title_text_color_light = COLOR_PALETTE.greyScale['1'];
const title_text_color_dark = COLOR_PALETTE.greyScale['0'];
const description_text_color_light = COLOR_PALETTE.greyScale['0.6'];
const description_text_color_dark = COLOR_PALETTE.greyScale['0.3'];

export const DESCRIPTION_BOTTOM_MARGIN = function (legendPosition) {
  if (legendPosition && legendPosition.split('-')[0] === 'top') {
    return 12;
  }
  return 24;
};

export const title = (mode: string) => {
  return {
    visible: false,
    alignTo: 'left',
    padding: [24, 24, 24, 24],
    style: {
      fontFamily: 'PingFang SC',
      fontSize: 18,
      fill: mode === 'light' ? title_text_color_light : title_text_color_dark,
      textAlign: 'left',
      textBaseline: 'top',
      lineHeight: 20,
    },
  };
};

export const description = (mode: string) => {
  return {
    visible: false,
    alignTo: 'left',
    padding: [10, 24, DESCRIPTION_BOTTOM_MARGIN, 24],
    style: {
      fontFamily: 'PingFang SC',
      fontSize: 12,
      fill: mode === 'light' ? description_text_color_light : description_text_color_dark,
      textAlign: 'left',
      textBaseline: 'top',
      lineHeight: 16,
    },
  };
};
