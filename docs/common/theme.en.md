#### Built-in Theme

Built-in defaults: 'default' and 'dark'

```ts
{
  theme: 'default', // 'dark',
}
```

#### Theme attributes

In addition to using the built-in 'default' and 'dark' themes, you can also modify some of the theme content by setting the theme properties.

The following table lists the specific properties on the configuration items that make up the topic:

| **Properties**        | **Type**   | **Description**                                                                                               |
| --------------------- | ---------- | ------------------------------------------------------------------------------------------------------------- |
| defaultColor          | _string_   | Theme color                                                                                                   |
| padding               | _number_   | number[]                                                                                                      |
| fontFamily            | _string_   | Chart font                                                                                                    |
| colors10              | _string[]_ | Category color palette, used when the number of categories is less than 10                                    |
| colors20              | _string[]_ | Category color palette, used when the number of categories is greater than 10                                 |
| columnWidthRatio      | _number_   | General histogram width ratio, 0-1 range of values                                                            |
| maxColumnWidth        | _number_   | Maximum width of histogram, pixel value                                                                       |
| minColumnWidth        | _number_   | Minimum width of histogram, pixel value                                                                       |
| roseWidthRatio        | _number_   | Rose width ratio, 0-1 range of value                                                                          |
| multiplePieWidthRatio | _number_   | Multilayer pie and loop ratio, 0-1 range values                                                               |
| geometries            | _object_   | Configure the style of each shape for each Geometry, including the default style and the style for each state |
| components            | _object_   | Configure theme samples for axes, legends, tooltips, and annotations                                          |
| labels                | _object_   | Configure the theme style of the label under Geometry                                                         |
| innerLabels           | _object_   | Configure Geometry to display the Labels theme style inside the graph                                         |
| pieLabels             | _object_   | Configure the theme style of pie chart labels                                                                 |

usage:

```ts
{
  theme: {
    colors10: [
      '#FF6B3B',
      '#626681',
      '#FFC100',
      '#9FB40F',
      '#76523B',
      '#DAD5B5',
      '#0E8E89',
      '#E19348',
      '#F383A2',
      '#247FEA',
    ];
  }
}
```

#### Theme attributes (StyleSheet)

除了以上介绍的主题属性之外，还可以传入主题样式表来自定义主题。如果你需要对全局主题进行配置的话，对样式风格进行切换，比如更改颜色、字体大小、边框粗细等

usage:

```ts
{
  theme: {
    styleSheet: {
      fontFamily: 'Avenir';
    }
  }
}
```

支持的样式表属性：

| **Properties**          | **Type** | **Description**                                   |
| ----------------------- | -------- | ------------------------------------------------- |
| `backgroundColor`       | _string_ | Background color                                  |
| `brandColor`            | _string_ | Brand color，默认取 10 色分类颜色色板的第一个颜色 |
| `paletteQualitative10`  | _string_ | Qualitative palette，分类个数小于 10 时使用       |
| `paletteQualitative20`  | _string_ | Qualitative palette，分类个数大于 10 时使用       |
| `paletteSemanticRed`    | _string_ | Semantic red                                      |
| `paletteSemanticGreen`  | _string_ | Semantic green                                    |
| `paletteSemanticYellow` | _string_ | Semantic yellow                                   |
| `fontFamily`            | _string_ | fontFamily                                        |

#### Update theme

usage：

```ts
// example 1:
plot.update({ theme: 'dark' });

// example 2:
plot.update({ theme: { defaultColor: '#FF6B3B' } });
```

#### Custom theme

In addition, G2 provides a custom topic mechanism to define a new topic structure, allowing users to switch and define chart topics. Go [G2 | Custom theme](https://g2.antv.vision/en/docs/api/advanced/register-theme) for more details.

<playground path="general/theme/demo/register-theme.ts" rid="rect-register-theme"></playground>

🌰 Customize theme [DEMO](/zh/examples/general/theme#register-theme) 
💄 Online theme constructor [AntV ThemeSet](https://theme-set.antv.vision)

