import * as _ from '@antv/util';
import { registerResponsiveTheme } from '../../../util/responsive/theme';

/** 组装theme */
const columnTheme = {
  column: {
    constraints: [
      {
        name: 'columnWidth',
        option: {
          ratio: 0.6,
        },
      },
    ],
  },
  label: {
    top:{
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
  }
};

registerResponsiveTheme('column', columnTheme);