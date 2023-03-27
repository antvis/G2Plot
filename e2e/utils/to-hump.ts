export const toHump = (name = '') => {
  return name.replace(/-(\w)/g, (all, letter) => {
    return letter.toUpperCase();
  });
};
