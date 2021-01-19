Applicable to base bar charts and base bar charts, the Conversion Rate component allows the user to focus on the rate of change in the data.

<description>**optional** _object_ | _false_</description>

| Attr    | Type            | Required | Default | Description                                              |
| ------- | --------------- | -------- | ------- | -------------------------------------------------------- |
| size    | number          | No       | -       | Conversion rate Component dimensions                     |
| spacing | number          | No       | -       | Component and column spacing                             |
| offset  | number          | No       | -       | Component and axis spacing                               |
| arrow   | ArrowCfg、false | No       | -       | Arrow shape configuration, false does not display arrows |
| text    | TextCfg、false  | No       | -       | Text configuration, false does not display text          |

ArrowCfg configuration is as follows:

| Attr     | Type   | Required | Default | Description       |
| -------- | ------ | -------- | ------- | ----------------- |
| headSize | number | No       | -       | Size of the arrow |
| style    | object | No       | -       | Arrow style       |

TextCfg configuration is as follows:

| Attr      | Type                                 | Required | Default | Description                        |
| --------- | ------------------------------------ | -------- | ------- | ---------------------------------- |
| headSize  | number                               | No       | -       | Size of the arrow                  |
| style     | object                               | No       | -       | Arrow style                        |
| formatter | (prev:number, next:number) => string | No       | -       | Custom conversion rate calculation |

Please refer to the style configuration [ShapeAttrs](/en/docs/api/graphic-style)
