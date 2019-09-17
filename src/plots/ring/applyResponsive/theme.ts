import * as _ from '@antv/util';
import { registerResponsiveTheme } from '../../../util/responsive/theme';

/** 组装theme
 * 其实这个应该是扩展自pie的，anyway，先这样写
 */
const ringTheme = {
  ring: {
    constraints: [{ name: 'ringThickness' }, { name: 'minRingThickness' }],
  },
};

registerResponsiveTheme('ring', ringTheme);