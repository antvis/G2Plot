import { BBox } from '@antv/g';
import { Interaction, View } from '@antv/g2';
import { ViewLayer } from '..';
import { IInteractionConfig } from '../interface/config';

export interface InteractionCtor {
  new (
    cfg: { view: View },
    viewLayer: ViewLayer<any>,
    interactionRange?: BBox,
    interaction?: IInteractionConfig
  ): BaseInteraction;
  getInteractionRange(layerRange: BBox, interaction?: IInteractionConfig): BBox;
}

interface InteractionMap {
  [type: string]: InteractionCtor;
}

export default abstract class BaseInteraction extends Interaction {
  public static registerInteraction(type: string, ctor: any) {
    BaseInteraction.GLOBAL_INTERACTION_MAP[type] = ctor;
  }

  public static registerPlotInteraction(plotType: string, type: string, ctor: any) {
    if (!BaseInteraction.PLOT_INTERACTION_MAP[plotType]) {
      BaseInteraction.PLOT_INTERACTION_MAP[plotType] = {};
    }
    BaseInteraction.PLOT_INTERACTION_MAP[plotType][type] = ctor;
  }

  public static getInteraction(type: string, plotType?: string): InteractionCtor | null {
    if (plotType && BaseInteraction.PLOT_INTERACTION_MAP[plotType] && BaseInteraction[plotType][type]) {
      return BaseInteraction.PLOT_INTERACTION_MAP[plotType][type];
    }
    return BaseInteraction.GLOBAL_INTERACTION_MAP[type] || null;
  }

  public static getInteractionRange(layerRange: BBox, interaction?: IInteractionConfig): BBox | null {
    return null;
  }

  private static GLOBAL_INTERACTION_MAP: InteractionMap = {};
  private static PLOT_INTERACTION_MAP: { [plot: string]: InteractionMap } = {};
  private interactionConfig: IInteractionConfig;
  private interactionRange: BBox;
  private viewLayer: ViewLayer<any>;

  constructor(
    cfg: { view: View },
    viewLayer: ViewLayer<any>,
    interactionRange?: BBox,
    interaction?: IInteractionConfig
  ) {
    super(cfg);
    this.viewLayer = viewLayer;
    this.interactionRange = interactionRange || null;
    this.interactionConfig = interaction || null;
    this.render();
  }

  public destroy(): void {
    this.clear();
    super.destroy();
  }

  protected getViewLayer(): ViewLayer<any> {
    return this.viewLayer;
  }

  protected getRange(): BBox | null {
    return this.interactionRange || null;
  }

  protected getInteractionConfig(): IInteractionConfig | null {
    return this.interactionConfig || null;
  }

  protected render(): void {}

  protected clear(): void {}
}
