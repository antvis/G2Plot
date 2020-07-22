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
      data: data.slice(0, 50),
      xField: 'weight',
      yField: 'height',
      // shape: 'circle',
      // shape: ['circle', 'square'],
      shape: ['image', 'https://gw.alipayobjects.com/zos/rmsportal/dWJWRLWfpOEbwCyxmZwu.png'],
      // shape: (v) => {
      //   return 'circle';
      // },
      // colorField: 'gender',
      // color: 'red',
      // color: ['green', 'red'],
      // color: (v, d) => {
      //   return 'red';
      // },
      // sizeField: 'weight',
      pointSize: 'weight',
      // pointSize: [10, 20],
      // pointSize: (v, d) => {
      //   return [10, 29];
      // },
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
