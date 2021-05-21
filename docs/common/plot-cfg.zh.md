#### IPlot.type

<description>**必选** _string_</description>

plot 类型，通过传入指定 type 的 plot，可以在图层上渲染 G2Plot 内置的图表。

目前开放的图表类型有以下类型：

- **基础图表**：`'line' | 'pie' | 'column' | 'bar' | 'area' | 'gauge' |'scatter' | 'histogram'`
- **迷你图表**：`'tiny-line' | 'tiny-column' | 'tiny-area' | 'progress' | 'ring-progress'`

#### IPlot.options

<description>**必选** _object[]_</description>

plot 的具体配置项。每个 plot 都有自己的图层容器设置（不包括：width, height）以及数据、字段、样式等配置。

具体配置项见指定 plot 的 API 文档。如：type='column'时，options 对应 ColumnOptions，见文档: [Column API](/zh/docs/api/plots/column)

<div class="sign">

```ts
type IPlot =
  | {
      type: 'line';
      options: Omit<LineOptions, 'width' | 'height'>;
    }
  | {
      type: 'pie';
      options: Omit<PieOptions, 'width' | 'height'>;
    }
  | {
      // ... 等等
    };
```

</div>
