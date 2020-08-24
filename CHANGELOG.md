#### 2.0.0-beta.2 (2020-08-24)

- feat: 导出 `G2`、`Plot`

#### 2.0.0-beta.1 (2020-08-14)

##### Chores

- 添加 windows 环境下开发配置和 cross-env 依赖 ([#1347](https://github.com/antvis/g2plot/pull/1347)) ([3d760b6c](https://github.com/antvis/g2plot/commit/3d760b6ceaef6b5d7e1200c19e8c3ecb2303d862))
- init ([7d582265](https://github.com/antvis/g2plot/commit/7d582265413a57ddb0765571b6fa2c4fdeb3d688))

##### Documentation Changes

- 增加 histogram 的 example 和文档 ([#1422](https://github.com/antvis/g2plot/pull/1422)) ([12781a95](https://github.com/antvis/g2plot/commit/12781a9538d8898d179e916df0a3a00b6792601d))
- add demos ([#1423](https://github.com/antvis/g2plot/pull/1423)) ([fa64dd60](https://github.com/antvis/g2plot/commit/fa64dd6055fc35f13b5795bba7b944832f1e17dc))
- add design ([#1408](https://github.com/antvis/g2plot/pull/1408)) ([6680528c](https://github.com/antvis/g2plot/commit/6680528c419a489aaa5457480beee31c9c7bb2ee))

##### New Features

- **v2/pie-demo:** 饼图 demo 的优化 ([#1424](https://github.com/antvis/g2plot/pull/1424)) ([171ffd97](https://github.com/antvis/g2plot/commit/171ffd973f907e28271985a1c19c308c1335bf99))
- **area:**
  - add area demo ([#1415](https://github.com/antvis/g2plot/pull/1415)) ([4fcfa9aa](https://github.com/antvis/g2plot/commit/4fcfa9aabbc1d6e70634fba5c04853d2f857ee34))
  - add plot area ([#1361](https://github.com/antvis/g2plot/pull/1361)) ([a4a3e416](https://github.com/antvis/g2plot/commit/a4a3e416367118c878b86a6f78f0138ea1ae49ae))
- **event:** add plot events bind ([#1412](https://github.com/antvis/g2plot/pull/1412)) ([4074bba8](https://github.com/antvis/g2plot/commit/4074bba83dd69d980e43beb93e669a4b7e7a6ba3))
- new chart type - heatmap ([#1370](https://github.com/antvis/g2plot/pull/1370)) ([ddbcf19f](https://github.com/antvis/g2plot/commit/ddbcf19f28735dff371a3e7bf899723cbd3fc8ed))
- [V2_combo] 混合图表-双折线图 ([#1331](https://github.com/antvis/g2plot/pull/1331)) ([14f564dc](https://github.com/antvis/g2plot/commit/14f564dc0091ad51b58ad47b65ccd59f7023a112))
- 添加 website ([#1368](https://github.com/antvis/g2plot/pull/1368)) ([4e2c0479](https://github.com/antvis/g2plot/commit/4e2c04794a1828bbc82b6dd1b2823da861d8f16a))
- 增加支持层叠（堆叠）直方图 ([#1356](https://github.com/antvis/g2plot/pull/1356)) ([29cc7779](https://github.com/antvis/g2plot/commit/29cc7779c631679a5a35ee0d39c3e6fea5a033fc))
- interaction ([#1349](https://github.com/antvis/g2plot/pull/1349)) ([a4618c02](https://github.com/antvis/g2plot/commit/a4618c024dbfaf3ba5a8b5b12bacb57a28279059))
- add changelog ([#1352](https://github.com/antvis/g2plot/pull/1352)) ([7dd94e4d](https://github.com/antvis/g2plot/commit/7dd94e4d357d8dccbd8cf201bc52c9a830d52d10))
- 新增直方图以及测试用例，修复之前问题 ([#1329](https://github.com/antvis/g2plot/pull/1329)) ([f7b334bf](https://github.com/antvis/g2plot/commit/f7b334bfc04e1b0092cd542f6e24d16700cf8706))
- 完善散点图功能、新增测试用例 ([#1322](https://github.com/antvis/g2plot/pull/1322)) ([8da53b85](https://github.com/antvis/g2plot/commit/8da53b8558fa16d13d0234e15e8f4c05973b9283))
- add progress ([#1317](https://github.com/antvis/g2plot/pull/1317)) ([83b67f4f](https://github.com/antvis/g2plot/commit/83b67f4f4ed4a9af4a275fbb6a5e11629890c24b))
- line options ([#1308](https://github.com/antvis/g2plot/pull/1308)) ([0b481d51](https://github.com/antvis/g2plot/commit/0b481d519bb5726681d7a8b0c33dd7d33c17d3fc))
- add tiny-line ([#1304](https://github.com/antvis/g2plot/pull/1304)) ([ec716512](https://github.com/antvis/g2plot/commit/ec7165126afb327613cc7e69e55915fff91f6085))
- 基于 dumi 新增临时 docs ([#1283](https://github.com/antvis/g2plot/pull/1283)) ([160bebb3](https://github.com/antvis/g2plot/commit/160bebb3c5a9d1759c517965cda3ce10c4190d13))
- **v2/column:**
  - extract common interval geometry ([#1391](https://github.com/antvis/g2plot/pull/1391)) ([df2a20d1](https://github.com/antvis/g2plot/commit/df2a20d1e3348319ed47b28c2906f04940d76f54))
  - support groupField/stackField options ([#1377](https://github.com/antvis/g2plot/pull/1377)) ([b0f2a4b5](https://github.com/antvis/g2plot/commit/b0f2a4b52707b3202829308d420f310eaa785484))
  - support grouped and stacked bar ([#1357](https://github.com/antvis/g2plot/pull/1357)) ([a8900ec2](https://github.com/antvis/g2plot/commit/a8900ec25961e0fe6ede34eabed3058442a1291a))
  - support columnWidthRatio and marginRatio ([#1354](https://github.com/antvis/g2plot/pull/1354)) ([26a9f05e](https://github.com/antvis/g2plot/commit/26a9f05e58523c65f1666f86a94ff51a913dccab))
  - support grouped and stacked column ([#1333](https://github.com/antvis/g2plot/pull/1333)) ([758b4e35](https://github.com/antvis/g2plot/commit/758b4e35ce2be486ff99bbaccd69246b63c7f930))
  - 添加基础柱形图 ([#1316](https://github.com/antvis/g2plot/pull/1316)) ([62683d5c](https://github.com/antvis/g2plot/commit/62683d5c1788269b5ac9a19196309405294d9ff0))
- **util:** add invariant/log util method ([#1344](https://github.com/antvis/g2plot/pull/1344)) ([682befba](https://github.com/antvis/g2plot/commit/682befba9fc34b68cc5a666d1b7f252ffe8e3a16))
- **v2/pie:**
  - 饼图字段配置错误处理 ([#1321](https://github.com/antvis/g2plot/pull/1321)) ([b9de931f](https://github.com/antvis/g2plot/commit/b9de931fe8a185ced9e15ee02a3b6a04f4ee16f9))
  - 饼图数据全为 0 的处理 ([#1335](https://github.com/antvis/g2plot/pull/1335)) ([40cbc62a](https://github.com/antvis/g2plot/commit/40cbc62a4623176e52d8fb500440e5acb2c117a1))
- **v2/radar:**
  - 自定义 radar tooltip，允许横向对比显示 tooltip ([#1337](https://github.com/antvis/g2plot/pull/1337)) ([f9e1e5ce](https://github.com/antvis/g2plot/commit/f9e1e5ce0adc36e6cfabaeee9ba1dd28ba5727a0))
  - add radar plot ([#1323](https://github.com/antvis/g2plot/pull/1323)) ([e7f408a2](https://github.com/antvis/g2plot/commit/e7f408a24d20b47b27970d05fdce74d4d2236971))
- **v2/bar:** add basic bar chart ([#1330](https://github.com/antvis/g2plot/pull/1330)) ([f4353053](https://github.com/antvis/g2plot/commit/f435305364218c5243ce5dd3d20300d6ae6e3c4c))
- **pie-annotation:** add pie options ([#1301](https://github.com/antvis/g2plot/pull/1301)) ([f9b9acf7](https://github.com/antvis/g2plot/commit/f9b9acf7ba1ec080020ecef6577404c7815bc7d6))
- **v2/pie-label:** add pie options ([#1296](https://github.com/antvis/g2plot/pull/1296)) ([cd3be27c](https://github.com/antvis/g2plot/commit/cd3be27cff74ca58f62ed54af415d262afe5bd37))
- **line:**
  - add line options ([#1291](https://github.com/antvis/g2plot/pull/1291)) ([e2ee4378](https://github.com/antvis/g2plot/commit/e2ee4378fca5b178d234808493a690cdcecb7604))
  - meta config -> scale ([#1286](https://github.com/antvis/g2plot/pull/1286)) ([d89ecf69](https://github.com/antvis/g2plot/commit/d89ecf69a1e368163a7bb441ec5ba3d1fb3ced3f))
  - add code example by line ([#1255](https://github.com/antvis/g2plot/pull/1255)) ([6fe59de9](https://github.com/antvis/g2plot/commit/6fe59de9bd7064e92dee7eae3b8bd8116c146594))
- **flow:** adaptor 使用 flow 的方式处理,让逻辑散开且容易复用 ([#1285](https://github.com/antvis/g2plot/pull/1285)) ([ec33cd63](https://github.com/antvis/g2plot/commit/ec33cd63a1f6fa77e00e10dcf9c71a48fef4ca24))

##### Bug Fixes

- **v2/radar:** 修复雷达图单测 ([#1429](https://github.com/antvis/g2plot/pull/1429)) ([66b74a95](https://github.com/antvis/g2plot/commit/66b74a953e01fb07d0eb2647ae8a0a9a5c492bb0))

##### Refactors

- **common-helper:** 将 common helper 移动到 utils 目录中 ([#1430](https://github.com/antvis/g2plot/pull/1430)) ([dd8facc5](https://github.com/antvis/g2plot/commit/dd8facc5aeb8d4ac3c15237e9bf88099cca76244))
- common/adaptor 改为 adaptor/common ([#1373](https://github.com/antvis/g2plot/pull/1373)) ([5daa997c](https://github.com/antvis/g2plot/commit/5daa997c5e29c1ecb457977f3bfd5fa935487104))
