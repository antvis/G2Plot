import { Line, Pie } from '@antv/g2plot';

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

fetch('https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json')
  .then((res) => res.json())
  .then((data) => {
    const line = new Line('container', {
      data,
      xField: 'year',
      yField: 'value',
      seriesField: 'category',
      yAxis: {
        label: {
          // 数值格式化为千分位
          formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
        },
      },
      point: {
        shape: ({ category }) => {
          return category === 'Gas fuel' ? 'square' : 'circle';
        },
        style: ({ year }) => {
          return {
            r: Number(year) % 4 ? 0 : 3, // 4 个数据示一个点标记
          };
        },
      },
      legend: {
        position: 'bottom',
      },
      tooltip: {
        follow: true,
        enterable: true,
        offset: 5,
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
  });
