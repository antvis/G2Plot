import { Line } from '@antv/g2plot';
import { last } from '@antv/util';

const colors = ['#5B8FF9', '#5AD8A6', '#5D7092'];

fetch('https://gw.alipayobjects.com/os/bmw-prod/5a209bb2-ee85-412f-a689-cdb16159a459.json')
  .then((data) => data.json())
  .then((data) => {
    const line = new Line('container', {
      padding: 'auto',
      appendPadding: [60, 10, 0, 10],
      data,
      xField: 'year',
      yField: 'value',
      seriesField: 'country',
      lineStyle: ({ country }) => {
        const importantCountries = ['United States', 'France', 'Germany'];
        const idx = importantCountries.indexOf(country);
        return { stroke: colors[idx] || '#8C8C8C', lineWidth: idx !== -1 ? 2 : 1 };
      },
      interactions: [{ type: 'brush' }],
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
            padding: '0 0 0 10px',
            width: '100%',
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
    });

    line.render();
    // 初始化，默认激活
    const point = line.chart.getXY(last(data.filter((d) => !!d.value)));
    line.chart.showTooltip(point);
  });
