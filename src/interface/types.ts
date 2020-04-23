export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<RecursivePartial<U>>
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};

export type MarginPadding = [number, number, number, number];

export interface LooseMap<T = any> {
  [key: string]: T;
}

export type Maybe<T> = T | undefined | null;
