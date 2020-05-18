import { IGroup, IShape } from '../dependents';
import { assign, isArray, each, mix } from '@antv/util';
import { breakText } from '../util/common';
import ViewLayer from '../base/view-layer';
import BBox from '../util/bbox';

interface TextConfig {
  leftMargin: number;
  topMargin: number;
  rightMargin: number;
  text: string;
  style: any;
  wrapperWidth: number;
  container: IGroup;
  theme: any;
  index: number;
  plot: ViewLayer;
  name: string;
  alignTo?: 'left' | 'right' | 'middle';
}

/**
 * 图表的文字描述，一般用于生成图表的标题和副标题
 */

export default class TextDescription {
  public shape: IShape;
  public position: string = 'top';
  public name: string;
  public destroyed: boolean = false;
  private container: IGroup;
  private topMargin: number;
  private leftMargin: number;
  private rightMargin: number;
  private wrapperWidth: number;
  private alignTo: string;
  private text: string;
  private style: any;
  private index: number;
  private plot: ViewLayer | any;

  constructor(cfg: TextConfig) {
    assign(this as any, cfg);
    this.init();
  }

  public getBBox(): BBox | null {
    if (this.shape) {
      // @ts-ignore
      const bbox = this.shape.getBBox();
      if (this.index === 0) {
        return BBox.fromBBoxObject(bbox);
      }
      const padding = this.plot.theme.description.padding;
      if (isArray(padding)) {
        each(padding, (it, index) => {
          if (typeof padding[index] === 'function') {
            padding[index] = padding[index](this.plot.options.legend.position);
          }
        });
      }
      return new BBox(bbox.maxX, bbox.minY, bbox.width, bbox.height);
    }
    return null;
  }

  public clear() {
    if (this.shape) {
      // @ts-ignore
      this.shape.attr('text', '');
    }
  }

  public destroy() {
    if (this.shape) {
      this.shape.remove();
    }
    this.destroyed = true;
  }

  private init() {
    const content = this.textWrapper();
    const { x, y } = this.getPosition();
    this.shape = this.container.addShape('text', {
      attrs: mix(
        {
          x,
          y,
          text: content,
        },
        this.style,
        {
          textAlign: this.getTextAlign(),
        }
      ),
    }) as IShape;
    // @ts-ignore
    this.shape.name = this.name;
  }

  protected getPosition() {
    if (this.alignTo === 'left') {
      return { x: this.leftMargin, y: this.topMargin };
    } else if (this.alignTo === 'middle') {
      return { x: this.leftMargin + this.wrapperWidth / 2, y: this.topMargin };
    } else {
      return { x: this.rightMargin, y: this.topMargin };
    }
  }

  protected getTextAlign() {
    if (this.alignTo === 'left') {
      return 'left';
    } else if (this.alignTo === 'middle') {
      return 'center';
    } else {
      return 'right';
    }
  }

  /**
   * 当text过长时，默认换行
   * 1. 注意初始text带换行符的场景
   */
  private textWrapper() {
    const width = this.wrapperWidth;
    const style = this.style;
    const textContent: string = this.text;
    const tShape = this.container.addShape('text', {
      attrs: {
        text: '',
        x: 0,
        y: 0,
        ...style,
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
}
