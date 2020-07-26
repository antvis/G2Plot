const categories = ['销售', '市场营销', '发展', '客户支持', '信息技术', '行政管理'];
/** 预算支出 */
const data1 = [43000, 19000, 60000, 35000, 17000, 10000];
/** 实际支出 */
const data2 = [50000, 39000, 42000, 31000, 26000, 14000];

export const SINGLE_DATA = categories.map((d, idx) => ({ name: d, value: data1[idx] }));
export const SERIES_DATA = [];
categories.forEach((d, idx) => {
  SERIES_DATA.push({ name: d, value: data1[idx], type: '预算支出' });
  SERIES_DATA.push({ name: d, value: data2[idx], type: '实际支出' });
});
