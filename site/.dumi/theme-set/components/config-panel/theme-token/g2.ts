import Palette from '../../../theme/palette.json';

export default {
  relations: [
    {
      fromAttributeId: 'components.tooltip.showMarkers',
      toAttributeId: 'marker-setting',
      value: false,
      operator: '=' as const,
      action: 'hidden' as const,
    },
    {
      fromAttributeId: 'bottom-axis-subTick-line',
      toAttributeId: 'bottom-axis-subTick-line-setting',
      value: true,
      operator: '!=' as const,
      action: 'hidden' as const,
    },
    {
      fromAttributeId: 'right-axis-subTick-line',
      toAttributeId: 'right-axis-subTick-line-setting',
      value: true,
      operator: '!=' as const,
      action: 'hidden' as const,
    },
    {
      fromAttributeId: 'left-axis-subTick-line',
      toAttributeId: 'left-axis-subTick-line-setting',
      value: true,
      operator: '!=' as const,
      action: 'hidden' as const,
    },
    {
      fromAttributeId: 'top-axis-subTick-line',
      toAttributeId: 'top-axis-subTick-line-setting',
      value: true,
      operator: '!=' as const,
      action: 'hidden' as const,
    },
    {
      fromAttributeId: 'circle-axis-subTick-line',
      toAttributeId: 'circle-axis-subTick-line-setting',
      value: true,
      operator: '!=' as const,
      action: 'hidden' as const,
    },
    {
      fromAttributeId: 'radius-axis-subTick-line',
      toAttributeId: 'radius-axis-subTick-line-setting',
      value: true,
      operator: '!=' as const,
      action: 'hidden' as const,
    },
    {
      fromAttributeId: 'showAxisTitle',
      toAttributeId: 'axis-title',
      value: true,
      operator: '!=' as const,
      action: 'hidden' as const,
    },
  ],
  config: {
    type: 'collapse',
    children: [
      {
        type: 'collapse-panel',
        displayName: '主题色板',
        children: [
          {
            type: 'theme-style-switcher',
            displayName: '预览主题',
          },
          {
            type: 'slider',
            attributeId: 'seriesCount',
            displayName: '系列数量',
            min: 1,
            max: 10,
            initialValue: 3,
            showInputNumber: true,
          },
          {
            type: 'grid-layout',
            displayName: '色板预览',
            gridColumnGap: '8px',
            // gridRowGap: '8px',
            children: Palette.categorical.map((colors) => {
              return {
                type: 'custom-theme-color',
                asAWhole: true,
                colors10: colors.colors10,
                colors20: colors.colors20,
                sequenceColors: colors.sequenceColors,
              };
            }),
          },
          {
            type: 'group',
            displayName: '自定义配色',
            children: [
              {
                type: 'custom-theme-color',
                displayName: '色板',
                canChangeColor: true,
                attributeId: 'theme-color',
              },
            ],
          },
        ],
      },
      {
        type: 'collapse-panel',
        displayName: '基础色',
        children: [
          {
            type: 'color-picker',
            displayName: '背景色',
            attributeId: 'background',
          },
          {
            type: 'color-picker',
            displayName: '辅助色',
            attributeId: 'subColor',
          },
          {
            type: 'color-picker',
            displayName: '语义红',
            attributeId: 'semanticRed', // risingFill for waterfall
          },
          {
            type: 'color-picker',
            displayName: '语义绿',
            attributeId: 'semanticGreen', // fallingFill for waterfall
          },
        ],
      },
      {
        type: 'collapse-panel',
        displayName: '标签',
        children: [
          {
            type: 'font-setting',
            displayName: '标签字体',
            info: '1. 柱条形图内置了 "adjust-color" 的标签布局，故标签填充色设置对其无效',
            attributeId: 'labels-text-style',
            attributeIdMap: {
              fontSize: 'labels.style.fontSize',
              fontFamily: 'labels.style.fontFamily',
              fontWeight: 'labels.style.fontWeight',
              fontColor: 'labels.style.fill',
            },
          },
          {
            type: 'line-setting',
            displayName: '标签字体描边',
            info: '标签描边颜色和粗细',
            attributeId: 'labels-stroke-style',
            attributeIdMap: {
              lineColor: 'labels.style.stroke',
              lineWidth: 'labels.style.lineWidth',
            },
          },
          {
            type: 'group',
            displayName: '饼图标签',
            children: [
              {
                type: 'input-number',
                displayName: '标签高度',
                attributeId: 'pieLabels.labelHeight',
              },
              {
                type: 'input-number',
                displayName: '标签偏移量',
                attributeId: 'pieLabels.offset',
              },
              {
                type: 'line-setting',
                displayName: '标签牵引线',
                attributeId: 'pieLabels-labelLine-style',
                attributeIdMap: {
                  lineColor: 'pieLabels.labelLine.style.stroke',
                  lineWidth: 'pieLabels.labelLine.style.lineWidth',
                },
              },
            ],
          },
        ],
      },
      {
        type: 'collapse-panel',
        displayName: '坐标轴',
        children: [
          {
            type: 'group',
            displayName: '坐标轴(通用)',
            children: [
              {
                type: 'font-setting',
                displayName: '轴标签字体',
                attributeId: 'axis-label-style',
                attributeIdMap: {
                  fontColor: 'components.axis.common.label.style.fill',
                  fontSize: 'components.axis.common.label.style.fontSize',
                  fontFamily: 'components.axis.common.label.style.fontFamily',
                  fontWeight: 'components.axis.common.label.style.fontWeight',
                },
              },
              {
                type: 'checkbox',
                displayName: '轴标签-自动旋转',
                attributeId: 'components.axis.common.label.autoRotate',
              },
              {
                type: 'checkbox',
                displayName: '轴标签-自动省略',
                attributeId: 'components.axis.common.label.autoEllipsis',
              },

              {
                type: 'line-setting',
                displayName: '坐标轴线',
                attributeId: 'bottom-axis-line-style',
                attributeIdMap: {
                  lineColor: 'components.axis.common.line.style.stroke',
                  lineWidth: 'components.axis.common.line.style.lineWidth',
                },
              },
              {
                type: 'line-setting',
                displayName: '网格线',
                attributeId: 'bottom-axis-grid-line-style',
                attributeIdMap: {
                  lineColor: 'components.axis.common.grid.line.style.stroke',
                  lineWidth: 'components.axis.common.grid.line.style.lineWidth',
                  lineDash: 'components.axis.common.grid.line.style.lineDash',
                },
              },
              {
                type: 'line-setting',
                displayName: '刻度线',
                attributeId: 'bottom-axis-grid-line-style',
                attributeIdMap: {
                  lineColor: 'components.axis.common.tickLine.style.stroke',
                  lineWidth: 'components.axis.common.tickLine.style.lineWidth',
                  // 刻度线长度
                  length: 'components.axis.common.tickLine.style.length',
                },
              },
              {
                type: 'checkbox',
                displayName: '网格线对齐刻度线',
                attributeId: 'components.axis.common.grid.alignTick',
              },
              {
                type: 'checkbox',
                displayName: '开启子刻度线',
                attributeId: 'bottom-axis-subTick-line',
              },
              {
                type: 'line-setting',
                // displayName: '坐标轴子刻度线',
                attributeId: 'bottom-axis-subTick-line-setting',
                attributeIdMap: {
                  lineColor: 'components.axis.common.subTickLine.style.stroke',
                  lineWidth: 'components.axis.common.subTickLine.style.lineWidth',
                  // 刻度线长度
                  length: 'components.axis.common.subTickLine.style.length',
                },
              },
            ],
          },
          {
            type: 'group',
            displayName: '坐标轴标题',
            children: [
              {
                type: 'checkbox',
                displayName: '展示轴标题',
                attributeId: 'showAxisTitle',
                initialValue: true,
                info: '是否展示坐标轴标题（应用于折线图、面积图、柱状图）。不属于主题部分，实际应用时，需要处理具体图表的配置项',
                children: [],
              },
              {
                type: 'font-setting',
                displayName: '轴标题字体(下)',
                attributeId: 'axis-title',
                initialValue: {
                  fontSize: 12,
                  fontColor: 'rgba(0,0,0,0.65)',
                },
                attributeIdMap: {
                  fontSize: 'components.axis.bottom.title.style.fontSize',
                  fontColor: 'components.axis.bottom.title.style.fill',
                  fontFamily: 'components.axis.bottom.title.style.fontFamily',
                  fontWeight: 'components.axis.bottom.title.style.fontWeight',
                },
              },
              {
                type: 'font-setting',
                displayName: '轴标题字体(左)',
                attributeId: 'axis-title',
                initialValue: {
                  fontSize: 12,
                  fontColor: 'rgba(0,0,0,0.65)',
                },
                attributeIdMap: {
                  fontSize: 'components.axis.left.title.style.fontSize',
                  fontColor: 'components.axis.left.title.style.fill',
                  fontFamily: 'components.axis.left.title.style.fontFamily',
                  fontWeight: 'components.axis.left.title.style.fontWeight',
                },
              },
              {
                type: 'font-setting',
                displayName: '轴标题字体(上)',
                attributeId: 'axis-title',
                initialValue: {
                  fontSize: 12,
                  fontColor: 'rgba(0,0,0,0.65)',
                },
                attributeIdMap: {
                  fontSize: 'components.axis.top.title.style.fontSize',
                  fontColor: 'components.axis.top.title.style.fill',
                  fontFamily: 'components.axis.top.title.style.fontFamily',
                  fontWeight: 'components.axis.top.title.style.fontWeight',
                },
              },
              {
                type: 'font-setting',
                displayName: '轴标题字体(右)',
                attributeId: 'axis-title',
                initialValue: {
                  fontSize: 12,
                  fontColor: 'rgba(0,0,0,0.65)',
                },
                attributeIdMap: {
                  fontSize: 'components.axis.right.title.style.fontSize',
                  fontColor: 'components.axis.right.title.style.fill',
                  fontFamily: 'components.axis.right.title.style.fontFamily',
                  fontWeight: 'components.axis.right.title.style.fontWeight',
                },
              },
            ],
          },
          {
            type: 'group',
            displayName: '坐标轴(circle - 适用于雷达图)',
            children: [
              {
                type: 'font-setting',
                displayName: '轴标题字体',
                attributeId: 'axis.title',
                initialValue: {
                  fontSize: 12,
                },
                attributeIdMap: {
                  fontSize: 'components.axis.circle.title.style.fontSize',
                  fontColor: 'components.axis.circle.title.style.fill',
                  fontFamily: 'components.axis.circle.title.style.fontFamily',
                  fontWeight: 'components.axis.circle.title.style.fontWeight',
                },
              },
              {
                type: 'font-setting',
                displayName: '轴标签字体',
                attributeId: 'circle-axis-label-style',
                attributeIdMap: {
                  fontColor: 'components.axis.circle.label.style.fill',
                  fontSize: 'components.axis.circle.label.style.fontSize',
                  fontFamily: 'components.axis.circle.label.style.fontFamily',
                  fontWeight: 'components.axis.circle.label.style.fontWeight',
                },
              },
              {
                type: 'input-number',
                displayName: '轴线宽度',
                attributeId: 'components.axis.circle.line.style.lineWidth',
              },
              {
                type: 'color-picker',
                displayName: '轴线颜色',
                attributeId: 'components.axis.circle.line.style.stroke',
              },
              {
                type: 'select',
                displayName: '网格线类型',
                options: [
                  { value: 'line', label: 'line' },
                  { value: 'circle', label: 'circle' },
                ],
                attributeId: 'components.axis.circle.grid.line.type',
              },
              {
                type: 'line-setting',
                displayName: '网格线',
                attributeId: 'circle-axis-grid-line-style',
                attributeIdMap: {
                  lineColor: 'components.axis.circle.grid.line.style.stroke',
                  lineWidth: 'components.axis.circle.grid.line.style.lineWidth',
                  lineDash: 'components.axis.circle.grid.line.style.lineDash',
                },
              },
              {
                type: 'line-setting',
                displayName: '刻度线',
                attributeId: 'circle-axis-grid-line-style',
                attributeIdMap: {
                  lineColor: 'components.axis.circle.tickLine.style.stroke',
                  lineWidth: 'components.axis.circle.tickLine.style.lineWidth',
                  // 刻度线长度
                  length: 'components.axis.circle.tickLine.style.length',
                },
              },
              {
                type: 'checkbox',
                displayName: '网格线对齐刻度线',
                attributeId: 'components.axis.circle.grid.alignTick',
              },
              {
                type: 'checkbox',
                displayName: '开启子刻度线',
                attributeId: 'circle-axis-subTick-line',
              },
              {
                type: 'line-setting',
                // displayName: '坐标轴子刻度线',
                attributeId: 'circle-axis-subTick-line-setting',
                attributeIdMap: {
                  lineColor: 'components.axis.circle.subTickLine.style.stroke',
                  lineWidth: 'components.axis.circle.subTickLine.style.lineWidth',
                  // 刻度线长度
                  length: 'components.axis.circle.subTickLine.style.length',
                },
              },
            ],
          },
          {
            type: 'group',
            displayName: '坐标轴(radius 径向轴 - 适用于雷达图)',
            children: [
              {
                type: 'font-setting',
                displayName: '轴标题字体',
                attributeId: 'axis.title',
                attributeIdMap: {
                  fontSize: 'components.axis.radius.title.style.fontSize',
                  fontColor: 'components.axis.radius.title.style.fill',
                  fontFamily: 'components.axis.radius.title.style.fontFamily',
                  fontWeight: 'components.axis.radius.title.style.fontWeight',
                },
              },
              {
                type: 'font-setting',
                displayName: '轴标签字体',
                attributeId: 'radius-axis-label-style',
                attributeIdMap: {
                  fontColor: 'components.axis.radius.label.style.fill',
                  fontSize: 'components.axis.radius.label.style.fontSize',
                  fontFamily: 'components.axis.radius.label.style.fontFamily',
                  fontWeight: 'components.axis.radius.label.style.fontWeight',
                },
              },
              {
                type: 'input-number',
                displayName: '轴线宽度',
                attributeId: 'components.axis.radius.line.style.lineWidth',
              },
              {
                type: 'color-picker',
                displayName: '轴线颜色',
                attributeId: 'components.axis.radius.line.style.stroke',
              },
              {
                type: 'line-setting',
                displayName: '网格线',
                attributeId: 'cirradiuscle-axis-grid-line-style',
                attributeIdMap: {
                  lineColor: 'components.axis.radius.grid.line.style.stroke',
                  lineWidth: 'components.axis.radius.grid.line.style.lineWidth',
                  lineDash: 'components.axis.radius.grid.line.style.lineDash',
                },
              },
              {
                type: 'line-setting',
                displayName: '刻度线',
                attributeId: 'radius-axis-grid-line-style',
                attributeIdMap: {
                  lineColor: 'components.axis.radius.tickLine.style.stroke',
                  lineWidth: 'components.axis.radius.tickLine.style.lineWidth',
                  // 刻度线长度
                  length: 'components.axis.radius.tickLine.style.length',
                },
              },
              {
                type: 'checkbox',
                displayName: '网格线对齐刻度线',
                attributeId: 'components.axis.radius.grid.alignTick',
              },
              {
                type: 'checkbox',
                displayName: '开启子刻度线',
                attributeId: 'radius-axis-subTick-line',
              },
              {
                type: 'line-setting',
                // displayName: '坐标轴子刻度线',
                attributeId: 'radius-axis-subTick-line-setting',
                attributeIdMap: {
                  lineColor: 'components.axis.radius.subTickLine.style.stroke',
                  lineWidth: 'components.axis.radius.subTickLine.style.lineWidth',
                  // 刻度线长度
                  length: 'components.axis.radius.subTickLine.style.length',
                },
              },
            ],
          },
        ],
      },
      {
        type: 'collapse-panel',
        displayName: '图例 - Legend',
        children: [
          {
            type: 'group',
            displayName: '图例(通用)',
            children: [
              {
                type: 'input-number',
                displayName: '图例项之间的水平间距',
                attributeId: 'components.legend.common.itemSpacing',
              },
              {
                type: 'input-number',
                displayName: 'marker 默认半径大小',
                initialValue: 4,
                attributeId: 'components.legend.common.marker.style.r',
              },
              {
                type: 'input-number',
                displayName: '图例项之间的水平间距',
                initialValue: 8,
                attributeId: 'components.legend.common.marker.spacing',
              },
              {
                type: 'font-setting',
                displayName: '图例项文本字体',
                attributeId: 'legend-item-name-style',
                attributeIdMap: {
                  fontWeight: 'components.legend.common.itemName.style.fontWeight',
                  fontSize: 'components.legend.common.itemName.style.fontSize',
                  fontColor: 'components.legend.common.itemName.style.fill',
                },
              },
              {
                type: 'input-number',
                displayName: '图例项文本行高',
                initialValue: 12,
                attributeId: 'components.legend.common.itemName.style.lineHeight',
              },
              {
                type: 'input-number',
                displayName: '图例项之间的水平间距',
                initialValue: 8,
                attributeId: 'components.legend.common.marker.spacing',
              },
              // 通用
              {
                type: 'input-number',
                displayName: '图例项之间的水平间距',
                initialValue: 24,
                attributeId: 'components.legend.common.itemSpacing',
              },
              {
                type: 'input-number',
                displayName: '图例项垂直方向的间隔',
                initialValue: 12,
                attributeId: 'components.legend.common.legendItemMarginBottom',
              },
              {
                type: 'input',
                displayName: '图例组件自己的外边距',
                initialValue: 16,
                attributeId: 'components.legend.common.padding',
              },
              {
                type: 'input-number',
                displayName: '图例项最大宽度',
                initialValue: 200,
                attributeId: 'components.legend.common.maxItemWidth',
              },
            ],
          },
          {
            type: 'group',
            displayName: '连续型图例',
            children: [
              {
                type: 'color-picker',
                displayName: '滑道填充色',
                attributeId: 'components.legend.continuous.rail.style.fill',
              },
              {
                type: 'line-setting',
                displayName: '滑道边框',
                attributeId: 'continuous-legend-rail-style',
                attributeIdMap: {
                  lineWidth: 'components.legend.continuous.rail.style.lineWidth',
                  lineColor: 'components.legend.continuous.rail.style.stroke',
                },
              },
              {
                type: 'input-number',
                displayName: '滑道高度',
                initialValue: 12,
                attributeId: 'components.legend.continuous.rail.size',
              },
              {
                type: 'input-number',
                displayName: '滑道宽度',
                initialValue: 100,
                attributeId: 'components.legend.continuous.rail.defaultLength',
              },
              // handler
              {
                type: 'color-picker',
                displayName: '滑块颜色',
                attributeId: 'components.legend.continuous.handler.style.fill',
              },
              {
                type: 'line-setting',
                displayName: '滑块边框',
                info: '连续图例滑块边框色以及粗细',
                attributeId: 'continuous-legend-handler-style',
                attributeIdMap: {
                  lineWidth: 'components.legend.continuous.handler.style.lineWidth',
                  lineColor: 'components.legend.continuous.handler.style.stroke',
                },
              },
              {
                type: 'input-number',
                displayName: '滑块宽度（大小）',
                initialValue: 10,
                attributeId: 'components.legend.continuous.handler.size',
              },
              // label
              {
                type: 'font-setting',
                displayName: '标签字体',
                attributeId: 'continuous-legend-label-style',
                attributeIdMap: {
                  fontWeight: 'ccomponents.legend.continuous.label.style.fontWeight',
                  fontSize: 'components.legend.continuous.label.style.fontSize',
                  fontColor: 'components.legend.continuous.label.style.fill',
                },
              },
              {
                type: 'input-number',
                displayName: '标签字体行高',
                initialValue: 12,
                attributeId: 'components.legend.continuous.label.style.lineHeight',
              },
              {
                type: 'input-number',
                displayName: '标签与滑块的间距',
                initialValue: 4,
                attributeId: 'components.legend.continuous.label.spacing',
              },
            ],
          },
          {
            type: 'group',
            displayName: '图例分页器',
            children: [
              {
                type: 'font-setting',
                displayName: '标签字体',
                attributeId: 'legend-pageNavigator-text-style',
                attributeIdMap: {
                  fontSize: 'components.legend.common.pageNavigator.text.style.fontSize',
                  fontColor: 'components.legend.common.pageNavigator.text.style.fill',
                  fontWeight: 'components.legend.common.pageNavigator.text.style.fontWeight',
                },
              },
              {
                type: 'font-setting',
                displayName: '分页器 marker',
                info: '图例分页器的 marker 大小和填充色',
                attributeId: 'legend-page-navigator',
                attributeIdMap: {
                  fontColor: 'components.legend.common.pageNavigator.marker.style.fill',
                  fontSize: 'components.legend.common.pageNavigator.marker.style.size',
                },
              },

              {
                type: 'font-setting',
                displayName: 'marker 非激活态样式',
                info: '填充色以及透明度设置',
                attributeId: 'legend-page-navigator-inactive-style',
                attributeIdMap: {
                  fontColor: 'components.legend.common.pageNavigator.marker.style.inactiveFill',
                  opacity: 'components.legend.common.pageNavigator.marker.style.inactiveOpacity',
                },
              },
              {
                type: 'input-number',
                displayName: 'marker 填充色透明度',
                attributeId: 'components.legend.common.pageNavigator.marker.style.opacity',
              },
            ],
          },
        ],
      },
      {
        type: 'collapse-panel',
        displayName: '悬浮提示 - Tooltip',
        children: [
          {
            type: 'group',
            displayName: 'crosshairs 辅助线',
            children: [
              {
                type: 'line-setting',
                displayName: '辅助线',
                info: 'Tooltip 辅助线颜色和粗细',
                attributeId: 'tooltip-crossshairs-line-style',
                attributeIdMap: {
                  lineWidth: 'components.tooltip.crosshairs.line.style.lineWidth',
                  lineColor: 'components.tooltip.crosshairs.line.style.stroke',
                },
              },
              {
                type: 'checkbox',
                displayName: 'showMarkers',
                attributeId: 'components.tooltip.showMarkers',
              },
              {
                type: 'group',
                displayType: 'inline',
                attributeId: 'marker-setting',
                children: [
                  {
                    type: 'input-number',
                    displayName: 'marker 大小',
                    attributeId: 'components.tooltip.marker.r',
                  },
                  {
                    type: 'select',
                    displayName: 'marker 形状',
                    options: [
                      { value: 'circle', label: 'circle' },
                      { value: 'triangle', label: 'triangle' },
                      { value: 'square', label: 'square' },
                      { value: 'diamond', label: 'diamond' },
                    ],
                    attributeId: 'components.tooltip.marker.symbol',
                  },
                  {
                    type: 'line-setting',
                    displayName: 'marker 描边',
                    info: 'Tooltip 辅助线 marker 描边色和粗细',
                    attributeId: 'tooltip-crosshairs-marker',
                    attributeIdMap: {
                      lineWidth: 'components.tooltip.marker.lineWidth',
                      lineColor: 'components.tooltip.marker.stroke',
                    },
                  },

                  {
                    type: 'color-picker',
                    displayName: 'marker 阴影色',
                    attributeId: 'components.tooltip.marker.shadowColor',
                  },
                  {
                    type: 'color-picker',
                    displayName: 'marker 阴影模糊度',
                    attributeId: 'components.tooltip.marker.shadowBlur',
                  },
                  {
                    type: 'input-number',
                    displayName: 'marker shadowOffsetX',
                    attributeId: 'components.tooltip.marker.shadowOffsetX',
                  },
                  {
                    type: 'input-number',
                    displayName: 'marker shadowOffsetY',
                    attributeId: 'components.tooltip.marker.shadowOffsetY',
                  },
                ],
              },
            ],
          },
          {
            type: 'group',
            displayName: '内容框样式',
            children: [
              {
                type: 'input-number',
                displayName: '圆角',
                attributeId: 'components.tooltip.domStyles["g2-tooltip"].borderRadius',
              },
              {
                type: 'font-setting',
                displayName: '文本样式',
                attributeId: 'tooltip-text-style',
                attributeIdMap: {
                  fontColor: 'components.tooltip.domStyles["g2-tooltip"]color',
                  fontSize: 'components.tooltip.domStyles["g2-tooltip"]fontSize',
                  fontWeight: 'components.tooltip.domStyles["g2-tooltip"]fontWeight',
                },
              },
              {
                type: 'custom-style',
                attributeId: 'components.tooltip.domStyles["g2-tooltip"]',
              },
            ],
          },
          {
            type: 'group',
            displayName: 'Tooltip title 样式',
            children: [
              {
                type: 'custom-style',
                attributeId: 'components.tooltip.domStyles["g2-tooltip-title"]',
              },
            ],
          },
          {
            type: 'group',
            displayName: 'Tooltip list item 样式',
            children: [
              {
                type: 'custom-style',
                attributeId: 'components.tooltip.domStyles["g2-tooltip-list-item"]',
              },
            ],
          },
          {
            type: 'group',
            displayName: 'Tooltip marker 样式',
            children: [
              {
                type: 'custom-style',
                attributeId: 'components.tooltip.domStyles["g2-tooltip-marker"]',
              },
            ],
          },
          {
            type: 'group',
            displayName: 'Tooltip value 样式',
            children: [
              {
                type: 'custom-style',
                attributeId: 'components.tooltip.domStyles["g2-tooltip-value"]',
              },
            ],
          },
        ],
      },
      {
        type: 'collapse-panel',
        displayName: '缩略轴 - Slider',
        children: [
          {
            type: 'group',
            displayName: '标签文字',
            children: [
              {
                type: 'color-picker',
                displayName: '标签字体颜色',
                attributeId: 'components.slider.common.textStyle.fill',
              },
              {
                type: 'input-number',
                displayName: '标签颜色透明度',
                step: 0.05,
                initialValue: 0.45,
                attributeId: 'components.slider.common.textStyle.opacity',
              },
            ],
          },
          {
            type: 'group',
            displayName: '手柄',
            children: [
              {
                type: 'input-number',
                displayName: '手柄宽度',
                initialValue: 10,
                attributeId: 'components.slider.common.handlerStyle.width',
              },
              {
                type: 'input-number',
                displayName: '手柄高度',
                initialValue: 24,
                attributeId: 'components.slider.common.handlerStyle.height',
              },
              {
                type: 'color-picker',
                displayName: '手柄填充色',
                initialValue: '#F7F7F7',
                attributeId: 'components.slider.common.handlerStyle.fill',
              },
              {
                type: 'color-picker',
                displayName: '手柄高亮色',
                initialValue: '#fff',
                attributeId: 'components.slider.common.handlerStyle.highLightFill',
              },
              {
                type: 'color-picker',
                displayName: '手柄描边色',
                initialValue: '#BFBFBF',
                attributeId: 'components.slider.common.handlerStyle.stroke',
              },
              {
                type: 'input-number',
                displayName: '手柄圆角',
                initialValue: 2,
                attributeId: 'components.slider.common.handlerStyle.radius',
              },
            ],
          },
          {
            type: 'group',
            displayName: '缩略轴前景',
            children: [
              {
                type: 'color-picker',
                displayName: '前景填充色',
                initialValue: '#5B8FF9',
                attributeId: 'components.slider.common.foregroundStyle.fill',
              },
              {
                type: 'input-number',
                displayName: '前景填充色透明度',
                step: 0.05,

                initialValue: 0.15,
                attributeId: 'components.slider.common.foregroundStyle.opacity',
              },
            ],
          },
          {
            type: 'group',
            displayName: '缩略轴背景',
            children: [
              {
                type: 'color-picker',
                displayName: '背景填充色',
                initialValue: '#416180',
                attributeId: 'components.slider.common.backgroundStyle.fill',
              },
              {
                type: 'input-number',
                displayName: '背景填充色透明度',
                step: 0.05,
                initialValue: 0.05,
                attributeId: 'components.slider.common.backgroundStyle.opacity',
              },
            ],
          },
        ],
      },
      {
        type: 'collapse-panel',
        displayName: '滚动条 - Scrollbar',
        children: [
          {
            type: 'group',
            displayName: '滑块',
            children: [
              {
                type: 'color-picker',
                displayName: '滑块颜色',
                attributeId: 'components.scrollbar.default.style.thumbColor',
              },
              {
                type: 'color-picker',
                displayName: '滑块 hover 高亮色',
                attributeId: 'components.scrollbar.hover.style.thumbColor',
              },
            ],
          },
          {
            type: 'group',
            displayName: '滑道',
            children: [
              {
                type: 'color-picker',
                displayName: '滑道颜色',
                attributeId: 'components.scrollbar.default.style.trackColor',
              },
            ],
          },
        ],
      },
    ],
  },
};
