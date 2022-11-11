import { Chart } from '@antv/g2';
import { ShapeStyle } from '../../../src/types';
import {
  adapteStyle,
  renderGaugeStatistic,
  renderStatistic,
  setStatisticContainerStyle,
} from '../../../src/utils/statistic';
import { createDiv, removeDom } from '../../utils/dom';

describe('饼图 statistics 相关处理函数', () => {
  it('adapteStyle', () => {
    const style = {
      fontSize: '12px',
      lineHeight: '12px',
    };

    expect(adapteStyle()).toMatchObject({
      overflow: 'hidden',
      'white-space': 'nowrap',
      'text-overflow': 'ellipsis',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    });

    expect(adapteStyle(style)).toMatchObject({
      'font-size': '12px',
      'line-height': '12px',
    });
  });

  it('adapteStyle 兼容 shapeStyle', () => {
    const style: ShapeStyle = {
      shadowBlur: 5,
      shadowOffsetY: 2,
      shadowColor: 'red',
    };

    // @ts-ignore
    expect(adapteStyle(style)).toMatchObject({
      'text-shadow': 'red 0px 2px 5px',
    });

    const style1: ShapeStyle = {
      fill: 'red',
      lineWidth: 1,
      stroke: 'green',
    };
    // @ts-ignore
    expect(adapteStyle(style1)).toMatchObject({
      color: 'red',
      '-webkit-text-stroke': '1px green',
    });
  });

  const container = createDiv();
  it('设置statistics容器样式', () => {
    setStatisticContainerStyle(container, { color: '', fontSize: '12px' });
    // 默认穿透
    expect(container.style['pointerEvents']).toBe('none');
    expect(container.style.color).toBe('');
    expect(container.style.fontSize).toBe('12px');
  });

  const chart = new Chart({
    container,
    height: 200,
  });
  it('render-statistic', () => {
    chart.coordinate({ type: 'theta', cfg: { innerRadius: 0.5, radius: 1 } });
    renderStatistic(chart, { statistic: { title: false, content: false }, plotType: 'pie' });
    expect(chart.getComponents().filter((c) => c.type === 'annotation').length).toBe(0);

    renderStatistic(chart, { statistic: { title: {}, content: false }, plotType: 'pie' });
    chart.render();
    expect(chart.getComponents().filter((c) => c.type === 'annotation').length).toBe(1);
    chart.clear();

    renderStatistic(chart, { statistic: { title: {}, content: {} }, plotType: 'pie' });
    chart.render();
    const annotations = chart.getComponents().filter((c) => c.type === 'annotation');
    expect(annotations.length).toBe(2);
    expect(annotations[0].component.get('key')).toBe('top-statistic');
    expect(annotations[1].component.get('key')).toBe('bottom-statistic');

    // @ts-ignore
    expect(container.querySelector('.g2-html-annotation').style.width).toBe(`${chart.getCoordinate().getRadius()}px`);
    chart.clear();

    renderStatistic(chart, { statistic: { title: {}, content: {} }, plotType: 'xxx' });
    chart.render();
    // @ts-ignore
    expect(container.querySelector('.g2-html-annotation').style.width).toBe(`${chart.getCoordinate().getWidth()}px`);
    chart.clear();
  });

  it('statistic 文本内容: customHtml > formatter > content', () => {
    chart.coordinate({ type: 'theta', cfg: { innerRadius: 0.5, radius: 1 } });
    renderStatistic(chart, { statistic: { title: { content: 'TEST' }, content: false }, plotType: 'pie' });
    chart.render();
    expect((container.querySelector('.g2-html-annotation') as HTMLElement).innerText).toBe('TEST');

    chart.clear();

    renderStatistic(chart, {
      statistic: { title: { content: 'TEST', formatter: () => 'TEST formatter' }, content: false },
      plotType: 'xxx',
    });
    chart.render();
    expect((container.querySelector('.g2-html-annotation') as HTMLElement).innerText).toBe('TEST formatter');

    chart.clear();

    renderStatistic(chart, {
      statistic: {
        title: { content: 'TEST', formatter: () => 'TEST formatter', customHtml: () => '<div>custom html</div>' },
        content: false,
      },
      plotType: 'xxx',
    });
    chart.render();
    expect((container.querySelector('.g2-html-annotation') as HTMLElement).innerText).toBe('custom html');
    chart.clear();
  });

  it('render-gauge-statistic', async () => {
    chart.coordinate({ type: 'theta', cfg: { innerRadius: 0.5, radius: 1 } });
    chart.createView();
    renderGaugeStatistic(chart, { statistic: { title: false, content: false } });
    expect(chart.getComponents().filter((c) => c.type === 'annotation').length).toBe(0);

    renderGaugeStatistic(chart, { statistic: { title: {}, content: false } });
    chart.render();
    expect(chart.getComponents().filter((c) => c.type === 'annotation').length).toBe(1);
    chart.clear();

    renderGaugeStatistic(chart, {
      statistic: {
        title: {
          customHtml: () => 'xxx',
        },
        content: {},
      },
    });
    chart.render();
    expect(chart.getComponents().filter((c) => c.type === 'annotation').length).toBe(2);
    // @ts-ignore
    expect(container.querySelector('.g2-html-annotation').innerText).toBe('xxx');
    chart.clear();
  });

  it('statistic 文本内容: customHtml > formatter > content', () => {
    chart.coordinate({ type: 'theta', cfg: { innerRadius: 0.5, radius: 1 } });
    renderGaugeStatistic(chart, { statistic: { title: { content: 'TEST' }, content: false } });
    chart.render();
    expect((container.querySelector('.g2-html-annotation') as HTMLElement).innerText).toBe('TEST');

    chart.clear();

    renderGaugeStatistic(chart, {
      statistic: { title: { content: 'TEST', formatter: () => 'TEST formatter' }, content: false },
    });
    chart.render();
    expect((container.querySelector('.g2-html-annotation') as HTMLElement).innerText).toBe('TEST formatter');

    chart.clear();

    renderGaugeStatistic(chart, {
      statistic: {
        title: { content: 'TEST', formatter: () => 'TEST formatter', customHtml: () => '<div>custom html</div>' },
        content: false,
      },
    });
    chart.render();
    expect((container.querySelector('.g2-html-annotation') as HTMLElement).innerText).toBe('custom html');
    chart.clear();
  });
  afterAll(() => {
    chart.destroy();
    removeDom(container);
  });
});
