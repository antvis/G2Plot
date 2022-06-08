import { Pie, G2 } from '@antv/g2plot';

const data = [
  { type: '分类一', value: 27 },
  { type: '分类二', value: 25 },
  { type: '分类三', value: 18 },
  { type: '分类四', value: 15 },
  { type: '分类五', value: 10 },
  { type: '其他', value: 5 },
];

/**
 * G2 自定义形状函数
 * 第一个参数为 针对的内容 interval 为 g2 interval 对象
 * 第二个参数为 注册命名 Shape 在图表 shape 配置中使用
 */
G2.registerShape('interval', 'slice-shape', {
  // 绘制形状
  draw(cfg, container) {
    // 正常的数据位点，由内部计算。 一般为 {x,y} 组成的数组 有四个 对象 代表四个点的位置。 极坐标和坐标翻转会影响 x y 的具体位置 x y 为图表位置的百分比
    const points = cfg.points;

    // path 为路径
    let path = [];
    // 计算出 高度 / 2 = 半径 r
    const r = (points[2].x - points[1].x) / 2;
    // 开始点 M
    path.push(['M', points[0].x, points[0].y]);
    // 线段链接 L 从 上一个 xy[0] 到 现在的 xy[1]
    path.push(['L', points[1].x, points[1].y]);
    // 画半圆 A r 半径 从上一个 xy[1] 画半圆到 xy[2]
    path.push(['A', r, r, 0, 0, 0, points[2].x, points[2].y]);
    path.push(['L', points[3].x, points[3].y]);
    path.push(['A', r, r, 0, 2, 2, 0, points[0].y]);
    // 回到开始点
    path.push('Z');
    // 将0-1空间的坐标转换为画布坐标
    path = this.parsePath(path);
    // 半圆翻转
    path[4][5] = 1;

    // 通过 container.addShape 方法 添加形状
    return container.addShape('path', {
      attrs: {
        // 描边
        lineWidth: 1,
        stroke: '#fff',
        // 颜色填充
        fill: cfg.color,
        // 画路径
        path,
      },
    });
  },
});

const piePlot = new Pie('container', {
  data,
  angleField: 'value',
  colorField: 'type',
  radius: 0.8,
  innerRadius: 0.7,
  // 自定义形状 和 上方 G2.registerShape 对应
  shape: 'slice-shape',
});

piePlot.render();
