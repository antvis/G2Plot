import { Types } from '@antv/g2';

export type Label =
  | false
  | ({
      /** 映射的字段。 */
      readonly fields?: string[];
      /** 回调函数。 */
      readonly callback?: Types.LabelCallback;
      /** 功能同 content ，兼容 v1 */
      readonly formatter?: Types.GeometryLabelCfg['content'];
    } & Types.GeometryLabelCfg);
