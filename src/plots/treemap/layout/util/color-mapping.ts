import { getScale } from '@antv/scale';

const maxDepth = 4;
const LinearScale = getScale('linear');
const hueScale = new LinearScale({
    max:20,
    min:1
});
const hueRange = [1, 359];
const lightnessScale = new LinearScale({
    max:maxDepth,
    min:0
});
const lightnessRange = [0.55, 0.85];

const saturationScale = new LinearScale({
    max:maxDepth,
    min:0
});
const saturationRange = [0.55, 0.85];

function createOrdinalCat(len){
    const cat = [];
    for(let i = 0; i<len; i++){
        cat.push[String(i)];
    }
    return cat;
}

function hue(v){
    const scale = hueScale.scale(v);
    const hueLength = hueRange[1] - hueRange[0];
    return hueRange[0] + scale * hueLength;
}

function lightness(v){
    const scale = lightnessScale.scale(v);
    const lightnessLength = lightnessRange[1] - lightnessRange[0];
    return lightnessRange[0] + scale * lightnessLength;
}

function saturation(v){
    const scale = saturationScale.scale(v);
    const saturationLength = saturationRange[1] - saturationRange[0];
    return saturationRange[0] + scale * saturationLength;  
}

function hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60
        : h < 180 ? m2
        : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
        : m1) * 255;
}

function rgb(h,s,l){
    const h = h % 360 + (h < 0) * 360,
          s = isNaN(h) || isNaN(s) ? 0 : s,
          l = l,
          m2 = l + (l < 0.5 ? l : 1 - l) * s,
          m1 = 2 * l - m2;
return new Rgb(
  hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
  hsl2rgb(h, m1, m2),
  hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
  this.opacity
);
}

function s(v){
    return v * 20;
}

export function colorMapping(d,o,isLeaf){
    if (o === 0) {
        return 'white';
      }
      const c = s(d.percent);
      const h = Math.floor(hue(c)) + Math.floor(lightness(o) * 45);
      if (isLeaf) {
          return hsl2rgb(h, 0.85, 0.85);
        // return hsl(h, 0.85, 0.85).hex();
      }
      return hsl2rgb(h, saturation(o), lightness(o));
      // return hsl(h, saturation(o), lightness(o)).hex();
}