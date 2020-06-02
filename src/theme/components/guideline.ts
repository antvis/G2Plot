import { COLOR_PALETTE } from '../color';

const guideLine_line_style_light = {
  stroke: COLOR_PALETTE.greyScale[0.9],
  lineWidth: 2,
  lineDash: null,
};

const guideLine_line_style_dark = {
  stroke: COLOR_PALETTE.greyScale[0.1],
  lineWidth: 1,
  lineDash: null,
};

const guideLine_text_style_light = {
  fill: COLOR_PALETTE.greyScale[1],
  fontSize: 14,
  textAlign: 'left',
};

const guideLine_text_style_dark = {
  fill: COLOR_PALETTE.greyScale[0],
  fontSize: 14,
  textAlign: 'left',
  stroke: null,
};

export const guideLine = (mode: string) => {
  return {
    line: mode === 'light' ? guideLine_line_style_light : guideLine_line_style_dark,
    text: {
      visible: false,
      content: '',
      position: 'start',
      autoRotate: true,
      offsetX: 0,
      offsetY: -5,
      style: mode === 'light' ? guideLine_text_style_light : guideLine_text_style_dark,
    },
  };
};
