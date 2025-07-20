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

window.renderStyleSection = function(){
  let data = stylechooseDataLoad();
  let selectedPic = data.selectedPic||'';
  let html = `<div class="subtitle">2. Fence Style</div>
    <div class="flex-row" style="flex-wrap:wrap;gap:16px 15px;">`;
  fenceStyles.forEach(fs=>{
    let sel = selectedPic===fs.pic ? ' selected':'';
    html += `<button class="style-btn${sel}" id="stylebtn-${fs.pic}">
      <img src="${fs.pic}"><span>${fs.label}</span>
    </button>`;
  });
  html += `</div>`;

  // Gap
  let selectedFS = fenceStyles.find(f=>f.pic===selectedPic)||{};
  if(['H-Slats.jpg','V-Slats.jpg'].includes(selectedPic)){
  // 如果未选过gap，则默认存为1
 

 if(!('GapValue' in data) || data.GapValue === undefined || data.GapValue === null || data.GapValue === '') {
    stylechooseDataSave('GapValue', 1);
    data.GapValue = 1;
  }
else {
  // Gap 下拉隐藏时，强制 GapValue=1
  stylechooseDataSave('GapValue', 1);
}
    html += `<div style="margin-top:18px;">
      <span style="font-size:17px;font-weight:600;">Gap (mm)</span>
      <select class="gap-select" id="gapSelect">`;
    gapOptions.forEach(opt=>{
      let sel = (data.GapValue==opt.value || (!data.GapValue&&opt.value==1))?'selected':'';
      html += `<option value="${opt.value}" ${sel}>${opt.label}</option>`;
    });
    html += `</select></div>`;
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
     // 这里加！！！
    if (!['H-Slats.jpg', 'V-Slats.jpg'].includes(fs.pic)) {
      stylechooseDataSave('GapValue', 1);
    }

     window.renderStyleSection(); window.renderColorSection();
    };
  });

  if(document.getElementById('gapSelect')){
    document.getElementById('gapSelect').onchange = function(){
      stylechooseDataSave('GapValue', this.value);
    };
  }
}

window.renderStyleSection();
