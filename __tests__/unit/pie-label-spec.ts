import { Pie } from '../../src';
import { Shape, BBox } from '@antv/g';
import * as _ from '@antv/util';
import { getElementLabels } from '@antv/g2';

const createDiv = (id: string, parent?: HTMLDivElement) => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '400px';
  canvasDiv.style.height = '400px';
  canvasDiv.style.margin = '0 auto 10px';
  canvasDiv.style.border = '1px solid #eee';
  canvasDiv.id = id;
  parent ? parent.appendChild(canvasDiv) : document.body.appendChild(canvasDiv);
  return canvasDiv;
};

const createRangeInput = (onClick: (val: number) => void, initialValue: number = 0, parentDOM?: HTMLDivElement) => {
  const spanGroup = document.createElement('span');
  const span = document.createElement('span');
  span.style.color = '#333';
  span.style.display = 'inline-block';
  span.style.fontSize = '14px';
  span.style.padding = '0 4px 0 8px';
  const rangeBtn = document.createElement('input');
  rangeBtn.type = 'range';
  rangeBtn.value = `${initialValue}`;
  span.innerHTML = `${initialValue}`;
  rangeBtn.onchange = (e) => {
    // @ts-ignore
    const value = e.target.value;
    onClick(value);
    span.innerHTML = value;
  };
  parentDOM ? parentDOM.appendChild(spanGroup) : document.body.appendChild(spanGroup);
  spanGroup.appendChild(span);
  spanGroup.appendChild(rangeBtn);
};

describe('Pie plot with outer-label', () => {
  it('get outer-label', () => {
    expect(getElementLabels('outer')).toBeDefined();
  });

  const group1 = document.createElement('div');
  document.body.appendChild(group1);
  // @ts-ignore
  group1.style = `margin: 10px auto;width: 420px;border: 1px solid #aaaaaa2b;padding: 16px;font-size: 14px;color:#333;`;
  const canvasDiv = createDiv('div1', group1);
  const pieConfig = {
    forceFit: true,
    padding: [16, 0, 0, 0],
    angleField: 'value',
    colorField: 'type',
    radius: 0.6,
    legend: {
      visible: false,
    },
    pieStyle: {
      lineWidth: 0,
    },
  };

  const data = [];
  for (let i = 0; i < 30; i++) {
    data.push({ type: `分类 ${i + 1}`, value: 400 - 10 * i });
  }

  // 记录 label 可视率
  const labelVisibleRecordDiv = document.createElement('span');
  group1.appendChild(labelVisibleRecordDiv);

  const piePlot = new Pie(canvasDiv, {
    ...pieConfig,
    data,
    label: {
      visible: true,
      type: 'outer',
      formatter: (text, item) => {
        return `${item._origin['type']} (${item._origin['value'].toFixed(2)})`;
      },
    },
  });
  piePlot.render();
  const plot = piePlot.getLayer().view;
  const element = plot.get('elements')[0];

  // 半径 切换器
  createRangeInput(
    (value) => {
      piePlot.updateConfig({ radius: value / 100 });
      piePlot.render();
      const plot = piePlot.getLayer().view;
      const element = plot.get('elements')[0];
      calcVisibleRate(element.get('labels'), labelVisibleRecordDiv);
    },
    pieConfig.radius * 100,
    group1
  );

  it('all labels visible', () => {
    const labelShapes: Shape[] = element.get('labels');
    if (data.length < 30) {
      expect(_.some(labelShapes, (l) => !l.get('visible'))).toBe(false);
    }
  });

  it('all labels outside pie', () => {
    const labelShapes: Shape[] = element.get('labels');
    const coord = plot.get('coord');
    labelShapes.forEach((label) => {
      const distX = Math.abs(coord.getCenter().x - label.attr('x'));
      const distY = Math.abs(coord.getCenter().y - label.attr('y'));
      const dist = Math.sqrt(distX * distX + distY * distY);
      expect(dist > coord.getRadius()).toBe(true);
    });
  });

  it('all visible labels inside panel', () => {
    function inPanel(panel: BBox, label: BBox): boolean {
      return (
        label.minX >= panel.minX && label.maxX <= panel.maxX && label.minY >= panel.minY && label.maxY <= panel.maxY
      );
    }
    const panel = plot.get('panelRange');
    const labelShapes: Shape[] = _.filter(element.get('labels'), (l) => l.get('visible'));
    labelShapes.forEach((l) => {
      expect(inPanel(panel, l.getBBox())).toBe(true);
    });
  });

  it('no label overlap', () => {
    function checkOverlap(a: BBox, b: BBox): boolean {
      const xOverlap = Math.max(0, Math.min(a.maxX, b.maxX) - Math.max(a.x, b.x));
      const yOverlap = Math.max(0, Math.min(a.maxY, b.maxY) - Math.max(a.y, b.y));
      if (xOverlap * yOverlap) return true;
      return false;
    }
    const labelShapes: Shape[] = _.filter(element.get('labels'), (l) => l.get('visible'));
    labelShapes.forEach((l, idx) => {
      for (let i = 0; i < labelShapes.length; i++) {
        if (i !== idx) {
          expect(checkOverlap(l.getBBox(), labelShapes[i].getBBox())).toBe(false);
        }
      }
    });
  });

  function calcVisibleRate(labelShapes: Shape[], div: HTMLElement) {
    const visibleLabels: Shape[] = _.filter(labelShapes, (l) => l.get('visible'));

    const visibleRate = visibleLabels.length / labelShapes.length;
    div.innerHTML = `label 可见率: ${visibleRate * 100}%`;
    return visibleRate;
  }

  it('when label offset < 0, all labels still outside element', () => {
    const canvasDiv = createDiv('canvas-2');
    const piePlot1 = new Pie(canvasDiv, {
      ...pieConfig,
      data,
      radius: 0.5,
      label: {
        visible: true,
        type: 'outer',
        offset: -1,
        formatter: (text, item) => {
          return `${item._origin['type']} (${item._origin['value'].toFixed(2)})`;
        },
      },
    });
    piePlot1.render();
    const plot = piePlot1.getLayer().view;
    const element = plot.get('elements')[0];
    const labelShapes: Shape[] = element.get('labels');
    const coord = plot.get('coord');
    labelShapes.forEach((label) => {
      const labelBox = label.getBBox();
      const labelCenter = { x: (labelBox.minX + labelBox.maxX) / 2, y: (labelBox.minY + labelBox.maxY) / 2 };
      const distX = Math.abs(coord.getCenter().x - labelCenter.x);
      const distY = Math.abs(coord.getCenter().y - labelCenter.y);
      const dist = Math.sqrt(distX * distX + distY * distY);
      expect(dist > coord.getRadius()).toBe(true);
    });
  });

  afterAll(() => {
    // piePlot.destroy();
  });
});
