import { filter } from '@antv/util';
import { Params } from '../core/adaptor';
import { getInteractionCfg } from '../interactions/brush';
import { deepAssign } from '../utils';
import { Options as BaseOptions, BrushCfg, Interaction, Writable } from '../types';

/** 先引入brush 交互 */
import '../interactions/brush';

type Options = Pick<BaseOptions, 'interactions'> & { brush?: BrushCfg };

const BRUSH_TYPES = ['brush', 'brush-x', 'brush-y', 'brush-highlight', 'brush-x-highlight', 'brush-y-highlight'];

/**
 * brush 交互
 */
export function brushInteraction<O extends Options = Options>(params: Params<O>): Params<O> {
  const { options } = params;

  const { brush } = options;

  // 先过滤掉 brush 等交互
  const interactions = filter(options.interactions || [], (i) => BRUSH_TYPES.indexOf(i.type) === -1);

  // 设置 brush 交互
  if (brush?.enabled) {
    BRUSH_TYPES.forEach((type) => {
      let enable = false;
      switch (brush.type) {
        case 'x-rect':
          enable = type === (brush.action === 'highlight' ? 'brush-x-highlight' : 'brush-x');
          break;
        case 'y-rect':
          enable = type === (brush.action === 'highlight' ? 'brush-y-highlight' : 'brush-y');
          break;
        default:
          enable = type === (brush.action === 'highlight' ? 'brush-highlight' : 'brush');
          break;
      }
      const obj: Writable<Interaction> = { type, enable };

      if (brush.mask?.style || brush.type) {
        obj.cfg = getInteractionCfg(type, brush.type, brush.mask);
      }
      interactions.push(obj);
    });

    // 塞入 button 配置 (G2Plot 的封装)
    if (brush?.action !== 'highlight') {
      interactions.push({
        type: 'filter-action',
        cfg: {
          buttonConfig: brush.button,
        },
      });
    }
  }
  return deepAssign({}, params, { options: { interactions } });
}
