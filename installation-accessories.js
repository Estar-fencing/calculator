// installation-accessories.js

function round2(n) { return (Math.round((+n)*100)/100 || 0).toString(); }

function renderAccessoriesSection(data, sync, sizechooseData, StylechooseData, paramsData) {
  let html = '';

// 2.1 Inground 65x65 Post
if (StylechooseData.InGroundPostType) {
  let defQty = Number(sizechooseData.TotalPostQty || 0) + Number(sizechooseData.SmallGateQty || 0);
  let curQty = typeof data.IngroundPostQty === 'number' ? data.IngroundPostQty : defQty;
  if (curQty < 0) curQty = 0;

  // 自动判断高度
let fenceHeight = Number(
  (sizechooseData.fenceRows && sizechooseData.fenceRows[0] && sizechooseData.fenceRows[0].H) || 0
);
let autoHeight = fenceHeight + 0.6;

  let heights = [1.8, 2.1, 2.4, 2.7];

  let getIngroundPostHeight = 2.7; // 默认最大
  if (autoHeight < 1.8) getIngroundPostHeight = 1.8;
  else if (autoHeight <= 2.1) getIngroundPostHeight = 2.1;
  else if (autoHeight <= 2.4) getIngroundPostHeight = 2.4;

  // 优先取已选高度（仅限有效值），否则用自动判断
  let userHeight = Number(data.Ingroundpostheight);
  let postHeight = heights.includes(userHeight) ? userHeight : getIngroundPostHeight;

  // 单价
  let postVal = paramsData.p18;
  if (postHeight === 2.1) postVal = paramsData.p21;
  else if (postHeight === 2.4) postVal = paramsData.p24;
  else if (postHeight === 2.7) postVal = paramsData.p27;

  // 同步
  sync('IngroundPostQty', curQty);
  sync('Ingroundpostheight', postHeight);
  sync('Ingroundpostvalue', postVal);

  html += `
    <div class="access-item">
      <span class="access-label">Inground 65x65 Post Qty:</span>
      <input type="number" min="0" step="1" id="IngroundPostQty" class="access-input" value="${curQty}">
      <span class="default-tag">Default: ${defQty}</span>
    </div>
    <div class="access-item">
      <span class="access-label" style="font-weight:400;">Inground Post Height:</span>
      <select id="Ingroundpostheight" class="select-height">
        ${heights.map(h=>`<option value="${h}" ${h===postHeight?'selected':''}>${h}m</option>`).join('')}
      </select>
      <span style="margin-left:14px;font-size:13px;color:#555;">Unit Price: $${postVal||0}/pc</span>
    </div>
  `;
} else {
  sync('IngroundPostQty', 0);
}


 // 2.2 Plate 65x65 Post
if (StylechooseData.PlatePostType) {
  let defQty = Number(sizechooseData.TotalPostQty || 0) + Number(sizechooseData.SmallGateQty || 0);
  let curQty = typeof data.PlatePostQty === 'number' ? data.PlatePostQty : defQty;
  if (curQty < 0) curQty = 0;

let height = 0;
if (Array.isArray(sizechooseData.fenceRows) && sizechooseData.fenceRows[0] && sizechooseData.fenceRows[0].H) {
  height = Number(sizechooseData.fenceRows[0].H);
}
  let getPlatepostHeight = 2.1;
  if (height < 1.3) getPlatepostHeight = 1.3;
  else if (height <= 1.6) getPlatepostHeight = 1.6;
  else if (height <= 1.9) getPlatepostHeight = 1.9;
  let heights = [1.3, 1.6, 1.9, 2.1];
  let postHeight = Number(data.PlatePostHeight) || getPlatepostHeight;
  if (!heights.includes(postHeight)) postHeight = getPlatepostHeight;

  let postVal = paramsData.pp21;
  if (postHeight === 1.3) postVal = paramsData.pp13;
  else if (postHeight === 1.6) postVal = paramsData.pp16;
  else if (postHeight === 1.9) postVal = paramsData.pp19;

  sync('PlatePostQty', curQty);
  sync('PlatePostHeight', postHeight);
  sync('PlatePostValue', postVal);

  html += `
    <div class="access-item">
      <span class="access-label">Plate 65x65 Post Qty:</span>
      <input type="number" min="0" step="1" id="PlatePostQty" class="access-input" value="${curQty}">
      <span class="default-tag">Default: ${defQty}</span>
    </div>
    <div class="access-item">
      <span class="access-label" style="font-weight:400;">Plate Post Height:</span>
      <select id="PlatePostHeight" class="select-height">
        ${heights.map(h=>`<option value="${h}" ${h===postHeight?'selected':''}>${h}m</option>`).join('')}
      </select>
      <span style="margin-left:14px;font-size:13px;color:#555;">Unit Price: $${postVal||0}/pc</span>
    </div>
  `;
} else {
  sync('PlatePostQty', 0);
}

  // 2.2a 升级大柱Inground
  if (StylechooseData.InGroundPostType) {
    let curQty = Number(data.bigIngroundPostQty) || 0;
    let baseVal = Number(data.Ingroundpostvalue) || 0;
    let upgradeVal = baseVal + 20;
    sync('bigIngroundPostQty', curQty);
    sync('bigIngroundPostValue', upgradeVal);
    html += `
      <div class="access-item">
        <span class="access-label">Upgrade Inground Post To 76x76 Qty:</span>
        <input type="number" min="0" step="1" id="bigIngroundPostQty" class="access-input" value="${curQty}">
        <span class="upgrade-note">+ $20/pc, If you choose upgrade, please delete all 65x65 post.</span>
      </div>
    `;
  } else {
    sync('bigIngroundPostQty', 0);
  }

  // 2.2b 升级大柱Plate
  if (StylechooseData.PlatePostType) {
    let curQty = Number(data.bigPlatePostQty) || 0;
    let baseVal = Number(data.PlatePostValue) || 0;
    let upgradeVal = baseVal + 20;
    sync('bigPlatePostQty', curQty);
    sync('bigPlatePostValue', upgradeVal);
    html += `
      <div class="access-item">
        <span class="access-label">Upgrade Plate Post To 76x76 Qty:</span>
        <input type="number" min="0" step="1" id="bigPlatePostQty" class="access-input" value="${curQty}">
        <span class="upgrade-note">+ $20/pc, If you choose upgrade, please delete all 65x65 post.</span>
      </div>
    `;
  } else {
    sync('bigPlatePostQty', 0);
  }

// 2.3 Bracket
if (sizechooseData.TotalFencePanelQty) {
    let defQty = StylechooseData.NeedBracket ? Number(sizechooseData.TotalFencePanelQty || 0) : 0;
    let curQty = typeof data.BracketQty === 'number' ? data.BracketQty : defQty;
    sync('BracketQty', curQty);
    html += `
      <div class="access-item" style="display:flex;align-items:center;gap:10px;">
        <span class="access-label">40x40 Bracket Qty:</span>
        <input type="number"
               min="0"
               step="1"
               id="BracketQty"
               class="access-input"
               value="${curQty}"
               oninput="this.value=this.value.replace(/[^\\d]/g,''); if(this.value==='')this.value=0;">
        <span style="margin-left:8px;color:#888;">Default: ${defQty}</span>
      </div>
    `;
} else {
    sync('BracketQty', 0);
}


  // 2.4 小门柱子
  if (StylechooseData.SmallgatePost) {
    let defQty = 2 * Number(sizechooseData.SmallGateQty||0);
    let curQty = typeof data.TotalSmallgatePostQty === 'number' ? data.TotalSmallgatePostQty : defQty;
    sync('TotalSmallgatePostQty', curQty);
    html += `
      <div class="access-item">
        <span class="access-label">65x65 Small Gate Post Qty:</span>
        <input type="number" min="0" step="1" id="TotalSmallgatePostQty" class="access-input" value="${curQty}">
        <span class="default-tag">Default: ${defQty}</span>
      </div>
    `;
  } else {
    sync('TotalSmallgatePostQty', 0);
  }

  // 2.5a Lock & Hinges type
  if (sizechooseData.SmallGateQty > 0) {
    let locktype = data.Locktype || 'Handle Lock';
    sync('Locktype', locktype);
    html += `
      <div class="access-item">
        <span class="access-label">Lock & Hinges Type:</span>
        <button type="button" class="locktype-btn${locktype==='Handle Lock'?' selected':''}" data-lock="Handle Lock">Handle Lock</button>
        <button type="button" class="locktype-btn${locktype==='Pin Code Lock'?' selected':''}" data-lock="Pin Code Lock">Pin Code Lock</button>
      </div>
    `;
  } else {
    sync('Locktype', 'Handle Lock');
  }

  // 2.5b Lock & Hinges Qty
  if (sizechooseData.SmallGateQty > 0) {
    let qty = typeof data.LockAndHingesQty === 'number' ? data.LockAndHingesQty : Number(sizechooseData.SmallGateQty||1);
    sync('LockAndHingesQty', qty);
    html += `
      <div class="access-item">
        <span class="access-label">Lock & Hinge Qty:</span>
        <input type="number" min="0" step="1" id="LockAndHingesQty" class="access-input" value="${qty}">
        <span class="default-tag">Default: ${sizechooseData.SmallGateQty||1}</span>
      </div>
    `;
  } else {
    sync('LockAndHingesQty', 0);
  }

  // 2.6 Gate kits & U-Post
  if (sizechooseData.SlidingGateQty > 0) {
    let defQty = Number(sizechooseData.SlidingGateQty||1);
    let curQty = typeof data.GatekitsUPostQty === 'number' ? data.GatekitsUPostQty : defQty;
    sync('GatekitsUPostQty', curQty);
    html += `
      <div class="access-item">
        <span class="access-label">Gate kits & U-Post Qty:</span>
        <input type="number" min="0" step="1" id="GatekitsUPostQty" class="access-input" value="${curQty}">
        <span class="default-tag">Default: ${defQty}</span>
      </div>
    `;
  } else {
    sync('GatekitsUPostQty', 0);
  }

  // 2.7 Steel Track
  if (sizechooseData.SlidingGateQty > 0) {
    let defQty = Math.round(Number(sizechooseData.TotalSlidinggateLength||1) * 2);
    let curQty = typeof data.SteelTrackQty === 'number' ? data.SteelTrackQty : defQty;
    sync('SteelTrackQty', curQty);
    html += `
      <div class="access-item">
        <span class="access-label">Steel Track Qty:</span>
        <input type="number" min="0" step="1" id="SteelTrackQty" class="access-input" value="${curQty}">
        <span class="default-tag">Default: ${defQty}</span>
      </div>
    `;
  } else {
    sync('SteelTrackQty', 0);
  }

  // 2.8 Heavy Duty Hinge
  if (sizechooseData.DoubleSwingGateQty > 0) {
    let defQty = Number(sizechooseData.DoubleSwingGateQty||1);
    let curQty = typeof data.HeavydutyHingesQty === 'number' ? data.HeavydutyHingesQty : defQty;
    sync('HeavydutyHingesQty', curQty);
    html += `
      <div class="access-item">
        <span class="access-label">Heavy Duty Hinge Qty:</span>
        <input type="number" min="0" step="1" id="HeavydutyHingesQty" class="access-input" value="${curQty}">
        <span class="default-tag">Default: ${defQty}</span>
      </div>
    `;
  } else {
    sync('HeavydutyHingesQty', 0);
  }

// 2.8a Extra Remote Qty 
if (sizechooseData.SlidingGateQty > 0) {
    let defQty = 0;
    let curQty = typeof data.ExtraRemoteQty === 'number' ? data.ExtraRemoteQty : defQty;
    sync('ExtraRemoteQty', curQty);
    html += `
      <div class="access-item" style="display:flex;align-items:center;gap:10px;">
        <span class="access-label">Extra Remote Qty:</span>
        <input type="number" 
               min="0" 
               step="1" 
               id="ExtraRemoteQty" 
               class="access-input" 
               value="${curQty}" 
               oninput="this.value=this.value.replace(/[^\\d]/g,''); if(this.value==='')this.value=0;">
        <span style="margin-left:8px;color:#888;">Two Remotes Inside Package</span>
      </div>
    `;
} else {
    sync('ExtraRemoteQty', 0);
}

// 2.9a Wireless Keypad Qty: 
if (sizechooseData.SlidingGateQty > 0) {
    let defQty = 0;
    let curQty = typeof data.WirelessKeypadQty === 'number' ? data.WirelessKeypadQty : defQty;
    sync('WirelessKeypadQty', curQty);
    html += `
      <div class="access-item" style="display:flex;align-items:center;gap:10px;">
        <span class="access-label">Wireless Keypad Qty:</span>
        <input type="number" 
               min="0" 
               step="1" 
               id="WirelessKeypadQty" 
               class="access-input" 
               value="${curQty}" 
               oninput="this.value=this.value.replace(/[^\\d]/g,''); if(this.value==='')this.value=0;">
        <span style="margin-left:8px;color:#888;">Default: 0</span>
      </div>
    `;
} else {
    sync('WirelessKeypadQty', 0);
}

// 2.9c Mail Box Qty: 
if (sizechooseData.SlidingGateQty > 0) {
    let defQty = 0;
    let curQty = typeof data.MailBoxQty === 'number' ? data.MailBoxQty : defQty;
    sync('MailBoxQty', curQty);
    html += `
      <div class="access-item" style="display:flex;align-items:center;gap:10px;">
        <span class="access-label">Mail Box Qty:</span>
        <input type="number" 
               min="0" 
               step="1" 
               id="MailBoxQty" 
               class="access-input" 
               value="${curQty}" 
               oninput="this.value=this.value.replace(/[^\\d]/g,''); if(this.value==='')this.value=0;">
        <span style="margin-left:8px;color:#888;">Default: 0</span>
      </div>
    `;
} else {
    sync('MailBoxQty', 0);
}

  // 2.9 Powder Coating
  if (StylechooseData.ColorValue) {
    let qty = Number(sizechooseData.Totalfenceareas || 0)
            + Number(sizechooseData.totalsmallgateareas || 0)
            + Number(sizechooseData.TotalSlidinggateAreas || 0)
            + Number(sizechooseData.TotalDoubleSwingGateAreas || 0);
    sync('powdercaotingQty', qty);
    html += `
      <div class="access-item">
        <span class="access-label">Powder Coating Square Meter:</span>
        <input type="number" class="access-input readonly" style="width:60px;" value="${qty}" readonly>
      </div>
    `;
  } else {
    sync('powdercaotingQty', 0);
  }

  document.getElementById('accessoriesSection').innerHTML = html;

  // 锁类型按钮事件
  let btns = document.querySelectorAll('.locktype-btn');
  btns.forEach(btn => {
    btn.onclick = function() {
      sync('Locktype', btn.dataset.lock);
      renderAccessoriesSection(data, sync, sizechooseData, StylechooseData, paramsData);
    };
  });

  // 优化输入：输入时只存值，不整体刷新；只有select（下拉）变动才全局刷新
  [
    'IngroundPostQty','Ingroundpostheight','PlatePostQty','PlatePostHeight','bigIngroundPostQty','bigPlatePostQty',
    'BracketQty','TotalSmallgatePostQty','LockAndHingesQty','GatekitsUPostQty','SteelTrackQty','HeavydutyHingesQty','ExtraRemoteQty','WirelessKeypadQty','MailBoxQty'
  ].forEach(field => {
    let el = document.getElementById(field);
    if (el) {
      el.oninput = function() {
        let v = el.type === 'number' ? Number(el.value) : el.value;
        sync(field, v);
      };
      el.onchange = function() {
        let v = el.type === 'number' ? Number(el.value) : el.value;
        sync(field, v);
        if (el.tagName === "SELECT") {
          renderAccessoriesSection(data, sync, sizechooseData, StylechooseData, paramsData);
        }
      };
    }
  });
}
