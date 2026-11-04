import { Chart } from '@antv/g2';

/**
 * 扁平表转树图
 * 场景：后端返回 id / parentId 形式的扁平部门表，前端需要转成 children 嵌套结构
 * 要点：1) tree 只接受嵌套 JSON（children），5.4.8 不支持 layout.path 直接吃扁平路径；
 *       2) 先按 id 建索引，再按 parentId 挂到父节点的 children 上；
 *       3) 数值字段只保留在叶子节点，内部节点的 d.value 由布局自动累加
 */
type OrgRow = {
  id: string;
  parentId: string | null;
  department: string;
  headcount?: number;
};

type OrgNode = OrgRow & { children?: OrgNode[] };

const rows: OrgRow[] = [
  { id: 'company', parentId: null, department: '总公司' },
  { id: 'rd', parentId: 'company', department: '研发中心' },
  { id: 'fe', parentId: 'rd', department: '前端组', headcount: 45 },
  { id: 'be', parentId: 'rd', department: '后端组', headcount: 70 },
  { id: 'algo', parentId: 'rd', department: '算法组', headcount: 35 },
  { id: 'market', parentId: 'company', department: '市场中心' },
  { id: 'brand', parentId: 'market', department: '品牌组', headcount: 25 },
  { id: 'growth', parentId: 'market', department: '增长组', headcount: 55 },
];

const buildTree = (flatRows: OrgRow[]): OrgNode => {
  const nodeById = new Map<string, OrgNode>();
  flatRows.forEach((row) => nodeById.set(row.id, { ...row }));

  let root: OrgNode | undefined;
  flatRows.forEach((row) => {
    const node = nodeById.get(row.id);
    if (!node) return;
    if (row.parentId === null) {
      root = node;
      return;
    }
    const parent = nodeById.get(row.parentId);
    if (!parent) return;
    if (!parent.children) parent.children = [];
    parent.children.push(node);
  });

  if (!root) throw new Error('扁平数据缺少根节点（parentId 为 null 的行）');
  return root;
};

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'tree',
  data: { type: 'inline', value: buildTree(rows) },
  encode: { value: 'headcount' },
  coordinate: { transform: [{ type: 'transpose' }] },
  style: {
    nodeFill: '#52c41a',
    linkStroke: '#b7eb8f',
    labelText: (d: any) => d.data.department,
    labelFontSize: 11,
    labelFill: '#434343',
    labelPosition: (d: any) => (d.height === 0 ? 'right' : 'left'),
    labelDx: (d: any) => (d.height === 0 ? 6 : -6),
  },
});

chart.render();
