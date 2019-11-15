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

function randomArray(n) {
  return Array(n).map(() => Math.random() * 100);
}

loadCssCode(CSS);

// create table dom
const container = document.getElementById('container');
container.innerHTML = TABLE;

// data
const data = [
  {
    id: 'local-001',
    times: randomArray(10),
    trend: randomArray(10),
    load: Math.random(),
  },
  {
    id: 'local-002',
    times: randomArray(10),
    trend: randomArray(10),
    load: Math.random(),
  },
  {
    id: 'local-003',
    times: randomArray(10),
    trend: randomArray(10),
    load: Math.random(),
  },
  {
    id: 'local-004',
    times: randomArray(10),
    trend: randomArray(10),
    load: Math.random(),
  },
  {
    id: 'local-005',
    times: randomArray(10),
    trend: randomArray(10),
    load: Math.random(),
  },
];

//append data
const $tbody = $('.g2plot-table tbody');

const content = data.map((d) => {
  return `
    <tr class="g2plot-table-row">
      <td class="g2plot-table-column g2plot-table-column-id">${d.id}</td>
      <td class="g2plot-table-column" id="tiny-bar-${d.id}">tiny bar</td>
      <td class="g2plot-table-column" id="tiny-line-${d.id}">tiny line</td>
      <td class="g2plot-table-column" id="ring-progress-${d.id}">ring-progress</td>
    </tr>`;
});

console.log(content.join(''));

$tbody.innerHTML = content.join('');
