---
title: Treemap - 矩形树图
order: 6
---

<img src ='https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*pUqpTpFTHRkAAAAAAAAAAABkARQnAQ' width='400'>

## API

说明： **required** 标签代表生成图表的必选配置项，**optional** 标签代表生成图表的可选配置项。

### title

**optional** 见[通用图表配置](../general-config#title)。

### description

**optional** 见[通用图表配置](../general-config#description)。

### width

**optional** 见[通用图表配置](../general-config#width)。

### height

**optional** 见[通用图表配置](../general-config#height)。

### forceFit

**optional** 见[通用图表配置](../general-config#forceFit)。

### padding

**optional** 见[通用图表配置](../general-config#padding)。

### theme

**optional** 见[通用图表配置](../general-config#theme)。

### data

**required**

矩形树图的数据源为json格式的层级嵌套数据，除叶子节点之外，每一层级的数据都需要具备三个属性：

- `name`: string 该层级数据的名称
- `value`: number 该层级数据的数值
- `children`: array  该层级数据的子级

当某一层级的数据没有子级(children)时，该层级即为叶子节点。

示例：

```js
{
    name:'root',
    value:100,
    children:[
        {
            name:'a',
            value:10,
            children:[]
        },
        {
            name:'b',
            value:5,
            children:[]
        }
    ]
}
```

### colorField

**required**, string 类型

矩形颜色映射对应的数据字段名，一般对应一个连续字段或一个分类字段。

### color

**optional**, string[] | function 类型

指定矩形颜色。如不进行配置则采用 theme 中的配色。

```js
color: ['#295599', '#3e94c0', '#78c6d0', '#b4d9e4', '#fffef0', '#f9cdac', '#ec7d92', '#bc448c']
```

### rectStyle

**optional**, object | function 类型

配置矩形样式

`stroke: string`  矩形的边框颜色<br />
`opacity: number`  透明度<br />
`lineWidth: number`  矩形边框线的线宽<br />
`lineDash: number[]`  矩形边框线的虚线配置

另外还支持回调函数的配置方式，入参为当前图形的对应数据，出参为一个样式配置对象。

### label

**optional** 图形标签

`visible: boolean`  图形标签是否显示<br />
`formatter: function`  对 label 的显示文本进行格式化<br/>
`offsetX: number` 在 label 位置的基础上再往 x 方向的偏移量<br/>
`offsetY: number` 在 label 位置的基础上再往 y 方向的偏移量<br/>
`style: object` 配置 label 文本


### tooltip

**optional** 见[通用图表配置](../general-config#tooltip)。


### interaction

**optional** array类型

图表的交互行为。

`type: string` 交互的类型
`cfg: object` 交互的配置信息

配置方式：
```js
interactions: [
    {
        type: 'drilldown',
        cfg:{

        }
    }
]
```


#### drilldown

数据钻取交互，通过矩形的点击事件及面包屑组件完成数据的上卷下钻。点击矩形下钻至该分类的子级数据，而点击面包屑各节点则可以跳转至当前层级的任一上级节点。

在钻取过程中，支持配置不同层级的映射。例如在下面的例子中，当钻取到第三个层级（某品类所有商品名录）时，数据量非常大，此时再采用分类颜色映射已经失去了认知信息有效性。因此例子中第一层及第二层使用了不同值域的分类映射，而第三层则根据数值大小采用了连续映射。

- `mapping` 配置数据钻取时各层级的颜色映射信息<br/>

`[key:number]`: 层级的深度(depth)，从1开始<br/>
`field: string`: 必选，映射字段<br/>
`values: string[] | function`: 可选，映射颜色，如不配置则默认采用theme中的色板。<br/>
当使用回调函数`function`的方式配置映射颜色时，入参为上一层级的数据及当期等级的数据，出参为一个色值。下图中第三层级的连续映射就是通过callback，根据上一层级的分类颜色产生渐变色指定的，保证了在钻取过程中映射变更时的认知连续性。


<img src ='https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*t1HzSYgYvycAAAAAAAAAAABkARQnAQ' width='400'>

示例代码：

```js
interactions: [
    {
        type: 'drilldown',
        cfg: {
            mapping: {
              1: {
                field: 'name',
              },
              2: {
                field: 'name',
                values: ['#f5bc32', '#e66557', '#71c8ea', '#9362b7', '#fd984f', '#279493', '#fd9bc3'],
              },
              3: {
                field: 'value',
                values: (parent) => {
                  const parentColor = parent.shape.attr('fill');
                  return ['#ffffff', parentColor];
                },
              },
            },
        },
    },
],
```

### events

**optional**

- 图形事件

`onRectClick: function`  图形点击事件<br />
`onRectDoubleClick: function`    图形双击事件<br />
`onRectMousemove: function`  图形鼠标移动事件<br />
`onRectMouseenter: function` 图形鼠标进入事件<br />
`onRectMouseleave: function` 图形鼠标移出事件<br />
`onRectMousedown: function` 图形鼠标点击事件<br />
`onRectMouseup: function` 图形鼠标抬起事件<br />
`onRectContextmenu: function`    图形右键事件<br />

- 面包屑组件事件

`onBreadcrumbClick: function`  面包屑组件点击事件<br />
`onBreadcrumbDoubleClick: function`    面包屑组件双击事件<br />
`onBreadcrumbMousemove: function`  面包屑组件鼠标移动事件<br />
`onBreadcrumbMouseenter: function` 面包屑组件鼠标进入事件<br />
`onBreadcrumbMouseleave: function` 面包屑组件鼠标移出事件<br />
`onBreadcrumbMousedown: function` 面包屑组件鼠标点击事件<br />
`onBreadcrumbMouseup: function` 面包屑组件鼠标抬起事件<br />
`onBreadcrumbContextmenu: function`    面包屑组件右键事件<br />


- 其他事件类型见[通用图表配置](../general-config#events)。