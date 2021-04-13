#### 2.3.18 (2021-04-12)

##### Chores

*  修复控制台 warning ([#2472](https://github.com/antvis/g2plot/pull/2472)) ([d0177dbd](https://github.com/antvis/g2plot/commit/d0177dbdc9e0ea021de3bbd32728675868ac17e3))
*  update build workflows node & add jest maxWorkers ([#2470](https://github.com/antvis/g2plot/pull/2470)) ([c9d79f18](https://github.com/antvis/g2plot/commit/c9d79f1892cc98c130faa3e58a57ecfbaac614f0))

##### Documentation Changes

*  文档错误 ([#2500](https://github.com/antvis/g2plot/pull/2500)) ([c5a83826](https://github.com/antvis/g2plot/commit/c5a838264b8ce78acb9ddce391009409471d9062))
*  图表组件文档完善 ([#2481](https://github.com/antvis/g2plot/pull/2481)) ([081971de](https://github.com/antvis/g2plot/commit/081971de7546ec4e2a06de149a321886215373fe))
*  完善图例文档 & 增加图表组件的示例导航 & 补充图例两个 demo ([#2477](https://github.com/antvis/g2plot/pull/2477)) ([0740b371](https://github.com/antvis/g2plot/commit/0740b37117adde828d51ef39f45076c835ca0876))
*  完善 axis 文档（含 title, line, tickLine, subTickLine 等） ([#2460](https://github.com/antvis/g2plot/pull/2460)) ([7a651f7e](https://github.com/antvis/g2plot/commit/7a651f7e1e709cfcdf644a221d69cd2b463f2cd5))

##### New Features

*  为双轴图增加 setState 功能 ([#2488](https://github.com/antvis/g2plot/pull/2488)) ([61a3ed81](https://github.com/antvis/g2plot/commit/61a3ed810e76cd0ca03b3a5cd1d313f54b0df3cb))
* **options:**  13+图表提供获取默认配置项的静态方法 ([#2489](https://github.com/antvis/g2plot/pull/2489)) ([f62ca2fd](https://github.com/antvis/g2plot/commit/f62ca2fdc2fe1426733eace6753538dd61043754))

##### Bug Fixes

* **sankey:**  depth is not right ([#2503](https://github.com/antvis/g2plot/pull/2503)) ([e349e32d](https://github.com/antvis/g2plot/commit/e349e32de8c97dcc22bffd088eec8df290964811))
* **gauge-theme:**  仪表盘主题需要放在第一个设置，否则设置主题会失效 ([#2501](https://github.com/antvis/g2plot/pull/2501)) ([cee9c17b](https://github.com/antvis/g2plot/commit/cee9c17be7a487f5df9586820eca237008d01cb5))
* **issue-2486:**  不直接引用 @antv/matrix-util, 使用 G2 的 Util ([#2499](https://github.com/antvis/g2plot/pull/2499)) ([84fd908b](https://github.com/antvis/g2plot/commit/84fd908b0a1e2d1f32a91cf6fd0c7959f67365e0))
*  尝试修复词云图单测 ([#2471](https://github.com/antvis/g2plot/pull/2471)) ([ed682f21](https://github.com/antvis/g2plot/commit/ed682f21984d8f014497b79adb8a8bfd23bd4167))

#### 2.3.17 (2021-03-24)

##### Documentation Changes

* **G2Plot Calendar:**  补充组合图表 demo & 增加一个插件图表 ([#2448](https://github.com/antvis/g2plot/pull/2448)) ([772155db](https://github.com/antvis/g2plot/commit/772155db9dea67665bf139ed322ecd47659ae928))
* **scrollbar:**  补充滚动条滑块的高亮色文档 ([#2449](https://github.com/antvis/g2plot/pull/2449)) ([bfd9e24d](https://github.com/antvis/g2plot/commit/bfd9e24df3301d500cdbaf9918ac1872607267bf))
* **label-line:** 类型定义补全 ([#2443](https://github.com/antvis/g2plot/pull/2443)) ([33dfa3b1](https://github.com/antvis/g2plot/commit/33dfa3b11713d1367c226b8a4446144028f1bf9b))
* **tooltip:**  更新 tooltip 关于 marker 的文档 ([#2439](https://github.com/antvis/g2plot/pull/2439)) ([9836e08c](https://github.com/antvis/g2plot/commit/9836e08cb761a031e4aebb908716fe2e2e30b9e4))

##### New Features

* **liquid:**  水波图支持跟随主题色 & 水波图支持 outline 配置样式 & 文档以及 demo 优化 ([#2455](https://github.com/antvis/g2plot/pull/2455)) ([04f2a66c](https://github.com/antvis/g2plot/commit/04f2a66c0f0da10d25d0321be350efef50501cf6))
* **scatter:**  散点图支持 color 和 shape 同时映射图例字段 & 添加单测 ([#2406](https://github.com/antvis/g2plot/pull/2406)) ([c7b7724e](https://github.com/antvis/g2plot/commit/c7b7724eab6000b7c4cee02af3bec3667e067196))
* **area:** 面积图支持 startOnZero ([#2444](https://github.com/antvis/g2plot/pull/2444)) ([1cdea551](https://github.com/antvis/g2plot/commit/1cdea551fdcc7e64186ef03b0ab37fc3263a4bcc))
* **conversion-tag:**  转化分析 tag 添加 elements 信息,方便业务上使用 ([#2441](https://github.com/antvis/g2plot/pull/2441)) ([706942a7](https://github.com/antvis/g2plot/commit/706942a7ac08d45188adef71c7ce61815dd3199d))

##### Bug Fixes

* **dual-axes:** 双轴图 theme 主题设置 ([#2451](https://github.com/antvis/g2plot/pull/2451)) ([69bf536d](https://github.com/antvis/g2plot/commit/69bf536df21399d5730616250f919ad5001e073a))
* **radial-bar:**  修复玉钰图存在非法数据崩溃问题 ([#2394](https://github.com/antvis/g2plot/pull/2394)) ([#2447](https://github.com/antvis/g2plot/pull/2447)) ([0f2bd788](https://github.com/antvis/g2plot/commit/0f2bd788c27a539822391aa197532ee43b821116))

#### 2.3.16 (2021-03-17)

##### Documentation Changes

* **legend:**  图例分页导航器的主题样式设置 ([#2435](https://github.com/antvis/g2plot/pull/2435)) ([e18fbf33](https://github.com/antvis/g2plot/commit/e18fbf335972f9ccd8f2616f1f63cf5e1742d30b))
* **theme:**  文档补充主题配置参考链接 ([#2433](https://github.com/antvis/g2plot/pull/2433)) ([e8f19b6c](https://github.com/antvis/g2plot/commit/e8f19b6c56583050eb82ba68cbf4bfdb225fbd2e))
*  statistic 英文文档完善 ([#2423](https://github.com/antvis/g2plot/pull/2423)) ([e690398b](https://github.com/antvis/g2plot/commit/e690398b00eede031b337bb01b9e1f97f8be1672))

##### New Features

*  add coordinate attribute to heatmap ([#2425](https://github.com/antvis/g2plot/pull/2425)) ([55842a6b](https://github.com/antvis/g2plot/commit/55842a6b1af3568a218f82bc80ffe7b7b777528e))
* **second-geometry:**  辅助几何图形 point 支持独立设置 state style ([#2429](https://github.com/antvis/g2plot/pull/2429)) ([7d0a5301](https://github.com/antvis/g2plot/commit/7d0a5301ae1ac5994fcb926080e03422d36d5d89))

##### Bug Fixes

* **multi-view:**  修复多图层图表折线图联动取数问题 ([#2428](https://github.com/antvis/g2plot/pull/2428)) ([52fb1471](https://github.com/antvis/g2plot/commit/52fb14717e8d547f4c82039b6b54cbb0c9f1d655))
* **liquid:**  annotation width ([#2418](https://github.com/antvis/g2plot/pull/2418)) ([9ce38a40](https://github.com/antvis/g2plot/commit/9ce38a40a61c3338aaa9a0cf09498fb4644d3258))

#### 2.3.14 (2021-03-11)

##### Documentation Changes

* docs(theme): 补充主题样式表的 api 使用文档 ([#2388](https://github.com/antvis/G2Plot/pull/2388)) ([425e704](https://github.com/antvis/G2Plot/commit/425e7049a36089d08386cd2a5d581118cf60fc3a))
* docs: update plugin ([#2389](https://github.com/antvis/G2Plot/pull/2389)) ([b8e99f2](https://github.com/antvis/G2Plot/commit/b8e99f2141ca5277fdcb626ec834c5015f16cdc8))
* docs(interactions): 补充交互配置文档 ([#2390](https://github.com/antvis/G2Plot/pull/2390)) ([77f9133](https://github.com/antvis/G2Plot/commit/77f9133f44737ee93c273a4aa638a47e46553574))

##### New Features

* 矩形树图：新增下钻面包屑指引 ([#2386](https://github.com/antvis/G2Plot/pull/2386)) ([ff9a470](https://github.com/antvis/G2Plot/commit/ff9a470b5327137067981cbcccfbaa8469f3574c))
* feat(gauge): 仪表盘支持配置 style,支持圆角仪表盘 ([#2395](https://github.com/antvis/G2Plot/pull/2395)) ([7a34182](https://github.com/antvis/G2Plot/commit/7a3418216c1377933cc28a7fd8b08bf9b6d65a96))
* feat(gauge): gauge 支持像素级别设置宽度 ([#2402](https://github.com/antvis/G2Plot/pull/2402)) ([e87ea30](https://github.com/antvis/G2Plot/commit/e87ea301aa9646223200e54e9506e8c3bf9bf3de))

##### Bug Fixes

* Fix/liquid shape bugs ([#2396](https://github.com/antvis/G2Plot/pull/2396)) ([e416b44](https://github.com/antvis/G2Plot/commit/e416b449bf371ffa0055dbd00d2d6c30234a1e21))
* fix: bullet 的 target 支持回调函数处理 ([#2397](https://github.com/antvis/G2Plot/pull/2397)) ([02d9942](https://github.com/antvis/G2Plot/commit/02d994283b0272f584ce132d3decdc097d8f0b15))
* fix(#2375): 修复饼图中心文本交互没有使用 custom-html ([#2413](https://github.com/antvis/G2Plot/pull/2413)) ([bb848cf](https://github.com/antvis/G2Plot/commit/bb848cf3a58353a2508d38f65975e13963d27fd5))
* fix(pie-tooltip): tooltip 默认设置 fields 和 formatter 只针对全 0 场景 ([#2415](https://github.com/antvis/G2Plot/pull/2415)) ([85156c8](https://github.com/antvis/G2Plot/commit/85156c827c7c47e48596edb20cebe84cc256f9e1))

#### 2.3.13 (2021-03-02)

##### Chores

*  fix website build error ([#2351](https://github.com/antvis/g2plot/pull/2351)) ([41459220](https://github.com/antvis/g2plot/commit/4145922098169119529d59f4b59fffff5950a671))

##### Documentation Changes

* **typo:**  dblclick, not dbclick ([#2380](https://github.com/antvis/g2plot/pull/2380)) ([f281658e](https://github.com/antvis/g2plot/commit/f281658e9c774db4a1e24df1ecce6d82ab900093))
*  文档日常 ([#2371](https://github.com/antvis/g2plot/pull/2371)) ([a8e8219c](https://github.com/antvis/g2plot/commit/a8e8219cfb46e08aa9a112e80e6dfb18c59d6288))
* **slider:**  缩略轴支持配置 handler 样式 & 增加 api 文档说明 ([#2347](https://github.com/antvis/g2plot/pull/2347)) ([bff3fdc2](https://github.com/antvis/g2plot/commit/bff3fdc2cf84688e17b895b31ba3c588280b2c1a))
* **axis:**  坐标轴文档 ([#2361](https://github.com/antvis/g2plot/pull/2361)) ([ac3e2f9d](https://github.com/antvis/g2plot/commit/ac3e2f9d522e2853dd291e18e9ab763fe6040bfe))

##### New Features

* **sankey:**
  *  update d3-sankey layout for depth customize ([#2378](https://github.com/antvis/g2plot/pull/2378)) ([bc108703](https://github.com/antvis/g2plot/commit/bc1087030bedf7598c64208bf5778384b6b8f3a3))
  *  changeData API for sankey ([#2367](https://github.com/antvis/g2plot/pull/2367)) ([63eb8181](https://github.com/antvis/g2plot/commit/63eb81815e037a52d61eb995c96aff15f6883950))
*  treemap 提供 changeData 能力 ([#2370](https://github.com/antvis/g2plot/pull/2370)) ([69e17cf4](https://github.com/antvis/g2plot/commit/69e17cf4902f43f6487ba2bf9b1e259e6c2b7d70))
*  sankey node depth configure ([#2357](https://github.com/antvis/g2plot/pull/2357)) ([fa63cb9c](https://github.com/antvis/g2plot/commit/fa63cb9ca89c7ee77dacd32dafbad09a2be6be89))
*  玫瑰图新增 startAngle、endAngle ([#2350](https://github.com/antvis/g2plot/pull/2350)) ([15e16036](https://github.com/antvis/g2plot/commit/15e16036f41d5aaea2d0883c1fbfba62499609b1))
*  multiview 支持 multi-plots && 支持 association 🎉🎉🎉 ([#2294](https://github.com/antvis/g2plot/pull/2294)) ([90a85929](https://github.com/antvis/g2plot/commit/90a8592990638727540102dfc1e27fbe34787eba))
* **gauge:**  仪表盘支持 annotations ([#2345](https://github.com/antvis/g2plot/pull/2345)) ([2f5b0e85](https://github.com/antvis/g2plot/commit/2f5b0e8572b18bad83e2543ae18701a50800db36))
* **ring-progress:**  将环形进度条的 z-index 进行调整,默认置顶 shape0 ([#2344](https://github.com/antvis/g2plot/pull/2344)) ([d6438e85](https://github.com/antvis/g2plot/commit/d6438e853370891c6c291ed03d6ffd004bbfeb05))

##### Bug Fixes

* **sankey:**  shape order same with data, layout space ([#2354](https://github.com/antvis/g2plot/pull/2354)) ([c86625ca](https://github.com/antvis/g2plot/commit/c86625cacf59ff4c303075a99d86bc665190d92a))

#### 2.3.12 (2021-02-23)

##### Documentation Changes

* **heatmap:**  添加热力新年 demo ([#2339](https://github.com/antvis/g2plot/pull/2339)) ([a799beea](https://github.com/antvis/g2plot/commit/a799beeadae2cbd89d3ff5299d4e83fa9150597d))
*  增加 column，bar 背景色设置的 demo & 图表指引 ([#2333](https://github.com/antvis/g2plot/pull/2333)) ([967c1e69](https://github.com/antvis/g2plot/commit/967c1e69a743158c2c991c1b621080b342353d19))
*  scrollbar style & lock editor version ([#2328](https://github.com/antvis/g2plot/pull/2328)) ([ea9a5757](https://github.com/antvis/g2plot/commit/ea9a575711778635a7ba24f4b00d6e0ed896a74e))
*  fix link 404 ([#2311](https://github.com/antvis/g2plot/pull/2311)) ([98d63c6e](https://github.com/antvis/g2plot/commit/98d63c6e0e9e5528470e173f04d841c1b5f4c77e))
* **interactions:**  交互相关的 api 文档补充 ([#2315](https://github.com/antvis/g2plot/pull/2315)) ([2b12ec73](https://github.com/antvis/g2plot/commit/2b12ec73336e3cbbb3f672c515bc618969c0652a))
* **dual-axes:**  双轴图补充 meta 使用示例 ([#2314](https://github.com/antvis/g2plot/pull/2314)) ([0e7b260f](https://github.com/antvis/g2plot/commit/0e7b260f139e5b3d61cb4e11f96ec1919949e807))

##### New Features

*  treemap layout optimize ([#2337](https://github.com/antvis/g2plot/pull/2337)) ([312bcdbd](https://github.com/antvis/g2plot/commit/312bcdbde224e6f84b35fcc67a53016f5e1764a1))
*  雷达图新增 innerRadius、startAngle、endAngle ([#2323](https://github.com/antvis/g2plot/pull/2323)) ([11639171](https://github.com/antvis/g2plot/commit/1163917119108ea62e94ecb2ee57b98d9059c8d9))
*  export default-options, you can use staticMethod to getDefaultOptions, like `Plot.getDefaultOptions()` ([#2307](https://github.com/antvis/g2plot/pull/2307)) ([8efbdd64](https://github.com/antvis/g2plot/commit/8efbdd648c82130c5fab8090771b043fab86cad5))
* **radial-bar:**  add radial bar label adaptor ([#2336](https://github.com/antvis/g2plot/pull/2336)) ([2f0961b1](https://github.com/antvis/g2plot/commit/2f0961b1cd0f12302d950f76732de7749a19cbf4))
* **state-style:**  若干图表支持 state 设置样式 & 增加文档 ([#2334](https://github.com/antvis/g2plot/pull/2334)) ([f45d02bc](https://github.com/antvis/g2plot/commit/f45d02bcc9920f7a7f4ebe99cc35bf01ad91bef3))

##### Bug Fixes

*  gague,pie,ring-progress,liquid 等 changedata 触发钩子事件 ([#2319](https://github.com/antvis/g2plot/pull/2319)) ([8bf5a6a9](https://github.com/antvis/g2plot/commit/8bf5a6a9bd92e685594aa4ec7ecdf4791da6e815))
*  pie tooltip ([#2312](https://github.com/antvis/g2plot/pull/2312)) ([4c42f513](https://github.com/antvis/g2plot/commit/4c42f513484cc857076c954ff8a86ace0cd286a0))
* **bar:**  bar plot not transformData before changedata ([#2317](https://github.com/antvis/g2plot/pull/2317)) ([7692fcb8](https://github.com/antvis/g2plot/commit/7692fcb8f6ae76edce3ce814a4d95a95ed2e5702))
* **column:**  update scales when changeData ([#2303](https://github.com/antvis/g2plot/pull/2303)) ([#2306](https://github.com/antvis/g2plot/pull/2306)) ([08570163](https://github.com/antvis/g2plot/commit/08570163b6f761a22ea7fa4f1397d5516c483557))

#### 2.3.11 (2021-02-03)

##### Documentation Changes

*  图表组件 api 整理 ([#2290](https://github.com/antvis/g2plot/pull/2290)) ([97c520df](https://github.com/antvis/g2plot/commit/97c520df14d50192fcdda7547e7d26a11dac428a))
*  add pyg2plot ([#2284](https://github.com/antvis/g2plot/pull/2284)) ([2a6b76c7](https://github.com/antvis/g2plot/commit/2a6b76c7fc8e8e2aa472b64e6d6bf60906da7580))
*   AxisCfg API  title.title => title.text ([#2277](https://github.com/antvis/g2plot/pull/2277)) ([067f6b02](https://github.com/antvis/g2plot/commit/067f6b02f06386e56499c488313ee9b1195223b1))

##### New Features

*  双轴图新增 slider ([#2287](https://github.com/antvis/g2plot/pull/2287)) ([0276528d](https://github.com/antvis/g2plot/commit/0276528d10fb5d1eef463c1a138738cf25d476b2))
* **sankey:**  add nodeWidth, nodePadding options ([#2295](https://github.com/antvis/g2plot/pull/2295)) ([947889b3](https://github.com/antvis/g2plot/commit/947889b3cbf649721281f848c21bfe0418ed72f0))
* **animation:**  增加动画文档和 demo & 多图层图表支持分 view 动画 ([#2291](https://github.com/antvis/g2plot/pull/2291)) ([9e62cb91](https://github.com/antvis/g2plot/commit/9e62cb91919c46bc7a659a89f3ec0900a765ba8c))

#### 2.3.10 (2021-01-27)
#### New Features

*  feat(gauge): 支持配置米轨仪表盘 ([#2271](https://github.com/antvis/G2Plot/pull/2271)) ([53ebbfa](https://github.com/antvis/G2Plot/commit/53ebbfa9ac63163f2ae726514eb84c353f6c2094))
*  feat(treemap): 矩形树图增加下钻交互 ([#2219](https://github.com/antvis/G2Plot/pull/2219)) ([9f206e3](https://github.com/antvis/G2Plot/commit/9f206e33bcefd35b4268f3bf89497dd1167498af))
*  feat(pie): 饼图 geometry 默认对 elemenent 的 zIndex 进行反序 ([#2266](https://github.com/antvis/G2Plot/pull/2266)) ([a5971b6](https://github.com/antvis/G2Plot/commit/a5971b612ed5bd4712ac2ee0956eba99b4677856))
*  feat(pie): 饼图支持动态更新数据，支持通过 Pie.getDefauletOptions() 获取默认配置项 ([#2257](https://github.com/antvis/G2Plot/pull/2257)) ([47fa687](https://github.com/antvis/G2Plot/commit/47fa687c89a6d2a2305e7f4fda377b47dc00a47b))

##### Bug Fixes

*  **issue-2264** 修复瀑布图 formatter 不生效 ([#2270](https://github.com/antvis/G2Plot/pull/2270)) ([6787c8b](https://github.com/antvis/G2Plot/commit/6787c8b890c4d03956deb2a9a14d09d78d5470c5))
*  fix: 修复散点图 size 回调不生效 ([#2263](https://github.com/antvis/G2Plot/pull/2263)) ([510c1b5](https://github.com/antvis/G2Plot/pull/2263))
*  fix: 饼图数据存在 NaN 时，浏览器崩溃 && 修复中心统计文本更新为 false，再更新为显示，样式丢失 ([#2257](https://github.com/antvis/G2Plot/pull/2257)) ([47fa687](https://github.com/antvis/G2Plot/commit/47fa687c89a6d2a2305e7f4fda377b47dc00a47b))

##### Documentation Changes

*  图表案例导航顺序调整 & 主题文档修整 ([#2272](https://github.com/antvis/G2Plot/pull/2272)) ([b5fc660](https://github.com/antvis/G2Plot/commit/b5fc66000136116247304255aca2661c97f899e3))
*  完善图表组件文档 ([#2268](https://github.com/antvis/G2Plot/pull/2268)) ([5a35039](https://github.com/antvis/G2Plot/commit/5a3503907739851af9f67c8f949d2b681233f3d2))
*  docs: 补充图表英文文档 ([#2262](https://github.com/antvis/G2Plot/pull/2262)) ([f1d44c3](https://github.com/antvis/G2Plot/pull/2262))
*  docs: 补充仪表盘文档 ([#2261](https://github.com/antvis/G2Plot/pull/2261)) ([25e1b42](https://github.com/antvis/G2Plot/commit/25e1b4269ba2aca3c10d634aaa5dec0f3940b163))
*  docs: 文档层级错误 & 修改 tooltip domStyles 类型定义 ([#2254](https://github.com/antvis/G2Plot/pull/2254)) ([81809a2](https://github.com/antvis/G2Plot/commit/81809a24ff5ec6729fc3801814579ea2ff12a238))

#### 2.3.9 (2021-01-20)

##### Documentation Changes

*  multi-language ([#2244](https://github.com/antvis/g2plot/pull/2244)) ([a11e84e7](https://github.com/antvis/g2plot/commit/a11e84e739fc770b163e1543ca66534d7623f69f))

##### New Features

*  多图层图表正式开放 ([#2245](https://github.com/antvis/g2plot/pull/2245)) ([963399ac](https://github.com/antvis/g2plot/commit/963399acd74959a175d2165927e0852d2f129ff5))
*  为 treemap 新增 rectstyle 和 hierarchyConfig 属性 ([#2234](https://github.com/antvis/g2plot/pull/2234)) ([bcd21431](https://github.com/antvis/g2plot/commit/bcd2143152e3c72ba2ea36340d57a2fa87f6bf0d))
*  重写子弹图 changeData 方法 && 添加单测 ([#2221](https://github.com/antvis/g2plot/pull/2221)) ([afb49a60](https://github.com/antvis/g2plot/commit/afb49a608bc40536d44168f2ad25c0c2e34d2bb3))
*  散点图支持动态更新数据 & 添加单测 ([#2225](https://github.com/antvis/g2plot/pull/2225)) ([ee488955](https://github.com/antvis/g2plot/commit/ee488955ac5760fe33c4af5ceef18cab573c26fa))
* **radial-bar:**  玉珏图支持配置开始角度和结束角度 ([#2251](https://github.com/antvis/g2plot/pull/2251)) ([b18b4d2b](https://github.com/antvis/g2plot/commit/b18b4d2bcbbece75f98d84afe31c3588dfb56b71))
* **waterfall:**  瀑布图回调参数增加分类字段 ([#2235](https://github.com/antvis/g2plot/pull/2235)) ([e81665c5](https://github.com/antvis/g2plot/commit/e81665c5566f739422fea88ce3d37b8fac0be1c2))

##### Bug Fixes

* **word-cloud:**  由于无法判断首次 render 是否 ready，changedata 时，如果有 imageMask，重渲染 ([#2252](https://github.com/antvis/g2plot/pull/2252)) ([b5fe6475](https://github.com/antvis/g2plot/commit/b5fe6475558a377ec022ddb14cd6c0e05432e9d6))
*  size 判断移入 geometry 里面 ([#2237](https://github.com/antvis/g2plot/pull/2237)) ([a9f37137](https://github.com/antvis/g2plot/commit/a9f37137bb23f954364d9a27cc32646125f77318))
*  对称条形图 meta 支持 yField 设置别名 ([#2240](https://github.com/antvis/g2plot/pull/2240)) ([903a393d](https://github.com/antvis/g2plot/commit/903a393d12716c0484e6b4fe23c9fde45af1198a))
* **issue-2216:**  饼图默认强制关闭 tooltip shared ([#2241](https://github.com/antvis/g2plot/pull/2241)) ([37cf8a70](https://github.com/antvis/g2plot/commit/37cf8a708876fd95df661289a5308457afd03996))
* **#2236:**  liquid distance calculate error ([#2238](https://github.com/antvis/g2plot/pull/2238)) ([319789be](https://github.com/antvis/g2plot/commit/319789be5624dd2721aa16a1d63a572c0e79605c))

##### Refactors

* **bullet:**  子弹图升级下 & 修复 axis 配置失效 ([#2228](https://github.com/antvis/g2plot/pull/2228)) ([8ac55498](https://github.com/antvis/g2plot/commit/8ac554981ebc6f3bb8fdb48ecffa0fc85c25686d))

#### 2.3.8 (2021-01-13)

##### Documentation Changes


* **Plot Guide:** 教程页增加以图表类型分类的图表指引 ✨ ([#2194](https://github.com/antvis/g2plot/pull/2194)) ([d97f6910](https://github.com/antvis/g2plot/commit/d97f69108aa27287282c1d021a7e786fef3cd09e))
* **column:**  柱状图的图表指引增加一些特性介绍 ([#2201](https://github.com/antvis/g2plot/pull/2201)) ([60c72b3b](https://github.com/antvis/g2plot/commit/60c72b3b563b7301e79928e03357423e06cd03c3))
*  添加钉钉联系方式 ([#2213](https://github.com/antvis/g2plot/pull/2213)) ([8473559e](https://github.com/antvis/g2plot/commit/8473559eed48c35c266a65652c27b3a7e1f42c20))
*  优化图表示例 api 文档样式 ([#2209](https://github.com/antvis/g2plot/pull/2209)) ([a842cf6c](https://github.com/antvis/g2plot/commit/a842cf6ce8ad8101b5d191c02c63d9e57b6c8236))

##### New Features

* **columnBackground, barBackground:** 柱、条形图，玉珏图等支持配置图形背景 ✨ ([#2190](https://github.com/antvis/g2plot/pull/2190)) ([cbd087ae](https://github.com/antvis/g2plot/commit/cbd087ae6270c9ede70825c803adf764736ce34f))
* **column:**  柱状图支持圆角 & 添加图表指引 ✨ ([#2215](https://github.com/antvis/g2plot/pull/2215)) ([1e186819](https://github.com/antvis/g2plot/commit/1e18681976c3c16beb963710c9f1f8164f6d0148))
* **word-cloud:**  词云图支持展示 legend ([#2208](https://github.com/antvis/g2plot/pull/2208)) ([f539977d](https://github.com/antvis/g2plot/commit/f539977d20626b7ac550dde0cf2c2631a7f36ff4))
* **word-cloud:** 词云图重写 `changeData` 方法 && 添加单测 ([#2214](https://github.com/antvis/g2plot/pull/2214)) ([f3d6d7e7](https://github.com/antvis/g2plot/commit/f3d6d7e777a821c9bf8d2b74e8f51a595fdfed7c))
* **waterfall:** 重写瀑布图 `changeData` 方法 && 添加单测 ([#2212](https://github.com/antvis/g2plot/pull/2212)) ([547d7dd7](https://github.com/antvis/g2plot/commit/547d7dd77caac67e902aea1e58d9cda83e669995))
* **radial-bar:** 玉珏图重写 `changeData` 方法 && 添加单测 ([#2206](https://github.com/antvis/g2plot/pull/2206)) ([71868f22](https://github.com/antvis/g2plot/commit/71868f22e26fc635c18f74bd54ce5bd12e58ab2e))
* **radar:** 雷达图重写 `changeData` 方法 && 添加单测 ([#2205](https://github.com/antvis/g2plot/pull/2205)) ([144cf23b](https://github.com/antvis/g2plot/commit/144cf23bcd05a384e6b326c3f5273c3819c08f40))
* **rose:** 玫瑰图修改 `changeData` && 添加单测 ([#2200](https://github.com/antvis/g2plot/pull/2200)) ([eb44c0fd](https://github.com/antvis/g2plot/commit/eb44c0fda2eaf58d543926e83d519e7f191c9809))
* **progress:**  进度条和环形进度条支持 `changeData` ([#2197](https://github.com/antvis/g2plot/pull/2197)) ([0788dbff](https://github.com/antvis/g2plot/commit/0788dbff6e2e3bd22cafb13a463a495418401fb5))
* **tiny-plot:** 迷你折线图和迷你柱形图重写 `changeData` && 添加单测 ([#2177](https://github.com/antvis/g2plot/pull/2177)) ([921deb67](https://github.com/antvis/g2plot/commit/921deb67622a735882560f67c299e68685752f3a))
* **stock:** stock 股票图重写 `changeData` 方法 ([#2170](https://github.com/antvis/g2plot/pull/2170)) ([ed081070](https://github.com/antvis/g2plot/commit/ed081070acf4b83330288946c9750062497fc9df))
* **histogram:**  直方图支持动态 `changedata` ([#2199](https://github.com/antvis/g2plot/pull/2199)) ([a817274d](https://github.com/antvis/g2plot/commit/a817274dddd01a133ccad82ee636b35450402146))
* **liquid:**  水波图支持动态 `changedata` ([#2198](https://github.com/antvis/g2plot/pull/2198)) ([d1610f29](https://github.com/antvis/g2plot/commit/d1610f296c74cca3aff1d8d1b76cf36eeb12bba0))
* **tiny-plot:**  迷你图默认开启动画效果([#2196](https://github.com/antvis/g2plot/pull/2196)) ([8dd8064e](https://github.com/antvis/g2plot/commit/8dd8064ed59b9678b845b8796c17e40c55ba7a3c))
* **treemap:** `label.formatter` 传参和 `label.field` 相对应,方便用户使用自定义数据设置 label ，tooltip 同 ([#2188](https://github.com/antvis/g2plot/pull/2188)) ([159f80c1](https://github.com/antvis/g2plot/commit/159f80c119952f09bf660a66dc68491389f2136f))
* **sankey:** add default label layout ([#2186](https://github.com/antvis/g2plot/pull/2186)) ([470577ac](https://github.com/antvis/g2plot/commit/470577ac6313bd71d2f038722c47385ffb2a2fea))

##### Bug Fixes

* **对称条形图:** 数据顺序问题, 修复设置 title 时左侧的 title 是反转的 ([#2204](https://github.com/antvis/g2plot/pull/2204)) ([08ba3b9b](https://github.com/antvis/g2plot/commit/08ba3b9b12a404a0cd320b45d6d8847c2a8212f2))
* **环形图及迷你进度条:** crash when percent = NaN ([#2211](https://github.com/antvis/g2plot/pull/2211)) ([b8de33ac](https://github.com/antvis/g2plot/commit/b8de33ac9c0f0e1abc9ef5566a1a1a17c8574a43))
* **radial-bar:**  修复 `type=line` 的玉珏图，设置`color`对 `point` 不生效 ([#2185](https://github.com/antvis/g2plot/pull/2185)) ([c47329f4](https://github.com/antvis/g2plot/commit/c47329f44ac1acc554a48e5bf56252175bb604b7))
* **demo:**  demo 实例容器自适应，不需要加宽高 否则影响动画效果 ([#2193](https://github.com/antvis/g2plot/pull/2193)) ([cf8b4c14](https://github.com/antvis/g2plot/commit/cf8b4c147191abda421652011b8427767aa8c9e0))

#### 2.3.7 (2021-01-07)

##### Documentation Changes

* **plugin-plot:**  收录 g2plot-lollipop 自定义图表 ([#2181](https://github.com/antvis/g2plot/pull/2181)) ([383d8f71](https://github.com/antvis/g2plot/commit/383d8f713ffaeb28f900ad06c5e6686f4b9a009e))
*  增加 meta options 的配置说明文档 & radar demo 移除数据处理逻辑 ([#2182](https://github.com/antvis/g2plot/pull/2182)) ([d7c09ca1](https://github.com/antvis/g2plot/commit/d7c09ca185220ea783d3346f485acbee7d7757b8))
*  迁移和弦图文档地址 & 文档样式优化 & 修复 绘图属性文档链接 404 ([#2172](https://github.com/antvis/g2plot/pull/2172)) ([79dc60ba](https://github.com/antvis/g2plot/commit/79dc60ba9cd5045a1a07051b1e93dadeee74d54c))
*  修复教程页的 404 链接 & 优化 api 文档的字体间距等样式 ([#2167](https://github.com/antvis/g2plot/pull/2167)) ([2f401dc6](https://github.com/antvis/g2plot/commit/2f401dc6ec3c9652c7bd5538f603b60ac3aa8106))

##### New Features

* **sankey:**  remove the circle data in sankey ([#2178](https://github.com/antvis/g2plot/pull/2178)) ([e248c8e3](https://github.com/antvis/g2plot/commit/e248c8e314bb0ca1d4c409bd81ce65ecc8dcdd36))
*  迷你折线图和迷你柱形图重写 changeData && 添加单测 ([#2177](https://github.com/antvis/g2plot/pull/2177)) ([921deb67](https://github.com/antvis/g2plot/commit/921deb67622a735882560f67c299e68685752f3a))
*  饼图支持配置坐标系 startAngle 和 endAngle ([#2164](https://github.com/antvis/g2plot/pull/2164)) ([24681490](https://github.com/antvis/g2plot/commit/24681490201632a252b210fca7f4b5726aef428f))
* **open-ability:**  开放通用的 adaptors 给自定义扩展图表使用 ([#2166](https://github.com/antvis/g2plot/pull/2166)) ([223473de](https://github.com/antvis/g2plot/commit/223473de1aaf49bec610b24c65f598f342bee6dd))

##### Bug Fixes

* **dual-axes:**  双轴图的 y 字段相同的时候,导致 yaxis 配置被覆盖 ([#2176](https://github.com/antvis/g2plot/pull/2176)) ([b46e6b37](https://github.com/antvis/g2plot/commit/b46e6b37f4bc2af18c6846413c93f64fc21edfe9))
*  stock 股票图重写 changeData 方法 ([#2170](https://github.com/antvis/g2plot/pull/2170)) ([ed081070](https://github.com/antvis/g2plot/commit/ed081070acf4b83330288946c9750062497fc9df))
* **issue-2161:**  修复数据项存在非法 undefined 时，获取数据 max 为 NaN，导致玉珏图渲染页面崩溃 ([#2168](https://github.com/antvis/g2plot/pull/2168)) ([536adf90](https://github.com/antvis/g2plot/commit/536adf90ebff40ab57320377400a505a00f076e8))

#### 2.3.6 (2020-12-30)

##### Documentation Changes

* 增加动态交互图表 & 文档 typo 修整 ([#2154](https://github.com/antvis/g2plot/pull/2154)) ([72bbfa4b](https://github.com/antvis/g2plot/commit/72bbfa4b4c9b76885a1365dc3a00532d8b977c46))

##### New Features

* new plot treemap ([#2023](https://github.com/antvis/g2plot/pull/2023)) ([45808e3e](https://github.com/antvis/g2plot/commit/45808e3e424a44fa77534cdb4d38b54c386f2062))
* column and bar plot support pixel width setting ([#2156](https://github.com/antvis/g2plot/pull/2156)) ([db09fa41](https://github.com/antvis/g2plot/commit/db09fa4177390c16650e70bcefaf52569fa6f3c1))
* area support changeData ([#2153](https://github.com/antvis/g2plot/pull/2153)) ([4a8ef9fb](https://github.com/antvis/g2plot/commit/4a8ef9fba92c88486e73ae930be7b2b8fcc1bac8))
* changedata API ([#2142](https://github.com/antvis/g2plot/pull/2142)) ([ac172352](https://github.com/antvis/g2plot/commit/ac1723523d52d62f7e95b5188809d4806770aabe))

##### Bug Fixes

* **funnel:**  funnel conversion value ([#2159](https://github.com/antvis/g2plot/pull/2159)) ([08cf891b](hhttps://github.com/antvis/G2Plot/commit/222af2f4bf880b208d3b4939eaa6ce4e08cf891b))
* **conversion:**  conversion calculate error ([#2160](https://github.com/antvis/g2plot/pull/2160)) ([1aefd258](https://github.com/antvis/g2plot/commit/1aefd258c22255e39abbe039b81228f034e1cdf0))

#### 2.3.5 (2020-12-28)

##### Bug Fixes

*  funnel undefined render ([#2150](https://github.com/antvis/g2plot/pull/2150)) ([b443dbdf](https://github.com/antvis/g2plot/commit/b443dbdf8f870c770a83d7e63ebcf4ac7945c610))

#### 2.3.4 (2020-12-24)

##### Documentation Changes

* improve docs of legend ([#2128](https://github.com/antvis/g2plot/pull/2128))([19e7e1c](https://github.com/antvis/G2Plot/commit/19e7e1c18280a484e25f9966392ec4983099d461))
* fix 404 links ([#2132](https://github.com/antvis/g2plot/pull/2132)) ([7394274](https://github.com/antvis/G2Plot/commit/739427420d796e201310403edff27b1a56edc701))

##### New Features

* **donut:** can enable statistic and tooltip meanwhile([#2127](https://github.com/antvis/g2plot/pull/2127)) ([5a8c85d](https://github.com/antvis/G2Plot/commit/5a8c85dc2315398c1c5b27f635170636a346fa79))
* **bullet:** add default label layout([#2141](https://github.com/antvis/G2Plot/pull/2141)) ([5378162](https://github.com/antvis/G2Plot/commit/53781623e4f4c04b1ee9af1c8cd4def7ee52c8b7))


##### Bug Fixes

* **funnel:** fix funnel crash when data contains null, 0([#2138](https://github.com/antvis/G2Plot/pull/2138)) ([a318310](https://github.com/antvis/G2Plot/commit/a318310fbd5d87097e9b30a19798640a186dfa43))
* remove all the lib import([#2131](https://github.com/antvis/G2Plot/pull/2131)) ([1753089](https://github.com/antvis/G2Plot/commit/1753089385a69667b7346e73856ec5f7c840f6f7))

#### 2.3.3 (2020-12-18)

##### Documentation Changes

*  fix image url is http ([#2115](https://github.com/antvis/g2plot/pull/2115)) ([48547f85](https://github.com/antvis/g2plot/commit/48547f85fed89708b4133f89bfa94b47ad292ba7))
*  修复文档 404 ([#2112](https://github.com/antvis/g2plot/pull/2112)) ([6f858076](https://github.com/antvis/g2plot/commit/6f8580769f6ffae3ad3b6a09ed3eecd47e7c9d2f))
*  日常走查 ([#2103](https://github.com/antvis/g2plot/pull/2103)) ([1c5e1e99](https://github.com/antvis/g2plot/commit/1c5e1e994a30df618268a94d74544098fbe6d7ff))

##### New Features

*  add chart type source in container ([#2108](https://github.com/antvis/g2plot/pull/2108)) ([c26eb37a](https://github.com/antvis/g2plot/commit/c26eb37aae691247bd8c42f78b86158b9ead1566))
* **liquid:**  add outline, wave options for customize ([#2099](https://github.com/antvis/g2plot/pull/2099)) ([e6647efc](https://github.com/antvis/g2plot/commit/e6647efc2530f9025a667e50b6fca88eb7a3913f))

##### Bug Fixes

* **2105:**  fix percent column/bar yAxis lable > 1 ([#2107](https://github.com/antvis/g2plot/pull/2107)) ([5d749670](https://github.com/antvis/g2plot/commit/5d7496708504f0716e9d403b6f1603f3b4b9a916))
*  修复网站 demo 错误 ([#2120](https://github.com/antvis/g2plot/pull/2120)) ([a03e97ba](https://github.com/antvis/g2plot/commit/a03e97ba79ed61b50547ce14908c14e15c9f663d))
* **#2116:**  percent transform should keep data order ([#2118](https://github.com/antvis/g2plot/pull/2118)) ([bbda837a](https://github.com/antvis/g2plot/commit/bbda837a4ad2791b475a2c3b963316c4f6aac9ff))
* **#2111:**  appendPadding not update ([#2113](https://github.com/antvis/g2plot/pull/2113)) ([13694ac5](https://github.com/antvis/g2plot/commit/13694ac5da7415234f48f55093f9d0bb876c7ae4))

##### Refactors

* **demo:**  诺贝尔奖可视化 demo 优化 ([#2106](https://github.com/antvis/g2plot/pull/2106)) ([66c63338](https://github.com/antvis/g2plot/commit/66c63338f1ea679ec74161e958202bafbd49a00b))

#### 2.3.2 (2020-12-11)

##### Chores

*  fix preview workflow vulnerability ([#2069](https://github.com/antvis/g2plot/pull/2069)) ([960b7413](https://github.com/antvis/g2plot/commit/960b741372b00d95f115647db5ce60b9cf50f5a1))

##### New Features

*  散点图一个数据点时调整 min max ([#2075](https://github.com/antvis/g2plot/pull/2075)) ([290fb5a0](https://github.com/antvis/g2plot/commit/290fb5a062a9c04af929c9a2ec0ef5b0ad914ce1))

##### Bug Fixes

* **pie-statistic:**  修复环图中心文本从 false 更新为 null，读取空对象属性出错 ([#2092](https://github.com/antvis/g2plot/pull/2092)) ([cf14b369](https://github.com/antvis/g2plot/commit/cf14b369d490d617fc1352f1a2635bf2eb00dc4f))
* **pie-statistic-action:**  修复 changeSize 时，环图中心文本偶发报错 ([#2093](https://github.com/antvis/g2plot/pull/2093)) ([d3a0ece9](https://github.com/antvis/g2plot/commit/d3a0ece94398f2a4db63e3a63dfed42b10a33b8d))
*  修改官网样式覆盖问题 ([#2090](https://github.com/antvis/g2plot/pull/2090)) ([5a2ce6de](https://github.com/antvis/g2plot/commit/5a2ce6de173700789e38d7d223c3ad565693fee7))
*  only enable tooltip for prmary geometry for line/area/radar ([#2087](https://github.com/antvis/g2plot/pull/2087)) ([c006f467](https://github.com/antvis/g2plot/commit/c006f467decf8596f7987debea2041546ef56037))
*  fix duplicated label renderde for line/area/radar plot ([#2071](https://github.com/antvis/g2plot/pull/2071)) ([66a1088b](https://github.com/antvis/g2plot/commit/66a1088b095596d785c0bb62e9fad67465cc3b4a))
*  fix early create canvas context cause build error in server side ([#2066](https://github.com/antvis/g2plot/pull/2066)) ([5cdbda35](https://github.com/antvis/g2plot/commit/5cdbda355d3772e9b0daf41db997e8c3fe3904ca))
* **gauge:**  仪表盘的 ticks 默认不均匀,且自定义 scale 无效 ([#2085](https://github.com/antvis/g2plot/pull/2085)) ([089b123f](https://github.com/antvis/g2plot/commit/089b123f908173ff11aced5bc3e636898cabd1f0))
* **sankey:**  close sankey node tooltip ([#2072](https://github.com/antvis/g2plot/pull/2072)) ([4be91f92](https://github.com/antvis/g2plot/commit/4be91f92b8e2f08ec34ff37a3397ecfa3963727f))
* **issue-2078:**  修复 waterfall 无法关闭 tooltip ([#2079](https://github.com/antvis/g2plot/pull/2079)) ([b2716608](https://github.com/antvis/g2plot/commit/b271660868a25957fa2b6eb94219e9d161910b90))

#### 2.3.1 (2020-12-02)

##### Documentation Changes

- 新增 FAQ 降低答疑成本 ([#2050](https://github.com/antvis/g2plot/pull/2050)) ([10f934c8](https://github.com/antvis/g2plot/commit/10f934c8ed24368b9caf68002469ed7a742845ea))
- 新增网格配置 demo ([#2027](https://github.com/antvis/g2plot/pull/2027)) ([3fac3c6e](https://github.com/antvis/g2plot/commit/3fac3c6ea5d1339f8a9ed087470d911692ea77f1))
- 增加 angular 技术栈的 g2plot 封装收录链接 ([#2060](https://github.com/antvis/g2plot/pull/2060)) ([d7a085db](https://github.com/antvis/g2plot/commit/d7a085dba84dc7db6ca8b35919f52143760d099a))
- plots 文档按照以下格式补全 ([#2035](https://github.com/antvis/g2plot/pull/2035)) ([bc7d1dc3](https://github.com/antvis/g2plot/commit/bc7d1dc33d8b12801e895daf6e6b372a6b27836f))

##### New Features

- **pie-label:** 饼图标签文本添加溢出 plot 自动 ellipsis 特性 ([#2051](https://github.com/antvis/g2plot/pull/2051)) ([4cc89aa9](https://github.com/antvis/g2plot/commit/4cc89aa9c2a422166337907f4e593e7b68ac7a66))
- add default label layout for line/area/column/bar ([#2061](https://github.com/antvis/g2plot/pull/2061)) ([494438c4](https://github.com/antvis/g2plot/commit/494438c4fcf82f194ca44d9fab678745305f1a6d))
- new plot sankey 桑基图 ([#2016](https://github.com/antvis/g2plot/pull/2016)) ([cc2edaf8](https://github.com/antvis/g2plot/commit/cc2edaf860befdc4d0d9e61a7c8e5937304b3bd3))
- **line:** support lineShape config ([#2053](https://github.com/antvis/g2plot/pull/2053)) ([a3021c7d](https://github.com/antvis/g2plot/commit/a3021c7d831db360db70a8aaec62ed909a133695))
- 双轴图 label 支持 formatter ([#2033](https://github.com/antvis/g2plot/pull/2033)) ([59d636a5](https://github.com/antvis/g2plot/commit/59d636a5cf72cd637f175c159e83e2132b90a0b5))

##### Bug Fixes

- **bar:** adjust default legend and tooltip order ([#2049](https://github.com/antvis/g2plot/pull/2049)) ([d2925451](https://github.com/antvis/g2plot/commit/d292545177a0aacd0e656fcb8b3c79801a464d70))
- **word-cloud:** 修复当宽高为 0 时浏览器卡死 ([#2055](https://github.com/antvis/g2plot/pull/2055)) ([2fb711c2](https://github.com/antvis/g2plot/commit/2fb711c2c524b893dc013d08d588179cf00fe1ac))

#### 2.2.13 (2020-11-29)

##### New Features

- auto set limitInPlot in dual-axes and bidirectional-bar ([#2020](https://github.com/antvis/g2plot/pull/2020)) ([0882ca3](https://github.com/antvis/g2plot/commit/0882ca30d596f79bd8490aca9adce116f9663fae))

##### Bug Fixes

- fix yAxis.min & yAxis.max in tiny chart([#2022](https://github.com/antvis/g2plot/pull/2022)) ([56ae9f3](https://github.com/antvis/g2plot/commit/56ae9f3fe545387bbf578094b9a5501ba84d6679))
- fix tooltip setting in scatter([#2019](https://github.com/antvis/g2plot/pull/2019)) ([81885fe](https://github.com/antvis/G2Plot/commit/81885fe7daa1b2c0fd154e75cb589ed3ab0b7bad))
- fix word-cloud's font-size issue([#2017](https://github.com/antvis/G2Plot/pull/2017)) ([f19ad50](https://github.com/antvis/G2Plot/commit/f19ad50bd499b982df18af4db3d2f515c945aa6d))

#### 2.2.12 (2020-11-25)

##### New Features

- scatter regression 新增 top 配置 ([#2010](https://github.com/antvis/g2plot/pull/2010)) ([50fee30d](https://github.com/antvis/g2plot/commit/50fee30d6a6b91e7a5c196f345b66ee5c298a14f))
- auto set limitInPlot based on yAxis config ([#2009](https://github.com/antvis/g2plot/pull/2009)) ([c4a1794f](https://github.com/antvis/g2plot/commit/c4a1794fe05eceab69d0f37f14a0c2a19573faa9))
- 打开 limit in plot 配置 ([#2002](https://github.com/antvis/g2plot/pull/2002)) ([65b485d6](https://github.com/antvis/g2plot/commit/65b485d6957a2443eda82cd99ef751098aa150b4))

##### Bug Fixes

- **y-scale:** update y scale min, max ([#2013](https://github.com/antvis/g2plot/pull/2013)) ([125c4b74](https://github.com/antvis/g2plot/commit/125c4b741d26cd0d2a906379614c1c52e98f14f6))
- auto adjust scale min to zero for column/bar ([#2012](https://github.com/antvis/g2plot/pull/2012)) ([c5ff5fde](https://github.com/antvis/g2plot/commit/c5ff5fde7b4fbe48a34d2c869e956100448aefb6))
- 只允许在基础柱形图和条形图上开启转化率组件 ([#1994](https://github.com/antvis/g2plot/pull/1994)) ([257151c8](https://github.com/antvis/g2plot/commit/257151c82a73bb056159a24f306d677d7e24ffce))
- **line:** do not set default range as [0, 1] ([#2007](https://github.com/antvis/g2plot/pull/2007)) ([ef87448e](https://github.com/antvis/g2plot/commit/ef87448e8c297b93ea6f5321d81d5014df74f329))

#### 2.2.11 (2020-11-21)

##### Chores

- gitee mirror action ([#1964](https://github.com/antvis/g2plot/pull/1964)) ([ccc3e418](https://github.com/antvis/g2plot/commit/ccc3e418b9509888398998f299e0bfebae8a6926))

##### Documentation Changes

- 调整色值 ([#1987](https://github.com/antvis/g2plot/pull/1987)) ([2375272b](https://github.com/antvis/g2plot/commit/2375272b81b7781b5cddd6142a349a537ac39b9d))
- demo 走查 ([#1975](https://github.com/antvis/g2plot/pull/1975)) ([ed623a28](https://github.com/antvis/g2plot/commit/ed623a28cc48e964e410a02b7f33aee92da9073e))
- 补充四象限气泡图 ([#1960](https://github.com/antvis/g2plot/pull/1960)) ([ea0f6753](https://github.com/antvis/g2plot/commit/ea0f67532a86efeb36296bb01631217709c56e4b))
- fix column bar demo label layout ([#1962](https://github.com/antvis/g2plot/pull/1962)) ([909665ad](https://github.com/antvis/g2plot/commit/909665ada07d0a83766991de9a42bea5b2a66a33))
- **funnel:** 场景漏斗图 DEMO ([#1967](https://github.com/antvis/g2plot/pull/1967)) ([2b62c8cb](https://github.com/antvis/g2plot/commit/2b62c8cbb0ad70c170c2dc6a97c5f5b58b06363d))
- **demo:** 将 case 案例进行一个归类，重命名为统计场景 & 更新 gastby ([#1980](https://github.com/antvis/g2plot/pull/1980)) ([78a2feb8](https://github.com/antvis/g2plot/commit/78a2feb8d911197b349247051e6a053c757f3917))
- demo 优化 ([#1948](https://github.com/antvis/g2plot/pull/1948)) ([0c5a8340](https://github.com/antvis/g2plot/commit/0c5a834050bd6d5c155f491937cf8661bbb994fd))
- **demo:** fix line, area demo ([#1988](https://github.com/antvis/g2plot/pull/1988)) ([0dc8bf23](https://github.com/antvis/g2plot/commit/0dc8bf232667ee31d85e432b3110cbc5c07d0532))
- 对称条形图 & 迷你折柱面图 demo ([#1982](https://github.com/antvis/g2plot/pull/1982)) ([c460fe9e](https://github.com/antvis/g2plot/commit/c460fe9e5559b631eb16503892a2534eac1c450c))
- 修复 g2plot 文案 ([#1981](https://github.com/antvis/g2plot/pull/1981)) ([bab01a90](https://github.com/antvis/g2plot/commit/bab01a90049e4325511469c708358f5e94f00f4b))

##### Bug Fixes

- 自定义图形颜色和主题切换 ([#1989](https://github.com/antvis/g2plot/pull/1989)) ([a328e7b0](https://github.com/antvis/g2plot/commit/a328e7b0072bd7f0beec2532bded56b5ad840af3))
- fix theme update for bar/column ([#1986](https://github.com/antvis/g2plot/pull/1986)) ([35cf6516](https://github.com/antvis/g2plot/commit/35cf6516829dadfa24e71c557e06ecb90323c0ba))
- 修复热力图颜色映射错误 ([#1979](https://github.com/antvis/g2plot/pull/1979)) ([e3824c9a](https://github.com/antvis/g2plot/commit/e3824c9adf71a48e60916933241d7def7b230f1c))
- change the triggering condition ([#1972](https://github.com/antvis/g2plot/pull/1972)) ([ca173525](https://github.com/antvis/g2plot/commit/ca1735250f380fdf44263425bb7ef2af05b45b5e))
- **word-cloud:** 修复错误的边界值导致的重叠及间隙过大问题 ([#1976](https://github.com/antvis/g2plot/pull/1976)) ([24bd0650](https://github.com/antvis/g2plot/commit/24bd065092ef3bac81d018c1bf9e812af853023c))

#### Tests

- 完善单测,去除 only ([#1984](https://github.com/antvis/g2plot/pull/1984)) ([e8643d20](https://github.com/antvis/g2plot/commit/e8643d20b36cb3b9a79bdc73e8761cd198d4b326))

#### 2.0.10 (2020-11-19)

##### Chores

- only sync gh-pages to Gitee Mirror ([#1938](https://github.com/antvis/g2plot/pull/1938)) ([e0a1e9d4](https://github.com/antvis/g2plot/commit/e0a1e9d447ce68d9b496bf05af3e862e30ce8777))

##### Documentation Changes

- 更新 manual/plots 英文文档 ([#1942](https://github.com/antvis/g2plot/pull/1942)) ([3f990c8d](https://github.com/antvis/g2plot/commit/3f990c8d3b059b43ff76ba73c85ece2e20f3ff63))
- 更新升级文档 ([#1937](https://github.com/antvis/g2plot/pull/1937)) ([690c2aff](https://github.com/antvis/g2plot/commit/690c2affbe4e694de53a634ce3c11e34ed939ebc))
- 更新 manual 英文文档 ([#1906](https://github.com/antvis/g2plot/pull/1906)) ([d8aea09d](https://github.com/antvis/g2plot/commit/d8aea09ddcda34cd3dfc211fe08216c73d515609))
- more document for column and bar plot ([#1911](https://github.com/antvis/g2plot/pull/1911)) ([b0d6b1b2](https://github.com/antvis/g2plot/commit/b0d6b1b26b100e2d245f9223fe1b7029a4a04aab))
- bullet document update ([#1896](https://github.com/antvis/g2plot/pull/1896)) ([b8ed05ff](https://github.com/antvis/g2plot/commit/b8ed05fff090e4391d9b910ab854e34d21a2ab9c))
- update gatsby-theme-antv version ([#1935](https://github.com/antvis/g2plot/pull/1935)) ([d6255e0f](https://github.com/antvis/g2plot/commit/d6255e0f7a80db273a9cd1f6fefedcbc3afed740))
- 文档优优化 - pie radar waterfall ([#1908](https://github.com/antvis/g2plot/pull/1908)) ([cb808b2c](https://github.com/antvis/g2plot/commit/cb808b2c6bf3c67a6adb7e920e6cc57db9f559dd))

##### New Features

- 新增百分比面积图 ([#1932](https://github.com/antvis/g2plot/pull/1932)) ([c4ae3b50](https://github.com/antvis/g2plot/commit/c4ae3b50a3f6f87c0b0a6c9bb7472890334ca5e3))
- 补充 example 中柱形图 column 缺失的设计指引 ([#1922](https://github.com/antvis/g2plot/pull/1922)) ([65a6d7e1](https://github.com/antvis/g2plot/commit/65a6d7e13ca1a110aa0d87bb27fcc811581c4760))
- add line type into radial-bar ([#1912](https://github.com/antvis/g2plot/pull/1912)) ([d9a9bc53](https://github.com/antvis/g2plot/commit/d9a9bc53e93334b8bb941362cd3002af66ccdafc))
- multi layer 支持配置 annotations & label ([#1913](https://github.com/antvis/g2plot/pull/1913)) ([41b7cff4](https://github.com/antvis/g2plot/commit/41b7cff49d507db30a87f0d148225205f050dd2f))
- review and modify radial-bar docs ([#1904](https://github.com/antvis/g2plot/pull/1904)) ([18bab577](https://github.com/antvis/g2plot/commit/18bab57716e21e152cdbd7600e787141e1e949ce))
- add g2plot-column plugin link ([#1900](https://github.com/antvis/g2plot/pull/1900)) ([4f85ed29](https://github.com/antvis/g2plot/commit/4f85ed29dd2c5098c1ee7b6253d8f958077d54c0))
- 新增堆叠分组功能 ([#1893](https://github.com/antvis/g2plot/pull/1893)) ([fdd9fcf8](https://github.com/antvis/g2plot/commit/fdd9fcf82e43ef5997dbdf48c82d328e75f353f4))
- **default-options:** update default option for plots ([#1907](https://github.com/antvis/g2plot/pull/1907)) ([2b03b929](https://github.com/antvis/g2plot/commit/2b03b929eb48c15e9a7c8fb5acf48ba74a678c4b))

##### Bug Fixes

- remove tiny default formatter & mask in axis not work ([#1947](https://github.com/antvis/g2plot/pull/1947)) ([15d97bdc](https://github.com/antvis/g2plot/commit/15d97bdcadd176cfb58205d3db7af237c9107b01))
- funnel ([#1916](https://github.com/antvis/g2plot/pull/1916)) ([9b7b189a](https://github.com/antvis/g2plot/commit/9b7b189a1132cc88e69d1d1bb866b2d30dc5d9ea))
- surge preview in wrong ref ([#1897](https://github.com/antvis/g2plot/pull/1897)) ([e1049207](https://github.com/antvis/g2plot/commit/e1049207a23fe1caccd13812d4aa0b1ab4ccf947))
- **#1909:** opacity 配置不生效 ([#1920](https://github.com/antvis/g2plot/pull/1920)) ([2af40c16](https://github.com/antvis/g2plot/commit/2af40c169c737f39ef3bf62bcd2618401feba2ac))

##### Reverts

- limitInPlot ([#1891](https://github.com/antvis/g2plot/pull/1891)) ([ee2c3b85](https://github.com/antvis/g2plot/commit/ee2c3b8542d4b5796657e5a1cecbfd421b1f7623))

##### Tests

- coverage for conversion-tag ([#1950](https://github.com/antvis/g2plot/pull/1950)) ([5e3dc37e](https://github.com/antvis/g2plot/commit/5e3dc37e1c84d73c8512dda7664351082ff8b825))
- coverage for util ([#1936](https://github.com/antvis/g2plot/pull/1936)) ([aeb93d91](https://github.com/antvis/g2plot/commit/aeb93d91cde7f9e1a019d9c39a69834f64333fb3))
- **gauge:** coverage increase ([#1939](https://github.com/antvis/g2plot/pull/1939)) ([fe08aa6d](https://github.com/antvis/g2plot/commit/fe08aa6d69c8668ee6887a1cefbee9d0cb2673c6))

#### 2.0.9 (2020-11-10)

##### Reverts

- limitInPlot ([#1891](https://github.com/antvis/g2plot/pull/1891)) ([ee2c3b85](https://github.com/antvis/g2plot/commit/ee2c3b8542d4b5796657e5a1cecbfd421b1f7623))

##### New Features

- add `syncViewPadding` function supported.

#### 2.0.8 (2020-11-10)

##### Documentation Changes

- mini plots ([#1886](https://github.com/antvis/g2plot/pull/1886)) ([ffd745f6](https://github.com/antvis/g2plot/commit/ffd745f61948c10396e921970887fc8818693ddf))
- area ([#1884](https://github.com/antvis/g2plot/pull/1884)) ([76592b05](https://github.com/antvis/g2plot/commit/76592b055370a33d35afcd16b66a3145aa52a780))
- api 走查 ([#1880](https://github.com/antvis/g2plot/pull/1880)) ([6a12bc47](https://github.com/antvis/g2plot/commit/6a12bc47d8d0f98c51d11002d1ccf1872531509a))
- update banner notifications ([#1876](https://github.com/antvis/g2plot/pull/1876)) ([ffe95032](https://github.com/antvis/g2plot/commit/ffe95032b82d7f7ca58d514e10ce548c33701b44))
- for plugin dev ([#1871](https://github.com/antvis/g2plot/pull/1871)) ([beb3e4df](https://github.com/antvis/g2plot/commit/beb3e4dfa0cec62d6891db54cf57a389d162fccc))
- line plot ([#1868](https://github.com/antvis/g2plot/pull/1868)) ([0b23f0ce](https://github.com/antvis/g2plot/commit/0b23f0cea5be145a48bff49478221f2f6eb67908))
- **examples:** 更新 radar demo & icon ([#1859](https://github.com/antvis/g2plot/pull/1859)) ([4dda66e2](https://github.com/antvis/g2plot/commit/4dda66e2496e71c41d868a6703cf69066683f5c7))
- **docs-radar:** 更新雷达图文档 & api 走查功能是否具备 ([#1875](https://github.com/antvis/g2plot/pull/1875)) ([5454d867](https://github.com/antvis/g2plot/commit/5454d86786d96c9bd35afbe90d5e23539dc8c8a6))

##### Bug Fixes

- 画布添加默认高度 ([#1857](https://github.com/antvis/g2plot/pull/1857)) ([456f76a7](https://github.com/antvis/g2plot/commit/456f76a7d4e20e145dc8e5ffefd1a253ba7e4022))
- **#1882:** add limitInPoit as default options ([#1885](https://github.com/antvis/g2plot/pull/1885)) ([a5fda051](https://github.com/antvis/g2plot/commit/a5fda0516e592000e4b08bfec85d582d4a7bb1fa))
- **#1870:** when y are same in dual-axes, axis position is wrong ([#1878](https://github.com/antvis/g2plot/pull/1878)) ([4e7e022b](https://github.com/antvis/g2plot/commit/4e7e022b4dfa71ca2d4d507d72feef9d2f628dfc))
- **conversion-tag:** set an uniqe id for every shape ([#1856](https://github.com/antvis/g2plot/pull/1856)) ([aca28ffb](https://github.com/antvis/g2plot/commit/aca28ffb8deb84a73aa95be371d47b7bf2ab6565))
- 关闭多个图例 ([#1888](https://github.com/antvis/g2plot/pull/1888)) ([e213ddc0](https://github.com/antvis/g2plot/commit/e213ddc0f2f6752068e339ab786d5c02a9e2faa9))

##### Tests

- coverage up ([#1889](https://github.com/antvis/g2plot/pull/1889)) ([2d33fbb9](https://github.com/antvis/g2plot/commit/2d33fbb970aaa49e82219d0ea29702d5d127861c))
- badge img ([#1887](https://github.com/antvis/g2plot/pull/1887)) ([825b7f44](https://github.com/antvis/g2plot/commit/825b7f4409f5fa84a5d918cb8c5ea4d18d6acc2e))
- ci ([#1863](https://github.com/antvis/g2plot/pull/1863)) ([db4ab5f7](https://github.com/antvis/g2plot/commit/db4ab5f7fe43e40f3a72baf02337864e9dd3fe4a))

#### 2.0.7 (2020-11-04)

##### New Features

- add multi-view plot ([#1843](https://github.com/antvis/g2plot/pull/1843)) ([49785169](https://github.com/antvis/g2plot/commit/4978516975f652609c116d9a97815b4c0185e5a2))
- radial bar color demo ([#1845](https://github.com/antvis/g2plot/pull/1845)) ([a4340dc6](https://github.com/antvis/g2plot/commit/a4340dc60adddde0382c87cf0c9e7d79e25bc1ec))
- **column/bar:** migrate connected area interaction ([#1852](https://github.com/antvis/g2plot/pull/1852)) ([a59301f3](https://github.com/antvis/g2plot/commit/a59301f362d62a14d78f22dcfa341d77192d5607))

##### Bug Fixes

- charts issue ([64477934](https://github.com/antvis/g2plot/commit/64477934800302093013b6cc5d7c7ec0a8011a17))
- update & getDefaultOptions bugs ([#1850](https://github.com/antvis/g2plot/pull/1850)) ([bc4f7c8a](https://github.com/antvis/g2plot/commit/bc4f7c8ade45162b005465e56fad2a6fa1669d00))
- Scatter regression line and Dual Axes change data ([#1848](https://github.com/antvis/g2plot/pull/1848)) ([654c8e10](https://github.com/antvis/g2plot/commit/654c8e10d1f0f1d7d68f6610bfcd0b28648ce314))
- type define of legend, axis ([#1842](https://github.com/antvis/g2plot/pull/1842)) ([8f035d87](https://github.com/antvis/g2plot/commit/8f035d87d90d6b7ee5ed008a570233e3d88cf11a))

##### Tests

- coverage for util/path ([#1849](https://github.com/antvis/g2plot/pull/1849)) ([dd11880c](https://github.com/antvis/g2plot/commit/dd11880c69a166a88ebd8f3aec104a3ab42078e8))
- 提升 bullet 的测试覆盖率以及优化代码 ([#1844](https://github.com/antvis/g2plot/pull/1844)) ([2ae9c9e6](https://github.com/antvis/g2plot/commit/2ae9c9e608cbd00bb8f9d66a40f47126b221ec04))
- 提升 histogram 的测试覆盖率 ([#1841](https://github.com/antvis/g2plot/pull/1841)) ([0ad37a6b](https://github.com/antvis/g2plot/commit/0ad37a6b13d728af1217a067c29c1699e983f31e))

#### 2.0.6 (2020-11-02)

##### Documentation Changes

- upgrade gatsby theme & format docs ([#1835](https://github.com/antvis/g2plot/pull/1835)) ([5b590486](https://github.com/antvis/g2plot/commit/5b590486edae9871fe95300da801cb39feaa9d74))
- 删除重复 demos ([#1811](https://github.com/antvis/g2plot/pull/1811)) ([7a744e6f](https://github.com/antvis/g2plot/commit/7a744e6f16f4a753b2e7f520070700376b95214b))
- 补充 annotations api ([#1798](https://github.com/antvis/g2plot/pull/1798)) ([6bdd5dd0](https://github.com/antvis/g2plot/commit/6bdd5dd012ce6230376f0a73d391eb0ce23f08aa))
- 去除重复图表 ([#1794](https://github.com/antvis/g2plot/pull/1794)) ([d17e6be9](https://github.com/antvis/g2plot/commit/d17e6be9278b3c1f66587393d5b8db6121db45f7))
- improve tiny chart based on UI ([#1821](https://github.com/antvis/g2plot/pull/1821)) ([8f1e479b](https://github.com/antvis/g2plot/commit/8f1e479b47107cd06323f432600156a6f58c20da))

##### New Features

- **api:** changeData & update ([#1834](https://github.com/antvis/g2plot/pull/1834)) ([e23bac00](https://github.com/antvis/g2plot/commit/e23bac00983dee2b2575fac4496266fdb19d498b))
- radial-bar chart ([#1818](https://github.com/antvis/g2plot/pull/1818)) ([07ae1d06](https://github.com/antvis/g2plot/commit/07ae1d06b5181a4f69fb816da5dfb55e84146101))
- add new axis option to scale ([#1816](https://github.com/antvis/g2plot/pull/1816)) ([4194424b](https://github.com/antvis/g2plot/commit/4194424b08ae41ccb72c2e980aa43b2b19e84944))
- 对称条形图（Bi-directional） ([#1746](https://github.com/antvis/g2plot/pull/1746)) ([e4207617](https://github.com/antvis/g2plot/commit/e420761723c583c193b2ca85785d798c89ed5eb6))
- 基于 annotation shape 实现 regression line ([#1803](https://github.com/antvis/g2plot/pull/1803)) ([7dbc224a](https://github.com/antvis/g2plot/commit/7dbc224aca52ca85ffb6aa37205b0b6122be5630))
- **word-cloud:** 支持自定义 random ([#1791](https://github.com/antvis/g2plot/pull/1791)) ([d9af79d6](https://github.com/antvis/g2plot/commit/d9af79d66416e8f92b47524202a4fb6c83f08abe))
- **gauge:** add indicator = false, to hide the indicator ([#1792](https://github.com/antvis/g2plot/pull/1792)) ([1779c582](https://github.com/antvis/g2plot/commit/1779c582cdab683d316a431c5d50a1e5a9e66999))

##### Bug Fixes

- **#1836:** fix gauge animate not work ([#1838](https://github.com/antvis/g2plot/pull/1838)) ([8d7b4a97](https://github.com/antvis/g2plot/commit/8d7b4a97ad374bad93c49831f2b009c9224a4b75))
- 调整 bar 默认的柱子顺序 ([#1828](https://github.com/antvis/g2plot/pull/1828)) ([5e134042](https://github.com/antvis/g2plot/commit/5e13404233882da6a6848b710f7194f457801ccc))
- 双轴图 point 颜色映射错误和参数丢失 ([#1823](https://github.com/antvis/g2plot/pull/1823)) ([a1c7d520](https://github.com/antvis/g2plot/commit/a1c7d52019e623301b8fd08603095bcbb4f42a8a))
- correct spelling for Configuration ([#1812](https://github.com/antvis/g2plot/pull/1812)) ([ef7d201b](https://github.com/antvis/g2plot/commit/ef7d201bdb098bce4c4acd7e0385d7d2e0cc7ae0))
- pie annotation 默认关闭 text 的动画 ([#1810](https://github.com/antvis/g2plot/pull/1810)) ([bef2c4f9](https://github.com/antvis/g2plot/commit/bef2c4f9a282715d794bfddb2b33e078241b808f))
- column/bar/histogram/stock demo 修复" ([#1808](https://github.com/antvis/g2plot/pull/1808)) ([ed54d31e](https://github.com/antvis/g2plot/commit/ed54d31e7182fbe6be5c7dfcb96a49083a7d5845))
- correct spelling for "default" ([#1809](https://github.com/antvis/g2plot/pull/1809)) ([ae442c34](https://github.com/antvis/g2plot/commit/ae442c3457e442db9aeca11d176857791938d8dc))
- 修复 sunburst tooltip ([#1796](https://github.com/antvis/g2plot/pull/1796)) ([76a4a25b](https://github.com/antvis/g2plot/commit/76a4a25bbe4e2d1f5e71f8cfdbf606e8dc1e8867))
- correct spelling ([#1802](https://github.com/antvis/g2plot/pull/1802)) ([1f9e6075](https://github.com/antvis/g2plot/commit/1f9e607514942d9fa0eb7216e7a52f740fe809d3))
- spell typos ([#1795](https://github.com/antvis/g2plot/pull/1795)) ([303a8be5](https://github.com/antvis/g2plot/commit/303a8be5e7e7c4324a91ef4e385fe76c54f88f0d))
- **word-cloud:** 修复重复渲染动画卡顿 ([#1805](https://github.com/antvis/g2plot/pull/1805)) ([0297eb1b](https://github.com/antvis/g2plot/commit/0297eb1b1f9fb448d5b9605f5288980a536f144f))
- **line:** when data all gt 0, or lt 0, set the default min/max ([#1788](https://github.com/antvis/g2plot/pull/1788)) ([76236d24](https://github.com/antvis/g2plot/commit/76236d24e08f8e91eedd1fb46f565481e239fb70))

##### Refactors

- demo 走查 ([#1824](https://github.com/antvis/g2plot/pull/1824)) ([37b28ff7](https://github.com/antvis/g2plot/commit/37b28ff70edab7ece83fc29e13dfc57dbeeb0f12))
- **bullet:** 调整 bullet 的 style api ([#1790](https://github.com/antvis/g2plot/pull/1790)) ([448ee0dd](https://github.com/antvis/g2plot/commit/448ee0ddde2b6b15c6599c9e11b24110a6ab3494))

##### Tests

- coverage up ([#1839](https://github.com/antvis/g2plot/pull/1839)) ([16bc300c](https://github.com/antvis/g2plot/commit/16bc300c9053753c1bd9337dc1eff4f4614d22ec))
- use pull_request_target ([#1825](https://github.com/antvis/g2plot/pull/1825)) ([4b2f21c5](https://github.com/antvis/g2plot/commit/4b2f21c5ece5c9e3e8027cd7f9d352eb31fc68fe))
- coveralls ci not working ([#1829](https://github.com/antvis/g2plot/pull/1829)) ([f2bef058](https://github.com/antvis/g2plot/commit/f2bef05878adf124f8d27dce487b9ce246080058))

#### 2.0.5 (2020-10-25)

##### Chores

- test coverage ([#1780](https://github.com/antvis/g2plot/pull/1780)) ([4ed03c3c](https://github.com/antvis/g2plot/commit/4ed03c3c84f1907f5870a71b0c6ba5f556a33385))

##### Documentation Changes

- 补充热力图 demos ([#1760](https://github.com/antvis/g2plot/pull/1760)) ([a9efd4cd](https://github.com/antvis/g2plot/commit/a9efd4cdcea75a7235cb49306dbaee3d9e197cbb))

##### New Features

- **tooltip:** add tooltip fields, formatter ([#1774](https://github.com/antvis/g2plot/pull/1774)) ([c1fab4e1](https://github.com/antvis/g2plot/commit/c1fab4e15d3b90e62391996dd90adb0b09dccf9e))
- 迁移转化率组件 ([#1772](https://github.com/antvis/g2plot/pull/1772)) ([2c0f56d3](https://github.com/antvis/g2plot/commit/2c0f56d3bb6f281feefc53eb7e348924ab060ae1))
- add lab domain ([#1765](https://github.com/antvis/g2plot/pull/1765)) ([cc69ff0a](https://github.com/antvis/g2plot/commit/cc69ff0a49186570dd467abc27ece4a50a3d6d14))
- heatmap ([#1752](https://github.com/antvis/g2plot/pull/1752)) ([72e10eb7](https://github.com/antvis/g2plot/commit/72e10eb799862c280bc9b521a328fc278d339fd2))

##### Bug Fixes

- **1758:** 面积图 line.color 设置不生效的问题 ([#1759](https://github.com/antvis/g2plot/pull/1759)) ([da311cca](https://github.com/antvis/g2plot/commit/da311cca2fdbb8ed2e08f17d9e567c81be063ca7))
- **1761:** 辅助 geometry 的 color 样式跟随主元素的 color 配置 ([#1764](https://github.com/antvis/g2plot/pull/1764)) ([e066f887](https://github.com/antvis/g2plot/commit/e066f8876488215a07b369cf704564eaeae92f05))
- **tooltip:** 走查 tooltip 实现逻辑 ([#1785](https://github.com/antvis/g2plot/pull/1785)) ([61797929](https://github.com/antvis/g2plot/commit/61797929bab026cb990c56d740c3cff6b8093dbd))
- adjust default column width ratio ([#1779](https://github.com/antvis/g2plot/pull/1779)) ([8acf2981](https://github.com/antvis/g2plot/commit/8acf2981d7f654239a6a046a5e219ae3a810c45c))
- demo style ([#1784](https://github.com/antvis/g2plot/pull/1784)) ([70a32ee5](https://github.com/antvis/g2plot/commit/70a32ee5db7be1d4c0e54366e2fc15ead52f1012))
- 修复 bullet 的 demo 写错问题 ([#1783](https://github.com/antvis/g2plot/pull/1783)) ([e2f0255c](https://github.com/antvis/g2plot/commit/e2f0255c1a9b9ed18f93a9276c556d67fbfcd384))
- line-column legend color & custom legend ([#1776](https://github.com/antvis/g2plot/pull/1776)) ([bc53417c](https://github.com/antvis/g2plot/commit/bc53417c2126be62e327103760300d02194ed19c))
- 订正双轴图&漏斗图文档 ([#1766](https://github.com/antvis/g2plot/pull/1766)) ([57392a6f](https://github.com/antvis/g2plot/commit/57392a6f6db7b00e5945d23019124f476570016e))
- formatter 样式丢失 ([#1763](https://github.com/antvis/g2plot/pull/1763)) ([cb99aa97](https://github.com/antvis/g2plot/commit/cb99aa97ac4d47201d0da3b4d647370f6c8c685f))
- **word-cloud:**
  - 修复 tooltip 小圆点的颜色不显示 ([#1782](https://github.com/antvis/g2plot/pull/1782)) ([829a8be2](https://github.com/antvis/g2plot/commit/829a8be25f372be88fdba0d94f6718e1214a66aa))
  - fix tooltip and add demo for custom tooltip ([#1762](https://github.com/antvis/g2plot/pull/1762)) ([187a8d7b](https://github.com/antvis/g2plot/commit/187a8d7b76114af76800a19943c99a0d2221d78b))
- **point-shape:** 修复 point 的 shape 映射 ([#1771](https://github.com/antvis/g2plot/pull/1771)) ([8d4b7290](https://github.com/antvis/g2plot/commit/8d4b72907e34507a7cb4f045db2f00330b147999))

#### 2.0.4 (2020-10-18)

##### Chores

- **word-cloud:** 主要完善词云图的测试用例 ([#1745](https://github.com/antvis/g2plot/pull/1745)) ([f7febd69](https://github.com/antvis/g2plot/commit/f7febd69c28a52fdeda777a2802abd7f13f9b525))
- correct apiKey for search ([#1735](https://github.com/antvis/g2plot/pull/1735)) ([f20fd2ea](https://github.com/antvis/g2plot/commit/f20fd2ea14c7d0f223716829f4b90306ae8f7a2b))

##### Documentation Changes

- legend -> lengend , Unexpected semicolon ([#1741](https://github.com/antvis/g2plot/pull/1741)) ([2c86ddd3](https://github.com/antvis/g2plot/commit/2c86ddd3d65fa7e736cf0607894f11e5320d223d))
- 升级指南表格化 ([#1733](https://github.com/antvis/g2plot/pull/1733)) ([2cc432d6](https://github.com/antvis/g2plot/commit/2cc432d6275c50f790922168048bc677ff490e83))

##### New Features

- tooltip, label 增加 formatter 能力 ([#1730](https://github.com/antvis/g2plot/pull/1730)) ([58f363c5](https://github.com/antvis/g2plot/commit/58f363c5faa66abb4ca33a2e31a777c5545144d1))
- **demo:** 瀑布图添加标注 demo ([#1725](https://github.com/antvis/g2plot/pull/1725)) ([61752a0b](https://github.com/antvis/g2plot/commit/61752a0bcc4bfa2accedd3efd2fa427ba4c42339))

##### Bug Fixes

- **404:** link 404 on index page ([#1734](https://github.com/antvis/g2plot/pull/1734)) ([cb9bba7a](https://github.com/antvis/g2plot/commit/cb9bba7a60afa64ca3c254ee9027d51f7c5427ef))

##### Refactors

- remove data-set dependence ([#1728](https://github.com/antvis/g2plot/pull/1728)) ([b5df7c93](https://github.com/antvis/g2plot/commit/b5df7c934ed35fe1c2d3724163b48fdea11d2702))

#### 2.0.3 (2020-10-14)

##### Build System / Dependencies

- **webpack:** update webpack loader configure ([#1695](https://github.com/antvis/g2plot/pull/1695)) ([9c10ebe6](https://github.com/antvis/g2plot/commit/9c10ebe66f4634aa5ea49c5fe3cef9a4b6308e82))

##### Documentation Changes

- 优化升级文档 ([#1711](https://github.com/antvis/g2plot/pull/1711)) ([89c89e88](https://github.com/antvis/g2plot/commit/89c89e88da9e4c9eb6c8486fabb042e65845cbfc))
- add column slider scrollbar demo ([#1704](https://github.com/antvis/g2plot/pull/1704)) ([e7dea701](https://github.com/antvis/g2plot/commit/e7dea7018be8661a89955cd901669bb282c72c83))
- **rose:** 设置玫瑰图 label 的 layout 类型为 limit-in-shape ([#1680](https://github.com/antvis/g2plot/pull/1680)) ([bf0c70ab](https://github.com/antvis/g2plot/commit/bf0c70ab7f3bca2c446f8ee8acde8de24f0a0f31))

##### New Features

- **mapping:** color shape size 字段只去对应的字段即可 ([#1720](https://github.com/antvis/g2plot/pull/1720)) ([328fec73](https://github.com/antvis/g2plot/commit/328fec73e4bf55b364c118065fc9f78ca984b660))
- **tiny-area:** update tiny area default color ([#1707](https://github.com/antvis/g2plot/pull/1707)) ([48951c38](https://github.com/antvis/g2plot/commit/48951c38df0625499f07e4a2708d44e2b7f1b343))
- **line:** line area support isStack options ([#1705](https://github.com/antvis/g2plot/pull/1705)) ([7d80cc23](https://github.com/antvis/g2plot/commit/7d80cc2352211a3986e6f19706370100aa98f26a))
- **waterfall:** 瀑布图 ([#1697](https://github.com/antvis/g2plot/pull/1697)) ([91568619](https://github.com/antvis/g2plot/commit/915686193df320563f3755a7dd86ae1b828fa52c))

##### Bug Fixes

- **types:** 修复 瀑布图 类型定义命名问题 ([#1719](https://github.com/antvis/g2plot/pull/1719)) ([4f682222](https://github.com/antvis/g2plot/commit/4f68222257a10a35bb8dce7cf77a1c2c273d7624))
- v1 label formatter 无效 ([#1713](https://github.com/antvis/g2plot/pull/1713)) ([be94eb9c](https://github.com/antvis/g2plot/commit/be94eb9cc6c3a8d5e7a08fa0a57c14ce0e567734))
- update axis tickMethod type ([#1715](https://github.com/antvis/g2plot/pull/1715)) ([aa3dbcc9](https://github.com/antvis/g2plot/commit/aa3dbcc9fcc4066a8eff4456bd119c8371bd4203))
- **issue-1174:** pie statistics content formatter does not work ([#1693](https://github.com/antvis/g2plot/pull/1693)) ([0b3ed76d](https://github.com/antvis/g2plot/commit/0b3ed76d78b1b8a1641ca6c71159ce5b50a7717e))
- **website:** style for bk image ([#1694](https://github.com/antvis/g2plot/pull/1694)) ([978ab376](https://github.com/antvis/g2plot/commit/978ab376ad1867de9320d8d0cd3e951c69b1417d))

##### Other Changes

- bugfix 走查 ([#1714](https://github.com/antvis/g2plot/pull/1714)) ([e03be5f9](https://github.com/antvis/g2plot/commit/e03be5f95ad814713759e5156769d9aa9f5be4fe))

#### 2.0.2 (2020-10-09)

##### Chores

- run PR preview on pull_request ([#1677](https://github.com/antvis/g2plot/pull/1677)) ([2ae88954](https://github.com/antvis/g2plot/commit/2ae88954a1a61f47d68ec74d38c4670251a1feac))
- 完善词云图和玫瑰图的单测用例 ([#1664](https://github.com/antvis/g2plot/pull/1664)) ([53b53202](https://github.com/antvis/g2plot/commit/53b53202eb4335d12de5bc6229dbff43109db39c))

##### Documentation Changes

- 文档修复 ([#1678](https://github.com/antvis/g2plot/pull/1678)) ([78ee8413](https://github.com/antvis/g2plot/commit/78ee8413098d48a8307662f2bdd7c7fabbf35c06))
- 修复缩略图 demo 不一致, 删除重复 demo ([#1661](https://github.com/antvis/g2plot/pull/1661)) ([8309761b](https://github.com/antvis/g2plot/commit/8309761b494cce1d4e385d185f8a586047746b58))

##### New Features

- **axis:** add type config axis, it will picked into scale config ([#1686](https://github.com/antvis/g2plot/pull/1686)) ([c2c50a38](https://github.com/antvis/g2plot/commit/c2c50a38d17b313698eb8806341c810f36ca7d8f))
- **demo:** trend demo ([#1663](https://github.com/antvis/g2plot/pull/1663)) ([5a7eac3f](https://github.com/antvis/g2plot/commit/5a7eac3fea947159564b7bd651d80378307a43eb))
- **website:** add css for demo container ([#1675](https://github.com/antvis/g2plot/pull/1675)) ([5c81f9e3](https://github.com/antvis/g2plot/commit/5c81f9e37e67d8ace7644257df1e2a71b884f087))
- **transform:** add supportCSSTransform option ([#1674](https://github.com/antvis/g2plot/pull/1674)) ([79fcdc97](https://github.com/antvis/g2plot/commit/79fcdc979d4b7a7ca6d8804db42bafaa70d0d8a6))

##### Bug Fixes

- **template:** remove regex usage of lookbehind assertions ([#1689](https://github.com/antvis/g2plot/pull/1689)) ([92133d05](https://github.com/antvis/g2plot/commit/92133d059b97f763f19bf44752b0137581ea699b))
- **dual-axes:** 双轴图问题走查 ([#1688](https://github.com/antvis/g2plot/pull/1688)) ([baa20f45](https://github.com/antvis/g2plot/commit/baa20f45b8451a21c36ca9b0aa7dfe99754f9872))
- column 和 bar 默认 type 为 cat ([#1682](https://github.com/antvis/g2plot/pull/1682)) ([78f3a0cf](https://github.com/antvis/g2plot/commit/78f3a0cf1b929d86c4eb59b3ebbc584af566e7dd))
- 修复一些 demo 的小问题 ([#1676](https://github.com/antvis/g2plot/pull/1676)) ([b9bb57dd](https://github.com/antvis/g2plot/commit/b9bb57ddce2a6862943e8dde1cd950ab6d8152ab))
- **indicator:** when indicator > 1 or < 0 in gauge, progress, ring ([#1673](https://github.com/antvis/g2plot/pull/1673)) ([86f110b9](https://github.com/antvis/g2plot/commit/86f110b966eaca186cafba5d4e743e4b48a30a88))
- **geometry:** line, area color field ignore xField ([#1672](https://github.com/antvis/g2plot/pull/1672)) ([e9ae75f3](https://github.com/antvis/g2plot/commit/e9ae75f3f3c574717ae90b010bc74ee7055f362d))
- **bullet:** 修复文档和 demo 的问题 ([#1670](https://github.com/antvis/g2plot/pull/1670)) ([53882cdc](https://github.com/antvis/g2plot/commit/53882cdc3a797202a68b11c5b86176887e8c1de1))
- **tiny:** tiny 图的 tooltip 默认给一个格式化,修改 demo 和单测 ([#1666](https://github.com/antvis/g2plot/pull/1666)) ([119ed5f3](https://github.com/antvis/g2plot/commit/119ed5f31e062aeb40161877802723c3f4b34cd9))
- **word-cloud:** 修复 this 指向问题 ([#1668](https://github.com/antvis/g2plot/pull/1668)) ([71714388](https://github.com/antvis/g2plot/commit/717143889dc9a8441993da55c830d1de16dab44f))

#### 2.0.1 (2020-09-28)

##### Documentation Changes

- 修改文档描述 ([#1658](https://github.com/antvis/g2plot/pull/1658)) ([f6a3a181](https://github.com/antvis/g2plot/commit/f6a3a181fb1c38b13a86cd51b80cf8fc6a83294a))
- 更新 common 英文文档 ([#1655](https://github.com/antvis/g2plot/pull/1655)) ([8952cc71](https://github.com/antvis/g2plot/commit/8952cc71248e9e986ef3942bea3b1278279df5de))
- 更新 common 文档中的英文标题 ([#1654](https://github.com/antvis/g2plot/pull/1654)) ([13e2a65d](https://github.com/antvis/g2plot/commit/13e2a65d68edb2b9f89ee7054dd3831e45f7061b))
- **xyfield:** 更新 xyfield 英文文档 ([#1652](https://github.com/antvis/g2plot/pull/1652)) ([1d9de2cb](https://github.com/antvis/g2plot/commit/1d9de2cbbaafed0264830fb831d47c13cbc52af9))
- **meta:** 更新 meta 英文文档 ([#1651](https://github.com/antvis/g2plot/pull/1651)) ([e346c359](https://github.com/antvis/g2plot/commit/e346c359e9522f1f532ba70f2b0ab9fcb88003fc))
- **linestyle:** 更新 line-style 英文文档 ([#1648](https://github.com/antvis/g2plot/pull/1648)) ([d98befed](https://github.com/antvis/g2plot/commit/d98befedbc3d111f584e3cf18b38622e3bc9beb1))

##### New Features

- **gauge:** add statistic, demo, docs ([#1653](https://github.com/antvis/g2plot/pull/1653)) ([e779cfd0](https://github.com/antvis/g2plot/commit/e779cfd0a2c39dc4ef725532c79bd7649d826854))

##### Bug Fixes

- 修复 column/bar 图例设置 & demo 更新 ([#1636](https://github.com/antvis/g2plot/pull/1636)) ([b2dfd35f](https://github.com/antvis/g2plot/commit/b2dfd35fd6cfb6db5b969bccba502b8c2bf10b47))
- **website:** 直接显示 1.x 给人感觉是当前是 1.x 版本 ([#1656](https://github.com/antvis/g2plot/pull/1656)) ([79337091](https://github.com/antvis/g2plot/commit/7933709148bc2f4e6d0b591b61f09de094cb9084))

#### 2.0.0 (2020-09-28)

##### Documentation Changes

- 修改文档描述 ([#1658](https://github.com/antvis/g2plot/pull/1658)) ([f6a3a181](https://github.com/antvis/g2plot/commit/f6a3a181fb1c38b13a86cd51b80cf8fc6a83294a))
- 更新 common 英文文档 ([#1655](https://github.com/antvis/g2plot/pull/1655)) ([8952cc71](https://github.com/antvis/g2plot/commit/8952cc71248e9e986ef3942bea3b1278279df5de))
- 更新 common 文档中的英文标题 ([#1654](https://github.com/antvis/g2plot/pull/1654)) ([13e2a65d](https://github.com/antvis/g2plot/commit/13e2a65d68edb2b9f89ee7054dd3831e45f7061b))
- **xyfield:** 更新 xyfield 英文文档 ([#1652](https://github.com/antvis/g2plot/pull/1652)) ([1d9de2cb](https://github.com/antvis/g2plot/commit/1d9de2cbbaafed0264830fb831d47c13cbc52af9))
- **meta:** 更新 meta 英文文档 ([#1651](https://github.com/antvis/g2plot/pull/1651)) ([e346c359](https://github.com/antvis/g2plot/commit/e346c359e9522f1f532ba70f2b0ab9fcb88003fc))
- **linestyle:** 更新 line-style 英文文档 ([#1648](https://github.com/antvis/g2plot/pull/1648)) ([d98befed](https://github.com/antvis/g2plot/commit/d98befedbc3d111f584e3cf18b38622e3bc9beb1))

##### New Features

- **gauge:** add statistic, demo, docs ([#1653](https://github.com/antvis/g2plot/pull/1653)) ([e779cfd0](https://github.com/antvis/g2plot/commit/e779cfd0a2c39dc4ef725532c79bd7649d826854))

##### Bug Fixes

- 修复 column/bar 图例设置 & demo 更新 ([#1636](https://github.com/antvis/g2plot/pull/1636)) ([b2dfd35f](https://github.com/antvis/g2plot/commit/b2dfd35fd6cfb6db5b969bccba502b8c2bf10b47))
- **website:** 直接显示 1.x 给人感觉是当前是 1.x 版本 ([#1656](https://github.com/antvis/g2plot/pull/1656)) ([79337091](https://github.com/antvis/g2plot/commit/7933709148bc2f4e6d0b591b61f09de094cb9084))

#### 2.0.0-beta.6 (2020-09-25)

##### Chores

- area 走查优化 ([#1541](https://github.com/antvis/g2plot/pull/1541)) ([8834fb53](https://github.com/antvis/g2plot/commit/8834fb5389e0acc54c7e678d69ae79ddc2159810))
- upgrade to latest g2 ([#1538](https://github.com/antvis/g2plot/pull/1538)) ([0f025262](https://github.com/antvis/g2plot/commit/0f025262aa2996ecd05027181e9d61fa94bfeed8))
- 2.0.0-beta.3 ([#1531](https://github.com/antvis/g2plot/pull/1531)) ([da3b36ba](https://github.com/antvis/g2plot/commit/da3b36babbf9094bff54064e890e07c33de45fe2))
- 迷你图走查 + demo ([#1528](https://github.com/antvis/g2plot/pull/1528)) ([d022fd46](https://github.com/antvis/g2plot/commit/d022fd46fcb92bec1141f0af18c24e0c6d3187b4))
- add limit-size ([#1527](https://github.com/antvis/g2plot/pull/1527)) ([ff063585](https://github.com/antvis/g2plot/commit/ff0635858505fb26289cd4d8a43c0b09455a2440))
- **template:** add plot template ([#1497](https://github.com/antvis/g2plot/pull/1497)) ([0ca26519](https://github.com/antvis/g2plot/commit/0ca26519624713285f9740bde92aeb2193735fd3))

##### Documentation Changes

- 新增旭日图 demos 和 API ([#1633](https://github.com/antvis/g2plot/pull/1633)) ([b1ab3f05](https://github.com/antvis/g2plot/commit/b1ab3f057a65f5ebc24f94e78723f9be4198e6fb))
- 提取图表组件,提取 plots api ([#1604](https://github.com/antvis/g2plot/pull/1604)) ([f7a17ed7](https://github.com/antvis/g2plot/commit/f7a17ed7bdbf9cf51f27a6af382cee0d12b06a77))
- 修改 word cloud 套娃路径 ([#1593](https://github.com/antvis/g2plot/pull/1593)) ([3fe1b096](https://github.com/antvis/g2plot/commit/3fe1b096ff346159dd3f29f3af921aeac8fd6e6c))
- 修改文档和优化 demo ([#1592](https://github.com/antvis/g2plot/pull/1592)) ([f5556064](https://github.com/antvis/g2plot/commit/f5556064cb7e501fcec3b867539ff44350242892))
- 文档走查 ([#1591](https://github.com/antvis/g2plot/pull/1591)) ([a3ed5f47](https://github.com/antvis/g2plot/commit/a3ed5f47b6b680047d78b8559e06158697e447ad))
- 补充使用文档 ([#1582](https://github.com/antvis/g2plot/pull/1582)) ([067f3c5e](https://github.com/antvis/g2plot/commit/067f3c5e7ef5aebcfa75b01443123cf5336f2626))
- 统一补充通用 API 和设计规范 ([#1569](https://github.com/antvis/g2plot/pull/1569)) ([2ec33713](https://github.com/antvis/g2plot/commit/2ec33713e9ae71e526ce4aac3e08a12bfa377f68))
- 通用文档补充 ([#1561](https://github.com/antvis/g2plot/pull/1561)) ([b8e6a4b7](https://github.com/antvis/g2plot/commit/b8e6a4b74442a8c86cc62999f71b6297b61af0cf))
- 添加玫瑰图文档及 demo ([#1552](https://github.com/antvis/g2plot/pull/1552)) ([79606f7f](https://github.com/antvis/g2plot/commit/79606f7f42694342d02bf142e5894a8eadb92447))
- **word-cloud:** 添加词云图文档和 demo ([#1571](https://github.com/antvis/g2plot/pull/1571)) ([c9245eef](https://github.com/antvis/g2plot/commit/c9245eef2adebd845a91f88c2b5f6a2685c88f3a))

##### New Features

- 旭日图类型定义和实现 ([#1630](https://github.com/antvis/g2plot/pull/1630)) ([24b3515a](https://github.com/antvis/g2plot/commit/24b3515a290ae95e975735380a0767d087fa2104))
- line support type ([#1623](https://github.com/antvis/g2plot/pull/1623)) ([2fb8628a](https://github.com/antvis/g2plot/commit/2fb8628a6ca0ec2d6c014d2b71f612353877083c))
- 增加显示目标值 label [#1599](https://github.com/antvis/g2plot/pull/1599) ([#1605](https://github.com/antvis/g2plot/pull/1605)) ([0d5e4dc6](https://github.com/antvis/g2plot/commit/0d5e4dc6f1e308aeacc2a994149da36f8011a715))
- 发布新版本 ([#1596](https://github.com/antvis/g2plot/pull/1596)) ([73dc0b6f](https://github.com/antvis/g2plot/commit/73dc0b6fa57277b03cc7450b6d42191339aaebc0))
- v2 增强子弹图 ([#1566](https://github.com/antvis/g2plot/pull/1566)) ([37e0c314](https://github.com/antvis/g2plot/commit/37e0c314925ff1d018380baa9a96f415c20a5433))
- 新改动子弹图和新增 docs ([#1545](https://github.com/antvis/g2plot/pull/1545)) ([cbfe4960](https://github.com/antvis/g2plot/commit/cbfe4960e21e4bbce1cf74483a82273afd095e1d))
- demo upgrade ([#1543](https://github.com/antvis/g2plot/pull/1543)) ([27507368](https://github.com/antvis/g2plot/commit/2750736856ac7175ca957873b244c163bdf06195))
- annotation(搭车一些 demo 走查) ([#1532](https://github.com/antvis/g2plot/pull/1532)) ([cbfce8f3](https://github.com/antvis/g2plot/commit/cbfce8f39d6e28b88006154d78433b244081a443))
- v2 版子弹图 bullet 初稿 ([#1427](https://github.com/antvis/g2plot/pull/1427)) ([1210ff4b](https://github.com/antvis/g2plot/commit/1210ff4b5fe4217701dd0768b6490496fb9b5fcd))
- scatter chart supported quadrant ([#1522](https://github.com/antvis/g2plot/pull/1522)) ([471a7dd9](https://github.com/antvis/g2plot/commit/471a7dd98af482e4ab1b27d0cc1282b857adc00b))
- 增加交互关闭配置 & demo 走查 ([#1518](https://github.com/antvis/g2plot/pull/1518)) ([471379bb](https://github.com/antvis/g2plot/commit/471379bb5edc4fa60366d31a8c806cab541e8949))
- a new chart type - Box Chart ([#1382](https://github.com/antvis/g2plot/pull/1382)) ([c660d8f6](https://github.com/antvis/g2plot/commit/c660d8f6ea8b2a488fce12ffafca9fbfb37ea1be))
- add bar demos ([#1486](https://github.com/antvis/g2plot/pull/1486)) ([f696e66d](https://github.com/antvis/g2plot/commit/f696e66dc7d457b8cd857533f8c6c50f494dfd1d))
- **word-cloud:**
  - imageMask 选项支持 url 字符串格式 ([#1617](https://github.com/antvis/g2plot/pull/1617)) ([5f99d952](https://github.com/antvis/g2plot/commit/5f99d95226fcd6ab8d42d881abeef6a447924935))
  - 主要是添加图表尺寸变化时自动重渲染 ([#1603](https://github.com/antvis/g2plot/pull/1603)) ([666426f1](https://github.com/antvis/g2plot/commit/666426f1f13914f69b926b2bf886da8716ef1867))
- **pie:** support spider-label ([#1601](https://github.com/antvis/g2plot/pull/1601)) ([d29d00fa](https://github.com/antvis/g2plot/commit/d29d00fad78bab554ea5158de38c99b94643b433))
- **v2/word-cloud:** 新增词云图 ([#1530](https://github.com/antvis/g2plot/pull/1530)) ([4cfeb78c](https://github.com/antvis/g2plot/commit/4cfeb78cc04a894914f120e28a06e316c423a1c2))
- **legend:** add legend to dual-axes ([#1533](https://github.com/antvis/g2plot/pull/1533)) ([f75cbf08](https://github.com/antvis/g2plot/commit/f75cbf08f751ec9aebd9e06d985cdb8b0869b027))
- **v2/candle:** add candle plot ([#1502](https://github.com/antvis/g2plot/pull/1502)) ([46389c74](https://github.com/antvis/g2plot/commit/46389c7496efdb2c3f44648d44d25b866c1d8556))
- **liquid:** add new plot liquid ([#1499](https://github.com/antvis/g2plot/pull/1499)) ([32a1aa21](https://github.com/antvis/g2plot/commit/32a1aa2196fbe1d2811ee2f5dc62a90129bd08ef))
- **plugin:** add plugin plot for customize ([#1519](https://github.com/antvis/g2plot/pull/1519)) ([6346fcdc](https://github.com/antvis/g2plot/commit/6346fcdc70f91e14afb08bc0721349da38be79b4))
- **v2:** 添加玫瑰图配置项 ([#1454](https://github.com/antvis/g2plot/pull/1454)) ([a9cbbd28](https://github.com/antvis/g2plot/commit/a9cbbd28fc7ba8a090f9ac7b6e7174df8cc86e00))

##### Bug Fixes

- 修复 legend 错误 ([#1627](https://github.com/antvis/g2plot/pull/1627)) ([578610c6](https://github.com/antvis/g2plot/commit/578610c6471ad8c9daa73c38b729478f302f259a))
- 优化散点图 demos ([#1608](https://github.com/antvis/g2plot/pull/1608)) ([cf4927a0](https://github.com/antvis/g2plot/commit/cf4927a0a53633a413897fb64dcdb91571b7015d))
- 默默修复颜色问题，定义不同映射颜色的 key ([#1598](https://github.com/antvis/g2plot/pull/1598)) ([f147ffa5](https://github.com/antvis/g2plot/commit/f147ffa59aad59175c9559ae597f6ebfaeeed190))
- 修复 slider demos, 新增 scrollbar ([#1594](https://github.com/antvis/g2plot/pull/1594)) ([3130dc3b](https://github.com/antvis/g2plot/commit/3130dc3b3c7c051a16d8cf276f0b3c571d55005f))
- 修复迷你图 tooltip 不统一 ([#1578](https://github.com/antvis/g2plot/pull/1578)) ([09b30d30](https://github.com/antvis/g2plot/commit/09b30d30fa3df9cc6851b183839164f93adba304))
- fix api-extractor does not support the export \* as syntax ([#1577](https://github.com/antvis/g2plot/pull/1577)) ([ca78f988](https://github.com/antvis/g2plot/commit/ca78f9880aef66ce81b70692adefac5214829200))
- 解决走查问题和修复遗漏问题 ([#1553](https://github.com/antvis/g2plot/pull/1553)) ([391b0035](https://github.com/antvis/g2plot/commit/391b0035004ecb0f50436adafbad1b6fa6f40c7e))
- 代码走查 ([#1539](https://github.com/antvis/g2plot/pull/1539)) ([5f67f6fe](https://github.com/antvis/g2plot/commit/5f67f6fe23b975ee72a95d25371c464558380c67))
- 修复散点图单测问题 ([#1535](https://github.com/antvis/g2plot/pull/1535)) ([f0d0c2f7](https://github.com/antvis/g2plot/commit/f0d0c2f7fe84de62d49dddd1a138b50a75579128))
- 临时解决 changeData 无效问题 ([#1504](https://github.com/antvis/g2plot/pull/1504)) ([58032dd7](https://github.com/antvis/g2plot/commit/58032dd7abbb3738b360f9289e417bdb0a2207bf))
- 解决 width 、height 单一设置无效问题 ([#1490](https://github.com/antvis/g2plot/pull/1490)) ([263caf55](https://github.com/antvis/g2plot/commit/263caf55aeee4c61211025047841153ecb2bddbe))
- **line:** fix error when color field is cat ([#1625](https://github.com/antvis/g2plot/pull/1625)) ([157f9ceb](https://github.com/antvis/g2plot/commit/157f9cebdc1f8639e3fc0a129ba6ce1b29c47580))
- **word-cloud:** word cloud should exec data-set transform when resize ([#1607](https://github.com/antvis/g2plot/pull/1607)) ([c26ec955](https://github.com/antvis/g2plot/commit/c26ec9557557c5f46db108eb17d6bbdd3f502bf6))
- **sync-view-padding:** add syncViewPadding in core plot ([#1600](https://github.com/antvis/g2plot/pull/1600)) ([c7f98b40](https://github.com/antvis/g2plot/commit/c7f98b403a29f612a8b4b401ba0d5532cfc74932))
- **liquid:** 升级 G2,使用正确的方式向自定义 shape 传参 ([#1584](https://github.com/antvis/g2plot/pull/1584)) ([868a26f1](https://github.com/antvis/g2plot/commit/868a26f193d9582f95659676fb71b137dc70fdad))
- **geometry:** 修改 geometry/base 中存在多个相同的时候,导致索引出错 ([#1575](https://github.com/antvis/g2plot/pull/1575)) ([d0884b00](https://github.com/antvis/g2plot/commit/d0884b00d391369d3e79f6ed2edf3117cae55211))

##### Performance Improvements

- 新增 animation 并更正其它图表 getDefaultOptions ([#1507](https://github.com/antvis/g2plot/pull/1507)) ([3d45caf9](https://github.com/antvis/g2plot/commit/3d45caf9cc19fb8d4fd6b5fa738306a549feeaa5))

##### Refactors

- **example:** 主题、状态量、标注等 demo 和截图走查 ([#1602](https://github.com/antvis/g2plot/pull/1602)) ([61b40b5f](https://github.com/antvis/g2plot/commit/61b40b5ffe132dd16f5a08f9207bffff5bd5a561))
- **ring:** 环图中心文本统一结构 ([#1590](https://github.com/antvis/g2plot/pull/1590)) ([b15334dd](https://github.com/antvis/g2plot/commit/b15334ddd3d8a7440dd15b601681b3c63dcc981c))
- **statistic:** 统一中心文本结构 ([#1587](https://github.com/antvis/g2plot/pull/1587)) ([4663b95a](https://github.com/antvis/g2plot/commit/4663b95a753b4b3bff99144533e1091d62832a05))
- 改造 v2 子弹图为统一风格方式 ([#1579](https://github.com/antvis/g2plot/pull/1579)) ([afc6e584](https://github.com/antvis/g2plot/commit/afc6e584611853aba65cc876b7debc43ce4e8127))
- attribute mapping ([#1547](https://github.com/antvis/g2plot/pull/1547)) ([82c2b0cd](https://github.com/antvis/g2plot/commit/82c2b0cd456321a9bf8f0c7a24ce2ea1727bbef6))
- remove groupField, colorField, stackField in bar and column ([#1529](https://github.com/antvis/g2plot/pull/1529)) ([5d050b4d](https://github.com/antvis/g2plot/commit/5d050b4d83b52755083ec1013a3dba25c309de1b))

##### Tests

- **eslint:** add import-order rules for eslint ([#1513](https://github.com/antvis/g2plot/pull/1513)) ([2f221888](https://github.com/antvis/g2plot/commit/2f221888d14ecce1eeb99a3193ebac37daa50168))

#### 2.0.0-beta.4 (2020-09-18)

##### Chores

- area 走查优化 ([#1541](https://github.com/antvis/g2plot/pull/1541)) ([8834fb53](https://github.com/antvis/g2plot/commit/8834fb5389e0acc54c7e678d69ae79ddc2159810))
- upgrade to latest g2 ([#1538](https://github.com/antvis/g2plot/pull/1538)) ([0f025262](https://github.com/antvis/g2plot/commit/0f025262aa2996ecd05027181e9d61fa94bfeed8))
- 2.0.0-beta.3 ([#1531](https://github.com/antvis/g2plot/pull/1531)) ([da3b36ba](https://github.com/antvis/g2plot/commit/da3b36babbf9094bff54064e890e07c33de45fe2))
- 迷你图走查 + demo ([#1528](https://github.com/antvis/g2plot/pull/1528)) ([d022fd46](https://github.com/antvis/g2plot/commit/d022fd46fcb92bec1141f0af18c24e0c6d3187b4))
- add limit-size ([#1527](https://github.com/antvis/g2plot/pull/1527)) ([ff063585](https://github.com/antvis/g2plot/commit/ff0635858505fb26289cd4d8a43c0b09455a2440))
- **template:** add plot template ([#1497](https://github.com/antvis/g2plot/pull/1497)) ([0ca26519](https://github.com/antvis/g2plot/commit/0ca26519624713285f9740bde92aeb2193735fd3))

##### Documentation Changes

- 修改 word cloud 套娃路径 ([#1593](https://github.com/antvis/g2plot/pull/1593)) ([3fe1b096](https://github.com/antvis/g2plot/commit/3fe1b096ff346159dd3f29f3af921aeac8fd6e6c))
- 修改文档和优化 demo ([#1592](https://github.com/antvis/g2plot/pull/1592)) ([f5556064](https://github.com/antvis/g2plot/commit/f5556064cb7e501fcec3b867539ff44350242892))
- 文档走查 ([#1591](https://github.com/antvis/g2plot/pull/1591)) ([a3ed5f47](https://github.com/antvis/g2plot/commit/a3ed5f47b6b680047d78b8559e06158697e447ad))
- 补充使用文档 ([#1582](https://github.com/antvis/g2plot/pull/1582)) ([067f3c5e](https://github.com/antvis/g2plot/commit/067f3c5e7ef5aebcfa75b01443123cf5336f2626))
- 统一补充通用 API 和设计规范 ([#1569](https://github.com/antvis/g2plot/pull/1569)) ([2ec33713](https://github.com/antvis/g2plot/commit/2ec33713e9ae71e526ce4aac3e08a12bfa377f68))
- 通用文档补充 ([#1561](https://github.com/antvis/g2plot/pull/1561)) ([b8e6a4b7](https://github.com/antvis/g2plot/commit/b8e6a4b74442a8c86cc62999f71b6297b61af0cf))
- 添加玫瑰图文档及 demo ([#1552](https://github.com/antvis/g2plot/pull/1552)) ([79606f7f](https://github.com/antvis/g2plot/commit/79606f7f42694342d02bf142e5894a8eadb92447))
- **word-cloud:** 添加词云图文档和 demo ([#1571](https://github.com/antvis/g2plot/pull/1571)) ([c9245eef](https://github.com/antvis/g2plot/commit/c9245eef2adebd845a91f88c2b5f6a2685c88f3a))

##### New Features

- v2 增强子弹图 ([#1566](https://github.com/antvis/g2plot/pull/1566)) ([37e0c314](https://github.com/antvis/g2plot/commit/37e0c314925ff1d018380baa9a96f415c20a5433))
- 新改动子弹图和新增 docs ([#1545](https://github.com/antvis/g2plot/pull/1545)) ([cbfe4960](https://github.com/antvis/g2plot/commit/cbfe4960e21e4bbce1cf74483a82273afd095e1d))
- demo upgrade ([#1543](https://github.com/antvis/g2plot/pull/1543)) ([27507368](https://github.com/antvis/g2plot/commit/2750736856ac7175ca957873b244c163bdf06195))
- annotation(搭车一些 demo 走查) ([#1532](https://github.com/antvis/g2plot/pull/1532)) ([cbfce8f3](https://github.com/antvis/g2plot/commit/cbfce8f39d6e28b88006154d78433b244081a443))
- v2 版子弹图 bullet 初稿 ([#1427](https://github.com/antvis/g2plot/pull/1427)) ([1210ff4b](https://github.com/antvis/g2plot/commit/1210ff4b5fe4217701dd0768b6490496fb9b5fcd))
- scatter chart supported quadrant ([#1522](https://github.com/antvis/g2plot/pull/1522)) ([471a7dd9](https://github.com/antvis/g2plot/commit/471a7dd98af482e4ab1b27d0cc1282b857adc00b))
- 增加交互关闭配置 & demo 走查 ([#1518](https://github.com/antvis/g2plot/pull/1518)) ([471379bb](https://github.com/antvis/g2plot/commit/471379bb5edc4fa60366d31a8c806cab541e8949))
- a new chart type - Box Chart ([#1382](https://github.com/antvis/g2plot/pull/1382)) ([c660d8f6](https://github.com/antvis/g2plot/commit/c660d8f6ea8b2a488fce12ffafca9fbfb37ea1be))
- add bar demos ([#1486](https://github.com/antvis/g2plot/pull/1486)) ([f696e66d](https://github.com/antvis/g2plot/commit/f696e66dc7d457b8cd857533f8c6c50f494dfd1d))
- **v2/word-cloud:** 新增词云图 ([#1530](https://github.com/antvis/g2plot/pull/1530)) ([4cfeb78c](https://github.com/antvis/g2plot/commit/4cfeb78cc04a894914f120e28a06e316c423a1c2))
- **legend:** add legend to dual-axes ([#1533](https://github.com/antvis/g2plot/pull/1533)) ([f75cbf08](https://github.com/antvis/g2plot/commit/f75cbf08f751ec9aebd9e06d985cdb8b0869b027))
- **v2/candle:** add candle plot ([#1502](https://github.com/antvis/g2plot/pull/1502)) ([46389c74](https://github.com/antvis/g2plot/commit/46389c7496efdb2c3f44648d44d25b866c1d8556))
- **liquid:** add new plot liquid ([#1499](https://github.com/antvis/g2plot/pull/1499)) ([32a1aa21](https://github.com/antvis/g2plot/commit/32a1aa2196fbe1d2811ee2f5dc62a90129bd08ef))
- **plugin:** add plugin plot for customize ([#1519](https://github.com/antvis/g2plot/pull/1519)) ([6346fcdc](https://github.com/antvis/g2plot/commit/6346fcdc70f91e14afb08bc0721349da38be79b4))
- **v2:** 添加玫瑰图配置项 ([#1454](https://github.com/antvis/g2plot/pull/1454)) ([a9cbbd28](https://github.com/antvis/g2plot/commit/a9cbbd28fc7ba8a090f9ac7b6e7174df8cc86e00))

##### Bug Fixes

- 修复 slider demos, 新增 scrollbar ([#1594](https://github.com/antvis/g2plot/pull/1594)) ([3130dc3b](https://github.com/antvis/g2plot/commit/3130dc3b3c7c051a16d8cf276f0b3c571d55005f))
- 修复迷你图 tooltip 不统一 ([#1578](https://github.com/antvis/g2plot/pull/1578)) ([09b30d30](https://github.com/antvis/g2plot/commit/09b30d30fa3df9cc6851b183839164f93adba304))
- fix api-extractor does not support the export \* as syntax ([#1577](https://github.com/antvis/g2plot/pull/1577)) ([ca78f988](https://github.com/antvis/g2plot/commit/ca78f9880aef66ce81b70692adefac5214829200))
- 解决走查问题和修复遗漏问题 ([#1553](https://github.com/antvis/g2plot/pull/1553)) ([391b0035](https://github.com/antvis/g2plot/commit/391b0035004ecb0f50436adafbad1b6fa6f40c7e))
- 代码走查 ([#1539](https://github.com/antvis/g2plot/pull/1539)) ([5f67f6fe](https://github.com/antvis/g2plot/commit/5f67f6fe23b975ee72a95d25371c464558380c67))
- 修复散点图单测问题 ([#1535](https://github.com/antvis/g2plot/pull/1535)) ([f0d0c2f7](https://github.com/antvis/g2plot/commit/f0d0c2f7fe84de62d49dddd1a138b50a75579128))
- 临时解决 changeData 无效问题 ([#1504](https://github.com/antvis/g2plot/pull/1504)) ([58032dd7](https://github.com/antvis/g2plot/commit/58032dd7abbb3738b360f9289e417bdb0a2207bf))
- 解决 width 、height 单一设置无效问题 ([#1490](https://github.com/antvis/g2plot/pull/1490)) ([263caf55](https://github.com/antvis/g2plot/commit/263caf55aeee4c61211025047841153ecb2bddbe))
- **liquid:** 升级 G2,使用正确的方式向自定义 shape 传参 ([#1584](https://github.com/antvis/g2plot/pull/1584)) ([868a26f1](https://github.com/antvis/g2plot/commit/868a26f193d9582f95659676fb71b137dc70fdad))
- **geometry:** 修改 geometry/base 中存在多个相同的时候,导致索引出错 ([#1575](https://github.com/antvis/g2plot/pull/1575)) ([d0884b00](https://github.com/antvis/g2plot/commit/d0884b00d391369d3e79f6ed2edf3117cae55211))

##### Performance Improvements

- 新增 animation 并更正其它图表 getDefaultOptions ([#1507](https://github.com/antvis/g2plot/pull/1507)) ([3d45caf9](https://github.com/antvis/g2plot/commit/3d45caf9cc19fb8d4fd6b5fa738306a549feeaa5))

##### Refactors

- **ring:** 环图中心文本统一结构 ([#1590](https://github.com/antvis/g2plot/pull/1590)) ([b15334dd](https://github.com/antvis/g2plot/commit/b15334ddd3d8a7440dd15b601681b3c63dcc981c))
- **statistic:** 统一中心文本结构 ([#1587](https://github.com/antvis/g2plot/pull/1587)) ([4663b95a](https://github.com/antvis/g2plot/commit/4663b95a753b4b3bff99144533e1091d62832a05))
- 改造 v2 子弹图为统一风格方式 ([#1579](https://github.com/antvis/g2plot/pull/1579)) ([afc6e584](https://github.com/antvis/g2plot/commit/afc6e584611853aba65cc876b7debc43ce4e8127))
- attribute mapping ([#1547](https://github.com/antvis/g2plot/pull/1547)) ([82c2b0cd](https://github.com/antvis/g2plot/commit/82c2b0cd456321a9bf8f0c7a24ce2ea1727bbef6))
- remove groupField, colorField, stackField in bar and column ([#1529](https://github.com/antvis/g2plot/pull/1529)) ([5d050b4d](https://github.com/antvis/g2plot/commit/5d050b4d83b52755083ec1013a3dba25c309de1b))

##### Tests

- **eslint:** add import-order rules for eslint ([#1513](https://github.com/antvis/g2plot/pull/1513)) ([2f221888](https://github.com/antvis/g2plot/commit/2f221888d14ecce1eeb99a3193ebac37daa50168))

#### 2.0.0-beta.2 (2020-08-24)

##### Documentation Changes

- 统一通用文档样式 ([#1470](https://github.com/antvis/g2plot/pull/1470)) ([bdafeb0e](https://github.com/antvis/g2plot/commit/bdafeb0eb5d117a66198b1c48cdee03d89fc1e32))
- 添加 axis ([#1465](https://github.com/antvis/g2plot/pull/1465)) ([ce8acafd](https://github.com/antvis/g2plot/commit/ce8acafd8a3ad5d0c8ed47b3753d6fe73bf9d793))
- 添加 tooltip ([#1452](https://github.com/antvis/g2plot/pull/1452)) ([0dda5279](https://github.com/antvis/g2plot/commit/0dda52790446c75922065cad655c605dbf44d961))
- 添加图表通用配置 ([#1439](https://github.com/antvis/g2plot/pull/1439)) ([a26dc3d8](https://github.com/antvis/g2plot/commit/a26dc3d80aafec1e563af737c3ac4eef2a9adc12))

##### New Features

- **slider:** add slider common adaptor, apply to line,area,column ([#1480](https://github.com/antvis/g2plot/pull/1480)) ([b1dc58a7](https://github.com/antvis/g2plot/commit/b1dc58a7b31a86ecd048257dc5ffea45e5f7d818))
- **lint-md:** add markdown lint & fix markdown error ([#1466](https://github.com/antvis/g2plot/pull/1466)) ([61b8c30b](https://github.com/antvis/g2plot/commit/61b8c30b473fc1f4092d5d3c16b6d9cfed8c7de0))
- **state:** 添加 setState 方法，通过条件设置三种状态的激活与否 ([#1460](https://github.com/antvis/g2plot/pull/1460)) ([5ba9e0a5](https://github.com/antvis/g2plot/commit/5ba9e0a5368b647bf996b770ea58ac70aa5c4071))
- **theme:** 增加主题 examples & 调整 options 定义 & 补全 theme 通道 ([#1457](https://github.com/antvis/g2plot/pull/1457)) ([32ab2840](https://github.com/antvis/g2plot/commit/32ab2840740806c9318d65e3b9c448e76e4d3705))
- 导出 G2 和 Tooltip 类型定义 ([#1446](https://github.com/antvis/g2plot/pull/1446)) ([076c7583](https://github.com/antvis/g2plot/commit/076c75839f1b802351db66cb821c047c9828d1b5))

##### Bug Fixes

- 修改 changeData ([#1471](https://github.com/antvis/g2plot/pull/1471)) ([3c10eb56](https://github.com/antvis/g2plot/commit/3c10eb56d625a68b4093b2e823515e4c2ad74bc5))
- 文档路径错误 ([#1467](https://github.com/antvis/g2plot/pull/1467)) ([2d76e7a0](https://github.com/antvis/g2plot/commit/2d76e7a0ac2e2a57432a56c0e70753b15a4c8518))
- 修改 scatter 写法 ([#1456](https://github.com/antvis/g2plot/pull/1456)) ([ae12f6e0](https://github.com/antvis/g2plot/commit/ae12f6e02a3caea01b2215223a4f012ebb116105))
- 解决空路径 demos 不可用问题 ([#1440](https://github.com/antvis/g2plot/pull/1440)) ([3b68173e](https://github.com/antvis/g2plot/commit/3b68173eb526d0135577d64efd9d82184cca9cb0))
- **pie:** 修复 chart 初始化获取不到 filteredData，使用 text content 回调替代 获取 ([#1441](https://github.com/antvis/g2plot/pull/1441)) ([06485c07](https://github.com/antvis/g2plot/commit/06485c07ac7dc31e82dcda2f14a435bfaa7edb6e))

##### Tests

- 修改 histogram 直方图的测试用例 ([#1447](https://github.com/antvis/g2plot/pull/1447)) ([1cd064bf](https://github.com/antvis/g2plot/commit/1cd064bfe08ab0809a6145da4583666fc2b2b4a3))

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
