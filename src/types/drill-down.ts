import { ShapeAttrs } from '@antv/g2';

export type DrillDownCfg = {
  /** Enable or disable the drillDown interaction */
  enabled?: boolean;
  /** 面包屑相关配置 */
  breadCrumb?: {
    /** 位置 */
    position: 'top-left' | 'bottom-left';
    /** 根文本 */
    rootText?: string;
    /** 分割线文本 */
    dividerText?: string;
    /** 字体样式 */
    textStyle?: ShapeAttrs;
    /** 激活的字体样式 */
    activeTextStyle?: ShapeAttrs;
  };
};
