// quotation-title.js
function pad2(n){return n<10?'0'+n:n;}
function getToday(){
  let d=new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`;
}
function getOrderNo() {
  let d=new Date();
  return `NO.: ESQ${d.getFullYear()}${pad2(d.getMonth()+1)}${pad2(d.getDate())}${pad2(d.getHours())}${pad2(d.getMinutes())}`;
}

function renderQuotationTitle() {
  let logo = `<img src="logo.jpg" alt="logo" class="logo-img">`;
  let today = getToday();
  let orderNo = getOrderNo();
  let custName = paramsData.Name || '';
  let custPhone = paramsData.PhoneNumber || '';
  let custEmail = paramsData.Email || '';
  let custAddr = paramsData.Address || '';

  // Quotation 标题放在 Email 下面，分割线上面
  let html = `
  <table class="no-border" style="width:100%;margin-bottom:8px;">
    <tr>
      <td class="logo-cell" rowspan="4">${logo}</td>
      <td class="center bold s16" style="width:400px;">eStar Wholesale</td>
      <td class="right s14" style="width:170px;"></td>
    </tr>
    <tr>
      <td class="center s14">Add: 3 Lae St Beenleigh</td>
      <td class="right s14">${orderNo}</td>
    </tr>
    <tr>
      <td class="center s14">ABN: 34 674 044 243</td>
      <td class="right s14">Eason 0450 790 119</td>
    </tr>
    <tr>
      <td class="center s14">Email: Estar.eason@gmail.com</td>
      <td class="right s14">Date: ${today}</td>
    </tr>
  </table>
  <div class="center bold" style="font-size:22px;margin-bottom:10px;margin-top:4px;">Quotation</div>
  <div class="line"></div>
  <table style="width:100%;font-weight:bold;font-size:14px;margin-bottom:22px;">
    <tr>
      <td>Bill to: ${custName}</td>
      <td>Tel: ${custPhone}</td>
    </tr>
    <tr>
      <td>Email: ${custEmail}</td>
      <td>Address: ${custAddr}</td>
    </tr>
  </table>
  `;
  document.getElementById('quotationTitleArea').innerHTML = html;
}
