import { Action, IGroup, Util } from '@antv/g2';
import { get, isArray } from '@antv/util';
import { deepAssign } from '../../../../utils/deep-assign';
import { transformData } from '../../utils';

// 面包屑文字和分割符'/'之间的距离
const PADDING = 4;
// 面包屑位置距离树图的距离
const PADDING_LEFT = 0;
const PADDING_TOP = 5;
// 面包屑默认配置
const DEFAULT_BREAD_CRUMB_CONFIG = {
  name: 'treemap-bread-crumb',
  rootText: '初始',
  dividerText: '/',
  textStyle: {
    fontSize: 12,
    fill: 'rgba(0, 0, 0, 0.65)',
    cursor: 'pointer',
  },
  activeStyle: {
    fill: '#87B5FF',
  },
};
export class TreemapDrillDownAction extends Action {
  // 存储历史下钻数据
  public historyCache: Record<string, any>[] = null;
  // 面包屑 group
  private breadCrumbGroup: IGroup = null;
  // 面包屑基础配置
  private breadCrumbCfg = DEFAULT_BREAD_CRUMB_CONFIG;

  /**
   * 获取 mix 默认的配置和用户配置
   */
  private getButtonCfg() {
    return deepAssign(this.breadCrumbCfg, this.cfg);
  }

  /**
   * 下钻数据并更新 view 显示层
   * @param data 下钻数据
   */
  private drill(data) {
    const config = this.getButtonCfg();
    const { view } = this.context;
    const currentData = view.getData();
    const groupScales = view.getGroupScales();
    const hierarchyConfig = get(view, ['interactions', 'treemap-drill-down', 'cfg', 'hierarchyConfig'], {});

    // 初始化cache 数据
    if (!this.historyCache) {
      this.historyCache = [
        {
          // 当前会默认打平第一层，因此无法获取第一层的 name，暂用初始代替
          name: config.rootText,
          children: currentData,
        },
      ];
    }

    // 重新 update 数据
    const drillData = transformData({
      data,
      colorField: get(groupScales, [0, 'field']),
      enableDrillDown: true,
      hierarchyConfig,
    });

    view.changeData(drillData);

    // 增加历史记录
    this.historyCache.push({
      name: data.name,
      children: drillData,
    });
  }

  /**
   * 显示面包屑
   */
  public drawBreadCrumb() {
    this.drawBreadCrumbGroup();
    this.resetPosition();
    this.breadCrumbGroup.show();
  }

  /**
   * 绘制 Button 和 文本
   */
  private drawBreadCrumbGroup() {
    const config = this.getButtonCfg();
    const historyCache = this.historyCache;

    // 初始化面包屑 group
    if (!this.breadCrumbGroup) {
      this.breadCrumbGroup = this.context.view.foregroundGroup.addGroup({
        name: config.name,
      });
    } else {
      this.breadCrumbGroup.clear();
    }

    // 绘制面包屑
    let left = 0;
    historyCache.forEach((record, index) => {
      // 添加文本
      const textShape = this.breadCrumbGroup.addShape({
        type: 'text',
        name: `${config.name}_${record.name}_text`,
        attrs: {
          text: record.name,
          ...config.textStyle,
          x: left,
          y: 0,
        },
      });

      const textShapeBox = textShape.getBBox();
      left += textShapeBox.width + PADDING;

      // 增加文本事件
      textShape.on('click', () => {
        const newHistoryCache = historyCache.slice(0, index + 1);
        this.back(newHistoryCache);
      });

      // active 效果内置
      textShape.on('mouseenter', () => {
        textShape.attr(config.activeStyle);
      });
      textShape.on('mouseleave', () => {
        textShape.attr(config.textStyle);
      });

      if (index < historyCache.length - 1) {
        // 添加反斜杠
        const dividerShape = this.breadCrumbGroup.addShape({
          type: 'text',
          name: `${config.name}_${record.name}_divider`,
          attrs: {
            text: config.dividerText,
            ...config.textStyle,
            x: left,
            y: 0,
          },
        });

        const dividerBox = dividerShape.getBBox();
        left += dividerBox.width + PADDING;
      }
    });
  }

  /**
   * 重置位置，初始化及触发 chart  afterchangesize 回调时使用
   */
  public resetPosition() {
    // 当在第一层级未绘制面包屑，此时 changedata 触发 resetPosition 函数，需判断 this.breadCrumbGroup 是否存在
    if (!this.breadCrumbGroup) return;
    const view = this.context.view;
    const coord = view.getCoordinate();
    const point = coord.convert({ x: 0, y: 1 });
    const breadCrumbGroup = this.breadCrumbGroup;
    const bbox = breadCrumbGroup.getBBox();
    const matrix = Util.transform(null, [['t', point.x + PADDING_LEFT, point.y + bbox.height + PADDING_TOP]]);
    breadCrumbGroup.setMatrix(matrix);
  }

  /**
   * 隐藏面包屑
   */
  private hideCrumbGroup() {
    if (this.breadCrumbGroup) {
      this.breadCrumbGroup.hide();
    }
  }

  /**
   * 点击事件, 下钻数据，并绘制面包屑
   */
  public click() {
    const data = get(this.context, ['event', 'data', 'data']);
    if (!data) return false;
    this.drill(data);
    this.drawBreadCrumb();
  }

  /**
   * 回退事件，点击面包屑时触发
   * @param historyCache 当前要回退到的历史
   */
  public back(historyCache) {
    const { view } = this.context;
    if (!isArray(this.historyCache) || this.historyCache.length <= 0) {
      return;
    }
    this.historyCache = historyCache;
    const data = historyCache[historyCache.length - 1].children;
    view.changeData(data);
    if (historyCache.length > 1) {
      this.drawBreadCrumb();
    } else {
      this.hideCrumbGroup();
    }
  }

  /**
   * reset: 重置面包屑置初始状态，chart changeData 时使用
   */
  public reset() {
    this.historyCache = null;
    this.hideCrumbGroup();
  }

  /**
   * destroy: 销毁资源
   */
  public destroy() {
    if (this.breadCrumbGroup) {
      this.breadCrumbGroup.remove();
    }
    super.destroy();
  }
}
