import { each } from '@antv/util';

export function slice(root, x0, y0, x1, y1) {
  const height = y1 - y0;
  const { children, value } = root;
  children.sort((a, b) => {
    return b.value - a.value;
  });
  const k = height / value;
  let node_y = y0;
  each(children, (c) => {
    c.x0 = x0;
    c.x1 = x1;
    c.y0 = node_y;
    node_y += c.value * k;
    c.y1 = c.y0 + c.value * k;
  });
}
