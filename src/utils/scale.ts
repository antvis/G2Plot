export function syncScale(options) {
  const { scale } = options;
  return {
    ...options,
    scale: Object.fromEntries(
      Object.entries(scale).map(([key, value]) => {
        if (!value || typeof value !== 'object') return [key, value];

        const { independent, ...rest } = value as any;
        return [key, { key: Symbol(key), ...rest }];
      }),
    ),
  };
}
