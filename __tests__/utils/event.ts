import { BBox, ICanvas, IElement } from '@antv/g2/lib/dependents';

// 触发 Canvas 上元素的鼠标事件
export const simulateMouseEvent = (element: IElement, event: string, cfg = {}) => {
  const canvas = element.getCanvas();
  const bbox = element.getCanvasBBox();
  // 设置位置信息为 element 中央
  const x = bbox.x + bbox.width / 2;
  const y = bbox.y + bbox.height / 2;
  const client = canvas.getClientByPoint(x, y);
  const mouseEvent = new MouseEvent(event, {
    clientX: client.x,
    clientY: client.y,
    ...cfg,
  });
  canvas.get('el').dispatchEvent(mouseEvent);
};

// 触发鼠标事件
export const dispatchEvent = (bbox: BBox, canvas: ICanvas, event: string, cfg = {}) => {
  // 设置位置信息为 element 中央
  const x = bbox.x + bbox.width / 2;
  const y = bbox.y + bbox.height / 2;
  const client = canvas.getClientByPoint(x, y);
  const mouseEvent = new MouseEvent(event, {
    clientX: client.x,
    clientY: client.y,
    ...cfg,
  });
  canvas.get('el').dispatchEvent(mouseEvent);
};
