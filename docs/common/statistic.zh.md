| 配置项  | 类型                   | 描述     |
| ------- | ---------------------- | -------- |
| title   | false \| StatisticText | 标题     |
| content | false \| StatisticText | 主体内容 |

StatisticText

| 配置项    | 类型     | 描述                 |
| --------- | -------- | -------------------- |
| style     | CSSStyleDeclaration | 统计文本的样式 (css 样式)      |
| customHtml | `(container: HTMLElement, view: View, datum: object, data: object[]) => string;` | 自定义主体文本的 html，优先级高于 formatter |
| formatter | Function | 主体文本的格式化内容 |
| rotate    | number   | 旋转角度             |
| offsetX   | number   | X 偏移值             |
| offsetY   | number   | Y 偏移值             |
