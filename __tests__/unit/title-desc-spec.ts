import Line, { LineConfig } from '../../src/plots/line';
import * as chai from 'chai';
import LineLayer from '../../src/plots/line/layer';

const { expect } = chai;

describe('Area plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  const data = [
    {
      year: '1991',
      value: 31,
    },
    {
      year: '1992',
      value: 41,
    },
    {
      year: '1993',
      value: 35,
    },
    {
      year: '1994',
      value: 55,
    },
    {
      year: '1995',
      value: 49,
    },
    {
      year: '1996',
      value: 15,
    },
    {
      year: '1997',
      value: 17,
    },
    {
      year: '1998',
      value: 29,
    },
    {
      year: '1999',
      value: 33,
    },
  ];

  it('title, desc render', () => {
    const plot = new Line<LineConfig>(canvasDiv, {
      width: 600,
      height: 600,
      data,
      xField: 'year',
      yField: 'value',
      title: {
        visible: true,
        text: '标题',
      },
      description: {
        visible: true,
        text: '副标题',
      },
    });
    plot.render();
    const view = plot.getLayer() as LineLayer;
    expect(view.title).not.to.be.equal(null);
    expect(view.description).not.to.be.equal(null);
    const region1 = { start: view.view.get('start'), end: view.view.get('end') };
    plot.updateConfig({
      title: {
        visible: false,
      },
    });
    const region2 = { start: view.view.get('start'), end: view.view.get('end') };
    expect(region1).not.to.be.deep.equal(region2);
    expect(view.title).to.be.equal(null);
    expect(view.description).not.to.be.equal(null);
    plot.updateConfig({
      description: {
        visible: false,
      },
    });
    const region3 = { start: view.view.get('start'), end: view.view.get('end') };
    expect(view.title).to.be.equal(null);
    expect(view.description).to.be.equal(null);
    expect(region2).not.to.be.deep.equal(region3);
  });
});
