import { Line } from '../../../../../src';
import { createDiv } from '../../../../utils/dom';
import subsales from '../../../../data/subsales.json';
import { IGroup, GroupComponent, TooltipController } from '../../../../../src/dependents';

const TOOLTIP_INTERACTION = 'tooltip';
const SELECTED_TOOLTIP_INTERACTION = 'selected-tooltip';

describe('selected-tooltip-interaction', () => {
  const plot = new Line(createDiv(), {
    data: subsales,
    width: 500,
    height: 400,
    xField: 'area',
    yField: 'sales',
    seriesField: 'series',
    interactions: [{ type: SELECTED_TOOLTIP_INTERACTION }],
  });
  plot.render();

  it('init', () => {
    const view = plot.getView();
    const interaction = view.interactions[SELECTED_TOOLTIP_INTERACTION];
    const controller = view.getController(SELECTED_TOOLTIP_INTERACTION);
    // interaction added
    expect(interaction).toBeDefined();
    // controller added
    expect(controller).toBeDefined();
  });

  it('render', () => {
    const view = plot.getView();
    const controller = view.getController(SELECTED_TOOLTIP_INTERACTION) as TooltipController;

    // tooltip content not visible
    // @ts-ignore
    expect(controller.tooltip).toBeUndefined();

    // markers rendered
    // @ts-ignore
    const markersGroup: IGroup = controller.tooltipMarkersGroup;
    expect(markersGroup.getChildren().length).toBe(3);

    // crosshair
    // @ts-ignore
    const xCrosshair: GroupComponent = controller.xCrosshair;
    expect(xCrosshair.get('visible')).toBe(true);
  });

  it('delete', () => {
    plot.updateConfig({
      interactions: [],
    });
    plot.render();
    const view = plot.getView();
    expect(view.interactions[SELECTED_TOOLTIP_INTERACTION]).toBeUndefined();
    expect(view.interactions[TOOLTIP_INTERACTION]).toBeDefined();
  });
});
