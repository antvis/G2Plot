设置对应状态的样式，开放的状态有：`'default' | 'active' | 'inactive' | 'selected'` 四种。

示例：

```ts
{
  interactions: [{ type: 'element-active' }],
  state: {
    // 设置 active 激活状态的样式
    active: {
      animate: { duration: 100, easing: 'easeLinear' },
      style: {
        lineWidth: 2,
        stroke: '#000',
      },
    },
  }
};
```
