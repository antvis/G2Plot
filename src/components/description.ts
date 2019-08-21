import { Group, Canvas, Text } from '@antv/g';
import * as _ from '@antv/util';

/**
 * 图表的文字描述，一般用于生成图表的标题和副标题
 */

export default class TextDescription {
  private container: Canvas | Group;
  private theme: any;
  private alignWithAxis: boolean;
  private topMargin: number;
  private leftMargin: number;
  private wrapperWidth: number;
  private text: string;
  private style: any;
  public shape: Text;

  constructor(cfg) {
    _.assign(this, cfg);
    this._init();
  }

  private _init() {
    const content = this._textWrapper(this.wrapperWidth, this.style);
    this.shape = this.container.addShape('text', {
      attrs: _.mix({
        x: this.leftMargin,
        y: this.topMargin,
        text: content,
      },           this.style),
    });
  }

  public getBBox() {
    if (this.shape) return this.shape.getBBox();
    return null;
  }

  public clear() {
    this.shape && this.shape.attr('text', '');
  }

  public destory() {
    this.shape && this.shape.remove();
  }

  private _textWrapper(width, style) {
    const text = this.text;
    let currentWidth = 0;
    let wrapperedText = _.clone(text);
    const tShape = new Text({
      attrs:{
        text: '',
        x: 0,
        y: 0,
        ...style,
      },
    });
    for (let i = 0; i < wrapperedText.length; i++) {
      const t = wrapperedText[i];
      tShape.attr('text', t);
      const textWidth = tShape.getBBox().width;
      currentWidth += textWidth;
      if (currentWidth >= width) {
        wrapperedText = `${wrapperedText.slice(0, i)}\n${wrapperedText.slice(i)}`;
        currentWidth = 0;
      }
    }
    tShape.remove();
    return wrapperedText;
  }

}
