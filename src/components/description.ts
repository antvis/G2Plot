import { IGroup, Shape } from '@antv/g-canvas';
import { assign, isArray, each, mix } from '@antv/util';
import { breakText } from '../util/common';
import ViewLayer from '../base/view-layer';
import BBox from '../util/bbox';

const Text = Shape.Text;

interface TextConfig {
  leftMargin: number;
  topMargin: number;
  text: string;
  style: any;
  wrapperWidth: number;
  container: IGroup;
  theme: any;
  index: number;
  plot: ViewLayer;
  name: string;
}

/**
 * 图表的文字描述，一般用于生成图表的标题和副标题
 */

export default class TextDescription {
  public shape: Text;
  public position: string = 'top';
  public name: string;
  public destroyed: boolean = false;
  private container: IGroup;
  private topMargin: number;
  private leftMargin: number;
  private wrapperWidth: number;
  private text: string;
  private style: any;
  private index: number;
  private plot: ViewLayer;

  constructor(cfg: TextConfig) {
    assign(this as any, cfg);
    this._init();
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
      return new BBox(bbox.maxX, bbox.minY, bbox.width, bbox.height + padding[2]);
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

  private _init() {
    const content = this._textWrapper();
    this.shape = (this.container.addShape('text', {
      attrs: mix(
        {
          x: this.leftMargin,
          y: this.topMargin,
          text: content,
        },
        this.style
      ),
    }) as any) as Text;
    // @ts-ignore
    this.shape.name = this.name;
  }

  /**
   * 当text过长时，默认换行
   * 1. 注意初始text带换行符的场景
   */
  private _textWrapper() {
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
