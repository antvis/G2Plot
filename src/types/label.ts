import { LabelCallback, GeometryLabelCfg } from '@antv/g2/lib/interface';

export type Label =
  | false
  | ({
      /** 映射的字段。 */
      readonly fields?: string[];
      /** 回调函数。 */
      readonly callback?: LabelCallback;
    } & GeometryLabelCfg);
