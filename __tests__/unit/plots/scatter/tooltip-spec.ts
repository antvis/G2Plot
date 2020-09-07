import { Scatter } from '../../../../src';
import { data } from '../../../data/gender';
import { createDiv } from '../../../utils/dom';

describe('scatter', () => {
  it('tooltip: title options', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      data,
      xField: 'weight',
      yField: 'height',
      size: 10,
      xAxis: {
        nice: true,
      },
      tooltip: {
        title: 'scatter',
      },
    });

    scatter.render();

    // @ts-ignore
    expect(scatter.chart.options.tooltip.title).toBe('scatter');
    scatter.update({
      ...scatter.options,
      tooltip: false,
    });
    // @ts-ignore
    expect(scatter.chart.options.tooltip).toBe(false);
    expect(scatter.chart.getComponents().find((co) => co.type === 'tooltip')).toBe(undefined);
  });

  it('tooltip: itemTpl options', () => {
    const scatter = new Scatter(createDiv(), {
      width: 400,
      height: 300,
      data,
      xField: 'weight',
      yField: 'height',
      size: 10,
      xAxis: {
        nice: true,
      },
      animation: false,
      tooltip: {
        title: 'scatter',
        showTitle: false,
        itemTpl:
          '<li class="g2-tooltip-list-item" data-index={index} style="margin-bottom:4px;">' +
          '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
          '<span class="itemTpl">{name}: </span>' +
          '{value}' +
          '</li>',
      },
    });

    scatter.render();

    const geometry = scatter.chart.geometries[0];
    const elements = geometry.elements;
    const bbox = elements[elements.length - 1].getBBox();

    // 正常渲染
    scatter.chart.showTooltip({ x: bbox.maxX, y: bbox.maxY });
    expect(document.getElementsByClassName('itemTpl')[0].innerHTML).not.toBeNull();
  });
});
