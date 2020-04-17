import { Line, ViewLayer } from '../../../src';
import { fireWorks } from '../../data/fireworks-sales';
import { createDiv } from '../../utils/dom';
import SliderInteraction from '../../../src/interaction/slider';

describe('Slider', () => {
  const div = createDiv('root-slider');
  const plot = new Line(document.getElementById('root-slider'), {
    data: fireWorks,
    height: 400,
    width: 500,
    xField: 'Data',
    yField: 'scales',
    meta: {
      Data: {
        type: 'cat',
      },
    },
    interactions: [
      {
        type: 'slider',
      },
    ],
  });

  plot.render();

  it('slider rendered', () => {
    const layer = plot.getLayer() as ViewLayer;
    const interaction = layer.getInteractions()[0];

    expect(interaction).toBeInstanceOf(SliderInteraction);
  });

  it('slider style', () => {
    plot.updateConfig({
      interactions: [
        {
          type: 'slider',
          cfg: {
            backgroundStyle: {
              fill: 'red',
            },
            foregroundStyle: {
              fill: 'yellow',
            },
            textStyle: {
              fontSize: 16,
            },
            handlerStyle: {
              fill: '#CCC',
            },
            trendCfg: {
              isArea: true,
              lineStyle: {
                stroke: 'blue',
              },
            },
          },
        },
      ],
    });
    plot.render();
    const layer = plot.getLayer() as ViewLayer;
    const interaction = layer.getInteractions()[0] as SliderInteraction;
    // @ts-ignore
    const slider = interaction.slider;

    expect(slider.get('backgroundStyle').fill).toBe('red');
    expect(slider.get('foregroundStyle').fill).toBe('yellow');
    expect(slider.get('textStyle').fontSize).toBe(16);
    expect(slider.get('handlerStyle').fill).toBe('#CCC');
    expect(slider.get('trendCfg').isArea).toBe(true);
    expect(slider.get('trendCfg').lineStyle.stroke).toBe('blue');
  });

  afterAll(() => {
    plot.destroy();
    div.remove();
  });
});
