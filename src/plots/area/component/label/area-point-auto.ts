import { each, map, filter, last } from '@antv/util';
import { registerLabelComponent } from '../../../../components/label/base';
import PointAutoLabel from '../../../../components/label/point-auto';
import { Geometry, IShape, IElement } from '../../../../dependents';
import { getGeometryShapes, getGeometryByType } from '../../../../util/view';
import { getStrokePoints } from '../../../../util/math';
import { isContrastColorWhite } from '../../../../util/color';
import { IAreaPointAutoLabel } from '../../interface';

export default class AreaPointAutoLabel extends PointAutoLabel<IAreaPointAutoLabel> {
  protected layoutLabels(geometry: Geometry, labels: IShape[]) {
    super.layoutLabels(geometry, labels);
    this.adjustAreaLabelsStyle(labels);
  }

  protected adjustAreaLabelsStyle(labels: IShape[]) {
    const { view } = this;
    const { darkStyle, lightStyle } = this.options;
    const areaGeometry = getGeometryByType(view, 'area');
    const areas = getGeometryShapes(areaGeometry).sort((left: IElement, right: IElement) => {
      return right.getBBox().height - left.getBBox().height;
    }) as IShape[];

    each(labels, (label: IShape) => {
      const labelBBox = label.getBBox();
      const points = getStrokePoints(labelBBox.x, labelBBox.y, labelBBox.width, labelBBox.height);
      const match = map(areas, (area) => ({
        area,
        matches: filter(points, (point) => !!area.isHit(point[0], point[1])).length,
      })).sort((left, right) => left.matches - right.matches);
      if (last(match).matches > 0) {
        const bgColor = last(match).area.attr('fill');
        const fillWhite = isContrastColorWhite(bgColor);
        label.attr({
          fill: fillWhite ? lightStyle?.fill : darkStyle?.fill,
          fillOpacity: fillWhite ? lightStyle.fillOpacity : darkStyle.fillOpacity,
          stroke: fillWhite ? lightStyle?.stroke : darkStyle?.stroke,
        });
      }
    });
  }
}

registerLabelComponent('area-point-auto', AreaPointAutoLabel);
