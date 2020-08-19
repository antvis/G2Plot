import { StateOption, Datum } from '@antv/g2/lib/interface';

export type State = StateOption;
export type StateCondition = { name?: string; exp: string | ((d: Datum) => boolean) };
