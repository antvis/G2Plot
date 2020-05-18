import { Line, Pie } from '@antv/g2plot';

let pieChart;

fetch('../data/emissions.json')
  .then((res) => res.json())
  .then((data) => {
    const linePlot = new Line(document.getElementById('container'), {
      title: {
        visible: true,
        text: 'Tooltip内展示图表',
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
            const pieData = getPieData(cfg);
            if (!pieChart) {
              containerDom.innerHTML = '';
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
    data.push(item.data);
  });
  return data;
}

function createPieChart(container, data) {
  pieChart = new Pie(container, {
    forceFit: false,
    width: 250,
    height: 200,
    data,
    padding: [0, 0, 50, 0],
    angleField: 'value',
    colorField: 'category',
    legend: {
      visible: true,
      position: 'bottom-center',
      flipPage: false,
    },
  });
  pieChart.render();
}
