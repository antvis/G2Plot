import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import BaseBulletLayer, { BaseBulletViewConfig, STACK_FIELD } from './base-layer';

export interface BulletViewConfig extends BaseBulletViewConfig {
  value: number;
}

export interface BulletLayerConfig extends BulletViewConfig, LayerConfig {}

export default class BulletLayer extends BaseBulletLayer<BulletLayerConfig> {
  public bullet;
  public type: string = 'bullet';

  public static getDefaultOptions(): Partial<BulletLayerConfig> {
    return _.deepMix({}, super.getDefaultOptions(), {
      value: 0,
      xField: 'x',
      yField: 'value',
    });
  }

  /** @override */
  protected drawBullets() {
    const options = this.options;
    const container = this.view.get('elements')[0].get('container');
    const shape = this.view.get('elements')[0].get('shapeContainer');
    this.drawBullet(container, shape.getBBox(), options.value);
    this.canvas.draw();
  }

  /** @override */
  protected adjustYAxisOptions(options): void {
    options.yAxis.maxLimit = Math.max(options.max, options.value);
  }

  /** @override */
  protected adjustDataOptions(options): void {
    const data = [];
    const rangeValues = options.range.map((d) => (d / 100) * (options.max - options.min));
    if (rangeValues[0] !== 0) {
      data.push({
        x: '1',
        [STACK_FIELD]: `${rangeValues[0]}`,
        value: rangeValues[0],
      });
    }
    for (let i = 1; i < rangeValues.length; i += 1) {
      data.push({
        x: '1',
        [STACK_FIELD]: `${options.range[i - 1]}-${options.range[i]}`,
        value: rangeValues[i] - rangeValues[i - 1],
      });
    }
    options.data = data;
  }
}

registerPlotType('bullet', BulletLayer);
