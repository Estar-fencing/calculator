(function(){
    function saveData() {
        localStorage.setItem('poolsizechooseData', JSON.stringify(window.poolsizechooseData));
    }

    function renderStep2() {
        let d = window.poolsizechooseData, pd = window.paramsData, sd = window.StylechooseData;

        // 计算基础数据
        let totalFencePanel = (d.poolFencePanel||[]).reduce((a,b)=>a+Number(b||0),0);
        let lines = (d.poolFenceLengthList||[]).filter(x=>x!=="").length;
        let totalPost = totalFencePanel+lines;
        let totalSmallGate = Number(d.poolSmallGateQty||0);
        let PoolFenceHeight = Number(d.PoolFenceHeightValue||1.2);

        // 面积
        let totalFenceArea = totalFencePanel*PoolFenceHeight*2.4;
        let totalSmallGateArea = totalSmallGate*PoolFenceHeight*0.975;
        d.TotalpoolFencePanel = totalFencePanel;
        d.TotalpoolPostQty = totalPost;
        d.Totalpoolfenceareas = totalFenceArea;
        d.totalpoolsmallgateareas = totalSmallGateArea;

        // Inground/Plate显示与否，隐藏即归零
        let showInground = sd.InGroundPostType && sd.InGroundPostType!=="";
        let showPlate = sd.PlatePostType && sd.PlatePostType!=="";
        if (!showInground) {
            d.PoolingroundPostQty = 0;
            d.PoolingroundPostHeight = 0;
        }
        if (!showPlate) {
            d.PoolPlatePostQty = 0;
            d.PoolPlatePostHeight = 0;
        }

        // 柱子高度和单价
        let PoolingroundPostHeight = PoolFenceHeight+0.6;
        if(PoolingroundPostHeight < 1.8) PoolingroundPostHeight=1.8;
        else if(PoolingroundPostHeight<=2.1) PoolingroundPostHeight=2.1;
        else if(PoolingroundPostHeight<=2.4) PoolingroundPostHeight=2.4;
        else PoolingroundPostHeight=2.7;
        let PoolingroundPostValue = PoolingroundPostHeight===1.8?pd.po18:
                                    PoolingroundPostHeight===2.1?pd.po21:
                                    PoolingroundPostHeight===2.4?pd.po24:
                                    pd.po27;

        let PoolPlatePostHeight = PoolFenceHeight;
        if(PoolPlatePostHeight<1.3) PoolPlatePostHeight=1.3;
        else if(PoolPlatePostHeight<=1.6) PoolPlatePostHeight=1.6;
        else if(PoolPlatePostHeight<=1.9) PoolPlatePostHeight=1.9;
        else PoolPlatePostHeight=2.1;
        let PoolPlatePostValue = PoolPlatePostHeight===1.3?pd.ppo13:
                                PoolPlatePostHeight===1.6?pd.ppo16:
                                PoolPlatePostHeight===1.9?pd.ppo19:
                                pd.ppo21;

        // Cap Type
        if (!d.poolpostcapType) { d.poolpostcapType = "Plastic Cap"; d.poolpostcapValue = pd.cap1; }
        let capType = d.poolpostcapType;
        let capVal = capType==="Plastic Cap"?pd.cap1:pd.cap2;

        // 推荐值联动（结构变化时会覆盖输入框并同步到数据）
        let ingroundQty = showInground ? (totalPost) : 0;
        let plateQty = showPlate ? (totalPost) : 0;
        let smallgatepostQty = totalSmallGate;

        // 所有推荐值
d.PoolPlatePostQty = plateQty;
d.PoolingroundPostQty = ingroundQty;
d.poolSmallgatePostQty = smallgatepostQty;
let capQty = d.PoolPlatePostQty + d.PoolingroundPostQty + d.poolSmallgatePostQty;
d.poolpostcapQty = capQty;
        let footQty = capQty;
        let bracketQty = totalFencePanel;
        let smallgatelockQty = totalSmallGate;
        let smallgateHingeQty = totalSmallGate;
        let powderShow = sd.ColorValue&&sd.ColorValue!=="";
        let powderCaotingQty = (totalFenceArea+totalSmallGateArea).toFixed(1);

        // ------------- 配件同步：强制写入数据对象，每次渲染都保存推荐值 -------------
        d.PoolingroundPostQty = ingroundQty;
        d.PoolingroundPostHeight = PoolingroundPostHeight;
        d.PoolingroundPostValue = PoolingroundPostValue;
        d.PoolPlatePostQty = plateQty;
        d.PoolPlatePostHeight = PoolPlatePostHeight;
        d.PlatePostvalue = PoolPlatePostValue;
        d.poolSmallgatePostQty = smallgatepostQty;
        d.poolSmallgatePostHeight = (showInground?PoolingroundPostHeight:PoolPlatePostHeight)+0.3; // 推荐小门柱高度
        d.poolSmallgatePostValue = (showInground?PoolingroundPostValue:PoolPlatePostValue)+(showInground?pd.v5:pd.v10); // 推荐小门柱单价
        d.poolpostcapType = capType;
        d.poolpostcapValue = capVal;
        d.poolpostcapQty = capQty;
        d.poolFootCoverQty = footQty;
        d.poolBracketQty = bracketQty;
        d.poolSmallgatelockQty = smallgatelockQty;
        d.poolSmallgateHingeQty = smallgateHingeQty;
        d.poolpowdercaotingQty = powderCaotingQty;
// ==== 加在这里 ====
if (typeof window.calcInstall === 'function') window.calcInstall();
if (typeof window.renderMain === 'function') window.renderMain();
// ==== 到这里 ====
        saveData();

        // ------------ 渲染界面 ------------
        let html = `<h2 class="step-label">4. Accessories and Others</h2>
        <div class="section">`;

        // 4.1 Inground Post
        html += `<div class="${showInground?'':'hidden'} input-row">
            <label>Inground Post Qty:</label>
            <input type="number" min="0" step="1" value="${ingroundQty}" id="PoolingroundPostQty" class="qty"/>
            <label style="margin-left:25px;">Inground Post Height:</label>
            <select id="PoolingroundPostHeight">
                <option value="1.8" ${PoolingroundPostHeight===1.8?'selected':''}>1.8m</option>
                <option value="2.1" ${PoolingroundPostHeight===2.1?'selected':''}>2.1m</option>
                <option value="2.4" ${PoolingroundPostHeight===2.4?'selected':''}>2.4m</option>
                <option value="2.7" ${PoolingroundPostHeight===2.7?'selected':''}>2.7m</option>
            </select>
        </div>`;

        // 4.2 Plate Post
        html += `<div class="${showPlate?'':'hidden'} input-row">
            <label>Plate Post Qty:</label>
            <input type="number" min="0" step="1" value="${plateQty}" id="PoolPlatePostQty" class="qty"/>
            <label style="margin-left:25px;">Plate Post Height:</label>
            <select id="PoolPlatePostHeight">
                <option value="1.3" ${PoolPlatePostHeight===1.3?'selected':''}>1.3m</option>
                <option value="1.6" ${PoolPlatePostHeight===1.6?'selected':''}>1.6m</option>
                <option value="1.9" ${PoolPlatePostHeight===1.9?'selected':''}>1.9m</option>
                <option value="2.1" ${PoolPlatePostHeight===2.1?'selected':''}>2.1m</option>
            </select>
        </div>`;

        // 4.3 Cap Type
        html += `<div class="input-row">
            <label>Cap Type:</label>
            <button id="capPlastic" class="btn btn-outline${capType==='Plastic Cap'?' btn-selected':''}">Plastic Cap</button>
            <button id="capAluminum" class="btn btn-outline${capType==='Aluminum Cap'?' btn-selected':''}">Aluminum Cap</button>
        </div>`;

        // 4.4 Cap Qty
        html += `<div class="input-row">
            <label>Cap Qty:</label>
            <input type="number" min="0" step="1" value="${capQty}" id="poolpostcapQty" class="qty"/>
        </div>`;

        // 4.5 Foot Cover Qty
        html += `<div class="input-row">
            <label>Foot Cover Qty:</label>
            <input type="number" min="0" step="1" value="${footQty}" id="poolFootCoverQty" class="qty"/>
        </div>`;

        // 4.6 Bracket
        html += `<div class="input-row">
            <label>38x25 Bracket Qty:</label>
            <input type="number" min="0" step="1" value="${bracketQty}" id="poolBracketQty" class="qty"/>
        </div>`;

        // 4.7 小门柱
        html += `<div class="${totalSmallGate>0?'':'hidden'} input-row">
            <label>50x50 Small Gate Post Qty:</label>
            <input type="number" min="0" step="1" value="${smallgatepostQty}" id="poolSmallgatePostQty" class="qty"/>
        </div>`;
        // 4.8 Lock
        html += `<div class="${totalSmallGate>0?'':'hidden'} input-row">
            <label>Small Gate Lock Qty:</label>
            <input type="number" min="0" step="1" value="${smallgatelockQty}" id="poolSmallgatelockQty" class="qty"/>
        </div>`;
        // 4.9 Hinge
        html += `<div class="${totalSmallGate>0?'':'hidden'} input-row">
            <label>Small Gate Hinge Qty:</label>
            <input type="number" min="0" step="1" value="${smallgateHingeQty}" id="poolSmallgateHingeQty" class="qty"/>
        </div>`;

        // 4.10 Powder Coating
        html += `<div class="${powderShow?'':'hidden'} input-row">
            <label>Powder Coating Square Meter:</label>
            <input type="number" value="${powderCaotingQty}" id="poolpowdercaotingQty" class="qty" readonly style="width:70px;"/>
        </div>`;

        html += "</div>";
        document.getElementById('poolstep2').innerHTML = html;

        // 事件绑定：输入框变化时同步到数据
        if(showInground) {
            document.getElementById('PoolingroundPostQty').oninput = function(){
                d.PoolingroundPostQty = Math.max(0, parseInt(this.value)||0); saveData();
            }
            document.getElementById('PoolingroundPostHeight').onchange = function(){
                d.PoolingroundPostHeight = parseFloat(this.value);
                d.PoolingroundPostValue = d.PoolingroundPostHeight===1.8?pd.po18:
                                         d.PoolingroundPostHeight===2.1?pd.po21:
                                         d.PoolingroundPostHeight===2.4?pd.po24:pd.po27;
                saveData(); renderStep2();
    if (typeof window.calcInstall === 'function') window.calcInstall(); // <<== 加这句
            }
        }
        if(showPlate) {
            document.getElementById('PoolPlatePostQty').oninput = function(){
                d.PoolPlatePostQty = Math.max(0, parseInt(this.value)||0); saveData();
            }
            document.getElementById('PoolPlatePostHeight').onchange = function(){
                d.PoolPlatePostHeight = parseFloat(this.value);
                d.PoolPlatePostValue = d.PoolPlatePostHeight===1.3?pd.ppo13:
                                      d.PoolPlatePostHeight===1.6?pd.ppo16:
                                      d.PoolPlatePostHeight===1.9?pd.ppo19:pd.ppo21;
                saveData(); renderStep2();
            }
        }
        document.getElementById('capPlastic').onclick = function(){
            d.poolpostcapType = "Plastic Cap"; d.poolpostcapValue = pd.cap1; saveData(); renderStep2();
        }
        document.getElementById('capAluminum').onclick = function(){
            d.poolpostcapType = "Aluminum Cap"; d.poolpostcapValue = pd.cap2; saveData(); renderStep2();
        }
        document.getElementById('poolpostcapQty').oninput = function(){
            d.poolpostcapQty = Math.max(0, parseInt(this.value)||0); saveData();
        }
        document.getElementById('poolFootCoverQty').oninput = function(){
            d.poolFootCoverQty = Math.max(0, parseInt(this.value)||0); saveData();
        }
        document.getElementById('poolBracketQty').oninput = function(){
            d.poolBracketQty = Math.max(0, parseInt(this.value)||0); saveData();
        }
        if(totalSmallGate>0){
            document.getElementById('poolSmallgatePostQty').oninput = function(){
                d.poolSmallgatePostQty = Math.max(0, parseInt(this.value)||0); saveData();
            }
            document.getElementById('poolSmallgatelockQty').oninput = function(){
                d.poolSmallgatelockQty = Math.max(0, parseInt(this.value)||0); saveData();
            }
            document.getElementById('poolSmallgateHingeQty').oninput = function(){
                d.poolSmallgateHingeQty = Math.max(0, parseInt(this.value)||0); saveData();
            }
        }

        // -------- Custom Product Table 内容同步到 poolsizechooseData ----------
        for(let i=1;i<=10;i++){
            d[`poolLine${i}Name`] = localStorage.getItem(`poolLine${i}Name`)||"";
            d[`poolLine${i}Desc`] = localStorage.getItem(`poolLine${i}Desc`)||"";
            d[`poolLine${i}Price`] = localStorage.getItem(`poolLine${i}Price`)||"";
            d[`poolLine${i}Qty`] = localStorage.getItem(`poolLine${i}Qty`)||"";
            d[`poolLine${i}Remark`] = localStorage.getItem(`poolLine${i}Remark`)||"";
        }
        saveData();
    }
    window.renderStep2 = renderStep2;
    document.addEventListener("DOMContentLoaded", renderStep2);
})();
