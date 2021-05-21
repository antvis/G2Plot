| Properties | Type                   | Description |
| ---------- | ---------------------- | ----------- |
| title      | _false \| StatisticText_ | title       |
| content    | _false \| StatisticText_ | content     |

StatisticText

| Properties | Type     | Description                       |
| ---------- | -------- | --------------------------------- |
| style      | _CSSStyleDeclaration_   | Styles for statistical text (css styles)       |
| content | _string_ | Content of the text。Priority: `customHtml` > `formatter` > `content` |
| customHtml | _CustomHtml_ | custom content by using html，priority is higher than formatter |
| formatter  | _Function_ | The formatted content of the text |
| rotate     | _number_   | Rotation Angle                    |
| offsetX    | _number_   | X offset                          |
| offsetY    | _number_   | Y offset                          |

Type of **CustomHtml** is as follow:

```ts
type CustomHtml = (container: HTMLElement, view: View, datum: object, data: object[]) => string;
```
