import { Types } from '@antv/g2';

export type Label =
  | false
  | ({
      /**
       * @title 映射的字段
       */
      readonly fields?: string[];
      /**
       * @title 回调函数
       * @description 回调函数，返回相关点 value
       */
      readonly callback?: Types.LabelCallback;
      /**
       * @title 格式化
       * @description 功能同 content ，兼容 v1，一般用于自定义。
       */
      readonly formatter?: Types.GeometryLabelCfg['content'];
    } & Types.GeometryLabelCfg);
