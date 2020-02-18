import { BBox } from '@antv/g-canvas';
import { View } from '@antv/g2';
import Interaction from './core';
import ViewLayer from '../base/view-layer';
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

  public static getInteraction(type: string, plotType?: string): InteractionCtor | undefined {
    if (plotType && BaseInteraction.PLOT_INTERACTION_MAP[plotType] && BaseInteraction[plotType][type]) {
      return BaseInteraction.PLOT_INTERACTION_MAP[plotType][type];
    }
    return BaseInteraction.GLOBAL_INTERACTION_MAP[type];
  }

  public static getInteractionRange(layerRange: BBox, interaction?: IInteractionConfig): BBox | undefined {
    return undefined;
  }

  private static GLOBAL_INTERACTION_MAP: InteractionMap = {};
  private static PLOT_INTERACTION_MAP: { [plot: string]: InteractionMap } = {};

  public type: string;
  public cfg: any;
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
    this.interactionRange = interactionRange;
    this.interactionConfig = interaction;
    this.render();
  }

  public destroy(): void {
    this.clear();
    super.destroy();
  }

  protected getViewLayer(): ViewLayer<any> {
    return this.viewLayer;
  }

  protected getRange(): BBox | undefined {
    return this.interactionRange;
  }

  protected getInteractionConfig(): IInteractionConfig | undefined {
    return this.interactionConfig;
  }

  protected render(): void {}

  protected clear(): void {}
}