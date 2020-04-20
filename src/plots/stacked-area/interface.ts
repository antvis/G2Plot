import { Label } from '../../interface/config';
import { IAreaLabel, AreaViewConfig } from '../area/interface';

interface IAreaTypeLabel extends Label {
  type: 'area';
  autoScale?: boolean;
}

interface ILineTypeLabel extends Label {
  type: 'line';
}

export type IStackedAreaLabel = IAreaTypeLabel | ILineTypeLabel | IAreaLabel;

export interface StackedAreaViewConfig extends AreaViewConfig {
  stackField: string;
  label?: IStackedAreaLabel;
}
