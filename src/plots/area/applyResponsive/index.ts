import responsiveAxis from './axis';

const preRenderResponsive = [];

const afterRenderResponsive = [
  { name: 'responsiveAxis', method: responsiveAxis },
];

export default {
  preRender: preRenderResponsive,
  afterRender: afterRenderResponsive,
};
