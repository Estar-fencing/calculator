// sizechoose-Small.js
function fix1(n) {
  n = Math.round((Number(n)||0)*10)/10;
  return n.toFixed(1);
}

window.renderSmallgateSection = function(data, sync, sameHeight, HeightValueA){
  const section = document.getElementById('smallgateSection');
  let isActive = !!data.SmallgateActive;
  let maxRows = 5;
  let html = `
    <div class="section">
      <div class="flex-row">
        <button type="button" class="btn-toggle${isActive?' selected':''}" id="smallgateBtn">Click Add Small gate size (m)</button>
      </div>`;
  if(isActive){
    let rows = data.smallgateRows||[{H:sameHeight?HeightValueA:1.5, L:1.0}];
    if(rows.length===0) rows=[{H:sameHeight?HeightValueA:1.5, L:1.0}];
    rows = rows.slice(0,maxRows);
    if(sameHeight){
      rows = rows.map(r => ({...r, H: HeightValueA}));
      sync('smallgateRows', rows);
    }
    html += rows.map((row,idx)=>{
      let H = row.H;
      let L = row.L ?? 1.0;
      return `
        <div class="flex-row" style="margin-bottom:5px;">
          <span>H</span>
          <input type="text" inputmode="decimal" class="input-num" data-row="${idx}" data-type="H" value="${H}" autocomplete="off">
          <span>L</span>
          <input type="text" inputmode="decimal" class="input-num" data-row="${idx}" data-type="L" value="${L}" autocomplete="off">
        </div>`;
    }).join('');
    html += `<div class="plusminus-row">
      <button type="button" class="pm-btn" id="smallAdd">+</button>
      <button type="button" class="pm-btn" id="smallRemove">-</button>
      <span style="color:#888; font-size:13px;">(max 5)</span>
    </div>`;
  }
  html += `</div>`;
  section.innerHTML = html;
  document.getElementById('smallgateBtn').onclick=()=>{
    if(isActive){
      sync('SmallgateActive',false);sync('smallgateRows',[]);sync('totalsmallgateareas',0);sync('SmallGateQty',0);
    }else{
      sync('SmallgateActive',true);sync('smallgateRows',[{H:sameHeight?HeightValueA:1.5,L:1.0}]);
    }
    window.renderSmallgateSection(data,sync,sameHeight,HeightValueA);
  };
  if(!isActive) return;
  document.getElementById('smallAdd').onclick=()=>{
    let rows=data.smallgateRows||[];
    if(rows.length<maxRows){
      rows.push({H:sameHeight?HeightValueA:1.5,L:1.0});
      sync('smallgateRows',rows);
      window.renderSmallgateSection(data,sync,sameHeight,HeightValueA);
    }
  };
  document.getElementById('smallRemove').onclick=()=>{
    let rows=data.smallgateRows||[];
    if(rows.length>1){
      rows.pop();
      sync('smallgateRows',rows);
      window.renderSmallgateSection(data,sync,sameHeight,HeightValueA);
    }
  };
  Array.from(section.querySelectorAll('.input-num')).forEach(inp=>{
    inp.oninput=function(){
      let idx=Number(this.dataset.row), typ=this.dataset.type, val=this.value.replace('。','.');
      let rows=data.smallgateRows||[];
      if(!rows[idx])rows[idx]={H:1.5,L:1.0};
      rows[idx][typ]=val;
      sync('smallgateRows',rows);
    };
    inp.onblur=function(){
      let idx=Number(this.dataset.row), typ=this.dataset.type, v=this.value.replace('。','.');
      if(typ==="H"){ v=Math.max(0,Math.min(3,parseFloat(v)||0)); }
      else{ v=Math.max(0,Math.min(2,parseFloat(v)||0)); }
      v=Number.isFinite(v)?fix1(v):'0.0';
      this.value=v;
      let rows=data.smallgateRows||[];
      if(!rows[idx])rows[idx]={H:1.5,L:1.0};
      rows[idx][typ]=v;
      sync('smallgateRows',rows);
      window.renderSmallgateSection(data,sync,sameHeight,HeightValueA);
    };
    inp.oncompositionend = inp.onblur;
  });
  // 总结算
  let rows=data.smallgateRows||[], areaSum=0;
console.log('rows:', rows);
  rows.forEach(r=>areaSum+=((parseFloat(r.H)||0)*(parseFloat(r.L)||0)));
console.log('areaSum:', areaSum);
  sync('totalsmallgateareas',fix1(areaSum));
console.log('totalsmallgateareas set to:', fix1(areaSum));
  sync('SmallGateQty',rows.length);
};
