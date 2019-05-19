import { View } from '@antv/g2';
import * as _ from '@antv/util';

interface DataPointType {
  [ k: string ]: any;
}

const DEFAULT_PADDING = 20;

export default function getAutoPadding(view: View) {
  const width = view.get('width');
  const height = view.get('height');
    /** 获取auto padding需要的components: axis annotation legend*/
  const components_bbox = [];
  getAxis(view, components_bbox);
  getLegend(view, components_bbox);
  const box = mergeBBox(components_bbox, width, height);
  const padding = [
    0 - box.minY + DEFAULT_PADDING, // 上面超出的部分
    box.maxX - view.get('width') + DEFAULT_PADDING, // 右边超出的部分
    box.maxY - view.get('height') + DEFAULT_PADDING, // 下边超出的部分
    0 - box.minX + DEFAULT_PADDING,
  ];
  return padding;
}

function getAxis(view, bboxes) {
  const axes = view.get('axisController').axes;
  if (axes.length > 0) {
    _.each(axes, (a) => {
      const axis = a as DataPointType;
      const bbox = axis.get('group').getBBox();
      bboxes.push(bbox);
    });
  }
}

function getLegend(view, bboxes) {
  const legendGroup = view.get('legendController').container;
  const bbox = legendGroup.getBBox();
  bboxes.push(bbox);
}

function mergeBBox(bboxes, width, height) {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = - Infinity;
  _.each(bboxes, (bbox) => {
    const box = bbox as DataPointType;
    minX = Math.min(box.minX, minX);
    maxX = Math.max(box.maxX, maxX);
    minY = Math.min(box.minY, minY);
    maxY = Math.max(box.maxY, maxY);
  });
  if (Math.abs(minX) > width / 2) minX = 0;
  if (Math.abs(maxX) < width / 2) maxX = width;
  if (Math.abs(minY) > height / 2) minY = 0;
  if (Math.abs(maxY) < height / 2) maxY = height;
  return { minX, maxX, minY, maxY };
}
