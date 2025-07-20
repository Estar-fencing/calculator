// poolquotation-table.js

function createProductTable(paramsData, poolsizechooseData, StylechooseData) {
  let tableRows = [];
  let idx = 1;
  const currency = v => (Number(v) ? Number(v).toFixed(2) : '');

  // Fence Panel
  if (poolsizechooseData.TotalpoolFencePanel) {
    tableRows.push([
      idx++,
      StylechooseData.FenceStyleType || 'Fence Panel',
      `2.4mL X ${poolsizechooseData.PoolFenceHeightValue || ''} mH`,
      currency(poolsizechooseData.poolFenceValue),
      poolsizechooseData.TotalpoolFencePanel,
      currency(poolsizechooseData.poolFenceValue * poolsizechooseData.TotalpoolFencePanel),
      StylechooseData.Colortype || ''
    ]);
  }

  // Inground Post
  if (poolsizechooseData.PoolingroundPostQty) {
    tableRows.push([
      idx++,
      "Inground Post",
      `${StylechooseData.Colortype || ''} ${poolsizechooseData.poolSmallgatePostHeight-0.3 || ''}mL`,
      currency(poolsizechooseData.PoolingroundPostValue),
      poolsizechooseData.PoolingroundPostQty,
      currency(poolsizechooseData.PoolingroundPostValue * poolsizechooseData.PoolingroundPostQty),
      "50x50"
    ]);
  }

  // Plate Post
  if (poolsizechooseData.PoolPlatePostQty) {
    tableRows.push([
      idx++,
      "Plate Post",
      `${StylechooseData.Colortype || ''} ${poolsizechooseData.poolSmallgatePostHeight-0.3 || ''}mL`,
      currency(poolsizechooseData.PlatePostvalue),
      poolsizechooseData.PoolPlatePostQty,
      currency(poolsizechooseData.PlatePostvalue * poolsizechooseData.PoolPlatePostQty),
      "50x50"
    ]);
  }

  // Gate Post
  if (poolsizechooseData.poolSmallgatePostQty) {
    tableRows.push([
      idx++,
      "Gate Post",
      `${StylechooseData.Colortype || ''} ${poolsizechooseData.poolSmallgatePostHeight || ''}mL`,
      currency(poolsizechooseData.poolSmallgatePostValue),
      poolsizechooseData.poolSmallgatePostQty,
      currency(poolsizechooseData.poolSmallgatePostValue * poolsizechooseData.poolSmallgatePostQty),
      "50x50"
    ]);
  }

  // Cap
  if (poolsizechooseData.poolpostcapQty) {
    tableRows.push([
      idx++,
      "50x50 Cap",
      poolsizechooseData.poolpostcapType || "",
      currency(poolsizechooseData.poolpostcapValue),
      poolsizechooseData.poolpostcapQty,
      currency(poolsizechooseData.poolpostcapValue * poolsizechooseData.poolpostcapQty),
      StylechooseData.Colortype || ""
    ]);
  }

  // Foot Cover
  if (poolsizechooseData.poolFootCoverQty) {
    tableRows.push([
      idx++,
      "Foot Cover",
      "50x50 Aluminum",
      currency(paramsData.pffc),
      poolsizechooseData.poolFootCoverQty,
      currency(paramsData.pffc * poolsizechooseData.poolFootCoverQty),
      StylechooseData.Colortype || ""
    ]);
  }

  // Bracket
  if (poolsizechooseData.poolBracketQty) {
    tableRows.push([
      idx++,
      "38x25 Bracket",
      "4 in one bag with screws",
      currency(paramsData.b2),
      poolsizechooseData.poolBracketQty,
      currency(paramsData.b2 * poolsizechooseData.poolBracketQty),
      StylechooseData.Colortype || ""
    ]);
  }

  // Small Gate
  if (poolsizechooseData.poolSmallGateQty) {
    tableRows.push([
      idx++,
      "Small gate",
      `${poolsizechooseData.PoolFenceHeightValue || ''}mH 975mmW`,
      currency(paramsData.pfg),
      poolsizechooseData.poolSmallGateQty,
      currency(paramsData.pfg * poolsizechooseData.poolSmallGateQty),
      StylechooseData.Colortype || ""
    ]);
  }

  // Long Lock
  if (poolsizechooseData.poolSmallgatelockQty) {
    tableRows.push([
      idx++,
      "Long Lock",
      "Lockable",
      currency(paramsData.polk),
      poolsizechooseData.poolSmallgatelockQty,
      currency(paramsData.polk * poolsizechooseData.poolSmallgatelockQty),
      "Black"
    ]);
  }

  // Self Close Hinge
  if (poolsizechooseData.poolSmallgateHingeQty) {
    tableRows.push([
      idx++,
      "Self Close Hinge",
      "Adjustable with safety cap",
      currency(paramsData.pohg),
      poolsizechooseData.poolSmallgateHingeQty,
      currency(paramsData.pohg * poolsizechooseData.poolSmallgateHingeQty),
      "Black"
    ]);
  }

  // Powder Coating
  if (StylechooseData.ColorValue && poolsizechooseData.poolpowdercaotingQty) {
    tableRows.push([
      idx++,
      "Powder Coating",
      StylechooseData.Colortype || "",
      currency(StylechooseData.ColorValue),
      poolsizechooseData.poolpowdercaotingQty,
      currency(StylechooseData.ColorValue * poolsizechooseData.poolpowdercaotingQty),
      ""
    ]);
  }

  // Installation
  if (poolsizechooseData.PoolInstallationValue) {
    // 计算公式
    let total = 0;
    try {
      total = (
        (poolsizechooseData.TotalpoolFencePanel || 0) * (paramsData.poolins || 0) +
        (poolsizechooseData.TotalpoolPostQty || 0) * (paramsData.poolins || 0) +
        (poolsizechooseData.poolSmallGateQty || 0) * (paramsData.poolins || 0) * 2
      );
    } catch (e) {}
    tableRows.push([
      idx++,
      "Installation",
      "with Parts",
      currency(total),
      1,
      currency(total * 1),
      ""
    ]);
  }

  // 自定义行
  for (let i = 1; i <= 10; i++) {
    const name = poolsizechooseData[`poolLine${i}Name`];
    if (name) {
      tableRows.push([
        idx++,
        name,
        poolsizechooseData[`poolLine${i}Desc`] || "",
        currency(poolsizechooseData[`poolLine${i}Price`] || ""),
        poolsizechooseData[`poolLine${i}Qty`] || "",
        currency((poolsizechooseData[`poolLine${i}Price`] || 0) * (poolsizechooseData[`poolLine${i}Qty`] || 0)),
        poolsizechooseData[`poolLine${i}Remark`] || ""
      ]);
    }
  }

  // 拼表格
  let html = `<table class="product-table"><thead><tr>
    <th>No.</th>
    <th>Product Name</th>
    <th>Description</th>
    <th>Price</th>
    <th>Qty</th>
    <th>Line Price</th>
    <th>Remark</th>
    </tr></thead><tbody>`;
  let netSum = 0;
  tableRows.forEach(row => {
    html += '<tr>';
    row.forEach((cell, i) => {
      html += `<td>${cell !== undefined ? cell : ''}</td>`;
    });
    // 汇总Line Price（第6列）
    netSum += parseFloat(row[5]) || 0;
    html += '</tr>';
  });
  html += '</tbody></table>';
  return { html, netSum };
}
