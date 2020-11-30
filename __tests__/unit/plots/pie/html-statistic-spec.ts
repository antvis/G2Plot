import InteractionContext from '@antv/g2/lib/interaction/context';
import { Pie } from '../../../../src';
import { StatisticAction } from '../../../../src/plots/pie/interactions/pie-statistic-action';
import { POSITIVE_NEGATIVE_DATA } from '../../../data/common';
import { createDiv } from '../../../utils/dom';

describe('html-statistics', () => {
  const div = createDiv();
  const pie = new Pie(div, {
    data: POSITIVE_NEGATIVE_DATA,
    width: 400,
    height: 300,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    innerRadius: 0.4,
    statistic: {
      content: false,
    },
  });
  pie.render();

  it('only title, 居中', () => {
    const geomCoordinate = pie.chart.geometries[0].coordinate;
    const annotation = document.body.querySelector('.g2-html-annotation');
    const box = annotation.getBoundingClientRect();
    const { top, left } = div.getBoundingClientRect();
    expect(box.x + box.width / 2).toBeCloseTo(geomCoordinate.getCenter().x + left, 1);
    expect(box.y + box.height / 2).toBeCloseTo(geomCoordinate.getCenter().y + top, 1);
  });

  it('only title: 默认居中，设置 offsetY 下移', () => {
    const offsetY = 8;
    pie.update({ statistic: { title: { offsetY } } });
    const geomCoordinate = pie.chart.geometries[0].coordinate;
    const annotation = document.body.querySelector('.g2-html-annotation');
    const box = annotation.getBoundingClientRect();
    const { top, left } = div.getBoundingClientRect();
    expect(box.width).toBeCloseTo(geomCoordinate.getRadius() * pie.options.innerRadius * 2);
    expect(box.x + box.width / 2).toBeCloseTo(geomCoordinate.getCenter().x + left, 1);
    expect(box.y + box.height / 2).toBeCloseTo(geomCoordinate.getCenter().y + top + offsetY, 1);
  });

  it('only content, 居中', () => {
    pie.update({
      statistic: {
        title: false,
        content: {},
      },
    });
    const geomCoordinate = pie.chart.geometries[0].coordinate;
    const annotation = document.body.querySelector('.g2-html-annotation');
    const box = annotation.getBoundingClientRect();
    const { top, left } = div.getBoundingClientRect();
    expect(box.x + box.width / 2).toBeCloseTo(geomCoordinate.getCenter().x + left, 1);
    expect(box.y + box.height / 2).toBeCloseTo(geomCoordinate.getCenter().y + top, 1);
  });

  it('only content: 默认居中，设置 offsetY 下移', () => {
    const offsetY = -8;
    pie.update({ statistic: { content: { offsetY } } });
    const geomCoordinate = pie.chart.geometries[0].coordinate;
    const annotation = document.body.querySelector('.g2-html-annotation');
    const box = annotation.getBoundingClientRect();
    const { top, left } = div.getBoundingClientRect();
    expect(box.x + box.width / 2).toBeCloseTo(geomCoordinate.getCenter().x + left, 1);
    expect(box.y + box.height / 2).toBeCloseTo(geomCoordinate.getCenter().y + top + offsetY, 1);
  });

  it('custom html-statistic', () => {
    const offsetY = 8;
    pie.update({
      statistic: {
        title: {
          customHtml: () => {
            return '测试';
          },
        },
        content: {
          offsetY,
          customHtml: (container, view) => {
            const data = view.getData();
            return `${data.reduce((a, b) => a + b.value, 0)}`;
          },
        },
      },
    });
    const annotations = document.body.querySelectorAll('.g2-html-annotation');
    expect((annotations[0] as HTMLElement).innerText).toBe('测试');
    expect((annotations[1] as HTMLElement).innerText).toBe(
      `${POSITIVE_NEGATIVE_DATA.reduce((a, b) => a + b.value, 0)}`
    );
    const box0 = annotations[0].getBoundingClientRect();
    const box = annotations[1].getBoundingClientRect();
    const geomCoordinate = pie.chart.geometries[0].coordinate;
    expect(box0.width).toBeCloseTo(geomCoordinate.getRadius() * pie.options.innerRadius * 2);
    expect(box.width).toBeCloseTo(geomCoordinate.getRadius() * pie.options.innerRadius * 2);
  });

  it('custom html-statistic, 设置 style', () => {
    let container1;
    let container2;
    pie.update({
      statistic: {
        title: {
          style: {
            whiteSpace: 'pre-wrap',
          },
          customHtml: (container, view, datum) => {
            container1 = container;
            return datum ? `${datum.type}` : '测试\n测试';
          },
        },
        content: {
          style: {
            fontSize: '12px',
          },
          customHtml: (container, view, datum, data) => {
            container2 = container;
            return datum ? `${datum.value}` : `${data.reduce((a, b) => a + b.value, 0)}\nhello`;
          },
        },
      },
    });
    const annotations = document.body.querySelectorAll('.g2-html-annotation');
    expect((annotations[0] as HTMLElement).innerText).toBe('测试\n测试');
    expect((annotations[1] as HTMLElement).innerText).toBe(
      `${POSITIVE_NEGATIVE_DATA.reduce((a, b) => a + b.value, 0)} hello`
    );
    const coordinate = pie.chart.getCoordinate();
    const actualInnerRadius = coordinate.getRadius() * pie.options.innerRadius;
    expect(parseFloat(container1.style.width)).toBe(actualInnerRadius * 2);
    expect(parseFloat(container2.style.width)).toBe(actualInnerRadius * 2);
    expect(container1.style['white-space']).toBe('pre-wrap');
    expect(container2.style['font-size']).toBe('12px');
  });

  it('custom html-statistic: 触发交互', () => {
    pie.render();
    const context = new InteractionContext(pie.chart);
    const action = new StatisticAction(context);
    const triggerData = POSITIVE_NEGATIVE_DATA[2];

    context.event = { type: 'custom', data: { data: triggerData } };
    action.change();

    const annotations = document.querySelectorAll('.g2-html-annotation');
    expect((annotations[0] as HTMLElement).innerText).toBe(`${triggerData.type}`);
    expect((annotations[1] as HTMLElement).innerText).toBe(`${triggerData.value}`);
  });

  afterEach(() => {
    pie.chart.clear();
  });

  afterAll(() => {
    pie.destroy();
  });
});
