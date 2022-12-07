import { Bar, G2 } from '@antv/g2plot';

// 背景动效的时间 ms
const BLINK_TIME = 1600;
// 动效间隔时间 ms
const BLIANK_INTERVAL_TIME = 400;
// 动效贝塞尔曲线 缓动缓动缓动缓动缓动缓动
const BLINK_BEZIER = 'cubic-bezier(0.65,0,1,1)';
// 动效宽度 px
const BLINK_WIDTH = 64;
// 颜色
const blinkFill = `l(0) 0:rgba(255,255,255,0) .5:rgba(255,255,255,0.24) 1:rgba(255,255,255,0)`;

// 初始 动画时间 ms
const APPEAR_TIME = 200;

// 动效缓动规则
const BLIANK_EASING = 'easeLinear';

// 更新 每次动画时间 ms
const UPDATE_TIME = 800;

// 数据更新间隔时间 ms
const DATA_UPDATE = 3000;

function threeBezier(t, cp1, cp2) {
  const [x1, y1] = [0, 0];
  const [x2, y2] = [1, 1];
  const [cx1, cy1] = cp1;
  const [cx2, cy2] = cp2;
  const x =
    x1 * (1 - t) * (1 - t) * (1 - t) + 3 * cx1 * t * (1 - t) * (1 - t) + 3 * cx2 * t * t * (1 - t) + x2 * t * t * t;
  const y =
    y1 * (1 - t) * (1 - t) * (1 - t) + 3 * cy1 * t * (1 - t) * (1 - t) + 3 * cy2 * t * t * (1 - t) + y2 * t * t * t;
  return [x, y];
}

function getBezier(BezierString) {
  const p1 = [];
  const p2 = [];
  BezierString.replace(/(\d|\.)+/g, (v) => {
    p1.length == 2 ? p2.push(Number(v)) : p1.push(Number(v));
  });
  return [p1, p2];
}

G2.registerAnimation('label-appear', (element, animateCfg, cfg) => {
  const label = element.getChildren()[0];
  const coordinate = cfg.coordinate;
  const startX = coordinate.start.x;
  const finalX = label.attr('x');
  const labelContent = label.attr('text');

  label.attr('x', startX);
  label.attr('text', 0);

  const distance = finalX - startX;
  label.animate((ratio) => {
    const position = startX + distance * ratio;
    const text = (labelContent * ratio).toFixed(0);

    return {
      x: position,
      text,
    };
  }, animateCfg);
});

G2.registerAnimation('label-update', (element, animateCfg, cfg) => {
  const startX = element.attr('x');
  // @ts-ignore
  const finalX = cfg.toAttrs.x;
  const labelContent = element.attr('text');
  // @ts-ignore
  const finalContent = cfg.toAttrs.text;

  const distanceX = finalX - startX;
  const numberDiff = +finalContent - +labelContent;

  element.animate(
    (ratio) => {
      const positionX = startX + distanceX * ratio;
      const text = (+labelContent + numberDiff * ratio).toFixed(0);
      return {
        x: positionX,
        text,
      };
    },
    {
      ...animateCfg,
      duration: UPDATE_TIME,
    }
  );
});

G2.registerAnimation('element-update', (element, animateCfg, cfg) => {
  if (element.cfg.name !== 'interval') return;
  const nowPath = element.attr('path');
  const toPath = cfg.toAttrs.path;
  const toWidth = toPath[1][1] - nowPath[1][1];

  const path = toPath;
  // 宽度更新
  element.animate((ratio) => {
    // 当前变化的宽度
    const changeWidth = ratio * toWidth;
    path[1][1] = nowPath[1][1] + changeWidth;
    path[2][1] = nowPath[2][1] + changeWidth;

    return {
      path,
    };
  }, animateCfg);
});

function getRectPath(points, isClosed = true) {
  const path = [];
  const firstPoint = points[0];
  path.push(['M', firstPoint.x, firstPoint.y]);
  for (let i = 1, len = points.length; i < len; i++) {
    path.push(['L', points[i].x, points[i].y]);
  }
  // 对于 shape="line" path 不应该闭合，否则会造成 lineCap 绘图属性失效
  if (isClosed) {
    path.push(['L', firstPoint.x, firstPoint.y]); // 需要闭合
    path.push(['z']);
  }
  return path;
}

const [p1, p2] = getBezier(BLINK_BEZIER);

function blinkShapeAnimate(shape, delay) {
  shape.animate(
    (radio) => {
      const blinkRadio = threeBezier(radio, p1, p2)[1];

      const path = shape.getParent().findAllByName('interval')[0].attr('path');
      const toWidth = path[1][1] - path[0][1] + BLINK_WIDTH;

      const width = toWidth * blinkRadio;
      const x = path[0][1];

      return {
        width: blinkRadio === 1 ? 0 : Math.min(width, BLINK_WIDTH),
        x: width <= BLINK_WIDTH ? x : x + width - BLINK_WIDTH,
      };
    },
    {
      delay,
      duration: BLINK_TIME,
      callback: () => {
        blinkShapeAnimate(shape, BLIANK_INTERVAL_TIME);
      },
    }
  );
}

G2.registerShape('interval', 'blink-interval', {
  draw(cfg, container) {
    const group = container.addGroup();

    const path = this.parsePath(getRectPath(cfg.points));
    const { color, style = {}, defaultStyle } = cfg;
    const height = path[2][2] - path[1][2];
    const x = path[0][1];
    const y = path[0][2];
    const fillColor = color || style.fill || defaultStyle.fill;
    group.addShape('path', {
      attrs: {
        ...style,
        path,
        fill: fillColor,
        x,
        y,
      },
      name: 'interval',
    });

    const blinkShape = group.addShape('rect', {
      attrs: {
        x,
        y,
        width: 0,
        height,
        // ✅ 主色到 30% 透明的白色渐变
        fill: blinkFill,
      },
      name: `blink-interval-${cfg.data.animateKey}`,
    });

    blinkShapeAnimate(blinkShape, 0);

    return group;
  },
});

let year = 1981;

let data = [
  { year: `${year}年`, value: 266, type: 'type1' },
  { year: `${year}年`, value: 252, type: 'type2' },
  { year: `${year}年`, value: 161, type: 'type3' },
  { year: `${year}年`, value: 100, type: 'type4' },
  { year: `${year}年`, value: 90, type: 'type5' },
  { year: `${year}年`, value: 88, type: 'type6' },
  { year: `${year}年`, value: 10, type: 'type7' },
  { year: `${year}年`, value: 5, type: 'type8' },
  { year: `${year}年`, value: 0, type: 'type9' },
  { year: `${year}年`, value: 0, type: 'type10' },
];

function processData(data, yField) {
  return data.map((item) => ({
    animateKey: item[yField],
    ...item,
  }));
}

const newData = processData(data, 'type');

const bar = new Bar('container', {
  data: newData,
  xField: 'value',
  yField: 'type',
  padding: [10, 40, 30, 50],
  legend: false,
  label: {
    position: 'right',
    animate: {
      appear: {
        animation: 'label-appear',
        delay: 0,
        duration: APPEAR_TIME,
        easing: BLIANK_EASING,
      },
      update: {
        animation: 'label-update',
        duration: UPDATE_TIME,
        easing: BLIANK_EASING,
      },
    },
  },
  shape: 'blink-interval',
  yAxis: {
    nice: false,
  },
  barStyle: {
    fillOpacity: 0.9,
  },
  animation: {
    appear: {
      duration: APPEAR_TIME,
      easing: BLIANK_EASING,
    },
    update: {
      animation: 'element-update',
      duration: UPDATE_TIME,
      easing: BLIANK_EASING,
    },
  },
});

bar.render();

function updateData() {
  year++;
  data = data.map(({ type, value }) => ({
    type,
    year: `${year}年`,
    value: value + Math.floor(Math.random() * 50),
  }));

  setTimeout(() => {
    bar.changeData(processData(data, 'type'));

    if (year !== 2003) {
      updateData();
    }
  }, DATA_UPDATE);
}

updateData();
