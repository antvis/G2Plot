import { isFunction, hasKey } from '@antv/util';
import { Template } from '../interface/config';

export function applyTemplate(template: Template, layerOption) {
  for (const i in template) {
    const { condition, theme } = template[i];
    const con = conditionTest(condition, layerOption);
    if (con) {
      return theme;
    }
  }
}

function conditionTest(condition, layerOption) {
  if (!isFunction(condition)) {
    const { width, height } = layerOption;
    if (hasKey(condition, 'minWidth') && width < condition.minWidth) {
      return false;
    }
    if (hasKey(condition, 'maxWidth') && width > condition.maxWidth) {
      return false;
    }

    if (hasKey(condition, 'minHeight') && height < condition.minHeight) {
      return false;
    }

    if (hasKey(condition, 'maxHeight') && height > condition.maxHeight) {
      return false;
    }
  } else {
    return condition(layerOption);
  }

  return false;
}
