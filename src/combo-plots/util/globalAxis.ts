import { Axis } from '@antv/component';
import { BBox } from '@antv/g';
import { getScale, Scale } from '@antv/scale';
import * as _ from '@antv/util';
import ViewLayer from '../../base/view-layer';
import { getGlobalTheme } from '../../theme/global';
import { isSingleGraph } from './adjustColorConfig';
import { getOverlappingPadding } from './padding';


const AXIS_GAP = 4;

export function getAxisData(viewLayer: ViewLayer, props) {
    const { view } = viewLayer;
    const scales = view.get('scales');
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
            color: singleGraph ? props.color : null
        };
        scalesInfo.push(scaleInfo);
    }
    return scalesInfo;
}

export function mergeAxisScale(axisInfo, dim) {
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
        return mergeYAxis(yAxisInfo);
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

function mergeYAxis(axisInfo) {
    const isSameScale = sameScaleTest(axisInfo);
    // 默认全部采用左轴的tickCount，具体标度对齐逻辑留待以后优化
    const tickCount = axisInfo[0].scale.tickCount;
    const LinearScale = getScale('linear');
    if (!isSameScale) {
        return axisInfo.map((axis) => {
            const scale = axis.scale;
            const values = calValues(scale, tickCount);
            return new LinearScale({
                min: scale.min,
                max: scale.max,
                ticks: values,
                tickCount,
                color: axis.color
            } as any);
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
        tickCount
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
        values: _.uniq(scaleValues)
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

export function createAxis(scale, dim, canvas, cfg) {
    const isVertical = dim === 'x' ? false : true;
    const group = canvas.addGroup();
    const ticks = getAxisTicks(scale, dim);
    let defaultStyle = {};
    if (scale.color) {
        defaultStyle = adjustColorStyle(scale.color);
    }
    const axisConfig = _.deepMix({},{
        type: 'line',
        group,
        canvas,
        start: cfg.start,
        end: cfg.end,
        isVertical,
        factor: cfg.factor,
        ticks,
        label(text) {
            return {
                text
            };
        },
    }, defaultStyle);
    const axis = new Axis.Line(axisConfig as any);
    axis.render();
    return axis;
}

function getAxisTicks(scale, dim) {
    const tickValues = [];
    const { ticks, range } = scale;
    const step = (range[1] - range[0]) / (ticks.length - 1);
    _.each(ticks, (tick, index) => {
        const value = dim === 'y' ? 1.0 - (range[0] + step * index) : range[0] + step * index;
        tickValues.push({ text: tick, value });
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



export function axesLayout(axisInfo, padding, layer, width, height, canvas) {
    const theme = getGlobalTheme();
    const paddingComponents = [];
    // 创建axis
    const axes = [];
    const xAxisScale = mergeAxisScale(axisInfo, 'x');
    let xAxis = createAxis(xAxisScale[0], 'x', canvas, {
        start: { x: 0, y: 0 },
        end: { x: width, y: 0 },
        factor: 1
    });
    const yAxisScale = mergeAxisScale(axisInfo, 'y');
    _.each(yAxisScale, (scale, index) => {
        const factor = index === 0 ? -1 : 1;
        const axis = createAxis(scale, 'y', canvas, {
            start: { x: 0, y: padding[0] },
            end: { x: 0, y: height - xAxis.get('group').getBBox().height - theme.bleeding[2] },
            factor
        });
        axes.push(axis);
    });
    axisLayout(axes, paddingComponents, width);
    const axisPadding = getOverlappingPadding(layer, paddingComponents);
    const ypos = axes[0].get('group').getBBox().maxY;
    xAxis.destroy();
    xAxis = createAxis(xAxisScale[0], 'x', canvas, {
        start: { x: axisPadding[3], y: ypos },
        end: { x: width - axisPadding[1], y: ypos },
        factor: 1
    });
    paddingComponents.push({
        position: 'bottom',
        getBBox: () => {
            const container = xAxis.get('group');
            const bbox = container.getBBox();
            return new BBox(bbox.minX, bbox.minY + ypos, bbox.width, bbox.height);
        }
    });
    return paddingComponents;
}

function axisLayout(axes, paddingComponents, width) {
    const theme = getGlobalTheme();
    // 先处理最左边的
    const leftAxis = axes[0];
    const leftContainer = leftAxis.get('group');
    const leftBbox = leftContainer.getBBox();
    leftContainer.translate(leftBbox.width, 0);
    paddingComponents.push({
        position: 'left',
        getBBox: () => {
            const matrix = leftContainer.attr('matrix');
            return new BBox(leftBbox.minX + matrix[6], leftBbox.minY, leftBbox.width, leftBbox.height);
        }
    });
    let temp_width = theme.bleeding[1];
    // 处理右边的
    for (let i = axes.length - 1; i > 0; i--) {
        const axis = axes[i];
        const container = axis.get('group');
        const bbox = container.getBBox();
        container.translate(width - temp_width - bbox.width, 0);
        temp_width += bbox.width + AXIS_GAP;
        const component = {
            position: 'right',
            getBBox: () => {
                const matrix = container.attr('matrix');
                return new BBox(bbox.minX + matrix[6], bbox.minX, bbox.width, bbox.height);
            }
        };
        paddingComponents.push(component);
    }
}

function adjustColorStyle(color) {
    return {
        line: {
            stroke: color,
            lineWidth: 1
        },
        tickLine: {
            stroke: color,
            lineWidth: 1,
            length: 5
        },
        label: {
            textStyle:{
                fill: color
            }
        }
    };
}
