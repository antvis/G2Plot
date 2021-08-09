export function getValuesRange(field: string) {
  let min, max, type;
  if (field === 'date') {
    min = '2003-01-05';
    max = '2017-11-10';
    type = 'time';
  } else if (field === 'high') {
    min = 10;
    max = 124;
    type = 'linear';
  }
  return { min, max, type };
}
