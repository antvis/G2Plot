---
title: 直方图
order: 8
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
          <td colspan="1" rowspan="4" style="min-width: 90px; font-size: 14px; white-space: normal; overflow-wrap: break-word; border: 1px solid rgb(217, 217, 217); padding: 4px 8px; cursor: default;">
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><span data-card-type="inline" data-lake-card="image" contenteditable="false"><img data-role="image" src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*p4SPRYI3UfIAAAAAAAAAAABkARQnAQ" data-raw-src="https://gw.alipayobjects.com/mdn/rms_d314dd/afts/img/A*p4SPRYI3UfIAAAAAAAAAAABkARQnAQ" class="image lake-drag-image" alt="屏幕快照 2020-03-05 下午7.26.23.png" title="屏幕快照 2020-03-05 下午7.26.23.png" style="border: none; box-shadow: none; width: 372px; height: 402px; visibility: visible;"></span></p>
          </td>
          <td style="min-width: 90px; font-size: 14px; white-space: normal; overflow-wrap: break-word; border: 1px solid rgb(217, 217, 217); padding: 4px 8px; cursor: default;">
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><strong><span class="lake-fontsize-14" data-mce-style="font-size: 14px" style="font-size: 19px;"><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;">定义</span></span></strong><span class="lake-fontsize-9" style="color: rgba(0, 0, 0, 0.65); font-size: 12px;" data-mce-style="font-size: 9px"><br></span><span class="lake-fontsize-9" style="color: rgba(0, 0, 0, 0.65); font-size: 12px;" data-mce-style="font-size: 9px">直方图是一种统计报告图，由一系列高度不等的纵向条纹或线段表示数据分布的情况。</span></p>
          </td>
        </tr>
        <tr style="height: 33px;">
          <td style="min-width: 90px; font-size: 14px; white-space: normal; overflow-wrap: break-word; border: 1px solid rgb(217, 217, 217); padding: 4px 8px; cursor: default;">
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><strong><span class="lake-fontsize-14" data-mce-style="font-size: 14px" style="font-size: 19px;"><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;">视觉通道</span></span></strong><span class="lake-fontsize-9" style="color: rgba(0, 0, 0, 0.65); font-size: 12px;" data-mce-style="font-size: 9px"><br></span><span class="lake-fontsize-9" style="color: rgba(0, 0, 0, 0.65); font-size: 12px;" data-mce-style="font-size: 9px">位置</span></p>
          </td>
        </tr>
        <tr style="height: 33px;">
          <td colspan="1" style="vertical-align: top; background-color: rgb(255, 255, 255); color: rgb(38, 38, 38); min-width: 90px; font-size: 14px; white-space: normal; overflow-wrap: break-word; border: 1px solid rgb(217, 217, 217); padding: 4px 8px; cursor: default;">
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><strong><span class="lake-fontsize-14" data-mce-style="font-size: 14px" style="font-size: 19px;"><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;">分析目的</span></span></strong></p>
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><span class="lake-fontsize-9" style="color: rgba(0, 0, 0, 0.65); font-size: 12px;" data-mce-style="font-size: 9px"></span><span class="lake-fontsize-9" style="color: rgba(0, 0, 0, 0.65); font-size: 12px;" data-mce-style="font-size: 9px">比较、趋势</span></p>
          </td>
        </tr>
        <tr style="height: 33px;">
          <td colspan="1" style="vertical-align: top; background-color: rgb(255, 255, 255); color: rgb(38, 38, 38); min-width: 90px; font-size: 14px; white-space: normal; overflow-wrap: break-word; border: 1px solid rgb(217, 217, 217); padding: 4px 8px; cursor: default;">
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><strong><span class="lake-fontsize-14" data-mce-style="font-size: 14px" style="font-size: 19px;"><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;">数据准备</span></span></strong><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;"><br></span><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;">1 个「时间」或「有序名词」字段</span></p>
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;">0 ~ 1 个「无序名词」字段</span></p>
            <p style="font-size: 14px; color: rgb(38, 38, 38); line-height: 1.74; letter-spacing: 0.05em; outline-style: none; overflow-wrap: break-word; margin: 0px;"><span class="lake-fontsize-9" data-mce-style="font-size: 9px" style="font-size: 12px;">1 个「数值」字段</span></p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

# 快速上手

<playground path='more-plots/histogram/demo/basic.ts'></playground>

查看更多<a href="/zh/examples/more-plots/histogram" target='blank'>示例</a>.

## 配置项

直方图相关的配置参考 [API 文档](/zh/docs/api/plots/Histogram)。

</div>