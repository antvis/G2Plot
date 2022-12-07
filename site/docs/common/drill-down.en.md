#### drilldown

<description>**optional** _DrillDownCfg_ </description>

Configuration of drilldown interaction.

Types of _DrillDownCfg_ are as follows:

| Properties | Type            | Description                      |
| ---------- | --------------- | -------------------------------- |
| enabled | _boolean_ | Whether enable drilldown interaction, default: 'false' |
| breadCrumb | _BreadCrumbCfg_ | UI configurations of breadCrumb. |

Types of _BreadCrumbCfg_ are as follows:

| Properties  | Type         | Description                           |
| ----------- | ------------ | ------------------------------------- |
| position    | _string_     | Position of breadCrumnb. Options: 'top-left' | 'bottom-left' |
| rootText    | _string_     | Text content of root, default: 'Root' |
| dividerText | _string_     | Divider, default: '/'                 |
| textStyle   | _ShapeAttrs_ | Style of text                         |
| activeStyle | _ShapeAttrs_ | Style of text when active (hover)     |
