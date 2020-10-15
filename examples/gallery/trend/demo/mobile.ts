import { Line } from '@antv/g2plot';
import DataSet from '@antv/data-set';
import { last } from '@antv/util';

fetch('https://gw.alipayobjects.com/os/bmw-prod/49a2fe69-ae03-4799-88e2-55c096a54d45.json')
  .then((res) => res.json())
  .then((originalData) => {
    const color = ['#5B8FF9', '#C2C8D5', '#BEDED1', '#EFE0B5', '#B5D7E5', '#F4DBC6'];
    const colorMap = {
      code: color[0],
      code_去年同期: color[1],
      code_上月同期: color[2],
      code_上周同期: color[3],
    };
    const markerMap = {
      code: 'hollow-circle',
      code_去年同期: 'circle',
      code_上月同期: 'square',
      code_上周同期: 'triangle',
    };
    const dv = new DataSet().createView().source(originalData);
    dv.transform({
      type: 'fold',
      fields: ['code', 'code_去年同期', 'code_上月同期', 'code_上周同期'], // 展开字段集
      key: 'type', // key字段
      value: 'value', // value字段
    });
    const line = new Line('container', {
      data: dv.rows,
      padding: 'auto',
      width: 375,
      height: 400,
      autoFit: false,
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      appendPadding: [80, 0, 0, 0],
      color,
      meta: {
        value: {
          formatter: (v) => `${(v / 10000).toFixed(2)} 万`,
        },
        type: {
          formatter: (type) => {
            return type === 'code' ? 'xxx 指标' : type.slice(5);
          },
        },
      },
      xAxis: {
        label: {
          autoRotate: false,
        },
      },
      yAxis: {
        tickCount: 5,
        label: {
          formatter: (v, item) => `${(Number(item.id) / 10000).toFixed(0)} 万`,
        },
      },
      legend: false,
      tooltip: {
        showMarkers: false,
        follow: false,
        position: 'top',
        offsetY: -30,
        offsetX: 0,
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
          'marker-triangle': {
            transform: 'translateY(-2px)',
            border: '4px solid rgba(0, 0, 0, 0)',
            background: 'transparent',
            borderBottom: `8px solid ${color[3]}`,
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
            if (idx >= 4) {
              return;
            }
            htmlStr += `<div class="g2-tooltip-item" style="margin-bottom:8px;display:flex;justify-content:space-between;">
                <span class="g2-tooltip-item-marker marker-${markerMap[item.data.type]}" style="background:${
              colorMap[item.data.type]
            };border-color:${colorMap[item.data.type]}"></span>
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
          const dataIndex = dv.rows.findIndex((r) => r.date === date);
          // every 30 dataPoints show a point, strategy depends by yourself
          if (dataIndex % 30 === 0) {
            return {
              r: 2,
              stroke: colorMap[type],
              fill: type !== 'code' ? colorMap[type] : '#fff',
            };
          }
          return {
            fill: 'transparent',
            stroke: 'transparent',
            lineWidth: 0,
          };
        },
        shape: ({ date, value, type }) => {
          return markerMap[type];
        },
      },
      lineStyle: ({ date, value, type }) => {
        if (type === 'code') {
          return {
            lineWidth: 2,
          };
        }
        return {
          lineWidth: 1,
        };
      },
      interactions: [
        {
          type: 'element-active',
        },
      ],
    });

    line.render();
    // 初始化，默认激活最后一条数据
    const point = line.chart.getXY(last(dv.rows));
    line.chart.showTooltip(point);
  });
