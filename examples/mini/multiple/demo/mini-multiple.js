
import {TinyLine, TinyColumn, RingProgress} from '@antv/g2plot';

const CSS = `
.g2plot-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  border-radius: 4px 4px 0 0;
  table-layout: fixed;
}
.g2plot-thead {
  display: table-header-group;
  vertical-align: middle;
  border-bottom-color: #e8e8e8;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  background-color: #fafafa
}
.th-id {
  width: 15%;
}
.th-status {
  width: 15%;
}
.g2plot-thead th {
  text-align: center;
  height: 24px;
  font-size: 12px;
}
.g2plot-table-row {
  height: 30px;
  vertical-align: middle;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #e8e8e8;
}
.g2plot-table-column {
  font-size: 12px;
  color: #8c8c8c;
  padding: 15px;
  text-align: center
}
.g2plot-guide-html {
  width: 50px;
  height: 40px;
  vertical-align: middle;
  line-height: 0.8
}
.g2plot-guide-html .title {
  font-size: 12px;
  color: #8c8c8c;
  font-weight: 300;
}
.g2plot-guide-html .value {
  font-size: 14px;
  color: #000;
  font-weight: bold;
}
`;

const TABLE = `<table class="g2plot-table">
  <!--head-->
  <thead class="g2plot-thead">
    <tr>
      <th class="th-id">服务器</th>
      <th>调用次数</th>
      <th>调用趋势</th>
      <th class="th-status">负载</th>
    </tr>
  </thead>
  <!--body-->
  <tbody>
  </tbody>
</table>`;

function $(selector) {
  return document.querySelector(selector);
}

function loadCssCode(code) {
  var style = document.createElement('style');
  style.type = 'text/css';
  style.rel = 'stylesheet';
  // for Chrome Firefox Opera Safari
  style.appendChild(document.createTextNode(code));
  // for IE
  // style.styleSheet.cssText = code;
  var head = document.getElementsByTagName('head')[0];
  head.appendChild(style);
}

loadCssCode(CSS);

// create table dom
const container = document.getElementById('container');
container.innerHTML = TABLE;

// data
const data = [
  {
    id: 'local-001',
    times: randomData(20,200,400),
    trend: randomData(10,10,1000),
    load: Math.random(),
  },
  {
    id: 'local-002',
    times: randomData(20,200,400),
    trend: randomData(10,10,1000),
    load: Math.random(),
  },
  {
    id: 'local-003',
    times: randomData(20,200,400),
    trend: randomData(10,10,1000),
    load: Math.random(),
  },
  {
    id: 'local-004',
    times: randomData(20,200,400),
    trend: randomData(10,10,1000),
    load: Math.random(),
  },
  {
    id: 'local-005',
    times: randomData(20,200,400),
    trend: randomData(10,10,1000),
    load: Math.random(),
  },
];

//append data
const $tbody = $('.g2plot-table tbody');

const content = data.map((d) => {
  return `
    <tr class="g2plot-table-row">
      <td class="g2plot-table-column g2plot-table-column-id">${d.id}</td>
      <td class="g2plot-table-column" id="tiny-bar-${d.id}"></td>
      <td class="g2plot-table-column" id="tiny-line-${d.id}"></td>
      <td class="g2plot-table-column" id="ring-progress-${d.id}"></td>
    </tr>`;
});

$tbody.innerHTML = content.join('');

function randomData(num,max,min){
  const data = [];
  for(let i =0; i<num; i++){
    data.push({index:String(i),value:min+Math.random()*(max - min)});
  }
  return data;
}

data.forEach((d)=>{
  //tiny-line
  const tinyLineContainer = $(`#tiny-line-${d.id}`);
  const tinyLine = new TinyLine(tinyLineContainer,{
    width: 200,
    height: 50,
    data: d.times,
    xField: 'index',
    yField: 'value',
    smooth: true,
    guideLine: [
      { type: 'mean',
        text: {
          position: 'start',
          content: '平均值', 
          style:{
            stroke:'white',
            lineWidth: 2
          }
        }
      }
    ],
  });
  tinyLine.render();
  //tiny-column
  const tinyColumnContainer = $(`#tiny-bar-${d.id}`);
  const tinyColumn= new TinyColumn(tinyColumnContainer,{
    width: 200,
    height: 50,
    data: d.trend,
    xField: 'index',
    yField: 'value',
    guideLine: [ 
      { type: 'median',
        text: {
          position: 'start',
          content: '中位数', 
          style:{
            stroke:'white',
            lineWidth: 2
          }
        } 
      } 
    ],
  });
  tinyColumn.render();
  //ring-progress
  const progressContainer = $(`#ring-progress-${d.id}`);
  const progress = new RingProgress(progressContainer,{
    width: 50,
    height: 50,
    percent:d.load,
    color: (v) => {
      if(v < 0.3){
        return ['green', '#E8EDF3'];
      }else if( v>= 0.3 && v< 0.7){
        return ['#55A6F3', '#E8EDF3'];
      }
      return ['red', '#E8EDF3'];
    },
  });
  progress.render();
});