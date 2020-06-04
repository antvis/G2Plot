import { isObject, hasKey, isString, each, contains } from '@antv/util';
import { getColorPalette, colorResampling, sequentialExtend } from '../theme/color';
import { ColorPaletteConfig } from '../interface/config';

export function colorPaletteToColor(type: string, name: string, layerOption, colorField) {
  const colorPalette = getColorPalette(type, name);
  const { data } = layerOption;
  const sampleValue = data[0][colorField];
  if (isString(sampleValue)) {
    const colorCount = getColorCount(data, colorField);
    if (colorCount < colorPalette.length) {
      return colorResampling(type, colorPalette, colorCount);
    } else if (colorCount > colorPalette.length) {
      return sequentialExtend(colorPalette, colorCount);
    }
  }

  return colorPalette;
}

export function isColorPalette(colorConfig) {
  if (isObject(colorConfig) && hasKey(colorConfig, 'type') && hasKey(colorConfig, 'name')) {
    const { type, name } = colorConfig as ColorPaletteConfig;
    const colorPalette = getColorPalette(type, name);
    if (colorPalette) {
      return true;
    }
  }
  return false;
}

function getColorCount(data, field) {
  const unique_value = [];
  each(data, (d) => {
    const value = d[field];
    if (!contains(unique_value, value)) {
      unique_value.push(value);
    }
  });
  return unique_value.length;
}
