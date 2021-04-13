import { DualAxes } from '../../../../src';
import { PV_DATA_MULTI, UV_DATA } from '../../../data/pv-uv';
import { createDiv } from '../../../utils/dom';
import { LEFT_AXES_VIEW, RIGHT_AXES_VIEW } from '../../../../src/plots/dual-axes/constant';
import { findViewById } from '../../../../src/utils/view';

describe('color', () => {
  it('color: userOption', () => {
    const userColor = {
      [LEFT_AXES_VIEW]: ['#f00', '#0f0'],
      [RIGHT_AXES_VIEW]: ['#00f'],
    };

    // 用户指定颜色，期望渲染为制定颜色
    const dualAxes = new DualAxes(createDiv('color: userOption'), {
      width: 400,
      height: 500,
      data: [PV_DATA_MULTI, UV_DATA],
      xField: 'date',
      yField: ['pv', 'uv'],
      geometryOptions: [
        {
          geometry: 'column',
          seriesField: 'site',
          color: userColor[LEFT_AXES_VIEW],
          isStack: true,
        },
        {
          geometry: 'line',
          color: userColor[RIGHT_AXES_VIEW][0],
          point: {},
        },
      ],
    });
    dualAxes.render();
    // Geometry 颜色
    [LEFT_AXES_VIEW, RIGHT_AXES_VIEW].forEach((viewId) => {
      const view = findViewById(dualAxes.chart, viewId);
      view.geometries.forEach((geo) => {
        const colorAttr = geo.getAttribute('color');
        expect(colorAttr.values).toEqual(userColor[viewId]);
      });
    });
    // legend 颜色
    const legendComponentItem = dualAxes.chart.getController('legend').getComponents()[0].component.cfg.items;
    legendComponentItem.forEach((legendItem, index) => {
      // lineWidth > 0, 则颜色为 stroke
      const markerStyle = legendItem.marker.style;
      const color = markerStyle.lineWidth > 0 ? markerStyle.stroke : markerStyle.fill;
      expect(color).toBe(['#f00', '#0f0', '#00f'][index]);
    });

    dualAxes.destroy();
  });
  it('color: default Option', () => {
    // 默认颜色
    const dualAxes = new DualAxes(createDiv('color: default Option'), {
      width: 400,
      height: 500,
      data: [PV_DATA_MULTI, UV_DATA],
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
          point: {},
        },
      ],
    });
    dualAxes.render();
    const { colors10 } = dualAxes.chart.getTheme();
    [LEFT_AXES_VIEW, RIGHT_AXES_VIEW].forEach((viewId) => {
      const view = findViewById(dualAxes.chart, viewId);
      view.geometries.forEach((geo) => {
        const colorAttr = geo.getAttribute('color');
        expect(colorAttr.values).toEqual(viewId === LEFT_AXES_VIEW ? colors10.slice(0, 2) : colors10.slice(2, 3));
      });
    });

    const legendComponentItem = dualAxes.chart.getController('legend').getComponents()[0].component.cfg.items;
    legendComponentItem.forEach((legendItem, index) => {
      const markerStyle = legendItem.marker.style;
      const color = markerStyle.lineWidth > 0 ? markerStyle.stroke : markerStyle.fill;
      expect(color).toBe(colors10[index]);
    });
    dualAxes.destroy();
  });

  it('color: default Option with large scale and usertheme', () => {
    // 用户指定分类

    const theme = {
      colors10: [
        '#5B8FF9',
        '#CDDDFD',
        '#5AD8A6',
        '#CDF3E4',
        '#5D7092',
        '#CED4DE',
        '#F6BD16',
        '#FCEBB9',
        '#6F5EF9',
        '#D3CEFD',
      ],
    };

    const columnData = [
      { name: 'London', month: 'Jan.', value: 12.9, type: '语文' },
      { name: 'London', month: 'Jan.', value: 10.9, type: '数学' },
      { name: 'London', month: 'Jan.', value: 120.9, type: '英语' },
      { name: 'London', month: 'Jan.', value: 12.9, type: '体育' },
      { name: 'Berlin', month: 'Jan.', value: 12.4, type: '美术' },
      { name: 'Berlin', month: 'Jan.', value: 12.4, type: '线性代数' },
      { name: 'beijing', month: 'Jan.', value: 12.4, type: '高数' },
      { name: 'London', month: 'Feb.', value: 2.9, type: '语文' },
      { name: 'London', month: 'Feb.', value: 5.9, type: '数学' },
      { name: 'London', month: 'Feb.', value: 10.9, type: '英语' },
      { name: 'London', month: 'Feb.', value: 12.9, type: '体育' },
      { name: 'Berlin', month: 'Feb.', value: 22.4, type: '美术' },
      { name: 'Berlin', month: 'Feb.', value: 32.4, type: '线性代数' },
      { name: 'beijing', month: 'Feb.', value: 42.4, type: '高数' },
    ];

    const lineData = [
      { name: '福老师', month: 'Jan.', value: 12.9 },
      { name: '逍老师', month: 'Jan.', value: 1.4 },
      { name: '新老师', month: 'Jan.', value: 2.4 },
      { name: '福老师1', month: 'Jan.', value: 13.9 },
      { name: '逍老师1', month: 'Jan.', value: 2.4 },
      { name: '新老师1', month: 'Jan.', value: 5.4 },
      { name: '福老师', month: 'Feb.', value: 18.9 },
      { name: '逍老师', month: 'Feb.', value: 13.4 },
      { name: '新老师', month: 'Feb.', value: 15.4 },
      { name: '福老师1', month: 'Feb.', value: 7.9 },
      { name: '逍老师1', month: 'Feb.', value: 9.4 },
      { name: '新老师1', month: 'Feb.', value: 10.4 },
    ];

    const dualAxes = new DualAxes(createDiv('color: userOption'), {
      width: 400,
      height: 500,
      data: [columnData, lineData],
      xField: 'month',
      yField: ['value', 'value'],
      geometryOptions: [
        {
          geometry: 'column',
          isGroup: true,
          isStack: true,
          seriesField: 'type',
          groupField: 'name',
        },
        {
          geometry: 'line',
          seriesField: 'name',
          isStack: true,
          smooth: true,
          point: {},
        },
      ],
      theme,
    });
    dualAxes.render();
    const { colors10 } = dualAxes.chart.getTheme();
    [LEFT_AXES_VIEW, RIGHT_AXES_VIEW].forEach((viewId) => {
      const view = findViewById(dualAxes.chart, viewId);
      view.geometries.forEach((geo) => {
        const colorAttr = geo.getAttribute('color');
        expect(colorAttr.values).toEqual(
          viewId === LEFT_AXES_VIEW ? colors10.slice(0, 7) : colors10.slice(7, 10).concat(colors10)
        );
      });
    });

    const legendComponentItem = dualAxes.chart.getController('legend').getComponents()[0].component.cfg.items;
    legendComponentItem.forEach((legendItem, index) => {
      const markerStyle = legendItem.marker.style;
      const color = markerStyle.lineWidth > 0 ? markerStyle.stroke : markerStyle.fill;
      expect(color).toBe(colors10.concat(colors10)[index]);
    });
    dualAxes.destroy();
  });
});
