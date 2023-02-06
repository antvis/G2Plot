import type { Adaptor, Options } from '../types/common';
import { assignDeep, omit, subObject, pick } from '../utils/helper';

function pushWhileEvery(array, item, predicate = (...args: any[]) => true) {
  if (array.every(predicate)) array.push(item);
}

function defineTransform(options: Options) {
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

const REQUIRED_OPTIONS = [
  'data',
  'encode',
  'scale',
  'axis',
  'legend',
  'slider',
  'scrollbar',
  'labels',
  'animate',
  'style',
  'component',
];

type Props = {
  type: string;
  defaults: any;
};

/**
 * Primary mark of each plot, required.
 */
export const PrimaryMark: Adaptor<Props> = (props, options) => {
  const { type, defaults } = props;
  const { encode, animate, ...rest } = pick(options, REQUIRED_OPTIONS);

  return (marks) => {
    const newMark = assignDeep({}, defaults, {
      type: inferType(type),
      encode: { ...encode, ...subObject(encode, type) },
      transform: defineTransform(options),
      ...rest,
    });
    return [...marks, newMark];
  };
};

/**
 * Attached mark of each plot, optional.
 */
export const AttachedMark: Adaptor<Props> = (props, options) => {
  const { type, defaults } = props;
  const { style: { [type]: enabled } = {} } = options;

  return (marks) => {
    if (!enabled) return marks;

    const { data, encode, style, scale = {}, animate } = options;
    const newMark = assignDeep({}, defaults, {
      type: inferType(type),
      data,
      encode: {
        ...omit(encode, ['shape']),
        ...subObject(encode, type),
        tooltip: null,
        title: null,
      },
      transform: defineTransform(options),
      scale: assignDeep({ ...scale }, subObject(scale, type)),
      style: subObject(style, type),
      animate: subObject(animate, type),
    });
    return [...marks, newMark];
  };
};
