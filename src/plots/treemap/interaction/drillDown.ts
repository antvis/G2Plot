import Breadcrumb, { BreadcrumbItem } from '../../../components/breadcrumb';
import BaseInteraction from '../../../interaction/base';
import { BBox, Group } from '@antv/g';
import TreemapLayer from '../layer';
import { each } from '@antv/util';

const DEFAULT_ITEM_WIDTH = 100;
const DEFAULT_ITEM_HEIGHT = 30;

interface IStartNode {
  name?: string;
  parentNode?: any;
  index?: number;
}

interface IDrillDownInteractionConfig {
  x?: number;
  y?: number;
  startNode?: IStartNode;
  itemWidth?: number;
  itemHeight?: number;
  padding?: number[];
}

const getValidBreadcrumbConfig = (cfg: IDrillDownInteractionConfig = {}): Required<IDrillDownInteractionConfig> => {
  const _cfg: Required<IDrillDownInteractionConfig> = {
    x: 0,
    y: 0,
    startNode: { name: 'root' },
    itemWidth: DEFAULT_ITEM_WIDTH,
    itemHeight: DEFAULT_ITEM_HEIGHT,
    padding: [0, 0, 0, 0],
    ...cfg,
  };
  return _cfg;
};

export default class DrillDownInteraction extends BaseInteraction {
  public static getInteractionRange(layerRange: BBox, interaction: IDrillDownInteractionConfig) {
    const config: Required<IDrillDownInteractionConfig> = getValidBreadcrumbConfig(interaction);
    const [paddingTop, paddingRight, paddingBottom, paddingLeft] = config.padding;
    return new BBox(
      layerRange.minX,
      layerRange.maxY - config.itemHeight - paddingTop - paddingBottom,
      layerRange.width,
      config.itemHeight + paddingTop + paddingBottom
    );
  }

  private container: Group;
  private breadcrumb: Breadcrumb;
  private plot: TreemapLayer;
  private startNode: IStartNode;
  private currentNode: any;

  private y: number;

  public start(ev) {
    const data = ev.data._origin;
    if (data.children) {
      this.update(data);
    }
  }

  protected update(data) {
    const tempoData = this.plot.getTreemapData(data, data.depth);
    this.view.changeData(tempoData);
    this.currentNode = data;
    this.render();
  }

  protected render() {
    if (this.breadcrumb) {
      const items = this.getItems();
      this.breadcrumb.update({
        items,
      });
      this.layout();
    } else {
      this.container = this.container = this.canvas.addGroup();
      if (!this.startNode) {
        this.startNode = {
          name: 'root',
        };
      }
      this.currentNode = this.startNode;
      const y = this.view.get('viewRange').maxY + 10;
      this.breadcrumb = new Breadcrumb({
        container: this.container,
        x: 0,
        y,
        items: this.getItems(),
      });
      this.breadcrumb.render();
      this.layout();
    }
    this.onInteraction();
  }

  protected clear() {}

  private layout() {
    const currentWidth = this.container.getBBox().width;
    const matrix = this.container.attr('matrix');
    const x = (600 - currentWidth) / 2;
    matrix[6] = x;
    this.canvas.draw();
  }

  private getItems() {
    let items = [];
    if (this.currentNode.name && this.currentNode.name === 'root') {
      items.push({ key: '1', text: 'root', data: this.plot.rootData });
    } else {
      items = [];
      const parents = [];
      this.findParent(this.currentNode, parents);
      items.push({ key: '1', text: 'root', data: this.plot.rootData });
      each(parents, (p, index) => {
        items.push({ key: String(index + 2), text: p.name, data: p });
      });
      items.push({ key: String(parents.length + 2), text: this.currentNode.name, data: this.currentNode });
    }
    return items;
  }

  private findParent(data, parents) {
    if (data.parent) {
      parents.push(data.parent);
      this.findParent(data.parent, parents);
    } else {
      return;
    }
  }

  private onInteraction() {
    this.container.on('click', (ev) => {
      const targetParent = ev.target.get('parent');
      if (targetParent && targetParent.get('class') === 'item-group') {
        const data = targetParent.get('data');
        if (data.data) {
          if (data.text === 'root') {
            this.view.changeData(data.data);
            this.currentNode = this.plot.options.data;
            this.render();
          } else if (this.currentNode === data.data) {
            return;
          } else {
            this.update(data.data);
          }
        }
      }
    });
  }
}

BaseInteraction.registerInteraction('drilldown', DrillDownInteraction);
