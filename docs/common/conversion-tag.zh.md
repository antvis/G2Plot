<description>**optional** _object_ | _false_</description>

| 配置项   | 类型                | 默认值 | 功能描述                         |
| ------- | ------------------- | ------ | -------------------------------- |
| size    | _number_            | -      | 转化率组件尺寸                   |
| spacing | _number_            | -      | 组件和柱子间距                   |
| offset  | _number_            | -      | 组件和轴线间距                   |
| arrow   | _ArrowCfg \| false_ | -      | 箭头形状配置，false 时不显示箭头 |
| text    | _TextCfg \| false_  | -      | 文本配置、false 时不显示文本     |

其中 ArrowCfg 配置如下

| 配置项   | 类型     | 默认值 | 功能描述 |
| -------- | -------- | ------ | -------- |
| headSize | _number_ | -      | 箭头尺寸 |
| style    | _object_ | -      | 箭头样式 |

TextCfg 配置如下

| 配置项    | 类型                                   | 默认值 | 功能描述         |
| --------- | -------------------------------------- | ------ | ---------------- |
| headSize  | _number_                               | -      | 箭头尺寸         |
| style     | _object_                               | -      | 箭头样式         |
| formatter | _(prev:number, next:number) => string_ | -      | 自定义转化率计算 |

样式配置类型请参考 [绘图属性](/zh/docs/api/graphic-style)
