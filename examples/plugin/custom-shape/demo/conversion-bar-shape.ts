import { Column, G2, addWaterWave } from '@antv/g2plot';

const X_FIELD = 'stage';
const Y_FIELD = 'count';
const CONVERSTION_RATE = 'conversion-rate';
const TOOLTIP_TITLE = 'tooltip_title';
// 水波宽度
const waveLength = 100;

const data = [
  { stage: '简历投递数', count: 556834 },
  { stage: '简历评估通过数', count: 500000 },
  { stage: '终面通过数', count: 440000 },
  { stage: 'offer 数', count: 320000 },
  { stage: '入职数', count: 114000 },
];

// 添加转化率
function transformData(datas) {
  return datas
    .map((item, index) => ({
      ...item,
      ['tooltip_title']: `转化率 (${datas[index + 1]?.stage}/${item?.stage})`,
    }))
    .reduce((result, d, idx) => {
      if (idx > 0) {
        result[idx - 1][CONVERSTION_RATE] =
          result[idx - 1][Y_FIELD] !== 0 ? `${Math.round((d[Y_FIELD] / result[idx - 1][Y_FIELD]) * 100)}%` : '∞';
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

// 曲线 C 三个点 画一个曲线
const waterWave = (start, end, radio) => {
  return [
    [
      'C',
      start.x,
      start.y,
      start.x + ((end.x - start.x) / 4) * radio,
      start.y,
      (start.x + end.x) / 2,
      (start.y + end.y) / 2,
    ],
    ['C', (start.x + end.x) / 2, (start.y + end.y) / 2, end.x - ((end.x - start.x) / 4) * radio, end.y, end.x, end.y],
  ];
};

// 自定义 Shape
G2.registerShape('interval', 'link-funnel', {
  draw(shapeInfo, container) {
    const attrs = getFillAttrs(shapeInfo);
    // 当前 interval 形状节点数据 和 在一个 interval 形状节点数据
    const { points, nextPoints } = shapeInfo;
    let rectPath = getRectPath(points);
    rectPath = this.parsePath(rectPath);

    const height = rectPath[1][2] - rectPath[0][2];

    const backgroundPath = this.parsePath([
      ['M', points[0].x, 0],
      ['L', points[0].x, 1],
      ['L', points[2].x, 1],
      ['L', points[2].x, 0],
    ]);

    // 生成 IGroup 实体分组对象
    const group = container.addGroup();

    // 灰色背景
    group.addShape('path', {
      name: 'background',
      capture: false,
      attrs: {
        ...attrs,
        fill: '#efefef',
        path: backgroundPath,
      },
    });

    const boxPath = this.parsePath([
      ['M', points[0].x, 0],
      ['L', points[0].x, 1.1],
      ['L', points[2].x, 1.1],
      ['L', points[2].x, 0],
      ['L', points[0].x, 0],
    ]);

    /** 水波 ---- */
    const centerX = (rectPath[0][1] + rectPath[2][1]) / 2;
    const centerY = (boxPath[0][2] + boxPath[1][2]) / 2;
    const wavesHeight = boxPath[0][2] - boxPath[1][2];
    const r = 1 - (rectPath[0][2] - rectPath[1][2]) / wavesHeight;

    // 1. 绘制一个波
    const waves = group.addGroup({
      name: 'waves',
      attrs: {
        height,
        text: shapeInfo.data[X_FIELD],
        path: rectPath,
      },
    });

    // 2. 波对应的 clip 裁剪形状
    const clipPath = waves.setClip({
      type: 'path',
      name: 'clipPath',
      attrs: {
        path: boxPath,
      },
    });

    // 3. 绘制波形
    addWaterWave(
      centerX,
      centerY,
      r,
      2,
      { fill: attrs.fill, opacity: 0.8 },
      waves,
      clipPath,
      wavesHeight,
      waveLength,
      undefined
    );

    const point = this.parsePoint({
      x: (points[3].x + points[0].x) / 2,
      y: 1,
    });

    // 添加文本 数值 value
    group.addShape('text', {
      attrs: {
        ...point,
        y: point.y - 5,
        text: shapeInfo.data[Y_FIELD],
        textAlign: 'center',
        textBaseline: 'bottom',
        fontSize: 20,
        fill: '#666',
      },
      name: 'text-value',
    });

    // 添加文本 类型 type
    group.addShape('text', {
      attrs: {
        ...point,
        y: point.y - 35,
        text: shapeInfo.data[X_FIELD],
        textAlign: 'center',
        textBaseline: 'bottom',
        fontSize: 15,
        fill: '#666',
      },
      name: 'text-type',
    });

    // 存在下一节点, 添加连接带
    if (nextPoints) {
      const linkPath = this.parsePath([
        ['M', points[2].x, points[2].y],
        // 添加曲线
        ...waterWave(points[2], nextPoints[1], 1.2),
        ['L', nextPoints[0].x, nextPoints[0].y],
        ['L', points[3].x, points[3].y],
        ['Z'],
      ]);

      // 添加链接形状
      const conversionGroup = group.addShape('path', {
        name: 'conversion',
        attrs: {
          ...attrs,
          fillOpacity: 0.1,
          path: linkPath,
          lineWidth: 1,
          strokeOpacity: 0,
        },
      });

      const rate = shapeInfo.data[CONVERSTION_RATE];

      const point = this.parsePoint({
        x: points[3].x + (nextPoints[0].x - points[3].x) / 2,
        y: (nextPoints[1].y - nextPoints[0].y) / 2,
      });

      // 添加 转化率文本
      const rateText = group.addShape('text', {
        name: 'rate-text',
        attrs: {
          ...point,
          rate,
          text: rate,
          // 字体颜色
          fill: '#666',
          textAlign: 'center',
        },
      });

      const activePath = () => {
        conversionGroup.attr({ strokeOpacity: 1 });
      };

      const unActivePath = () => {
        conversionGroup.attr({ strokeOpacity: 0 });
      };

      // 添加简单事件
      conversionGroup.on('mouseenter', activePath);
      conversionGroup.on('mouseout', unActivePath);
      rateText.on('mouseenter', activePath);
      rateText.on('mouseout', unActivePath);
    }
    return group;
  },
});

const newData = transformData(data);

const columnPlot = new Column('container', {
  data: newData,
  xField: X_FIELD,
  yField: Y_FIELD,
  seriesField: X_FIELD,
  columnBackground: {},
  xAxis: false,
  yAxis: false,
  label: false,
  legend: false,
  shape: 'link-funnel',
  appendPadding: [60, 0, 20, 0],
  tooltip: {
    showTitle: false,
    shared: false,
    customItems: (item) => {
      const { data } = item[0];
      return [
        {
          ...item[0],
          name: data[TOOLTIP_TITLE],
          value: data[CONVERSTION_RATE],
        },
      ];
    },
  },
  interactions: [
    {
      type: 'tooltip',
      cfg: {
        // 重新定义 tooltip 的触发时机，只有hover到 name='column'(实际柱子)的时候，才展示 tooltip
        start: [
          {
            trigger: 'conversion:mousemove',
            action: 'tooltip:show',
            throttle: { wait: 50, leading: true, trailing: false },
          },
          {
            trigger: 'conversion:touchmove',
            action: 'tooltip:show',
            throttle: { wait: 50, leading: true, trailing: false },
          },
          {
            trigger: 'rate-text:mousemove',
            action: 'tooltip:show',
            throttle: { wait: 50, leading: true, trailing: false },
          },
          {
            trigger: 'rate-text:touchmove',
            action: 'tooltip:show',
            throttle: { wait: 50, leading: true, trailing: false },
          },
        ],
        end: [
          { trigger: 'conversion:mouseleave', action: 'tooltip:hide' },
          { trigger: 'conversion:touchend', action: 'tooltip:hide' },
          { trigger: 'rate-text:mouseleave', action: 'tooltip:hide' },
          { trigger: 'rate-text:touchend', action: 'tooltip:hide' },
          { trigger: 'plot:leave', action: 'tooltip:hide' },
        ],
      },
    },
  ],
});

columnPlot.render();
