/** 节点 */
export type Node = {
  readonly id: number;
  readonly name: string;
};

/** 边 */
export type Link = {
  readonly source: number;
  readonly target: number;
  readonly value: number;
};

/** 带有节点与边的数据类型，目前用于桑基图、和弦图 */
export type NodeLinkData = {
  readonly nodes: Node[];
  readonly links: Link[];
};
