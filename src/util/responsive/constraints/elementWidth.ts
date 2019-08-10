interface ElementWidthCfg {
    ratio: number;
}

function elementWidth(node, region, cfg:ElementWidthCfg = {ratio:0.15}) {
    return node.width < region.width * cfg.ratio;
}

export default {
    type:'padding',
    usage: 'compare',
    expression: elementWidth,
}