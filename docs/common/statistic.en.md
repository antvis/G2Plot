| Properties | Type                   | Description |
| ---------- | ---------------------- | ----------- |
| title      | _false \| StatisticText_ | title       |
| content    | _false \| StatisticText_ | content     |

StatisticText

| Properties | Type     | Description                       |
| ---------- | -------- | --------------------------------- |
| style      | _CSSStyleDeclaration_   | Styles for statistical text (css styles)       |
| content | `string` | Content of the text。Priority: `customHtml` > `formatter` > `content` |
| customHtml | `(container: HTMLElement, view: View, datum: object, data: object[]) => string;` | custom content by using html，priority is higher than formatter |
| formatter  | _Function_ | The formatted content of the text |
| rotate     | _number_   | Rotation Angle                    |
| offsetX    | _number_   | X offset                          |
| offsetY    | _number_   | Y offset                          |
