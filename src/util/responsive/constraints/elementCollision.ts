import * as MathUtil from '../../math';

function elementCollision(a, b) {
    const polygonA = [ a.topLeft, a.topRight, a.bottomRight, a.bottomLeft ]; // 顶点顺时针
    const polygonB = [ b.topLeft, b.topRight, b.bottomRight, b.bottomLeft ];
    const dist = MathUtil.minDistBetweenConvexPolygon(polygonA, polygonB);
    return Math.round(dist) >= 2;
}

export default {
    type:'group',
    usage: 'compare',
    expression: elementCollision,
}