import { TooltipCfg } from '@antv/g2/lib/interface';
import { TinyArea } from '../../../../src';
import { DEFAULT_OPTIONS } from '../../../../src/plots/tiny-area/constants';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('tiny-area: pattern', () => {
  const tinyArea = new TinyArea(createDiv(), {
    width: 200,
    height: 100,
    data: partySupport
      .filter((o) => o.type === 'FF')
      .map((item) => {
        return item.value;
      }),
    line: {},
    autoFit: false,
  });

  tinyArea.render();

  it('pattern: obj', () => {
    tinyArea.update({
      pattern: {
        type: 'line',
      },
    });

    const geometry = tinyArea.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(true);

    tinyArea.update({
      pattern: null,
    });

    expect(tinyArea.chart.geometries[0].elements[0].shape.attr('fill') instanceof CanvasPattern).toEqual(false);
  });

  afterAll(() => {
    tinyArea.destroy();
  });
});
