// sizechoose-fence.js
function fix1(n) {
  n = Math.round((Number(n)||0)*10)/10;
  return n.toFixed(1);
}

window.renderFenceSection = function (data, sync, sameHeight, HeightValueA) {
  const section = document.getElementById('fenceSection');
  let isActive = !!data.FenceActive;
  let maxRows = 30;
  let html = `
    <div class="section">
      <div class="flex-row">
        <button type="button" class="btn-toggle${isActive ? ' selected' : ''}" id="fenceBtn">Click Add Fence size (m)</button>
      </div>`;
  if (isActive) {
    html += `<div style="margin-top:10px;">`;
    let fenceRows = data.fenceRows || [{H: sameHeight ? HeightValueA : 1.2, L:2.4}];
    if (fenceRows.length === 0) fenceRows = [{H: sameHeight ? HeightValueA : 1.2, L:2.4}];
    fenceRows = fenceRows.slice(0, maxRows);
    if(sameHeight){
      fenceRows = fenceRows.map(r => ({...r, H: HeightValueA}));
      sync('fenceRows', fenceRows);
    }
    html += fenceRows.map((row, idx) => {
      let H = row.H;
      let L = row.L ?? 2.4;
      return `
        <div class="flex-row" style="margin-bottom:5px;">
          <span>H</span>
          <input type="text" inputmode="decimal" pattern="[0-9.]*" class="input-num" data-row="${idx}" data-type="H" value="${H}" autocomplete="off">
          <span>L</span>
          <input type="text" inputmode="decimal" pattern="[0-9.]*" class="input-num" data-row="${idx}" data-type="L" value="${L}" autocomplete="off">
        </div>
      `;
    }).join('');
    html += `
      <div class="plusminus-row">
        <button type="button" class="pm-btn" id="fenceAdd">+</button>
        <button type="button" class="pm-btn" id="fenceRemove">-</button>
        <span style="color:#888; font-size:13px;">(max 30)</span>
      </div>
    </div>`;
  }
  html += `</div>`;
  section.innerHTML = html;

  // Fence按钮
  document.getElementById('fenceBtn').onclick = () => {
    if (isActive) {
      sync('FenceActive', false);
      sync('fenceRows', []);
      sync('Totalfenceareas', 0);
      sync('TotalFencePanelQty', 0);
      sync('TotalPostQty', 0);
    } else {
      sync('FenceActive', true);
      sync('fenceRows', [{H: sameHeight ? HeightValueA : 1.2, L:2.4}]);
    }
    window.renderFenceSection(data, sync, sameHeight, HeightValueA);
  };

  if (!isActive) return;

  // + -
  document.getElementById('fenceAdd').onclick = () => {
    let rows = data.fenceRows || [];
    if (rows.length < maxRows) {
      rows.push({H: sameHeight ? HeightValueA : 1.2, L:2.4});
      sync('fenceRows', rows);
      window.renderFenceSection(data, sync, sameHeight, HeightValueA);
    }
  };
  document.getElementById('fenceRemove').onclick = () => {
    let rows = data.fenceRows || [];
    if (rows.length > 1) {
      rows.pop();
      sync('fenceRows', rows);
      window.renderFenceSection(data, sync, sameHeight, HeightValueA);
    }
  };

  // 输入行
  Array.from(section.querySelectorAll('.input-num')).forEach(inp=>{
    inp.oninput = function(){
      let idx = Number(this.dataset.row);
      let typ = this.dataset.type;
      let val = this.value.replace('。','.');
      let rows = data.fenceRows || [];
      if (!rows[idx]) rows[idx]={H:1.2,L:2.4};
      rows[idx][typ]=val;
      sync('fenceRows', rows);
    };
    inp.onblur = function(){
      let idx = Number(this.dataset.row);
      let typ = this.dataset.type;
      let v = this.value.replace('。','.');
      if(typ==="H") {
        v = Math.max(0,Math.min(3, parseFloat(v)||0));
      } else {
        v = Math.max(0,Math.min(200, parseFloat(v)||0));
      }
      v = Number.isFinite(v) ? fix1(v) : '0.0';
      this.value = v;
      let rows = data.fenceRows || [];
      if (!rows[idx]) rows[idx]={H:1.2,L:2.4};
      rows[idx][typ]=v;
      sync('fenceRows', rows);
      window.renderFenceSection(data, sync, sameHeight, HeightValueA); // 强制刷新
    };
    inp.oncompositionend = inp.onblur; // 支持中文输入法
  });

  // 计算
  let rows = data.fenceRows || [];
  let panelQtySum = 0, postQtySum = 0, areaSum2 = 0;
  rows.forEach(r=>{
    let H = parseFloat(r.H) || 0, L = parseFloat(r.L) || 0;
    let panels = Math.ceil(L/2.4);
    panelQtySum += panels;
    postQtySum += panels+1;
    areaSum2 += (H*L);
  });
  sync('Totalfenceareas', fix1(areaSum2));
  sync('TotalFencePanelQty', panelQtySum); // 整数
  sync('TotalPostQty', postQtySum);        // 整数
};
