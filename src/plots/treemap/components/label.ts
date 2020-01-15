import { Shape, Text } from '@antv/g';
import { ElementLabels, registerElementLabels } from '@antv/g2';
import * as _ from '@antv/util';
import { breakText } from '../../../util/common';

interface Point {
  [key: string]: any;
}

const LEAF_LABEL_OFFSET = 4;
const MIN_FONTSIZE = 8;

function isLeaf(data, maxLevel) {
  return !data.children || data.depth >= maxLevel;
}

function textWrapper(label, width) {
  const fontSize = label.attr('fontSize');
  const textContent: string = label.attr('text');
  const tShape = new Text({
    attrs: {
      text: '',
      x: 0,
      y: 0,
      fontSize,
    },
  });
  const textArr = textContent.split('\n');
  const wrappedTextArr = textArr.map((wrappedText) => {
    let text = '';
    const chars = wrappedText.split('');
    const breakIndex: number[] = [];
    for (let i = 0; i < chars.length; i++) {
      const item = chars[i];
      tShape.attr('text', (text += item));
      const currentWidth = tShape.getBBox().width - 1;
      if (currentWidth > width) {
        // 如果是第一个字符就大于宽度不做任何换行处理
        if (i === 0) {
          break;
        }
        breakIndex.push(i);
        text = '';
      }
    }

    return breakText(chars, breakIndex);
  });

  tShape.remove();
  return wrappedTextArr.join('\n');
}

function textAbbreviate(text, fontSize, width) {
  const tailShape = new Text({
    attrs: {
      text: '...',
      x: 0,
      y: 0,
      fontSize,
    },
  });
  const tailWidth = tailShape.getBBox().width;
  const tShape = new Text({
    attrs: {
      text: '',
      x: 0,
      y: 0,
      fontSize,
    },
  });
  let t = '';
  const abbreviateWidth = width - tailWidth;
  for (let i = 0; i < text.length; i++) {
    const item = text[i];
    tShape.attr('text', (t += item));
    const currentWidth = tShape.getBBox().width;
    if (currentWidth >= abbreviateWidth) {
      const string = t.substr(0, t.length - 1);
      if (string.length > 0) {
        return string + '...';
      }
    }
  }
  return t;
}

export class TreemapLabels extends ElementLabels {
  public showLabels(points: any, shapes: Shape[]) {
    super.showLabels(points, shapes);
    const renderer = this.get('labelsRenderer');
    const labels = renderer.get('group').get('children');
    const view = this.get('element').get('view');
    const { maxLevel } = this.get('labelOptions');
    _.each(labels, (label, index) => {
      const l = label as Shape;
      const data = label.get('origin');
      const origin = l.get('origin');
      const isLeafNode = isLeaf(data, maxLevel);
      const shapeId = this.get('element').getShapeId(origin);
      const shape = this.getShape(shapeId, shapes);
      const shapeBbox = shape.getBBox();
      if (!isLeafNode && data.showLabel) {
        const x = shapeBbox.x + shapeBbox.width / 2;
        const y = shapeBbox.y + 4;
        label.attr('x', x);
        label.attr('y', y);
        label.attr('textBaseline', 'top');
        label.attr('fontWeight', 600);
        const wrapperWidth = shapeBbox.width - LEAF_LABEL_OFFSET * 2;
        if (label.getBBox().width > wrapperWidth) {
          const text = textAbbreviate(label.attr('text'), label.attr('fontSize'), wrapperWidth);
          label.attr('text', text);
        }
      } else {
        this.leafText(shapeBbox, label);
      }
    });
    view.get('canvas').draw();
  }

  public getShape(shapeId, shapes) {
    let target;
    _.each(shapes, (shape) => {
      const s = shape as Point;
      const id = s.id;
      if (id === shapeId) {
        target = s;
      }
    });
    return target;
  }

  private leafText(bbox, label) {
    const labelBBox = label.getBBox();
    const labelText = _.clone(label.attr('text'));
    const sizeOffset = label.get('origin').depth === 1 ? 0 : 2;
    const fontSize = Math.max(label.attr('fontSize') - sizeOffset, MIN_FONTSIZE);
    const centerX = bbox.x + bbox.width / 2;
    const centerY = bbox.y + bbox.height / 2;
    label.attr({
      x: centerX,
      y: centerY,
      textAlign: 'center',
      textBaseline: 'middle',
      lineHeight: fontSize,
      fontSize,
    });
    const wrapperWidth = bbox.width - LEAF_LABEL_OFFSET * 2;
    if (labelBBox.width > bbox.width && labelBBox.height > bbox.height) {
      label.attr('text', '');
      return;
    } else if (wrapperWidth < fontSize) {
      label.attr('text', '');
      return;
    }
    if (labelBBox.width > bbox.width) {
      const wrappedText = textWrapper(label, wrapperWidth);
      label.attr({
        lineHeight: label.attr('fontSize'),
        text: wrappedText,
      });
      const tem_bbox = label.getBBox();
      if (tem_bbox.height > bbox.height) {
        const text = textAbbreviate(labelText, fontSize, wrapperWidth);
        label.attr('text', text);
      }
    }
  }
}

registerElementLabels('treemapLabel', TreemapLabels);
