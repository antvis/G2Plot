import { Scatter } from '../../../../src';
import { delay } from '../../../utils/delay';
import { createDiv } from '../../../utils/dom';

const data = [
  { x: 1, y: 4.181 },
  { x: 2, y: 4.665 },
  { x: 3, y: 5.296 },
  { x: 4, y: 5.365 },
  { x: 5, y: 5.448 },
  { x: 6, y: 5.744 },
  { x: 7, y: 5.653 },
  { x: 8, y: 5.844 },
  { x: 9, y: 6.362 },
  { x: 10, y: 6.38 },
  { x: 11, y: 6.311 },
  { x: 12, y: 6.457 },
  { x: 13, y: 6.479 },
  { x: 14, y: 6.59 },
  { x: 15, y: 6.74 },
  { x: 16, y: 6.58 },
  { x: 17, y: 6.852 },
  { x: 18, y: 6.531 },
  { x: 19, y: 6.682 },
  { x: 20, y: 7.013 },
  { x: 21, y: 6.82 },
  { x: 22, y: 6.647 },
  { x: 23, y: 6.951 },
  { x: 24, y: 7.121 },
  { x: 25, y: 7.143 },
  { x: 26, y: 6.914 },
  { x: 27, y: 6.941 },
  { x: 28, y: 7.226 },
  { x: 29, y: 6.898 },
  { x: 30, y: 7.392 },
  { x: 31, y: 6.938 },
];

describe('scatter', () => {
  it('regressionLine: type', () => {
    const scatter = new Scatter(createDiv('regressionLine'), {
      data,
      width: 400,
      height: 300,
      appendPadding: 10,
      xField: 'x',
      yField: 'y',
      size: 5,
      pointStyle: {
        stroke: '#777777',
        lineWidth: 1,
        fill: '#5B8FF9',
      },
      regressionLine: {
        type: 'quad', // linear, exp, loess, log, poly, pow, quad
        style: {
          stroke: 'red',
        },
      },
    });

    scatter.render();

    const geometry = scatter.chart.geometries[0];
    const annotation = scatter.chart.annotation();
    // @ts-ignore
    const options = annotation.option[0];
    expect(options.type).toBe('shape');
    const elements = geometry.elements;
    expect(elements.length).toBe(31);
    // @ts-ignore
    expect(elements[0].getModel().style.fill).toBe('#5B8FF9');
    expect(elements[0].getModel().size).toBe(5);

    scatter.destroy();
  });

  it('regressionLine: algorithm', async () => {
    const scatter = new Scatter(createDiv('regressionLine*algorithm'), {
      data,
      width: 400,
      height: 300,
      appendPadding: 10,
      xField: 'x',
      yField: 'y',
      size: 5,
      pointStyle: {
        stroke: '#777777',
        lineWidth: 1,
        fill: '#5B8FF9',
      },
      animation: false,
      regressionLine: {
        algorithm: [
          [8, 6],
          [16, 7],
          [24, 7],
        ],
      },
    });

    scatter.render();
    await delay(100);
    const geometry = scatter.chart.geometries[0];
    const annotation = scatter.chart.annotation();
    // @ts-ignore
    const options = annotation.option[0];
    expect(options.type).toBe('shape');
    const elements = geometry.elements;
    expect(elements.length).toBe(31);
    // @ts-ignore
    expect(elements[0].getModel().style.fill).toBe('#5B8FF9');
    expect(elements[0].getModel().size).toBe(5);
    const { width } = scatter.chart;
    const pathGroup = scatter.chart
      .getComponents()
      .find((item) => item.type === 'annotation')
      .component.cfg.group.cfg.children[0].getChildren();
    const { path } = pathGroup?.[0]?.cfg?.attrs;
    expect(path.length).toBe(3);
    expect(scatter.chart.getXScale().scale(8) * width < path[0][1]).toBeTruthy();

    scatter.destroy();
  });

  it('regressionLine: algorithm callback', async () => {
    const scatter = new Scatter(createDiv('regressionLine*algorithm'), {
      data,
      width: 400,
      height: 300,
      appendPadding: 10,
      xField: 'x',
      yField: 'y',
      size: 5,
      pointStyle: {
        stroke: '#777777',
        lineWidth: 1,
        fill: '#5B8FF9',
      },
      animation: false,
      regressionLine: {
        algorithm: () => {
          return [
            [8, 6],
            [16, 7],
            [24, 7],
          ];
        },
      },
    });

    scatter.render();
    await delay(100);
    const { width } = scatter.chart;
    const pathGroup = scatter.chart
      .getComponents()
      .find((item) => item.type === 'annotation')
      .component.cfg.group.cfg.children[0].getChildren();
    const { path } = pathGroup?.[0]?.cfg?.attrs;
    expect(path.length).toBe(3);
    expect(scatter.chart.getXScale().scale(8) * width < path[0][1]).toBeTruthy();

    scatter.destroy();
  });

  it('regressionLine: nonealgorithm', async () => {
    const scatter = new Scatter(createDiv('regressionLine*algorithm'), {
      data,
      width: 400,
      height: 300,
      appendPadding: 10,
      xField: 'x',
      yField: 'y',
      size: 5,
      animation: false,
      regressionLine: {},
    });

    scatter.render();
    await delay(100);
    const pathGroup = scatter.chart
      .getComponents()
      .find((item) => item.type === 'annotation')
      .component.cfg.group.cfg.children[0].getChildren();
    const { path } = pathGroup?.[0]?.cfg?.attrs;
    expect(path.length).toBe(2); // linear

    scatter.destroy();
  });
  it('regressionLine: top', async () => {
    const scatter = new Scatter(createDiv('regressionLine*top'), {
      data,
      width: 400,
      height: 300,
      appendPadding: 10,
      xField: 'x',
      yField: 'y',
      size: 5,
      pointStyle: {
        stroke: '#777777',
        lineWidth: 1,
        fill: '#5B8FF9',
      },
      animation: false,
      regressionLine: {
        top: true, // top true
      },
    });

    scatter.render();
    await delay(100);
    const pathGroup = scatter.chart.getComponents().find((item) => item.type === 'annotation');
    expect(pathGroup?.layer).toBe('fore');
    scatter.update({
      regressionLine: {
        top: false, // top false
      },
    });
    await delay(100);
    const currentPathGroup = scatter.chart.getComponents().find((item) => item.type === 'annotation');
    expect(currentPathGroup?.layer).toBe('bg');
    scatter.update({
      regressionLine: {}, // default
    });
    await delay(100);
    expect(scatter.chart.getComponents().find((item) => item.type === 'annotation')?.layer).toBe('bg');
    scatter.destroy();
  });

  it('regressionLine: showEquation: default(false)', async () => {
    const scatter = new Scatter(createDiv('regressionLine'), {
      data,
      width: 400,
      height: 300,
      xField: 'x',
      yField: 'y',
      animation: false,
      regressionLine: {
        type: 'linear',
      },
    });

    scatter.render();

    const annotationShapes = scatter?.chart
      ?.getComponents()
      ?.find((item) => item.type === 'annotation')
      ?.component.cfg.group.cfg.children[0].getChildren();
    const regressionLineShape = annotationShapes?.[0];
    expect(regressionLineShape).not.toBeNull();
    const equationShape = annotationShapes?.find((shape) => shape?.cfg?.name === 'regression-equation');
    expect(equationShape).toBeUndefined();

    scatter.destroy();
  });

  it('regressionLine: showEquation: true', async () => {
    const scatter = new Scatter(createDiv('regressionLine'), {
      data,
      width: 400,
      height: 300,
      xField: 'x',
      yField: 'y',
      animation: false,
      regressionLine: {
        type: 'linear',
        showEquation: true,
      },
    });

    scatter.render();

    const annotationShapes = scatter?.chart
      ?.getComponents()
      ?.find((item) => item.type === 'annotation')
      ?.component.cfg.group.cfg.children[0].getChildren();
    const equationShape = annotationShapes?.find((shape) => shape?.cfg?.name === 'regression-equation');

    expect(equationShape).not.toBeUndefined();
    expect(equationShape?.attrs?.text).toMatch(/^y =/);

    scatter.destroy();
  });

  it('regressionLine: equation string with customize algorithm', async () => {
    const mockEquation = 'y = x';
    const scatter = new Scatter(createDiv('regressionLine'), {
      data,
      width: 400,
      height: 300,
      xField: 'x',
      yField: 'y',
      animation: false,
      regressionLine: {
        type: 'linear',
        showEquation: true,
        equation: mockEquation,
        algorithm: [
          [1, 1],
          [2, 2],
          [3, 3],
        ],
      },
    });

    scatter.render();

    const annotationShapes = scatter?.chart
      ?.getComponents()
      ?.find((item) => item.type === 'annotation')
      ?.component.cfg.group.cfg.children[0].getChildren();
    const equationShape = annotationShapes?.find((shape) => shape?.cfg?.name === 'regression-equation');

    expect(equationShape).not.toBeUndefined();
    expect(equationShape?.attrs?.text).toBe(mockEquation);

    scatter.destroy();
  });

  it('regressionLine: equation function with customize algorithm', async () => {
    const mockEquation = 'y = x';
    const scatter = new Scatter(createDiv('regressionLine'), {
      data,
      width: 400,
      height: 300,
      xField: 'x',
      yField: 'y',
      animation: false,
      regressionLine: {
        type: 'linear',
        showEquation: true,
        equation: () => mockEquation,
        algorithm: [
          [1, 1],
          [2, 2],
          [3, 3],
        ],
      },
    });

    scatter.render();

    const annotationShapes = scatter?.chart
      ?.getComponents()
      ?.find((item) => item.type === 'annotation')
      ?.component.cfg.group.cfg.children[0].getChildren();
    const equationShape = annotationShapes?.find((shape) => shape?.cfg?.name === 'regression-equation');

    expect(equationShape).not.toBeUndefined();
    expect(equationShape?.attrs?.text).toBe(mockEquation);

    scatter.destroy();
  });

  it('regressionLine: equation string without customize algorithm', async () => {
    const mockEquation = 'y = x';
    const scatter = new Scatter(createDiv('regressionLine'), {
      data,
      width: 400,
      height: 300,
      xField: 'x',
      yField: 'y',
      animation: false,
      regressionLine: {
        type: 'linear',
        showEquation: true,
        equation: mockEquation,
      },
    });

    scatter.render();

    const annotationShapes = scatter?.chart
      ?.getComponents()
      ?.find((item) => item.type === 'annotation')
      ?.component.cfg.group.cfg.children[0].getChildren();
    const equationShape = annotationShapes?.find((shape) => shape?.cfg?.name === 'regression-equation');

    expect(equationShape).not.toBeUndefined();
    expect(equationShape?.attrs?.text).not.toBe(mockEquation);

    scatter.destroy();
  });

  it('regressionLine: equation string and disabled showEquation', async () => {
    const mockEquation = 'y = x';
    const scatter = new Scatter(createDiv('regressionLine'), {
      data,
      width: 400,
      height: 300,
      xField: 'x',
      yField: 'y',
      animation: false,
      regressionLine: {
        type: 'linear',
        showEquation: false,
        equation: mockEquation,
        algorithm: [
          [1, 1],
          [2, 2],
          [3, 3],
        ],
      },
    });

    scatter.render();

    const annotationShapes = scatter?.chart
      ?.getComponents()
      ?.find((item) => item.type === 'annotation')
      ?.component.cfg.group.cfg.children[0].getChildren();
    const equationShape = annotationShapes?.find((shape) => shape?.cfg?.name === 'regression-equation');

    expect(equationShape).toBeUndefined();

    scatter.destroy();
  });

  it('regressionLine: textStyle', async () => {
    const scatter = new Scatter(createDiv('regressionLine'), {
      data,
      width: 400,
      height: 300,
      xField: 'x',
      yField: 'y',
      animation: false,
      regressionLine: {
        type: 'linear',
        showEquation: true,
        textStyle: {
          fontSize: 24,
        },
      },
    });

    scatter.render();

    const annotationShapes = scatter?.chart
      ?.getComponents()
      ?.find((item) => item.type === 'annotation')
      ?.component.cfg.group.cfg.children[0].getChildren();
    const equationShape = annotationShapes?.find((shape) => shape?.cfg?.name === 'regression-equation');

    expect(equationShape).not.toBeUndefined();
    expect(equationShape?.attrs?.fontSize).toBe(24);

    scatter.destroy();
  });
});
