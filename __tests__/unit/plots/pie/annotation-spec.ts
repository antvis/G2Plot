import { Pie } from '../../../../src';
import { salesByArea } from '../../../data/sales';
import { delay } from '../../../utils/delay';
import { createDiv } from '../../../utils/dom';

describe('annotation', () => {
  const pie = new Pie(createDiv(), {
    width: 300,
    height: 400,
    data: salesByArea,
    colorField: 'area',
    angleField: 'sales',
    innerRadius: 0.64,
  });

  pie.render();

  it('text annotation', () => {
    expect(pie.chart.getController('annotation').getComponents().length).toBe(2);
    const annotation1: HTMLDivElement = pie.chart.ele.querySelector('.g2-html-annotation');
    // @ts-ignore
    expect(annotation1.style.fontWeight).toBe(`${Pie.getDefaultOptions().statistic.title.style.fontWeight}`);

    pie.update({
      annotations: [
        {
          type: 'text',
          position: ['median', 'median'],
          content: '辅助文本',
        },
      ],
    });
    expect(pie.chart.getController('annotation').getComponents().length).toBe(3);
    expect(pie.chart.getController('annotation').getComponents()[0].component.get('content')).toBe('辅助文本');
    expect(pie.chart.getController('annotation').getComponents()[1].component.get('key')).toBe('top-statistic');
  });

  it('text annotation and line annotation', () => {
    pie.update({
      statistic: null,
      annotations: [
        {
          type: 'text',
          position: ['median', 'median'],
          content: '辅助文本',
        },
        {
          type: 'line',
          start: ['min', 'median'],
          end: ['max', 'median'],
        },
      ],
    });
    expect(pie.chart.getController('annotation').getComponents().length).toBe(2);
    expect(pie.chart.getController('annotation').getComponents()[0].component.get('content')).toBe('辅助文本');
    expect(pie.chart.getController('annotation').getComponents()[1].component.get('type')).toBe('line');
  });

  it('annotation with change data', async () => {
    pie.update({ data: [], statistic: {} });
    expect(pie.chart.getController('annotation').getComponents().length).toBe(4);
    expect(pie.chart.getController('annotation').getComponents()[0].component.get('content')).toBe('辅助文本');
    // @ts-ignore
    let annotations = pie.chart.ele.querySelectorAll('.g2-html-annotation') as HTMLDivElement[];
    expect(annotations[0].innerText).toBe('总计');
    expect(annotations[1].innerText).toBe('');

    pie.changeData(salesByArea);
    await delay(5);
    expect(pie.chart.getController('annotation').getComponents().length).toBe(4);
    expect(pie.chart.getController('annotation').getComponents()[0].component.get('content')).toBe('辅助文本');
    // @ts-ignore
    annotations = pie.chart.ele.querySelectorAll('.g2-html-annotation') as HTMLDivElement[];
    expect(annotations[0].innerText).toBe('总计');
    expect(annotations[1].innerText).toBe(`${salesByArea.reduce((a, b) => a + b.sales, 0)}`);
  });

  it('先更新为 false，再更新出现, 且样式不变', () => {
    const pie1 = new Pie(createDiv(), {
      width: 300,
      height: 400,
      data: salesByArea,
      colorField: 'area',
      angleField: 'sales',
      innerRadius: 0.64,
    });

    pie1.render();
    let annotation1: HTMLDivElement = pie1.chart.ele.querySelector('.g2-html-annotation');
    const style = annotation1.style;

    pie1.update({ statistic: { title: false, content: false } });
    expect(pie1.chart.getController('annotation').getComponents().length).toBe(0);

    pie1.update({ statistic: { title: {}, content: {} } });
    expect(pie1.chart.getController('annotation').getComponents().length).toBe(2);
    annotation1 = pie1.chart.ele.querySelector('.g2-html-annotation');
    // @ts-ignore
    expect(annotation1.innerText).toBe('总计');
    // 样式依然是默认样式
    // @ts-ignore
    expect(annotation1.style).toEqual(style);

    pie1.destroy();
  });

  afterAll(() => {
    pie.destroy();
  });
});
