import { StateOption, Datum, ShapeInfo } from '@antv/g2/lib/interface';

export type State = StateOption;

/** 状态条件 */
export type StateCondition = { name?: string; exp: string | ((d: Datum) => boolean) };

/** 状态对象, 可通过 `plot.getStates()` 获取 */
export type StateObject = { data: Datum; model: ShapeInfo; elementIndex: number; stateName: string };
