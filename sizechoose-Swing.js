// sizechoose-Swing.js
function fix1(n) {
  n = Math.round((Number(n)||0)*10)/10;
  return n.toFixed(1);
}

window.renderSwingSection = function(data, sync, sameHeight, HeightValueA){
  const section = document.getElementById('swingSection');
  let isActive = !!data.SwingActive;
  let maxRows = 5;
  let html = `
    <div class="section">
      <div class="flex-row">
        <button type="button" class="btn-toggle${isActive?' selected':''}" id="swingBtn">Click Add Double Swing gate size (m)</button>
      </div>`;
  if(isActive){
    let rows = data.swingRows||[{H:sameHeight?HeightValueA:1.5,L:2.4}];
    if(rows.length===0) rows=[{H:sameHeight?HeightValueA:1.5, L:2.4}];
    rows = rows.slice(0,maxRows);
    if(sameHeight){
      rows = rows.map(r => ({...r, H: HeightValueA}));
      sync('swingRows', rows);
    }
    html += rows.map((row,idx)=>{
      let H = row.H;
      let L = row.L ?? 2.4;
      return `
        <div class="flex-row" style="margin-bottom:5px;">
          <span>H</span>
          <input type="text" inputmode="decimal" class="input-num" data-row="${idx}" data-type="H" value="${H}" autocomplete="off">
          <span>L</span>
          <input type="text" inputmode="decimal" class="input-num" data-row="${idx}" data-type="L" value="${L}" autocomplete="off">
        </div>`;
    }).join('');
    html += `<div class="plusminus-row">
      <button type="button" class="pm-btn" id="swingAdd">+</button>
      <button type="button" class="pm-btn" id="swingRemove">-</button>
      <span style="color:#888; font-size:13px;">(max 5)</span>
    </div>`;
  }
  html += `</div>`;
  section.innerHTML = html;
  document.getElementById('swingBtn').onclick=()=>{
    if(isActive){
      sync('SwingActive',false);sync('swingRows',[]);sync('TotalDoubleSwingGateAreas',0);sync('DoubleSwingGateQty',0);
    }else{
      sync('SwingActive',true);sync('swingRows',[{H:sameHeight?HeightValueA:1.5,L:2.4}]);
    }
    window.renderSwingSection(data,sync,sameHeight,HeightValueA);
    window.renderSwingMotorSection(data,sync);
  };
  if(!isActive) {window.renderSwingMotorSection(data,sync);return;}
  document.getElementById('swingAdd').onclick=()=>{
    let rows=data.swingRows||[];
    if(rows.length<maxRows){
      rows.push({H:sameHeight?HeightValueA:1.5,L:2.4});
      sync('swingRows',rows);
      window.renderSwingSection(data,sync,sameHeight,HeightValueA);
      window.renderSwingMotorSection(data,sync);
    }
  };
  document.getElementById('swingRemove').onclick=()=>{
    let rows=data.swingRows||[];
    if(rows.length>1){
      rows.pop();
      sync('swingRows',rows);
      window.renderSwingSection(data,sync,sameHeight,HeightValueA);
      window.renderSwingMotorSection(data,sync);
    }
  };
  Array.from(section.querySelectorAll('.input-num')).forEach(inp=>{
    inp.oninput=function(){
      let idx=Number(this.dataset.row), typ=this.dataset.type, val=this.value.replace('。','.');
      let rows=data.swingRows||[];
      if(!rows[idx])rows[idx]={H:1.5,L:2.4};
      rows[idx][typ]=val;
      sync('swingRows',rows);
    };
    inp.onblur=function(){
      let idx=Number(this.dataset.row), typ=this.dataset.type, v=this.value.replace('。','.');
      if(typ==="H"){ v=Math.max(0,Math.min(3,parseFloat(v)||0)); }
      else{ v=Math.max(0,Math.min(10,parseFloat(v)||0)); }
      v=Number.isFinite(v)?fix1(v):'0.0';
      this.value=v;
      let rows=data.swingRows||[];
      if(!rows[idx])rows[idx]={H:1.5,L:2.4};
      rows[idx][typ]=v;
      sync('swingRows',rows);
      window.renderSwingSection(data,sync,sameHeight,HeightValueA);
      window.renderSwingMotorSection(data,sync);
    };
    inp.oncompositionend = inp.onblur;
  });
  // 计算
  let rows=data.swingRows||[],areaSum=0;
  rows.forEach(r=>areaSum+=((parseFloat(r.H)||0)*(parseFloat(r.L)||0)));
  sync('TotalDoubleSwingGateAreas',fix1(areaSum));
  sync('DoubleSwingGateQty',rows.length);
  window.renderSwingMotorSection(data,sync);
};
