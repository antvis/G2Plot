import AxisParser from './axis';
import LabelParser from './label';
import TextDescription from './description';

const COMPONENT_MAPPER = {
    axis: AxisParser,
    label: LabelParser,
};

export function getComponent(name,cfg){
    const Components = COMPONENT_MAPPER[name];
    return new Components(cfg).config;
}