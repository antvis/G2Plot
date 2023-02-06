import { assignDeep, compact } from '../utils/helper';
import type { Adaptor } from '../types/common';

const COLOR_MAP = {
  success: '#b7eb8f',
  info: '#91caff',
  warning: '#ffe58f',
  error: '#ffccc7',
};

function valuesOf(encode: Record<string, any>, channel: string) {
  return encode[channel]?.value || [];
}

function column(value: any[], field?: string) {
  return { type: 'column', value, field };
}

export type ConditionRangeProps = {
  data: {
    value: number | number[] | Date | Date[];
    operator: 'gt' | 'lt' | 'in';
    type: 'success' | 'info' | 'warning' | 'error' | 'custom';
  }[];
  style?: Record<string, any>;
};

function TransformY(options: { thresholds: ConditionRangeProps['data'] }) {
  const { thresholds } = options;

  return (I, mark) => {
    const values = valuesOf(mark.encode, 'y');
    const min = Math.min(...values);
    const max = Math.max(...values);

    // Column data of y and y1 channel.
    const Y = thresholds.map(({ value, operator }) => {
      if (Array.isArray(value)) return value;
      if (operator === 'gt') return [value, max];

      return [min, value];
    });

    // Column data of color channel.
    const C = thresholds.map((d) => COLOR_MAP[d.type]);

    return [
      I,
      {
        ...mark,
        encode: {
          y: column(Y.map((d) => d[0])),
          y1: column(Y.map((d) => d[1])),
          color: column(C),
        },
      },
    ];
  };
}

export const ConditionRangeY: Adaptor<ConditionRangeProps | undefined> = (props, options) => {
  const { data: actualData, style } = props || {};
  const { data, encode, scale, isStack } = options;

  return (marks) => {
    if (!actualData?.length) return marks;

    const actualStyle = Object.fromEntries(
      Object.entries(style).map(([key, value]) => {
        if (typeof value === 'function') return [key, (_, idx) => value.call(null, actualData[idx], idx)];

        return [key, value];
      }),
    );

    const newMark = {
      type: 'rangeY',
      data,
      legend: false,
      axis: false,
      encode: { ...encode, tooltip: null, title: null },
      scale: assignDeep({}, scale, {
        y: { independent: true },
        color: { independent: true, type: 'identity' },
      }),
      style: {
        fillOpacity: 0.4,
        ...actualStyle,
      },
      transform: compact([isStack && { type: 'stackY' }, { type: TransformY, thresholds: actualData }]),
      // Disable animate by default.
      animate: false,
    };

    return [...marks, newMark];
  };
};
