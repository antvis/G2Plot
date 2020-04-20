import { registerLabelComponent } from '../../../../components/label/base';
import PointLabel from '../../../../components/label/point';
import { IAreaPointLabel } from '../../interface';

export default class AreaPointLabel extends PointLabel<IAreaPointLabel> {}

registerLabelComponent('area-point', AreaPointLabel);
