import { Annotation } from '../../adaptor/annotation';
import { ConditionRangeY } from '../../adaptor/conditionRange';
import { PrimaryMark, AttachedMark } from '../../adaptor/mark';
import { syncScale } from '../../utils/scale';
import { flow } from '../../utils/flow';
import type { LineOptions } from './type';

export type { LineOptions };

const DEFAULT_POINT_OPTIONS = {
  encode: { shape: 'point' },
  style: { stroke: '#fff' },
};

const DEFAULT_AREA_OPTIONS = {
  style: { fillOpacity: 0.25 },
};

const DEFAULT_OPTIONS = {
  axis: { x: { title: false, size: 20 } },
};

export function Line(options: LineOptions) {
  const { annotations = [], conditionRangeY } = options;

  const O = syncScale(options);

  return () => {
    return flow(
      ConditionRangeY(conditionRangeY, O),
      AttachedMark({ type: 'area', defaults: DEFAULT_AREA_OPTIONS }, O),
      PrimaryMark({ type: 'line', defaults: DEFAULT_OPTIONS }, O),
      AttachedMark({ type: 'point', defaults: DEFAULT_POINT_OPTIONS }, O),
      ...annotations.map((d) => Annotation(d, O)),
    )([]);
  };
}

Line.props = { composite: true };
