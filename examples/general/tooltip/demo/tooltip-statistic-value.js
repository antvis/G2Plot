import { Line } from '@antv/g2plot';

fetch('../data/emissions.json')
  .then((res) => res.json())
  .then((data) => {
    const linePlot = new Line(document.getElementById('container'), {
      title: {
        visible: true,
        text: 'Tooltip显示统计值+动态排序',
      },
      padding: 'auto',
      forceFit: true,
      data,
      xField: 'year',
      yField: 'value',
      seriesField: 'category',
      xAxis: {
        type: 'time',
      },
      yAxis: {
        label: {
          // 数值格式化为千分位
          formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
        },
      },
      tooltip: {
        custom: {
          onChange: (containerDom, cfg) => {
            const { items } = cfg;
            items.sort((a, b) => {
              return b.data.value - a.data.value;
            });
            const { sum, average } = getStatisticValue(items);
            items.push(
              {
                ...items[0],
                name: '总计值',
                value: sum,
                marker: false,
                color: null,
              },
              {
                ...items[0],
                name: '平均值',
                value: average,
                marker: false,
                color: null,
              }
            );
          },
        },
      },
      responsive: true,
    });

    linePlot.render();
  });

function getStatisticValue(items) {
  let sum = 0;
  items.forEach((ele) => {
    sum += ele.data.value;
  });
  const average = sum / items.length;
  return { sum, average };
}
