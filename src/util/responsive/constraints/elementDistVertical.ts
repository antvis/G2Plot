interface ElementDistVerticalCfg {
    value: number
}

function elementDistVertical(a, b, cfg:ElementDistVerticalCfg = {value: 5}) {
    const dist = Math.abs(a.bottom - b.top);
    return Math.round(dist) >= cfg.value;
}

export default {
    type: 'chain',
    usage: 'compare',
    expression: elementDistVertical
}