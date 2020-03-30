/**
 * @author linhuiw
 * @description 存放仪表盘的配置项，比如指针的颜色、粗细等
 */
import { get } from '@antv/util';

const basicPointerStyleDark = {
  color: '#CFCFCF',
  circleColorTop: '#2E364B',
  circleColorBottom: '#EEEEEE',
  thickness: 4.5,
};

export const getOptions = function(name: string, theme: string, colors: string[]) {
  const basicPointerStyle = basicPointerStyleDark;
  const ringBackground = '#f0f0f0';
  const common = {
    color: get(colors, [0], '#F6445A'),
    thickness: 24,
    radius: 1,
    angle: 240,
    textPosition: '100%',
  };

  switch (name) {
    case 'standard':
      return {
        axis:{
          visible: true,
          offset: -35,
          tickCount: 21,
          tickLine:{
            visible: true,
            length: 5,
            thickness: 2,
            style:{
              fill: '#999'
            }
          },
          label:{
            visible: true,
            style:{
              fill:'#999'
            }
          }
        },
        ringStyle: {
          ...common,
          background: ringBackground,
          axis: {
            amount: 10,
            offset: -35,
            length: 5,
            thickness: 2,
            color: '#999',
          },
        },
        pointerStyle: {
          ...basicPointerStyle,
          radius: 0.5,
        },
      };
    case 'meter':
      return {
        ringStyle: {
          ...common,
          background: ringBackground,
          axis: {
            amount: 25,
            offset: -35,
            length: 2,
            thickness: 1,
            color: '#999',
          },
        },
        pointerStyle: {
          ...basicPointerStyle,
          radius: 0.5,
        },
      };
    case 'fan':
      return {
        ringStyle: {
          color: get(colors, [0], '#F6445A'),
          background: ringBackground,
          thickness: 70,
          radius: 1,
          angle: 120,
          textPosition: '125%',
          bottomRatio: 3.5,
          axis: {
            amount: 10,
            offset: 5,
            length: 3,
            thickness: 3,
            color: '#999',
          },
        },
        pointerStyle: {
          ...basicPointerStyle,
          radius: 0.6,
        },
      };
    default:
      break;
  }
};
