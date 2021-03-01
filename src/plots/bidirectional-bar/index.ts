import { VIEW_LIFE_CIRCLE, Event } from '@antv/g2';
import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { deepAssign, findViewById } from '../../utils';
import { BidirectionalBarOptions } from './types';
import { adaptor } from './adaptor';
import { syncViewPadding, transformData, isHorizontal } from './utils';
import { SERIES_FIELD_KEY, FIRST_AXES_VIEW, SECOND_AXES_VIEW } from './constant';

export { BidirectionalBarOptions };

export class BidirectionalBar extends Plot<BidirectionalBarOptions> {
  /** 图表类型 */
  public type: string = 'bidirectional-bar';

  /**
   * @override
   */
  public changeData(data = []) {
    this.chart.emit(
      VIEW_LIFE_CIRCLE.BEFORE_CHANGE_DATA,
      Event.fromData(this.chart, VIEW_LIFE_CIRCLE.BEFORE_CHANGE_DATA, null)
    );

    // 更新options
    this.updateOption({ data });
    const { xField, yField, layout } = this.options;
    // 处理数据
    const groupData: any[] = transformData(xField, yField, SERIES_FIELD_KEY, data, isHorizontal(layout));
    const [firstViewData, secondViewData] = groupData;
    const firstView = findViewById(this.chart, FIRST_AXES_VIEW);
    const secondView = findViewById(this.chart, SECOND_AXES_VIEW);
    // 更新对应view的data
    firstView.data(firstViewData);
    secondView.data(secondViewData);
    // 重新渲染
    this.chart.render(true);

    this.chart.emit(
      VIEW_LIFE_CIRCLE.AFTER_CHANGE_DATA,
      Event.fromData(this.chart, VIEW_LIFE_CIRCLE.AFTER_CHANGE_DATA, null)
    );
  }

  protected getDefaultOptions() {
    return deepAssign({}, super.getDefaultOptions(), {
      syncViewPadding,
    });
  }

  /**
   * 获取对称条形图的适配器
   */
  protected getSchemaAdaptor(): Adaptor<BidirectionalBarOptions> {
    return adaptor;
  }
}
