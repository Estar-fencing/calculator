(function(){
    // 全局参数
    window.poolsizechooseData = JSON.parse(localStorage.getItem('poolsizechooseData')||'{}');
    window.paramsData = JSON.parse(localStorage.getItem('paramsData')||'{}');
    window.StylechooseData = JSON.parse(localStorage.getItem('StylechooseData')||'{}');

    function saveData() {
        localStorage.setItem('poolsizechooseData', JSON.stringify(window.poolsizechooseData));
    }

    function renderStep1() {
        let d = window.poolsizechooseData;

    // --------- 新增：Pool Fencing Height 默认同步 ---------
    if (!d.PoolFenceHeightValue) {
        d.PoolFenceHeightValue = "1.2";
        d.poolFenceValue = paramsData.pf12;
        saveData();
    }
    // --------- 以下原内容不变 ---------

        let step1Html = `<h2 class="step-label">1. Pool Fencing Height</h2>
        <div class="section">
            <label>Pool Fencing Height: </label>
            <select id="PoolFenceHeightSelect">
                <option value="1.2" ${d.PoolFenceHeightValue==="1.2"?"selected":""}>1.2m</option>
                <option value="1.5" ${d.PoolFenceHeightValue==="1.5"?"selected":""}>1.5m</option>
                <option value="1.8" ${d.PoolFenceHeightValue==="1.8"?"selected":""}>1.8m</option>
            </select>
        </div>

        <h2 class="step-label">2. Pool Fence Length</h2>
        <div class="section">
            <button id="btnAddPoolFence" class="btn btn-outline${d.poolFenceActive ? ' btn-selected' : ''}">Click Add Pool Fence length (m)</button>
            <div id="poolFenceInputs" class="mt6"></div>
        </div>
        <h2 class="step-label">3. Pool Small Gate</h2>
        <div class="section">
            <button id="btnAddSmallGate" class="btn btn-outline${d.poolSmallGateActive ? ' btn-selected' : ''}">Click Add 975mmL Small gate Qty</button>
            <div id="poolSmallGateInput" class="mt6"></div>
        </div>`;
        document.getElementById('poolstep1').innerHTML = step1Html;

        // 高度选择
        document.getElementById('PoolFenceHeightSelect').onchange = function(e){
            d.PoolFenceHeightValue = this.value;
            if(this.value==="1.2") d.poolFenceValue = paramsData.pf12;
            if(this.value==="1.5") d.poolFenceValue = paramsData.pf15;
            if(this.value==="1.8") d.poolFenceValue = paramsData.pf18;
            saveData(); 
            renderStep2 && renderStep2();
        };

        document.getElementById('btnAddPoolFence').onclick = function(){
            d.poolFenceActive = !d.poolFenceActive;
            if(!d.poolFenceActive) {
                d.poolFenceLengthList = [];
                d.poolFencePanel = [];
            }
            saveData(); renderStep1(); renderStep2 && renderStep2();
        };

        document.getElementById('btnAddSmallGate').onclick = function(){
            d.poolSmallGateActive = !d.poolSmallGateActive;
            if(!d.poolSmallGateActive) {
                d.poolSmallGateQty = 0;
            }
            saveData(); renderStep1(); renderStep2 && renderStep2();
        };

        renderFenceInputs();
        renderSmallGateInput();
    }

    function renderFenceInputs() {
    let d = window.poolsizechooseData;
    let el = document.getElementById('poolFenceInputs');
    if(!d.poolFenceActive) { el.innerHTML = ""; return; }
    let arr = d.poolFenceLengthList || [];
    if(!arr.length) arr = [""];
    let html = "";
    for(let i=0;i<arr.length;i++) {
        let val = arr[i]||"";
        let qty = d.poolFencePanel && typeof d.poolFencePanel[i] !== "undefined" ? d.poolFencePanel[i] : 0;
        html += `<div class="input-row" data-index="${i}">
            <label>Length ${i+1} (0~200):</label>
            <input type="number" min="0" max="200" step="0.1" value="${val}" class="fencelengthinput" data-idx="${i}" style="width:95px;"/>
            <span>Panel Qty: <b id="panelQty${i}">${qty}</b></span>
        </div>`;
    }
    html += `<div class="flex">
        <button id="fenceRowAdd" class="btn table-btn btn-main" ${arr.length>=20?'disabled':''}>+</button>
        <button id="fenceRowRemove" class="btn table-btn btn-default" ${arr.length<=1?'disabled':''}>-</button>
    </div>`;
    el.innerHTML = html;

    // Fence输入框输入时，实时更新Panel Qty和配件区域
    let inps = el.querySelectorAll('.fencelengthinput');
    inps.forEach((inp)=>{
        inp.oninput = function() {
            let idx = Number(this.getAttribute('data-idx'));
            let v = Math.max(0, Math.min(200, Number(inp.value)||0));
            d.poolFenceLengthList = d.poolFenceLengthList||[];
            d.poolFenceLengthList[idx]=v;
            d.poolFencePanel = d.poolFencePanel||[];
            d.poolFencePanel[idx]=Math.ceil(v/2.4);

if (typeof window.calcInstall === 'function') window.calcInstall();
if (typeof window.renderMain === 'function') window.renderMain();

            saveData();

            // 只更新Panel Qty文本
            let qtySpan = document.getElementById("panelQty"+idx);
            if(qtySpan) qtySpan.textContent = d.poolFencePanel[idx];

            // Fence长度变了，配件区域和数量联动刷新
            if(window.renderStep2) renderStep2();
        };
    });

    // 加减行等结构变动
    document.getElementById('fenceRowAdd').onclick = function(){
        d.poolFenceLengthList = d.poolFenceLengthList||[];
        d.poolFencePanel = d.poolFencePanel||[];
        if(d.poolFenceLengthList.length<20){
            d.poolFenceLengthList.push("");
            d.poolFencePanel.push(0);
        }

if (typeof window.calcInstall === 'function') window.calcInstall();
if (typeof window.renderMain === 'function') window.renderMain();

        saveData();

        renderFenceInputs();
        if(window.renderStep2) renderStep2();
    };
    document.getElementById('fenceRowRemove').onclick = function(){
        if((d.poolFenceLengthList||[]).length>1){
            d.poolFenceLengthList.pop();
            d.poolFencePanel.pop();
        }
        saveData();
if (typeof window.calcInstall === 'function') window.calcInstall();
if (typeof window.renderMain === 'function') window.renderMain(); 
       renderFenceInputs();
        if(window.renderStep2) renderStep2();
    };
}


    function renderSmallGateInput(){
        let d = window.poolsizechooseData;
        let el = document.getElementById('poolSmallGateInput');
        if(!d.poolSmallGateActive) { el.innerHTML = ""; return; }
        let val = d.poolSmallGateQty||0;
        el.innerHTML = `<div class="input-row">
            <label>Small Gate Qty:</label>
            <input type="number" min="0" max="20" step="1" value="${val}" id="smallGateQtyInput" class="qty"/>
        </div>`;

        if(!window._poolSmallGateInputTimer) window._poolSmallGateInputTimer = null;

        document.getElementById('smallGateQtyInput').oninput = function(){
            let v = Math.max(0, Math.min(20, parseInt(this.value)||0));
            d.poolSmallGateQty = v;
            saveData();
if (typeof window.calcInstall === 'function') window.calcInstall();
if (typeof window.renderMain === 'function') window.renderMain(); 
           clearTimeout(window._poolSmallGateInputTimer);
            window._poolSmallGateInputTimer = setTimeout(function(){
                renderStep2 && renderStep2();
            }, 500);
        }
    }

    window.renderStep1 = renderStep1;
    document.addEventListener("DOMContentLoaded", renderStep1);
})();
