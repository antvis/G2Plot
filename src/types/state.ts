import { StateOption, Datum, Data } from '@antv/g2/lib/interface';
import Element from '@antv/g2/lib/geometry/element';
import { Geometry } from '@antv/g2';

export type State = StateOption;

/** 状态名称，G2 Element 开放 'active' | 'inactive' | 'selected' 三种状态 */
export type StateName = 'active' | 'inactive' | 'selected';

/** 状态条件 */
export type StateCondition = (data: Datum | Data) => boolean;

/** 状态对象, 可通过 `plot.getStates()` 获取 */
export type StateObject = { data: Datum | Data; state: string; geometry: Geometry; element: Element };
