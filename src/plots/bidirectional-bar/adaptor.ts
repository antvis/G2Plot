import { View } from '@antv/g2';
import { get, groupBy } from '@antv/util';
import { Params } from '../../core/adaptor';
import {
  tooltip,
  interaction as commonInteraction,
  animation as commonAnimation,
  theme as commonTheme,
  limitInPlot as commonLimitInPlot,
  scale,
} from '../../adaptor/common';
import { interval } from '../../adaptor/geometries';
import { flow, findViewById, findGeometry, transformLabel, deepAssign } from '../../utils';
import { BidirectionalBarOptions } from './types';
import { FIRST_AXES_VIEW, SECOND_AXES_VIEW } from './constant';
import { isHorizontal, transformData } from './utils';

/**
 * geometry 处理
 * @param params
 */
function geometry(params: Params<BidirectionalBarOptions>): Params<BidirectionalBarOptions> {
  const { chart, options } = params;
  const { data, xField, yField, color, barStyle, widthRatio, legend, layout } = options;

  // 处理数据
  const ds = transformData(xField, yField, data);
  // 再次处理数据，通过 type 字段分成左右数据
  const groupData: any[] = Object.values(groupBy(ds, 'type'));
  chart.scale({
    type: {
      sync: true,
    },
  });
  // 在创建子 view 执行后不行，需要在前面处理 legend
  if (legend) {
    chart.legend('type', legend);
  } else if (legend === false) {
    chart.legend(false);
  }
  // 创建 view
  let firstView: View;
  let secondView: View;

  // 横向
  if (isHorizontal(layout)) {
    firstView = chart.createView({
      region: {
        start: { x: 0, y: 0 },
        end: { x: 0.5, y: 1 },
      },
      id: FIRST_AXES_VIEW,
    });

    firstView.coordinate().transpose().reflect('x');

    secondView = chart.createView({
      region: {
        start: { x: 0.5, y: 0 },
        end: { x: 1, y: 1 },
      },
      id: SECOND_AXES_VIEW,
    });
    secondView.coordinate().transpose();
  } else {
    // 纵向
    firstView = chart.createView({
      region: {
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0.5 },
      },
      id: FIRST_AXES_VIEW,
    });
    secondView = chart.createView({
      region: {
        start: { x: 0, y: 0.5 },
        end: { x: 1, y: 1 },
      },
      id: SECOND_AXES_VIEW,
    });
    secondView
      .coordinate()
      .reflect('y')
      .rotate(Math.PI * 0); // 旋转
  }

  firstView.data(get(groupData, [0], []));
  const left = deepAssign({}, params, {
    chart: firstView,
    options: {
      widthRatio,
      xField,
      yField: yField[0],
      seriesField: 'type',
      interval: {
        color,
        style: barStyle,
      },
    },
  });
  interval(left);

  secondView.data(get(groupData, [1], []));
  const right = deepAssign({}, params, {
    chart: secondView,
    options: {
      xField,
      yField: yField[1],
      seriesField: 'type',
      widthRatio,
      interval: {
        color,
        style: barStyle,
      },
    },
  });

  interval(right);
  return params;
}

/**
 * meta 配置
 * @param params
 */
function meta(params: Params<BidirectionalBarOptions>): Params<BidirectionalBarOptions> {
  const { options, chart } = params;
  const { xAxis, yAxis, xField, yField } = options;
  const firstView = findViewById(chart, FIRST_AXES_VIEW);
  const secondView = findViewById(chart, SECOND_AXES_VIEW);
  scale({
    [xField]: xAxis,
    [yField[0]]: yAxis[yField[0]],
  })(deepAssign({}, params, { chart: firstView }));

  scale({
    [xField]: xAxis,
    [yField[1]]: yAxis[yField[1]],
  })(deepAssign({}, params, { chart: secondView }));

  return params;
}

/**
 * axis 配置
 * @param params
 */
function axis(params: Params<BidirectionalBarOptions>): Params<BidirectionalBarOptions> {
  const { chart, options } = params;
  const { xAxis, yAxis, xField, yField, layout } = options;

  const firstView = findViewById(chart, FIRST_AXES_VIEW);
  const secondView = findViewById(chart, SECOND_AXES_VIEW);
  // 第二个 view axis 始终隐藏
  secondView.axis(xField, false);

  // 为 false 则是不显示 firstView 轴
  if (xAxis === false) {
    firstView.axis(xField, false);
  } else {
    firstView.axis(xField, {
      // 不同布局 firstView 的坐标轴显示位置
      position: isHorizontal(layout) ? 'top' : 'bottom',
      ...xAxis,
    });
  }

  if (yAxis === false) {
    firstView.axis(yField[0], false);
    secondView.axis(yField[1], false);
  } else {
    firstView.axis(yField[0], yAxis[yField[0]]);
    secondView.axis(yField[1], yAxis[yField[1]]);
  }
  /**
   *  这个注入，主要是在syncViewPadding时候拿到相对应的配置：布局和轴的位置
   *  TODO 之后希望 g2 View 对象可以开放 setter 可以设置一些需要的东西
   */

  //@ts-ignore
  chart.__axisPosition = {
    position: firstView.getOptions().axes[xField].position,
    layout,
  };
  return params;
}

/**
 * interaction 配置
 * @param params
 */
export function interaction(params: Params<BidirectionalBarOptions>): Params<BidirectionalBarOptions> {
  const { chart } = params;

  commonInteraction(deepAssign({}, params, { chart: findViewById(chart, FIRST_AXES_VIEW) }));
  commonInteraction(deepAssign({}, params, { chart: findViewById(chart, SECOND_AXES_VIEW) }));

  return params;
}

/**
 * limitInPlot
 * @param params
 */
export function limitInPlot(params: Params<BidirectionalBarOptions>): Params<BidirectionalBarOptions> {
  const { chart, options } = params;
  const { yField, yAxis } = options;

  commonLimitInPlot(
    deepAssign({}, params, {
      chart: findViewById(chart, FIRST_AXES_VIEW),
      options: {
        yAxis: yAxis[yField[0]],
      },
    })
  );

  commonLimitInPlot(
    deepAssign({}, params, {
      chart: findViewById(chart, SECOND_AXES_VIEW),
      options: {
        yAxis: yAxis[yField[1]],
      },
    })
  );

  return params;
}

/**
 * theme
 * @param params
 */
export function theme(params: Params<BidirectionalBarOptions>): Params<BidirectionalBarOptions> {
  const { chart } = params;

  commonTheme(deepAssign({}, params, { chart: findViewById(chart, FIRST_AXES_VIEW) }));
  commonTheme(deepAssign({}, params, { chart: findViewById(chart, SECOND_AXES_VIEW) }));

  return params;
}

/**
 * animation
 * @param params
 */
export function animation(params: Params<BidirectionalBarOptions>): Params<BidirectionalBarOptions> {
  const { chart } = params;

  commonAnimation(deepAssign({}, params, { chart: findViewById(chart, FIRST_AXES_VIEW) }));
  commonAnimation(deepAssign({}, params, { chart: findViewById(chart, SECOND_AXES_VIEW) }));

  return params;
}

/**
 * label 配置
 * @param params
 */
function label(params: Params<BidirectionalBarOptions>): Params<BidirectionalBarOptions> {
  const { chart, options } = params;
  const { label, yField } = options;

  const firstView = findViewById(chart, FIRST_AXES_VIEW);
  const secondView = findViewById(chart, SECOND_AXES_VIEW);
  const leftGeometry = findGeometry(firstView, 'interval');
  const rightGeometry = findGeometry(secondView, 'interval');

  if (!label) {
    leftGeometry.label(false);
    rightGeometry.label(false);
  } else {
    const { callback, ...cfg } = label;
    leftGeometry.label({
      fields: [yField[0]],
      callback,
      cfg: transformLabel(cfg),
    });
    rightGeometry.label({
      fields: [yField[1]],
      callback,
      cfg: transformLabel(cfg),
    });
  }

  return params;
}

/**
 * 对称条形图适配器
 * @param chart
 * @param options
 */
export function adaptor(params: Params<BidirectionalBarOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(geometry, meta, axis, limitInPlot, theme, label, tooltip, interaction, animation)(params);
}
