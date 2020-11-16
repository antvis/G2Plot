import { Line } from '@antv/g2plot';
import * as _ from '@antv/util';

fetch('https://gw.alipayobjects.com/os/bmw-prod/314fb8c6-e4ca-450d-8a80-0cab2e8a5a23.json')
  .then((res) => res.json())
  .then((data) => {
    const colors = ['#945FB9', '#DECFEA'];
    const markerMap = {
      price: 'circle',
      "competitor's price": 'triangle',
    };
    const markerStyle = {
      active: {
        style: {
          r: 2,
          stroke: '#000',
          lineWidth: 1,
        },
      },
    };
    const line = new Line('container', {
      data,
      autoFit: true,
      height: 400,
      xField: 'x',
      yField: 'value',
      seriesField: 'type',
      xAxis: {
        label: {
          autoRotate: false,
        },
      },
      appendPadding: [40, 0, 0, 0],
      color: colors,
      legend: false,
      tooltip: {
        showMarkers: false,
        follow: false,
        position: 'top',
        offsetY: -30,
        offsetX: 0,
        shared: true,
        domStyles: {
          'g2-tooltip': {
            boxShadow: 'none',
            padding: 0,
            width: '375px',
          },
          'g2-tooltip-items': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
          },
          'g2-tooltip-item': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          },
          'g2-tooltip-item-marker': {
            width: '8px',
            height: '8px',
            marginRight: '8px',
          },
          'marker-hollow-circle': {
            background: 'transparent',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderRadius: '4px',
            transform: 'translateY(1px)',
          },
          'marker-circle': {
            borderRadius: '4px',
          },

          'g2-tooltip-item-label': {
            fontWeight: 700,
            color: 'rgba(0, 0, 0, 0.65)',
            marginRight: '4px',
          },
          'g2-tooltip-item-value': {
            fontWeight: 500,
            color: 'rgba(0, 0, 0, 0.65)',
            marginRight: '10px',
          },
        },
        customContent: (title, items) => {
          let htmlStr = `<div style="margin:10px 0;font-weight:700;">${title}</div><div class="g2-tooltip-items">`;
          items.forEach((item, idx) => {
            htmlStr += `<div class="g2-tooltip-item" style="margin-bottom:8px;display:flex;justify-content:space-between;">
                <span class="g2-tooltip-item-marker" style="background:${item.color};border-color:${item.color}"></span>
                <span class="g2-tooltip-item-label">${item.name}</span>
                <span class="g2-tooltip-item-value">${item.value}</span>
              </div>`;
          });
          htmlStr += '</div>';
          return htmlStr;
        },
      },
      point: {
        style: ({ date, value, type }) => {
          const dataIndex = data.findIndex((r) => r.date === date);
          // every 30 dataPoints show a point, strategy depends by yourself
          if (dataIndex % 30 === 0) {
            return {
              r: 3,
              stroke: '#fff',
              fill: type !== 'price' ? colors[0] : colors[1],
            };
          }
          return {
            fill: 'transparent',
            stroke: 'transparent',
            lineWidth: 0,
          };
        },
        shape: ({ type }) => {
          return markerMap[type];
        },
      },
      lineStyle: {
        lineWidth: 1.5,
      },

      theme: {
        geometries: {
          point: {
            circle: markerStyle,
            triangle: markerStyle,
          },
        },
      },
      interactions: [{ type: 'marker-active' }],
    });

    line.render();
    // 初始化，默认激活
    const point = line.chart.getXY({
      x: '9/30',
      value: 40,
    });
    line.chart.showTooltip(point);
    line.on('plot:mouseleave', () => {
      line.chart.hideTooltip();
    });
  });
