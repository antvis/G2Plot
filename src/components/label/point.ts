import { get, map, isArray, last, each } from '@antv/util';
import { Element, MappingDatum, _ORIGIN } from '../../dependents';
import BaseLabel, { registerLabelComponent } from '../../components/label/base';
import { TextStyle, Label } from '../../interface/config';
import { IShape, Geometry } from '../../dependents';
import { isBBoxIntersect } from '../../util/common';

/**
 * 说明:
 * 适用于展示面积图和折线图上数据点的label
 * */

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
    if (!this.options.adjustPosition) {
      return;
    }
    let overlap = this.isOverlapped(labels);
    // 规则1：先横向，优先显示横向上变化趋势大的label
    if (overlap) {
      const tolerance = this.getGlobalTolerance(labels);
      each(labels, (label, index) => {
        if (index > 1) {
          this.labelResamplingByChange(label, labels, index, tolerance);
        }
      });
    }
    overlap = this.isOverlapped(labels);
    // 规则2： 后纵向，优先保留纵向最高点label
    if (overlap) {
      each(labels, (label, index) => {
        if (label.get('visible')) {
          this.clearOverlapping(label, labels, index);
        }
      });
    }
  }

  protected adjustLabel() {
    return;
  }

  /** 根据变化进行抽样，保留变化较大的点，类似于点简化算法 */
  private labelResamplingByChange(label: IShape, labels: IShape[], index: number, tolerance: number) {
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

  private clearOverlapping(label: IShape, labels: IShape[], index: number) {
    // 找到所有与当前点overlap的node
    const overlapped = [];
    for (let i = 0; i < labels.length; i++) {
      const current = labels[i];
      if (i !== index && current.get('visible')) {
        const isOverlap = isBBoxIntersect(label.getBBox(), current.getBBox());
        if (isOverlap) {
          overlapped.push(current);
        }
      }
    }
    // 对overapped label进行处理
    if (overlapped.length > 0) {
      overlapped.push(label);
      overlapped.sort((a, b) => {
        return b.minY - a.minY;
      });
      // 隐藏除最高点以外的label
      each(overlapped, (label: IShape, index: number) => {
        if (index > 0) {
          label.set('visible', false);
        }
      });
    }
  }

  /** 检测一组label中是否存在重叠 **/
  private isOverlapped(labels: IShape[]) {
    for (let i = 0; i < labels.length; i++) {
      if (labels[i].get('visible')) {
        const labelABBox = labels[i].getBBox();
        for (let j = 0; j < labels.length; j++) {
          if (j !== i && labels[j].get('visible')) {
            const labelBBBox = labels[j].getBBox();
            const intersection = isBBoxIntersect(labelABBox, labelBBBox);
            if (intersection) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  private getGlobalTolerance(labels: IShape[]) {
    const labelsClone = labels.slice();
    labelsClone.sort((a, b) => {
      return b.getBBox().width - a.getBBox().width;
    });
    return Math.round(labelsClone[0].getBBox().width);
  }

  private findPrevious(index: number, labels: IShape[]) {
    for (let i = index - 1; i > 0; i--) {
      if (labels[i].get('visible')) {
        return labels[i];
      }
    }
  }

  private getCenter(label: IShape) {
    const { minX, maxX, minY, maxY } = label.getBBox();
    return { x: minX + (maxX - minX) / 2, y: minY + (maxY - minY) / 2 };
  }
}

registerLabelComponent('point', PointLabel);
