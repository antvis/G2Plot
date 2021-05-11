import DataSet from '@antv/data-set';
import { Lab } from '../../../../src';
import { createDiv } from '../../../utils/dom';

const { DataView } = DataSet;

describe('multi-view', () => {
  it('multi pie', () => {
    const data = [
      { value: 251, type: '大事例一', name: '子事例一' },
      { value: 1048, type: '大事例一', name: '子事例二' },
      { value: 610, type: '大事例二', name: '子事例三' },
      { value: 434, type: '大事例二', name: '子事例四' },
      { value: 335, type: '大事例三', name: '子事例五' },
      { value: 250, type: '大事例三', name: '子事例六' },
    ];

    const dv1 = new DataView();
    dv1.source(data).transform({
      type: 'percent',
      field: 'value',
      dimension: 'type',
      as: 'percent',
    });

    const dv2 = new DataView();
    dv2.source(data).transform({
      type: 'percent',
      field: 'value',
      dimension: 'name',
      as: 'percent',
    });

    const pie = new Lab.MultiView(createDiv(), {
      width: 400,
      height: 400,
      views: [
        {
          data: dv1.rows,
          meta: {
            percent: {
              formatter: (val) => {
                val = (val * 100).toFixed(2) + '%';
                return val;
              },
            },
          },
          axes: false,
          coordinate: {
            type: 'theta',
            cfg: {
              radius: 0.5,
            },
          },
          geometries: [
            {
              type: 'interval',
              xField: '1',
              yField: 'percent',
              colorField: 'type',
              tooltipFields: ['type', 'percent'],
              mapping: {
                tooltip: ({ type, percent }) => {
                  percent = (percent * 100).toFixed(2) + '%';
                  return {
                    name: type,
                    value: percent,
                  };
                },
                style: {
                  lineWidth: 1,
                  stroke: '#fff',
                },
              },
              adjust: { type: 'stack' },
            },
          ],
        },
        {
          data: dv2.rows,
          meta: {
            percent: {
              formatter: (val) => {
                val = (val * 100).toFixed(2) + '%';
                return val;
              },
            },
          },
          axes: false,
          coordinate: {
            type: 'theta',
            cfg: {
              innerRadius: 0.5 / 0.75,
              radius: 0.75,
            },
          },
          geometries: [
            {
              type: 'interval',
              xField: '1',
              yField: 'percent',
              colorField: 'name',
              tooltipFields: ['name', 'percent'],
              mapping: {
                color: ['#BAE7FF', '#7FC9FE', '#71E3E3', '#ABF5F5', '#8EE0A1', '#BAF5C4'],
                tooltip: ({ name, percent }) => {
                  percent = (percent * 100).toFixed(2) + '%';
                  return {
                    name,
                    value: percent,
                  };
                },
                style: {
                  lineWidth: 1,
                  stroke: '#fff',
                },
              },
              adjust: { type: 'stack' },
            },
          ],
        },
      ],
      tooltip: {
        showTitle: false,
        showMarkers: false,
      },
      legend: false,
    });

    pie.render();

    expect(pie.chart.getOptions().data).toEqual([]);

    expect(pie.chart.views.length).toBe(2);
    expect(pie.chart.views[0].getOptions().data).toBe(dv1.rows);
    expect(pie.chart.views[1].getOptions().data).toBe(dv2.rows);

    expect(pie.chart.views[0].geometries.length).toBe(1);
    expect(pie.chart.views[1].geometries.length).toBe(1);

    // axis
    expect(pie.chart.views[0].getOptions().axes).toBe(false);
    expect(pie.chart.views[1].getOptions().axes).toBe(false);

    // legend
    expect(pie.chart.getOptions().legends).toBe(false);
    expect(pie.chart.views[0].getOptions().legends).toEqual({ '1': false, percent: false });
    expect(pie.chart.views[1].getOptions().legends).toEqual({ '1': false, percent: false });

    // attr mapping
    // @ts-ignore
    const attr1 = pie.chart.views[0].geometries[0].attributeOption;

    expect(attr1.color).toEqual({ fields: ['type'] });
    expect(attr1.position).toEqual({ fields: ['1', 'percent'] });

    // @ts-ignore
    const attr2 = pie.chart.views[1].geometries[0].attributeOption;

    expect(attr2.color).toEqual({
      fields: ['name'],
      values: ['#BAE7FF', '#7FC9FE', '#71E3E3', '#ABF5F5', '#8EE0A1', '#BAF5C4'],
    });
    expect(attr2.position).toEqual({ fields: ['1', 'percent'] });

    pie.destroy();
  });
});
