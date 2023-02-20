import { syncScale } from '../../utils/scale';
import { flow } from '../../utils/flow';
import { Annotation } from '../../adaptor/annotation';
import { ConditionRangeY } from '../../adaptor/conditionRange';
import { AttachedMark, PrimaryMark } from '../../adaptor/mark';
import type { ColumnOptions } from './type';

export type { ColumnOptions };

const DEFAULT_BACKGROUND_OPTIONS = {
  style: {
    fill: 'grey',
    fillOpacity: 0.15,
  },
};
const OVERRIDE_BACKGROUND_OPTIONS = {
  interactions: [{ type: 'tooltip' }],
  encode: { y: 1 },
  scale: { y: { independent: true, range: [0, 1] } },
  axis: { y: false },
};

const DEFAULT_OPTIONS = {
  axis: { x: { title: false, size: 20 } },
  legend: {
    color: {
      layout: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      },
    },
  },
};

export function Column(options: ColumnOptions) {
  const { annotations = [], conditionRangeY } = options;

  const O = syncScale(options);

  return () => {
    return flow(
      ConditionRangeY(conditionRangeY, O),
      AttachedMark({ type: 'background', defaults: DEFAULT_BACKGROUND_OPTIONS }, O, OVERRIDE_BACKGROUND_OPTIONS),
      PrimaryMark({ type: 'interval', defaults: DEFAULT_OPTIONS }, O),
      ...annotations.map((d) => Annotation(d, O)),
    )([]);
  };
}

Column.props = { composite: true };
