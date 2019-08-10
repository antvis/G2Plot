
interface ColumnWidthCfg {
    ratio?: number
}

function columnWidth(node, region, cfg:ColumnWidthCfg = {ratio:0.6}) {
    return region.width * cfg.ratio;
}

export default {
    type:'padding',
    usage:'assign',
    expression: columnWidth,
}