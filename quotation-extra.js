// quotation-extra.js
function formatNum(num) {
  return (typeof num === 'number' && !isNaN(num)) ? num.toFixed(2) : (parseFloat(num) ? parseFloat(num).toFixed(2) : '');
}

function renderQuotationExtra() {
  // 1. 计算所有Line Price
  let total = 0;
  let rows = document.querySelectorAll('#quotationTableArea tr');
  for(let i=1;i<rows.length;i++) { // skip header
    let cells = rows[i].children;
    if (cells.length >= 6) {
      let val = parseFloat(cells[5].innerText);
      if(!isNaN(val)) total += val;
    }
  }
  let NETAMOUNT = total;
  let GST = NETAMOUNT * 0.1;
  let INCLUDINGGST = NETAMOUNT * 1.1;
  let coupon = 0;
  if (CustomizeTableData && CustomizeTableData.coupon) {
    coupon = -1 * parseFloat(CustomizeTableData.couponCodeValue)/100 * INCLUDINGGST;
  }
  let balanceDue = INCLUDINGGST + coupon;

  // 设置打印文件名
  window.setTimeout(() => {
    if (typeof window.document.title !== 'undefined') {
      let fileName = 
        (paramsData.Name||'') + 
        (paramsData.PhoneNumber||'') + 
        '$' + 
        formatNum(INCLUDINGGST);
      window.document.title = fileName;
    }
  }, 250);

  // 圆角图片，无边框（更大圆角）
let pic = StylechooseData.selectedPic || '';
let imgHtml = '';
if (pic) {
  imgHtml = `<img src="${pic}" style="width:300px;max-height:180px;object-fit:cover;border-radius:28px;display:block;" alt="product">`;
}

  // 汇总表格(第2列250px，第三列大一号18px并居中)
  let sumTable = `
  <table class="summary-table" style="width:100%;">
    <tr>
      <td rowspan="5" style="width:250px;vertical-align:middle;">${imgHtml}</td>
      <td style="width:250px;" class="right s14 bold">NET AMOUNT (AUD):</td>
      <td style="width:150px;text-align:center;font-size:18px;">${formatNum(NETAMOUNT)}</td>
      <td></td>
    </tr>
    <tr>
      <td class="right s14 bold">Total GST (AUD):</td>
      <td style="text-align:center;font-size:18px;">${formatNum(GST)}</td>
      <td></td>
    </tr>
    <tr>
      <td class="right s14 bold">Total Including GST (AUD):</td>
      <td style="text-align:center;font-size:18px;">${formatNum(INCLUDINGGST)}</td>
      <td></td>
    </tr>
    <tr>
      <td class="right s14 bold">Coupon Discount (AUD):</td>
      <td style="text-align:center;font-size:18px;">${formatNum(coupon)}</td>
      <td></td>
    </tr>
    <tr>
      <td class="right s14 bold">Balance Due(AUD):</td>
      <td style="text-align:center;font-size:18px;">${formatNum(balanceDue)}</td>
      <td></td>
    </tr>
  </table>
  `;

  // 备注和Payment带表格线（边框更明显）
let remarkTable = `
  <table class="remark-table" style="font-size:13px;border:1px solid #444; border-collapse:collapse; margin-top:30px; width:100%;">
    <tr>
      <td style="width:170px;vertical-align:top; border:1px solid #444;" class="bold s18">Remark</td>
      <td style="border:1px solid #444;">
        Please check all quantities, colours, finishes and descriptions are correct. Unit prices are not include GST. All quotes valid 30 days. Freight/delivery do not include rubbish removal or time required for site induction. Property in the goods shall not pass until final payment is received and cleared. Payment must be made within 7 days after project completion. Late payments will be subject to a 1% monthly penalty. Return must be in 7 days. No RETURN for second or clearance stuff.
      </td>
    </tr>
    <tr>
      <td style="vertical-align:top;border:1px solid #444;">Payment to:</td>
      <td style="border:1px solid #444;">
        Name: Estar Pty Ltd<br>
        BSB: 064-793<br>
        A/C: 1028 4966
      </td>
    </tr>
  </table>
`;

  document.getElementById('quotationExtraArea').innerHTML = sumTable + remarkTable;
}
