import { View } from '@antv/g2';
import { groupBy } from '@antv/util';
import { Params } from '../../core/adaptor';
import { tooltip, interaction, animation, theme, scale } from '../../adaptor/common';
import { interval } from '../../adaptor/geometries';
import { flow, findViewById, findGeometry, transformLabel, deepAssign } from '../../utils';
import { BidirectionalBarOptions } from './types';
import { FIRST_AXES_VIEW, SECOND_AXES_VIEW } from './constant';
import { transformData } from './utils';

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
  if (layout === 'horizontal') {
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
  }

  // 纵向
  if (layout === 'vertical') {
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

  firstView.data(groupData[0]);
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

  secondView.data(groupData[1]);
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
  const { xAxis, yAxis, xField, yField } = options;

  const firstView = findViewById(chart, FIRST_AXES_VIEW);
  const secondView = findViewById(chart, SECOND_AXES_VIEW);
  // 第二个 view axis 始终隐藏
  secondView.axis(xField, false);

  // 为 false 则是不显示 firstView 轴
  if (xAxis === false) {
    firstView.axis(xField, false);
  } else {
    firstView.axis(xField, xAxis);
  }

  if (yAxis === false) {
    firstView.axis(yField[0], false);
    secondView.axis(yField[1], false);
  } else {
    firstView.axis(yField[0], yAxis[yField[0]]);
    secondView.axis(yField[1], yAxis[yField[1]]);
  }
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
  return flow(geometry, meta, axis, theme, label, tooltip, interaction, animation)(params);
}
