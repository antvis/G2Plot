const TAU = 6.283185307179586;
const F = 7;
const G = 1;

export function spiralLayout(size, num) {
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size;
  const points = [];
  for (let i = 0; i < num; i++) {
    const angle = (i / num) * TAU;
    const x = centerX + Math.exp(angle / G - 1) * Math.cos(angle * F);
    const y = centerY + Math.exp(angle / G - 1) * Math.sin(angle * F);
    points.push([x, y]);
  }

  return points;
}
