import { Types } from '@antv/g2';
import { Meta } from './meta';

export type Axis = false | (Types.AxisCfg & Omit<Meta, 'values' | 'formatter'>);
