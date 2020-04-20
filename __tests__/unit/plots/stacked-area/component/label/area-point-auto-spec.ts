import { flattenDeep, filter, each, findIndex } from '@antv/util';
import { StackedArea, StackedAreaConfig } from '../../../../../../src';
import AreaPointAutoLabel from '../../../../../../src/plots/area/component/label/area-point-auto';
import { IShape, ORIGIN, FIELD_ORIGIN } from '../../../../../../src/dependents';
import { createDiv } from '../../../../../utils/dom';

const X = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const Beijing = [8.4, 2.5, 13, 16.2, 22, 24, 25.9, 3, 26.9, 20.8, 17.5, 13.2];
const Tokyo = [7.0, 7.32, 12.7, 14.5, 18.4, 21.5, 25.2, 4.5, 23.3, 18.3, 13.9, 9.6];
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
const FILL = 'rgba(44,53,66,.65)';
const STROKE = '#FFF';
const LINE_WIDTH = 2;
const COLOR_PLATE = [
  '#55A6F3',
  '#5E748C',
  '#FB9747',
  '#DE5845',
  '#52BFC0',
  '#22A34C',
  '#F1BE2A',
  '#93684E',
  '#FF9CB7',
  '#A462BF',
];

describe('StackedArea Point Label', () => {
  const config: StackedAreaConfig = {
    width: 600,
    height: 400,
    data: filter(Data, (datum) => datum.city === 'Beijing'),
    xField: 'month',
    yField: 'temperature',
    stackField: 'city',
    yAxis: {
      nice: true,
    },
    label: {
      visible: true,
      type: 'stackedArea-point-auto',
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

  it('multiple series', () => {
    const plot = new StackedArea(createDiv(), {
      ...config,
      data: Data,
      seriesField: 'city',
      color: COLOR_PLATE,
    });
    plot.render();
    const label = plot.getLayer().getLabels()[0];
    const labelShapes = label.getLabels();
    const hiddens = [
      {
        month: 'Feb',
        city: 'Tokyo',
      },
      {
        month: 'Aug',
        city: 'Tokyo',
      },
    ];
    expect(label).toBeInstanceOf(AreaPointAutoLabel);
    each(labelShapes, (labelShape: IShape) => {
      const data = labelShape.get(ORIGIN)[FIELD_ORIGIN];
      const isHidden = findIndex(hiddens, (item) => item.month === data['month'] && item.city === data['city']) >= 0;
      expect(labelShape.get('visible')).toBe(!isHidden);
    });
  });
});
