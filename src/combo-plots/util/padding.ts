import BBox from '../../util/bbox';
import * as _ from '@antv/util';
import { getGlobalTheme } from '../../theme/global';

export function getOverlappingPadding(layer, components) {
  const { bleeding } = getGlobalTheme();
  if (_.isArray(bleeding)) {
    _.each(bleeding, (it, index) => {
      if (typeof bleeding[index] === 'function') {
        bleeding[index] = bleeding[index]({});
      }
    });
  }
  let viewMinX = layer.layerBBox.minX;
  let viewMaxX = layer.layerBBox.maxX;
  let viewMinY = _.clone(layer.layerBBox.minY);
  let viewMaxY = layer.layerBBox.maxY;
  _.each(components, (component) => {
    const { position } = component;
    const { minX, maxX, minY, maxY } = component.getBBox();
    if (maxY > viewMinY && maxY < viewMaxY && position === 'top') {
      viewMinY = maxY;
    }
    if (minY > viewMinY && maxY > viewMaxY && position === 'bottom') {
      viewMaxY = minY;
    }
    if (minY > viewMinY && minY <= viewMaxY && position === 'bottom') {
      viewMaxY = minY;
    }
    if (maxX > viewMinX && maxX < viewMaxX && position === 'left') {
      viewMinX = maxX;
    }
    if (minX > viewMinX && maxX < viewMaxX && position === 'right') {
      viewMaxX = minX;
    }
  });
  const range = new BBox(viewMinX, viewMinY, viewMaxX - viewMinX, viewMaxY - viewMinY);
  let top_padding = range.minY - layer.layerBBox.minY;
  if (top_padding === 0) {
    top_padding = bleeding[0];
  }
  const right_padding = layer.layerBBox.maxX - range.maxX;
  const bottom_padding = layer.layerBBox.maxY - range.maxY;
  const left_padding = range.minX - layer.layerBBox.minX;

  return [top_padding, right_padding, bottom_padding, left_padding];
}
