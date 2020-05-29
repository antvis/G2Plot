import { COLOR_PALETTE } from '../color';

const label_style_light = {
  fill: COLOR_PALETTE.greyScale[0.9],
  stroke: '#ffffff',
  lineWidth: 2,
};

const label_style_dark = {
  fill: COLOR_PALETTE.greyScale[0.1],
  stroke: '#000000',
  lineWidth: 1,
};

export const label = (mode: string) => {
  return {
    offset: 8,
    style: mode === 'light' ? label_style_light : label_style_dark,
  };
};
