import { each, contains, isArray, indexOf, isNil } from '@antv/util';
import { getShapeFactory } from '@antv/g2';

const TYPE_SHOW_MARKERS = ['line', 'area', 'path', 'areaStack'];

export function showTooltip(canvas, layers) {
  const tooltipItems = [];
  canvas.on('mousemove', (ev) => {
    const point = { x: ev.x / 2, y: ev.y / 2 };
    each(layers, (layer) => {
      const { view } = layer;
      if (view) {
        const coord = view.get('coord');
        const geoms = view.get('elements');
        each(geoms, (geom) => {
          const type = geom.get('type');
          const dataArray = geom.get('dataArray');
          if (contains(['area', 'line', 'path'], type)) {
            getTooltipItems(point, geom, type, dataArray, coord);
          }
        });
      }
    });
  });
}

function getTooltipItems(point, geom, type, dataArray, coord) {
  const items = [];
  each(dataArray, (data) => {
    const tmpPoint = geom.findPoint(point, data);
    if (tmpPoint) {
      const subItems = geom.getTooltipItems(tmpPoint, null);
      each(subItems, (v) => {
        // tslint:disable-next-line: no-shadowed-variable
        let point = v.point;
        if (!isNil(point) && !isNil(point.x) && !isNil(point.y)) {
          const x = isArray(point.x) ? point.x[point.x.length - 1] : point.x;
          const y = isArray(point.y) ? point.y[point.y.length - 1] : point.y;
          point = coord.applyMatrix(x, y, 1);
          v.x = point[0];
          v.y = point[1];
          v.showMarker = true;
          const itemMarker = getItemMarker(geom, v.color);
          v.marker = itemMarker;
          if (indexOf(TYPE_SHOW_MARKERS, type) !== -1) {
            items.push(v);
          }
        }
      });
      items = items.concat(subItems);
    }
  });
  console.log(items);
  return items;
}

function getItemMarker(geom, color) {
  const shapeType = geom.get('shapeType') || 'point';
  const shape = geom.getDefaultValue('shape') || 'circle';
  const shapeObject = getShapeFactory(shapeType);
  const cfg = { color };
  const marker = shapeObject.getMarkerStyle(shape, cfg);
  return marker;
}
