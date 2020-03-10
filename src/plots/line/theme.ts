import { IShape } from '../../dependents';
import { registerTheme } from '../../theme';

const LINE_ACTIVE_STYLE = ({ shape }: { shape: IShape }) => {
  const lineWidth = shape.attr('lineWidth') || 1;
  return { lineWidth: lineWidth + 1 };
};

const LINE_DISABLE_STYLE = ({ shape }: { shape: IShape }) => {
  const opacity = shape.attr('opacity') || 1;
  return { opacity: opacity * 0.2 };
};

const LINE_SELECTED_STYLE = ({ shape }: { shape: IShape }) => {
  const lineWidth = shape.attr('lineWidth') || 1;
  return { lineWidth: lineWidth + 2 };
};

registerTheme('line', {
  lineStyle: {
    normal: {},
    active: LINE_ACTIVE_STYLE,
    disable: LINE_DISABLE_STYLE,
    selected: LINE_SELECTED_STYLE,
  },
  pointStyle: {
    normal: {},
    active: {},
    disable: {},
    selected: {},
  },
});
