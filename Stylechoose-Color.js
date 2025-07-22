// Stylechoose-Color.js
window.renderColorSection = function(){
  let data = stylechooseDataLoad();
  let colortype = data.Colortype||'';
  let isCustom = colortype && !['Black','Monument','White','Customize'].includes(colortype);

  let html = `<div class="subtitle">4. Color</div>
    <div class="color-row" style="align-items: center;">`;

  // Black
  html += `<button class="color-btn black${colortype==='Black'?' selected':''}" id="colBtn-black">Black</button>`;

  // Monument
  html += `<button class="color-btn monument${colortype==='Monument'?' selected':''}" id="colBtn-monument">Monument</button>`;

  // White
  html += `<button class="color-btn white${colortype==='White'?' selected':''}" id="colBtn-white">White
      <span class="extra">extra $45/SM</span>
    </button>`;

  // Customize（自定义），按钮内只有标签，选中时输入框在按钮右侧外部
  html += `<button class="color-btn customize${(colortype==='Customize'||isCustom)?' selected':''}" id="colBtn-customize">
      <span class="cust-label">${isCustom ? colortype : 'Customize'}</span>
      <span class="extra">extra $45/SM</span>
    </button>`;

  // 输入框外置
  if(colortype==='Customize' || isCustom){
    html += `<input type="text" class="custom-input" id="custInput"
        style="margin-left:10px; width:90px; border-radius:7px; font-size:15px; border:1px solid #bbb; height:32px;vertical-align: middle;"
        placeholder="Custom Color" value="${isCustom ? colortype : ''}">`;
  }
  html += `</div>`;
  document.getElementById('colorSection').innerHTML = html;

  // 黑
  document.getElementById('colBtn-black').onclick=function(){
    stylechooseDataSave('ColorValue',0); stylechooseDataSave('Colortype','Black');
    window.renderColorSection();
  };
  // Monument
  document.getElementById('colBtn-monument').onclick=function(){
    stylechooseDataSave('ColorValue',0); stylechooseDataSave('Colortype','Monument');
    window.renderColorSection();
  };
  // White
  document.getElementById('colBtn-white').onclick=function(){
    stylechooseDataSave('ColorValue',window.paramsData.pc1||45);
    stylechooseDataSave('Colortype','White');
    window.renderColorSection();
  };
  // Customize
  document.getElementById('colBtn-customize').onclick=function(e){
    stylechooseDataSave('ColorValue',window.paramsData.pc1||45);
    stylechooseDataSave('Colortype','Customize');
    window.renderColorSection();
    setTimeout(()=>{
      let input = document.getElementById('custInput');
      if(input){
        input.focus();
        input.oninput = function(ev){
          stylechooseDataSave('Colortype', this.value||'Customize');
          // 实时更改按钮标签但不重渲染
          document.querySelector('#colBtn-customize .cust-label').textContent = this.value||'Customize';
        };
      }
    }, 10);
    e.stopPropagation();
  };

  // 输入框事件（用于页面已渲染有输入框时：如刷新页面后直接编辑）
  if(document.getElementById('custInput')){
    document.getElementById('custInput').oninput = function(){
      stylechooseDataSave('Colortype', this.value||'Customize');
      document.querySelector('#colBtn-customize .cust-label').textContent = this.value||'Customize';
    };
  }
}

// --- 底部按钮
document.getElementById('btnDefault').onclick = ()=>{
  localStorage.setItem('StylechooseData','{}');
  window.renderInstallationSection(); window.renderStyleSection(); window.renderColorSection();
};
document.getElementById('btnBack').onclick = ()=>{
  location.href = "params.html";
};
document.getElementById('btnNext').onclick = ()=>{
  let d = stylechooseDataLoad();
  if(d.FenceStyleType==='Pool Fencing') location.href="poolsizechoose.html";
  else location.href="sizechoose.html";
};

window.renderColorSection();
