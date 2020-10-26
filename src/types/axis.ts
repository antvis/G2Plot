import { AxisOption } from '@antv/g2/lib/interface';
import { Meta } from './meta';

export type Axis = AxisOption & Omit<Meta, 'alias' | 'values' | 'formatter'>;
