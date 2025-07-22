// Stylechoose-Style.js
const fenceStyles = [
  { key: 'Poolfence.jpg', label: 'Pool Fence', type:'Pool Fencing', valKey:'fp', extra: {Need38Bracket:1}, pic:'Poolfence.jpg' },
  { key: 'H-Slats.jpg', label: 'H-Slats', type:'Horizontal Slats Fence', valKey:'f1', extra: {FenceStyleTypename:'Horizontal Slats'}, pic:'H-Slats.jpg' },
  { key: 'V-Slats.jpg', label: 'V-Slats', type:'Vertical Slats Fence', valKey:'f2', extra: {FenceStyleTypename:'Vertical Slats'}, pic:'V-Slats.jpg' },
  { key: 'Blade.jpg', label: 'Blade', type:'Blade Fence', valKey:'f3', extra: {NeedBracket:1,FenceStyleTypename:'Blade'}, pic:'Blade.jpg' },
  { key: 'Batten.jpg', label: 'Batten', type:'Batten Fence', valKey:'f4', extra: {NeedBracket:1,FenceStyleTypename:'Batten'}, pic:'Batten.jpg' },
  { key: 'Picket.jpg', label: 'Picket', type:'Picket Fence', valKey:'f5', extra: {NeedBracket:1,FenceStyleTypename:'Picket'}, pic:'Picket.jpg' },
  { key: 'Louver.jpg', label: 'Louver', type:'Louver Fence', valKey:'f6', extra: {NeedBracket:1,FenceStyleTypename:'Louver'}, pic:'Louver.jpg' },
  { key: '45Blade.jpg', label: '45 Blade', type:'45 Blade Fence', valKey:'f6', extra: {FenceStyleTypename:'45 Blade'}, pic:'45Blade.jpg' }
];

const gapOptions = [
  {label:'0–5mm', value:1.2},
  {label:'5–10mm', value:1.1},
  {label:'10–15mm', value:1},
  {label:'15–25mm', value:0.95},
  {label:'25–35mm', value:0.9},
  {label:'35–50mm', value:0.85},
  {label:'50mm+', value:0.8},
];
// Gap 选项专用
const gapOptions_Blade = [
  {label:'40mm', value:1.2},
  {label:'60mm', value:1} // 默认选中
];
const gapOptions_Batten = [
  {label:'20mm', value:1.2},
  {label:'40mm', value:1} // 默认选中
];

window.renderStyleSection = function(){
  let data = stylechooseDataLoad();
  let selectedPic = data.selectedPic||'';
  let html = `<div class="subtitle">2. Fence Style</div>
    <div class="style-grid">`;
  fenceStyles.forEach(fs=>{
    let sel = selectedPic===fs.pic ? ' selected':'';
    html += `<button class="style-btn${sel}" id="stylebtn-${fs.pic}">
      <img src="${fs.pic}"><span>${fs.label}</span>
    </button>`;
  });
  html += `</div>`;

  // 3a. H/V-Slats gap options
  const gapOptions_HV = [
    { label: '0mm',        value: 1.2, gaptype: 'No gap' },
    { label: '5–10mm',     value: 1.1, gaptype: '5–10mm gap' },
    { label: '10–15mm',    value: 1,   gaptype: '10–15mm gap' }, // 默认
    { label: '15–25mm',    value: 0.98,gaptype: '15–25mm gap' },
    { label: '25–35mm',    value: 0.95,gaptype: '25–35mm gap' },
    { label: '35–50mm',    value: 0.92,gaptype: '35–50mm gap' },
    { label: '50mm+',      value: 0.90,gaptype: '50mm+ gap' }
  ];
  // 3b. Blade
  const gapOptions_Blade = [
     { label: '60mm', value: 1,   gaptype: '60mm gap' }, // 默认
   { label: '40mm', value: 1.2, gaptype: '40mm gap' }
  ];
  // 3c. Batten
  const gapOptions_Batten = [
     { label: '40mm', value: 1,   gaptype: '40mm gap' }, // 默认
   { label: '20mm', value: 1.2, gaptype: '20mm gap' }
  ];

  // Horizontal/Vertical Slat
  if(['H-Slats.jpg','V-Slats.jpg'].includes(selectedPic)){
    // 获取当前 GapValue，若无则设为1（默认10–15mm gap）
    let curVal = (typeof data.GapValue !== 'undefined') ? Number(data.GapValue) : 1;
    // 找到当前选项
    let curOpt = gapOptions_HV.find(opt => opt.value === curVal) || gapOptions_HV[2];
    // 若无 gaptype 或值不对，强制设为默认
    if (!('GapValue' in data) || data.GapValue === undefined || data.GapValue === null || data.GapValue === '') {
      stylechooseDataSave('GapValue', 1);
      stylechooseDataSave('gaptype', '10–15mm gap');
      curVal = 1;
    } else if (!('gaptype' in data) || data.gaptype !== curOpt.gaptype) {
      stylechooseDataSave('gaptype', curOpt.gaptype);
    }
    html += `<div style="margin-top:18px;">
      <span style="font-size:17px;font-weight:600;">Gap (mm)</span>
      <select class="gap-select" id="gapSelect">`;
    gapOptions_HV.forEach(opt=>{
      let sel = (curVal==opt.value)?'selected':'';
      html += `<option value="${opt.value}" data-gaptype="${opt.gaptype}" ${sel}>${opt.label}</option>`;
    });
    html += `</select></div>`;
  }
  // Blade
  else if(selectedPic === 'Blade.jpg'){
    let curVal = (typeof data.GapValue !== 'undefined') ? Number(data.GapValue) : 1;
    let curOpt = gapOptions_Blade.find(opt => opt.value === curVal) || gapOptions_Blade[1];
    if (!('GapValue' in data) || data.GapValue === undefined || data.GapValue === null || data.GapValue === '') {
      stylechooseDataSave('GapValue', 1);
      stylechooseDataSave('gaptype', '60mm gap');
      curVal = 1;
    } else if (!('gaptype' in data) || data.gaptype !== curOpt.gaptype) {
      stylechooseDataSave('gaptype', curOpt.gaptype);
    }
    html += `<div style="margin-top:18px;">
      <span style="font-size:17px;font-weight:600;">Gap Between Blades (mm)</span>
      <select class="gap-select" id="gapSelect">`;
    gapOptions_Blade.forEach(opt=>{
      let sel = (curVal==opt.value)?'selected':'';
      html += `<option value="${opt.value}" data-gaptype="${opt.gaptype}" ${sel}>${opt.label}</option>`;
    });
    html += `</select></div>`;
  }
  // Batten
  else if(selectedPic === 'Batten.jpg'){
    let curVal = (typeof data.GapValue !== 'undefined') ? Number(data.GapValue) : 1;
    let curOpt = gapOptions_Batten.find(opt => opt.value === curVal) || gapOptions_Batten[1];
    if (!('GapValue' in data) || data.GapValue === undefined || data.GapValue === null || data.GapValue === '') {
      stylechooseDataSave('GapValue', 1);
      stylechooseDataSave('gaptype', '40mm gap');
      curVal = 1;
    } else if (!('gaptype' in data) || data.gaptype !== curOpt.gaptype) {
      stylechooseDataSave('gaptype', curOpt.gaptype);
    }
    html += `<div style="margin-top:18px;">
      <span style="font-size:17px;font-weight:600;">Gap Between Batten (mm)</span>
      <select class="gap-select" id="gapSelect">`;
    gapOptions_Batten.forEach(opt=>{
      let sel = (curVal==opt.value)?'selected':'';
      html += `<option value="${opt.value}" data-gaptype="${opt.gaptype}" ${sel}>${opt.label}</option>`;
    });
    html += `</select></div>`;
  }
  // Picket
  else if(selectedPic === 'Picket.jpg'){
    html += `<div style="margin-top:18px;font-size:17px;font-weight:600;">Gap Between Pickets is 15mm</div>`;
  }

  document.getElementById('styleSection').innerHTML = html;

  fenceStyles.forEach(fs=>{
    document.getElementById(`stylebtn-${fs.pic}`).onclick = ()=>{
      stylechooseDataSave('FenceStyleValue', window.paramsData[fs.valKey]||0);
      stylechooseDataSave('FenceStyleType', fs.type);
      stylechooseDataSave('FenceStyleTypename', fs.extra.FenceStyleTypename||'');
      stylechooseDataSave('selectedPic', fs.pic);
      if(fs.extra.NeedBracket) stylechooseDataSave('NeedBracket', fs.extra.NeedBracket);
      else stylechooseDataSave('NeedBracket', 0);
      if(fs.extra.Need38Bracket) stylechooseDataSave('Need38Bracket', fs.extra.Need38Bracket);
      else stylechooseDataSave('Need38Bracket', 0);
      // 只在 H/V/Blade/Batten 时保存对应 GapValue, 其他时恢复默认
      if (!['H-Slats.jpg', 'V-Slats.jpg','Blade.jpg','Batten.jpg'].includes(fs.pic)) {
        stylechooseDataSave('GapValue', 1);
        stylechooseDataSave('gaptype', '');
      }
      window.renderStyleSection(); window.renderColorSection();
    };
  });

  if(document.getElementById('gapSelect')){
    document.getElementById('gapSelect').onchange = function(){
      let val = Number(this.value);
      let opt = this.selectedOptions[0];
      let gaptype = opt.getAttribute('data-gaptype') || '';
      stylechooseDataSave('GapValue', val);
      stylechooseDataSave('gaptype', gaptype);
    };
  }
}

window.renderStyleSection();
