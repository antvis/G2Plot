import { Axis } from '@antv/component';
import BBox from '../../util/bbox';
import { getScale } from '@antv/scale';
import * as _ from '@antv/util';
import ViewLayer from '../../base/view-layer';
import { convertToG2Theme, getGlobalTheme } from '../../theme';
import { isSingleGraph } from './adjustColorConfig';
import { getOverlappingPadding } from './padding';
import { getComponent } from '../../components/factory';
import { translate } from '../../util/g-util';

const AXIS_GAP = 4;

export function getAxisData(viewLayer: ViewLayer, props, globalOptions) {
  const { view } = viewLayer;
  const scales = view.geometries[0].scales;
  const scalesInfo = [];
  const singleGraph = isSingleGraph(viewLayer.type, props);
  // get xscale info
  if (props.xField) {
    const xscale = scales[props.xField];
    const scaleInfo = {
      dim: 'x',
      scale: xscale,
      originalData: props.data,
    };
    scalesInfo.push(scaleInfo);
  }
  // get yscale info
  if (props.yField) {
    const yscale = scales[props.yField];
    const scaleInfo = {
      dim: 'y',
      scale: yscale,
      originalData: props.data,
      color: singleGraph && globalOptions.yAxis.colorMapping ? props.color : null,
      layer: viewLayer,
    };
    scalesInfo.push(scaleInfo);
  }
  return scalesInfo;
}

export function mergeAxisScale(axisInfo, dim, axisOptions?) {
  if (dim === 'x') {
    const xAxisInfo = axisInfo.filter((axis) => {
      if (axis.dim === 'x') {
        return axis;
      }
    });
    return mergeXAxis(xAxisInfo);
  } else {
    const yAxisInfo = axisInfo.filter((axis) => {
      if (axis.dim === 'y') {
        return axis;
      }
    });
    return mergeYAxis(yAxisInfo, axisOptions.synchroTick);
  }
}

function mergeXAxis(axisInfo) {
  // 判断是否能够合并度量
  const isSameScale = sameScaleTest(axisInfo);
  if (!isSameScale) {
    return [axisInfo[0].scale];
  }
  if (axisInfo[0].scale.type === 'cat') {
    return getCatScale(axisInfo);
  } else {
    return getLinearScale(axisInfo, 5);
  }
}

function mergeYAxis(axisInfo, synchroTick: boolean) {
  const isSameScale = sameScaleTest(axisInfo);
  // 默认全部采用左轴的tickCount，具体标度对齐逻辑留待以后优化
  const tickCount = axisInfo[0].scale.tickCount;
  const LinearScale = getScale('linear');
  if (!isSameScale) {
    return axisInfo.map((axis) => {
      const scale = axis.scale;
      const values = calValues(scale, tickCount);
      if (synchroTick) {
        const linearScale: any = new LinearScale({
          min: scale.min,
          max: scale.max,
          ticks: values,
          tickCount,
          color: axis.color,
        } as any);
        linearScale.layer = axis.layer;
        return linearScale;
      } else {
        scale.layer = axis.layer;
        scale.color = axis.color;
        return scale;
      }
    });
  } else {
    return getLinearScale(axisInfo, tickCount);
  }
}

function getLinearScale(axisInfo, tickCount) {
  let scaleMin = axisInfo[0].scale.min;
  let scaleMax = axisInfo[0].scale.max;
  for (const axis of axisInfo) {
    scaleMin = Math.min(scaleMin, axis.scale.min);
    scaleMax = Math.max(scaleMax, axis.scale.max);
  }
  const LinearScale = getScale('linear');
  const scale = new LinearScale({
    min: scaleMin,
    max: scaleMax,
    tickCount,
  });

  return scale;
}

function getCatScale(axisInfo) {
  const scaleValues = [];
  for (const axis of axisInfo) {
    scaleValues.push(...axis.scale.values);
  }
  // todo: time cat 重新排序
  const CatScale = getScale('cat');
  const scale = new CatScale({
    values: _.uniq(scaleValues),
  });

  return scale;
}

function sameScaleTest(axisInfo) {
  const sampleDataSource = axisInfo[0].originalData;
  const sampleField = axisInfo[0].scale.field;
  for (const axis of axisInfo) {
    const data = axis.originalData;
    const field = axis.scale.field;
    // 判断数据源和scale字段
    if (data !== sampleDataSource || field !== sampleField) {
      return false;
    }
  }
  return true;
}

export function createAxis(scale, dim, canvas, cfg, globalOptions) {
  const theme = getTheme(globalOptions);
  const isVertical = dim === 'x' ? false : true;
  let group;
  if (scale.layer) {
    group = scale.layer.container.addGroup();
  } else {
    group = canvas.addGroup();
  }
  const ticks = getAxisTicks(scale, dim);
  const parser = getComponent('axis', {
    dim,
    plot: {
      options: globalOptions,
      getPlotTheme: () => {
        return getGlobalTheme();
      },
    } as any,
  });
  let defaultStyle = theme.axis && theme.axis[dim] ? toAxisStyle(theme.axis[dim]) : {};
  if (scale.color) {
    defaultStyle = adjustColorStyle(scale.color, parser);
  }

  const axisConfig = _.deepMix(
    {},
    parser,
    {
      type: 'line',
      group,
      canvas,
      start: cfg.start,
      end: cfg.end,
      isVertical,
      verticalFactor: cfg.factor,
      ticks,
      title: {
        text: '',
      },
      label(text) {
        return {
          text,
          textStyle: parser.label.textStyle,
        };
      },
    },
    defaultStyle
  );
  const axis: any = new Axis.Line(axisConfig as any);
  axis.layer = scale.layer;
  axis.render();
  return axis;
}

function getAxisTicks(scale, dim) {
  const tickValues = [];
  const { ticks, range } = scale;
  const step = (range[1] - range[0]) / (ticks.length - 1);
  _.each(ticks, (tick, index) => {
    const value = dim === 'y' ? 1.0 - (range[0] + step * index) : range[0] + step * index;
    tickValues.push({ name: tick, value });
  });

  return tickValues;
}

function calValues(scale, tickCount) {
  const values = [];
  const { min, max } = scale;
  const step = (max - min) / tickCount;
  for (let i = 0; i < tickCount; i++) {
    const value = min + step * i;
    values.push(value);
  }
  return values;
}

export function axesLayout(globalOptions, axisInfo, padding, layer, width, height, canvas) {
  const { bleeding } = getGlobalTheme();
  // merge padding and bleeding by zero value
  _.each(padding, (p, index) => {
    if (p === 0) {
      padding[index] = bleeding[index];
    }
  });
  const paddingComponents = [];
  // 创建axis
  const axes = [];
  let xAxisScale;
  let xAxis;
  let xAxisHeight = 0;
  if (globalOptions.xAxis.visible) {
    xAxisScale = mergeAxisScale(axisInfo, 'x');
    xAxis = createAxis(
      xAxisScale[0],
      'x',
      canvas,
      {
        start: { x: 0, y: 0 },
        end: { x: width, y: 0 },
        factor: -1,
      },
      globalOptions
    );
    xAxisHeight += xAxis.get('group').getBBox().height;
  }

  if (globalOptions.yAxis.visible) {
    const yAxisScale = mergeAxisScale(axisInfo, 'y', globalOptions.yAxis);
    _.each(yAxisScale, (scale, index) => {
      const factor = index === 0 ? -1 : 1;
      const axis = createAxis(
        scale,
        'y',
        canvas,
        {
          start: { x: 0, y: padding[0] },
          end: { x: 0, y: height - xAxisHeight - padding[2] },
          factor,
        },
        globalOptions
      );
      if (index === 0) {
        translate(axis.get('group'), padding[3], 0);
      }
      axes.push(axis);
    });

    axisLayout(axes, paddingComponents, width, padding);
  }

  if (globalOptions.xAxis.visible) {
    const axisPadding = getOverlappingPadding(layer, paddingComponents);
    const ypos = axes.length === 0 ? height - xAxisHeight - padding[2] : axes[0].get('group').getBBox().maxY;
    xAxis.destroy();
    xAxis = createAxis(
      xAxisScale[0],
      'x',
      canvas,
      {
        start: { x: axisPadding[3], y: ypos },
        end: { x: width - axisPadding[1], y: ypos },
        factor: -1,
      },
      globalOptions
    );
    paddingComponents.push({
      position: 'bottom',
      component: xAxis,
      getBBox: () => {
        const container = xAxis.get('group');
        const bbox = container.getBBox();
        return new BBox(bbox.minX, bbox.minY, bbox.width, bbox.height);
      },
    });
  }

  return paddingComponents;
}

function axisLayout(axes, paddingComponents, width, padding) {
  // 先处理最左边的
  const leftAxis = axes[0];
  const leftContainer = leftAxis.get('group');
  const leftBbox = leftContainer.getBBox();
  translate(leftContainer, leftBbox.width, 0);
  paddingComponents.push({
    position: 'left',
    component: leftAxis,
    getBBox: () => {
      const matrix = leftContainer.attr('matrix');
      return new BBox(leftBbox.minX + matrix[6], leftBbox.minY, leftBbox.width, leftBbox.height);
    },
  });
  let temp_width = padding[1];
  // 处理右边的
  for (let i = axes.length - 1; i > 0; i--) {
    const axis = axes[i];
    const container = axis.get('group');
    const bbox = container.getBBox();
    translate(container, width - temp_width - bbox.width, 0);
    temp_width += bbox.width + AXIS_GAP;
    const component = {
      position: 'right',
      component: axis,
      getBBox: () => {
        const matrix = container.attr('matrix');
        return new BBox(bbox.minX + matrix[6], bbox.minY, bbox.width, bbox.height);
      },
    };
    paddingComponents.push(component);
  }
}

function adjustColorStyle(color, options) {
  return {
    line: options.line
      ? {
          stroke: color,
          lineWidth: 1,
        }
      : null,
    tickLine: options.tickLine
      ? {
          stroke: color,
          lineWidth: 1,
          length: 5,
        }
      : null,
    label: options.label
      ? {
          textStyle: {
            fill: color,
          },
        }
      : null,
  };
}

export function drawYGrid(axis, coord, container, globalOptions) {
  const theme = getTheme(globalOptions);
  const gridCfg = globalOptions.yAxis.grid;
  const defaultStyle = theme.axis.y.grid.style;
  const style = _.deepMix({}, defaultStyle, gridCfg.style);
  const gridGroup = container.addGroup();
  const labelItems = axis.get('labelItems');
  _.each(labelItems, (item, index) => {
    if (index > 0) {
      gridGroup.addShape('path', {
        attrs: {
          path: [
            ['M', coord.start.x, item.point.y],
            ['L', coord.end.x, item.point.y],
          ],
          ...style,
        },
      });
    }
  });
}

function toAxisStyle(theme) {
  const style = {};
  _.each(theme, (t, key) => {
    if (_.hasKey(t, 'style')) {
      style[key] = t.style;
    }
  });
  return style;
}

function getTheme(options) {
  let theme = getGlobalTheme();
  if (options.theme) {
    if (_.isString(options.theme)) {
      theme = getGlobalTheme(options.theme);
    } else if (_.isObject(options.theme)) {
      theme = options.theme;
    }
  }
  return theme;
}
