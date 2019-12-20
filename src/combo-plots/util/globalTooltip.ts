import { each, contains, isArray, isObject, indexOf, isNil, has, keys } from '@antv/util';
import { Tooltip } from '@antv/component';
import { getShapeFactory } from '@antv/g2';
import { getGlobalTheme } from '../../theme/global';

const TYPE_SHOW_MARKERS = ['line', 'area', 'path', 'areaStack'];

export function showTooltip(canvas, layers, tooltipCfg) {
  const tooltip = renderTooltip(layers[0], canvas);

  canvas.on('mousemove', (ev) => {
    const tooltipItems = [];
    const point = { x: ev.x / 2, y: ev.y / 2 };
    each(layers, (layer) => {
      const { view } = layer;
      if (view && layer.visibility) {
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
    adjustItems(tooltipItems, ev.target, tooltipCfg);
    if (tooltipItems.length > 0) {
      tooltip.setContent('', getUniqueItems(tooltipItems));
      tooltip.setPosition(point.x, point.y, ev.target);
      tooltip.show();
    } else if (tooltip.get('visible')) {
      tooltip.hide();
    }
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
          itemMarker.radius = 40;
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
    panelGroup: layer.view.get('panelGroup'),
    panelRange: layer.view.get('panelRange'),
    capture: false,
    canvas,
    frontgroundGroup: layer.view.get('frontgroundGroup'),
    theme: tooltipTheme,
    backgroundGroup: layer.view.get('backgroundGroup'),
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

function getUniqueItems(items) {
  const tmp = [];
  each(items, (item) => {
    const index = indexOfArray(tmp, item);
    if (index === -1) {
      tmp.push(item);
    }
  });
  return tmp;
}

function indexOfArray(items, item) {
  let rst = -1;
  each(items, (sub, index: number) => {
    let isEqual = true;
    for (const key in item) {
      if (has(item, key)) {
        if (!isObject(item[key]) && item[key] !== sub[key]) {
          isEqual = false;
          break;
        }
      }
    }
    if (isEqual) {
      rst = index;
      return false;
    }
  });
  return rst;
}

function adjustItems(items, target, cfg) {
  if (target.get('origin')) {
    let data;
    if (isArray(target.get('origin'))) {
      data = getDataByTitle(items[0].title, target.get('origin')).data;
    } else {
      data = target.get('origin')._origin;
    }
    each(items, (item) => {
      if (item.point._origin !== data) {
        item.color = '#ccc';
      }
    });
  }
  if (cfg.sort) {
    items.sort((a, b) => {
      return parseFloat(b.value) - parseFloat(a.value);
    });
  }
}

function getDataByTitle(title, data) {
  for (const i in data) {
    const d = data[i]._origin;
    const ks = keys(d);
    for (const j in ks) {
      const key = ks[j];
      if (d[key] === title) {
        return { data: d, key };
      }
    }
  }
}
