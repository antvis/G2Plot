# 图像分类公开权重选型短名单

## 适用场景

面向需要在上设备实测前缩小候选范围的应用工程师与推理部署团队，从七个有出处的 TorchVision ImageNet-1K 权重中，找出同时符合准确率、运算量和参数量门槛的候选；本案例是**单次发布快照的筛选报告**，不比较升级前后，不做全量排名，也不判定生产就绪

三个摘要回答「剩多少、参数门槛淘汰了多少、入围中谁的 Top-1 最高」；散点检视准确率与运算量，横向条形比较参数量，证据表说明每个排除原因并将权重枚举连回原始来源；两图使用同一份达标判定结果，同一颜色始终代表通过或不通过三条门槛，而不是单图门槛状态

## 输入与数据口径

- 数据范围：TorchVision v0.25.0 正式权重元数据；一行表示一个权重枚举版本，共 7 行；数据在 [完整案例](../examples/scenarios/model-deployment-shortlist.ts) 内联，运行不下载模型、图片或外部数据
- `accuracy` 为官方 ImageNet-1K Top-1 正确率，单位百分比；`gflops` 为官方元数据中的前向运算量（数值按文档精度保留两位），不是每秒吞吐量或延迟；`params` 是准确参数个数，图表以参数个数除以一百万显示，不是运行内存或权重文件大小
- 案例阈值：Top-1 ≥ 75%、GFLOPS ≤ 0.50、参数量 ≤ 5,400,000，均含边界；同一状态同时用于摘要、颜色和表格
- 全门槛通过者按 Top-1 从高到低；如相同，依次比较较低运算量、较低参数量、模型名；这里的首选只用于决定谁先实测
- V1/V2 指权重版本，不是架构代际；精确权重枚举见案例内联数据

| 模型与权重 | Top-1 (%) | GFLOPS | 参数个数 | 官方来源 |
| --- | ---: | ---: | ---: | --- |
| MobileNet V3 Small / IMAGENET1K_V1 | 67.668 | 0.06 | 2,542,856 | [权重元数据](https://github.com/pytorch/vision/blob/v0.25.0/torchvision/models/mobilenetv3.py#L316-L336) |
| MobileNet V3 Large / IMAGENET1K_V2 | 75.274 | 0.22 | 5,483,032 | [权重元数据](https://github.com/pytorch/vision/blob/v0.25.0/torchvision/models/mobilenetv3.py#L292-L313) |
| EfficientNet B0 / IMAGENET1K_V1 | 77.692 | 0.39 | 5,288,548 | [权重元数据](https://github.com/pytorch/vision/blob/v0.25.0/torchvision/models/efficientnet.py#L407-L427) |
| RegNet Y 400MF / IMAGENET1K_V2 | 75.804 | 0.40 | 4,344,144 | [0.25 权重文档](https://docs.pytorch.org/vision/0.25/models/generated/torchvision.models.regnet_y_400mf.html#torchvision.models.RegNet_Y_400MF_Weights) |
| ResNet 18 / IMAGENET1K_V1 | 69.758 | 1.81 | 11,689,512 | [权重元数据](https://github.com/pytorch/vision/blob/v0.25.0/torchvision/models/resnet.py#L292-L310) |
| ResNet 50 / IMAGENET1K_V2 | 80.858 | 4.09 | 25,557,032 | [权重元数据](https://github.com/pytorch/vision/blob/v0.25.0/torchvision/models/resnet.py#L353-L373) |
| EfficientNet V2 S / IMAGENET1K_V1 | 84.228 | 8.37 | 21,458,488 | [权重元数据](https://github.com/pytorch/vision/blob/v0.25.0/torchvision/models/efficientnet.py#L615-L641) |

## 实现步骤

1. 将内联元数据统一转换成含 `status` 和 `failures` 的视图数据，先按原始精度判定，再做显示格式化
2. 从空 `#container` 创建标题、指标卡、图形父容器及表格，双列在窄屏变为单列；图容器显式高度，G2 实例使用 `autoFit: true`
3. [散点](../charts/scatter.md) 用 `point` 表现运算量与准确率，以 `view` 和两个 `line` 子标记绘制门槛；准确率轴从 64% 开始以区分差异，散点不用长度做比较
4. [横向条形](../charts/bar.md) 用 `interval` 配合 `transpose` 比较参数量，使用从零开始的数值轴，并叠加参数门槛线
5. 两图用同一颜色映射；证据表提供「入围/未入围」和具体原因、精确权重枚举与来源链接，可用键盘聚焦并横向滚动

## 易错点

- 三条门槛是逻辑与，不能把散点左上区域直接当成完整名单；MobileNet V3 Large 单独卡在参数量
- 不应把精度统一成少量小数后再筛选；本例参数阈值用原始整数，展示出的百万数可能有四舍五入
- 训练配方、预处理和输入尺寸不完全相同，不能将准确率差异归因于架构本身；上设备前另测延迟、峰值内存、目标域表现及部署框架兼容性
- 对散点两轴保留线性刻度和单位；独立证据表揭示聚集点各自的模型与值，不让结论只能靠鼠标指针取得

## 完整案例

| 链接 | 场景 | 关键配置 |
| --- | --- | --- |
| [model-deployment-shortlist.ts](../examples/scenarios/model-deployment-shortlist.ts) | 按公开权重元数据建立设备实测候选短名单 | 单快照，原生 DOM/CSS，G2 v5 `point` 和 `interval + transpose`，统一阈值、颜色映射及证据表 |

参照 [G2 v5 API 速查](../references/g2-v5-cheatsheet.md)、[数据结构规范](../references/data-patterns.md)、[v4→v5 迁移对照](../references/v4-to-v5-migration.md)；将此模块放入已有的 G2 v5 TypeScript 浏览器项目，页面只需空 `<div id="container"></div>`，模块加载后自行创建场景；此案例无查询参数、输入筛选或实时更新；图表悬浮提示是辅助信息，不改变结果；若由宿主动态挂载，模块导出的 `mount(container)` 可用于指定独立容器，返回 `ready` 和 `destroy()`

核对结果：三项分别为 **2 / 7**、**3 / 7**、**EfficientNet B0**；完整入围是 EfficientNet B0 与 RegNet Y 400MF；MobileNet V3 Large 通过准确率及运算量门槛，但有 5,483,032 个参数，超过 5,400,000；仓库检查用 `npm run validate` 与 `npm run lint`
