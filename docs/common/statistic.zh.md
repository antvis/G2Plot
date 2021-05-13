| 配置项  | 类型                   | 描述     |
| ------- | ---------------------- | -------- |
| title   | _false \| StatisticText_ | 标题     |
| content | _false \| StatisticText_ | 主体内容 |

StatisticText

| 配置项    | 类型     | 描述                 |
| --------- | -------- | -------------------- |
| style     | _CSSStyleDeclaration_ | 统计文本的样式 (css 样式)      |
| customHtml | `(container: HTMLElement, view: View, datum: object, data: object[]) => string;` | 自定义主体文本的 html，优先级高于 formatter |
| formatter | _Function_ | 主体文本的格式化内容 |
| content   | _string_   | 如果没有设置`formatter`函数, 将使用本属性做为内容 |
| rotate    | _number_   | 旋转角度             |
| offsetX   | _number_   | X 偏移值             |
| offsetY   | _number_   | Y 偏移值             |
