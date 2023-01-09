import { assignDeep, omit, subObject } from './helper';

function pushWhileEvery(array, item, predicate = (...args: any[]) => true) {
  if (array.every(predicate)) array.push(item);
}

function defineTransform(options) {
  const { transform = [], isStack, isGroup, isPercent } = options;
  const newTransform = [...transform];
  function push(predicate, type) {
    if (predicate) {
      pushWhileEvery(newTransform, { type }, (d) => d.type !== type);
    }
  }

  push(isStack, 'stackY');
  push(isGroup, 'dodgeX');
  push(isPercent, 'normalizeY');

  return newTransform;
}

function inferType(type: string) {
  return type;
}

export function defineMark(type, options, defaults = {}) {
  const { data, encode, style, scale = {}, animate } = options;

  return assignDeep({}, defaults, {
    type: inferType(type),
    data,
    encode: { ...omit(encode, ['shape']), ...subObject(encode, type) },
    transform: defineTransform(options),
    scale: assignDeep({}, scale, subObject(scale, type)),
    style: subObject(style, type),
    animate: subObject(animate, type),
    axis: {
      x: scale.x?.independent ? false : undefined,
      y: scale.y?.independent ? false : undefined,
    },
    slider: {
      x: scale.x?.independent ? false : undefined,
      y: scale.y?.independent ? false : undefined,
    },
    scrollbar: {
      x: scale.x?.independent ? false : undefined,
      y: scale.y?.independent ? false : undefined,
    },
    legend: {
      color: scale.color?.independent ? false : undefined,
      size: scale.size?.independent ? false : undefined,
      shape: scale.shape?.independent ? false : undefined,
    },
  });
}
