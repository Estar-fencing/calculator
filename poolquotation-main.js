// poolquotation-main.js

function getLS(name) {
  try {
    return JSON.parse(localStorage.getItem(name) || '{}');
  } catch (e) { return {}; }
}

window.addEventListener("DOMContentLoaded", function () {
  // 读取数据
  const paramsData = getLS('paramsData');
  const poolsizechooseData = getLS('poolsizechooseData');
  const StylechooseData = getLS('StylechooseData');

  // 填写顶部公司表格
  document.getElementById("billTo").textContent = paramsData.Name || '';
  document.getElementById("billTel").textContent = paramsData.PhoneNumber || '';
  document.getElementById("billEmail").textContent = paramsData.Email || '';
  document.getElementById("billAddr").textContent = paramsData.Address || '';

  // 订单号
  const now = new Date();
  function pad(n) { return n < 10 ? '0' + n : n; }
  const no = `NO.: ESQ${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}`;
  document.getElementById('quoteNo').textContent = no;
  document.getElementById('quoteDate').textContent = "Date: " +
    now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate());

  // 渲染产品表
  const prodArea = document.getElementById('productTableArea');
  const prodObj = createProductTable(paramsData, poolsizechooseData, StylechooseData);
  prodArea.innerHTML = prodObj.html;

  // 计算合计
  let NETAMOUNT = prodObj.netSum || 0;
  let GST = NETAMOUNT * 0.1;
  let TOTALINC = NETAMOUNT * 1.1;
  let couponDiscount = 0;
  if (poolsizechooseData.couponCodeValue) {
    couponDiscount = -1 * poolsizechooseData.couponCodeValue * TOTALINC / 100;
  }
  let BALANCEDUE = TOTALINC + couponDiscount;

  // 渲染summary表格
  const summaryPic = StylechooseData.selectedPic || "logo.jpg";
  const summaryTableHTML = `
    <table class="summary-table">
      <tr>
        <td rowspan="5" style="width:250px; vertical-align:middle; text-align:center;">
          <img src="${summaryPic}" alt="" class="summary-img">
        </td>
        <td style="width:250px; text-align:right;">NET AMOUNT (AUD):</td>
        <td style="width:150px; text-align:center;">${NETAMOUNT.toFixed(2)}</td>
      </tr>
      <tr>
        <td style="text-align:right;">Total GST (AUD):</td>
        <td style="text-align:center;">${GST.toFixed(2)}</td>
      </tr>
      <tr>
        <td style="text-align:right;">Total Including GST (AUD):</td>
        <td style="text-align:center;">${TOTALINC.toFixed(2)}</td>
      </tr>
      <tr>
        <td style="text-align:right;">Coupon Discount (AUD):</td>
        <td style="text-align:center;">${couponDiscount !== 0 ? couponDiscount.toFixed(2) : ''}</td>
      </tr>
      <tr>
        <td style="text-align:right;">Balance Due(AUD):</td>
        <td style="text-align:center;">${BALANCEDUE.toFixed(2)}</td>
      </tr>
    </table>
  `;
  document.getElementById("summaryTableArea").innerHTML = summaryTableHTML;

  // 打印
  document.getElementById("btnPrint").onclick = function () {
    // 文件名
  let TOTALINC = 0;
  try {
    const prodObj = createProductTable(paramsData, poolsizechooseData, StylechooseData);
    TOTALINC = (prodObj.netSum || 0) * 1.1;
  } catch (e) {}

  let fileName = (paramsData.Name || '') + (paramsData.PhoneNumber || '') +
    '$' + (TOTALINC.toFixed(2) || 'Quote');

  // 设置页面标题为文件名
  document.title = fileName;
    // 打印
    window.print();
    // 打印后建议可用pdf虚拟打印保存为fileName
  };

  // 返回
  document.getElementById("btnBack").onclick = function () {
    window.location.href = "poolsizechoose.html";
  };
});
