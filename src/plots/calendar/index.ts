import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import CalenderLayer from './layer';

// 注册日历图的自定义 shape
import './shape';

export type CalendarConfig = PlotConfig;

/**
 * 日历图
 */
export default class Calendar extends BasePlot<any> {
  public static getDefaultOptions: typeof CalenderLayer.getDefaultOptions = CalenderLayer.getDefaultOptions;

  /**
   * 复写父类方法
   * @param props
   */
  protected createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'calendar';
    super.createLayers(layerProps);
  }
}
