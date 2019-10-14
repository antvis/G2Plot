import { Ring } from '../../src';
import { expect } from 'chai';
import { simulate } from 'event-simulate';

describe.skip('Ring plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);
  const data = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: 'Other',
      value: 5,
    },
  ];

  it('创建 & 销毁图表', () => {
    const ringPlot = new Ring(canvasDiv, {
      data,
      angleField: 'value',
      colorField: 'type',
    });
    ringPlot.render();
    const positionField = ringPlot
      .getLayer()
      .plot.get('elements')[0]
      .get('position').fields;
    expect(ringPlot).to.be.instanceOf(Ring);
    expect(positionField[0]).to.be.equal('1');
    expect(positionField[1]).to.be.equal('value');
    ringPlot.destroy();
  });

  it('inner radius', () => {
    const ringPlot = new Ring(canvasDiv, {
      data,
      angleField: 'value',
      colorField: 'type',
      innerRadius: 0.2,
    });
    ringPlot.render();
    const coord = ringPlot.getLayer().plot.get('coord');
    expect(coord.innerRadius).to.be.equal(0.2);
    ringPlot.destroy();
  });

  it('centralText annotation', (done) => {
    const ringPlot = new Ring(canvasDiv, {
      padding: [0, 0, 0, 0],
      data,
      innerRadius: 0.1,
      angleField: 'value',
      colorField: 'type',
      annotation: [{ type: 'centralText', onActive: true }],
    });
    ringPlot.render();
    const plot = ringPlot.getLayer().plot;
    const canvas = plot.get('canvas');
    const bbox = canvas.get('el').getBoundingClientRect();
    let originData = null;
    plot.on('interval:mousemove', (e) => {
      originData = e.target.get('origin')._origin;
    });
    setTimeout(() => {
      simulate(canvas.get('el'), 'mousemove', {
        clientY: bbox.top + 200,
        clientX: bbox.left + 200,
      });
      if (originData !== null) {
        const name = document.getElementsByClassName('ring-guide-name')[0].innerHTML;
        const value = document.getElementsByClassName('ring-guide-value')[0].innerHTML;
        expect(name).to.be.equal(originData.type);
        expect(value).to.be.equal(originData.value.toString());
        ringPlot.destroy();
        done();
      }
    }, 1000);
  });
});
