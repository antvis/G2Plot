import { Column, G2 } from '@antv/g2plot';

const X_FIELD = 'stage';
const Y_FIELD = 'count';
const CONVERSTION_RATE = 'conversion-rate';

const data = [
  { stage: '简历投递数', count: 556834 },
  { stage: '简历评估通过数', count: 500000 },
  { stage: '终面通过数', count: 400000 },
  { stage: 'offer 数', count: 320000 },
  { stage: '入职数', count: 114000 },
];

// 添加转化率
function transformData(datas) {
  return datas.reduce((result, d, idx) => {
    if (idx > 0) {
      result[idx - 1][CONVERSTION_RATE] = result[idx - 1][Y_FIELD] !== 0 ? d[Y_FIELD] / result[idx - 1][Y_FIELD] : '∞';
    }
    result.push(d);
    return result;
  }, []);
}

function getRectPath(points) {
  const path = [];
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    if (point) {
      const action = i === 0 ? 'M' : 'L';
      path.push([action, point.x, point.y]);
    }
  }

  const first = points[0];
  path.push(['L', first.x, first.y]);
  path.push(['z']);
  return path;
}
function getFillAttrs(cfg) {
  const defaultAttrs = {
    lineWidth: 0,
    fill: '#1890FF',
    fillOpacity: 0.85,
  };

  return {
    ...defaultAttrs,
    ...cfg.style,
    fill: cfg.color,
    stroke: cfg.color,
    fillOpacity: cfg.opacity,
  };
}

// 自定义 Shape
G2.registerShape('interval', 'link-funnel', {
  draw(shapeInfo, container) {
    const attrs = getFillAttrs(shapeInfo);

    const { points, nextPoints } = shapeInfo;
    let rectPath = getRectPath(points);
    rectPath = this.parsePath(rectPath);

    const group = container.addGroup();
    // 灰色背景
    group.addShape('path', {
      capture: false,
      attrs: {
        ...attrs,
        fill: '#efefef',
        path: this.parsePath([
          ['M', points[0].x, points[1].y],
          ['L', points[0].x, 1],
          ['L', points[2].x, 1],
          ['L', points[2].x, points[1].y],
        ]),
      },
    });
    // 实际柱子
    group.addShape('path', {
      name: 'column',
      attrs: {
        ...attrs,
        path: rectPath,
      },
    });
    // 存在下一节点, 添加连接带
    if (nextPoints) {
      const linkPath = this.parsePath([
        ['M', points[2].x, points[2].y],
        ['L', points[3].x, points[3].y],
        ['L', nextPoints[0].x, nextPoints[0].y],
        ['L', nextPoints[1].x, nextPoints[1].y],
      ]);
      group.addShape('path', {
        capture: false,
        attrs: {
          ...attrs,
          // 设置透明度
          fillOpacity: 0.25,
          path: linkPath,
        },
      });
      const rate = shapeInfo.data[CONVERSTION_RATE];
      const point = this.parsePoint({
        x: points[3].x + (nextPoints[0].x - points[3].x) / 2,
        y: (nextPoints[1].y - nextPoints[0].y) / 2,
      });
      group.addShape('text', {
        attrs: {
          ...point,
          text: `${(rate * 100).toFixed(0)}%`,
          // 字体颜色
          fill: '#666',
          textAlign: 'center',
        },
      });
    }
    return group;
  },
});

const columnPlot = new Column('container', {
  data: transformData(data),
  xField: X_FIELD,
  yField: Y_FIELD,
  seriesField: X_FIELD,
  columnBackground: {},
  xAxis: false,
  yAxis: false,
  meta: {
    type: {
      alias: '类别',
      range: [0.07, 0.93],
    },
    sales: {
      alias: '销售额',
    },
  },
  label: false,
  legend: false,
  tooltip: {
    showTitle: false,
  },
  shape: 'link-funnel',
  appendPadding: [28, 0, 0, 0],
  annotations: data.map((d) => {
    return {
      type: 'text',
      position: [d[X_FIELD], 'max'],
      content: d[Y_FIELD],
      offsetY: -5,
      style: {
        textAlign: 'center',
        textBaseline: 'bottom',
        fontSize: 18,
      },
    };
  }),
  interactions: [
    {
      type: 'tooltip',
      cfg: {
        // 重新定义 tooltip 的触发时机，只有hover到 name='column'(实际柱子)的时候，才展示 tooltip
        start: [
          {
            trigger: 'column:mousemove',
            action: 'tooltip:show',
            throttle: { wait: 50, leading: true, trailing: false },
          },
          {
            trigger: 'column:touchmove',
            action: 'tooltip:show',
            throttle: { wait: 50, leading: true, trailing: false },
          },
        ],
        end: [
          { trigger: 'column:mouseleave', action: 'tooltip:hide' },
          { trigger: 'column:touchend', action: 'tooltip:hide' },
          { trigger: 'plot:leave', action: 'tooltip:hide' },
        ],
      },
    },
  ],
});

columnPlot.render();
