import { Treemap } from '@antv/g2plot';
import { each } from '@antv/util';

fetch('https://gw.alipayobjects.com/os/basement_prod/be471bfc-b37f-407e-833b-0f489bd3fdb2.json')
  .then((res) => res.json())
  .then((data) => {
    // 对数据进行预处理
    const mobileData = processData(data);
    const treemapPlot = new Treemap(document.getElementById('container'), {
      data: mobileData,
      colorField: 'brand',
    });
    treemapPlot.render();
  });

function processData(data) {
  let sumValue = 0;
  each(data, (d) => {
    sumValue += d.value;
  });

  return { name: 'root', value: sumValue, children: data };
}
