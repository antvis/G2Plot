import { Circle } from '@antv/g';
import { Global, registerShape } from '@antv/g2';
import * as _ from '@antv/util';

const ShapeUtil = {
  splitPoints(obj) {
    const points = [];
    const x = obj.x;
    let y = obj.y;
    y = _.isArray(y) ? y : [y];
    _.each(y, (yItem, index) => {
      const point = {
        x: _.isArray(x) ? x[index] : x,
        y: yItem,
      };
      points.push(point);
    });
    return points;
  },
  addFillAttrs(attrs, cfg) {
    if (cfg.color) {
      attrs.fill = cfg.color;
    }
    if (_.isNumber(cfg.opacity)) {
      attrs.opacity = attrs.fillOpacity = cfg.opacity;
    }
  },
  addStrokeAttrs(attrs, cfg) {
    if (cfg.color) {
      attrs.stroke = cfg.color;
    }
    if (_.isNumber(cfg.opacity)) {
      attrs.opacity = attrs.strokeOpacity = cfg.opacity;
    }
  },
};

const getFillAttrs = (cfg) => {
  const defaultAttrs = Global.theme.shape.interval;
  const attrs = _.mix({}, defaultAttrs, cfg.style);
  ShapeUtil.addFillAttrs(attrs, cfg);
  if (cfg.color) {
    attrs.stroke = attrs.stroke || cfg.color;
  }
  return attrs;
};

const getLineAttrs = (cfg) => {
  const defaultAttrs = Global.theme.shape.hollowInterval;
  const attrs = _.mix({}, defaultAttrs, cfg.style);
  ShapeUtil.addStrokeAttrs(attrs, cfg);
  return attrs;
};

/**
 * 用贝塞尔曲线模拟正弦波
 * Using Bezier curves to fit sine wave.
 * There is 4 control points for each curve of wave,
 * which is at 1/4 wave length of the sine wave.
 *
 * The control points for a wave from (a) to (d) are a-b-c-d:
 *          c *----* d
 *     b *
 *       |
 * ... a * ..................
 *
 * whose positions are a: (0, 0), b: (0.5, 0.5), c: (1, 1), d: (PI / 2, 1)
 *
 * @param {number} x          x position of the left-most point (a)
 * @param {number} stage      0-3, stating which part of the wave it is
 * @param {number} waveLength wave length of the sine wave
 * @param {number} amplitude  wave amplitude
 * @return {Array} 正弦片段曲线
 */
function getWaterWavePositions(x, stage, waveLength, amplitude) {
  if (stage === 0) {
    return [
      [x + ((1 / 2) * waveLength) / Math.PI / 2, amplitude / 2],
      [x + ((1 / 2) * waveLength) / Math.PI, amplitude],
      [x + waveLength / 4, amplitude],
    ];
  }
  if (stage === 1) {
    return [
      [x + (((1 / 2) * waveLength) / Math.PI / 2) * (Math.PI - 2), amplitude],
      [x + (((1 / 2) * waveLength) / Math.PI / 2) * (Math.PI - 1), amplitude / 2],
      [x + waveLength / 4, 0],
    ];
  }
  if (stage === 2) {
    return [
      [x + ((1 / 2) * waveLength) / Math.PI / 2, -amplitude / 2],
      [x + ((1 / 2) * waveLength) / Math.PI, -amplitude],
      [x + waveLength / 4, -amplitude],
    ];
  }
  return [
    [x + (((1 / 2) * waveLength) / Math.PI / 2) * (Math.PI - 2), -amplitude],
    [x + (((1 / 2) * waveLength) / Math.PI / 2) * (Math.PI - 1), -amplitude / 2],
    [x + waveLength / 4, 0],
  ];
}
/**
 * 获取水波路径
 * @param  {number} radius          半径
 * @param  {number} waterLevel      水位
 * @param  {number} waveLength      波长
 * @param  {number} phase           相位
 * @param  {number} amplitude       震幅
 * @param  {number} cx              圆心x
 * @param  {number} cy              圆心y
 * @return {Array}  path            路径
 * @reference http://gitlab.alipay-inc.com/datavis/g6/blob/1.2.0/src/graph/utils/path.js#L135
 */
function getWaterWavePath(radius, waterLevel, waveLength, phase, amplitude, cx, cy) {
  const curves = Math.ceil(((2 * radius) / waveLength) * 4) * 2;
  const path = [];
  let _phase = phase;

  // map phase to [-Math.PI * 2, 0]
  while (_phase < -Math.PI * 2) {
    _phase += Math.PI * 2;
  }
  while (_phase > 0) {
    _phase -= Math.PI * 2;
  }
  _phase = (_phase / Math.PI / 2) * waveLength;

  const left = cx - radius + _phase - radius * 2;
  /**
   * top-left corner as start point
   *
   * draws this point
   *  |
   * \|/
   *  ~~~~~~~~
   *  |      |
   *  +------+
   */
  path.push(['M', left, waterLevel]);

  /**
   * top wave
   *
   * ~~~~~~~~ <- draws this sine wave
   * |      |
   * +------+
   */
  let waveRight = 0;
  for (let c = 0; c < curves; ++c) {
    const stage = c % 4;
    const pos = getWaterWavePositions((c * waveLength) / 4, stage, waveLength, amplitude);
    path.push([
      'C',
      pos[0][0] + left,
      -pos[0][1] + waterLevel,
      pos[1][0] + left,
      -pos[1][1] + waterLevel,
      pos[2][0] + left,
      -pos[2][1] + waterLevel,
    ]);

    if (c === curves - 1) {
      waveRight = pos[2][0];
    }
  }

  /**
   * top-right corner
   *
   *                       ~~~~~~~~
   * 3. draws this line -> |      | <- 1. draws this line
   *                       +------+
   *                          ^
   *                          |
   *                  2. draws this line
   */
  path.push(['L', waveRight + left, cy + radius]);
  path.push(['L', left, cy + radius]);
  path.push(['L', left, waterLevel]);
  return path;
}

/**
 * 添加水波
 * @param {number} x           中心x
 * @param {number} y           中心y
 * @param {number} level       水位等级 0～1
 * @param {number} waveCount   水波数
 * @param {number} colors      色值
 * @param {number} group       图组
 * @param {number} clip        用于剪切的图形
 * @param {number} radius      绘制图形的高度
 */
function addWaterWave(x, y, level, waveCount, colors, group, clip, radius) {
  const bbox = clip.getBBox();
  const width = bbox.maxX - bbox.minX;
  const height = bbox.maxY - bbox.minY;
  const duration = 5000;
  const delayDiff = 300;
  for (let i = 0; i < waveCount; i++) {
    const wave = group.addShape('path', {
      attrs: {
        path: getWaterWavePath(radius, bbox.minY + height * level, width / 4, 0, width / 64, x, y),
        fill: colors[i],
        clip,
        opacity: 0.8,
      },
    });
    // FIXME wave animation error in svg
    if (Global.renderer === 'canvas') {
      wave.animate(
        {
          transform: [['t', width / 2, 0]],
          repeat: true,
        },
        duration - i * delayDiff
      );
    }
  }
}

registerShape('interval', 'liquid-fill-gauge', {
  draw(cfg: any, container) {
    const cy = 0.5;
    let sumX = 0;
    let minX = Infinity;
    _.each(cfg.points, (p: any) => {
      if (p.x < minX) {
        minX = p.x;
      }
      sumX += p.x;
    });
    const cx = sumX / cfg.points.length;
    const cp = this.parsePoint({ x: cx, y: cy });
    const minP = this.parsePoint({ x: minX, y: 0.5 });
    const xWidth = cp.x - minP.x;
    const radius = Math.min(xWidth, minP.y);
    const attrs = getFillAttrs(cfg);
    const clipCircle = new Circle({
      attrs: {
        x: cp.x,
        y: cp.y,
        r: radius,
      },
    });
    addWaterWave(
      cp.x,
      cp.y,
      1 - cfg.points[1].y, // cfg.y / (2 * cp.y),
      1,
      [attrs.fill],
      container,
      clipCircle,
      radius * 4
    );
    return container.addShape('circle', {
      attrs: _.mix(getLineAttrs(cfg), {
        x: cp.x,
        y: cp.y,
        r: radius,
      }),
    });
  },
});
