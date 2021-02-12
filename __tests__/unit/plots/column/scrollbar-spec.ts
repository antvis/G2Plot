import { Column } from '../../../../src';
import { salesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';
import { delay } from '../../../utils/delay';

describe('column', () => {
  it('scrollbar style', async () => {
    const column = new Column(createDiv('x*y'), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'area',
      yField: 'sales',
      scrollbar: {
        style: {
          thumbColor: 'red',
        },
      },
    });

    column.render();

    await delay(1);
    // @ts-ignore
    const thumb = column.chart
      .getComponents()
      .filter((co) => co.type === 'scrollbar')[0]
      // @ts-ignore
      .component.getElementByLocalId('thumb');
    expect(thumb.attr('stroke')).toBe('red');

    column.destroy();
  });
});
