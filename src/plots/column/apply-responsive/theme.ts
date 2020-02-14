import * as _ from '@antv/util';
import { registerResponsiveTheme } from '../../../util/responsive/theme';

/** 组装theme */
const columnTheme = {
  label: {
    top: {
      constraints: [{ name: 'elementCollision' }],
      rules: {
        elementCollision: [
          { name: 'nodeJitterUpward' },
          {
            name: 'nodesResamplingByState',
            option: {
              keep: ['min', 'max', 'median'],
            },
          },
          {
            name: 'textHide',
          },
        ],
      },
    },
  },
};

registerResponsiveTheme('column', columnTheme);
