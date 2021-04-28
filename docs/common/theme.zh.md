#### 内置主题

目前默认的内置主要要两套：`default` 和 `dark` 

```ts
{
  theme: 'default', // 'dark',
}
```

#### 主题属性

除了使用内置的 `default` 和 `dark` 主题之外，还可以通过设置主题属性来修改部分主题内容：

下表列出了组成主题的大配置项上的具体属性：

| 主题属性 | 类型 |	描述 |
| --- | --- | ---|
| defaultColor | _string_| 主题色 |
| padding | _number_ |	number[] |
| fontFamily | _string_ |	图表字体 |
| colors10 | _string[]_ |	分类颜色色板，分类个数小于 10 时使用 |
| colors20 |_string[]_ |	分类颜色色板，分类个数大于 10 时使用 |
| columnWidthRatio | _number_ |	一般柱状图宽度占比，0 - 1 范围数值
| maxColumnWidth | _number_ |	柱状图最大宽度，像素值 |
| minColumnWidth| _number_ |	柱状图最小宽度，像素值 |
| roseWidthRatio | _number_ |	玫瑰图占比，0 - 1 范围数值 |
| multiplePieWidthRatio	| _number_ | 多层饼图/环图占比，0 - 1 范围数值 |
| geometries | _object_ |	配置每个 Geometry 下每个 shape 的样式，包括默认样式以及各个状态下的样式 |
| components | _object_ |	配置坐标轴，图例，tooltip, annotation 的主题样式 |
| labels | _object_ |	配置 Geometry 下 label 的主题样式 |
| innerLabels	| _object_  | 配置 Geometry 下展示在图形内部的 labels 的主题样式 |
| pieLabels	| _object_ | 配置饼图 labels 的主题样式 |

使用方式：
```ts
{
  theme: {
    colors10: ['#FF6B3B', '#626681', '#FFC100', '#9FB40F', '#76523B', '#DAD5B5', '#0E8E89', '#E19348', '#F383A2', '#247FEA']
  }
}
```

#### 主题属性（主题样式表）

除了以上介绍的主题属性之外，还可以传入主题样式表来自定义主题。如果你需要对全局主题进行配置的话，对样式风格进行切换，比如更改颜色、字体大小、边框粗细等

使用方式:
```ts
{
  theme: {
    styleSheet: {
      fontFamily: 'Avenir'
    }
  }
}
```

支持的样式表属性：

| **属性**                | **类型** | **描述**      |
| ----------------------- | -------- | ------------- |
| `backgroundColor`       | _string_ | 背景色        |
| `brandColor`            | _string_ | 主题色，默认取 10 色分类颜色色板的第一个颜色 |
| `paletteQualitative10`  | _string_ | 分类颜色色板，分类个数小于 10 时使用 |
| `paletteQualitative20`  | _string_ | 分类颜色色板，分类个数大于 10 时使用 |
| `paletteSemanticRed`    | _string_ | 语义红色      |
| `paletteSemanticGreen`  | _string_ | 语义绿色      |
| `paletteSemanticYellow` | _string_ | 语义黄色      |
| `fontFamily`            | _string_ | 字体          |


#### 更新主题

使用方式：
```ts
// 示例1:
plot.update({ theme: 'dark' });

// 示例2:
plot.update({ theme: { defaultColor: '#FF6B3B' } })
```

#### 自定义注册主题

另外，还可以通过 G2 提供了自定义主题机制来定义全新的主题结构，以允许用户切换、定义图表主题。前往 [G2 | 自定义主题](https://g2.antv.vision/zh/docs/api/advanced/register-theme) 查看详情。

<playground path="general/theme/demo/register-theme.ts" rid="rect-register-theme"></playground>

🌰 自定义主题 [DEMO](/zh/examples/general/theme#register-theme) 示例
💄 在线主题构建工具 [AntV ThemeSet](https://theme-set.antv.vision)

