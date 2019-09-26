import { Canvas, Group, Text } from '@antv/g';
import * as _ from '@antv/util';

/**
 * 图表的文字描述，一般用于生成图表的标题和副标题
 */

export default class TextDescription {
  public shape: Text;
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

  public getBBox(): any {
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

  private _textWrapper(width, style) {
    const text = this.text;
    let currentWidth = 0;
    let wrappedText = _.clone(text);
    const tShape = new Text({
      attrs: {
        text: '',
        x: 0,
        y: 0,
        ...style,
      },
    });
    for (let i = 0; i < wrappedText.length; i++) {
      const t = wrappedText[i];
      /*tslint:disable*/
      tShape.attr('text', t + ' ');
      // 字数不多就不缓存了吧.....
      const textWidth = Math.floor(tShape.measureText());
      currentWidth += textWidth;
      if (currentWidth > width) {
        wrappedText = `${wrappedText.slice(0, i)}\n${wrappedText.slice(i)}`;
        currentWidth = 0;
      }
    }
    tShape.remove();
    return wrappedText;
  }
}
