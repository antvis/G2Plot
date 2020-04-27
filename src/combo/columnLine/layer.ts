// import { Legend } from '@antv/component';
import { registerPlotType } from '../../base/global';
import ComboViewLayer from '../base';
import { LayerConfig } from '../../base/layer';
import LineLayer from '../../plots/line/layer';
import ColumnLayer from '../../plots/column/layer';
import { IColumnLabel } from '../../plots/column/interface';
import { deepMix } from '@antv/util';
import { ICatAxis, GraphicStyle } from '../../interface/config';
import { ComboViewConfig, ComboLegendConfig, LineConfig } from '../util/interface';

const LEGEND_MARGIN = 10;

export interface ColumnConfig {
  color?: string;
  columnSize?: number;
  columnStyle?: GraphicStyle | ((...args: any[]) => GraphicStyle);
  label?: IColumnLabel;
}

export interface ColumnLineViewConfig extends ComboViewConfig {
  xAxis?: ICatAxis;
  tooltip?: any;
  lineConfig?: LineConfig;
  columnConfig?: ColumnConfig;
  legend?: ComboLegendConfig;
}

const defaultLineConfig = {
  color: '#f5bc32',
  lineSize: 4,
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

const defaultColumnConfig = {
  color: '#5B8FF9',
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

interface ColumnLineLayerConfig extends ColumnLineViewConfig, LayerConfig {}

export default class ColumnLineLayer<T extends ColumnLineLayerConfig = ColumnLineLayerConfig> extends ComboViewLayer<
  T
> {
  public static getDefaultOptions(): Partial<ColumnLineLayerConfig> {
    return deepMix({}, super.getDefaultOptions(), {
      yAxis: {
        leftConfig: defaultYAxisConfig,
        rightConfig: defaultYAxisConfig,
      },
      lineConfig: defaultLineConfig,
      columnConfig: defaultColumnConfig,
      legend: {
        visible: true,
      },
    });
  }

  public type: string = 'columnLine';
  protected colors: string[];
  protected legends: any[] = [];

  public init() {
    super.init();
    const { data, xField, yField, xAxis, lineConfig, columnConfig } = this.options;
    this.colors = [columnConfig.color, lineConfig.color];
    // draw column
    const column = this.createLayer(ColumnLayer, data[0], {
      xField,
      yField: yField[0],
      xAxis,
      yAxis: deepMix({}, this.yAxis(0), {
        grid: {
          visible: true,
        },
        nice: true,
      }),
      tooltip: {
        visible: false,
      },
      ...columnConfig,
    });
    column.render();
    //draw line
    const metaInfo = {};
    metaInfo[yField[1]] = { ticks: this.getTicks() };
    const line = this.createLayer(LineLayer, data[1], {
      xField,
      yField: yField[1],
      meta: metaInfo,
      xAxis: {
        visible: false,
      },
      yAxis: deepMix({}, this.yAxis(1), {
        position: 'right',
        grid: {
          visible: false,
        },
        nice: true,
      }),
      tooltip: {
        visible: false,
      },
      ...lineConfig,
    });
    line.render();
    this.adjustLayout();
  }

  protected adjustLayout() {
    const viewRange = this.getViewRange();
    const leftPadding = this.geomLayers[0].options.padding;
    const rightPadding = this.geomLayers[1].options.padding;
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
    this.geomLayers[0].updateConfig({
      padding: uniquePadding,
    });
    this.geomLayers[0].render();
    this.geomLayers[1].updateConfig({
      padding: uniquePadding,
    });
    this.geomLayers[1].render();
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
}

registerPlotType('columnLine', ColumnLineLayer);
