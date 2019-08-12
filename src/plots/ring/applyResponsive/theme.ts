import * as _ from '@antv/util';
import { registerResponsiveTheme, getResponsiveTheme } from '../../../util/responsive/theme';

/** 组装theme 
 * 其实这个应该是扩展自pie的，anyway，先这样写
*/
const defaultTheme = getResponsiveTheme('default');
const ringTheme = _.deepMix({},defaultTheme,{
    ring: {
        constraints : [
          { name: 'ringThickness' },
          { name: 'minRingThickness' },
        ],
    }
});
registerResponsiveTheme('ring',ringTheme);

export default ringTheme;