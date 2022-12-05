import { Treemap } from '@antv/g2plot';
import { insertCss } from 'insert-css';

// 我们用 insert-css 演示引入自定义样式
// 推荐将样式添加到自己的样式文件中
// 若拷贝官方代码，别忘了 npm install insert-css
insertCss(`
  .container{
    padding: 16px 0px;
    width: 160px;
    display: flex;
    flex-direction: column;
  }
  .title{
    font-weight: bold;
  }
  .tooltip-item{
    margin-top: 12px;
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

`);

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/mobile.json')
  .then((res) => res.json())
  .then((fetchData) => {
    const data = {
      name: 'root',
      children: fetchData,
    };
    const treemapPlot = new Treemap('container', {
      data,
      colorField: 'brand',
      // 为矩形树图增加缩放,拖拽交互
      interactions: [
        {
          type: 'view-zoom',
        },
        {
          type: 'drag-move',
        },
      ],
      tooltip: {
        follow: true,
        enterable: true,
        offset: 5,
        customContent: (value, items) => {
          if (!items || items.length <= 0) return;
          const { data: itemData } = items[0];
          const parent = itemData.path[1];
          const root = itemData.path[itemData.path.length - 1];
          return (
            `<div class='container'>` +
            `<div class='title'>${itemData.name}</div>` +
            `<div class='tooltip-item'><span>销量</span><span>${itemData.value}</span></div>` +
            `<div class='tooltip-item'><span>品牌</span><span>${itemData.brand}</span></div>` +
            `<div class='tooltip-item'><span>品牌占比</span><span>${((itemData.value / parent.value) * 100).toFixed(
              2
            )}%</span></div>` +
            `<div class='tooltip-item'><span>市场占比</span><span>${((itemData.value / root.value) * 100).toFixed(
              2
            )}%</span></div>` +
            `</div>`
          );
        },
      },
    });
    treemapPlot.render();
  });
