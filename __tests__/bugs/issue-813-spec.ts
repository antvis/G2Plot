import { Line, LineConfig, ViewLayer } from '../../src';
import { createDiv } from '../utils/dom';
import { wait } from '../utils/common';
import SliderInteraction from '../../src/interaction/slider';
// @ts-ignore
import sales from '../../examples/data/sales.json';

const SALES_DATA: { 城市: string; 销售额: number }[] = sales;

describe('#813', () => {
  const config: LineConfig = {
    title: {
      visible: true,
      text: '为折线添加缩略轴交互',
    },
    description: {
      visible: true,
      text: '缩略轴 (slider) 交互适用于折线数据较多，用户希望关注数据集中某个特殊区间的场景。',
    },
    forceFit: true,
    padding: 'auto',
    data: [],
    xField: '城市',
    xAxis: {
      visible: true,
      label: {
        autoHide: true,
      },
    },
    yField: '销售额',
    yAxis: {
      label: {
        // 数值格式化为千分位
        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    interactions: [
      {
        type: 'slider',
        cfg: {
          start: 0.1,
          end: 0.2,
        },
      },
    ],
  };

  const plot = new Line(createDiv(), config);
  plot.render();

  it('changeData', async () => {
    await wait(3000);
    plot.changeData(SALES_DATA);
    const layer = plot.getLayer() as ViewLayer;
    const interaction = layer.getInteractions()[0];

    // slider rendered
    expect(interaction).toBeInstanceOf(SliderInteraction);

    // @ts-ignore
    const slider = interaction.slider;

    expect(slider.get('backgroundStyle').fill.indexOf('#416180')).toBe(0);
    expect(slider.get('foregroundStyle').fill).toBe('#5B8FF9');
  });
});
