import { Types, Element, Geometry } from '@antv/g2';
import { Datum, Data } from './common';

export type State = Types.StateOption;

/**
 * @title 状态名称
 * @description G2 Element 开放 'active' | 'inactive' | 'selected' | 'default' 四种状态
 */
export type StateName = 'active' | 'inactive' | 'selected' | 'default';

/**
 * @title 状态条件
 */
export type StateCondition = (data: Datum | Data) => boolean;

/**
 * @title 状态对象
 * @description 可通过 `plot.getStates()` 获取
 */
export type StateObject = { data: Datum | Data; state: string; geometry: Geometry; element: Element };
