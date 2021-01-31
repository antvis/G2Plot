<div class='custom-api-docs'>

_ComponentAnimateOption_ is configured for each component animation type.

```ts
interface ComponentAnimateOption {
  appear?: ComponentAnimateCfg; // The entry animation when the chart first loads
  enter?: ComponentAnimateCfg; // After the chart is drawn and updated, the incoming animation of the new graph is generated
  update?: ComponentAnimateCfg; // After the chart is drawn and the data has changed, the updated animation of the graph with the state changed
  leave?: ComponentAnimateCfg; // After the chart is drawn and the data is changed, the destruction animation of the graph is destroyed
}

interface ComponentAnimateCfg {
  duration?: number; // Duration of the first animation
  easing?: string; // Easing method used for the first animation.
  delay?: number; // Delay before updating the animation
}
```

Where 'animation' passes in the name of the animation function, the built-in default animation function is shown in the table below, and you can also customize the animation function through 'registerAnimation'.

**Effects of animation**

| Animation         | Effect                                                                                                                                                                                                         | Description                                                      |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| 'fade-in'         | ![fade-in.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*LTRRRL8JwfQAAAAAAAAAAABkARQnAQ)                                                                                                          | 渐现动画。                                                       |
| 'fade-out'        | ![fade-out.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*s4Y4S5JJ6WEAAAAAAAAAAABkARQnAQ)                                                                                                         | 渐隐动画。                                                       |
| 'grow-in-x'       | ![grow-in-x.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*vhRVSLxDqU8AAAAAAAAAAABkARQnAQ)                                                                                                        | 容器沿着 x 方向放大的矩阵动画，多用于 G.Group 容器类进行动画。   |
| 'grow-in-y'       | ![grow-in-y.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*L6mkQa3aG64AAAAAAAAAAABkARQnAQ)                                                                                                        | 容器沿着 y 方向放大的矩阵动画，多用于 G.Group 容器类进行动画。   |
| 'grow-in-xy'      | ![grow-in-xy.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*LfPrQouGwYIAAAAAAAAAAABkARQnAQ)                                                                                                       | 容器沿着 x,y 方向放大的矩阵动画，多用于 G.Group 容器类进行动画。 |
| 'scale-in-x'      | ![scale-in-x.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*oiaGTLx-dNcAAAAAAAAAAABkARQnAQ)                                                                                                       | 单个图形沿着 x 方向的生长动画。                                  |
| 'scale-in-y'      | ![scale-in-y.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*T6mLTY3o9OoAAAAAAAAAAABkARQnAQ)                                                                                                       | 单个图形沿着 y 方向的生长动画。                                  |
| 'wave-in'         | ![wave-in-p.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*W5CdQIWw-M4AAAAAAAAAAABkARQnAQ)![wave-in-r.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*z9jjQY-lHcwAAAAAAAAAAABkARQnAQ) | 划入入场动画效果，不同坐标系下效果不同。                         |
| 'zoom-in'         | ![zoom-in.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*wc4dQp4E6vkAAAAAAAAAAABkARQnAQ)                                                                                                          | 沿着图形中心点的放大动画。                                       |
| 'zoom-out'        | ![zoom-out.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*PZ2gTrkV29YAAAAAAAAAAABkARQnAQ)                                                                                                         | 沿着图形中心点的缩小动画。                                       |
| 'path-in'         | ![path-in.gif](https://gw.alipayobjects.com/mdn/rms_f5c722/afts/img/A*gxZ1RIIMtdIAAAAAAAAAAABkARQnAQ)                                                                                                          | path 路径入场动画。                                              |
| 'position-update' |                                                                                                                                                                                                                | 图形位置移动动画。                                               |

</div>
