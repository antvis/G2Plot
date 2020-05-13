import { get, map, isArray, last, deepMix, each } from '@antv/util';
import { Element, MappingDatum, _ORIGIN } from '../../dependents';
import BaseLabel, { registerLabelComponent } from '../../components/label/base';
import { TextStyle, Label } from '../../interface/config';
import { IShape, Geometry } from '../../dependents';
import { isPolygonIntersection } from '../../util/math';

export default class PointLabel<L extends Label = Label> extends BaseLabel<L> {
  protected getDefaultOptions() {
    const { theme } = this.layer;
    const { label = {} } = theme;
    return {
      offsetX: 0,
      offsetY: 0,
      ...label,
    };
  }

  protected getLabelOffset() {
    return this.getLabelOffsetByDimAndFactor('y', -1);
  }

  protected getLabelItemAttrs(element: Element, index: number): TextStyle[] {
    const { style, formatter } = this.options;
    const mappingData: MappingDatum[] = get(element, 'model.mappingData', []);

    return map(mappingData, (datum, datumIndex) => {
      const value = this.getValue(datum);
      return {
        ...this.getPosition(datum),
        text: formatter
          ? formatter(
              value,
              {
                [_ORIGIN]: datum._origin,
                mappingDatum: datum,
                mappingDatumIndex: datumIndex,
                element,
                elementIndex: index,
              },
              index
            )
          : value,
        textAlign: 'center',
        textBaseline: 'middle',
        ...style,
      };
    });
  }

  protected getValue(datum: MappingDatum): number | undefined | null {
    return get(datum._origin, this.layer.options.yField);
  }

  protected getPosition(datum: MappingDatum): { x: number; y: number } {
    const pos = {
      x: isArray(datum.x) ? last(datum.x) : datum.x,
      y: isArray(datum.y) ? last(datum.y) : datum.y,
    };
    return pos;
  }

  protected layoutLabels(geometry: Geometry, labels: IShape[]): void {
    const overlap = this.isOverlapped(labels);
    if (overlap) {
      const tolerance = this.getGlobalTolerance(labels);
      each(labels, (label, index) => {
        if (index > 1) {
          this.labelResamplingByChange(label, labels, index, tolerance);
        }
      });
    }
    this.getCanvas().draw();
  }

  protected adjustLabel() {
    return;
  }

  /** 根据变化进行抽样，保留变化较大的点，类似于点简化算法 */
  private labelResamplingByChange(label, labels, index, tolerance) {
    const previous = this.findPrevious(index, labels);
    const currentCenter = this.getCenter(label);
    const previousCenter = this.getCenter(previous);
    const distX = previousCenter.x - currentCenter.x;
    const distY = previousCenter.y - currentCenter.y;
    const dist = Math.sqrt(distX * distX + distY * distY);
    if (dist < tolerance) {
      label.set('visible', false);
    }
  }

  /* private clearOverlapping(){

  } */

  /** 检测label之间是否重叠 **/
  private isOverlapped(labels) {
    for (let i = 0; i < labels.length; i++) {
      const labelABBox = labels[i].getBBox();
      for (let j = 0; j < labels.length; j++) {
        if (j !== i) {
          const labelBBBox = labels[j].getBBox();
          const intersection = isPolygonIntersection(
            this.getPolygonPoints(labelABBox),
            this.getPolygonPoints(labelBBBox)
          );
          if (intersection) {
            return true;
          }
        }
      }
    }
    return false;
  }

  /* 将bbox转换为polygon顶点 */
  private getPolygonPoints(bbox) {
    const { minX, minY, maxX, maxY } = bbox;
    return [
      { x: minX, y: minY },
      { x: maxX, y: minY },
      { x: maxX, y: maxY },
      { x: minX, y: maxY },
    ];
  }

  private getGlobalTolerance(labels) {
    const labelsClone = deepMix([], labels);
    labelsClone.sort((a, b) => {
      return b.getBBox().width - a.getBBox().width;
    });
    return Math.round(labelsClone[0].getBBox().width);
  }

  private findPrevious(index, labels) {
    for (let i = index - 1; i > 0; i--) {
      if (labels[i].get('visible')) {
        return labels[i];
      }
    }
  }

  private getCenter(label) {
    const { minX, maxX, minY, maxY } = label.getBBox();
    return { x: minX + (maxX - minX) / 2, y: minY + (maxY - minY) / 2 };
  }
}

registerLabelComponent('point', PointLabel);
