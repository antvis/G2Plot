import { Treemap } from '@antv/g2plot';

function processData(data) {
  // 会通过子节点累加 value 值，所以设置为 0
  return {
    name: 'root',
    children: data.map((mobile) => {
      mobile.value = null;
      return mobile;
    }),
  };
}

fetch('https://gw.alipayobjects.com/os/basement_prod/be471bfc-b37f-407e-833b-0f489bd3fdb2.json')
  .then((res) => res.json())
  .then((data) => {
    // 对数据进行预处理
    const mobileData = processData(data);
    const treemapPlot = new Treemap('container', {
      data: mobileData,
      colorField: 'name',
      seriesField: 'value',
    });
    treemapPlot.render();
  });
