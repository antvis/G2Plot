<description>**optional** _object_ | _false_</description>

| Properties | Type                | Default | Description                                              |
| ---------- | ------------------- | ------- | -------------------------------------------------------- | ----------------------------------------------- |
| size       | _number_            | -       | Conversion rate Component dimensions                     |
| spacing    | _number_            | -       | Component and column spacing                             |
| offset     | _number_            | -       | Component and axis spacing                               |
| arrow      | _ArrowCfg \| false_ | -       | Arrow shape configuration, false does not display arrows |
| text       | _TextCfg \| false_  | No      | -                                                        | Text configuration, false does not display text |

ArrowCfg configuration is as follows:

| Properties | Type     | Default | Description       |
| ---------- | -------- | ------- | ----------------- |
| headSize   | _number_ | -       | Size of the arrow |
| style      | _object_ | -       | Arrow style       |

TextCfg configuration is as follows:

| Properties | Type                                   | Default | Description                        |
| ---------- | -------------------------------------- | ------- | ---------------------------------- |
| headSize   | _number_                               | -       | Size of the arrow                  |
| style      | _object_                               | -       | Arrow style                        |
| formatter  | _(prev:number, next:number) => string_ | -       | Custom conversion rate calculation |

Please refer to the style configuration [ShapeAttrs](/en/docs/api/graphic-style)
