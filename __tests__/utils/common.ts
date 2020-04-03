export function wait(interval = 1000): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}
