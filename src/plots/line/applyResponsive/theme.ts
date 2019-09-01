import * as _ from '@antv/util';
import { getResponsiveTheme, registerResponsiveTheme } from '../../../util/responsive/theme';

/** 组装theme */
const defaultTheme = getResponsiveTheme('default');
const lineTheme = _.deepMix({}, defaultTheme, {
  label: {
    constraints: [{ name: 'elementCollision' }],
    rules: {
      elementCollision: [{ name: 'nodesResamplingByChange' }, { name: 'clearOverlapping' }],
    },
  },
});
registerResponsiveTheme('line', lineTheme);