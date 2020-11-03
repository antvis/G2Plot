import { AxisCfg } from '@antv/g2/lib/interface';
import { Meta } from './meta';

export type Axis = false | (AxisCfg & Omit<Meta, 'values' | 'formatter'>);
