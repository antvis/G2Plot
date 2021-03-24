import { Liquid } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('liquid', () => {
  const liquid = new Liquid(createDiv(), {
    width: 600,
    height: 300,
    percent: 0.25,
    liquidStyle: ({ percent }) => {
      return {
        fill: percent > 0.75 ? 'red' : 'green',
      };
    },
    color: 'blue',
  });

  const getBorderColor = (liquid) => liquid.chart.middleGroup.getChildren()[0].getChildren()[2].attr('stroke');
  const getWaveColor = (liquid) =>
    liquid.chart.middleGroup.getChildren()[0].getChildren()[0].getChildren()[0].attr('fill');

  it('liquidStyle', () => {
    liquid.render();

    expect(getBorderColor(liquid)).toBe('blue'); // circle
    expect(getWaveColor(liquid)).toBe('green'); // wave path

    // @ts-ignore
    liquid.chart.getController('annotation').clear(true);

    liquid.chart.clear();

    liquid.update({
      ...liquid.options,
      percent: 0.8,
    });

    // G2 chart.clear 的时候，geometry 销毁了，但是 container 还保留的，内存泄露。
    // @ts-ignore
    expect(liquid.chart.middleGroup.getChildren()[0].getChildren()[0].getChildren()[0].attr('fill')).toBe('red'); // wave path
  });

  it('outline style', () => {
    liquid.update({
      color: 'pink',
    });

    expect(getBorderColor(liquid)).toBe('pink'); // circle
    expect(getWaveColor(liquid)).toBe('red'); // wave path

    liquid.update({ outline: { style: { stroke: 'purple', strokeOpacity: 0.2 } }, liquidStyle: undefined });
    expect(getWaveColor(liquid)).toBe('pink'); // wave path
    expect(getBorderColor(liquid)).toBe('purple'); // circle
    // @ts-ignore
    expect(liquid.chart.middleGroup.getChildren()[0].getChildren()[2].attr('strokeOpacity')).toBe(0.2);
  });

  afterAll(() => {
    liquid.destroy();
  });
});
