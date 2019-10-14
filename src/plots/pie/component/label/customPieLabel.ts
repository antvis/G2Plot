import { Shape } from '@antv/g';
import { ElementLabels, registerElementLabels } from '@antv/g2';
import _cloneDeep from '@antv/util/lib/clone';
import _each from '@antv/util/lib/each';

const ANCHOR_OFFSET = 5; // 锚点偏移量
const INFLECTION_OFFSET = 15; // 拐点偏移量
const DEFAULT_COLOR = '#CCC';
const LABEL1_OFFSETY = 1;
const LABEL2_OFFSETY = -1;
const ADJUSTOFFSET = 15;

interface LabelPoint {
  labelHeight: number;
  offset: number;
  labelLine?: {
    lineWidth: number;
    [k: string]: number | string;
  };
  [k: string]: any;
}

class CustomPieElementLabels extends ElementLabels {
  public showLabels(points: any, shapes: Shape[]) {
    console.info('pie:custom-pie');
    super.showLabels(points, shapes);
    const renderer = this.get('labelsRenderer');
    const labels: Shape[] = renderer.get('group').get('children');
    console.info('pie:showLabels:labels', labels);
  }
  // 绘制连接线
  public drawLines(items: LabelPoint): void {}
  // 定义连接线
  public lineToLabel(point: LabelPoint) {}
}

registerElementLabels('custom-pie', CustomPieElementLabels);
