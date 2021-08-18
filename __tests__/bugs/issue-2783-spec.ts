import { Chart, Element } from '@antv/g2';
import { get, isArray } from '@antv/util';
import { DualAxes, DualAxesOptions } from '../../src';
import { LEFT_AXES_VIEW, RIGHT_AXES_VIEW } from '../../src/plots/dual-axes/constant';
import { getAllElementsRecursively } from '../../src/utils';
import { transformData, uvBillData } from '../data/pv-uv';
import { createDiv, removeDom } from '../utils/dom';

const views = {
  [LEFT_AXES_VIEW]: {
    yField: 'value',
    seriesField: 'type',
    data: uvBillData,
  },
  [RIGHT_AXES_VIEW]: {
    yField: 'count',
    seriesField: 'name',
    data: transformData,
  },
};

const config: DualAxesOptions = {
  data: [views[LEFT_AXES_VIEW].data, views[RIGHT_AXES_VIEW].data],
  xField: 'time',
  yField: [views[LEFT_AXES_VIEW].yField, views[RIGHT_AXES_VIEW].yField],
  geometryOptions: [
    {
      geometry: 'line',
      seriesField: views[LEFT_AXES_VIEW].seriesField,
      lineStyle: {
        lineWidth: 3,
        lineDash: [5, 5],
      },
      smooth: true,
    },
    {
      geometry: 'line',
      seriesField: views[RIGHT_AXES_VIEW].seriesField,
      point: {},
    },
  ],
};

const valuesBySeriesField = Object.values(views).map(({ data, seriesField }) => [
  seriesField,
  getUniqueValues(data, seriesField),
]);
const seriesValues: Record<string, any[]> = Object.fromEntries(valuesBySeriesField);

function getUniqueValues(data: any[], field: string): string[] {
  return Array.from(new Set(data.map((d) => d[field])));
}

function applySelection(target: Record<string, boolean>, source: Record<string, boolean>) {
  return { ...target, ...source };
}

function getElementValue(element: Element, field: string) {
  const model = element.getModel();
  const record = model.data;
  return isArray(record) ? record[0][field] : record[field];
}

function getElementsByField(elements: Element[], field: string, value: any) {
  return elements.filter((el) => getElementValue(el, field) === value);
}

function testElements(chart: Chart, selection: Record<string, boolean>) {
  const elements = getAllElementsRecursively(chart);
  Object.values(views).forEach(({ seriesField }) =>
    seriesValues[seriesField].forEach((value) =>
      test(`elements for ${value} ${selection[value] ? 'should' : "shouldn't"} be displayed`, () => {
        const seriesFieldElements = getElementsByField(elements, seriesField, value);
        const elementsDisplayed = seriesFieldElements.length > 0;
        expect(elementsDisplayed).toBe(selection[value]);
      })
    )
  );
}

function testItems(chart: Chart, selection: Record<string, boolean>): void {
  const legendItems = get(chart.getController('legend'), 'option.items', []);
  legendItems
    .map(({ name, unchecked }) => ({ name, unchecked: !unchecked }))
    .forEach(({ name, unchecked }) =>
      test(`item ${name} ${selection[name] ? 'should' : "shouldn't"} be selected`, () =>
        expect(unchecked).toBe(selection[name]))
    );
}

function testLegendSelected(chart: Chart, selection: Record<string, boolean>) {
  testItems(chart, selection);
  testElements(chart, selection);
}

describe('#2783', () => {
  describe.each([
    ['uncheck bill item', {}, { bill: false }],
    ['check unchecked bill item', { bill: false }, { bill: true }],
    ['uncheck checked item a', { a: true }, { a: false }],
    ['uncheck all items', {}, { uv: false, bill: false, a: false, b: false, c: false }],
    ['check all items', { uv: false, bill: false, a: false, b: false, c: false }, {}],
  ])('DualAxes: %s', (_, initial, updated) => {
    const legend = { ...config.legend, selected: initial };
    const container = createDiv();
    const dualAxes = new DualAxes(container, { ...config, legend });

    const defaultSelection = Object.values(views)
      .flatMap(({ data, seriesField }) => getUniqueValues(data, seriesField))
      .reduce((acc, v) => ({ ...acc, ...{ [v]: true } }), {});

    const initialSelection = applySelection(defaultSelection, initial);

    describe(`create with legend.selected=${JSON.stringify(initial)}`, () => {
      dualAxes.render();
      testLegendSelected(dualAxes.chart, initialSelection);
    });

    describe(`update legend.selected=${JSON.stringify(updated)}`, () => {
      dualAxes.update({
        legend: {
          ...legend,
          selected: updated,
        },
      });

      const updatedSelection = applySelection(initialSelection, updated);
      testLegendSelected(dualAxes.chart, updatedSelection);
    });

    afterAll(() => {
      dualAxes.destroy();
      removeDom(container);
    });
  });
});
