// quotation-table.js
function formatNum(num) {
  return (typeof num === 'number' && !isNaN(num)) ? num.toFixed(2) : (parseFloat(num) ? parseFloat(num).toFixed(2) : '');
}

function createTableRow(cells, isHeader = false) {
  const tag = isHeader ? 'th' : 'td';
  return '<tr>' + cells.map(c => `<${tag} style="${c.style||''}">${c.value==null?'':c.value}</${tag}>`).join('') + '</tr>';
}

function formatQty(num) {
  if (typeof num !== 'number' || isNaN(num)) return '';
  // 如果是整数，直接输出；否则保留2位小数
  return Number.isInteger(num) ? num.toString() : num.toFixed(2);
}


function renderQuotationTable() {
  let tableRows = [];
  let seq = 1;
  // 列宽设置
  const widths = [
    '30px', '155px', '200px', '60px', '45px', '70px', '188px'
  ];

  // 1. 表头
  tableRows.push(
    createTableRow([
      {value:'No.', style:`width:${widths[0]};`},
      {value:'Product Name', style:`width:${widths[1]};`},
      {value:'Description', style:`width:${widths[2]};`},
      {value:'Price', style:`width:${widths[3]};`},
      {value:'Qty', style:`width:${widths[4]};`},
      {value:'Line Price', style:`width:${widths[5]};`},
      {value:'Remark', style:`width:${widths[6]};`}
    ], true)
  );

  // ===========================  fence ===========================
  if (sizechooseData && sizechooseData.fenceRows) {
    for (let i = 0; i < sizechooseData.fenceRows.length; i++) {
      let row = sizechooseData.fenceRows[i];
      if (row.L) {
        let price = StylechooseData.FenceStyleValue*StylechooseData.GapValue;
        let qty = (row.L || 1) * (row.H || 1); // 修改后的Qty计算
        let linePrice = price * qty;
        tableRows.push(
          createTableRow([
            {value: seq++, style:`text-align:center;`},
            {value: StylechooseData.FenceStyleType || ''},
    {value:
      ((StylechooseData.Colortype || '') +
       (row.H ? ' ' + row.H + 'mH' : '') +
       (row.L ? '，' + row.L + 'mL' : '')
      ).trim()
    },            {value: formatNum(price),  style:`text-align:center;`},
            {value: formatQty(qty), style:`text-align:center;`},
            {value: formatNum(linePrice), style:`text-align:center;`},
            {value: [StylechooseData.gaptype,  'AUD/㎡'].filter(Boolean).join(', ')}
          ])
        );
      }
    }
  }

  // =========================== IngroundPost ===========================
  if (installationChooseData && installationChooseData.IngroundPostQty) {
    let price = installationChooseData.Ingroundpostvalue || '';
    let qty = installationChooseData.IngroundPostQty;
    let linePrice = price * qty;
    tableRows.push(
      createTableRow([
        {value: seq++, style:`text-align:center;`},
        {value: installationChooseData.IngroundPoststyle || 'Inground Post'},
        {value: [StylechooseData.Colortype, '65x65mm x ', installationChooseData.Ingroundpostheight ? installationChooseData.Ingroundpostheight + 'mL' : ''].filter(Boolean).join(' ')},
        {value: formatNum(price),  style:`text-align:center;`},
        {value: formatQty(qty), style:`text-align:center;`},
        {value: formatNum(linePrice), style:`text-align:center;`},
        {value: 'With Cap'}
      ])
    );
  }

  // =========================== PlatePost ===========================
  if (installationChooseData && installationChooseData.PlatePostQty) {
    let price = installationChooseData.PlatePostValue || '';
    let qty = installationChooseData.PlatePostQty;
    let linePrice = price * qty;
    tableRows.push(
      createTableRow([
        {value: seq++, style:`text-align:center;`},
        {value: installationChooseData.PlatePoststyle || 'Plate Post'},
        {value: [StylechooseData.Colortype, '65x65mm x ', installationChooseData.PlatePostHeight ? installationChooseData.PlatePostHeight + 'mL' : ''].filter(Boolean).join(' ')},
        {value: formatNum(price),  style:`text-align:center;`},
        {value: formatQty(qty), style:`text-align:center;`},
        {value: formatNum(linePrice), style:`text-align:center;`},
        {value: 'With Cap'}
      ])
    );
  }

  // =========================== big IngroundPost ===========================
  if (installationChooseData && installationChooseData.bigIngroundPostQty) {
    let price = installationChooseData.bigIngroundPostValue || '';
    let qty = installationChooseData.bigIngroundPostQty;
    let linePrice = price * qty;
    tableRows.push(
      createTableRow([
        {value: seq++, style:`text-align:center;`},
        {value: installationChooseData.IngroundPoststyle || 'Inground Post'},
        {value: [StylechooseData.Colortype, '76x76mm x ', installationChooseData.Ingroundpostheight ? installationChooseData.Ingroundpostheight + 'mL' : ''].filter(Boolean).join(' ')},
        {value: formatNum(price),  style:`text-align:center;`},
        {value: formatQty(qty), style:`text-align:center;`},
        {value: formatNum(linePrice), style:`text-align:center;`},
        {value: 'With Cap'}
      ])
    );
  }

  // =========================== big PlatePost ===========================
  if (installationChooseData && installationChooseData.bigPlatePostQty) {
    let price = installationChooseData.bigPlatePostValue || '';
    let qty = installationChooseData.bigPlatePostQty;
    let linePrice = price * qty;
    tableRows.push(
      createTableRow([
        {value: seq++, style:`text-align:center;`},
        {value: installationChooseData.PlatePoststyle || 'Plate Post'},
        {value: [StylechooseData.Colortype, '76x76mm x ', installationChooseData.PlatePostHeight ? installationChooseData.PlatePostHeight + 'mL' : ''].filter(Boolean).join(' ')},
        {value: formatNum(price),  style:`text-align:center;`},
        {value: formatQty(qty), style:`text-align:center;`},
        {value: formatNum(linePrice), style:`text-align:center;`},
        {value: 'With Cap'}
      ])
    );
  }

  // =========================== Bracket ===========================
  if (installationChooseData && installationChooseData.BracketQty) {
    let price = paramsData.b1 || '';
    let qty = installationChooseData.BracketQty;
    let linePrice = price * qty;
    tableRows.push(
      createTableRow([
        {value: seq++, style:`text-align:center;`},
        {value: 'Bracket'},
        {value: '40x40'},
        {value: formatNum(price),  style:`text-align:center;`},
        {value: formatQty(qty), style:`text-align:center;`},
        {value: formatNum(linePrice), style:`text-align:center;`},
        {value: StylechooseData.Colortype || ''}
      ])
    );
  }

  // =========================== small gates ===========================
  if (sizechooseData && sizechooseData.smallgateRows) {
    for (let i = 0; i < sizechooseData.smallgateRows.length; i++) {
      let row = sizechooseData.smallgateRows[i];
      if (row.L) {
        let price = (paramsData.sm1+StylechooseData.FenceStyleValue*StylechooseData.GapValue-paramsData.f1) * row.H * row.L;
        let qty = 1;
        let linePrice = price * qty;
        tableRows.push(
          createTableRow([
            {value: seq++, style:`text-align:center;`},
            {value: 'Small gate'},
            {value: [StylechooseData.Colortype, row.H ? row.H + 'mH x ' : '', row.L ? row.L + 'mW' : ''].join(' ')},
            {value: formatNum(price),  style:`text-align:center;`},
            {value: formatQty(qty), style:`text-align:center;`},
            {value: formatNum(linePrice), style:`text-align:center;`},
            {value: [StylechooseData.FenceStyleTypename, StylechooseData.gaptype].filter(Boolean).join(' ')}
          ])
        );
      }
    }
  }

  // =========================== Small gate post ===========================
  if (installationChooseData && installationChooseData.TotalSmallgatePostQty) {
    let price = paramsData.p18 || '';
    let qty = installationChooseData.TotalSmallgatePostQty;
    let linePrice = price * qty;
    tableRows.push(
      createTableRow([
        {value: seq++, style:`text-align:center;`},
        {value: 'Small gate Post'},
        {value: '65x65 1.8mH'},
        {value: formatNum(price),  style:`text-align:center;`},
        {value: formatQty(qty), style:`text-align:center;`},
        {value: formatNum(linePrice), style:`text-align:center;`},
        {value: StylechooseData.Colortype || ''}
      ])
    );
  }

  // =========================== Lock and Hinges ===========================
  if (installationChooseData && installationChooseData.LockAndHingesQty) {
    let price = paramsData.l1 || '';
    let qty = installationChooseData.LockAndHingesQty;
    let linePrice = price * qty;
    tableRows.push(
      createTableRow([
        {value: seq++, style:`text-align:center;`},
        {value: 'Lock & Hinges'},
        {value: installationChooseData.Locktype || ''},
        {value: formatNum(price),  style:`text-align:center;`},
        {value: formatQty(qty), style:`text-align:center;`},
        {value: formatNum(linePrice), style:`text-align:center;`},
        {value: 'Black'}
      ])
    );
  }

  // =========================== sliding gates ===========================
  if (sizechooseData && sizechooseData.slidingRows) {
    for (let i = 0; i < sizechooseData.slidingRows.length; i++) {
      let row = sizechooseData.slidingRows[i];
      if (row.L) {
        let price = (paramsData.s1+StylechooseData.FenceStyleValue*StylechooseData.GapValue-paramsData.f1) * row.H * row.L;
        let qty = 1;
        let linePrice = price * qty;
        tableRows.push(
          createTableRow([
            {value: seq++, style:`text-align:center;`},
            {value: 'Sliding gate'},
            {value: [StylechooseData.Colortype, row.H ? row.H + 'mH x ' : '', row.L ? row.L + 'mL' : ''].join(' ')},
            {value: formatNum(price),  style:`text-align:center;`},
            {value: formatQty(qty), style:`text-align:center;`},
            {value: formatNum(linePrice), style:`text-align:center;`},
            {value: [StylechooseData.FenceStyleTypename, StylechooseData.gaptype].filter(Boolean).join(' ')}
          ])
        );
      }
    }
  }

  // =========================== Gate kits & U-Post ===========================
  if (installationChooseData && installationChooseData.GatekitsUPostQty) {
    let price = paramsData.gku1 || '';
    let qty = installationChooseData.GatekitsUPostQty;
    let linePrice = price * qty;
    tableRows.push(
      createTableRow([
        {value: seq++, style:`text-align:center;`},
        {value: 'Gate kits & U-Post'},
        {value: 'Wheels Catcher Holder etc.'},
        {value: formatNum(price),  style:`text-align:center;`},
        {value: formatQty(qty), style:`text-align:center;`},
        {value: formatNum(linePrice), style:`text-align:center;`},
        {value: StylechooseData.Colortype || ''}
      ])
    );
  }

  // =========================== Sliding gate motor ===========================
  if (sizechooseData && sizechooseData.SlidingGateMotorQty) {
    let price = sizechooseData.SlidingGateMotorValue || '';
    let qty = sizechooseData.SlidingGateMotorQty;
    let linePrice = price * qty;
    tableRows.push(
      createTableRow([
        {value: seq++, style:`text-align:center;`},
        {value: 'Sliding Motor'},
        {value: sizechooseData.SlidingGateMotorType || ''},
        {value: formatNum(price),  style:`text-align:center;`},
        {value: formatQty(qty), style:`text-align:center;`},
        {value: formatNum(linePrice), style:`text-align:center;`},
        {value: ''}
      ])
    );
  }

  // =========================== Steel Track ===========================
  if (installationChooseData && installationChooseData.SteelTrackQty) {
    let price = paramsData.st1 || '';
    let qty = installationChooseData.SteelTrackQty;
    let linePrice = price * qty;
    tableRows.push(
      createTableRow([
        {value: seq++, style:`text-align:center;`},
        {value: 'Steel Track'},
        {value: '1mL'},
        {value: formatNum(price),  style:`text-align:center;`},
        {value: formatQty(qty), style:`text-align:center;`},
        {value: formatNum(linePrice), style:`text-align:center;`},
        {value: ''}
      ])
    );
  }

  // =========================== Extra Remote ===========================
  if (installationChooseData && installationChooseData.ExtraRemoteQty) {
    let price = paramsData.rem1 || '';
    let qty = installationChooseData.ExtraRemoteQty;
    let linePrice = price * qty;
    tableRows.push(
      createTableRow([
        {value: seq++, style:`text-align:center;`},
        {value: 'Extra Remote'},
        {value: ' '},
        {value: formatNum(price),  style:`text-align:center;`},
        {value: formatQty(qty), style:`text-align:center;`},
        {value: formatNum(linePrice), style:`text-align:center;`},
        {value: ''}
      ])
    );
  }

  // =========================== Wireless Keypad ===========================
  if (installationChooseData && installationChooseData.WirelessKeypadQty) {
    let price = paramsData.wkey1 || '';
    let qty = installationChooseData.WirelessKeypadQty;
    let linePrice = price * qty;
    tableRows.push(
      createTableRow([
        {value: seq++, style:`text-align:center;`},
        {value: 'Wireless Keypad'},
        {value: ' '},
        {value: formatNum(price),  style:`text-align:center;`},
        {value: formatQty(qty), style:`text-align:center;`},
        {value: formatNum(linePrice), style:`text-align:center;`},
        {value: ''}
      ])
    );
  }


  // =========================== double swing gates ===========================
  if (sizechooseData && sizechooseData.swingRows) {
    for (let i = 0; i < sizechooseData.swingRows.length; i++) {
      let row = sizechooseData.swingRows[i];
      if (row.L) {
        let price = (paramsData.s1+StylechooseData.FenceStyleValue*StylechooseData.GapValue-paramsData.f1) * row.H * row.L; // 注意你的算法，如果实际为paramsData.s1*row.H*row.L则请替换
        let qty = 1;
        let linePrice = price * qty;
        tableRows.push(
          createTableRow([
            {value: seq++, style:`text-align:center;`},
            {value: 'Double Swing gate'},
            {value: [StylechooseData.Colortype, row.H ? row.H + 'mH x ' : '', row.L ? row.L + 'mL' : ''].join(' ')},
            {value: formatNum(price),  style:`text-align:center;`},
            {value: formatQty(qty), style:`text-align:center;`},
            {value: formatNum(linePrice), style:`text-align:center;`},
            {value: [StylechooseData.FenceStyleTypename, StylechooseData.gaptype].filter(Boolean).join(' ')}
          ])
        );
      }
    }
  }

  // =========================== Heavy duty hinges ===========================
  if (installationChooseData && installationChooseData.HeavydutyHingesQty) {
    let price = paramsData.hh1 || '';
    let qty = installationChooseData.HeavydutyHingesQty;
    let linePrice = price * qty;
    tableRows.push(
      createTableRow([
        {value: seq++, style:`text-align:center;`},
        {value: 'Heavy duty Hinges'},
        {value: '65x65 hinges'},
        {value: formatNum(price),  style:`text-align:center;`},
        {value: formatQty(qty), style:`text-align:center;`},
        {value: formatNum(linePrice), style:`text-align:center;`},
        {value: 'Black'}
      ])
    );
  }

  // =========================== Swing Arm Motor ===========================
  if (sizechooseData && sizechooseData.SwingarmMotorQty) {
    let price = sizechooseData.SwingarmMotorValue || '';
    let qty = sizechooseData.SwingarmMotorQty;
    let linePrice = price * qty;
    tableRows.push(
      createTableRow([
        {value: seq++, style:`text-align:center;`},
        {value: 'Swing Arm Motor'},
        {value: sizechooseData.SwingarmMotorType || ''},
        {value: formatNum(price),  style:`text-align:center;`},
        {value: formatQty(qty), style:`text-align:center;`},
        {value: formatNum(linePrice), style:`text-align:center;`},
        {value: ''}
      ])
    );
  }

  // =========================== Mail Box ===========================
  if (installationChooseData && installationChooseData.MailBoxQty) {
    let price = paramsData.mb || '';
    let qty = installationChooseData.MailBoxQty;
    let linePrice = price * qty;
    tableRows.push(
      createTableRow([
        {value: seq++, style:`text-align:center;`},
        {value: 'Mail Box'},
        {value: ' '},
        {value: formatNum(price),  style:`text-align:center;`},
        {value: formatQty(qty), style:`text-align:center;`},
        {value: formatNum(linePrice), style:`text-align:center;`},
        {value: ''}
      ])
    );
  }


  // =========================== Fence Installation ===========================
  if (installationChooseData && installationChooseData.InstallationFenceQty) {
    let price = StylechooseData.InstallationStyleValue || '';
    let qty = installationChooseData.InstallationFenceQty;
    let linePrice = price * qty;
    tableRows.push(
      createTableRow([
        {value: seq++, style:`text-align:center;`},
        {value: 'Fence Installation'},
        {value: 'with parts'},
        {value: formatNum(price),  style:`text-align:center;`},
        {value: formatQty(qty), style:`text-align:center;`},
        {value: formatNum(linePrice), style:`text-align:center;`},
        {value: 'Price Per Panel'}
      ])
    );
  }

  // =========================== Small gate Installation ===========================
  if (installationChooseData && installationChooseData.InstallationSmallGateValue) {
    let price = paramsData.smi1 || '';
    let qty = sizechooseData.SmallGateQty || 1;
    let linePrice = price * qty;
    tableRows.push(
      createTableRow([
        {value: seq++, style:`text-align:center;`},
        {value: 'Small gate Installation'},
        {value: 'with parts'},
        {value: formatNum(price),  style:`text-align:center;`},
        {value: formatQty(qty), style:`text-align:center;`},
        {value: formatNum(linePrice), style:`text-align:center;`},
        {value: ''}
      ])
    );
  }

  // =========================== Sliding Gate Installation ===========================
  if (installationChooseData && installationChooseData.InstallationSlidingGateValue) {
    let price = sizechooseData.InstallationSlidingMotorValue || '';
    let qty = sizechooseData.SlidingGateQty || 1;
    let linePrice = price * qty;
    tableRows.push(
      createTableRow([
        {value: seq++, style:`text-align:center;`},
        {value: sizechooseData.InstallationSlidingMotortype || 'Sliding gate Installation'},
        {value: 'without hard wire from house'},
        {value: formatNum(price),  style:`text-align:center;`},
        {value: formatQty(qty), style:`text-align:center;`},
        {value: formatNum(linePrice), style:`text-align:center;`},
        {value: 'Sliding gate'}
      ])
    );
  }

  // =========================== Double Swing Gate Installation ===========================
  if (installationChooseData && installationChooseData.InstallationDoubleSwingGateValue) {
    let price = sizechooseData.InstallationArmMotorValue || '';
    let qty = sizechooseData.DoubleSwingGateQty || 1;
    let linePrice = price * qty;
    tableRows.push(
      createTableRow([
        {value: seq++, style:`text-align:center;`},
        {value: sizechooseData.InstallationArmMotortype || 'Double Swing gate Installation'},
        {value: 'without hard wire from house'},
        {value: formatNum(price),  style:`text-align:center;`},
        {value: formatQty(qty), style:`text-align:center;`},
        {value: formatNum(linePrice), style:`text-align:center;`},
        {value: 'Double Swing gate'}
      ])
    );
  }

  // =========================== Track Road Installation ===========================
  if (installationChooseData && installationChooseData.TrackRoadValue) {
    let price = paramsData.tr1 || '';
    let qty = installationChooseData.TrackRoadValue;
    let linePrice = price * qty;
    tableRows.push(
      createTableRow([
        {value: seq++, style:`text-align:center;`},
        {value: 'Track Road Installation'},
        {value: 'Steel Pipe With Concrete'},
        {value: formatNum(price),  style:`text-align:center;`},
        {value: formatQty(qty), style:`text-align:center;`},
        {value: formatNum(linePrice), style:`text-align:center;`},
        {value: 'Price Per Meter'}
      ])
    );
  }

  // =========================== Powder Coating ===========================
  if (StylechooseData && StylechooseData.ColorValue) {
    let price = StylechooseData.ColorValue;
    let qty = installationChooseData.powdercaotingQty || 1;
    let linePrice = price * qty;
    tableRows.push(
      createTableRow([
        {value: seq++, style:`text-align:center;`},
        {value: 'Powder Coating'},
        {value: StylechooseData.Colortype || ''},
        {value: formatNum(price),  style:`text-align:center;`},
        {value: formatQty(qty), style:`text-align:center;`},
        {value: formatNum(linePrice), style:`text-align:center;`},
        {value: 'Price Per SQM'}
      ])
    );
  }

  // =========================== CustomizeTable lines ===========================
// 支持两种数据结构，避免全空
if (CustomizeTableData.rows && Array.isArray(CustomizeTableData.rows)) {
  CustomizeTableData.rows.forEach((line) => {
    if (line.Name && line.Name.trim()) {
      let price = Number(line.Price) || 0;
      let qty = Number(line.Qty) || 0;
      let desc = line.Desc || '';
      let remark = line.Remark || '';
      tableRows.push(
        createTableRow([
          {value: seq++, style:`text-align:center;`},
          {value: line.Name},
          {value: desc},
          {value: formatNum(price),  style:`text-align:center;`},
          {value: formatQty(qty), style:`text-align:center;`},
          {value: formatNum(price * qty)},
          {value: remark}
        ])
      );
    }
  });
} else if (CustomizeTableData) {
  for (let i = 1; i <= 10; i++) {
    let name = CustomizeTableData[`Line${i}Name`];
    if (name) {
      let desc = CustomizeTableData[`Line${i}Desc`] || '';
      let price = Number(CustomizeTableData[`Line${i}Price`]) || 0;
      let qty = Number(CustomizeTableData[`Line${i}Qty`]) || 0;
      let remark = CustomizeTableData[`Line${i}Remark`] || '';
      tableRows.push(
        createTableRow([
          {value: seq++, style:`text-align:center;`},
          {value: name},
          {value: desc},
          {value: formatNum(price),  style:`text-align:center;`},
          {value: formatQty(qty), style:`text-align:center;`},
          {value: formatNum(price * qty)},
          {value: remark}
        ])
      );
    }
  }
}



  // 输出到页面
  document.getElementById('quotationTableArea').innerHTML =
    `<table border="1" cellspacing="0" cellpadding="4" style="width:100%;font-size:13px;border-collapse:collapse;margin-bottom:24px;">${tableRows.join('')}</table>`;
}

// 你需要在页面的 onload 或相关JS逻辑中调用 renderQuotationTable()。
