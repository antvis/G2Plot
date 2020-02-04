/**
 * 转化率组件，用于柱状图和条形图，展示从一个值到另一个值的转化率。
 * TODO: control bar/column size using widthRatio
 */
import { Group, Shape, Shapes } from '@antv/g';
import { View } from '@antv/g2';
import * as _ from '@antv/util';
import { compare } from '../base/controller/state';

export default class ConversionTag {
  private view: View;
  private container: Group;

  constructor(cfg) {
    _.assign(this, cfg);
    this._init();
  }

  private _init() {
    const layer = this.view.get('backgroundGroup');
    this.container = layer.addGroup();
    this.draw();
    this.view.on('beforerender', () => {
      this.clear();
    });
  }

  public draw() {}

  public clear() {
    if (this.container) {
      this.container.clear();
    }
  }

  public destory() {
    if (this.container) {
      this.container.remove();
    }
  }
}
