import { Shape, BBox } from '@antv/g';
import _ from 'lodash';

interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Config {
  /** label Shape */
  labels: Shape[];
  /** point shape */
  anchorsBBox?: Box[] | BBox[];
  /** 面板区域 */
  panel: BBox;

  /** 算法相关 */
  /** 最大移动距离 */
  maxMover?: number;
  /** 最大旋转角度 */
  maxAngle?: number;
  /** 退火次数 */
  nsweeps?: number;
  /**
   * 权重
   * 0: label-label overlap;
   * 1: label-anchor overlap;
   * 2: label-anchor distance;
   * 3: leader-line intersect;
   * 4: orientation bias;
   */
  weight?: number[];
  /** 能量及格线 */
  passingEnergy?: number;
}

export class Annealing {
  private labels: Config['labels'];
  private worst: number[];
  private anchorsBBox: Config['anchorsBBox'];
  private panel: Config['panel'];
  /** 算法参数 */
  private params: {
    maxMover: Config['maxMover'];
    maxAngle: Config['maxAngle'];
    nsweeps: Config['nsweeps'];
    weight: Config['weight'];
    passingEnergy: Config['passingEnergy'];
  };

  constructor(config: Config) {
    this.labels = config.labels;
    this.anchorsBBox = config.anchorsBBox;
    this.panel = config.panel;
    this.params = {
      maxMover: config.maxMover || 5,
      maxAngle: config.maxAngle || 0.5,
      nsweeps: config.nsweeps || 1000,
      weight: config.weight || [ 30, 30, 0.2, 1, 3 ],
      passingEnergy: 20,
    };
  }

  /** 算法运行，主入口 */
  public run() {
    console.time('annealing algo run');
    this.preProcess();
    const m = _.size(this.worst) || _.size(this.labels);
    const { nsweeps: n } = this.params;
    const initalT = 1;

    // labels太多性能太差
    if (m * n > 50000) {
      return;
    }

    let t = 1;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (Math.random() < 0.5) {
          this.mcTranslate(t);
        } else {
          this.mcRotate(t);
        }
      }
      t = t - initalT / n;
    }
    console.timeEnd('annealing algo run');
  }

  /** 移动边缘，寻找差布局 */
  protected preProcess() {
    if (this.panel) {
      _.each(this.labels, (label) => {
        const bbox = label.getBBox();
        const { deltaX, deltaY } = this._inPanelRange(bbox);
        label.attr({
          x: label.attr('x') + deltaX,
          y: label.attr('y') + deltaY,
        });
      });
      const ids = [];
      _.each(this.labels, (__, i: number) => {
        const e = this.energy(i);
        // 不存在堆叠时，能量都比较低
        // 位置倾向最差9，线交叉1，距离惩罚不超过10
        if (e > this.params.passingEnergy) {
          ids.push(i);
        }
      });
      this.worst = ids;
    }
  }

  /** 能量计算 */
  protected energy(idx: number) {
    const m = this.labels.length;
    const { weight } = this.params;
    let res = 0;
    const currLabel = this._getLabelBBox(idx);
    const currAnchor = this._getAnchorBBox(idx);
    const dx = currLabel.x - currAnchor.x;
    const dy = currLabel.y - currAnchor.y;

    // label-point distance
    res += Math.sqrt(dx ** 2 + dy ** 2) * weight[2];

    // orientation bias
    res += this._getOrientBias(currAnchor, currLabel) * weight[4];

    for (let i = 0; i < m; i++) {
      // label-label overlap
      const anchor = this._getAnchorBBox(i);
      // 非当前label
      if (i !== idx) {
        const label = this._getLabelBBox(i);
        res += this._getOverlapArea(label, currLabel) * weight[0];
        // leader-line intersect
        res += this._getIntersect(currAnchor, currLabel, anchor, label) * weight[3];
      }

      // label-anchor overlap
      res += this._getOverlapArea(anchor, currLabel) * weight[1];
    }

    return res;
  }

  /** 蒙特卡洛方法——平移 */
  protected mcTranslate(t: number) {
    const { maxMover } = this.params;
    const i = this._getIndex();
    const label = this._getLabelBBox(i);
    const oldX = label.x;
    const oldY = label.y;

    const oldEnergy = this.energy(i);
    (<any>label).x += (Math.random() - 0.5) * maxMover;
    (<any>label).y += (Math.random() - 0.5) * maxMover;
    this._inPanelRange(label);
    const newEnergy = this.energy(i);

    const delta = newEnergy - oldEnergy;
    this._mAccept(delta, t, i, oldX, oldY);
  }

  /** 蒙特卡洛方法——旋转 */
  protected mcRotate(t: number) {
    const { maxAngle } = this.params;
    const i = this._getIndex();
    const label = this._getLabelBBox(i);
    const anchor = this._getAnchorBBox(i);
    const oldX = label.x;
    const oldY = label.y;
    const oldEnergy = this.energy(i);
    const angle = (Math.random() - 0.5) * maxAngle;

    /**
     * 为了防止自己zz了，写一下初中数学
     * 吐槽下考试只是背了三角函数公式，但是印象非常不深刻！
     * x = x0 + cosθ * r
     * x' = x0 + cos(θ + θ') * r
     * x' = x0 + (cosθ * cosθ' - sinθ * sinθ') * r
     */
    (<any>label).x = anchor.x + (label.x - anchor.x) * Math.cos(angle) - (label.y - anchor.y) * Math.sin(angle);
    (<any>label).y = anchor.y + (label.y - anchor.y) * Math.cos(angle) + (label.x - anchor.x) * Math.sin(angle);
    const newEnergy = this.energy(i);

    const delta = newEnergy - oldEnergy;
    this._mAccept(delta, t, i, oldX, oldY);
  }

  /** 获取位置倾向系数 */
  protected _getOrientBias(a: Box, l: BBox) {
    const dx = l.x + l.width / 2 - (a.x + a.width / 2);
    const dy = l.y + l.height / 2 - (a.y + a.height / 2);

    // 右上角
    if (dx > 0 && dy < 0) {
      return 0;
    }
    // 左上角
    if (dx < 0 && dy < 0) {
      return 1;
    }
    // 左下角
    if (dx < 0 && dy > 0) {
      return 2;
    }
    return 3;
  }

  /** 挑选label index */
  protected _getIndex(): number {
    if (_.size(this.worst)) {
      return _.sample(this.worst);
    }

    return Math.floor(Math.random() * this.labels.length);
  }

  /** Metropolis接受准则 */
  private _mAccept(delta: number, t: number, i: number, oldX: number, oldY: number) {
    const label = this._getLabelBBox(i);
    const shape = this.labels[i];
    if (delta <= 0 || Math.random() < Math.exp(-delta / t)) {
      // accept
      shape.attr({
        x: shape.attr('x') + label.x - oldX,
        y: shape.attr('y') + label.y - oldY,
      });
    } else {
      // reject
      (<any>label).x = oldX;
      (<any>label).y = oldY;
    }
  }

  /** 获取当前label的bbox */
  private _getLabelBBox(idx: number): BBox {
    // 目前，shape的bbox是恒等的
    return this.labels[idx].getBBox();
  }

  /** 获取当前锚点的bbox */
  private _getAnchorBBox(idx: number): Box {
    return this.anchorsBBox[idx];
  }

  /** 计算两个shape之间的堆叠区域面积 */
  private _getOverlapArea(a: Box | BBox, b: BBox) {
    const xOverlap = Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x));
    const yOverlap = Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y));

    return xOverlap * yOverlap;
  }

  /** 获取leader line交错系数 */
  private _getIntersect(a1: Box, l1: BBox, a2: Box, l2: BBox): number {
    // 默认行为下，anchor中点连向label中点
    const x1 = a1.x + a1.width / 2;
    const x2 = l1.x + l1.width / 2;
    const x3 = a2.x + a2.width / 2;
    const x4 = l2.x + l2.width / 2;
    const y1 = a1.y + a1.height / 2;
    const y2 = l1.y + l1.height / 2;
    const y3 = a2.y + a2.height / 2;
    const y4 = l2.y + l2.height / 2;

    // http://paulbourke.net/geometry/pointlineplane/
    const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
    const numera = (x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3);
    const numerb = (x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3);
    const mua = numera / denom;
    const mub = numerb / denom;
    if (!(mua < 0 || mua > 1 || mub < 0 || mub > 1)) {
      return 1;
    }
    return 0;
  }

  private _inPanelRange(label: BBox) {
    const panel = this.panel;
    const res = { deltaX: 0, deltaY: 0 };
    if (panel) {
      // 超出视窗范围判断
      // 如果实在没有空间，可以考虑移除
      if (label.x <= panel.minX) {
        res.deltaX = panel.minX - label.x;
      } else if (label.x + label.width >= panel.maxX) {
        res.deltaX = panel.maxX - label.width - label.x;
      }
      if (label.y <= panel.minY) {
        res.deltaY = panel.minY - label.y;
        (<any>label).y = panel.minY;
      } else if (label.y + label.height >= panel.maxY) {
        res.deltaY = panel.maxY - label.height - label.y;
      }
      (<any>label).x += res.deltaX;
      (<any>label).y += res.deltaY;
    }
    return res;
  }
}

export default function labeling(labels: Shape[], anchorsBBox: Box[], panel: BBox, param?: Partial<Config>) {
  const alg = new Annealing({ labels, anchorsBBox, panel, ...param });
  alg.run();
}
