import { Heatmap, G2 } from '@antv/g2plot';

G2.registerShape('polygon', 'boundary-polygon', {
  draw(cfg, container) {
    const group = container.addGroup();
    const attrs = {
      stroke: '#fff',
      lineWidth: 1,
      fill: cfg.color,
      paht: [],
    };
    const points = cfg.points;
    const path = [
      ['M', points[0].x, points[0].y],
      ['L', points[1].x, points[1].y],
      ['L', points[2].x, points[2].y],
      ['L', points[3].x, points[3].y],
      ['Z'],
    ];
    // @ts-ignore
    attrs.path = this.parsePath(path);
    group.addShape('path', {
      attrs,
    });

    if (cfg.data.lastWeek) {
      const linePath = [
        ['M', points[2].x, points[2].y],
        ['L', points[3].x, points[3].y],
      ];
      // 最后一周的多边形添加右侧边框
      group.addShape('path', {
        attrs: {
          path: this.parsePath(linePath),
          lineWidth: 4,
          stroke: '#404040',
        },
      });
      if (cfg.data.lastDay) {
        group.addShape('path', {
          attrs: {
            path: this.parsePath([
              ['M', points[1].x, points[1].y],
              ['L', points[2].x, points[2].y],
            ]),
            lineWidth: 4,
            stroke: '#404040',
          },
        });
      }
    }
    return group;
  },
});

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/github-commit.json')
  .then((res) => res.json())
  .then((data) => {
    const heatmapPlot = new Heatmap(document.getElementById('container'), {
      data,
      padding: [150, 30, 150, 70],
      xField: 'week',
      yField: 'day',
      colorField: 'commits',
      color: '#BAE7FF-#1890FF-#0050B3',
      reflect: 'y',
      shape: 'boundary-polygon',
      meta: {
        day: {
          type: 'cat',
          values: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        },
        week: {
          type: 'cat',
        },
        commits: {
          sync: true,
        },
        date: {
          type: 'cat',
        },
      },
      yAxis: {
        grid: null,
      },
      tooltip: {
        title: 'date',
        showMarkers: false,
      },
      interactions: [{ type: 'element-active' }],
      xAxis: {
        position: 'top',
        tickLine: null,
        line: null,
        label: {
          offset: 12,
          style: {
            fontSize: 12,
            fill: '#666',
            textBaseline: 'top',
          },
          formatter: (val) => {
            if (val === '2') {
              return 'MAY';
            } else if (val === '6') {
              return 'JUN';
            } else if (val === '10') {
              return 'JUL';
            } else if (val === '15') {
              return 'AUG';
            } else if (val === '19') {
              return 'SEP';
            } else if (val === '24') {
              return 'OCT';
            }
            return '';
          },
        },
      },
    });
    heatmapPlot.render();
  });
