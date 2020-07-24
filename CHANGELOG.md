## <small>1.1.14 (2020-07-21)</small>

fix: rangeStyle not ringStyle (#1310)

## <small>1.1.13 (2020-07-20)</small>

*  fix: 指标区域移除后需要置空 (#1303)。

## <small>1.1.12 (2020-07-10)</small>

* feat: 水波图新增 htmlContent 支持，支持修改数值大小。
* feat: 新增折线图实现。[1272](https://github.com/antvis/G2Plot/pull/1272)
* fix: 修复混合图时间轴被截断。
* fix: 解决条形区间图添加 scrollbar 时图表崩溃问题。 [1269](https://github.com/antvis/G2Plot/issues/1269)
* fix: 修复饼、环 label 设置为 spider ，数据都为0时，展示为1。 [1265](https://github.com/antvis/G2Plot/pull/1265)

## <small>1.1.10 (2020-07-02)</small>

* feat: 环比 statistic.htmlContent 回调参数补充 size，容器宽度设置 (#1250) ([3d90e6b](https://github.com/antvis/g2plot/commit/3d90e6b)), closes [#1250](https://github.com/antvis/g2plot/issues/1250)


## <small>1.1.9 (2020-07-02)</small>

* 环图 Statistics 区域优化 (#1248) ([0e9ff68](https://github.com/antvis/g2plot/commit/0e9ff68)), closes [#1248](https://github.com/antvis/g2plot/issues/1248)
* feat(pie&donut): label and statistic value can be affected by scale (#1189) ([15ac56f](https://github.com/antvis/g2plot/commit/15ac56f)), closes [#1189](https://github.com/antvis/g2plot/issues/1189)
* Fix donut statistic (#1218) ([5db8197](https://github.com/antvis/g2plot/commit/5db8197)), closes [#1218](https://github.com/antvis/g2plot/issues/1218)
* fix: fix guide line render error without plot data (#1242) ([c149ff2](https://github.com/antvis/g2plot/commit/c149ff2)), closes [#1242](https://github.com/antvis/g2plot/issues/1242)
* fix: fix heatmap updateConfig error (#1246) ([ce28701](https://github.com/antvis/g2plot/commit/ce28701)), closes [#1246](https://github.com/antvis/g2plot/issues/1246)
* fix: fix line renderer without data (#1229) ([938c9b6](https://github.com/antvis/g2plot/commit/938c9b6)), closes [#1229](https://github.com/antvis/g2plot/issues/1229)
* fix: linechart 的point stroke不应该被写死 (#1176) ([cb9d927](https://github.com/antvis/g2plot/commit/cb9d927)), closes [#1176](https://github.com/antvis/g2plot/issues/1176)
* fix: percent-stacked-column tooltip is not a number (#1233) ([70d1b86](https://github.com/antvis/g2plot/commit/70d1b86)), closes [#1233](https://github.com/antvis/g2plot/issues/1233)
* fix: prevent js error when adjust tooltip (#1240) ([db6020c](https://github.com/antvis/g2plot/commit/db6020c)), closes [#1240](https://github.com/antvis/g2plot/issues/1240)
* fix: update scrollbar and data label when changeData (#1202) ([a83a915](https://github.com/antvis/g2plot/commit/a83a915)), closes [#1202](https://github.com/antvis/g2plot/issues/1202)
* fix(pie): 修复饼图数据全为 0 展示 (#1223) ([942f557](https://github.com/antvis/g2plot/commit/942f557)), closes [#1223](https://github.com/antvis/g2plot/issues/1223) [#1161](https://github.com/antvis/g2plot/issues/1161)


## <small>1.1.8 (2020-06-30)</small>

* fix: 百分比堆叠柱状图，同一维度的数据如果数据为0的时候，图表tooltip显示NAN  ([821](https://github.com/antvis/G2Plot/issues/821))

## <small>1.1.7 (2020-06-16)</small>

* Delete stale.yml ([48a9c55](https://github.com/antvis/g2plot/commit/48a9c55))
* feat(pie&donut): label and statistic value can be affected by scale (#1189) ([15ac56f](https://github.com/antvis/g2plot/commit/15ac56f)), closes [#1189](https://github.com/antvis/g2plot/issues/1189)


## <small>1.1.6 (2020-06-05)</small>
- 🐞fix: pieLabel类型不兼容 (#1132) ([583335e](https://github.com/antvis/g2plot/commit/583335e))

## <small>1.1.5 (2020-05-28)</small>
- 🐞fix: 图例通过 margin 配置来对齐 (#1132) ([884fd8d](https://github.com/antvis/g2plot/commit/884fd8d)), closes [#1132](https://github.com/
antvis/g2plot/issues/1132)

## <small>1.1.4 (2020-05-25)
- 🌟feat: 词云图禁用动画模式增加 ([13553f3](https://github.com/antvis/G2Plot/pull/1110/commits))

## <small>1.1.3 (2020-05-19)
- 🌟feat: line plot label responsive ([3b20a94](https://github.com/antvis/G2Plot/commit/3b20a94))
- 🌟feat: public method for chart ([b609738](https://github.com/antvis/G2Plot/commit/b609738))
- 🐞fix: 轴标题配置及padding计算 ([7332d75](https://github.com/antvis/G2Plot/commit/7332d75))
- 🐞fix: guideline display ([dc4e25a](https://github.com/antvis/G2Plot/commit/dc4e25a))

## <small>1.1.2 (2020-05-09
🌟feat: combo series line (04aa6c7)
🌟feat: update customize tooltip configration (3b5a513)
🐞fix: pie default radius (9854cda)

## <small>1.1.1 (2020-05-06)
- 🐞fix: chart name typo ([7b2a0b](https://github.com/antvis/G2Plot/commit/7b2a0b0))
- 🐞fix: dual line render error without legend config ([4675421](https://github.com/antvis/G2Plot/commit/4675421))

## <small>1.1.0 (2020-05-06)
- 🌟双轴图升级为正式版 ([8568318](https://github.com/antvis/G2Plot/commit/8568318))
- 🐞fix: padding calculation ([db7d6b3](https://github.com/antvis/G2Plot/commit/db7d6b3))
- 🐞fix: donut spider label ([3eb3955](https://github.com/antvis/G2Plot/commit/3eb3955))
- 🐞fix: 漏斗图legend隐藏，组件绘制错误 ([7e8c75a](https://github.com/antvis/G2Plot/commit/7e8c75a))

## <small>1.0.4 (2020-04-22)
- 🌟 auto label for Column and Bar chart([be2eaa1](https://github.com/antvis/G2Plot/commit/be2eaa1))
- 🌟 auto label for Area chart([597b667](https://github.com/antvis/G2Plot/commit/597b667))
- 🌟 customize tooltip([e8ec027](https://github.com/antvis/G2Plot/commit/e8ec027))
- 🌟 mobile events and gesture([b4a8d47](https://github.com/antvis/G2Plot/commit/b4a8d47))
- 🌟 timeline component for Scatter and Bubble Chart([ec4f686](https://github.com/antvis/G2Plot/commit/ec4f686))
- 🐞 fix: correct label position for negative data([02b4347](https://github.com/antvis/G2Plot/commit/02b4347))
- 🐞 fix: donut disable tooltip condition([1d25d85](https://github.com/antvis/G2Plot/commit/1d25d85))
- 🐞 fix: 辅助数据点无法显示([00041a0](https://github.com/antvis/G2Plot/commit/00041a0))
- 🐞 fix: title position error([23aab7c](https://github.com/antvis/G2Plot/commit/23aab7c))
- 🐞 fix: liquid statistic visibility([5d6eae2](https://github.com/antvis/G2Plot/commit/5d6eae2))

## <small>1.0.3 (2020-03-31)
- 🌟 MarkerPoint componnet for Line Chart([055ca32](https://github.com/antvis/G2Plot/commit/055ca32))
- 🌟 Pie Chart label support adjustPosition config([75e323c](https://github.com/antvis/G2Plot/commit/75e323c))
- 🌟 enrich Gauge style configration([fd9d7f0](https://github.com/antvis/G2Plot/commit/fd9d7f0))
- 📃 update Gauge Chart docs & site examples' title support english verison([1ddba79](https://github.com/antvis/G2Plot/commit/1ddba79))
- 🚧 label components refactor([75e323c](https://github.com/antvis/G2Plot/commit/a72849d))
- 🐞 fix: Liquid Chart position error ([8781ba](https://github.com/antvis/G2Plot/commit/8781ba9))
- 🐞 fix: Donut Chart statistic auto size ([6ce2a11](https://github.com/antvis/G2Plot/commit/6ce2a11))
- 🐞 fix: line & area types([d60146d](https://github.com/antvis/G2Plot/commit/d60146d))
- 🐞 fix: stackedArea type([62c6ed9](https://github.com/antvis/G2Plot/commit/62c6ed9))
- 🐞 fix: column types([165b00c](https://github.com/antvis/G2Plot/commit/165b00c))
- 🐞 fix: rangeColumn types([17f582f](https://github.com/antvis/G2Plot/commit/17f582f))
- 🐞 fix: waterfall types([d60942c](https://github.com/antvis/G2Plot/commit/d60942c))
- 🐞 fix: bar types([daa3070](https://github.com/antvis/G2Plot/commit/daa3070))
- 🐞 fix: pie types([7e05b77](https://github.com/antvis/G2Plot/commit/7e05b77))
- 🐞 fix: rardar types([f646a35](https://github.com/antvis/G2Plot/commit/f646a35))
- 🐞 fix: rose types([ec45ef9](https://github.com/antvis/G2Plot/commit/ec45ef9))
- 🐞 fix: liquid types([d666629](https://github.com/antvis/G2Plot/commit/d666629))
- 🐞 fix: funnel types([0cb8f7b](https://github.com/antvis/G2Plot/commit/0cb8f7b))
- 🐞 fix: bullet types([ded949f](https://github.com/antvis/G2Plot/commit/ded949f))
- 🐞 fix: treemap types([2180bd2](https://github.com/antvis/G2Plot/commit/2180bd2))
- 🐞 fix: sparkline types([d715a56](https://github.com/antvis/G2Plot/commit/d715a56))



## <small>1.0.2 (2020-03-19)
- 更新readme ([c2dbdd0](https://github.com/antvis/G2Plot/commit/c2dbdd0))
- 🐞 gauge去除lodash依赖 ([8bf22bc](https://github.com/antvis/G2Plot/commit/8bf22bc))
- 🐞 修复changeData不重新渲染 ([c7bd150](https://github.com/antvis/G2Plot/commit/c7bd150))
- 🐞 折线图自动设置min为0值时导致数据更新scale错误 ([70b0b2e](https://github.com/antvis/G2Plot/commit/70b0b2e))
- 🐞 fix denpendency import([491e498](https://github.com/antvis/G2Plot/commit/491e498))
- 🌟 tooltip content formatter([1d6264c](https://github.com/antvis/G2Plot/commit/1d6264c))
- 🐞 修复 progress 类型定义错误([4942ea3](https://github.com/antvis/G2Plot/commit/4942ea3))
- 🐞 修复area的lineLabel和areaLabel无法配置样式([132892b](https://github.com/antvis/G2Plot/commit/132892b))
- 🐞 clean up webpack config([a48a7dd](https://github.com/antvis/G2Plot/commit/a48a7dd))
- 🐞 修复多图表实例时tooltip位置错误([d202f12](https://github.com/antvis/G2Plot/commit/d202f12))
- 🐞 修复area丢失pointLabel([31e97d6](https://github.com/antvis/G2Plot/commit/31e97d6))
- 🐞 修复pie chart配置meta失效([0f15569](https://github.com/antvis/G2Plot/commit/0f15569))
- 🐞 fix coverage badage([d50abc8](https://github.com/antvis/G2Plot/commit/d50abc8))
- 🐞 fix barStyle callback config([8d7b0d3](https://github.com/antvis/G2Plot/commit/8d7b0d3))

## <small>1.0.1 (2020-03-16)
- 🌟add tooltip style doc ([f8879c9](https://github.com/antvis/G2Plot/commit/f8879c9))

## <small>1.0.0 (2020-03-16)
- 🌟release 1.0.0 ([e6d2a37](https://github.com/antvis/G2Plot/commit/d55b370))

## <small>0.11.40 (2020-03-13)</small>
- 🐞Liquid & process 必选数据类型判断

## <small>0.11.39 (2020-03-13)</small>
- 🐞修复一些类型定义问题 ([e6d2a37](https://github.com/antvis/G2Plot/commit/e6d2a37))

## <small>0.11.38 (2020-03-12)</small>
- 🐞移除饼图label中的lodash依赖

## <small>0.11.37 (2020-03-09)</small>
- 🌟重新发布版本

## <small>0.11.36 (2020-03-07)</small>
- 🌟更新 g2 依赖版本 ([51b3df](https://github.com/antvis/G2Plot/commit/2f8104a))

## <small>0.11.35 (2020-03-02)</small>
- 🌟修复词云图透明背景问题 ([51b3df](https://github.com/antvis/G2Plot/commit/51b3df))

## <small>0.11.34 (2020-02-28)</small>
- 🌟wordcloud animation ([d94d3dd](https://github.com/antvis/G2Plot/commit/d94d3dd))
- 🌟sunburst event ([1456a81](https://github.com/antvis/G2Plot/commit/1456a81))

## <small>0.11.33 (2020-02-28)</small>
- 🌟Sunburst ([5692ca6](https://github.com/antvis/G2Plot/commit/5692ca6))

## <small>0.11.32 (2020-02-21)</small>
- 🐞 饼图 tooltip 与 label 对外透出 percent ([365fd0f](https://github.com/antvis/G2Plot/commit/365fd0f))

## <small>0.11.31 (2020-02-17)</small>
- 🐞 修复瀑布图必需设置meta的问题 ([3669511](https://github.com/antvis/G2Plot/commit/3669511))

## <small>0.11.30 (2020-02-17)</small>
- 🐞 temporary remove geomCliper for svg rendering ([be69918](https://github.com/antvis/G2Plot/commit/be69918))

## <small>0.11.29 (2020-02-17)</small>
- 🐞 fix g version ([03a33d7](https://github.com/antvis/G2Plot/commit/03a33d7))

## <small>0.11.28 (2020-02-06)</small>
- 🐞 修复水波图图形剪裁 ([b93f605](https://github.com/antvis/G2Plot/commit/b93f605))
- 🐞 热力图legend位置错误 ([c989c87](https://github.com/antvis/G2Plot/commit/c989c87))
- 🐞 升级Scale 3.0之后的bug fix ([1f698b1](https://github.com/antvis/G2Plot/commit/1f698b1))


## <small>0.11.27 (2020-02-06)</small>
- 🐞 panelCliper => geomCliper ([52cc285](https://github.com/antvis/G2Plot/commit/52cc285c1f9427699e8a9b41fd4a749eefd40397))

## <small>0.11.26 (2020-02-06)</small>
- 🌟 update scale to 3.0 ([6538cfd](https://github.com/antvis/G2Plot/commit/6538cfd6d900ad886ac34ad8013b8d9a902184f3))

## <small>0.11.25 (2020-02-05)</small>
- 🐞 fix word-cloud not found error([1ad5d4c](https://github.com/antvis/G2Plot/commit/1ad5d4cc1f5a773e600b5c8905c29530c574ec96))

## <small>0.11.24 (2020-02-04)</small>
- 🌟 add word-cloud chart ([2f1baa9](https://github.com/antvis/G2Plot/pull/513/commits))

## <small>0.11.23 (2020-02-03)</small>
- 🌟 add rose chart ([f99aaf8](https://github.com/antvis/G2Plot/commit/f99aaf8))
- 🌟 add treemap chart ([703fba7](https://github.com/antvis/G2Plot/commit/703fba7))
- 🌟 对比漏斗图 ([fa411f2](https://github.com/antvis/G2Plot/commit/fa411f2))
- 🌟 transposed funnel chart ([f9cbf5b](https://github.com/antvis/G2Plot/commit/f9cbf5b))
- 🐞 fix guideLine error ([d310520](https://github.com/antvis/G2Plot/commit/d310520))

## <small>0.11.21 (2020-01-02)</small>
- 🐞 fix top padding error ([53de76f](https://github.com/antvis/G2Plot/commit/53de76f))
- 🌟 add overlapped combo chart ([c893594](https://github.com/antvis/G2Plot/commit/c893594))

## <small>0.11.20 (2019-12-31)</small>
- 🐞 修复miniChart-column time scale绘制错误 ([b00163b](https://github.com/antvis/G2Plot/commit/b00163b))

## <small>0.11.19 (2019-12-30)</small>
- 🐞 修复直方图绘制失效 ([d8097dc](https://github.com/antvis/G2Plot/commit/d8097dc))
- 🌟 优化折线图动画效果 ([4a8a028](https://github.com/antvis/G2Plot/commit/4a8a028))

## <small>0.11.18 (2019-12-30)</small>
- 🐞 散点图tooltip & legend bug fix ([b452862](https://github.com/antvis/G2Plot/commit/b452862))
- 🐞 移除util中的moment依赖 ([077a2c6](https://github.com/antvis/G2Plot/commit/077a2c6))
- 🌟 新增瀑布图 ([4c6d703](https://github.com/antvis/G2Plot/commit/4c6d703))

## <small>0.11.15 (2019-12-23)</small>
- 🐞 label参与auto-padding计算 ([0c566c1](https://github.com/antvis/G2Plot/commit/0c566c1))

## <small>0.11.13 (2019-12-23)</small>
- 🐞 修改条形图legend和tooltip顺序颠倒问题 ([e4f8f68](https://github.com/antvis/G2Plot/commit/e4f8f68))

## <small>0.11.9 (2019-12-16)</small>
- 🐞 update dependency version: g2 scale component ([23ca0ec](https://github.com/antvis/G2Plot/commit/23ca0ec))

## <small>0.11.7 (2019-12-16)</small>

- 🌟 add quadrant and trendline components to Scatter Plot and Bubble Plot ([2f6c8a0](https://github.com/antvis/G2Plot/commit/2f6c8a0))

- 🌟 update documents and demos ([f33071c](https://github.com/antvis/G2Plot/commit/f33071c))



## <small>0.11.6 (2019-12-12)</small>
- 🐞 fix dependency version ([1369b34](https://github.com/antvis/G2Plot/commit/1369b34))

- 🌟 pie label enhancement ([52e77c0](https://github.com/antvis/G2Plot/commit/52e77c0))

- 🌟 column & bar chart label add adjustPosition option ([e0bbc53](https://github.com/antvis/G2Plot/commit/e0bbc53))


## <small>0.11.5 (2019-12-09)</small>

- 🐞 miniChart-progress 使用代理shape解决mouseenter & mouseleave问题([63253c6](https://github.com/antvis/G2Plot/commit/63253c6))
- 🐞 column chart无法正确绘制timecat数据([2950739](https://github.com/antvis/G2Plot/commit/2950739))
- 🌟 miniChart-progress 更强大的update()方法 ([b77d489](https://github.com/antvis/G2Plot/commit/b77d489))
- 🌟 export declaration file ([6f73e29](https://github.com/antvis/G2Plot/commit/6f73e29))

## <small>0.11.4 (2019-12-06)</small>

- 🐞 优化 tinyChart-progress 的 mouseleave 事件 ([52512d8](https://github.com/antvis/G2Plot/commit/52512d8))

## <small>0.11.3 (2019-12-05)</small>

- 🌟tinyChart-progress update 方法支持第二个参数：更新时的样式配置,增加动画配置 ([b10719c](https://github.com/antvis/G2Plot/commit/b10719c))
- 🌟tinyChart-progress 增加 marker 组件 ([afe05e7](https://github.com/antvis/G2Plot/commit/afe05e7))
- 🌟 相关文档更新 ([e214f83](https://github.com/antvis/G2Plot/commit/e214f83))

## <small>0.11.2 (2019-12-04)</small>

- feat: add legend margin to theme ([4dba674](https://github.com/antvis/g2plot/commit/4dba674))
- feat: canvas events as plot events ([9bdc754](https://github.com/antvis/g2plot/commit/9bdc754))
- feat: general configration dpcument english version ([e607292](https://github.com/antvis/g2plot/commit/e607292))
- feat: general-config-doc en ([7626d12](https://github.com/antvis/g2plot/commit/7626d12))
- feat: getting-started-en ([d0d58e9](https://github.com/antvis/g2plot/commit/d0d58e9))
- feat: unbind event ([122812f](https://github.com/antvis/g2plot/commit/122812f))
- feat: update general-config docs ([c523986](https://github.com/antvis/g2plot/commit/c523986))
- feat: view 事件透传 ([e7ae72a](https://github.com/antvis/g2plot/commit/e7ae72a))
- feat: 增加图层事件，支持嵌套 ([01835f1](https://github.com/antvis/g2plot/commit/01835f1))
- feat: 字符串转数字 ([d594655](https://github.com/antvis/g2plot/commit/d594655))
- feat: 自定义组件事件 ([219ec11](https://github.com/antvis/g2plot/commit/219ec11))
- feat: 自定义组件的 mouseenter & mouseleave 事件分发 ([04c6894](https://github.com/antvis/g2plot/commit/04c6894))
- fix: cdn link in getting-started doc ([fa7a40e](https://github.com/antvis/g2plot/commit/fa7a40e))
- fix: color setting error in progress & support size option ([c31d91e](https://github.com/antvis/g2plot/commit/c31d91e))
- fix: correct data range for vertical scrollbar ([e2a02ac](https://github.com/antvis/g2plot/commit/e2a02ac))
- fix: dblClick event name ([f24b57b](https://github.com/antvis/g2plot/commit/f24b57b))
- fix: eventController 类型定义 ([f67f744](https://github.com/antvis/g2plot/commit/f67f744))
- fix: fixed scale ranges for percentage stacked bar/column/area ([4383eb2](https://github.com/antvis/g2plot/commit/4383eb2))
- fix: homepage link ([a24b7ee](https://github.com/antvis/g2plot/commit/a24b7ee))
- fix: layer & viewLayer eventParser 命名统一 ([fbcf212](https://github.com/antvis/g2plot/commit/fbcf212))
- fix: line layer event parser name ([e92a91e](https://github.com/antvis/g2plot/commit/e92a91e))
- fix: minichart docs typo ([0fbea36](https://github.com/antvis/g2plot/commit/0fbea36))
- fix: optimize scrollbar range calculate ([2ab4201](https://github.com/antvis/g2plot/commit/2ab4201))
- fix: position is not supported for axisLabel ([6872f57](https://github.com/antvis/g2plot/commit/6872f57))
- fix: readme typo ([2c532b9](https://github.com/antvis/g2plot/commit/2c532b9))
- fix: remove console log ([c79af35](https://github.com/antvis/g2plot/commit/c79af35))
- fix: remove sideEffects flag for now ([5f80695](https://github.com/antvis/g2plot/commit/5f80695))
- fix: reverse data for percentage stack bar ([36adb84](https://github.com/antvis/g2plot/commit/36adb84))
- fix: 修复 Pie Ring 的 labelLine 以及 area 的透明度 ([7af0ccd](https://github.com/antvis/g2plot/commit/7af0ccd))
- fix: 类型声明 ([7ec6cc8](https://github.com/antvis/g2plot/commit/7ec6cc8))
- fix: 类型定义 ([7f8eab3](https://github.com/antvis/g2plot/commit/7f8eab3))
- chore: 0.11.1 => 0.11.2 ([625af38](https://github.com/antvis/g2plot/commit/625af38))
- chore: fix lint ([d2f76c5](https://github.com/antvis/g2plot/commit/d2f76c5))
- chore: remove canvas event ([2888446](https://github.com/antvis/g2plot/commit/2888446))
- chore: update github release action ([df14c84](https://github.com/antvis/g2plot/commit/df14c84))
- chore: update links & site-en ([4ad6b4d](https://github.com/antvis/g2plot/commit/4ad6b4d))
- chore: update readme ([4e40699](https://github.com/antvis/g2plot/commit/4e40699))
- chore: update readme ([4aadd5c](https://github.com/antvis/g2plot/commit/4aadd5c))
- chore: update readme ([247ae84](https://github.com/antvis/g2plot/commit/247ae84))
- chore: use ACCESS_TOKEN for release action ([e0545e0](https://github.com/antvis/g2plot/commit/e0545e0))
- docs: update changelog for v0.11.1 ([be6d94d](https://github.com/antvis/g2plot/commit/be6d94d))
- docs: 更新资源地址 ([14271f0](https://github.com/antvis/g2plot/commit/14271f0))
- docs(readme): optimize readme style, and fix typo ([86db2cf](https://github.com/antvis/g2plot/commit/86db2cf))

## <small>0.11.1 (2019-11-26)</small>

- 🔥 官网文档和图表示例大量更新 [#287](https://github.com/antvis/G2Plot/pull/287), [#298](https://github.com/antvis/G2Plot/pull/298)
- 🌟 默认隐藏条形图、和百分比条形图 X 轴的刻度线 [#297](https://github.com/antvis/G2Plot/pull/297)
- 🐞 修复折线图数据标签中某些配置项不生效问题 [#290](https://github.com/antvis/G2Plot/pull/290)
- 🐞 修复折线图轴样式在响应式布局下可能不生效的问题 [#299](https://github.com/antvis/G2Plot/pull/299)
- 🐞 修复鼠标悬浮提示在图形边缘时可能出现位置错误的问题 [#302](https://github.com/antvis/G2Plot/pull/302)

## 0.11.0 (2019-11-22)

- 🌟G2Plot 0.11.0
