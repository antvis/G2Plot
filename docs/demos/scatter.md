---
title: 散点图
order: 17
---

# 散点图

## Scatter

```tsx
import React, { useEffect } from 'react';
import { Scatter } from '@antv/g2plot';

const Page: React.FC = () => {
  const data = [
    {
      x: 4,
      y: 5.365,
    },
    {
      x: 5,
      y: 5.448,
    },
    {
      x: 6,
      y: 5.744,
    },
    {
      x: 7,
      y: 5.653,
    },
    {
      x: 8,
      y: 5.844,
    },
    {
      x: 20,
      y: 7.013,
    },
    {
      x: 21,
      y: 6.82,
    },
    {
      x: 22,
      y: 6.647,
    },
    {
      x: 29,
      y: 6.898,
    },
    {
      x: 30,
      y: 7.392,
    },
    {
      x: 31,
      y: 6.938,
    },
  ];
  useEffect(() => {
    const scatter = new Scatter(document.getElementById('container'), {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'x',
      yField: 'y',
      pointSize: 5,
    });

    scatter.render();
  }, []);

  return <div id="container" />;
};
export default Page;
```
