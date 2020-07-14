---
title: 散点图
order: 17
---

# 散点图

## Scatter

```tsx
import React, { useEffect, useState, useRef } from 'react';
import { Scatter } from '@antv/g2plot';

const Page: React.FC = () => {
  const [data, setData] = useState([]);
  const chart = useRef();
  const fetchData = () => {
    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  useEffect(() => {
    chart.current = new Scatter('container', {
      width: 400,
      height: 300,
      appendPadding: 10,
      data,
      xField: 'weight',
      yField: 'height',
      seriesField: 'gender',
      shape: ['circle', 'square'],
      symbolSize: 5,
      tooltip: {
        showCrosshairs: true,
        crosshairs: {
          type: 'xy',
        },
      },
    });
    chart.current.render();

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length) {
      chart.current.changeData(data);
    }
  }, [data]);

  return <div id="container" />;
};
export default Page;
```
