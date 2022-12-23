export type AttributeTreeProps<C extends Partial<AttributeComponentProps> = AttributeComponentProps> = {
  onChange: (attrs: object) => void;
  attributes: any;
  config: AttributeComponentProps & C;
  relations?: {
    fromAttributeId: string;
    value: string | number | boolean | object; // field 比较 length，其他的配置比较 form 表单的 value
    operator: '=' | '!='; // 支持 =, !=, 待支持: >, < & in
    toAttributeId: string;
    // 支持 hidden, 待支持: disable
    action: 'hidden';
  }[];
};

type AttributeComponentProps = {
  type?: string;
  /** 属性组件 id */
  attributeId?: string;
  /** 属性组件 展示名 */
  displayName?: string;
  /** 属性组件 描述信息 */
  info?: string;
  /** 属性组件 默认值 */
  initialValue?: string | number | object;
  children?: AttributeComponentProps[];

  show?: boolean;
  // 组件相关的一些配置
  [k: string]: any;
};
