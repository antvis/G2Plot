type FlowFunction<P> = (param: P) => P;

/**
 * Similar with `lodash.flow`
 */
export function flow<P>(...flows: FlowFunction<P>[]): FlowFunction<P> {
  return (param: P) => {
    return flows.reduce((result: P, f: FlowFunction<P>) => {
      return f(result);
    }, param);
  };
}
