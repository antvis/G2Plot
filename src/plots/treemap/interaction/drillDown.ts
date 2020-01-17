import Breadcrumb from '../../../components/breadcrumb';
import BaseInteraction from '../../../interaction/base';
import { BBox, Group } from '@antv/g';
import TreemapLayer from '../layer';
import { each, hasKey, isNumber, minBy, maxBy } from '@antv/util';
import { getScale } from '@antv/scale';
import { getAttribute } from '@antv/attr';

const DEFAULT_ITEM_WIDTH = 100;
const DEFAULT_ITEM_HEIGHT = 30;

interface IStartNode {
  name?: string;
}

interface IDrillDownInteractionConfig {
  x?: number;
  y?: number;
  startNode?: IStartNode;
  itemWidth?: number;
  itemHeight?: number;
  padding?: number[];
  [key: string]:any;
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
  private currentDepth: number;
  private startNodeName: string;
  private cache: any;
  private mapping: any;
  private y: number;

  public start(ev) {
    const data = ev.data._origin;
    if (data.children) {
      this.currentDepth ++;
      this.update(data);
    }
  }

  protected update(data) {
    if(!hasKey(this.cache,data.name)){
       this.cache[data.name] = data; 
    }
    const tempoData = this.plot.getTreemapData(data, data.depth);
    this.view.changeData(tempoData);
    this.adjustScale(this.currentDepth);
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
      this.cache = {};
      this.container = this.container = this.canvas.addGroup();
      if (!this.startNode) {
        this.startNode = {
          name: 'root',
        };
      }
      if(this.startNode.name === 'root'){
          this.startNodeName = hasKey(this.plot.options.data,'name') ? this.plot.options.data.name : 'root';
          this.currentNode = this.plot.options.data;
          this.currentDepth = 1;
      }else{
         this.startNodeName = this.startNode.name;
         this.currentNode = this.startNode; 
      }
      this.y = this.view.get('viewRange').maxY + 10;
      this.breadcrumb = new Breadcrumb({
        container: this.container,
        x: 0,
        y:this.y,
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
    const x = (600 - currentWidth) / 2;
    this.breadcrumb.update({
        x,
        y: this.y
    });
  }

  private getItems() {
    let items = [];
    if (this.currentNode.name && this.currentNode.name === this.startNodeName) {
      items.push(this.getRootItem());
    } else {
      items = [];
      const parents = [];
      this.findParent(this.currentNode, parents);
      items.push(this.getRootItem());
      each(parents, (p, index) => {
        items.push({ key: String(index + 2), text: p.name, data: p });
      });
      items.push({ key: String(parents.length + 2), text: this.currentNode.name, data: this.currentNode });
    }
    return items;
  }

  private findParent(data, parents) {
    if (data.parent) {
      if(hasKey(this.cache,data.parent.name)){
        parents.push(this.cache[data.parent.name]);
      }else{
        parents.push(data.parent);
      }
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
          if (data.text === this.startNodeName) {
            this.view.changeData(data.data);
            this.currentNode = this.plot.options.data;
            this.render();
          } else if (this.currentNode === data.data) {
            return;
          } else {
            this.currentDepth = parseInt(data.key) - 1; 
            this.update(data.data);
          }
        }
      }
    });
  }

  private getRootItem(){
      const rootData  = this.plot.options.data;
      const rootName = hasKey(rootData,'name') ? rootData.name : 'root';
          return { key: '1', text: rootName, data: this.plot.rootData };
  }

  private adjustScale(index){
      const { view } = this;
      const geom = this.view.get('elements')[0];
      // 根据当前层级确定mapping配置项
      const mappingCfg = this.mapping[index];
      // 如果mapping字段与当前不一致
      const currentField = geom.get('attrs').color.scales[0].field;
      if(mappingCfg.field !== currentField){
          this.view.get('elements')[0].color(mappingCfg.field,mappingCfg.values);
          view.render();
      }
  }

}

BaseInteraction.registerInteraction('drilldown', DrillDownInteraction);