import * as MathUtil from '../../math';

export interface ElementDistCfg {
    value: number
}

function elementDist(a, b, cfg:ElementDistCfg = {value: 5}) {
    const polygonA = [ a.topLeft, a.topRight, a.bottomRight, a.bottomLeft ]; // 顶点顺时针
    const polygonB = [ b.topLeft, b.topRight, b.bottomRight, b.bottomLeft ];
    const dist = MathUtil.minDistBetweenConvexPolygon(polygonA, polygonB);
    return Math.round(dist) >= cfg.value;
}

export default {
    type:'chain',
    usage: 'compare',
    expression: elementDist,
}