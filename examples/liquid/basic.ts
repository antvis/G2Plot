/**
 * 基础水波图
 * 场景：运营看板展示本季度订单完成率，突出单一核心指标
 * 要点：liquid 的 data 是 0~1 的单个数值；由完成量与目标量计算得出
 */
import { Chart } from '@antv/g2';

const completedOrderCount = 720;
const targetOrderCount = 1000;
const orderCompletionRate = completedOrderCount / targetOrderCount;

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'liquid',
  data: orderCompletionRate,
});

chart.render();
