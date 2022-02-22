import { Types } from '@antv/g2';
import { Options, StyleAttr } from '../../types';

export interface HeatmapOptions extends Options {
  /**
   * @title 热力图类型
   * @description  'polygon' | 'density'
   */
  readonly type?: 'polygon' | 'density';
  /**
   * @title x轴字段
   */
  readonly xField: string;
  /**
   * @title y轴字段
   */
  readonly yField: string;
  /**
   * @title 颜色字段
   */
  readonly colorField?: string;
  /**
   * @title 热力格子中的形状
   */
  readonly shape?: string;
  /**
   * @title 热力格子中图形的尺寸比例
   * @description 只有当 shape 和 sizeField 至少指定一项后才生效
   */
  readonly sizeRatio?: number;
  /**
   * @title 坐标轴映射
   * @description 坐标轴映射 'x' | 'y'
   */
  readonly reflect?: 'x' | 'y';
  /**
   * @title 极坐标属性
   */
  readonly coordinate?: Types.CoordinateOption;

  /**
   * @title 图例相关
   */

  /**
   * @title 数据字段名
   * @description  点大小映射对应的数据字段名
   */
  readonly sizeField?: string;
  /**
   * @title size 对应的图例
   */
  readonly sizeLegend?: Options['legend'];

  /**
   * @title 样式相关
   */

  /**
   * @title 热力图形样式
   */
  readonly heatmapStyle?: StyleAttr;
  /**
   * @title 贴图图案
   * @description  在 type="density" 时不支持
   */
  readonly pattern?: Options['pattern'];
}
