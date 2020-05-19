import { each } from '@antv/util';
import { View } from '../dependents';
import BBox from '../util/bbox';
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  private disposables: (() => void)[];

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
    this.disposables = [];
  }

  public destroy(): void {
    each(this.disposables, (fn) => {
      fn();
    });
    this.disposables = [];
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

  protected addDisposable(fn: () => void) {
    this.disposables.push(fn);
  }

  public render(): void {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected start(ev: any): void {
    return;
  }

  protected abstract clear(): void;
}
