import { deepMix, each, hasKey } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import squarify from './layout/squarify';
import { INTERACTION_MAP } from './interaction';
import * as EventParser from './event';
import TreemapLabel from './components/label';

const PARENT_NODE_OFFSET = 4;
const BLOCK_MARGIN = 4;

export interface TreemapViewConfig extends ViewConfig {
  data: any;
  maxLevel?: number;
  colorField: string;
  colors?: string[];
  rectStyle?: any;
}

export interface TreemapLayerConfig extends TreemapViewConfig, LayerConfig {}

export default class TreemapLayer<T extends TreemapLayerConfig = TreemapLayerConfig> extends ViewLayer<T> {
  public static getDefaultOptions(): Partial<TreemapLayerConfig> {
    return deepMix({}, super.getDefaultOptions(), {
      maxLevel: 2,
      padding: [0, 0, 0, 0],
      tooltip: {
        visible: false,
        showTitle: false,
        showCrosshairs: false,
        showMarkers: false,
        shared: false,
      },
      legend: {
        visible: false,
      },
      xAxis: {
        visible: false,
      },
      yAxis: {
        visible: false,
      },
      xField: 'x',
      yField: 'y',
      label: {
        visible: true,
        adjustPosition: true,
        style: {
          stroke: 'rgba(0,0,0,0)',
          lineWidth: 0,
          fontSize: 12,
        },
      },
      meta: {
        x: {
          nice: false,
        },
        y: {
          nice: false,
        },
      },
      interactions: [{ type: 'tooltip' }],
    });
  }
  public type: string = 'treemap';
  public rootData: any;
  public rect: any;
  private isDrilldown: boolean;

  public beforeInit() {
    super.beforeInit();
    const { interactions } = this.options;
    if (interactions) {
      each(interactions, (interaction) => {
        if (interaction.type === 'drilldown') {
          this.isDrilldown = true;
          this.options.maxLevel = 1;
        }
      });
    }
    const { data } = this.options;
    const treemapData = this.getTreemapData(data);
    this.rootData = treemapData;
  }

  public afterRender() {
    super.afterRender();
    if (this.options.label && this.options.label.visible) {
      const label = new TreemapLabel({
        view: this.view,
        plot: this,
        ...this.options.label,
      });
      label.render();
    }
  }

  protected geometryParser(dim, type) {
    return 'polygon';
  }

  public getTreemapData(data, level?) {
    const viewRange = this.getViewRange();
    const root = squarify(data, viewRange.x, viewRange.y, viewRange.width, viewRange.height);
    this.recursive(root, 1);
    const treemapData = [];
    this.getAllNodes(root, treemapData, level);
    treemapData.sort((a, b) => {
      return a.depth - b.depth;
    });
    this.options.xField = 'x';
    this.options.yField = 'y';
    return treemapData;
  }

  protected processData() {
    return this.rootData;
  }

  protected coord() {}

  protected addGeometry() {
    const { data, colorField, color } = this.options;
    const treemapData = this.getTreemapData(data);
    this.rootData = treemapData;
    const isNested = this.isNested(treemapData);
    this.rect = {
      type: 'polygon',
      position: {
        fields: ['x', 'y'],
      },
      color: {
        fields: [colorField],
        values: color,
      },
      style: {
        fields: ['depth'],
        callback: (d) => {
          const defaultStyle = this.adjustStyleByDepth(d, isNested);
          return deepMix({}, defaultStyle, this.options.rectStyle);
        },
      },
      tooltip: {
        fields: ['name', 'value'],
      },
    };
    this.setConfig('geometry', this.rect);
  }

  protected applyInteractions() {
    const interactionCfg = this.options.interactions;
    const interactions = this.view.interactions;
    each(interactionCfg, (inter) => {
      const Ctr = INTERACTION_MAP[inter.type];
      if (Ctr) {
        const interaction = new Ctr(
          deepMix(
            {},
            {
              view: this.view,
              plot: this,
              startEvent: 'polygon:click',
            },
            inter.cfg,
            Ctr.getInteractionRange(this.layerBBox, inter.cfg)
          )
        );
        interactions[inter.type] = interaction;
      }
    });
  }

  protected animation() {
    super.animation();
    if (this.isDrilldown) {
      this.rect.animate = false;
    }
  }

  protected parseEvents(eventParser) {
    super.parseEvents(EventParser);
  }

  private recursive(rows, depth?) {
    const { colorField } = this.options;
    each(rows, (r) => {
      each(r.children, (c) => {
        c.depth = depth;
        if (depth > 1) c.parent = r;
        if (!hasKey(c, colorField)) {
          c[colorField] = r[colorField];
        }
        c.showLabel = true;
        const leaf = this.isLeaf(c);
        if (!leaf) {
          const cliperHeight = Math.abs(c.y1 - c.y0);
          const labelHeight = this.getLabelHeight();
          const parentLabelOffset = cliperHeight / 2 > labelHeight ? labelHeight : BLOCK_MARGIN;
          c.showLabel = parentLabelOffset === BLOCK_MARGIN ? false : true;
          const c_rows = squarify(
            c,
            c.x0 + BLOCK_MARGIN,
            c.y0 + parentLabelOffset,
            c.x1 - BLOCK_MARGIN,
            c.y1 - BLOCK_MARGIN
          );
          this.fillColorField(c_rows, colorField, c[colorField]);
          this.recursive(c_rows, c.depth + 1);
        }
      });
    });
  }

  private getAllNodes(data, nodes, level?) {
    const max = level ? level : this.options.maxLevel;
    const viewRange = this.getViewRange();
    each(data, (d) => {
      if (hasKey(d, 'x0') && d.depth <= max) {
        nodes.push({
          ...d,
          x: [d.x0, d.x1, d.x1, d.x0],
          y: [viewRange.height - d.y1, viewRange.height - d.y1, viewRange.height - d.y0, viewRange.height - d.y0],
        });
      }
      if (hasKey(d, 'children')) {
        this.getAllNodes(d.children, nodes);
      }
    });
  }

  private fillColorField(rows, fieldName, value) {
    each(rows, (r) => {
      if (!hasKey(r, fieldName)) {
        r[fieldName] = value;
      }
    });
  }

  private getLabelHeight() {
    const { label } = this.options;
    const { fontSize } = this.getPlotTheme().label.style;
    let size = 0;
    if (label && label.visible) {
      const labelStyle: any = label.style;
      size = labelStyle && labelStyle.fontSize ? labelStyle.fontSize : fontSize;
    }
    return size + PARENT_NODE_OFFSET * 2;
  }

  private isLeaf(data) {
    return !data.children || data.children.length === 0;
  }

  private isNested(data) {
    const { maxLevel } = this.options;
    if (maxLevel === 1) {
      return false;
    }
    let nested = false;
    for (let i = 0; i < data.length; i++) {
      if (data[i].children) {
        nested = true;
        break;
      }
    }
    return nested;
  }

  private adjustStyleByDepth(depth, isNested) {
    const { maxLevel } = this.options;
    if (!isNested) {
      return {
        lineWidth: 1,
        stroke: 'rgba(0,0,0,0.9)',
        opacity: 0.9,
      };
    } else if (depth === 1) {
      return {
        lineWidth: 1,
        stroke: 'black',
        opacity: depth / maxLevel,
      };
    } else {
      return {
        lineWidth: 1,
        stroke: 'rgba(0,0,0,0.3)',
        opacity: depth / maxLevel,
      };
    }
  }
}

registerPlotType('treemap', TreemapLayer);
