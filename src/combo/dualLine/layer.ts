import { getScale } from '@antv/scale';
import { Legend } from '@antv/component';
import { registerPlotType } from '../../base/global';
import ComboViewLayer, { ComboViewConfig } from '../base';
import { LayerConfig } from '../../base/layer';
import LineLayer from '../../plots/line/layer';
import { clone, deepMix, each, hasKey, isString } from '@antv/util';
import { DataItem, IValueAxis, ICatAxis, ITimeAxis, GraphicStyle, LineStyle, TextStyle } from '../../interface/config';
import { PointShape } from '../../plots/line/layer';

const LEGEND_MARGIN = 10;

interface DulLineYAxisConfig extends IValueAxis {
  colorMapping?: boolean;
}

interface DualLineYAxis {
  max?: number;
  min?: number;
  tickCount?: number;
  leftConfig?: DulLineYAxisConfig;
  rightConfig?: DulLineYAxisConfig;
}

interface DualLineLegendConfig {
  visible?: boolean;
  marker?: {
    symbol?: string;
    style?: any;
  };
  text?: {
    style?: TextStyle;
    formatter?: (value: string) => string;
  };
}

interface LineConfig {
  color?: string;
  lineSize?: number;
  smooth?: boolean;
  connectNull?: boolean;
  point?: {
    visible?: boolean;
    shape?: PointShape;
    size?: number;
    color?: string;
    style?: GraphicStyle;
  };
  lineStyle?: LineStyle | ((...args: any[]) => LineStyle);
  label?: any;
}

export interface DualLineViewConfig extends ComboViewConfig {
  xField: string;
  yField: string[];
  data: DataItem[][];
  xAxis?: IValueAxis | ICatAxis | ITimeAxis;
  yAxis?: DualLineYAxis;
  tooltip?: any;
  lineConfigs?: LineConfig[];
  legend?: DualLineLegendConfig;
}

const defaultLineConfig = {
  lineSize: 2,
  connectNull: true,
  point: {
    visible: false,
    size: 3,
    shape: 'circle',
    style: {
      stroke: '#fff',
    },
  },
  label: {
    visible: false,
  },
};

const defaultYAxisConfig = {
  visible: true,
  colorMapping: true,
  grid: {
    visible: true,
  },
  line: {
    visible: false,
  },
  tickLine: {
    visible: false,
  },
  label: {
    visible: true,
    autoHide: true,
    autoRotate: false,
  },
  title: {
    autoRotate: true,
    visible: false,
    offset: 12,
  },
};

interface DualLineLayerConfig extends DualLineViewConfig, LayerConfig {}

export default class DualLineLayer<T extends DualLineLayerConfig = DualLineLayerConfig> extends ComboViewLayer<T> {
  public static getDefaultOptions(): Partial<DualLineLayerConfig> {
    return deepMix({}, super.getDefaultOptions(), {
      yAxis: {
        leftConfig: defaultYAxisConfig,
        rightConfig: defaultYAxisConfig,
      },
      // 自古红蓝出cp....
      lineConfigs: [
        deepMix({}, defaultLineConfig, { color: '#5B8FF9' }),
        deepMix({}, defaultLineConfig, { color: '#e76c5e' }),
      ],
    });
  }

  public type: string = 'dualLine';
  protected colors: string[];
  protected lines: LineLayer[] = [];
  protected legends: any[] = [];

  public init() {
    super.init();
    const { data, xField, yField, xAxis, tooltip, lineConfigs, legend } = this.options;
    this.colors = [lineConfigs[0].color, lineConfigs[1].color];
    this.getTicks();
    //draw first line
    const leftLine = this.createLineLayer(data[0], {
      xField,
      yField: yField[0],
      xAxis: {
        visible: false,
      },
      yAxis: deepMix({}, this.yAxis(0), {
        grid: {
          visible: false,
        },
        nice: true,
      }),
      tooltip: {
        visible: false,
      },
      ...lineConfigs[0],
    });
    leftLine.render();
    //draw second line
    const metaInfo = {};
    metaInfo[yField[1]] = { ticks: this.getTicks() };
    const rightLine = this.createLineLayer(data[1], {
      xField,
      yField: yField[1],
      meta: metaInfo,
      serieField: yField[1],
      xAxis,
      yAxis: deepMix({}, this.yAxis(1), {
        position: 'right',
        nice: true,
      }),
      tooltip: deepMix({}, tooltip, {
        showMarkers: false,
        customContent: {
          callback: (containerDom, ev) => {
            this.tooltip(ev);
          },
        },
      }),
      ...lineConfigs[1],
    });
    rightLine.render();
    if (legend.visible) {
      this.customLegend();
    }
    this.adjustLayout();
  }

  protected createLineLayer(data, config) {
    const viewRange = this.getViewRange();
    const lineLayer = new LineLayer({
      canvas: this.canvas,
      container: this.container,
      x: viewRange.minX,
      y: viewRange.minY,
      width: viewRange.width,
      height: viewRange.height,
      data,
      ...config,
    });
    this.lines.push(lineLayer);
    return lineLayer;
  }

  protected adjustLayout() {
    const viewRange = this.getViewRange();
    const leftPadding = this.lines[0].options.padding;
    const rightPadding = this.lines[1].options.padding;
    // 获取legendHeight并加入上部padding
    let legendHeight = 0;
    let legendA_BBox;
    let legendB_BBox;
    if (this.options.legend?.visible) {
      legendA_BBox = this.legends[0].get('group').getBBox();
      legendB_BBox = this.legends[1].get('group').getBBox();
      legendHeight = legendA_BBox.height + LEGEND_MARGIN * 2;
    }

    // 同步左右padding
    const uniquePadding = [leftPadding[0] + legendHeight, rightPadding[1], rightPadding[2], leftPadding[3]];
    this.lines[0].updateConfig({
      padding: uniquePadding,
    });
    this.lines[0].render();
    this.lines[1].updateConfig({
      padding: uniquePadding,
    });
    this.lines[1].render();
    // 更新legend的位置
    if (this.options.legend?.visible) {
      this.legends[0].setLocation({
        x: leftPadding[3] - legendA_BBox.width / 2,
        y: viewRange.minY + LEGEND_MARGIN,
      });
      this.legends[1].setLocation({
        x: viewRange.maxX - rightPadding[1] - legendB_BBox.width / 2,
        y: viewRange.minY + LEGEND_MARGIN,
      });
    }
  }

  protected getTicks() {
    const { yAxis } = this.options;
    const leftScaleData = this.getScaleData(0);
    // 取到左轴ticks数量
    const Scale = getScale('linear');
    const linearScale = new Scale(
      deepMix(
        {},
        {
          min: 0,
          max: leftScaleData.max,
          nice: true,
          values: leftScaleData.values,
        },
        {
          tickCount: yAxis.tickCount,
        }
      )
    );
    const tickCount = linearScale.ticks.length;
    // 生成右轴ticks
    const max = yAxis.max ? linearScale.max : this.getScaleData(1).max;
    const tickInterval = max / tickCount;
    const ticks = [];
    for (let i = 0; i < tickCount + 1; i++) {
      let tickValue = i * tickInterval;
      if (!Number.isInteger(tickValue)) {
        tickValue = parseFloat(tickValue.toFixed(1));
      }
      ticks.push(tickValue);
    }
    return ticks;
  }

  protected yAxis(index) {
    const { yAxis } = this.options;
    const config = index === 0 ? yAxis.leftConfig : yAxis.rightConfig;
    const colorValue = this.colors[index];
    const yAxisConfig = clone(config);
    const styleMap = {
      title: 'stroke',
      line: 'stroke',
      label: 'fill',
      tickLine: 'stroke',
    };
    if (config.visible && config.colorMapping) {
      each(yAxisConfig, (config, name) => {
        if (!isString(config) && hasKey(styleMap, name)) {
          const styleKey = styleMap[name];
          if (!config.style) {
            config.style = {};
          }
          config.style[styleKey] = colorValue;
        }
      });
    }
    return yAxisConfig;
  }

  protected tooltip(ev) {
    const { yField } = this.options;
    const originItem = clone(ev.items[0]);
    const dataItemsA = this.getDataByXField(ev.title, 0)[0];
    ev.items.push({
      ...originItem,
      mappingData: deepMix({}, originItem.mappingData, { _origin: dataItemsA }),
      data: dataItemsA,
      name: 'value',
      value: dataItemsA[yField[0]],
      color: '#5B8FF9',
    });
  }

  protected getScaleData(index) {
    const { data, yField, yAxis } = this.options;
    const values = [];
    each(data[index], (d) => {
      values.push(d[yField[index]]);
    });
    values.sort((a, b) => a - b);
    const min = values[0];
    const max = yAxis.max ? yAxis.max : values[values.length - 1];
    return { min, max, values };
  }

  protected getDataByXField(value, index) {
    const { data, xField } = this.options;
    const dataSource = data[index];
    return dataSource.filter((d) => {
      return d[xField] === value;
    });
  }

  protected customLegend() {
    const { yField, legend } = this.options;
    const { colors } = this;
    const container = this.container.addGroup();
    const legendCfg = legend;
    each(this.lines, (line, index) => {
      const markerCfg = deepMix(
        {},
        {
          symbol: 'circle',
          style: {
            r: 4,
            fill: colors[index],
          },
        },
        legendCfg.marker
      );
      const items = [
        {
          name: yField[index],
          unchecked: false,
          marker: markerCfg,
        },
      ];
      const legend = new Legend.Category({
        id: 'dualLine',
        container,
        x: 0,
        y: 0,
        items: items,
        updateAutoRender: true,
        itemBackground: null,
        itemName: legendCfg.text,
      });
      legend.init();
      legend.render();
      this.legends.push(legend);
    });
    // 使用legend做图层筛选
    each(this.lines, (line, index) => {
      this.legendFilter(index);
    });
  }

  protected legendFilter(index) {
    const legend = this.legends[index];
    const legend_group = legend.get('group');
    legend_group.on('click', () => {
      const item = legend.get('items')[0];
      if (!item.unchecked) {
        legend.setItemState(item, 'unchecked', true);
        this.hideLayer(index);
      } else {
        legend.setItemState(item, 'unchecked', false);
        this.showLayer(index);
      }
    });
  }

  protected hideLayer(index) {
    const layer = this.lines[index];
    const field = this.options.yField[index];
    // 隐藏layer时只隐藏yAxis和geometry
    const { view } = layer;
    const axisContainer = this.getYAxisContainer(view, field);
    axisContainer.set('visible', false);
    this.setGeometryVisibility(view, false);
    this.canvas.draw();
  }

  protected showLayer(index) {
    const layer = this.lines[index];
    const field = this.options.yField[index];
    const { view } = layer;
    const axisContainer = this.getYAxisContainer(view, field);
    axisContainer.set('visible', true);
    this.setGeometryVisibility(view, true);
    this.canvas.draw();
  }

  protected setGeometryVisibility(view, show) {
    each(view.geometries, (geom) => {
      const { container, labelsContainer } = geom;
      container.set('visible', show);
      labelsContainer.set('visible', show);
    });
  }

  protected getYAxisContainer(view, field) {
    let container;
    const axisCtr = view.controllers.filter((ctr) => {
      return hasKey(ctr, 'axisContainer');
    })[0];
    if (axisCtr) {
      const ctr = axisCtr as any;
      const axisGroups = ctr.axisContainer.get('children');
      each(axisGroups, (g) => {
        const axisField = g.get('component').get('field');
        if (axisField === field) {
          container = g;
        }
      });
    }
    return container;
  }
}

registerPlotType('dualLine', DualLineLayer);
