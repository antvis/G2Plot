---
title: 散点图
order: 20
---

<div class="manual-docs">

 <div data-card-type="block" data-lake-card="table" id="pLwYV" class="">
    <table class="lake-table" style="width: 100%; outline: none; border-collapse: collapse;">
      <colgroup>
        <col width="395" span="1">
        <col width="340" span="1">
      </colgroup>
      <tbody>
        <tr style="height: 33px;">
          <td colspan="1" rowspan="4" style="background:#fff">
            <img data-role="image" src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*A9l6TqZB2v4AAAAAAAAAAABkARQnAQ" alt="屏幕快照 2020-03-05 下午7.26.23.png" style="border: none; box-shadow: none; width: 372px; height: 402px; visibility: visible;">
          </td>
          <td class="style1">
          <p><strong>定义</strong></p>
            <p><span class="lake-fontsize-12">散点图是将所有的数据以不同颜色的点的形式展现在平面直角坐标系上的统计图表。</span></p>
          </td>
        </tr>
        <tr style="height: 33px;">
          <td class="style1">
            <p><strong>视觉通道</strong></p>
            <p><span class="lake-fontsize-12">分布</span></p>
          </td>
        </tr>
        <tr style="height: 33px;">
          <td colspan="1">
            <p><strong>分析目的</strong></p>
            <p><span class="lake-fontsize-12">比较</span></p>
          </td>
        </tr>
        <tr style="height: 33px;">
          <td colspan="1">
            <p><strong>数据准备</strong></p>
            <p><span class="lake-fontsize-12">1 个「数值」字段</span></p>
               <p><span class="lake-fontsize-12">0 ~ 1 个「无序名词」字段</span></p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

# 快速上手

<playground path='scatter/scatter/demo/color-mapping.ts' rid='rect1'></playground>

查看更多<a href="/zh/examples/scatter/scatter" target='blank'>示例</a>.

## 配置项

散点图相关的配置参考 [API 文档](/zh/docs/api/plots/scatter).

# 散点图特性

## 回归线

<playground path='scatter/scatter/scatter/demo/line.ts' rid='rect2'></playground>

## 气泡图

气泡图是一种多变量的统计图表，由笛卡尔坐标系（直角坐标系）和大小不一、颜色不同的圆组成，可以看作是散点图的变形。

<playground path='scatter/bubble/demo/quadrant.ts' rid='rect3'></playground>

</div>

