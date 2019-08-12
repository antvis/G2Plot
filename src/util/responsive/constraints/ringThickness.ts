export interface RingThicknessCfg {
  ratio: number;
}

function ringThickness(node, region, cfg:RingThicknessCfg = { ratio:0.8 }) {
  return region.radius * cfg.ratio;
}

export default {
  type: 'padding',
  usage: 'assign',
  expression: ringThickness,
};
