import { isRealNumber } from '../../utils/number';

export function getNodeWidthRatio(nodeWidth: number, nodeWidthRatio: number, width: number) {
  return isRealNumber(nodeWidth) ? nodeWidth / width : nodeWidthRatio;
}

export function getNodePaddingRatio(nodePadding: number, nodePaddingRatio: number, height: number) {
  return isRealNumber(nodePadding) ? nodePadding / height : nodePaddingRatio;
}
