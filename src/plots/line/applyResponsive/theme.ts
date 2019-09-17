import * as _ from '@antv/util';
import { registerResponsiveTheme } from '../../../util/responsive/theme';

/** 组装theme */
const lineTheme = {
  label: {
    constraints: [{ name: 'elementCollision' }],
    rules: {
      elementCollision: [{ name: 'nodesResamplingByChange' }, { name: 'clearOverlapping' }],
    },
  }
};
registerResponsiveTheme('line', lineTheme);