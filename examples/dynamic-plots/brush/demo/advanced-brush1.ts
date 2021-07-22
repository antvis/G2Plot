import { Column, G2 } from '@antv/g2plot';
import { each, groupBy } from '@antv/util';
import insertCss from 'insert-css';

const div1 = document.createElement('div');
div1.id = 'container1';
const div2 = document.createElement('div');
div2.id = 'container2';

const container = document.querySelector('#container');
container.appendChild(div1);
container.appendChild(div2);

insertCss(`
#container {
  display: flex;
  flex-direction: column;
  padding: 12px 8px;
}
#container1 {
  flex: 1;
}
#container2 {
    padding-top: 12px;
  height: 120px;
}
`);

fetch('https://gw.alipayobjects.com/os/antfincdn/v6MvZBUBsQ/column-data.json')
  .then((res) => res.json())
  .then((data) => {
    const plot1 = new Column('container1', {
      data,
      xField: 'release',
      yField: 'count',
      meta: {
        count: {
          alias: 'top2000 唱片总量',
          nice: true,
        },
        release: {
          tickInterval: 5,
          alias: '唱片发行年份',
        },
      },
      tooltip: {
        fields: ['release', 'artist', 'count'],
      },
    });

    plot1.render();

    // 可以用于筛选 “唱片发行总量高”的作家，然后对 plot1 进行高亮，发掘和“唱片发行年份”的关系
    const data2 = [];
    each(groupBy(data, 'artist'), (v, artist) => {
      data2.push({ artist, count: v.reduce((a, b) => a + b.count, 0) });
    });
    data2.sort((a, b) => a.count - b.count);
    const plot2 = new Column('container2', {
      data: data2,
      xField: 'artist',
      yField: 'count',
      yAxis: false,
      brush: {
        enabled: true,
        type: 'y',
      },
      interactions: [{ type: 'active-region', enable: false }],
    });

    plot2.render();

    plot2.on(G2.VIEW_LIFE_CIRCLE.AFTER_RENDER, (evt) => {
      if (evt.data?.source === G2.BRUSH_FILTER_EVENTS.FILTER) {
        // after brush filter
        const filteredData = plot2.chart.getData();
        const artists = filteredData.map((d) => d.artist);
        plot1.setState('active', (datum) => artists.includes(datum.artist));
        plot1.setState('active', (datum) => !artists.includes(datum.artist), false);
      }

      if (evt.data?.source === G2.BRUSH_FILTER_EVENTS.RESET) {
        // after brush filter reset
        // 取消激活
        plot1.setState('active', () => true, false);
      }
    });
  });
