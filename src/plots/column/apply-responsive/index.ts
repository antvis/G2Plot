import responsiveAxis from './axis';
import responsiveLabel from './label';

const preRenderResponsive = [];

const afterRenderResponsive = [
  { name: 'responsiveAxis', method: responsiveAxis },
  { name: 'responsiveLabel', method: responsiveLabel },
];

export default {
  preRender: preRenderResponsive,
  afterRender: afterRenderResponsive,
};
