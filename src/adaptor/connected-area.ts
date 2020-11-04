import { registerInteraction } from '@antv/g2';
import { Params } from '../core/adaptor';

export interface ConnectedAreaOptions {
  /** 触发方式, 默认 hover */
  trigger?: 'hover' | 'click';
}

/** 联通区域组件：使用于堆叠柱形图、堆叠条形图 */
export interface OptionWithConnectedArea {
  connectedArea?: ConnectedAreaOptions | false;
}

const INTERACTION_MAP = {
  hover: '__interval-connected-area-hover__',
  click: '__interval-connected-area-click__',
};

/** hover 触发的连通区域交互 */
registerInteraction(INTERACTION_MAP.hover, {
  start: [
    {
      trigger: `interval:mouseenter`,
      action: ['element-highlight-by-color:highlight', 'element-link-by-color:link'],
    },
  ],
  end: [
    {
      trigger: 'interval:mouseleave',
      action: ['element-highlight-by-color:reset', 'element-link-by-color:unlink'],
    },
  ],
});

/** click 触发的联通区域交互 */
registerInteraction(INTERACTION_MAP.click, {
  start: [
    {
      trigger: `interval:click`,
      action: [
        'element-highlight-by-color:clear',
        'element-highlight-by-color:highlight',
        'element-link-by-color:clear',
        'element-link-by-color:unlink',
        'element-link-by-color:link',
      ],
    },
  ],
  end: [
    {
      trigger: 'document:mousedown',
      action: ['element-highlight-by-color:clear', 'element-link-by-color:clear'],
    },
  ],
});

/**
 * 返回支持联通区域组件交互的 adaptor，适用于堆叠柱形图/堆叠条形图
 * @param disable
 */
export function connectedArea<O extends OptionWithConnectedArea>(disable = false) {
  return function (params: Params<O>): Params<O> {
    const { chart, options } = params;
    const { connectedArea } = options;

    const clear = () => {
      chart.removeInteraction(INTERACTION_MAP.hover);
      chart.removeInteraction(INTERACTION_MAP.click);
    };

    if (!disable && connectedArea) {
      const trigger = connectedArea.trigger || 'hover';
      clear();
      chart.interaction(INTERACTION_MAP[trigger]);
    } else {
      clear();
    }

    return params;
  };
}
