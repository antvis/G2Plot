import { registerLabelComponent } from '../../../../components/label/base';
import AreaPointLabel from '../../../area/component/label/area-point';

export default class StackedAreaPointLabel extends AreaPointLabel {}

registerLabelComponent('stackedArea-point', StackedAreaPointLabel);
