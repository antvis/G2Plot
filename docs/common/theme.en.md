#### Theme

Built-in defaults: 'default' and 'dark'

```ts
{
  theme: 'default', // 'dark',
}
```
#### Theme attributes

In addition to using the built-in 'default' and 'dark' themes, you can also modify some of the theme content by setting the theme properties.

The following table lists the specific properties on the configuration items that make up the topic:

| Properties            | Type       | Description                                                                                                   |
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
| multiplePieWidthRatio | number     | Multilayer pie and loop ratio, 0-1 range values                                                               |
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

#### Update theme

usage：

```ts
// example 1:
plot.update({ theme: 'dark' });

// example 2:
plot.update({ theme: { defaultColor: '#FF6B3B' } });
```

#### Custom theme

In addition, G2 provides a custom topic mechanism to define a new topic structure, allowing users to switch and define chart topics.

<playground path="general/theme/demo/register-theme.ts" rid="rect-register-theme"></playground>

Go [DEMO](/en/examples/general/theme#register-theme)
