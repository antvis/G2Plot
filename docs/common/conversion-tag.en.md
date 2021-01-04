适用于基础柱形图和基础条形图，转化率组件可以让用户关注到数据的变化比例。

<description>**optional** _object_ | _false_</description>

| 配置项  | 类型            | 是否必选 | 默认值 | 功能描述                         |
| ------- | --------------- | -------- | ------ | -------------------------------- |
| size    | number          | 否       | -      | 转化率组件尺寸                   |
| spacing | number          | 否       | -      | 组件和柱子间距                   |
| offset  | number          | 否       | -      | 组件和轴线间距                   |
| arrow   | ArrowCfg、false | 否       | -      | 箭头形状配置，false 时不显示箭头 |
| text    | TextCfg、false  | 否       | -      | 文本配置、false 时不显示文本     |

其中 ArrowCfg 配置如下

| 配置项   | 类型   | 是否必选 | 默认值 | 功能描述 |
| -------- | ------ | -------- | ------ | -------- |
| headSize | number | 否       | -      | 箭头尺寸 |
| style    | object | 否       | -      | 箭头样式 |

TextCfg 配置如下

| 配置项    | 类型                                 | 是否必选 | 默认值 | 功能描述         |
| --------- | ------------------------------------ | -------- | ------ | ---------------- |
| headSize  | number                               | 否       | -      | 箭头尺寸         |
| style     | object                               | 否       | -      | 箭头样式         |
| formatter | (prev:number, next:number) => string | 否       | -      | 自定义转化率计算 |

样式配置类型请参考[ShapeAttrs](/en/docs/api/shape/shape-attrs)
