// Stylechoose-Installation.js
window.paramsData = JSON.parse(localStorage.getItem('paramsData')||'{}');

function stylechooseDataLoad(){
  let d = JSON.parse(localStorage.getItem('StylechooseData')||'{}');
  return d;
}
function stylechooseDataSave(k, v){
  let d = stylechooseDataLoad(); d[k] = v;
  localStorage.setItem('StylechooseData', JSON.stringify(d));
}
window.stylechooseData = stylechooseDataLoad();

window.renderInstallationSection = function(){
  let data = stylechooseDataLoad();
  let selected = (data.InGroundPostType||0) ? 'post' : (data.PlatePostType||0) ? 'plate' : (data.SmallgatePost||0) ? 'no' : '';
  let html = `
    <div class="subtitle">1. Installation Style</div>
    <div class="flex-row" style="gap:32px;margin-bottom:10px;">
      <button class="img-btn${selected==='post'?' selected':''}" id="btn-post">
        <img src="postfence.jpg"><span>InGround Post</span>
      </button>
      <button class="img-btn${selected==='plate'?' selected':''}" id="btn-plate">
        <img src="platefence.jpg"><span>Plate Post</span>
      </button>
      <button class="img-btn${selected==='no'?' selected':''}" id="btn-no">
        <img src="insetfence.jpg"><span>No Post</span>
      </button>
    </div>`;
  document.getElementById('installationSection').innerHTML = html;

  document.getElementById('btn-post').onclick = ()=>{
    stylechooseDataSave('InstallationStyleValue', window.paramsData.I1||120);
    stylechooseDataSave('InGroundPostType',1); stylechooseDataSave('PlatePostType',0); stylechooseDataSave('SmallgatePost',0);
    window.renderInstallationSection(); window.renderStyleSection(); window.renderColorSection();
  }
  document.getElementById('btn-plate').onclick = ()=>{
    stylechooseDataSave('InstallationStyleValue', window.paramsData.I2||120);
    stylechooseDataSave('InGroundPostType',0); stylechooseDataSave('PlatePostType',1); stylechooseDataSave('SmallgatePost',0);
    window.renderInstallationSection(); window.renderStyleSection(); window.renderColorSection();
  }
  document.getElementById('btn-no').onclick = ()=>{
    stylechooseDataSave('InstallationStyleValue', window.paramsData.I3||60);
    stylechooseDataSave('InGroundPostType',0); stylechooseDataSave('PlatePostType',0); stylechooseDataSave('SmallgatePost',1);
    window.renderInstallationSection(); window.renderStyleSection(); window.renderColorSection();
  }
}

window.renderInstallationSection();
