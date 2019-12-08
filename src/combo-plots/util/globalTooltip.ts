import { each, contains, isArray, indexOf, isNil, deepMix } from '@antv/util';
import { Tooltip } from '@antv/component';
import { getShapeFactory } from '@antv/g2';
import { getGlobalTheme } from '../../theme/global';
import { Group } from '@antv/g';

const TYPE_SHOW_MARKERS = ['line', 'area', 'path', 'areaStack'];

export function showTooltip(canvas, layers) {
  const tooltip = renderTooltip(layers[0], canvas);

  canvas.on('mousemove', (ev) => {
    const tooltipItems = [];
    const point = { x: ev.x / 2, y: ev.y / 2 };
    each(layers, (layer) => {
      const { view } = layer;
      if (view) {
        const coord = view.get('coord');
        const geoms = view.get('elements');
        each(geoms, (geom) => {
          const type = geom.get('type');
          const dataArray = geom.get('dataArray');
          if (contains(['area', 'line', 'path', 'interval'], type)) {
            const items = getTooltipItems(point, geom, type, dataArray, coord);
            tooltipItems.push(...items);
          }
        });
      }
    });
    tooltip.setContent('', tooltipItems);
    tooltip.setPosition(point.x, point.y, ev.target);
    tooltip.show();
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
      items.push(...subItems);
    }
  });
  return items;
}

function renderTooltip(layer, canvas) {
  const tooltipTheme = getGlobalTheme().tooltip;
  const options = {
    panelGroup: new Group(),
    panelRange: layer.view.get('panelRange'),
    capture: false,
    canvas,
    frontgroundGroup: new Group(),
    theme: tooltipTheme,
    backgroundGroup: null,
  };

  return new Tooltip.Html(options);
}

function getItemMarker(geom, color) {
  const shapeType = geom.get('shapeType') || 'point';
  const shape = geom.getDefaultValue('shape') || 'circle';
  const shapeObject = getShapeFactory(shapeType);
  const cfg = { color };
  const marker = shapeObject.getMarkerStyle(shape, cfg);
  return marker;
}
