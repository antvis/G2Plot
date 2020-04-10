import { Line, LineConfig } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { each, findIndex, flattenDeep } from '@antv/util';
import { ORIGIN, FIELD_ORIGIN } from '../../../../src/dependents';

const X = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const Beijing = [8.4, 7.5, 13, 16.2, 22, 24, 25.9, 29, 26.9, 20.8, 17.5, 13.2];
const Tokyo = [7.0, 7.32, 12.7, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6];
const London = [3.9, 5.2, 11.7, 13.5, 14.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8];

const Data = flattenDeep(
  X.map((x, i) => [
    {
      month: x,
      city: 'Beijing',
      temperature: Beijing[i],
    },
    {
      month: x,
      city: 'Tokyo',
      temperature: Tokyo[i],
    },
    {
      month: x,
      city: 'London',
      temperature: London[i],
    },
  ])
);

const FONT_SIZE = 12;
const OFFSET = 5 + FONT_SIZE / 2;
const FILL = 'rgba(44,53,66,.65)';
const STROKE = '#FFF';
const LINE_WIDTH = 2;

describe('Line point-auto label', () => {
  const config: LineConfig = {
    width: 600,
    height: 400,
    data: Data,
    xField: 'month',
    yField: 'temperature',
    seriesField: 'city',
    yAxis: {
      nice: true,
    },
    label: {
      visible: true,
      offset: OFFSET,
      type: 'point-auto',
      style: {
        fontSize: FONT_SIZE,
        fill: FILL,
        stroke: STROKE,
        lineWidth: LINE_WIDTH,
      },
    },
    point: {
      visible: true,
    },
  };

  it('basic', () => {
    const chart = new Line(createDiv(), config);
    chart.render();
    window.__chart__ = chart;
    const label = chart.getLayer().getLabels();
    const labelShapes = label[0]?.getLabels();

    const hiddens = [
      {
        month: 'Jan',
        city: 'Tokyo',
      },
      {
        month: 'Feb',
        city: 'Tokyo',
      },
      {
        month: 'Mar',
        city: 'Tokyo',
      },
      {
        month: 'Apr',
        city: 'Tokyo',
      },
    ];

    each(labelShapes, (label) => {
      const data = label.get(ORIGIN)[FIELD_ORIGIN];
      const isHidden = findIndex(hiddens, (item) => item.city === data['city'] && item.month === data['month']) >= 0;
      expect(label.get('visible')).toBe(!isHidden);
      expect(label.get('offset')).toBe(OFFSET);
      expect(label.attr('fontSize')).toBe(FONT_SIZE);
      expect(label.attr('fill')).toBe(FILL);
      expect(label.attr('stroke')).toBe(STROKE);
      expect(label.attr('lineWidth')).toBe(LINE_WIDTH);
      expect(label.attr('textAlign')).toBe('center');
      expect(label.attr('textBaseline')).toBe('middle');
    });
  });
});
