import DataSet from '@antv/data-set';
import { wordCloud } from '../../../../src/utils/transform/word-cloud';
import { CountryEconomy } from '../../../data/country-economy';

const { View } = DataSet;
const options = {
  type: 'tag-cloud',
  fields: ['Country', 'GDP'],
  fontSize: 10,
  fontWeight: 'bold',
  size: [800, 800],
  padding: 20,
  timeInterval: 5000,
  rotate: 90,
};

const dv = new View();
dv.source(CountryEconomy).transform(options as any);

describe('word-cloud', () => {
  it('word-cloud', () => {
    // 由于生成的每个单词的 x，y 坐标是比较随机的，每次都不一样，
    // 所以为了测试通过，把 x，y 属性删除。
    function removeXY(v) {
      delete v.x;
      delete v.y;
    }
    const result1 = wordCloud(CountryEconomy, options as any).forEach(removeXY);
    const result2 = dv.rows.forEach(removeXY);

    expect(result1).toEqual(result2);
  });
});
