// 为了直接import json module
declare module '*.json' {
  const value: any;
  export default value;
}
