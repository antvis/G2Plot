import * as _ from '@antv/util';
import { registerResponsiveTheme, getResponsiveTheme } from '../../../util/responsive/theme';

/** 组装theme */
const defaultTheme = getResponsiveTheme('default');
const columnTheme = _.deepMix({},defaultTheme,{
    column : {
        constraints : [
          { name: 'columnWidth',
            option:{
              ratio: 0.1
            }
          }
        ],
    },
    label:{
        constraints: [
            { name: 'elementCollision'},
          ],
          rules: {
            elementCollision:[
              { name: 'nodeJitterUpward' },
              { name: 'nodesResamplingByState',
                option:{
                  keep: [ 'min', 'max', 'median' ],
                },
              },
              {
                name: 'textHide',
              },
            ],
          },
        }
});
registerResponsiveTheme('column',columnTheme);

export default columnTheme;