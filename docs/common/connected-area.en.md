Applicable to stacked bar charts and stacked bar charts, the link area component provides visual assistant identification by drawing the link area of the same field, which is convenient for data comparison. (Attention：could not use with **columnBackground** )

<description>**optional** _object_ | _false_</description>

| Properties | Type             | Required     | Default ｜ Description |
| ---------- | ---------------- | ------------ | ---------------------- |
| trigger    | 'hover'、'click' | No ｜'hover' | Trigger method         |
| style | _ConnectedAreaStyleCfg_ |  | No ｜ | StyleCfg of connectedArea          |

Types of **_ConnectedAreaStyleCfg_** are as follows:

```sign
type ConnectedAreaStyleCfg = ShapeAttrs | ((oldStyle: ShapeAttrs, element: Element) => ShapeAttrs);
```

**Examples:**

<playground path="column/stacked/demo/connect-area.ts" rid="connectedArea"></playground>