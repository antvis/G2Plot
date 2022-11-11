import { DualAxes } from '../../../../src';
import { LEFT_AXES_VIEW, RIGHT_AXES_VIEW } from '../../../../src/plots/dual-axes/constant';
import { findViewById } from '../../../../src/utils/view';
import { PV_DATA_MULTI, UV_DATA_MULTI } from '../../../data/pv-uv';
import { createDiv } from '../../../utils/dom';

describe('dualAxes: annotation', () => {
  const dualAxes = new DualAxes(createDiv('test DualAxes annotation'), {
    width: 400,
    height: 500,
    data: [PV_DATA_MULTI, UV_DATA_MULTI],
    xField: 'date',
    yField: ['pv', 'uv'],
    geometryOptions: [
      {
        geometry: 'column',
        seriesField: 'site',
        isStack: true,
      },
      {
        geometry: 'line',
        seriesField: 'site',
        isStack: true,
        point: {},
      },
    ],
  });
  dualAxes.render();

  it('text annotation', () => {
    dualAxes.update({
      ...dualAxes.options,
      annotations: {
        pv: [
          {
            type: 'text',
            position: ['median', 'max'],
            content: '左轴',
          },
        ],
        uv: [
          {
            type: 'text',
            position: ['min', 'max'],
            content: '右轴',
          },
          {
            type: 'dataMarker',
            top: true,
            position: ['0606', 5000],
            line: {
              length: 20,
            },
            text: {
              content: '2019-05, 发布新版本',
              style: {
                textAlign: 'left',
              },
            },
          },
        ],
      },
    });
    const leftView = findViewById(dualAxes.chart, LEFT_AXES_VIEW);
    const rightView = findViewById(dualAxes.chart, RIGHT_AXES_VIEW);
    expect(leftView.getController('annotation').getComponents().length).toBe(1);
    expect(leftView.getController('annotation').getComponents()[0].component.get('content')).toBe('左轴');
    expect(rightView.getController('annotation').getComponents().length).toBe(2);
    expect(rightView.getController('annotation').getComponents()[0].component.get('content')).toBe('右轴');
    expect(rightView.getController('annotation').getComponents()[1].component.get('type')).toBe('dataMarker');
  });

  afterAll(() => {
    dualAxes.destroy();
  });
});
