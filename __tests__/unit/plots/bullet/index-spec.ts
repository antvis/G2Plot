import { IShape, IGroup } from '@antv/g-base';
import { Bullet } from '../../../../src';
import BulletLayer from '../../../../src/plots/bullet/layer';

describe('bullet plot', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  it('basic', () => {
    const bullet = new Bullet(canvasDiv, {
      width: 320,
      height: 200,
      data: [
        {
          measures: [10],
          targets: [90],
        },
      ],
      rangeMax: 100,
      rangeColors: ['red'],
    });
    bullet.render();
    // @ts-ignore
    window.__plot = bullet;
    const layer = bullet.getLayer() as BulletLayer;
    const plot = layer.getPlot();
    expect(bullet).toBeInstanceOf(Bullet);
    expect(layer.type).toBe('bullet');
    const panelGroup = plot.middleGroup;
    const rectGroupContainer = panelGroup.get('children').filter((g) => g.get('name') === 'rectGroups')[0];
    expect(rectGroupContainer.get('children').length).toBe(1);
    const shapes: IShape[] = rectGroupContainer.get('children');
    const rectShape = shapes.filter((s) => s.get('name') === 'bullet-rect')[0];
    expect(rectShape.attr('fill')).toBe('red');

    const frontgroundGroup = plot.foregroundGroup;
    const targetGroupContainer = frontgroundGroup.get('children').filter((g) => g.get('name') === 'targetGroups')[0];
    const targetShapes = targetGroupContainer.get('children');
    expect(targetShapes.length).toBe(1);
    // bullet.destroy();
    // expect(plot.destroyed).toBe(true);
  });

  it('自定义颜色范围区间', () => {
    const bullet = new Bullet(canvasDiv, {
      width: 320,
      height: 200,
      data: [
        {
          measures: [10],
          targets: [90],
          ranges: [0, 60, 100],
        },
      ],
      rangeMax: 100,
      rangeColors: ['red', 'blue'],
    });
    bullet.render();
    const layer = bullet.getLayer() as BulletLayer;
    const plot = layer.getPlot();
    expect(bullet).toBeInstanceOf(Bullet);
    expect(layer.type).toBe('bullet');
    const panelGroup = plot.middleGroup;
    const rectGroupContainer = panelGroup.get('children').filter((g) => g.get('name') === 'rectGroups')[0];
    expect(rectGroupContainer.get('children').length).toBe(2);
    const shapes: IShape[] = rectGroupContainer.get('children');
    const rectShapes = shapes.filter((s) => s.get('name') === 'bullet-rect');
    expect(rectShapes[0].attr('fill')).toBe('red');
    expect(rectShapes[1].attr('fill')).toBe('blue');
    bullet.destroy();
    expect(plot.destroyed).toBe(true);
  });

  it('堆叠子弹图', () => {
    const bullet = new Bullet(canvasDiv, {
      width: 320,
      height: 200,
      data: [
        {
          measures: [10, 40, 200],
          targets: [90],
          ranges: [0, 60, 100],
        },
      ],
      rangeMax: 100,
      rangeColors: ['red', 'blue'],
      title: {
        visible: true,
        text: '堆叠子弹图',
      },
    });
    bullet.render();
    const layer = bullet.getLayer() as BulletLayer;
    const plot = layer.getPlot();
    expect(bullet).toBeInstanceOf(Bullet);
    expect(layer.type).toBe('bullet');
    const panelGroup = plot.middleGroup;
    const rectGroupContainer = panelGroup.get('children').filter((g) => g.get('name') === 'rectGroups')[0];
    expect(rectGroupContainer.get('children').length).toBe(2);
    const shapes: IShape[] = rectGroupContainer.get('children');
    const rectShapes = shapes.filter((s) => s.get('name') === 'bullet-rect');
    expect(rectShapes[0].attr('fill')).toBe('red');
    expect(rectShapes[1].attr('fill')).toBe('blue');
    bullet.destroy();
    expect(plot.destroyed).toBe(true);
  });

  it('多目标值', () => {
    const bullet = new Bullet(canvasDiv, {
      width: 320,
      height: 200,
      data: [
        {
          measures: [10],
          targets: [60, 90, 99],
          ranges: [0, 60, 100],
        },
        {
          measures: [10],
          targets: [60, 90, 99],
          ranges: [0, 60, 80, 100],
        },
      ],
      rangeMax: 100,
      rangeColors: ['red', 'blue'],
    });
    bullet.render();
    const layer = bullet.getLayer() as BulletLayer;
    const plot = layer.getPlot();
    expect(bullet).toBeInstanceOf(Bullet);
    expect(layer.type).toBe('bullet');
    const frontgroundGroup = plot.foregroundGroup;
    const targetGroupContainer = frontgroundGroup.get('children').filter((g) => g.get('name') === 'targetGroups')[0];
    const targetShapes = targetGroupContainer.get('children');
    expect(targetShapes.length).toBe(6);
    // bullet.destroy();
    // expect(plot.destroyed).toBe(true);
  });

  it('分组子弹图', () => {
    const bullet = new Bullet(canvasDiv, {
      width: 320,
      height: 200,
      data: [
        {
          measures: [10],
          targets: [90],
        },
        {
          measures: [20],
          targets: [90],
        },
      ],
      rangeMax: 100,
      rangeColors: ['red'],
    });
    bullet.render();
    const layer = bullet.getLayer() as BulletLayer;
    const plot = layer.getPlot();

    expect(bullet).toBeInstanceOf(Bullet);
    expect(layer.type).toBe('bullet');
    const panelGroup = plot.middleGroup;
    const rectGroupContainer = panelGroup.get('children').filter((g) => g.get('name') === 'rectGroups')[0];
    expect(rectGroupContainer.get('children').length).toBe(2);
    const shapes: IShape[] = rectGroupContainer.get('children');
    const rectShapes = shapes.filter((s) => s.get('name') === 'bullet-rect');
    expect(rectShapes[0].attr('fill')).toBe('red');
    expect(rectShapes[1].attr('fill')).toBe('red');
    bullet.destroy();
    expect(plot.destroyed).toBe(true);
  });

  it('自定义目标值颜色', () => {
    const bullet = new Bullet(canvasDiv, {
      width: 320,
      height: 200,
      data: [
        {
          measures: [10],
          targets: [90, 100],
        },
      ],
      rangeMax: 100,
      markerColors: ['red', 'blue'],
    });
    bullet.render();
    const layer = bullet.getLayer() as BulletLayer;
    const plot = layer.getPlot();
    expect(bullet).toBeInstanceOf(Bullet);
    expect(layer.type).toBe('bullet');
    const frontgroundGroup = plot.foregroundGroup;
    const targetGroupContainer = frontgroundGroup.get('children').filter((g) => g.get('name') === 'targetGroups')[0];
    const targetShapes = targetGroupContainer.get('children');
    expect(targetShapes.length).toBe(2);
    expect(targetShapes[0].attr('fill')).toBe('red');
    expect(targetShapes[1].attr('fill')).toBe('blue');
    bullet.destroy();
    expect(plot.destroyed).toBe(true);
  });
});
