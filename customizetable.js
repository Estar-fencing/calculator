// 优惠码同前，不再赘述

const paramsData = (() => {
  try {
    return JSON.parse(localStorage.getItem('paramsData')) || {
      CouponCode1: 'ESTAR5',
      CouponCode2: 'ESTAR10',
      CouponCode3: 'ESTAR15',
      CouponCode4: 'ESTAR20'
    };
  } catch { return {}; }
})();

const couponList = [
  {code: paramsData.CouponCode1, off: 5},
  {code: paramsData.CouponCode2, off: 10},
  {code: paramsData.CouponCode3, off: 15},
  {code: paramsData.CouponCode4, off: 20},
];

const defaultRows = [
  { Name: '', Desc: '', Price: '', Qty: '', Remark: '' }
];

const maxRows = 10, minRows = 1;
let tableData = [];
let couponInfo = { code: '', off: 0, value: 0, valid: false };

// 加载默认数据
function getDefaultData() {
  return {
    rows: [...defaultRows],
    coupon: ''
  };
}

// 读取本地存储
function loadData() {
  let data = localStorage.getItem('CustomizeTableData');
  if (data) {
    try {
      data = JSON.parse(data);
      if (!data.rows || !Array.isArray(data.rows)) data.rows = [...defaultRows];
      if (data.rows.length === 0) data.rows = [...defaultRows];
      if (data.rows.length > maxRows) data.rows = data.rows.slice(0, maxRows);
      return data;
    } catch {
      return getDefaultData();
    }
  } else {
    return getDefaultData();
  }
}

// 渲染表格
function renderTable() {
  const tbody = document.getElementById('customTableBody');
  tbody.innerHTML = '';
  tableData.forEach((row, i) => {
    const tr = document.createElement('tr');
    // No.
    const tdNo = document.createElement('td');
    tdNo.className = 'no';
    tdNo.textContent = (i + 1).toString();
    tr.appendChild(tdNo);

    // Product Name
    const tdName = document.createElement('td');
    tdName.className = 'pname';
    tdName.innerHTML = `<input type="text" maxlength="50" value="${row.Name || ''}" data-idx="${i}" data-field="Name">`;
    tr.appendChild(tdName);

    // Description
    const tdDesc = document.createElement('td');
    tdDesc.className = 'desc';
    tdDesc.innerHTML = `<input type="text" maxlength="70" value="${row.Desc || ''}" data-idx="${i}" data-field="Desc">`;
    tr.appendChild(tdDesc);

    // Price
    const tdPrice = document.createElement('td');
    tdPrice.className = 'price';
    tdPrice.innerHTML = `<input type="number" min="0" step="0.01" value="${row.Price || ''}" data-idx="${i}" data-field="Price">`;
    tr.appendChild(tdPrice);

    // Qty
    const tdQty = document.createElement('td');
    tdQty.className = 'qty';
    tdQty.innerHTML = `<input type="number" min="0" step="1" value="${row.Qty || ''}" data-idx="${i}" data-field="Qty">`;
    tr.appendChild(tdQty);

    // Line Price
    const tdLinePrice = document.createElement('td');
    tdLinePrice.className = 'lineprice';
    let price = parseFloat(row.Price) || 0, qty = parseInt(row.Qty) || 0;
    let linePrice = (price * qty).toFixed(2);
    tdLinePrice.innerHTML = `<input type="text" readonly value="${linePrice}">`;
    tr.appendChild(tdLinePrice);

    // Remark
    const tdRemark = document.createElement('td');
    tdRemark.className = 'remark';
    tdRemark.innerHTML = `<input type="text" maxlength="40" value="${row.Remark || ''}" data-idx="${i}" data-field="Remark">`;
    tr.appendChild(tdRemark);

    tbody.appendChild(tr);
  });
  saveData();
}

// 只处理input，不再整体重绘
function onInputChange(e) {
  const idx = parseInt(e.target.dataset.idx);
  const field = e.target.dataset.field;
  if (idx >= 0 && field && field in tableData[idx]) {
    tableData[idx][field] = e.target.value;

    // 如果改动了 Price 或 Qty，要同步计算并更新 Line Price
    if (field === 'Price' || field === 'Qty') {
      let price = parseFloat(tableData[idx].Price) || 0;
      let qty = parseInt(tableData[idx].Qty) || 0;
      let linePrice = (price * qty).toFixed(2);
      // 只更新本行的 Line Price，不重绘表格
      let tr = e.target.closest('tr');
      let linePriceInput = tr.querySelector('td.lineprice input');
      linePriceInput.value = linePrice;
    }
    saveData();
  }
}

// 添加/删除行
function addRow() {
  if (tableData.length < maxRows) {
    tableData.push({ Name: '', Desc: '', Price: '', Qty: '', Remark: '' });
    renderTable();
  }
}
function removeRow() {
  if (tableData.length > minRows) {
    tableData.pop();
    renderTable();
  }
}

// 保存
function saveData() {
  localStorage.setItem('CustomizeTableData', JSON.stringify({
    rows: tableData,
    coupon: document.getElementById('couponInput').value
  }));
  // 读取当前优惠码
  const couponCode = document.getElementById('couponInput').value.trim();
  let couponOff = 0;
  if (couponCode) {
    let found = couponList.find(c => c.code && c.code.toLowerCase() === couponCode.toLowerCase());
    if (found) couponOff = found.off;
  }

  localStorage.setItem('CustomizeTableData', JSON.stringify({
    rows: tableData,
    coupon: couponCode,
    couponCodeValue: couponOff    // 新增：自动存储优惠百分比
  }));
}

// 重置
function resetData() {
  tableData = getDefaultData().rows;
  document.getElementById('couponInput').value = '';
  document.getElementById('couponMsg').textContent = '';
  couponInfo = { code: '', off: 0, value: 0, valid: false };
  renderTable();
  saveData();
}

// 优惠码应用
function applyCoupon() {
  const val = document.getElementById('couponInput').value.trim();
  let found = couponList.find(c => c.code && c.code.toLowerCase() === val.toLowerCase());
  let msg = '', valid = false;
  if (found) {
    msg = `Coupon applied! ${found.off}% off`;
    valid = true;
    document.getElementById('couponMsg').className = 'coupon-msg success';
    couponInfo = { code: found.code, off: found.off, value: found.off, valid: true };
  } else if (val.length > 0) {
    msg = 'Invalid coupon code';
    document.getElementById('couponMsg').className = 'coupon-msg error';
    couponInfo = { code: '', off: 0, value: 0, valid: false };
  } else {
    msg = '';
    couponInfo = { code: '', off: 0, value: 0, valid: false };
  }
  document.getElementById('couponMsg').textContent = msg;
  saveData();
}

// 跳转
function goBack() { window.location.href = 'installationChoose.html'; }
function calculate() {
  saveData();
  window.location.href = 'quotation.html';
}

// 绑定事件
document.addEventListener('DOMContentLoaded', function() {
  // 恢复本地数据
  const saved = loadData();
  tableData = saved.rows;
  document.getElementById('couponInput').value = saved.coupon || '';
  renderTable();
  // coupon回填
  if (saved.coupon) { applyCoupon(); }

  // 表格动态输入
  document.getElementById('customTableBody').addEventListener('input', onInputChange);

  // 增减行
  document.getElementById('addRowBtn').onclick = addRow;
  document.getElementById('removeRowBtn').onclick = removeRow;

  // 优惠码
  document.getElementById('applyCouponBtn').onclick = applyCoupon;

  // 按钮
  document.getElementById('resetBtn').onclick = resetData;
  document.getElementById('backBtn').onclick = goBack;
  document.getElementById('calculateBtn').onclick = calculate;
});
