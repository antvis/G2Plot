import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';

export type CalendarConfig = PlotConfig;

/**
 * 日历图
 */
export default class Calendar extends BasePlot<any> {
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
