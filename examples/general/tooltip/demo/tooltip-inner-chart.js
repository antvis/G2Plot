import { Line, Pie } from '@antv/g2plot';

let pieChart;

fetch('../data/emissions.json')
  .then((res) => res.json())
  .then((data) => {
    const linePlot = new Line(document.getElementById('container'), {
      title: {
        visible: true,
        text: 'The causes of CO2 emissions',
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
        follow: false,
        customContent: {
          callback: (containerDom, cfg) => {
            const pieData = getPieData(cfg);
            if (!pieChart) {
              createPieChart(containerDom, pieData);
            } else {
              pieChart.changeData(pieData);
            }
          },
        },
      },
      responsive: true,
    });

    linePlot.render();
  });

function getPieData(tooltipCfg) {
  const data = [];
  const { items } = tooltipCfg;
  items.forEach((item) => {
    data.push({
      value: item.data.value,
      category: item.data.category,
    });
  });
  return data;
}

function createPieChart(container, data) {
  pieChart = new Pie(container, {
    forceFit: false,
    width: 150,
    height: 150,
    data,
    padding: [0, 0, 0, 0],
    angleField: 'value',
    colorField: 'category',
    legend: {
      visible: false,
    },
  });
  pieChart.render();
}
