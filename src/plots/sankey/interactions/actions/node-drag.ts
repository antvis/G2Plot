import { Action, Element } from '@antv/g2';
import { get } from '@antv/util';
import { Datum, Point } from '../../../../types';
import { findViewById } from '../../../../utils';
import { EDGES_VIEW_ID, NODES_VIEW_ID } from '../../constant';

export class SankeyNodeDragAction extends Action {
  /**
   * 是否在拖拽中的标记
   */
  private isDragging = false;

  /**
   * 鼠标上一次的位置的坐标点
   */
  private prevPoint: Point;
  /**
   * 之前的节点动画配置
   */
  private prevNodeAnimateCfg: any;
  /**
   * 之前的边动画配置
   */
  private prevEdgeAnimateCfg: any;
  /**
   * 当前拖拽的 element 索引
   */
  private currentElementIdx: number;

  /**
   * 当前操作的是否是 element
   */
  private isNodeElement() {
    const shape = get(this.context, 'event.target');
    if (shape) {
      const element = shape.get('element');
      return element && element.getModel().data.isNode;
    }
    return false;
  }

  private getNodeView() {
    return findViewById(this.context.view, NODES_VIEW_ID);
  }

  private getEdgeView() {
    return findViewById(this.context.view, EDGES_VIEW_ID);
  }

  /**
   * 获取当前操作的 index
   * @param element
   */
  private getCurrentDatumIdx(element: Element) {
    return this.getNodeView().geometries[0].elements.indexOf(element);
  }

  /**
   * 点击下去，开始
   */
  public start() {
    // 记录开始了的状态
    if (this.isNodeElement()) {
      this.prevPoint = {
        x: get(this.context, 'event.x'),
        y: get(this.context, 'event.y'),
      };

      const element = this.context.event.target.get('element');
      const idx = this.getCurrentDatumIdx(element);

      if (idx === -1) {
        return;
      }

      this.currentElementIdx = idx;
      this.context.isDragging = true;
      this.isDragging = true;

      // 关闭动画并暂存配置
      this.prevNodeAnimateCfg = this.getNodeView().getOptions().animate;
      this.prevEdgeAnimateCfg = this.getEdgeView().getOptions().animate;
      this.getNodeView().animate(false);
      this.getEdgeView().animate(false);
    }
  }

  /**
   * 移动过程中，平移
   */
  public translate() {
    if (this.isDragging) {
      const chart = this.context.view;

      const currentPoint = {
        x: get(this.context, 'event.x'),
        y: get(this.context, 'event.y'),
      };

      const x = currentPoint.x - this.prevPoint.x;
      const y = currentPoint.y - this.prevPoint.y;

      const nodeView = this.getNodeView();
      const element = nodeView.geometries[0].elements[this.currentElementIdx];

      // 修改数据
      if (element && element.getModel()) {
        const prevDatum: Datum = element.getModel().data;
        const data = nodeView.getOptions().data;
        const coordinate = nodeView.getCoordinate();

        const datumGap = {
          x: x / coordinate.getWidth(),
          y: y / coordinate.getHeight(),
        };

        const nextDatum = {
          ...prevDatum,
          x: prevDatum.x.map((x: number) => (x += datumGap.x)),
          y: prevDatum.y.map((y: number) => (y += datumGap.y)),
        };
        // 处理一下在 [0, 1] 范围

        // 1. 更新 node 数据
        const newData = [...data];
        newData[this.currentElementIdx] = nextDatum;
        nodeView.data(newData);

        // 2. 更新 edge 数据
        const name = prevDatum.name;
        const edgeView = this.getEdgeView();
        const edgeData = edgeView.getOptions().data;

        edgeData.forEach((datum) => {
          // 2.1 以该 node 为 source 的边，修改 [x0, x1, x2, x3] 中的 x0, x1
          if (datum.source === name) {
            datum.x[0] += datumGap.x;
            datum.x[1] += datumGap.x;
            datum.y[0] += datumGap.y;
            datum.y[1] += datumGap.y;
          }

          // 2.2 以该 node 为 target 的边，修改 [x0, x1, x2, x3] 中的 x2, x3
          if (datum.target === name) {
            datum.x[2] += datumGap.x;
            datum.x[3] += datumGap.x;
            datum.y[2] += datumGap.y;
            datum.y[3] += datumGap.y;
          }
        });
        edgeView.data(edgeData);

        // 3. 更新最新位置
        this.prevPoint = currentPoint;

        // node edge 都改变了，所以要从底层 render
        chart.render(true);
      }
    }
  }

  /**
   * 结论，清除状态
   */
  public end() {
    this.isDragging = false;
    this.context.isDragging = false;
    this.prevPoint = null;
    this.currentElementIdx = null;

    // 还原动画
    this.getNodeView().animate(this.prevNodeAnimateCfg);
    this.getEdgeView().animate(this.prevEdgeAnimateCfg);
  }
}
