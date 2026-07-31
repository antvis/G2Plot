import { Chart } from '@antv/g2';
import { getContainerSize } from '../utils';

type MaybeLegacyChart = Chart & {
  options?: Record<string, any>;
  views?: any[];
};

/**
 * 兼容 G2 v4/v5：在 clear 后尽量重置 legacy 内部状态，避免多 view 场景下 legend 重复。
 */
export function resetLegacyChartState(chart: Chart) {
  const legacyChart = chart as MaybeLegacyChart;

  if (legacyChart.options) {
    legacyChart.options = {
      ...legacyChart.options,
      data: [],
      animate: true,
    };
  }

  if (Array.isArray(legacyChart.views)) {
    legacyChart.views = [];
  }
}

/**
 * 兼容 G2 v4/v5：优先使用 forceFit；否则按容器尺寸显式 changeSize。
 */
export function resizeChart(chart: Chart, container: HTMLElement) {
  const maybeForceFit = chart as Chart & { forceFit?: () => void };

  if (typeof maybeForceFit.forceFit === 'function') {
    maybeForceFit.forceFit();
    return;
  }

  const { width, height } = getContainerSize(container);
  chart.changeSize(width || 400, height || 400);
}
