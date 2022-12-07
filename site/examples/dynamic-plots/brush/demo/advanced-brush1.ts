import { Column, G2 } from '@antv/g2plot';
import insertCss from 'insert-css';

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

    const plot2 = new Column('container2', {
      data,
      xField: 'release',
      yField: 'rank',
      yAxis: false,
      appendPadding: [0, 0, 0, 20],
      tooltip: {
        containerTpl: '<div class="g2-tooltip"><div class="g2-tooltip-list"></div></div>',
        itemTpl: '<span>{value}</span>',
        domStyles: {
          'g2-tooltip': {
            padding: '2px 4px',
            fontSize: '10px',
          },
        },
      },
      brush: {
        enabled: true,
        mask: {
          style: {
            fill: 'rgba(0,0,0,0.2)',
          },
        },
      },
      interactions: [{ type: 'active-region', enable: false }],
    });

    plot2.render();

    plot2.on(G2.BRUSH_FILTER_EVENTS.AFTER_FILTER, () => {
      // after brush filter
      const filteredData = plot2.chart.getData();
      const releases = filteredData.map((d) => d.release);
      plot1.changeData(data.filter((datum) => releases.includes(datum.release)));
    });

    plot2.on(G2.BRUSH_FILTER_EVENTS.AFTER_RESET, () => {
      // after brush filter reset
      plot1.changeData(data);
    });
  });
