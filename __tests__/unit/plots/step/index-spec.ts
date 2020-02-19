import { StepLine } from '../../../../src';
import { StepLineLayer } from '../../../../src/plots/step-line/layer';

const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];

describe('Step plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  it('step', () => {
    const step = new StepLine(canvasDiv, {
      width: 600,
      height: 600,
      data,
      xField: 'year',
      yField: 'value',
      step: 'vh',
    });
    step.render();
    const layer = step.getLayer() as StepLineLayer;
    const plot = layer.getPlot();

    const positionField = plot.geometries[0].getAttribute('position').getFields();
    expect(step).toBeInstanceOf(StepLine);
    expect(positionField[0]).toBe('year');
    expect(positionField[1]).toBe('value');

    expect(layer.type).toBe('step-line');
    expect(layer.options.step).toBe('vh');

    step.destroy();
    expect(plot.destroyed).toBe(true);
  });
});
