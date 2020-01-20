import { rgb2arr } from '../../../../../util/color';
import * as _ from '@antv/util';
import { LooseMap } from '../../../../../interface/types';

type Point = LooseMap;

export function mappingColor(band, gray) {
  let reflect;
  _.each(band, (b) => {
    const map = b as Point;
    if (gray >= map.from && gray < map.to) {
      reflect = map.color;
    }
  });
  return reflect;
}

/** 自动调整label颜色 */
export function autoAdjustColor(label, shape) {
  const labelRange = label.getBBox();
  const shapeRange = shape.getBBox();
  if (labelRange.minY >= shapeRange.minY && labelRange.maxY <= shapeRange.maxY) {
    const shapeColor = shape.attr('fill');
    const shapeOpacity = shape.attr('opacity') ? shape.attr('opacity') : 1;
    const rgb = rgb2arr(shapeColor);
    const gray = Math.round(rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114) / shapeOpacity;
    const colorBand = [
      { from: 0, to: 85, color: 'white' },
      { from: 85, to: 170, color: '#F6F6F6' },
      { from: 170, to: 255, color: 'black' },
    ];
    const reflect = mappingColor(colorBand, gray);
    label.attr('fill', reflect);
    if (reflect !== 'black') {
      label.attr('stroke', null);
      label.attr('lineWidth', 0);
    } else {
      label.attr('stroke', 'white');
      label.attr('lineWidth', 2);
    }
  } else if (labelRange.maxY < shapeRange.minY) {
    // 非 shape 范围内的 label 需要考虑主题背景
    const theme = this.get('theme');
    const labelTextColor = _.get(theme, 'label.textStyle.fill', 'black');
    label.attr('fill', labelTextColor);
  }
}
