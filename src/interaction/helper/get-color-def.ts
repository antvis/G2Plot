import { View } from '../../dependents';

export function getColDef(view: View, field: string) {
  return view.getScaleByField(field);
}
