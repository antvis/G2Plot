import { area } from './polygon';

export function halfAverageArea(cliper, data) {
  const num = data.length;
  const totalArea = area(cliper);
  return totalArea / num / 2;
}
