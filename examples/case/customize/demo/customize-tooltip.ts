import { Line, Pie } from '@antv/g2plot';
import { last } from '@antv/util';

const colors = ['#5B8FF9', '#5AD8A6', '#5D7092'];

const createPie = (container, data) => {
  const piePlot = new Pie(container, {
    data,
    width: 120,
    height: 120,
    appendPadding: 10,
    autoFit: false,
    angleField: 'value',
    colorField: 'type',
    legend: false,
    tooltip: false,
    animation: false,
    label: {
      type: 'inner',
      offset: '-10%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
    },
  });
  piePlot.render();
};

const divStyles = {
  position: 'absolute',
  background: '#fff',
  boxShadow: 'rgb(174, 174, 174) 0px 0px 10px',
  borderRadius: '4px',
};

const setStyles = (container, styles) => {
  for (const key in styles) {
    container.style[key] = styles[key];
  }
};

fetch('https://gw.alipayobjects.com/os/bmw-prod/5a209bb2-ee85-412f-a689-cdb16159a459.json')
  .then((data) => data.json())
  .then((data) =>
    data.filter((d) => ['United States', 'France', 'Germany', 'Austria', 'Japan', 'Sweden'].includes(d.country))
  )
  .then((data) => {
    const line = new Line('container', {
      padding: 'auto',
      appendPadding: [8, 10, 0, 10],
      data,
      xField: 'year',
      yField: 'value',
      seriesField: 'country',
      smooth: true,
      lineStyle: ({ country }) => {
        const importantCountries = ['United States', 'France', 'Germany'];
        const idx = importantCountries.indexOf(country);
        return { stroke: colors[idx] || '#8C8C8C', lineWidth: idx !== -1 ? 2 : 1 };
      },
      interactions: [{ type: 'brush' }],
      tooltip: {
        follow: true,
        enterable: true,
        offset: 18,
        shared: true,
        marker: { lineWidth: 0.5, r: 3 },
        customContent: (value, items) => {
          const pieData = items.map((item) => ({
            type: item.name,
            value: Number(item.value),
          }));
          const container = document.createElement('div');
          const pieContainer = document.createElement('div');
          setStyles(container, divStyles);
          createPie(pieContainer, pieData);
          container.appendChild(pieContainer);
          return container;
        },
      },
    });

    line.render();
    // 初始化，默认激活
    const point = line.chart.getXY(last(data.filter((d) => !!d.value)));
    line.chart.showTooltip(point);
  });
