// sizechoose-Sliding.js
function fix1(n) {
  n = Math.round((Number(n)||0)*10)/10;
  return n.toFixed(1);
}

window.renderSlidingSection = function(data, sync, sameHeight, HeightValueA){
  const section = document.getElementById('slidingSection');
  let isActive = !!data.SlidingActive;
  let maxRows = 5;
  let html = `
    <div class="section">
      <div class="flex-row">
        <button type="button" class="btn-toggle${isActive?' selected':''}" id="slidingBtn">Click Add Sliding gate size (m)</button>
      </div>`;
  if(isActive){
    let rows = data.slidingRows||[{H:sameHeight?HeightValueA:1.5, L:3.0}];
    if(rows.length===0) rows=[{H:sameHeight?HeightValueA:1.5, L:3.0}];
    rows = rows.slice(0,maxRows);
    if(sameHeight){
      rows = rows.map(r => ({...r, H: HeightValueA}));
      sync('slidingRows', rows);
    }
    html += rows.map((row,idx)=>{
      let H = row.H;
      let L = row.L ?? 3.0;
      return `
        <div class="flex-row" style="margin-bottom:5px;">
          <span>H</span>
          <input type="text" inputmode="decimal" class="input-num" data-row="${idx}" data-type="H" value="${H}" autocomplete="off">
          <span>L</span>
          <input type="text" inputmode="decimal" class="input-num" data-row="${idx}" data-type="L" value="${L}" autocomplete="off">
          <span class="openlen-txt">${L>0?`The Opening Length is ${fix1(Math.max(0, (parseFloat(L)||0)-0.4))}`:''}</span>
        </div>`;
    }).join('');
    html += `<div class="plusminus-row">
      <button type="button" class="pm-btn" id="slidingAdd">+</button>
      <button type="button" class="pm-btn" id="slidingRemove">-</button>
      <span style="color:#888; font-size:13px;">(max 5)</span>
    </div>`;
  }
  html += `</div>`;
  section.innerHTML = html;
  document.getElementById('slidingBtn').onclick=()=>{
    if(isActive){
      sync('SlidingActive',false);sync('slidingRows',[]);sync('TotalSlidinggateAreas',0);sync('SlidingGateQty',0);sync('TotalSlidinggateLength',0);
    }else{
      sync('SlidingActive',true);sync('slidingRows',[{H:sameHeight?HeightValueA:1.5,L:3.0}]);
    }
    window.renderSlidingSection(data,sync,sameHeight,HeightValueA);
    window.renderSlidingMotorSection(data,sync);
  };
  if(!isActive) {window.renderSlidingMotorSection(data,sync);return;}
  document.getElementById('slidingAdd').onclick=()=>{
    let rows=data.slidingRows||[];
    if(rows.length<maxRows){
      rows.push({H:sameHeight?HeightValueA:1.5,L:3.0});
      sync('slidingRows',rows);
      window.renderSlidingSection(data,sync,sameHeight,HeightValueA);
      window.renderSlidingMotorSection(data,sync);
    }
  };
  document.getElementById('slidingRemove').onclick=()=>{
    let rows=data.slidingRows||[];
    if(rows.length>1){
      rows.pop();
      sync('slidingRows',rows);
      window.renderSlidingSection(data,sync,sameHeight,HeightValueA);
      window.renderSlidingMotorSection(data,sync);
    }
  };
  Array.from(section.querySelectorAll('.input-num')).forEach(inp=>{
    inp.oninput=function(){
      let idx=Number(this.dataset.row), typ=this.dataset.type, val=this.value.replace('。','.');
      let rows=data.slidingRows||[];
      if(!rows[idx])rows[idx]={H:1.5,L:3.0};
      rows[idx][typ]=val;
      sync('slidingRows',rows);
    };
    inp.onblur=function(){
      let idx=Number(this.dataset.row), typ=this.dataset.type, v=this.value.replace('。','.');
      if(typ==="H"){ v=Math.max(0,Math.min(3,parseFloat(v)||0)); }
      else{ v=Math.max(0,Math.min(10,parseFloat(v)||0)); }
      v=Number.isFinite(v)?fix1(v):'0.0';
      this.value=v;
      let rows=data.slidingRows||[];
      if(!rows[idx])rows[idx]={H:1.5,L:3.0};
      rows[idx][typ]=v;
      sync('slidingRows',rows);
      window.renderSlidingSection(data,sync,sameHeight,HeightValueA);
      window.renderSlidingMotorSection(data,sync);
    };
    inp.oncompositionend = inp.onblur;
  });
  // 计算
 let rows = data.slidingRows || [], areaSum = 0, lenSum = 0;
rows.forEach(r => {
  areaSum += (parseFloat(r.H)||0) * (parseFloat(r.L)||0);
  lenSum += (parseFloat(r.L)||0);
});
sync('TotalSlidinggateAreas', fix1(areaSum));
sync('SlidingGateQty', rows.length);
sync('TotalSlidinggateLength', fix1(lenSum));
  window.renderSlidingMotorSection(data,sync);
};
