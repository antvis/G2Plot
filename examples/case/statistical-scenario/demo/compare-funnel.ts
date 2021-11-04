/**
 * @description 使用 G2Plot 自定义扩展的插件，来自定义图表：https://g2plot.antv.vision/zh/docs/manual/plugin
 */

import { G2, P } from '@antv/g2plot';
import { deepMix } from '@antv/util';

const name = ['本期', '对比期'];
const tooltipItemsName = ['本期留存', '本期流失', '对比期留存', '对比期流失'];

const columnColor = [
  {
    transformed: '#3b89ff',
    'non-transformed': '#e1eeff',
    increased: '#e1eeff',
  },
  {
    transformed: '#4ccaa1',
    'non-transformed': '#defbf1',
    increased: '#defbf1',
  },
];
const rawData = [
  { date: '2020-08-01', index: '投放点击用户数', type: '本期', value: 46893 },
  { date: '2020-08-01', index: '会场曝光用户数', type: '本期', value: 37896 },
  { date: '2020-08-01', index: '会场点击用户数', type: '本期', value: 34896 },
  { date: '2020-08-01', index: '权益领取用户数', type: '本期', value: 28896 },
  { date: '2020-08-01', index: '引导IUV', type: '本期', value: 14896 },
  { date: '2020-08-01', index: '引导成交用户数', type: '本期', value: 4755 },
  { date: '2020-07-06', index: '投放点击用户数', type: '对比期', value: 46893 },
  { date: '2020-07-06', index: '会场曝光用户数', type: '对比期', value: 37896 },
  { date: '2020-07-06', index: '会场点击用户数', type: '对比期', value: 34896 },
  { date: '2020-07-06', index: '权益领取用户数', type: '对比期', value: 28896 },
  { date: '2020-07-06', index: '引导IUV', type: '对比期', value: 36896 },
  { date: '2020-07-06', index: '引导成交用户数', type: '对比期', value: 34896 },
];

function processData(rawData) {
  const res = [];
  [rawData.filter(({ type }) => type === '本期'), rawData.filter(({ type }) => type === '对比期')].forEach((data) => {
    const len = data.length - 1;
    for (let idx = 0; idx < data.length; idx += 1) {
      const prevVal = data[idx === 0 ? 0 : idx - 1].value;
      const nextVal = data[idx === len ? len : idx + 1].value;
      const { date, index, value, type } = data[idx];
      res.push({
        index,
        value,
        type,
        date,
        flag: 'transformed',
      });
      const incFlag = value < nextVal;
      res.push({
        index,
        type,
        date,
        value: Math.max(prevVal - value, 0),
        flag: incFlag ? 'increased' : 'non-transformed',
        rate: incFlag ? (nextVal - value) / value : nextVal / value,
      });
    }
  });
  return res;
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
G2.registerShape('interval', 'contrast-funnel', {
  draw(cfg, container) {
    const attrs = getFillAttrs(cfg);
    let rectPath = getRectPath(cfg.points);
    rectPath = this.parsePath(rectPath);

    const group = container.addGroup();
    group.addShape('path', {
      attrs: {
        ...attrs,
        path: rectPath,
      },
    });
    const { flag } = cfg.data;
    if (cfg.nextPoints && flag !== 'transformed') {
      let linkPath = [
        ['M', cfg.points[2].x, cfg.points[3].y],
        ['L', cfg.nextPoints[0].x, cfg.nextPoints[0].y],
      ];

      if (cfg.nextPoints[0].y === 0) {
        linkPath[1] = ['L', cfg.nextPoints[1].x, cfg.nextPoints[1].y];
      }
      linkPath = this.parsePath(linkPath);

      const [[, x1, y1], [, x2, y2]] = linkPath;
      group.addShape('path', {
        attrs: {
          path: linkPath,
          stroke: '#c5d0d9',
        },
      });
      const text = group.addShape('text', {
        attrs: {
          x: (x1 + x2) / 2,
          y: (y1 + y2) / 2,
          text: `${{ 'non-transformed': '▼转化率', increased: '▲增长率' }[flag]}${(cfg.data.rate * 100).toFixed(0)}%`,
          fill: { 'non-transformed': '#009f86', increased: '#ff4737' }[flag],
          textAlign: 'center',
          textBaseline: 'middle',
          fontSize: 14,
        },
        zIndex: 2,
      });
      const { x, y, width, height } = text.getBBox();
      group.addShape('rect', {
        attrs: {
          x,
          y,
          width,
          height,
          fill: 'white',
        },
        zIndex: 1,
      });
      text.toFront();
    }
    return group;
  },
});

const defaultOptions = {};

function adaptor(params) {
  const { chart, options } = params;
  const { data, theme } = options;

  chart.data(data);
  chart.legend(false);
  chart.theme(deepMix({}, theme || G2.getTheme(theme)));
  chart.scale('value', { nice: true });

  chart.facet('mirror', {
    fields: ['type'],
    spacing: ['12%', 0],
    transpose: true,
    showTitle: false,
    eachView: (view, facet) => {
      const idx = facet.columnIndex;
      // 关闭所有 axis
      view.axis(false);
      view.legend({
        custom: true,
        position: ['top-right', 'top-left'][idx],
        items: [
          {
            name: name[idx],
            marker: {
              symbol: 'hyphen',
              style: {
                stroke: columnColor.map((c) => c.transformed)[idx],
              },
            },
          },
        ],
      });
      view
        .coordinate()
        .transpose()
        .scale(...(idx === 0 ? [-1, -1] : [1, -1]));
      view
        .interval()
        .adjust('stack')
        .position('index*value')
        .color('index*flag', (index, flag) => columnColor[idx][flag])
        .label('value*flag', (value, flag) => {
          if (flag !== 'transformed') return { content: '' };
          return {
            position: 'left',
            content: value.toLocaleString(),
            style: {
              textAlign: ['end', 'start'][idx],
              fill: '#fff',
              shadowColor: '#212121',
              shadowBlur: 5,
            },
          };
        })
        .shape('contrast-funnel');
    },
  });

  chart.tooltip({
    shared: true,
    title: (item) => {
      return `${item}`;
    },
    customItems: ([currSurplus, currLoss, compareSurplus, compareLoss]) => {
      const [currColor, completeColor] = columnColor;
      const [n1, n2, n3, n4] = tooltipItemsName;
      return [
        {
          marker: true,
          color: currColor.transformed,
          name: `${n1}(${currSurplus.data.date})`,
          value: Number(currSurplus.value).toLocaleString(),
        },
        {
          marker: true,
          color: currColor['non-transformed'],
          name: `${n2}(${currLoss.data.date})`,
          value: Number(currLoss.value).toLocaleString(),
        },
        {
          marker: true,
          color: completeColor.transformed,
          name: `${n3}(${compareSurplus.data.date})`,
          value: Number(compareSurplus.value).toLocaleString(),
        },
        {
          marker: true,
          color: completeColor['non-transformed'],
          name: `${n4}(${compareLoss.data.date})`,
          value: Number(compareLoss.value).toLocaleString(),
        },
      ];
    },
  });

  rawData
    .filter(({ type }) => type === '本期')
    .forEach(({ index }, idx) => {
      chart.annotation().text({
        content: index,
        style: { textAlign: 'center', textBaseline: 'middle' },
        position: () => {
          const { y: cY, height: cHeight } = chart.coordinateBBox;
          const { y: vY, height: vHeight } = chart.views[0].coordinateBBox;
          const yScale = chart.views[0].getScaleByField('index');
          return ['50%', `${((vY - cY + vHeight * yScale.scale(index)) / cHeight) * 100}%`];
        },
      });
    });

  chart.removeInteraction('legend-filter'); // 移除图例过滤交互
}

const funnel = new P('container', {}, adaptor, { data: processData(rawData) });

funnel.render();
