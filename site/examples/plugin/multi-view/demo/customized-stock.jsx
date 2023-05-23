import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Mix } from '@antv/g2plot';

const DemoStock = () => {
  const chartNodeRef = React.useRef();
  const chartRef = React.useRef();

  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/antfincdn/qtQ9nYfYJe/stock-data.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const mixConfig = {
    appendPadding: 8,
    tooltip: {
      shared: true,
      showCrosshairs: true,
    },
    syncViewPadding: true,
    slider: {},
    data,
    plots: [
      {
        type: 'line',
        // 共享顶层 data
        top: true,
        options: {
          xField: 'trade_date',
          yField: 'amount',
          yAxis: {
            type: 'log',
            grid: null,
            line: null,
          },
          meta: {
            amount: {
              alias: '平均租金(元)',
              formatter: (v) => (v > 10000 ? `${(v / 10000).toFixed(0)}万` : `${v}`),
            },
          },
          color: '#FACC14',
        },
      },
      {
        type: 'line',
        top: true,
        options: {
          xField: 'trade_date',
          yField: 'vol',
          yAxis: false,
          meta: {
            vol: {
              alias: '数值(元)',
            },
          },
          color: '#5FB1EE',
        },
      },
      {
        type: 'stock',
        // 共享顶层 data
        top: true,
        options: {
          xField: 'trade_date',
          yField: ['open', 'close', 'high', 'low'],
        },
      },
    ],
    annotations: [
      {
        type: 'dataMarker',
        // 外部获取最大值的数据
        position: ['2020-03-05', 3074.2571],
        top: true,
        autoAdjust: false,
        direction: 'upward',
        text: {
          content: '顶峰值',
          style: {
            fontSize: 13,
          },
        },
        line: {
          length: 12,
        },
      },
      {
        type: 'dataMarker',
        // 外部获取最大值的数据
        position: ['2020-03-13', 2799.9841],
        top: true,
        direction: 'downward',
        text: {
          content: '2799.9841',
          style: {
            fontSize: 12,
          }
        },
        point: null,
        line: {
          length: 12,
        },
      }
    ],
  };

  React.useEffect(() => {
    const chartDom = chartNodeRef?.current;
    if (!chartDom) return;

    let plot = chartRef.current;
    if (!plot) {
      plot = new Mix(chartDom, mixConfig);
      plot.render();
      chartRef.current = plot;
    } else {
      plot.update(mixConfig);
    }
  }, [mixConfig]);

  return <div style={{ height: '400px' }} ref={chartNodeRef} />;
};

ReactDOM.render(<DemoStock />, document.getElementById('container'));
