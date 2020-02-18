import { each } from '@antv/util';

export function dice(root, x0, y0, x1, y1) {
  const width = x1 - x0;
  const { children, value } = root;
  children.sort((a, b) => {
    return b.value - a.value;
  });
  const k = width / value;
  let node_x = x0;
  each(children, (c) => {
    c.y0 = y0;
    c.y1 = y1;
    c.x0 = node_x;
    node_x += c.value * k;
    c.x1 = c.x0 + c.value * k;
  });
}
