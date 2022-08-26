import { Facet } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('facet animation', () => {
  const data = [
    { type: '1', date: '2014-01', value: 1, name: 'a' },
    { type: '1', date: '2015-01', value: 1, name: 'b' },
    { type: '1', date: '2016-01', value: 1, name: 'c' },
    { type: '1', date: '2017-01', value: 1, name: 'd' },
    { type: '2', date: '2014-01', value: 1, name: 'a' },
    { type: '2', date: '2015-01', value: 1, name: 'b' },
    { type: '2', date: '2016-01', value: 1, name: 'a' },
    { type: '2', date: '2017-01', value: 1, name: 'd' },
    { type: '3', date: '2014-01', value: 1, name: 'b' },
    { type: '4', date: '2015-01', value: 1, name: 'd' },
    { type: '4', date: '2016-01', value: 10, name: 'b' },
    { type: '4', date: '2017-01', value: 1, name: 'c' },
  ];
  const plot = new Facet(createDiv(), {
    data,
    type: 'rect',
    fields: ['type'],
    eachView: () => {
      return {
        geometries: [
          { type: 'interval', xField: 'date', yField: 'value', colorField: 'name', mapping: {} },
          { type: 'point', xField: 'date', yField: 'value', colorField: 'name', mapping: {} },
        ],
        animation: {
          appear: {
            animation: 'fade-in',
            duration: 3500,
          },
          leave: {
            animation: 'wave-in',
            duration: 200,
          },
        },
      };
    },
    meta: { date: { sync: true } },
  });
  plot.render();

  it('default animation', () => {
    const geometries = plot.chart.views[0].geometries;

    expect(geometries[0].animateOption).toMatchObject({
      appear: {
        animation: 'fade-in',
        duration: 3500,
      },
      leave: {
        animation: 'wave-in',
        duration: 200,
      },
    });
  });

  it('callback animation', () => {
    plot.update({
      eachView: () => {
        return {
          geometries: [
            { type: 'interval', xField: 'date', yField: 'value', colorField: 'name', mapping: {} },
            { type: 'point', xField: 'date', yField: 'value', colorField: 'name', mapping: {} },
          ],
          animation: (type) => ({
            appear: {
              animation: type === 'point' ? 'fade-in' : 'wave-in',
              duration: 500,
            },
            leave: {
              animation: type === 'interval' ? 'fade-out' : 'wave-out',
              duration: 300,
            },
          }),
        };
      },
    });

    const geometries = plot.chart.views[0].geometries;

    expect(geometries[0].animateOption).toMatchObject({
      appear: {
        animation: 'wave-in',
        duration: 500,
      },
      leave: {
        animation: 'fade-out',
        duration: 300,
      },
    });

    expect(geometries[1].animateOption).toMatchObject({
      appear: {
        animation: 'fade-in',
        duration: 500,
      },
      leave: {
        animation: 'wave-out',
        duration: 300,
      },
    });
  });

  afterAll(() => {
    plot.destroy();
  });
});
