import { IShape, AnimateCfg } from '@antv/g-base';
import { Coordinate, Element, Scale } from '@antv/g2';
import { get, size } from '@antv/util';
import { deepAssign } from '../../../utils';
import { LineOptions } from '../types';

const DEFAULT_STYLE_ATTRS = {
  x: 0,
  y: 0,
  text: '',
  fontSize: 12,
  textAlign: 'start',
  textBaseline: 'middle',
};

export function pathInWithLabel(shape: IShape, animateCfg: AnimateCfg, cfg) {
  const origin = shape.get('origin');
  const endLabel: LineOptions['endLabel'] = get(origin, ['customInfo', 'endLabel']);
  const geometry = (shape.get('element') as Element).geometry;

  const fill = shape.attr('stroke');
  const groupField = geometry.getGroupFields()?.[0];

  // todo 由外部配置
  const nameLabel = shape.get('parent').addShape('text', {
    name: 'end-label-name',
    attrs: deepAssign(
      {},
      DEFAULT_STYLE_ATTRS,
      { fill, text: get(origin, ['data', 0, groupField], '') },
      get(endLabel, 'style')
    ),
  });

  const valueLabel = shape.get('parent').addShape('text', {
    name: 'end-label-value',
    attrs: deepAssign({}, DEFAULT_STYLE_ATTRS, { fill }, get(endLabel, 'style')),
  });

  function doAnimate(labelShape: IShape, type?: string) {
    const yScale = geometry.getYScale();
    const coordinate = (shape.get('element') as Element).shapeFactory.coordinate;
    // @ts-ignore 设置虚线样式
    shape.attr('lineDash', [shape.getTotalLength()]);
    shape.animate((ratio: number) => ({ lineDashOffset: (1 - ratio) * length }), animateCfg);
    labelShape.animate((ratio) => {
      const position = getPositionByRatio(ratio, origin, coordinate, 4 /** offset */);
      if (position) {
        const [x, y] = position;
        if (type === 'value') {
          let text;
          text = getDataByPosition(yScale, y, coordinate);
          // use formatter
          if (yScale.formatter) {
            text = yScale.formatter(text);
          }
          return { x, y: y + 12, text };
        }
        return { x, y };
      }

      return;
    }, animateCfg);
  }

  doAnimate(nameLabel);
  doAnimate(valueLabel, 'value');
}

/**
 * 根据帧变找到位置
 * @param ratio
 * @param origin
 * @param coordinate
 * @param offset
 */
function getPositionByRatio(ratio: number, origin, coordinate: Coordinate, offset: number = 0) {
  const { points } = origin;
  if (size(points)) {
    const currentX = coordinate.start.x + coordinate.getWidth() * ratio;
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      if (currentX >= current.x && currentX <= next.x) {
        const m = (next.y - current.y) / (next.x - current.x); // 斜率
        const y = current.y + m * (currentX - current.x + offset);
        return [currentX + offset, y];
      }
    }
  }
}

/**
 * 根据位置找到数据
 * @param scale
 * @param y
 * @param coordinate
 */
function getDataByPosition(scale: Scale, y: number, coordinate: Coordinate) {
  const yRatio = (y - coordinate.start.y) / (coordinate.end.y - coordinate.start.y);
  return scale.invert(yRatio)?.toFixed(2);
}
