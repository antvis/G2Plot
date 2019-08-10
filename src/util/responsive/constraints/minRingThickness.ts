function minRingThickness(node, region) {
    const minThicknessPixel = 2;
    const minThickness = region.coord.radius / minThicknessPixel;
    return Math.min(minThickness, node.value);
}

export default {
    type:'padding',
    usage: 'assign',
    expression: minRingThickness,
}