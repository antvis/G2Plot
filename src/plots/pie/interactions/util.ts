import { Element } from '@antv/g2';

/**
 * 获取当前事件相关的图表元素
 * @param context 交互的上下文
 * @ignore
 */
export function getCurrentElement(context): Element | undefined {
  const event = context.event;
  let element;
  const target = event.target;
  if (target) {
    element = target.get('element');
  }
  return element;
}
