import { DualAxes } from '../../../../src';
import { line } from '../../../../src/adaptor/geometries';
import { PV_DATA, UV_DATA_MULTI } from '../../../data/pv-uv';
import { createDiv } from '../../../utils/dom';

describe('DualAxes dualline', () => {
  it('Doubal Line', () => {
    document.body.append('test DualAxes doubal line');

    const dualAxes = new DualAxes(createDiv(), {
      width: 400,
      height: 500,
      data: [PV_DATA, UV_DATA_MULTI],
      xField: 'date',
      yField: ['pv', 'uv'],
      geometryOptions: [
        {
          geometry: 'line',
          smooth: true,
          connectNulls: false,
          lineStyle: {
            lineWidth: 3,
            lineDash: [5, 5],
            stroke: '#f00',
          },
        },
        {
          geometry: 'line',
          seriesField: 'site',
          color: (obj) => {
            return obj.site === 'a' ? '#0f0' : '#0ff';
          },
        },
      ],
    });

    dualAxes.render();

    // line
    const leftLineGeometry = dualAxes.chart.views[0].geometries.find((g) => g.type === 'line');
    const leftModel = leftLineGeometry.elements[0].getModel();
    const rightLineGeometry = dualAxes.chart.views[1].geometries.find((g) => g.type === 'line');

    // @ts-ignore
    expect(leftModel.connectNulls).toBe(false);
    expect(leftModel.shape).toEqual('smooth');
    expect(leftModel.style.lineWidth).toEqual(3);
    expect(leftModel.style.lineDash).toEqual([5, 5]);
    expect(leftModel.style.stroke).toEqual('#f00');

    expect(rightLineGeometry.elements.length).toBe(3);
    expect(rightLineGeometry.elements[0].getModel().color).toBe('#0f0');
    expect(rightLineGeometry.elements[1].getModel().color).toBe('#0ff');
    expect(rightLineGeometry.elements[2].getModel().color).toBe('#0ff');

    // @ts-ignore
    expect(rightLineGeometry.attributes.shape.values).toEqual(['line']);

    dualAxes.destroy();
  });
});
