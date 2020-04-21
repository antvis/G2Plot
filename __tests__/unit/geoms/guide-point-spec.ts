import { Area } from '../../../src';

describe('guide point', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '600px';
  canvasDiv.style.height = '600px';
  canvasDiv.style.left = '30px';
  canvasDiv.style.top = '30px';
  canvasDiv.id = 'canvas1';
  document.body.appendChild(canvasDiv);

  it('无colorField且没配置color或style时，辅助数据点正常显示', () => {
    const data = [
      { area: '东北', sales: 2681567.469000001 },
      { area: '中南', sales: 4137415.0929999948 },
      { area: '华东', sales: 4684506.442 },
      { area: '华北', sales: 2447301.017000004 },
      { area: '西北', sales: 815039.5959999998 },
      { area: '西南', sales: 1303124.508000002 },
    ];

    const areaPlot = new Area(canvasDiv, {
      data,
      xField: 'area',
      yField: 'sales',
      point: {
        visible: true,
      },
    });
    areaPlot.render();

    const geometries = areaPlot.getLayers()[0].view.geometries;
    const pointGeom = geometries[2];
    expect(pointGeom.type).toBe('point');
    const shapes = pointGeom.getShapes();
    const defaultColor = areaPlot.getPlotTheme().defaultColor;
    expect(shapes[0].attr('stroke')).toBe(defaultColor);
    areaPlot.destroy();
  });
});
