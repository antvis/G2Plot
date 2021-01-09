---
title: Scatter
order: 20
---

<div class="manual-docs">

<div data-card-type="block" data-lake-card="table" id="pLwYV" class="">
    <table class="lake-table" style="width: 735px; outline: none; border-collapse: collapse;">
      <colgroup>
        <col width="395" span="1">
        <col width="340" span="1">
      </colgroup>
      <tbody>
        <tr style="height: 33px;">
          <td colspan="1" rowspan="4" style="min-width: 90px; font-size: 14px; white-space: normal; overflow-wrap: break-word; border: 1px solid rgb(217, 217, 217); padding: 4px 8px; cursor: default;">
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><span data-card-type="inline" data-lake-card="image" contenteditable="false"><img data-role="image" src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*A9l6TqZB2v4AAAAAAAAAAABkARQnAQ" data-raw-src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*A9l6TqZB2v4AAAAAAAAAAABkARQnAQ" class="image lake-drag-image" alt="屏幕快照 2020-03-06 下午11.10.44.png" title="屏幕快照 2020-03-06 下午11.10.44.png" style="border: none; box-shadow: none; width: 372px; height: 448px; visibility: visible;"></span></p>
          </td>
          <td style="min-width: 90px; font-size: 14px; white-space: normal; overflow-wrap: break-word; border: 1px solid rgb(217, 217, 217); padding: 4px 8px; cursor: default;">
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><strong><span class="lake-fontsize-14" data-mce-style="font-size: 14px" style="font-size: 19px;"><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;">定义</span></span></strong><span class="lake-fontsize-9" style="color: rgba(0, 0, 0, 0.65); font-size: 12px;" data-mce-style="font-size: 9px"><br></span><span class="lake-fontsize-9" style="color: rgba(0, 0, 0, 0.65); font-size: 12px;" data-mce-style="font-size: 9px">散点图是将所有的数据以不同颜色的点的形式展现在平面直角坐标系上的统计图表。</span></p>
          </td>
        </tr>
        <tr style="height: 33px;">
          <td colspan="1" style="vertical-align: top; background-color: rgb(255, 255, 255); color: rgb(38, 38, 38); min-width: 90px; font-size: 14px; white-space: normal; overflow-wrap: break-word; border: 1px solid rgb(217, 217, 217); padding: 4px 8px; cursor: default;">
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><strong><span class="lake-fontsize-14" data-mce-style="font-size: 14px" style="font-size: 19px;"><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;">视觉通道</span></span></strong><span class="lake-fontsize-9" style="color: rgba(0, 0, 0, 0.65); font-size: 12px;" data-mce-style="font-size: 9px"><br></span><span class="lake-fontsize-9" style="color: rgba(0, 0, 0, 0.65); font-size: 12px;" data-mce-style="font-size: 9px">颜色、位置</span></p>
          </td>
        </tr>
        <tr style="height: 33px;">
          <td colspan="1" style="vertical-align: top; background-color: rgb(255, 255, 255); color: rgb(38, 38, 38); min-width: 90px; font-size: 14px; white-space: normal; overflow-wrap: break-word; border: 1px solid rgb(217, 217, 217); padding: 4px 8px; cursor: default;">
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><strong><span class="lake-fontsize-14" data-mce-style="font-size: 14px" style="font-size: 19px;"><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;">分析目的</span></span></strong></p>
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><span class="lake-fontsize-9" style="color: rgba(0, 0, 0, 0.65); font-size: 12px;" data-mce-style="font-size: 9px">分布</span></p>
          </td>
        </tr>
        <tr style="height: 33px;">
          <td colspan="1" style="vertical-align: top; background-color: rgb(255, 255, 255); color: rgb(38, 38, 38); min-width: 90px; font-size: 14px; white-space: normal; overflow-wrap: break-word; border: 1px solid rgb(217, 217, 217); padding: 4px 8px; cursor: default;">
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><strong><span class="lake-fontsize-14" data-mce-style="font-size: 14px" style="font-size: 19px;"><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;">数据准备</span></span></strong><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;"><br></span><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;">2 个「数值」字段</span></p>
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;">0 ~ 1 个「无序名词」字段</span></p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

# Quick start

<playground path='scatter/scatter/demo/color-mapping.ts' rid='rect1'></playground>

See more <a href="/en/examples/scatter/scatter" target='blank'>examples</a>.

## Configuration

For an overview of the scatter plot options see the [API reference](/en/docs/api/plots/scatter).

# Scatter plot features

## RegressionLine

<playground path='scatter/scatter/scatter/demo/line.ts' rid='rect2'></playground>

## Bubble

气泡图是一种多变量的统计图表，由笛卡尔坐标系（直角坐标系）和大小不一、颜色不同的圆组成，可以看作是散点图的变形。

<playground path='scatter/bubble/demo/quadrant.ts' rid='rect3'></playground>

</div>