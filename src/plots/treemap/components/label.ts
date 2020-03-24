import { each, deepMix, clone, find } from '@antv/util';
import { View, IGroup } from '../../../dependents';
import { breakText } from '../../../util/common';

const LEAF_LABEL_OFFSET = 4;
const MIN_FONTSIZE = 8;

function isLeaf(data, maxLevel) {
  return !data.children || data.depth >= maxLevel;
}

function textWrapper(label, width, container) {
  const fontSize = label.attr('fontSize');
  const textContent: string = label.attr('text');
  const tShape = container.addShape('text', {
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

function textAbbreviate(text, fontSize, width, container) {
  const tailShape = container.addShape('text', {
    attrs: {
      text: '...',
      x: 0,
      y: 0,
      fontSize,
    },
  });
  const tailWidth = tailShape.getBBox().width;
  const tShape = container.addShape('text', {
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
  tShape.remove();
  tailShape.remove();
  return t;
}

export interface TreemapLabelConfig {
  visible?: boolean;
  formatter?: (...args: any[]) => string;
  offsetX?: number;
  offsetY?: number;
  style?: any;
}

export interface ILineLabel extends TreemapLabelConfig {
  view: View;
  plot: any;
}

export default class TreemapLabel {
  public options: TreemapLabelConfig;
  public destroyed: boolean = false;
  protected plot: any;
  protected view: View;
  private container: IGroup;

  constructor(cfg: ILineLabel) {
    this.view = cfg.view;
    this.plot = cfg.plot;
    const defaultOptions = this.getDefaultOptions();
    this.options = deepMix(defaultOptions, cfg, {});
    this.init();
  }

  protected init() {
    this.container = this.getGeometry().labelsContainer;
    this.view.on('beforerender', () => {
      this.clear();
      this.plot.canvas.draw();
    });
  }

  public render() {
    const elements = this.getGeometry().elements;
    each(elements, (ele) => {
      const shape = ele.shape;
      const data = shape.get('origin').data;
      const isLeafNode = isLeaf(data, this.plot.options.maxLevel);
      if (data.showLabel) {
        const style = clone(this.options.style);
        const position = this.getPosition(shape, isLeafNode);
        const formatter = this.options.formatter;
        const content = formatter ? formatter(data.name) : data.name;
        const textBaseline = this.getTextBaseLine(isLeafNode);
        const label = this.container.addShape('text', {
          attrs: deepMix({}, style, {
            x: position.x,
            y: position.y,
            text: content,
            fill: 'black',
            textAlign: 'center',
            textBaseline,
            fontWeight: isLeafNode ? 300 : 600,
          }),
          name: 'label',
        });
        this.adjustLabel(label, shape, isLeafNode);
      }
    });
  }

  public clear() {
    if (this.container) {
      this.container.clear();
    }
  }

  public hide() {
    this.container.set('visible', false);
    this.plot.canvas.draw();
  }

  public show() {
    this.container.set('visible', true);
    this.plot.canvas.draw();
  }

  public destroy() {
    if (this.container) {
      this.container.remove();
    }
    this.destroyed = true;
  }

  public getBBox() {}

  protected getPosition(shape, isLeafNode) {
    const shapeBbox = shape.getBBox();
    let x = 0;
    let y = 0;
    if (!isLeafNode) {
      x = shapeBbox.x + shapeBbox.width / 2;
      y = shapeBbox.y + 4;
    } else {
      x = shapeBbox.minX + shapeBbox.width / 2;
      y = shapeBbox.minY + shapeBbox.height / 2;
    }
    return { x, y };
  }

  protected getTextBaseLine(isLeafNode) {
    return isLeafNode ? 'middle' : 'top';
  }

  protected adjustLabel(label, shape, isLeafNode) {
    if (isLeafNode) {
      this.adjustLeafLabel(label, shape);
    } else {
      this.adjustParentLabel(label, shape);
    }
  }

  private adjustLeafLabel(label, shape) {
    const bbox = shape.getBBox();
    const labelBBox = label.getBBox();
    const labelText = clone(label.attr('text'));
    const sizeOffset = 2;
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
      const wrappedText = textWrapper(label, wrapperWidth, this.container);
      label.attr({
        lineHeight: label.attr('fontSize'),
        text: wrappedText,
      });
      const tem_bbox = label.getBBox();
      if (tem_bbox.height > bbox.height) {
        const text = textAbbreviate(labelText, fontSize, wrapperWidth, this.container);
        label.attr('text', text);
      }
    }
  }

  private adjustParentLabel(label, shape) {
    const shapeBbox = shape.getBBox();
    const wrapperWidth = shapeBbox.width - LEAF_LABEL_OFFSET * 2;
    if (label.getBBox().width > wrapperWidth) {
      const text = textAbbreviate(label.attr('text'), label.attr('fontSize'), wrapperWidth, this.container);
      label.attr('text', text);
    }
  }

  private getDefaultOptions() {
    const { theme } = this.plot;
    const labelStyle = theme.label.style;
    return {
      offsetX: 0,
      offsetY: 0,
      style: clone(labelStyle),
    };
  }

  private getGeometry() {
    return find(this.view.geometries, (geom) => geom.type === 'polygon');
  }
}
