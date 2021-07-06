import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { NODE_ANCESTORS_FIELD } from '../../utils/hierarchy/util';
import { SunburstOptions } from './types';
import { adaptor } from './adaptor';
import { DEFAULT_OPTIONS, SUNBURST_ANCESTOR_FIELD, SUNBURST_PATH_FIELD } from './constant';
import './interactions';

export type { SunburstOptions };

export class Sunburst extends Plot<SunburstOptions> {
  /**
   * 获取 旭日图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<SunburstOptions> {
    return DEFAULT_OPTIONS;
  }

  /** 旭日图 节点的祖先节点 */
  static SUNBURST_ANCESTOR_FIELD = SUNBURST_ANCESTOR_FIELD;
  /** 旭日图 节点的路径 */
  static SUNBURST_PATH_FIELD = SUNBURST_PATH_FIELD;
  /** 节点的祖先节点 */
  static NODE_ANCESTORS_FIELD = NODE_ANCESTORS_FIELD;

  /** 图表类型 */
  public type: string = 'sunburst';

  /**
   * 获取 旭日图 默认配置
   */
  protected getDefaultOptions() {
    return Sunburst.getDefaultOptions();
  }

  /**
   * 获取旭日图的适配器
   */
  protected getSchemaAdaptor(): Adaptor<SunburstOptions> {
    return adaptor;
  }
}
