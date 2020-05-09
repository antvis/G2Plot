import { Line } from '@antv/g2plot';

const container = document.getElementById('container');

const wrapperDom = document.createElement('div');
wrapperDom.style.width = '800px';
wrapperDom.style.height = '500px';
container.appendChild(wrapperDom);

const tooltipContainer = document.createElement('table');
tooltipContainer.style.width = '200px';
tooltipContainer.style.height = '400px';
tooltipContainer.style.position = 'absolute';
tooltipContainer.style.left = '510px';
tooltipContainer.style.top = '0px';
tooltipContainer.id = 'tooltip-container';
wrapperDom.appendChild(tooltipContainer);

const canvasDiv = document.createElement('div');
canvasDiv.style.width = '500px';
canvasDiv.style.height = '450px';
canvasDiv.style.marginLeft = '210px';
canvasDiv.id = 'canvas';
wrapperDom.appendChild(canvasDiv);

fetch('../data/emissions.json')
  .then((res) => res.json())
  .then((data) => {
    const linePlot = new Line(canvasDiv, {
      padding: 'auto',
      forceFit: true,
      data,
      xField: 'year',
      yField: 'value',
      seriesField: 'category',
      legend: {
        visible: false,
      },
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
        custom: {
          container: tooltipContainer,
          onChange: (containerDom, cfg) => {
            containerDom.innerHTML = '';
            const { items } = cfg;
            items.forEach((item) => {
              const tr = document.createElement('tr');
              tr.innerHTML =
                '<td><span class="g2-tooltip-marker" style = "width: 8px; height: 8px; background-color:' +
                item.color +
                '"></span>' +
                '</td><td>' +
                item.name +
                '</td><td>' +
                item.value +
                '</td>';
              containerDom.appendChild(tr);
            });
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
