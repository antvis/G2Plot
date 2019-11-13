import { BBox, Canvas, Group, Text } from '@antv/g';
import * as _ from '@antv/util';

/**
 * 为字符串添加换行符
 * @param source - 字符串数组 ['a', 'b', 'c']
 * @param breaks - 要添加换行的index
 *
 * @example
 * ```js
 * breakText(['a','b','c'], [1])
 *
 * // a\nbc
 * ```
 */
function breakText(source: string[], breaks: number[]): string {
  const result = [...source];
  breaks.forEach((pos, index) => {
    result.splice(pos + index, 0, '\n');
  });
  return result.join('');
}

/**
 * 图表的文字描述，一般用于生成图表的标题和副标题
 */

export default class TextDescription {
  public shape: Text;
  public position: string = 'top';
  private container: Canvas | Group;
  private theme: any;
  private alignWithAxis: boolean;
  private topMargin: number;
  private leftMargin: number;
  private wrapperWidth: number;
  private text: string;
  private style: any;

  constructor(cfg) {
    _.assign(this, cfg);
    this._init();
  }

  public getBBox(): BBox | null {
    if (this.shape) {
      return this.shape.getBBox();
    }
    return null;
  }

  public clear() {
    if (this.shape) {
      this.shape.attr('text', '');
    }
  }

  public destroy() {
    if (this.shape) {
      this.shape.remove();
    }
  }

  private _init() {
    const content = this._textWrapper(this.wrapperWidth, this.style);
    this.shape = this.container.addShape('text', {
      attrs: _.mix(
        {
          x: this.leftMargin,
          y: this.topMargin,
          text: content,
        },
        this.style
      ),
    });
  }

  /**
   * 当text过长时，默认换行
   * 1. 注意初始text带换行符的场景
   */
  private _textWrapper(width: number, style) {
    const textContent: string = this.text;
    const tShape = new Text({
      attrs: {
        text: '',
        x: 0,
        y: 0,
        ...style,
      },
    });
    const textArr = textContent.split('\n');
    const wrappedTextArr = textArr.map((wrappedText) => {
      let currentWidth = 0;
      const chars = wrappedText.split('');
      const breakIndex: number[] = [];
      let text = '';
      for (let i = 0; i < chars.length; i++) {
        const item = chars[i];
        tShape.attr('text', (text += item));
        const textWidth = Math.floor(tShape.measureText());
        currentWidth += textWidth;
        if (currentWidth > width) {
          if (i === 0) {
            break;
          }
          breakIndex.push(i);
          currentWidth = 0;
          text = '';
        }
      }

      return breakText(chars, breakIndex);
    });

    tShape.remove();
    return wrappedTextArr.join('\n');
  }
}
