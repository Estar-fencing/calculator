// sizechoose-main.js

function getData(){
  let d=JSON.parse(localStorage.getItem('sizechooseData')||'{}');
  return d;
}
function setData(k,v){
  let d=getData();d[k]=v;localStorage.setItem('sizechooseData',JSON.stringify(d));
}
function sync(k,v){setData(k,v);Object.assign(window.sizechooseData,getData());}

window.sizechooseData=getData();

function renderHeightSection(data,sync){
  let dom=document.getElementById('heightSection');
  let useSame=!!data.SameHeightActive;
  let diff=!useSame;
  let HeightValueA=data.HeightValueA||1.8;
  dom.innerHTML=`
  <div class="section">
    <div class="subtitle">1. Height for fence and gates</div>
    <div class="flex-row">
      <button type="button" class="btn-toggle${useSame?' selected':''}" id="sameBtn">Same Height (m)</button>
      <input type="text" inputmode="decimal" class="input-num" id="HeightValueA" style="margin-left:8px;${useSame?'':'display:none'}" value="${HeightValueA}">
      <button type="button" class="btn-toggle${!useSame?' selected':''}" id="diffBtn">Different Height (m)</button>
    </div>
  </div>
  `;
  document.getElementById('sameBtn').onclick=()=>{
    sync('SameHeightActive',true);
    renderHeightSection(window.sizechooseData,sync);
    window.renderFenceSection(window.sizechooseData,sync,true,window.sizechooseData.HeightValueA||1.8);
    window.renderSmallgateSection(window.sizechooseData,sync,true,window.sizechooseData.HeightValueA||1.8);
    window.renderSlidingSection(window.sizechooseData,sync,true,window.sizechooseData.HeightValueA||1.8);
    window.renderSwingSection(window.sizechooseData,sync,true,window.sizechooseData.HeightValueA||1.8);
  };
  document.getElementById('diffBtn').onclick=()=>{
    sync('SameHeightActive',false);
    renderHeightSection(window.sizechooseData,sync);
    window.renderFenceSection(window.sizechooseData,sync,false,window.sizechooseData.HeightValueA||1.8);
    window.renderSmallgateSection(window.sizechooseData,sync,false,window.sizechooseData.HeightValueA||1.8);
    window.renderSlidingSection(window.sizechooseData,sync,false,window.sizechooseData.HeightValueA||1.8);
    window.renderSwingSection(window.sizechooseData,sync,false,window.sizechooseData.HeightValueA||1.8);
  };
  let inp=document.getElementById('HeightValueA');
  if(inp){
    inp.oninput=function(){
      let v=this.value.replace('。','.');
      sync('HeightValueA',v);
      window.renderFenceSection(window.sizechooseData,sync,true,v);
      window.renderSmallgateSection(window.sizechooseData,sync,true,v);
      window.renderSlidingSection(window.sizechooseData,sync,true,v);
      window.renderSwingSection(window.sizechooseData,sync,true,v);
    };
    inp.onblur=function(){
      let v=parseFloat(this.value.replace('。','.'));
      v=Math.max(0,Math.min(3,v||0));
      v=Number.isFinite(v)?v.toFixed(2).replace(/\.00$/,''):'0';
      this.value=v;sync('HeightValueA',v);
      window.renderFenceSection(window.sizechooseData,sync,true,v);
      window.renderSmallgateSection(window.sizechooseData,sync,true,v);
      window.renderSlidingSection(window.sizechooseData,sync,true,v);
      window.renderSwingSection(window.sizechooseData,sync,true,v);
    };
    inp.oncompositionend = inp.onblur;
  }
}

window.renderSlidingMotorSection=function(data,sync){
  const section = document.getElementById('slidingMotorSection');
  if(!data.SlidingActive){sync('SlidingGateMotorQty',0);section.innerHTML='';return;}
  const paramsData=JSON.parse(localStorage.getItem('paramsData')||'{}');
  let selected=data.SlidingGateMotorType||'';
  let slidingGateQty=data.SlidingGateQty||0;
  let html=`
  <div class="section">
    <div class="motor-row">
      <span class="motor-label">Sliding Gate Motor</span>
      <button type="button" class="motor-btn${selected==='240V Motor'?' selected':''}" id="mtr1">240V Motor</button>
      <button type="button" class="motor-btn${selected==='Solar Motor'?' selected':''}" id="mtr2">Solar Motor</button>
      <button type="button" class="motor-btn${selected==='No Motor'?' selected':''}" id="mtr3">No Motor</button>
    </div>
  </div>
  `;
  section.innerHTML=html;
  document.getElementById('mtr1').onclick=function(){
    sync('SlidingGateMotorValue',paramsData.moi1||0);
    sync('SlidingGateMotorType','240V Motor');
    sync('InstallationSlidingMotortype','Auto Gate Installation');
    sync('InstallationSlidingMotorValue',paramsData.ai1||0);
    sync('SlidingGateMotorQty',slidingGateQty);
    window.renderSlidingMotorSection(window.sizechooseData,sync);
  };
  document.getElementById('mtr2').onclick=function(){
    sync('SlidingGateMotorValue',paramsData.smoi1||0);
    sync('SlidingGateMotorType','Solar Motor');
    sync('InstallationSlidingMotortype','Auto Gate Installation');
    sync('InstallationSlidingMotorValue',paramsData.ai1||0);
    sync('SlidingGateMotorQty',slidingGateQty);
    window.renderSlidingMotorSection(window.sizechooseData,sync);
  };
  document.getElementById('mtr3').onclick=function(){
    sync('SlidingGateMotorValue',0);
    sync('SlidingGateMotorType','No Motor');
    sync('InstallationSlidingMotortype','Manual Gate Installation');
    sync('InstallationSlidingMotorValue',paramsData.mi1||0);
    sync('SlidingGateMotorQty',0);
    window.renderSlidingMotorSection(window.sizechooseData,sync);
  };
};

window.renderSwingMotorSection=function(data,sync){
  const section = document.getElementById('swingMotorSection');
  if(!data.SwingActive){sync('SwingarmMotorQty',0);section.innerHTML='';return;}
  const paramsData=JSON.parse(localStorage.getItem('paramsData')||'{}');
  let selected=data.SwingarmMotorType||'';
  let qty=data.DoubleSwingGateQty||0;
  let html=`
  <div class="section">
    <div class="motor-row">
      <span class="motor-label">Swing-arm Motor</span>
      <button type="button" class="motor-btn${selected==='240V Arm Motor'?' selected':''}" id="swm1">240V Arm Motor</button>
      <button type="button" class="motor-btn${selected==='Solar Arm Motor'?' selected':''}" id="swm2">Solar Arm Motor</button>
      <button type="button" class="motor-btn${selected==='No Motor'?' selected':''}" id="swm3">No Motor</button>
    </div>
  </div>
  `;
  section.innerHTML=html;
  document.getElementById('swm1').onclick=function(){
    sync('SwingarmMotorValue',paramsData.am1||0);
    sync('SwingarmMotorType','240V Arm Motor');
    sync('InstallationArmMotortype','Auto Gate Installation');
    sync('InstallationArmMotorValue',paramsData.ai1||0);
    sync('SwingarmMotorQty',qty);
    window.renderSwingMotorSection(window.sizechooseData,sync);
  };
  document.getElementById('swm2').onclick=function(){
    sync('SwingarmMotorValue',paramsData.sam1||0);
    sync('SwingarmMotorType','Solar Arm Motor');
    sync('InstallationArmMotortype','Auto Gate Installation');
    sync('InstallationArmMotorValue',paramsData.ai1||0);
    sync('SwingarmMotorQty',qty);
    window.renderSwingMotorSection(window.sizechooseData,sync);
  };
  document.getElementById('swm3').onclick=function(){
    sync('SwingarmMotorValue',0);
    sync('SwingarmMotorType','No Motor');
    sync('InstallationArmMotortype','Manual Gate Installation');
    sync('InstallationArmMotorValue',paramsData.mi1||0);
    sync('SwingarmMotorQty',0);
    window.renderSwingMotorSection(window.sizechooseData,sync);
  };
};

function renderAll(){
  window.sizechooseData=getData();
  let data=window.sizechooseData;
  let same=data.SameHeightActive;
  let H=data.HeightValueA||1.8;
  renderHeightSection(data,sync);
  window.renderFenceSection(data,sync,same,H);
  window.renderSmallgateSection(data,sync,same,H);
  window.renderSlidingSection(data,sync,same,H);
  window.renderSwingSection(data,sync,same,H);
  window.renderSlidingMotorSection(data,sync);
  window.renderSwingMotorSection(data,sync);
}
document.getElementById('btnDefault').onclick=()=>{
  localStorage.setItem('sizechooseData','{}');renderAll();
};
document.getElementById('btnBack').onclick=()=>{
  renderAll();
  window.location.href='Stylechoose.html';
};
document.getElementById('btnNext').onclick=()=>{
  renderAll();
  window.location.href='installationChoose.html';
};
renderAll();
