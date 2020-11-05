import { BidirectionalBar } from '../../../../src';
import { data } from '../../../data/bi-directional';
import { createDiv } from '../../../utils/dom';

describe('Bidirectional laebl', () => {
  it('x*y*label*true', () => {
    const bidirectional = new BidirectionalBar(createDiv(), {
      width: 400,
      height: 400,
      data,
      xField: 'country',
      yField: ['2016年转基因种植面积', '2016年耕地总面积'],
      label: {
        position: 'middle',
        style: {
          fill: '#fff',
        },
      },
    });
    bidirectional.render();

    const leftG = bidirectional.chart.views[0].geometries[0];
    const rightG = bidirectional.chart.views[1].geometries[0];

    // @ts-ignore
    expect(leftG.labelOption.cfg.position).toEqual('middle');
    // @ts-ignore
    expect(leftG.labelOption.cfg.style.fill).toEqual('#fff');

    // @ts-ignore
    expect(rightG.labelOption.cfg.position).toEqual('middle');
    // @ts-ignore
    expect(rightG.labelOption.cfg.style.fill).toEqual('#fff');

    bidirectional.destroy();
  });
});
