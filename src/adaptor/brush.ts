import { filter } from '@antv/util';
import { Params } from '../core/adaptor';
import { getInteractionCfg } from '../interactions/brush';
import { deepAssign } from '../utils';
import { Options, BrushCfg, Interaction, Writable } from '../types';

/** 先引入brush 交互 */
import '../interactions/brush';

type O = Options & { brush?: BrushCfg };

const BRUSH_TYPES = ['brush', 'brush-x', 'brush-y', 'brush-highlight'];

/**
 * brush 交互
 */
export function brushInteraction(params: Params<O>): Params<O> {
  const { options } = params;

  const { brush } = options;

  // 先过滤掉 brush 等交互
  const interactions = filter(options.interactions || [], (i) => BRUSH_TYPES.indexOf(i.type) === -1);

  // 设置 brush 交互
  if (brush?.enabled) {
    BRUSH_TYPES.forEach((type) => {
      let enable = false;
      switch (brush.type) {
        case 'x':
          enable = type === 'brush-x';
          break;
        case 'y':
          enable = type === 'brush-y';
          break;
        default:
          enable = type === (brush.action === 'highlight' ? 'brush-highlight' : 'brush');
          break;
      }
      const obj: Writable<Interaction> = { type, enable };
      if (brush.mask?.style) {
        obj.cfg = getInteractionCfg(type, brush.mask?.style);
      }
      interactions.push(obj);
    });
  }
  return deepAssign({}, params, { options: { interactions } });
}
