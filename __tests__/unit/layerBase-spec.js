import { expect } from 'chai';
import * as G from '@antv/g';
import Layer from '../../src/base/Layer-refactor';

/* describe('base layer', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.id = 'canvas';
  document.body.appendChild(canvasDiv);

  const canvas = new G.Canvas({
    containerId: 'canvas',
    width: 600,
    height: 600,
  });

  it('create & destroy', () => {
    const layer = new Layer({
      width: 500,
      height: 500,
      canvas: canvas,
    });
    expect(layer.x).to.be.equal(0);
    expect(layer.y).to.be.equal(0);
    expect(layer.width).to.be.equal(500);
    expect(layer.height).to.be.equal(500);
    expect(layer.layerBBox.minX).to.be.equal(0);
    expect(layer.layerBBox.minY).to.be.equal(0);
    expect(layer.layerBBox.maxX).to.be.equal(500);
    expect(layer.layerBBox.maxY).to.be.equal(500);
    expect(layer.layerRegion.start.x).to.be.equal(0);
    expect(layer.layerRegion.end.y).to.be.equal(1);
    layer.destroy();
    expect(layer.destroyed).to.be.true;
    expect(layer.container.destroyed).to.be.true;
  });

  it('layer position', () => {
    const layer = new Layer({
      x: 50,
      y: 50,
      width: 500,
      height: 500,
      canvas: canvas,
    });
    const containerMatrix = layer.container.attr('matrix');
    expect(containerMatrix[6]).to.be.equal(50);
    expect(containerMatrix[7]).to.be.equal(50);
    layer.destroy();
  });

  it('visibility', () => {
    const layer = new Layer({
      x: 50,
      y: 50,
      width: 500,
      height: 500,
      canvas: canvas,
    });
    layer.hide();
    expect(layer.visibility).to.be.false;
    expect(layer.container.get('visible')).to.be.false;
    layer.show();
    expect(layer.visibility).to.be.true;
    expect(layer.container.get('visible')).to.be.true;
    layer.destroy();
  });

  it('add & remove layer', () => {
    const layer1 = new Layer({
      id: 'a',
      x: 0,
      y: 0,
      width: 600,
      height: 600,
      canvas,
    });
    const layer2 = new Layer({
      id: 'b',
      x: 10,
      y: 10,
      width: 200,
      heiht: 300,
      canvas,
    });
    layer1.addLayer(layer2);
    expect(layer1.layers[0].id).to.be.equal('b');
    expect(layer2.parent.id).to.be.equal('a');
    layer1.removeLayer(layer2);
    expect(layer1.layers.length).to.be.equal(0);
    layer1.destroy();
    layer2.destroy();
  });

  it('update layer range', () => {
    const layer = new Layer({
      x: 10,
      y: 10,
      width: 200,
      height: 200,
      canvas,
    });
    layer.updateBBox({ x: 0, y: 0, width: 100, height: 100 });
    const { layerBBox } = layer;
    expect(layerBBox.minX).to.be.equal(0);
    expect(layerBBox.minY).to.be.equal(0);
    expect(layerBBox.maxX).to.be.equal(100);
    expect(layerBBox.maxY).to.be.equal(100);
    layer.destroy();
  });

  it('update layer range recursively', () => {
    const layer1 = new Layer({
      width: 600,
      height: 600,
      canvas,
    });
    const layer2 = new Layer({
      x: 20,
      y: 20,
      width: 200,
      height: 200,
      canvas,
    });
    layer1.addLayer(layer2);
    layer1.updateBBox({ x: 10, y: 10, width: 500, height: 500 }, true);
    const layer1Range = layer1.layerBBox;
    const layer2Range = layer2.layerBBox;
    const layer2Region = layer2.layerRegion;
    expect(layer1Range.minX).to.be.equal(10);
    expect(layer1Range.maxX).to.be.equal(510);
    expect(layer2Range.minX).to.be.equal(layer1Range.minX + layer1.width * layer2Region.start.x);
    expect(layer2Range.maxX).to.be.equal(layer1Range.minX + layer1.width * layer2Region.end.x);
    layer1.destroy();
    layer2.destroy();
  });

  it('local position', () => {
    const layer1 = new Layer({
      x: 10,
      y: 10,
      width: 600,
      height: 600,
      canvas,
    });
    const layer2 = new Layer({
      x: 20,
      y: 20,
      width: 200,
      height: 200,
      canvas,
    });
    layer1.addLayer(layer2);
    const globalPosition = layer2.getGlobalPosition();
    expect(globalPosition.x).to.be.equal(30);
    expect(globalPosition.y).to.be.equal(30);
    layer1.destroy();
    layer2.destroy();
  });
}); */
