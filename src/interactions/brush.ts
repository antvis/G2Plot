import { registerInteraction } from '@antv/g2';

/**
 * G2 已经内置了 brush、brush-x、brush-y 等交互，其它：
 *
 * 1. element-range-highlight 是否可用重命名为 brush-highlight？(mask 可以移动)
 * 2. brush-visible 与 brush 的区别是？
 */

function isPointInView(context) {
  return context.isInPlot();
}

/**
 * 获取 交互 start 阶段的相关配置
 */
export function getInteractionCfg(interactionType: string, maskStyle?: any) {
  switch (interactionType) {
    case 'brush':
      return {
        showEnable: [
          { trigger: 'plot:mouseenter', action: 'cursor:crosshair' },
          { trigger: 'plot:mouseleave', action: 'cursor:default' },
        ],
        start: [
          {
            trigger: 'mousedown',
            isEnable: isPointInView,
            action: ['brush:start', 'rect-mask:start', 'rect-mask:show'],
            // 对应第二个action的参数
            arg: [null, { maskStyle }],
          },
        ],
        processing: [
          {
            trigger: 'mousemove',
            isEnable: isPointInView,
            action: ['rect-mask:resize'],
          },
        ],
        end: [
          {
            trigger: 'mouseup',
            isEnable: isPointInView,
            action: ['brush:filter', 'brush:end', 'rect-mask:end', 'rect-mask:hide', 'reset-button:show'],
          },
        ],
        rollback: [{ trigger: 'reset-button:click', action: ['brush:reset', 'reset-button:hide', 'cursor:crosshair'] }],
      };
    case 'brush-highlight':
      return {
        showEnable: [
          { trigger: 'plot:mouseenter', action: 'cursor:crosshair' },
          { trigger: 'mask:mouseenter', action: 'cursor:move' },
          { trigger: 'plot:mouseleave', action: 'cursor:default' },
          { trigger: 'mask:mouseleave', action: 'cursor:crosshair' },
        ],
        start: [
          {
            trigger: 'plot:mousedown',
            isEnable(context) {
              // 不要点击在 mask 上重新开始
              return !context.isInShape('mask');
            },
            action: ['rect-mask:start', 'rect-mask:show'],
            // 对应第 1 个action的参数
            arg: [{ maskStyle }],
          },
          {
            trigger: 'mask:dragstart',
            action: ['rect-mask:moveStart'],
          },
        ],
        processing: [
          {
            trigger: 'plot:mousemove',
            action: ['rect-mask:resize'],
          },
          {
            trigger: 'mask:drag',
            action: ['rect-mask:move'],
          },
          {
            trigger: 'mask:change',
            action: ['element-range-highlight:highlight'],
          },
        ],
        end: [
          { trigger: 'plot:mouseup', action: ['rect-mask:end'] },
          { trigger: 'mask:dragend', action: ['rect-mask:moveEnd'] },
          {
            trigger: 'document:mouseup',
            isEnable(context) {
              return !context.isInPlot();
            },
            action: ['element-range-highlight:clear', 'rect-mask:end', 'rect-mask:hide'],
          },
        ],
        rollback: [{ trigger: 'dblclick', action: ['element-range-highlight:clear', 'rect-mask:hide'] }],
      };
    case 'brush-x':
      return {
        showEnable: [
          { trigger: 'plot:mouseenter', action: 'cursor:crosshair' },
          { trigger: 'plot:mouseleave', action: 'cursor:default' },
        ],
        start: [
          {
            trigger: 'mousedown',
            isEnable: isPointInView,
            action: ['brush-x:start', 'x-rect-mask:start', 'x-rect-mask:show'],
            // 对应第二个action的参数
            arg: [null, { maskStyle }],
          },
        ],
        processing: [
          {
            trigger: 'mousemove',
            isEnable: isPointInView,
            action: ['x-rect-mask:resize'],
          },
        ],
        end: [
          {
            trigger: 'mouseup',
            isEnable: isPointInView,
            action: ['brush-x:filter', 'brush-x:end', 'x-rect-mask:end', 'x-rect-mask:hide'],
          },
        ],
        rollback: [{ trigger: 'dblclick', action: ['brush-x:reset'] }],
      };
    case 'brush-y':
      return {
        showEnable: [
          { trigger: 'plot:mouseenter', action: 'cursor:crosshair' },
          { trigger: 'plot:mouseleave', action: 'cursor:default' },
        ],
        start: [
          {
            trigger: 'mousedown',
            isEnable: isPointInView,
            action: ['brush-y:start', 'y-rect-mask:start', 'y-rect-mask:show'],
            // 对应第二个action的参数
            arg: [null, { maskStyle }],
          },
        ],
        processing: [
          {
            trigger: 'mousemove',
            isEnable: isPointInView,
            action: ['y-rect-mask:resize'],
          },
        ],
        end: [
          {
            trigger: 'mouseup',
            isEnable: isPointInView,
            action: ['brush-y:filter', 'brush-y:end', 'y-rect-mask:end', 'y-rect-mask:hide'],
          },
        ],
        rollback: [{ trigger: 'dblclick', action: ['brush-y:reset'] }],
      };

    default:
      return {};
  }
}

// 直接拷贝过来的
registerInteraction('brush', getInteractionCfg('brush'));
// 复写 element-range-highlight interaction
registerInteraction('brush-highlight', getInteractionCfg('brush-highlight'));
// 复写
registerInteraction('brush-x', getInteractionCfg('brush-x'));
// 复写
registerInteraction('brush-y', getInteractionCfg('brush-y'));
