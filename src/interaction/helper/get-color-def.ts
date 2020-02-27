import { View } from '@antv/g2';

export function getColDef(view: View, field: string) {
  return view.getScaleByField(field);
}
