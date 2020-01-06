import { each } from '@antv/util';

export function dice(root, x, y, width, height) {
  const { children, value } = root;
  children.sort((a, b) => {
    return b.value - a.value;
  });
  const k = width / value;
  let node_x = x;
  each(children, (c) => {
    c.y = y;
    c.height = height;
    c.x = node_x;
    node_x += c.value * k;
    c.width = c.value * k;
  });
}
