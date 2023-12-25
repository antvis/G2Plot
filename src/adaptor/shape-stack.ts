import { set, isBoolean } from '../utils';
import { CONFIG_SHAPE } from '../constants';
import type { Adaptor } from '../types';

/**
 * @description 处理堆叠图配置line|point|area时的transform问题
 */
export function shapeStack<P extends Adaptor>(params: P) {
  const { options } = params;
  const { stack, tooltip, xField } = options;
  if (!stack) return params;

  const shapes = CONFIG_SHAPE.map((item) => item.type).filter((item) => !!item);
  let hasStack = false;
  shapes.forEach((shape) => {
    if (options[shape]) {
      hasStack = true;
      /** 堆叠特殊处理，详见https://github.com/antvis/G2/issues/4515 */
      set(options, [shape, 'stack'], {
        y1: 'y',
        ...(typeof stack === 'object' ? stack : {}),
      });
    }
  });
  /** 调整通道，避免多份tooltip */
  if (hasStack && !isBoolean(tooltip) && !tooltip) {
    set(options, 'tooltip', {
      title: xField,
      items: [
        {
          channel: 'y',
        },
      ],
    });
  }
  return params;
}
