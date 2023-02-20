import { syncScale } from '../../utils/scale';
import { flow } from '../../utils/flow';
import { PlotOptions } from './type';

export function Plot(options: PlotOptions) {
  const O = syncScale(options);

  return () => {
    return flow()([]);
  };
}

Plot.props = { composite: true };
