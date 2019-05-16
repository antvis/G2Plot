import { View } from '@antv/g2';

export function getColDefs(view: View) {
  const scaleController = view.get('scaleController') || {};
  return scaleController.defs;
}

export function getColDef(view, field) {
  const colDefs = getColDefs(view);
  if (colDefs && colDefs[field]) {
    return colDefs[field];
  }
}
