import { Adaptor } from '../../core/adaptor';
import { Plot } from '../../core/plot';
import { adaptor } from './adaptor';
import { TemplateOptions } from './types';

export type { TemplateOptions };

/**
 * 这个是一个图表开发的 模板代码！
 */
export class Template extends Plot<TemplateOptions> {
  /** 图表类型 */
  public type: string = 'template';

  /**
   * 获取适配器
   */
  protected getSchemaAdaptor(): Adaptor<TemplateOptions> {
    return adaptor;
  }
}
