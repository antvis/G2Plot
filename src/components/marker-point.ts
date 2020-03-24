import { View, IGroup, IShape, MarkerSymbols } from '../dependents';
import { deepMix, isMatch, isString, isArray, each, find } from '@antv/util';
import { MappingDatum, GAnimateCfg } from '@antv/g2/lib/interface';
import { DEFAULT_ANIMATE_CFG } from '@antv/g2/lib/animate';
import { Event } from '@antv/g2/lib/dependents';

interface PointStyle {
  size?: number;
  fill?: string;
  stroke?: string;
  lineWidth?: number;
}

interface MarkerItem {
  _origin: object;
}

type AnimationOption = {
  endState: PointStyle;
  animateCfg: GAnimateCfg;
};

interface Cfg {
  view: View;
  data: any[];
  // 'image://http://xxx.xxx.xxx/a/b.png'
  symbol?: string | ((x: number, y: number, r: number) => any[][]);
  size?: number;
  /** 标注点 point 坐标的 x 偏移 */
  offsetX?: number;
  offsetY?: number;
  label?: {
    visible: boolean;
    /** marker point 映射的字段 */
    field?: string;
    /** _origin: 原始数据 */
    formatter?: (text: string, item: MarkerItem, index: number) => string;
    position?: 'top' | 'bottom';
    offsetX?: number;
    offsetY?: number;
    style?: object;
  };
  style?: {
    normal?: PointStyle;
    active?: PointStyle;
    selected?: PointStyle;
  };
  events?: {
    mouseenter?: (e: Event) => void;
    mouseleave?: (e: Event) => void;
    click?: (e: Event) => void;
  };
  animation?: boolean | AnimationOption;
}

const DEFAULT_STYLE = {
  stroke: 'transparent',
  fill: '#FCC509',
  lineWidth: 0,
};

const ACTIVE_STYLE = {
  stroke: '#FFF',
  fill: '#FCC509',
  lineWidth: 1,
};

const SELECTED_STYLE = {
  stroke: 'rgba(0,0,0,0.85)',
  fill: '#FCC509',
  lineWidth: 1,
};

interface StateCondition {
  id: string;
  data: {};
}
type State = 'active' | 'inactive' | 'selected';

export { Cfg as MarkerPointCfg };

/**
 * 标注点 绘制在最顶层
 */
export default class MarkerPoint {
  public view: View;
  public container: IGroup;
  public config: Cfg;
  private points: IShape[] = [];
  private labels: IShape[] = [];
  private size: number;
  private name = 'markerPoints';
  private selectedPoint: IShape;

  protected defaultCfg = {
    offsetX: 0,
    offsetY: 0,
    style: { normal: DEFAULT_STYLE, selected: SELECTED_STYLE, active: ACTIVE_STYLE },
    events: {
      mouseenter: () => {},
      mouseleave: () => {},
      click: () => {},
    },
    label: {
      visible: false,
      offsetY: -8,
      position: 'top',
      style: {
        fill: 'rgba(0, 0, 0, 0.85)',
      },
    },
    animation: false,
  };

  constructor(cfg: Cfg) {
    this.view = cfg.view;
    this.size = cfg.size || 6;
    this.config = deepMix({}, this.defaultCfg, cfg);
    this._init();
  }

  public render() {
    const dataArray = this.getDataArray();
    this._renderPoints(dataArray);
    this.view.canvas.draw();
    this._addInteraction();
  }

  public clear() {
    if (this.container) {
      this.container.clear();
    }
  }

  public destroy() {
    if (this.container) {
      this.container.remove();
    }
    this.points = [];
    this.labels = [];
  }

  protected getDataArray(): MappingDatum[][] {
    const geometry = this.view.geometries[0];
    return geometry.dataArray;
  }

  private _init() {
    const layer = this.view.foregroundGroup;
    this.container = layer.addGroup();
    this.render();
    this.view.on('beforerender', () => {
      this.clear();
    });
  }

  private _renderPoints(dataArray: MappingDatum[][]) {
    each(this.config.data, (dataItem, dataItemIdx) => {
      const origin = find(dataArray[0], (d) => isMatch(d._origin, dataItem));
      if (origin) {
        const pointAttrs = this.config.style.normal;
        const group = this.container.addGroup({ name: this.name });
        let { x, y } = origin;
        if (isArray(x)) {
          x = x[0];
        }
        if (isArray(y)) {
          y = y[0];
        }
        let symbol = this.config.symbol;
        const { offsetX, offsetY } = this.config;
        let point;
        if (isString(symbol) && symbol.startsWith('image://')) {
          const imageUrl = symbol.substr(8);
          point = group.addShape('image', {
            attrs: {
              x: x - this.size / 2 + offsetX,
              y: y - this.size / 2 + offsetY,
              img: imageUrl,
              width: this.size,
              height: this.size,
            },
          });
        } else {
          symbol = isString(symbol) ? MarkerSymbols[symbol] : symbol;
          point = group.addShape({
            type: 'marker',
            name: 'marker-point',
            id: `point-${dataItemIdx}`,
            attrs: {
              x: x + offsetX,
              y: y + offsetY,
              r: this.size / 2,
              ...pointAttrs,
              symbol,
            },
          });
        }
        this.points.push(point);
        this._animatePoint(point);
        this._renderLabel(group, origin, dataItemIdx);
        group.set('data', dataItem);
        group.set('origin', origin);
      }
    });
  }

  private _renderLabel(container: IGroup, origin: MappingDatum, index) {
    const { label: labelCfg } = this.config;
    if (labelCfg && labelCfg.visible) {
      const { offsetX = 0, offsetY = 0, formatter, position, field } = labelCfg;
      let text = origin._origin[field];
      if (formatter) {
        text = formatter(text, { _origin: origin._origin }, index);
      }
      const x = isArray(origin.x) ? origin.x[0] : origin.x;
      const y = isArray(origin.y) ? origin.y[0] : origin.y;
      const label = container.addShape('text', {
        name: 'marker-label',
        id: `label-${index}`,
        attrs: {
          x: x + offsetX,
          y: y + offsetY,
          text: text || '',
          ...labelCfg.style,
          textAlign: 'center',
          textBaseline: position === 'top' ? 'bottom' : 'top',
        },
      });
      this.labels.push(label);
    }
  }

  private _addInteraction() {
    const { events } = this.config;
    each(events, (cb, eventName) => {
      this.container.on(`${this.name}:${eventName}`, (e) => {
        cb(e);
        const target = e.target.get('parent');
        const pointShape = target.get('children')[0];
        if (pointShape) {
          const data = pointShape.get('data');
          const id = pointShape.get('id');
          const condition = { id, data };
          if (eventName === 'click') {
            if (this.selectedPoint && this.selectedPoint.get('id') === id) {
              this.selectedPoint = null;
              this.setState('inactive', condition);
            } else {
              this.selectedPoint = pointShape;
              this.setState('selected', condition);
            }
          } else if (eventName === 'mouseenter') {
            this.setState('active', condition);
          } else if (eventName === 'mouseleave') {
            this.setState('inactive', condition);
          }
        }
        this.view.canvas.draw();
      });
      this.view.on('click', (e) => {
        const target = e.target.get('parent');
        if (!target || (target.get('name') !== this.name && this.selectedPoint)) {
          this.selectedPoint = null;
          this.setState('inactive');
        }
      });
    });
  }

  private setState(state: State, condition?: StateCondition) {
    if (state === 'active') {
      if (!this.selectedPoint || condition.id !== this.selectedPoint.get('id')) {
        this._onActive(condition);
      }
    } else if (state === 'inactive') {
      this.points.forEach((p) => this._onInactive(p));
    } else if (state === 'selected') {
      this._onSelected(condition);
    }
  }

  private _onActive(condition?: StateCondition) {
    const { active } = this.config.style;
    each(this.points, (point) => {
      if (point.get('id') === condition.id) {
        each(active, (v, k) => {
          point.attr(k, v);
        });
      } else {
        this._onInactive(point);
      }
    });
  }

  private _onInactive(point: IShape) {
    const { normal } = this.config.style;
    if (!this.selectedPoint || point.get('id') !== this.selectedPoint.get('id')) {
      each(normal, (v, k) => {
        point.attr(k, v);
      });
    }
  }

  private _onSelected(condition: StateCondition) {
    const { selected } = this.config.style;
    each(this.points, (point) => {
      if (point.get('id') === condition.id) {
        each(selected, (v, k) => {
          point.attr(k, v);
        });
      } else {
        this._onInactive(point);
      }
    });
  }

  /** point animation, not for label */
  private _animatePoint(shape: IShape) {
    const { animation, size } = this.config;
    if (animation !== false) {
      const { endState = {}, animateCfg = DEFAULT_ANIMATE_CFG.appear } = animation as AnimationOption;
      shape.animate(
        {
          r: Number.isNaN(endState.size / 2) ? size / 2 : endState.size / 2,
          ...endState,
        },
        animateCfg
      );
    }
  }
}
