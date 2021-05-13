| Properties | Type                   | Description |
| ---------- | ---------------------- | ----------- |
| title      | _false \| StatisticText_ | title       |
| content    | _false \| StatisticText_ | content     |

StatisticText

| Properties | Type     | Description                       |
| ---------- | -------- | --------------------------------- |
| style      | _CSSStyleDeclaration_   | Styles for statistical text (css styles)       |
| customHtml | `(container: HTMLElement, view: View, datum: object, data: object[]) => string;` | custom content by using html，priority is higher than formatter |
| formatter  | _Function_ | The formatted content of the text |
| content    | _string_   | Text content, used when formatter is not provided  |
| rotate     | _number_   | Rotation Angle                    |
| offsetX    | _number_   | X offset                          |
| offsetY    | _number_   | Y offset                          |
