import { Pie, G2 } from '@antv/g2plot';
import insertCss from 'insert-css';

// We use 'insert-css' to insert custom styles
// It is recommended to add the style to your own style sheet files
// If you want to copy the code directly, please remember to install the npm package 'insert-css
insertCss(`
#container {
  display: flex;
  flex-direction: row !important;
  padding: 8px;
}
#container1, #container2 {
  flex: 1;
}
`);

const { Util } = G2;

const plot1 = new Pie('container1', {
  data: [
    { type: '一线城市', value: 0.19 },
    { type: '二线城市', value: 0.21 },
    { type: '三线城市', value: 0.27 },
    { type: '四线及以下', value: 0.33 },
  ],
  meta: {
    value: {
      formatter: (v) => `${(v * 100).toFixed(0)}%`,
    },
  },
  angleField: 'value',
  colorField: 'type',
  radius: 0.8,
  legend: false,
  label: { type: 'inner' },
});

const plot2 = new Pie('container2', {
  data: [
    { type: '一线城市', value: 0.19 },
    { type: '二线城市', value: 0.31 },
    { type: '三线城市', value: 0.27 },
    { type: '四线及以下', value: 0.12 },
  ],
  meta: {
    value: {
      formatter: (v) => `${(v * 100).toFixed(0)}%`,
    },
  },
  angleField: 'value',
  colorField: 'type',
  radius: 0.8,
  innerRadius: 0.5,
  legend: false,
  label: { type: 'inner' },

  statistic: {
    title: false,
    content: {
      customHtml: (container, view, datum, data) => {
        container.style.overflow = 'visible';
        const text = datum
          ? `${(datum.value * 100).toFixed(0)}%`
          : `${(data.reduce((r, d) => r + d.value, 0) * 100).toFixed(0)}%`;
        return text;
      },
    },
  },
  // Because interactions of 'statistic' will cause tooltip interaction not to work, so enable tooltip interaction explicitly.
  interactions: [{ type: 'tooltip', enable: true }],
});

plot1.render();
plot2.render();

/**
 * 根据指定 切片数据 获取切片元素 element 的中心坐标点
 * @param view G2.View
 * @param xField string
 * @param activeValue string
 * @returns Point | null
 */
function getPoint(view, xField, activeValue) {
  const { elements, coordinate } = view.geometries[0];
  const element = elements.find((ele) => ele.getModel().data[xField] === activeValue);
  if (element) {
    const { radius, innerRadius, polarRadius } = coordinate;
    const center = coordinate.getCenter();
    const { startAngle, endAngle } = Util.getAngle(element.getModel(), coordinate);
    const middleAngle = (startAngle + endAngle) / 2;
    const r = (polarRadius * (radius + innerRadius)) / 2;
    const x = r * Math.cos(middleAngle);
    const y = r * Math.sin(middleAngle);

    return {
      x: center.x + x,
      y: center.y + y,
    };
  }
  return null;
}

// 监听事件，进行 Tooltip 联动
let inAction = null;
plot1.on('tooltip:change', (e) => {
  if (inAction !== 'plot2') {
    const { data: eventData } = e;
    const point = getPoint(plot2.chart, 'type', eventData.items?.[0]?.data?.type);
    if (point) {
      inAction = 'plot1';
      plot2.chart.showTooltip(point);
    } else {
      plot2.chart.hideTooltip();
    }
  }
});

plot1.on('tooltip:hide', (e) => {
  if (inAction) {
    inAction = null;
    plot2.chart.hideTooltip();
  }
});

plot2.on('tooltip:change', (e) => {
  if (inAction !== 'plot1') {
    const { data: eventData } = e;
    inAction = 'plot2';
    const point = getPoint(plot1.chart, 'type', eventData.items?.[0]?.data?.type);
    if (point) {
      plot1.chart.showTooltip(point);
    } else {
      plot1.chart.hideTooltip();
    }
  }
});

plot2.on('tooltip:hide', (e) => {
  if (inAction) {
    inAction = null;
    plot1.chart.hideTooltip();
  }
});
