import { MultiView } from './plots/multi-view';

/** 实验室图表所处的阶段 */
export enum Stage {
  DEV = 'DEV',
  BETA = 'BETA',
  STABLE = 'STABLE',
}

/**
 * 不同阶段打印一些消息给开发者
 * @param stage
 */
export function notice(stage: Stage, plotType: string) {
  console.warn(
    stage === Stage.DEV
      ? `Plot '${plotType}' is in DEV stage, just give us issues.`
      : stage === Stage.BETA
      ? `Plot '${plotType}' is in BETA stage, DO NOT use it in production env.`
      : stage === Stage.STABLE
      ? `Plot '${plotType}' is in STABLE stage, import it by "import { ${plotType} } from '@antv/g2plot'".`
      : 'invalid Stage type.'
  );
}

/**
 * 实验室图表，实验室中的图表分成不同的阶段。
 */
export class Lab {
  static get MultiView() {
    notice(Stage.STABLE, 'MultiView');
    return MultiView;
  }
}
