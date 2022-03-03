import { registerShape } from '@antv/g2';
import { IGroup, IShape } from '@antv/g-base';
import { reduce, isNumber, mix } from '@antv/util';
import { transform } from '../../../utils/matrix';
import { Point, ShapeStyle } from '../../../types';
import { LiquidOptions, CustomInfo } from '../types';

const DURATION = 5000;

/**
 * 一个线性映射的函数
 * @param min
 * @param max
 * @param factor
 */
function lerp(min: number, max: number, factor: number) {
  return min + (max - min) * factor;
}

/**
 * 波浪的 attrs
 * @param cfg
 */
function getFillAttrs(cfg: ShapeStyle) {
  const attrs = { opacity: 1, ...cfg.style };

  if (cfg.color && !attrs.fill) {
    attrs.fill = cfg.color;
  }

  return attrs;
}

/**
 * shape 的 attrs
 * @param cfg
 */
function getLineAttrs(cfg: ShapeStyle) {
  const defaultAttrs = {
    fill: '#fff',
    fillOpacity: 0,
    lineWidth: 4,
  };
  const attrs = mix({}, defaultAttrs, cfg.style);

  if (cfg.color && !attrs.stroke) {
    attrs.stroke = cfg.color;
  }
  if (isNumber(cfg.opacity)) {
    attrs.opacity = attrs.strokeOpacity = cfg.opacity;
  }

  return attrs;
}

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
 * @param x          x position of the left-most point (a)
 * @param stage      0-3, stating which part of the wave it is
 * @param waveLength wave length of the sine wave
 * @param amplitude  wave amplitude
 * @return 正弦片段曲线
 */
function getWaterWavePositions(x: number, stage: number, waveLength: number, amplitude: number) {
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
 * @param radius          半径
 * @param waterLevel      水位
 * @param waveLength      波长
 * @param phase           相位
 * @param amplitude       震幅
 * @param cx              圆心x
 * @param cy              圆心y
 * @return path            路径
 * @reference http://gitlab.alipay-inc.com/datavis/g6/blob/1.2.0/src/graph/utils/path.js#L135
 */
function getWaterWavePath(
  radius: number,
  waterLevel: number,
  waveLength: number,
  phase: number,
  amplitude: number,
  cx: number,
  cy: number
) {
  const curves = Math.ceil(((2 * radius) / waveLength) * 4) * 4;
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
  path.push(['Z']);
  // path.push(['L', left, waterLevel]);
  return path;
}

/**
 * 添加水波
 * @param x           中心x
 * @param y           中心y
 * @param level       水位等级 0～1
 * @param waveCount   水波数
 * @param waveAttrs      色值
 * @param group       图组
 * @param clip        用于剪切的图形
 * @param radius      绘制图形的高度
 * @param waveLength  波的长度
 */
export function addWaterWave(
  x: number,
  y: number,
  level: number,
  waveCount: number,
  waveAttrs: ShapeStyle,
  group: IGroup,
  clip: IShape,
  radius: number,
  waveLength: number,
  animation: LiquidOptions['animation']
) {
  // 盒子属性 颜色 宽高
  const { fill, opacity } = waveAttrs;
  const bbox = clip.getBBox();
  const width = bbox.maxX - bbox.minX;
  const height = bbox.maxY - bbox.minY;

  // 循环 waveCount 个数
  for (let idx = 0; idx < waveCount; idx++) {
    const factor = waveCount <= 1 ? 0 : idx / (waveCount - 1);

    // 画波
    const wave = group.addShape('path', {
      name: `waterwave-path`,
      attrs: {
        // 波形路径配置
        path: getWaterWavePath(
          radius,
          bbox.minY + height * level,
          waveLength,
          0,
          width / 32, // 波幅高度
          x,
          y
        ),
        fill,
        opacity: lerp(0.2, 0.9, factor) * opacity,
      },
    });

    try {
      // 默认 underfind 开启动画
      if (animation === false) return;
      const matrix = transform([['t', waveLength, 0]]);

      wave.stopAnimate();
      wave.animate(
        { matrix },
        {
          duration: lerp(0.5 * DURATION, DURATION, factor),
          repeat: true,
        }
      );
    } catch (e) {
      // TODO off-screen canvas 中动画会找不到 canvas
      console.warn('off-screen group animate error!');
    }
  }
}

/**
 *
 * @param x 中心 x
 * @param y 中心 y
 * @param width 外接矩形的宽
 * @param height 外接矩形的高
 */
function pin(x: number, y: number, width: number, height: number) {
  const w = (width * 2) / 3;
  const h = Math.max(w, height);
  const r = w / 2;

  // attrs of the upper circle
  const cx = x;
  const cy = r + y - h / 2;
  const theta = Math.asin(r / ((h - r) * 0.85));
  const dy = Math.sin(theta) * r;
  const dx = Math.cos(theta) * r;

  // the start point of the path
  const x0 = cx - dx;
  const y0 = cy + dy;

  // control point
  const cpX = x;
  const cpY = cy + r / Math.sin(theta);

  return `
      M ${x0} ${y0}
      A ${r} ${r} 0 1 1 ${x0 + dx * 2} ${y0}
      Q ${cpX} ${cpY} ${x} ${y + h / 2}
      Q ${cpX} ${cpY} ${x0} ${y0}
      Z 
    `;
}

/**
 *
 * @param x 中心 x
 * @param y 中心 y
 * @param width 外接矩形的宽
 * @param height 外接矩形的高
 */
function circle(x: number, y: number, width: number, height: number) {
  const rx = width / 2;
  const ry = height / 2;
  return `
      M ${x} ${y - ry} 
      a ${rx} ${ry} 0 1 0 0 ${ry * 2}
      a ${rx} ${ry} 0 1 0 0 ${-ry * 2}
      Z
    `;
}

/**
 *
 * @param x 中心 x
 * @param y 中心 y
 * @param width 外接矩形的宽
 * @param height 外接矩形的高
 */
function diamond(x: number, y: number, width: number, height: number) {
  const h = height / 2;
  const w = width / 2;
  return `
      M ${x} ${y - h}
      L ${x + w} ${y}
      L ${x} ${y + h}
      L ${x - w} ${y}
      Z
    `;
}

/**
 *
 * @param x 中心 x
 * @param y 中心 y
 * @param width 外接矩形的宽
 * @param height 外接矩形的高
 */
function triangle(x: number, y: number, width: number, height: number) {
  const h = height / 2;
  const w = width / 2;
  return `
      M ${x} ${y - h}
      L ${x + w} ${y + h}
      L ${x - w} ${y + h}
      Z
    `;
}

/**
 *
 * @param x 中心 x
 * @param y 中心 y
 * @param width 外接矩形的宽
 * @param height 外接矩形的高
 */
function rect(x: number, y: number, width: number, height: number) {
  const GOLDEN_SECTION_RATIO = 0.618;
  const h = height / 2;
  const w = (width / 2) * GOLDEN_SECTION_RATIO;
  return `
      M ${x - w} ${y - h}
      L ${x + w} ${y - h}
      L ${x + w} ${y + h}
      L ${x - w} ${y + h}
      Z
    `;
}

const builtInShapeByName = {
  pin,
  circle,
  diamond,
  triangle,
  rect,
};

registerShape('interval', 'liquid-fill-gauge', {
  draw(cfg: any, container: IGroup) {
    const cx = 0.5;
    const cy = 0.5;

    const { customInfo } = cfg;
    const { radius: radio, shape, background, animation } = customInfo as CustomInfo;
    const outline: LiquidOptions['outline'] = customInfo.outline;
    const wave: LiquidOptions['wave'] = customInfo.wave;
    const { border, distance } = outline;
    const { count: waveCount, length: waveLength } = wave;

    // 获取最小 minX
    const minX = reduce(
      cfg.points as Point[],
      (r: number, p: Point) => {
        return Math.min(r, p.x);
      },
      Infinity
    );

    const center = this.parsePoint({ x: cx, y: cy });
    const minXPoint = this.parsePoint({ x: minX, y: cy });
    const halfWidth = center.x - minXPoint.x;

    // 保证半径是 画布宽高最小值的 radius 值
    const radius = Math.min(halfWidth, minXPoint.y * radio);
    const waveAttrs = getFillAttrs(cfg);
    const outlineAttrs = getLineAttrs(mix({}, cfg, outline));
    const innerRadius = radius - border / 2;

    const buildPath = typeof shape === 'function' ? shape : builtInShapeByName[shape] || builtInShapeByName['circle'];
    const shapePath = buildPath(center.x, center.y, innerRadius * 2, innerRadius * 2);

    // 1. 绘制一个波
    const waves = container.addGroup({
      name: 'waves',
    });

    // 3. 波对应的 clip 裁剪形状
    const clipPath = waves.setClip({
      type: 'path',
      attrs: {
        path: shapePath,
      },
    });

    // 4. 绘制波形
    addWaterWave(
      center.x,
      center.y,
      1 - (cfg.points[1] as Point).y,
      waveCount,
      waveAttrs,
      waves,
      clipPath,
      radius * 2,
      waveLength,
      animation
    );

    // 2. 绘制一个 distance 宽的 border
    container.addShape('path', {
      name: 'distance',
      attrs: {
        path: shapePath,
        fill: 'transparent',
        lineWidth: border + distance * 2,
        stroke: background === 'transparent' ? '#fff' : background,
      },
    });

    // 3. 绘制一个 border 宽的 border
    container.addShape('path', {
      name: 'wrap',
      attrs: mix(outlineAttrs, {
        path: shapePath,
        fill: 'transparent',
        lineWidth: border,
      }),
    });

    return container;
  },
});
