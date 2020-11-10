import { adapteStyle, setStatisticContainerStyle } from '../../../../../src/utils/statistic';
import { ShapeStyle } from '../../../../../src/types';
import { createDiv } from '../../../../utils/dom';

describe('饼图 statistics 相关处理函数', () => {
  it('adapteStyle', () => {
    const style = {
      fontSize: '12px',
      lineHeight: '12px',
    };
    expect(adapteStyle(style)).toMatchObject({
      'font-size': '12px',
      'line-height': '12px',
    });
  });

  it('adapteStyle 兼容 shapeStyle', () => {
    const style: ShapeStyle = {
      shadowBlur: 5,
      shadowOffsetY: 2,
      shadowColor: 'red',
    };

    // @ts-ignore
    expect(adapteStyle(style)).toMatchObject({
      'text-shadow': 'red 0px 2px 5px',
    });

    const style1: ShapeStyle = {
      fill: 'red',
      lineWidth: 1,
      stroke: 'green',
    };
    // @ts-ignore
    expect(adapteStyle(style1)).toMatchObject({
      color: 'red',
      '-webkit-text-stroke': '1px green',
    });
  });

  it('设置statistics容器样式', () => {
    const container = createDiv();
    setStatisticContainerStyle(container, { color: '', fontSize: '12px' });
    // 默认穿透
    expect(container.style['pointerEvents']).toBe('none');
    expect(container.style.color).toBe('');
    expect(container.style.fontSize).toBe('12px');
  });
});
