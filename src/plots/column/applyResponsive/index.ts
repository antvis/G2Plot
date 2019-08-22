import responsiveAxis from './axis';
import responsiveColumn from './element';
import responsiveLabel from './label';

const preRenderResponsive = [{ name: 'responsiveColumn', method: responsiveColumn }];

const afterRenderResponsive = [
  { name: 'responsiveAxis', method: responsiveAxis },
  { name: 'responsiveLabel', method: responsiveLabel },
];

export default {
  preRender: preRenderResponsive,
  afterRender: afterRenderResponsive,
};
