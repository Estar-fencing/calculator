// installation-main.js

function getAllData() {
  const sizechooseData = JSON.parse(localStorage.getItem('sizechooseData') || '{}');
  const StylechooseData = JSON.parse(localStorage.getItem('StylechooseData') || '{}');
  const paramsData = JSON.parse(localStorage.getItem('paramsData') || '{}');
  let installationChooseData = JSON.parse(localStorage.getItem('installationChooseData') || '{}');
  Object.keys(installationChooseData).forEach(k=>{
    if(/Qty|Value|Height|height|Length/.test(k) && installationChooseData[k]!==null && installationChooseData[k]!=='') {
      installationChooseData[k]=Number(installationChooseData[k]);
    }
  });
  return { sizechooseData, StylechooseData, paramsData, installationChooseData };
}

// 垂直排列，每行一个按钮
function renderInstallBtns(data, sync, sizechooseData) {
  let btns = [
    {
      label: 'Fence',
      key: 'InstallationFence',
      qtyField: 'InstallationFenceQty',
      defaultQty: Number(sizechooseData.TotalFencePanelQty || 0),
      editable: false,
      extra: ''
    },
    {
      label: 'Small Gate',
      key: 'InstallationSmallGate',
      qtyField: 'InstallationSmallGateValue',
      defaultQty: Number(sizechooseData.SmallGateQty || 0),
      editable: false,
      extra: ''
    },
    {
      label: 'Sliding Gate',
      key: 'InstallationSlidingGate',
      qtyField: 'InstallationSlidingGateValue',
      defaultQty: Number(sizechooseData.SlidingGateQty || 0),
      editable: false,
      extra: ''
    },
    {
      label: 'Double Swing Gate',
      key: 'InstallationDoubleSwingGate',
      qtyField: 'InstallationDoubleSwingGateValue',
      defaultQty: Number(sizechooseData.DoubleSwingGateQty || 0),
      editable: false,
      extra: ''
    },
    {
      label: 'Track Road',
      key: 'TrackRoad',
      qtyField: 'TrackRoadValue',
      defaultQty: Number(sizechooseData.TotalSlidinggateLength || 0),
      editable: true,
      extra: 'Default: ' + Number(sizechooseData.TotalSlidinggateLength || 0)
    }
  ];
  let html = '';
  btns.forEach(btn => {
    let selected = !!data[btn.key];
    // 首4行：有内容就默认选，Track Road默认不选
    if (btn.key !== 'TrackRoad' && btn.defaultQty > 0 && typeof data[btn.key]==='undefined') selected = true;
    if (btn.key === 'TrackRoad' && typeof data[btn.key]==='undefined') selected = false;
    let val = typeof data[btn.qtyField] !== 'undefined' ? data[btn.qtyField] : btn.defaultQty;
  // 关键：Track Road未选时，localStorage也归零
  if (!selected) {
    val = 0;
    if (data[btn.qtyField] !== 0) {
      // 更新内存和localStorage
      data[btn.qtyField] = 0;
      localStorage.setItem('installationChooseData', JSON.stringify(data));
    }
  }
   html += `
      <div class="install-btn ${selected ? 'selected' : ''}" data-key="${btn.key}" data-qtyfield="${btn.qtyField}" data-editable="${btn.editable}">
        <label>${btn.label}</label>
        <div class="input-wrap" style="${selected?'':'display:none'}">
          <span>${btn.editable?'Installation Meter':'Installation Qty'}</span>
          <input type="number" min="0" step="1" id="${btn.qtyField}" ${btn.editable?'':'readonly'} value="${val}" style="width:68px;" ${btn.editable?'':'class="readonly"'}> 
          ${btn.extra && btn.editable ? `<span class="default-tag">${btn.extra}</span>` : ''}
        </div>
      </div>
    `;
  });
  document.getElementById('installationBtnGroup').innerHTML = html;
  // 事件
  document.querySelectorAll('.install-btn').forEach(btnDiv=>{
    btnDiv.onclick = function(e){
      if (e.target.tagName === 'INPUT') return;
      let key = btnDiv.dataset.key;
      let qtyfield = btnDiv.dataset.qtyfield;
      let editable = btnDiv.dataset.editable === 'true';
      let selected = !!data[key];
      sync(key, !selected);
      if (!selected) { // now checked
        sync(qtyfield, btns.find(b=>b.key===key).defaultQty);
      } else {
        sync(qtyfield, 0);
      }
      renderInstallBtns(data, sync, sizechooseData);
      const { StylechooseData, paramsData } = getAllData();
      renderAccessoriesSection(data, sync, sizechooseData, StylechooseData, paramsData);
    };
    let qtyfield = btnDiv.dataset.qtyfield;
    let input = document.getElementById(qtyfield);
    if (input && btnDiv.dataset.editable==='true') {
      input.onchange = input.oninput = function(){
        let v = Number(input.value) || 0;
        sync(qtyfield, v);
      }
    }
  });
}

// 本地存储数据同步
function setData(k,v,obj){
  obj[k]=v;
  localStorage.setItem('installationChooseData',JSON.stringify(obj));
}

// 默认值初始化
function getDefaultInstallationData(sizechooseData, StylechooseData, paramsData) {
  let d = {};
  d.InstallationFence = sizechooseData.TotalFencePanelQty>0;
  d.InstallationFenceQty = Number(sizechooseData.TotalFencePanelQty||0);

  d.InstallationSmallGate = sizechooseData.SmallGateQty>0; 
  d.InstallationSmallGateValue = Number(sizechooseData.SmallGateQty||0);

  d.InstallationSlidingGate = sizechooseData.SlidingGateQty>0; 
  d.InstallationSlidingGateValue = Number(sizechooseData.SlidingGateQty||0);

  d.InstallationDoubleSwingGate = sizechooseData.DoubleSwingGateQty>0; 
  d.InstallationDoubleSwingGateValue = Number(sizechooseData.DoubleSwingGateQty||0);

  // Track Road 默认不选
  d.TrackRoad = false; 
  d.TrackRoadValue = Number(sizechooseData.TotalSlidinggateLength||0);
  return d;
}

function renderAll() {
  const { sizechooseData, StylechooseData, paramsData, installationChooseData } = getAllData();
  function sync(k,v) {
    installationChooseData[k]=v;
    localStorage.setItem('installationChooseData',JSON.stringify(installationChooseData));
  }
  renderInstallBtns(installationChooseData, sync, sizechooseData);
  renderAccessoriesSection(installationChooseData, sync, sizechooseData, StylechooseData, paramsData);
}

document.getElementById('btnDefault').onclick = function() {
  const { sizechooseData, StylechooseData, paramsData } = getAllData();
  let def = getDefaultInstallationData(sizechooseData, StylechooseData, paramsData);
  localStorage.setItem('installationChooseData',JSON.stringify(def));
  renderAll();
};
document.getElementById('btnBack').onclick = function() {
  window.location.href='sizechoose.html';
};
document.getElementById('btnNext').onclick = function() {
  renderAll();
  window.location.href='CustomizeTable.html';
};
const { sizechooseData, StylechooseData, paramsData } = getAllData();
let def = getDefaultInstallationData(sizechooseData, StylechooseData, paramsData);
localStorage.setItem('installationChooseData', JSON.stringify(def));
renderAll();
