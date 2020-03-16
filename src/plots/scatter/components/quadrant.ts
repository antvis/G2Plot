import { each, isArray, isFunction, deepMix } from '@antv/util';
import BBox from '../../../util/bbox';
import { View, IGroup } from '../../../dependents';

interface ILabel {
  position?: string;
  text: string[] | Function;
  offset?: number | Function;
  style?: any;
}

export interface QuadrantConfig {
  visible?: boolean;
  xBaseline?: number;
  yBaseline?: number;
  regionStyle?: any[] | any;
  lineStyle?: any;
  label?: ILabel;
}

export interface IQuadrant extends QuadrantConfig {
  view: View;
  plotOptions: any;
}

export default class Quadrant {
  public options: IQuadrant;
  protected view: View;
  protected quadrantGroups: IGroup[] = [];
  protected container: IGroup;
  protected regionData: any[] = [];
  protected lineData: any[] = [];

  constructor(cfg: IQuadrant) {
    this.options = cfg;
    this.view = this.options.view;
    this.init();
  }

  public init() {
    const { xBaseline, yBaseline } = this.options;
    const coord = this.view.getCoordinate();
    // TODO: xBaseline和yBaseline支持百分比
    // 根据 xBaseline 和 yBaseline 分割象限
    const xScale = this.view.getScaleByField(this.options.plotOptions.xField);
    const yScale = this.view.getScaleByField(this.options.plotOptions.yField);
    // 先进行 x 方向的分割
    let xRegion;
    if (xBaseline > xScale.min && xBaseline < xScale.max) {
      const ratio = (xBaseline - xScale.min) / (xScale.max - xScale.min);
      xRegion = [
        new BBox(coord.start.x, coord.end.y, coord.getWidth() * ratio, coord.getHeight()),
        new BBox(
          coord.start.x + coord.getWidth() * ratio,
          coord.end.y,
          coord.getWidth() * (1 - ratio),
          coord.getHeight()
        ),
      ];
      const verticalLineData = {
        start: { x: coord.start.x + coord.getWidth() * ratio, y: coord.end.y },
        end: { x: coord.start.x + coord.getWidth() * ratio, y: coord.start.y },
      };
      this.lineData.push(verticalLineData);
    } else {
      xRegion = [new BBox(coord.start.x, coord.end.y, coord.getWidth(), coord.getHeight())];
    }
    // 再进行 y 方向的分割
    if (yBaseline > yScale.min && yBaseline < yScale.max) {
      const ratio = (yBaseline - yScale.min) / (yScale.max - yScale.min);
      const horizontalLineData = {
        start: { x: coord.start.x, y: coord.start.y - coord.getHeight() * ratio },
        end: { x: coord.end.x, y: coord.start.y - coord.getHeight() * ratio },
      };
      this.lineData.push(horizontalLineData);
      const topQuadrant = {
        name: xBaseline <= xScale.min ? 'top-right' : 'top-left',
        bbox: new BBox(xRegion[0].minX, xRegion[0].minY, xRegion[0].width, xRegion[0].height * (1 - ratio)),
        index: xBaseline <= xScale.min ? 2 : 0,
      };
      this.regionData.push(topQuadrant);
      const bottomQuadrant = {
        name: xBaseline <= xScale.min ? 'bottom-right' : 'bottom-left',
        bbox: new BBox(
          xRegion[0].minX,
          xRegion[0].minY + xRegion[0].height * (1 - ratio),
          xRegion[0].width,
          xRegion[0].height * ratio
        ),
        index: xBaseline <= xScale.min ? 3 : 1,
      };
      this.regionData.push(bottomQuadrant);
      // 四象限齐全
      if (xRegion.length > 1) {
        const rightTopQuadrant = {
          name: 'top-right',
          bbox: new BBox(xRegion[1].minX, xRegion[1].minY, xRegion[1].width, xRegion[1].height * (1 - ratio)),
          index: 2,
        };
        this.regionData.push(rightTopQuadrant);
        const rightBottomQuadrant = {
          name: 'bottom-right',
          bbox: new BBox(
            xRegion[1].minX,
            xRegion[1].minY + xRegion[1].height * (1 - ratio),
            xRegion[1].width,
            xRegion[1].height * ratio
          ),
          index: 3,
        };
        this.regionData.push(rightBottomQuadrant);
      }
    } else if (xRegion.length === 2) {
      if (yBaseline <= yScale.min) {
        const leftTopQuadrant = {
          name: 'top-left',
          bbox: xRegion[0],
          index: 0,
        };
        this.regionData.push(leftTopQuadrant);
        const rightTopQuadrant = {
          name: 'top-right',
          bbox: xRegion[1],
          index: 2,
        };
        this.regionData.push(rightTopQuadrant);
      } else {
        const leftBottomQuadrant = {
          name: 'bottom-left',
          bbox: xRegion[0],
          index: 1,
        };
        this.regionData.push(leftBottomQuadrant);
        const rightBottomQuadrant = {
          name: 'bottom-right',
          bbox: xRegion[1],
          index: 3,
        };
        this.regionData.push(rightBottomQuadrant);
      }
    } else {
      // 当前绘制区域全部在一个象限中
      if (xBaseline <= xScale.min) {
        if (yBaseline <= yScale.min) {
          const rightTopQuadrant = {
            name: 'top-right',
            bbox: xRegion[0],
            index: 2,
          };
          this.regionData.push(rightTopQuadrant);
        } else {
          const rightBottomQuadrant = {
            name: 'bottom-right',
            bbox: xRegion[0],
            index: 3,
          };
          this.regionData.push(rightBottomQuadrant);
        }
      } else {
        if (yBaseline <= yScale.min) {
          const leftTopQuadrant = {
            name: 'top-left',
            bbox: xRegion[0],
            index: 0,
          };
          this.regionData.push(leftTopQuadrant);
        } else {
          const leftBottomQuadrant = {
            name: 'bottom-left',
            bbox: xRegion[0],
            index: 1,
          };
          this.regionData.push(leftBottomQuadrant);
        }
      }
    }
    // 创建container
    this.container = this.view.backgroundGroup.addGroup();
  }

  public render() {
    if (this.regionData.length > 0) {
      const defaultStyle = this.getDefaultStyle();
      const regionStyle = this.getRegionStyle(this.regionData);
      each(this.regionData, (d) => {
        const { index } = d;
        const group = this.container.addGroup();
        const rect = group.addShape('rect', {
          attrs: {
            x: d.bbox.minX,
            y: d.bbox.minY,
            width: d.bbox.width,
            height: d.bbox.height,
            ...regionStyle[index],
          },
          name: 'quadrant',
        });
        if (this.options.label && this.options.label.text) {
          const labelOptions = deepMix({}, defaultStyle.label, this.options.label);
          const labelCfg = this.getLabelConfig(d, labelOptions);
          const label = group.addShape('text', {
            attrs: {
              ...labelCfg,
            },
            name: 'quadrant-label',
          });
        }
        // rect.setSilent('data', d);
        rect.set('data', d);
        this.quadrantGroups.push(group);
      });

      // 绘制象限辅助线
      const lineStyle = deepMix({}, defaultStyle.line, this.options.lineStyle);
      each(this.lineData, (d) => {
        this.container.addShape('path', {
          attrs: {
            path: [
              ['M', d.start.x, d.start.y],
              ['L', d.end.x, d.end.y],
            ],
            ...lineStyle,
          },
          name: 'quadrant-line',
        });
      });
      this.view.canvas.draw();
    }
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
  }

  protected getDefaultStyle() {
    return {
      line: {
        stroke: '#9ba29a',
        lineWidth: 1,
      },
      regionStyle: [
        { fill: '#000000', opacity: 0.05 },
        { fill: '#ffffff', opacity: 0 },
        { fill: '#ffffff', opacity: 0 },
        { fill: '#000000', opacity: 0.05 },
      ],
      label: {
        position: 'outter-inner',
        offset: 10,
        style: {
          fontSize: 14,
          fill: '#ccc',
          // fontWeight: 100
        },
      },
    };
  }

  private getRegionStyle(regionData) {
    const defaultStyle = this.getDefaultStyle();
    let style = defaultStyle.regionStyle;
    if (this.options.regionStyle) {
      const { regionStyle } = this.options;
      if (isArray(regionStyle)) {
        style = style.map((s, index) => {
          if (regionStyle.length > index && regionStyle[index]) {
            return regionStyle[index];
          }
          return s;
        });
      } else if (isFunction(regionStyle)) {
        each(regionData, (d, index) => {
          style[index] = regionStyle(d);
        });
      }
    }

    return style;
  }

  private getLabelConfig(region, labelOptions) {
    const { index } = region;
    let x = 0;
    let y = 0;
    let style: any = {};
    let text = labelOptions.text;
    if (isFunction(text)) {
      text = text(region);
    } else if (isArray(text)) {
      text = text[index];
    }
    const { position } = labelOptions;
    const pos = position.split('-');
    const dim = region.name.split('-');
    // x方向
    if (dim[1] === 'left') {
      if (pos[0] === 'inner') {
        x = region.bbox.maxX - labelOptions.offset;
        style.textAlign = 'right';
      }
      if (pos[0] === 'outter') {
        x = region.bbox.minX + labelOptions.offset;
        style.textAlign = 'left';
      }
    } else if (dim[1] === 'right') {
      if (pos[0] === 'inner') {
        x = region.bbox.minX + labelOptions.offset;
        style.textAlign = 'left';
      }
      if (pos[0] === 'outter') {
        x = region.bbox.maxX - labelOptions.offset;
        style.textAlign = 'right';
      }
    }
    // y方向
    if (dim[0] === 'top') {
      if (pos[1] === 'inner') {
        y = region.bbox.maxY - labelOptions.offset;
        style.textBaseline = 'bottom';
      }
      if (pos[1] === 'outter') {
        y = region.bbox.minY + labelOptions.offset;
        style.textBaseline = 'top';
      }
    } else if (dim[0] === 'bottom') {
      if (pos[1] === 'inner') {
        y = region.bbox.minY + labelOptions.offset;
        style.textBaseline = 'top';
      }
      if (pos[1] === 'outter') {
        y = region.bbox.maxY - labelOptions.offset;
        style.textBaseline = 'bottom';
      }
    }
    style = deepMix({}, labelOptions.style, style);
    style.lineHeight = style.fontSize;
    return {
      x,
      y,
      text,
      ...style,
    };
  }
}
