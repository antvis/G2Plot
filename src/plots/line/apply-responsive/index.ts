import responsiveAxis from './axis';
import responsivePointLabel from './label';

const preRenderResponsive = [];

const afterRenderResponsive = [
  { name: 'responsiveAxis', method: responsiveAxis },
  { name: 'responsivePointLabel', method: responsivePointLabel },
];

export default {
  preRender: preRenderResponsive,
  afterRender: afterRenderResponsive,
};
