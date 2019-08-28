import * as _ from '@antv/util';
import { compare } from '../../base/controller/state';
import { func } from 'prop-types';


function onActive(plot,condition){

}

function onDisable(plot,condition){
    const labels = getAllLabels(plot);
    _.each(labels,(label)=>{
        const origin = label.get('origin');
        if(compare(origin,condition)){
            const disableStyle = labelDisableStyle(label.attr());
            label.attr(disableStyle);
        }
    });
}

function getAllLabels(plot){
    const labels = [];
    const geoms = plot.plot.get('elements');
    _.each(geoms,(geom)=>{
        const geomLabels = geom.get('labels');
        if(geomLabels){
            labels.push(...geomLabels);
        }
    });
    return labels;
}

function labelDisableStyle(style){
    const opacity = style.opacity || 1;
    return { opacity: opacity * 0.2 };
}

export default {
    active: onActive,
    selected: onActive,
    disable: onDisable,
};