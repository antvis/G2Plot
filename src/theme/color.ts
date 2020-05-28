import { each } from '@antv/util';

const greyScale = {
  1: '#FFFFFF',
  0.2: 'rgba(0, 0, 0, 0.15)',
  0.4: 'rgba(0, 0, 0, 0.45)',
  0.6: 'rgba(0, 0, 0, 0.65)',
  0.8: 'rgba(0, 0, 0, 0.85)',
  0: '#000000',
};

const qualitative_10 = [
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

const qualitative_20 = [
  '#5B8FF9',
  '#CDDDFD',
  '#5AD8A6',
  '#CDF3E4',
  '#5D7092',
  '#CED4DE',
  '#F6BD16',
  '#FCEBB9',
  '#E86452',
  '#F8D0CB',
  '#6DC8EC',
  '#D3EEF9',
  '#945FB9',
  '#DECFEA',
  '#FF9845',
  '#FFE0C7',
  '#1E9493',
  '#BBDEDE',
  '#FF99C3',
  '#FFE0ED',
];

const sequential_blue = ['#bde8ff', '#9ec9ff', '#7eabff', '#5a8df8', '#3874db', '#005bbf', '#0044a4', '#122c6a'];

const sequential_cyan = ['#7efac6', '#60ddab', '#40c190', '#14a577', '#008a5e', '#007046', '#005730', '#003e1b'];

const sequential_grey = ['#d0e3ff', '#b4c7ec', '#7f91b4', '#657899', '#4c5f7f', '#344766', '#1c314e'];

const sequential_yellow = ['#ffe244', '#f6bd16', '#b98800', '#9c6f00', '#7f5700', '#633f00', '#482900'];

const sequential_red = ['#ffbb97', '#ff9f7c', '#ff8363', '#e8684b', '#c94d33', '#aa311c', '#8c1004', '#6f0000'];

const sequential_daybreakBlue = [
  '#97f1ff',
  '#78d3f7',
  '#5ab7da',
  '#3a9cbe',
  '#0a82a3',
  '#006889',
  '#00506f',
  '#003451',
];

const sequential_purple = ['#fdd5ff', '#ddb6ff', '#be99f7', '#a27fda', '#8765be', '#6c4da3', '#523588', '#391e6f'];

const sequential_orange = ['#ffd985', '#ffb462', '#f39343', '#d47829', '#b65f0c', '#984600', '#7b2d00', '#5f1400'];

const sequential_green = ['#8bf4f2', '#6ed8d6', '#50bcba', '#2fa19f', '#008685', '#006c6c', '#005354', '#003c3d'];

const sequential_magenta = ['#ffcffa', '#ffabd5', '#ef8bb4', '#d27099', '#b55680', '#993c67', '#7d214f', '#620038'];

const sequential_dark = ['#dddddd', '#bebebe', '#a1a1a1', '#848484', '#686868', '#4e4e4e', '#353535', '#1d1d1d'];

const sequential_sunshineOrange = [
  '#FDEDBE',
  '#FFDF80',
  '#FFCB33',
  '#FFB200',
  '#FF8C00',
  '#FF6500',
  '#E6450F',
  '#B22C00',
  '#661900',
];

const sequential_leafYellow = [
  '#FFEBB0',
  '#FFDF80',
  '#FACA3E',
  '#E6B80B',
  '#B5AC23',
  '#6A9A48',
  '#20876B',
  '#06746B',
  '#044E48',
];

const sequential_goldenPurple = [
  '#FACDAA',
  '#F4A49E',
  '#EE7B91',
  '#E85285',
  '#BE408C',
  '#942D93',
  '#6A1B9A',
  '#56167D',
  '#42105F',
];

const sequential_geekBlue = [
  '#D2EDC8',
  '#A9DACC',
  '#75C6D1',
  '#42B3D5',
  '#3993C2',
  '#3073AE',
  '#27539B',
  '#1E3388',
  '#171E6D',
];

const diverging_cyanRed = [
  '#215B77',
  '#227BA2',
  '#1B9CD0',
  '#22BAED',
  '#61C9FF',
  '#8AD4FF',
  '#ABDFFF',
  '#C9E9FF',
  '#F2EAEA',
  '#FFC5AC',
  '#FFA884',
  '#FF895D',
  '#FF6836',
  '#F3470D',
  '#D13808',
  '#A4300C',
  '#7A270E',
];

const diverging_greenYellow = [
  '#1B572A',
  '#1B7536',
  '#169442',
  '#05B54F',
  '#52C26C',
  '#7ACF89',
  '#9EDCA6',
  '#BFE8C3',
  '#EFF3DE',
  '#FFE9B8',
  '#FFDE94',
  '#FFD470',
  '#FFC741',
  '#EDB40A',
  '#D09C10',
  '#A37B16',
  '#795B16',
];

const diverging_blueBrown = [
  '#003F7F',
  '#004C99',
  '#0059B2',
  '#0072E5',
  '#1A8CFF',
  '#4DA6FF',
  '#80BFFF',
  '#B3D9FF',
  '#EAE9EB',
  '#FFD5B1',
  '#FFC08C',
  '#FFAB66',
  '#FF963E',
  '#F17F0B',
  '#D16A0C',
  '#A45411',
  '#794012',
];

const diverging_grow = [
  '#014c63',
  '#10686c',
  '#168575',
  '#16a37e',
  '#0bc286',
  '#65cf9b',
  '#96dcb0',
  '#c1e8c5',
  '#eaf3db',
  '#f1e3af',
  '#f3d282',
  '#f2c354',
  '#eeb311',
  '#de9111',
  '#cd6e10',
  '#bb490f',
  '#a8190d',
];

const diverging_magic = [
  '#661900',
  '#B22C00',
  '#E6450F',
  '#FF6500',
  '#FF8C00',
  '#FFB200',
  '#FFCB33',
  '#FFDF80',
  '#FFE2DC',
  '#EAACFF',
  '#DD78FF',
  '#C53FFF',
  '#A700FF',
  '#8500FF',
  '#620BE1',
  '#3607C2',
  '#27029A',
];

const diverging_classic = [
  '#661900',
  '#B22C00',
  '#E6450F',
  '#FF6500',
  '#FF8C00',
  '#FFB200',
  '#FFCB33',
  '#FFDF80',
  '#E0F2EB',
  '#66D8FF',
  '#1AC5FF',
  '#00A5FF',
  '#007FFF',
  '#0059FF',
  '#0040FF',
  '#002CB2',
  '#001F7F',
];

const COLOR_PALETTE = {
  qualitative: {
    '10': qualitative_10,
    '20': qualitative_20,
  },
  sequential: {
    blue: sequential_blue,
    cyan: sequential_cyan,
    grey: sequential_grey,
    yellow: sequential_yellow,
    red: sequential_red,
    daybreakBlue: sequential_daybreakBlue,
    purple: sequential_purple,
    orange: sequential_orange,
    green: sequential_green,
    magenta: sequential_magenta,
    dark: sequential_dark,
    goldenPurple: sequential_goldenPurple,
    geekBlue: sequential_geekBlue,
    sunshineOrange: sequential_sunshineOrange,
    leafYellow: sequential_leafYellow,
  },
  diverging: {
    'cyan-red': diverging_cyanRed,
    'green-yellow': diverging_greenYellow,
    'blue-brown': diverging_blueBrown,
    grow: diverging_grow,
    magic: diverging_magic,
    classic: diverging_classic,
  },
  greyScale,
};

function getColorPalette(type: string, name: string) {
  if (COLOR_PALETTE[type]) {
    return COLOR_PALETTE[type][name];
  }
}

function registerColorPalette(type: string, name: string, platte: string[]) {
  if (!COLOR_PALETTE[type]) {
    COLOR_PALETTE[type] = {};
  }
  COLOR_PALETTE[type][name] = platte;
}

function colorResampling(type: string, colorPalette: string[], count: number) {
  if (type === 'sequential') {
    return sequentialResampling(colorPalette, count);
  } else if (type === 'diverging') {
    return divergingResampling(colorPalette, count);
  }
}

function sequentialResampling(colorPalette: string[], count: number) {
  const step = Math.floor(colorPalette.length / count);
  const newPalette = [];

  for (let i = 0; i < count; i++) {
    const index = i * step;
    newPalette.push(colorPalette[index]);
  }

  return newPalette;
}

function divergingResampling(colorPalette: string[], count: number) {
  const centerIndex = Math.floor(colorPalette.length / 2);
  const paletteLength = (colorPalette.length - 1) / 2;
  const leftCount = Math.floor((count - 1) / 2);
  const rightCount = count - leftCount - 1;
  const leftStep = Math.floor(paletteLength / leftCount);
  const rightStep = Math.floor(paletteLength / rightCount);
  const newPalette = [];
  for (let i = 0; i < leftCount; i++) {
    const index = centerIndex - i * leftStep;
    newPalette.push(colorPalette[index]);
  }
  newPalette.push(colorPalette[centerIndex]);
  for (let j = 0; j < rightCount; j++) {
    const index = centerIndex + j * rightStep;
    newPalette.push(colorPalette[index]);
  }
  return newPalette;
}

function linearGradientParser(degree: number, colorPalette: string[]) {
  let gradientString = `l(${degree}) `;
  const step = 1 / colorPalette.length;
  each(colorPalette, (c, index) => {
    const ratio = step * index;
    gradientString += `${ratio}:${c} `;
  });
  return gradientString;
}

function radialGradientParser(x: number, y: number, r: number, colorPalette: string[]) {
  let gradientString = `r(${x},${y},${r}) `;
  const step = 1 / colorPalette.length;
  each(colorPalette, (c, index) => {
    const ratio = step * index;
    gradientString += `${ratio}:${c} `;
  });
  return gradientString;
}

export {
  COLOR_PALETTE,
  getColorPalette,
  registerColorPalette,
  colorResampling,
  linearGradientParser,
  radialGradientParser,
};
