import { each } from '@antv/util';

export function slice(root, x, y, width, height) {
  const { children, value } = root;
  children.sort((a, b) => {
    return b.value - a.value;
  });
  const k = height / value;
  let node_y = y;
  each(children, (c) => {
    c.x = x;
    c.width = width;
    c.y = node_y;
    c.height = c.value * k;
    node_y += c.value * k;
  });
}
