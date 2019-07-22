import responsiveColumn from './element';
import responsiveAxis from './axis';

const preRenderResponsive = [
    { name: 'responsiveColumn', method: responsiveColumn }
];

const afterRenderResponsive = [
    { name:'responsiveAxis', method: responsiveAxis },
];


export default {
    preRender: preRenderResponsive,
    afterRender: afterRenderResponsive
};