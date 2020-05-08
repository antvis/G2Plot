import { Canvas } from '@antv/g-canvas';
import { each } from '@antv/util';
import { createDiv } from '../../utils/dom';
import TooltipIndicator, {
  TooltipIndicatorRawConfig,
  IndicatorItem,
  ELEMENT_NAMES,
  EVENTS,
} from '../../../src/components/tooltip-indicator';
import { IGroup } from '../../../src/dependents';
import { simulateMouseEvent } from '../../utils/event';

const themeCfg: TooltipIndicatorRawConfig = {
  title: {
    style: {
      fontSize: 14,
      fill: '#262626',
    },
  },
  line: {
    style: {
      opacity: 1,
    },
    inactiveStyle: {
      opacity: 0.3,
    },
  },
  itemTitle: {
    style: {
      fontSize: 12,
      fill: '#8C8C8C',
      opacity: 1,
    },
    inactiveStyle: {
      opacity: 0.3,
    },
  },
  itemName: {
    style: {
      fontSize: 12,
      fill: '#8C8C8C',
      opacity: 1,
    },
    inactiveStyle: {
      opacity: 0.3,
    },
  },
  itemValue: {
    style: {
      fontSize: 14,
      // @ts-ignore
      fontWeight: 'bold',
      fill: '#595959',
      opacity: 1,
    },
    inactiveStyle: {
      opacity: 0.3,
    },
  },
};
const theme = {
  components: {
    tooltipIndicator: themeCfg,
  },
};

const insts: TooltipIndicator[] = [];
// @ts-ignore
window.__insts__ = insts;

const drawGrid = (canvas: Canvas) => {
  const tick = 100;
  for (let val = 0; val <= 500; val += tick) {
    canvas.addShape({
      type: 'line',
      attrs: {
        x1: val,
        y1: 0,
        x2: val,
        y2: 500,
        stroke: '#ccc',
        strokeOpacity: 0.5,
      },
    });
    canvas.addShape({
      type: 'line',
      attrs: {
        x1: 0,
        y1: val,
        x2: 500,
        y2: val,
        stroke: '#ccc',
        strokeOpacity: 0.5,
      },
    });
  }
};

const expectItemStyle = (inst: TooltipIndicator, itemGroup: IGroup, state?: 'selected' | 'active' | 'inactive') => {
  const { line: lineConfig, itemTitle, itemName, itemValue } = inst.getConfig();

  const line = itemGroup.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_LINE)[0];
  expect(line.attr()).toMatchObject(state ? { ...lineConfig.style, ...lineConfig[`${state}Style`] } : lineConfig.style);

  const title = itemGroup.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_TITLE)[0];
  expect(title.attr()).toMatchObject(state ? { ...itemTitle.style, ...itemTitle[`${state}Style`] } : itemTitle.style);

  const names = itemGroup.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_NAME);
  const values = itemGroup.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_VALUE);
  each(names, (name) => {
    expect(name.attr()).toMatchObject(state ? { ...itemName.style, ...itemName[`${state}Style`] } : itemName.style);
  });
  each(values, (value) => {
    expect(value.attr()).toMatchObject(state ? { ...itemValue.style, ...itemValue[`${state}Style`] } : itemValue.style);
  });
};

/** 样式一: 单个 value 数值项、数值项无名称 */
describe('TooltipIndicator Card 1', () => {
  const div = createDiv('canvas1');
  const canvas = new Canvas({
    container: div,
    renderer: 'canvas',
    width: 500,
    height: 500,
  });
  drawGrid(canvas);
  const container = canvas.addGroup();
  const items: IndicatorItem[] = [
    {
      id: 'a',
      title: 'Text A',
      values: [
        {
          value: 11,
        },
      ],
      color: 'red',
    },
    {
      id: 'b',
      title: 'Text B',
      values: [
        {
          value: 22,
        },
      ],
      color: 'blue',
    },
    {
      id: 'c',
      title: 'Text C',
      values: [
        {
          value: 33,
        },
      ],
      color: 'red',
    },
    {
      id: 'd',
      title: 'Text D',
      values: [
        {
          value: 44,
        },
      ],
      color: 'blue',
    },
    {
      id: 'e',
      title: 'Text E',
      values: [
        {
          value: 55,
        },
      ],
      color: 'red',
    },
    {
      id: 'f',
      title: 'Text f',
      values: [
        {
          value: 66,
        },
      ],
      color: 'blue',
    },
    {
      id: 'g',
      title: 'Text G',
      values: [
        {
          value: 77,
        },
      ],
      color: 'red',
    },
    {
      id: 'h',
      title: 'Text H',
      values: [
        {
          value: 88,
        },
      ],
      color: 'blue',
    },
  ];
  const inst = new TooltipIndicator({
    container,
    theme,
    x: 0,
    y: 0,
    width: 500,
    title: {
      text: 'This is title.',
    },
    items,
  });
  insts.push(inst);

  it('init', () => {
    const config = inst.getConfig();
    expect(config).toMatchObject(themeCfg);
  });

  it('render', () => {
    inst.render();
    const group = inst.getGroup();

    // title rendered
    const titles = group.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_TITLE);
    expect(titles.length).toBe(1);
    expect(titles[0].attr('text')).toEqual('This is title.');
    // items rendered
    const itemGroups = group.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_GROUP);
    expect(itemGroups.length).toBe(items.length);
    each(itemGroups, (itemGroup: IGroup, index: number) => {
      const valueShapes = itemGroup.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_VALUE);
      expect(valueShapes.length).toBe(1);
      expect(valueShapes[0].attr('text')).toBe(items[index].values[0].value);
    });
  });

  it('style', () => {
    const group = inst.getGroup();
    const title = group.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_TITLE)[0];
    expect(title.attr()).toMatchObject(themeCfg.title.style);
    const lines = group.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_LINE);
    expect(lines.length).toBe(items.length);
    each(lines, (line) => {
      expect(line.attr()).toMatchObject(themeCfg.line.style);
    });
    const values = group.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_VALUE);
    expect(values.length).toBe(items.length);
    each(values, (value) => {
      expect(value.attr()).toMatchObject(themeCfg.itemValue.style);
    });
  });

  it('event', (done) => {
    const group = inst.getGroup();
    const itemGroups = group.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_GROUP);
    let itemGroup: IGroup;
    let cnt = 0;

    inst.on(EVENTS.ON_SELECT_ITEM, (id: string) => {
      if (cnt === 0) {
        expect(id).toBe(items[0].id);
        each(itemGroups, (itemGroup, index) => {
          expectItemStyle(inst, itemGroup, index === 0 ? 'selected' : 'inactive');
        });
      } else if (cnt === 1) {
        expect(id).toBe(items[1].id);
        each(itemGroups, (itemGroup, index) => {
          expectItemStyle(inst, itemGroup, index === 1 ? 'selected' : 'inactive');
        });
      } else if (cnt === 2) {
        expect(id).toBe(items[0].id);
        each(itemGroups, (itemGroup, index) => {
          expectItemStyle(inst, itemGroup, index === 0 ? 'selected' : 'inactive');
        });
      } else if (cnt === 3) {
        expect(id).toBeUndefined();
        each(itemGroups, (itemGroup) => {
          expectItemStyle(inst, itemGroup);
        });
        done();
      }
      cnt++;
    });

    // click on item title
    itemGroup = itemGroups[0] as IGroup;
    simulateMouseEvent(itemGroup.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_TITLE)[0], 'mousemove');

    // click on item value
    itemGroup = itemGroups[1] as IGroup;
    simulateMouseEvent(itemGroup.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_VALUE)[0], 'mousemove');

    // click on background
    itemGroup = itemGroups[0] as IGroup;
    simulateMouseEvent(itemGroup.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_BACKGROUND)[0], 'mousemove');

    // click again to reset
    simulateMouseEvent(itemGroup.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_BACKGROUND)[0], 'mousemove');
  });

  it('selectItem/resetSelect', () => {
    const group = inst.getGroup();
    const itemGroups = group.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_GROUP);

    // 选中 4
    inst.selectItem(items[4].id);
    each(itemGroups, (itemGroup, index) => {
      expectItemStyle(inst, itemGroup, index === 4 ? 'selected' : 'inactive');
    });

    // 选中 1
    inst.selectItem(items[1].id);
    each(itemGroups, (itemGroup, index) => {
      expectItemStyle(inst, itemGroup, index === 1 ? 'selected' : 'inactive');
    });

    // reset
    inst.resetSelect();
    each(itemGroups, (itemGroup) => {
      expectItemStyle(inst, itemGroup);
    });
  });
});

/** 样式二: 多 value 配置项、数值项有名称 */
describe('TooltipIndicator Card 2', () => {
  const div = createDiv('canvas2');
  const canvas = new Canvas({
    container: div,
    renderer: 'canvas',
    width: 500,
    height: 500,
  });
  drawGrid(canvas);
  const container = canvas.addGroup();
  const items: IndicatorItem[] = [
    {
      id: 'a',
      title: 'Text Item A',
      color: 'red',
      values: [
        {
          name: '占比',
          value: '17%',
        },
        {
          name: '销量',
          value: '654万',
        },
      ],
    },
    {
      id: 'b',
      title: 'Text Item B',
      color: 'blue',
      values: [
        {
          name: '占比',
          value: '27%',
        },
        {
          name: '销量',
          value: '954万',
        },
      ],
    },
    {
      id: 'c',
      title: 'Text Item C',
      color: 'yellow',
      values: [
        {
          name: '占比',
          value: '7%',
        },
        {
          name: '销量',
          value: '54万',
        },
      ],
    },
    {
      id: 'd',
      title: 'Text D',
      color: 'red',
      values: [
        {
          name: '占比',
          value: '57%',
        },
        {
          name: '销量',
          value: '854万',
        },
      ],
    },
    {
      id: 'e',
      title: 'Text Item E',
      color: 'blue',
      values: [
        {
          name: '占比',
          value: '27%',
        },
        {
          name: '销量',
          value: '954万',
        },
      ],
    },
    {
      id: 'f',
      title: 'Item F',
      color: 'blue',
      values: [
        {
          name: '占比',
          value: '27%',
        },
        {
          name: '销量',
          value: '954万',
        },
      ],
    },
  ];
  const inst = new TooltipIndicator({
    container,
    theme,
    x: 0,
    y: 0,
    width: 500,
    title: {
      text: 'This is title2.',
    },
    items,
  });
  insts.push(inst);

  it('init', () => {
    const config = inst.getConfig();
    expect(config).toMatchObject(themeCfg);
  });

  it('render', () => {
    inst.render();
    const group = inst.getGroup();

    // title rendered
    const titles = group.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_TITLE);
    expect(titles.length).toBe(1);
    expect(titles[0].attr('text')).toEqual('This is title2.');
    // items rendered
    const itemGroups = group.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_GROUP);
    expect(itemGroups.length).toBe(items.length);
    each(itemGroups, (itemGroup: IGroup, index: number) => {
      const nameShapes = itemGroup.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_NAME);
      expect(nameShapes).toHaveLength(items[index].values.length);
      each(nameShapes, (nameShape, valueIndex) => {
        expect(nameShape.attr('text')).toBe(items[index].values[valueIndex].name);
      });
      const valueShapes = itemGroup.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_VALUE);
      expect(valueShapes.length).toBe(items[index].values.length);
      each(valueShapes, (valueShape, valueIndex) => {
        expect(valueShape.attr('text')).toBe(items[index].values[valueIndex].value);
      });
    });
  });

  it('style', () => {
    const group = inst.getGroup();
    const title = group.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_TITLE)[0];
    expect(title.attr()).toMatchObject(themeCfg.title.style);
    const lines = group.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_LINE);
    expect(lines.length).toBe(items.length);
    each(lines, (line) => {
      expect(line.attr()).toMatchObject(themeCfg.line.style);
    });
    const names = group.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_NAME);
    expect(names).toHaveLength(items.length * 2);
    const values = group.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_VALUE);
    expect(values.length).toBe(items.length * 2);
    each(values, (value) => {
      expect(value.attr()).toMatchObject(themeCfg.itemValue.style);
    });
  });

  it('event', (done) => {
    const group = inst.getGroup();
    const itemGroups = group.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_GROUP);
    let itemGroup: IGroup;
    let cnt = 0;

    inst.on(EVENTS.ON_SELECT_ITEM, (id: string) => {
      if (cnt === 0) {
        expect(id).toBe(items[0].id);
        each(itemGroups, (itemGroup, index) => {
          expectItemStyle(inst, itemGroup, index === 0 ? 'selected' : 'inactive');
        });
      } else if (cnt === 1) {
        expect(id).toBe(items[1].id);
        each(itemGroups, (itemGroup, index) => {
          expectItemStyle(inst, itemGroup, index === 1 ? 'selected' : 'inactive');
        });
      } else if (cnt === 2) {
        expect(id).toBe(items[0].id);
        each(itemGroups, (itemGroup, index) => {
          expectItemStyle(inst, itemGroup, index === 0 ? 'selected' : 'inactive');
        });
      } else if (cnt === 3) {
        expect(id).toBeUndefined();
        each(itemGroups, (itemGroup) => {
          expectItemStyle(inst, itemGroup);
        });
        done();
      }
      cnt++;
    });

    // click on item title
    itemGroup = itemGroups[0] as IGroup;
    simulateMouseEvent(itemGroup.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_TITLE)[0], 'mousemove');

    // click on item value
    itemGroup = itemGroups[1] as IGroup;
    simulateMouseEvent(itemGroup.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_VALUE)[0], 'mousemove');

    // click on background
    itemGroup = itemGroups[0] as IGroup;
    simulateMouseEvent(itemGroup.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_BACKGROUND)[0], 'mousemove');

    // click again to reset
    simulateMouseEvent(itemGroup.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_BACKGROUND)[0], 'mousemove');
  });

  it('selectItem/resetSelect', () => {
    const group = inst.getGroup();
    const itemGroups = group.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_GROUP);

    // 选中 4
    inst.selectItem(items[4].id);
    each(itemGroups, (itemGroup, index) => {
      expectItemStyle(inst, itemGroup, index === 4 ? 'selected' : 'inactive');
    });

    // 选中 1
    inst.selectItem(items[1].id);
    each(itemGroups, (itemGroup, index) => {
      expectItemStyle(inst, itemGroup, index === 1 ? 'selected' : 'inactive');
    });

    // reset
    inst.resetSelect();
    each(itemGroups, (itemGroup) => {
      expectItemStyle(inst, itemGroup);
    });
  });
});
