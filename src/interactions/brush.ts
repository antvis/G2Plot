import { registerAction, registerInteraction } from '@antv/g2';
import { BrushCfg } from '../types';
import { ButtonAction } from './actions/reset-button';

registerAction('brush-reset-button', ButtonAction, {
  name: 'brush-reset-button',
});

registerInteraction('filter-action', {});

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
export function getInteractionCfg(interactionType: string, brushType?: string, mask?: BrushCfg['mask']) {
  const maskType = brushType || 'rect';

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
            action: ['brush:start', `${maskType}-mask:start`, `${maskType}-mask:show`],
            // 对应第二个action的参数
            arg: [null, { maskStyle: mask?.style }],
          },
        ],
        processing: [
          {
            trigger: 'mousemove',
            isEnable: isPointInView,
            action: [`${maskType}-mask:resize`],
          },
        ],
        end: [
          {
            trigger: 'mouseup',
            isEnable: isPointInView,
            action: [
              'brush:filter',
              'brush:end',
              `${maskType}-mask:end`,
              `${maskType}-mask:hide`,
              'brush-reset-button:show',
            ],
          },
        ],
        rollback: [
          {
            trigger: 'brush-reset-button:click',
            action: ['brush:reset', 'brush-reset-button:hide', 'cursor:crosshair'],
          },
        ],
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
            action: [`${maskType}-mask:start`, `${maskType}-mask:show`],
            // 对应第 1 个action的参数
            arg: [{ maskStyle: mask?.style }],
          },
          {
            trigger: 'mask:dragstart',
            action: [`${maskType}-mask:moveStart`],
          },
        ],
        processing: [
          {
            trigger: 'plot:mousemove',
            action: [`${maskType}-mask:resize`],
          },
          {
            trigger: 'mask:drag',
            action: [`${maskType}-mask:move`],
          },
          {
            trigger: 'mask:change',
            action: ['element-range-highlight:highlight'],
          },
        ],
        end: [
          { trigger: 'plot:mouseup', action: [`${maskType}-mask:end`] },
          { trigger: 'mask:dragend', action: [`${maskType}-mask:moveEnd`] },
          {
            trigger: 'document:mouseup',
            isEnable(context) {
              return !context.isInPlot();
            },
            action: ['element-range-highlight:clear', `${maskType}-mask:end`, `${maskType}-mask:hide`],
          },
        ],
        rollback: [{ trigger: 'dblclick', action: ['element-range-highlight:clear', `${maskType}-mask:hide`] }],
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
            action: ['brush-x:start', `${maskType}-mask:start`, `${maskType}-mask:show`],
            // 对应第二个action的参数
            arg: [null, { maskStyle: mask?.style }],
          },
        ],
        processing: [
          {
            trigger: 'mousemove',
            isEnable: isPointInView,
            action: [`${maskType}-mask:resize`],
          },
        ],
        end: [
          {
            trigger: 'mouseup',
            isEnable: isPointInView,
            action: ['brush-x:filter', 'brush-x:end', `${maskType}-mask:end`, `${maskType}-mask:hide`],
          },
        ],
        rollback: [{ trigger: 'dblclick', action: ['brush-x:reset'] }],
      };
    case 'brush-x-highlight':
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
            action: [`${maskType}-mask:start`, `${maskType}-mask:show`],
            // 对应第 1 个action的参数
            arg: [{ maskStyle: mask?.style }],
          },
          {
            trigger: 'mask:dragstart',
            action: [`${maskType}-mask:moveStart`],
          },
        ],
        processing: [
          {
            trigger: 'plot:mousemove',
            action: [`${maskType}-mask:resize`],
          },
          {
            trigger: 'mask:drag',
            action: [`${maskType}-mask:move`],
          },
          {
            trigger: 'mask:change',
            action: ['element-range-highlight:highlight'],
          },
        ],
        end: [
          { trigger: 'plot:mouseup', action: [`${maskType}-mask:end`] },
          { trigger: 'mask:dragend', action: [`${maskType}-mask:moveEnd`] },
          {
            trigger: 'document:mouseup',
            isEnable(context) {
              return !context.isInPlot();
            },
            action: ['element-range-highlight:clear', `${maskType}-mask:end`, `${maskType}-mask:hide`],
          },
        ],
        rollback: [{ trigger: 'dblclick', action: ['element-range-highlight:clear', `${maskType}-mask:hide`] }],
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
            action: ['brush-y:start', `${maskType}-mask:start`, `${maskType}-mask:show`],
            // 对应第二个action的参数
            arg: [null, { maskStyle: mask?.style }],
          },
        ],
        processing: [
          {
            trigger: 'mousemove',
            isEnable: isPointInView,
            action: [`${maskType}-mask:resize`],
          },
        ],
        end: [
          {
            trigger: 'mouseup',
            isEnable: isPointInView,
            action: ['brush-y:filter', 'brush-y:end', `${maskType}-mask:end`, `${maskType}-mask:hide`],
          },
        ],
        rollback: [{ trigger: 'dblclick', action: ['brush-y:reset'] }],
      };
    case 'brush-y-highlight':
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
            action: [`${maskType}-mask:start`, `${maskType}-mask:show`],
            // 对应第 1 个action的参数
            arg: [{ maskStyle: mask?.style }],
          },
          {
            trigger: 'mask:dragstart',
            action: [`${maskType}-mask:moveStart`],
          },
        ],
        processing: [
          {
            trigger: 'plot:mousemove',
            action: [`${maskType}-mask:resize`],
          },
          {
            trigger: 'mask:drag',
            action: [`${maskType}-mask:move`],
          },
          {
            trigger: 'mask:change',
            action: ['element-range-highlight:highlight'],
          },
        ],
        end: [
          { trigger: 'plot:mouseup', action: [`${maskType}-mask:end`] },
          { trigger: 'mask:dragend', action: [`${maskType}-mask:moveEnd`] },
          {
            trigger: 'document:mouseup',
            isEnable(context) {
              return !context.isInPlot();
            },
            action: ['element-range-highlight:clear', `${maskType}-mask:end`, `${maskType}-mask:hide`],
          },
        ],
        rollback: [{ trigger: 'dblclick', action: ['element-range-highlight:clear', `${maskType}-mask:hide`] }],
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
registerInteraction('brush-x', getInteractionCfg('brush-x', 'x-rect'));
// 复写
registerInteraction('brush-y', getInteractionCfg('brush-y', 'y-rect'));
// 新增, x 框选高亮
registerInteraction('brush-x-highlight', getInteractionCfg('brush-x-highlight', 'x-rect'));
// 新增, y 框选高亮
registerInteraction('brush-y-highlight', getInteractionCfg('brush-y-highlight', 'y-rect'));
