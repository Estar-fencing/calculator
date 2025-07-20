(function(){
    function saveData() {
        localStorage.setItem('poolsizechooseData', JSON.stringify(window.poolsizechooseData));
    }
    function renderMain(){
        let d = window.poolsizechooseData, pd = window.paramsData;
    if (typeof window.calcInstall === 'function') window.calcInstall();
        // 6. 安装选择
        let installHtml = `<h2 class="step-label">6. Installation</h2>
        <div class="section">
            <button id="installYes" class="btn btn-outline${d.installation==='yes'?' btn-selected':''}">Yes</button>
            <button id="installNo" class="btn btn-outline${d.installation==='no'?' btn-selected':''}">No</button>
        </div>`;
        // 7. 优惠码
        let couponHtml = `<h2 class="step-label">7. Coupon</h2>
        <div class="section flex">
            <label style="margin-right:10px;">Coupon:</label>
            <input type="text" value="${d.couponCode||""}" id="couponInput" class="long" placeholder="Enter your coupon code if any"/>
            <button id="applyCoupon" class="btn btn-calc">Apply</button>
            <span id="couponMsg" style="margin-left:20px;"></span>
        </div>
        <div class="divider"></div>
        <div style="margin-top:16px; text-align:right;">
            <button id="btnDefault" class="btn btn-default">Default</button>
            <button id="btnBack" class="btn btn-main">Back</button>
            <button id="btnCalc" class="btn btn-calc">Calculate</button>
        </div>`;

        document.getElementById('poolstepMain').innerHTML = installHtml+couponHtml;

        // 安装
        document.getElementById('installYes').onclick = function(){
            d.installation = 'yes'; calcInstall(); saveData(); renderMain();
        };
        document.getElementById('installNo').onclick = function(){
            d.installation = 'no'; d.PoolInstallationValue=0; saveData(); renderMain();
        };

        function calcInstall(){
            let totalPanel = d.TotalpoolFencePanel||0, totalPost = d.TotalpoolPostQty||0, sg = d.poolSmallGateQty||0;
            let unit = Number(pd.poolins)||0;
            d.PoolInstallationValue = d.installation==='yes' ?
                (totalPanel*unit+totalPost*unit+sg*unit*2) : 0;
        }

        // 优惠码
        document.getElementById('applyCoupon').onclick = function(){
            let code = document.getElementById('couponInput').value;
            let msg = document.getElementById('couponMsg');
            let applied = false, val=0;
            if(code===pd.CouponCode1){ val=5; applied=true; }
            if(code===pd.CouponCode2){ val=10; applied=true;}
            if(code===pd.CouponCode3){ val=15; applied=true;}
            if(code===pd.CouponCode4){ val=20; applied=true;}
            if(applied){
                d.couponCode = code;
                d.couponCodeValue = val;
                msg.innerHTML = `<span class="success">Coupon applied! ${val}% off</span>`;
            }else{
                d.couponCode = code;
                d.couponCodeValue = 0;
                msg.innerHTML = `<span class="fail">Invalid coupon code</span>`;
            }
            saveData();
        }

        // 按钮
        document.getElementById('btnDefault').onclick = function(){
            localStorage.removeItem('poolsizechooseData');
            window.poolsizechooseData={};
            renderStep1&&renderStep1(); renderStep2&&renderStep2(); renderTable&&renderTable(); renderMain();
        }
        document.getElementById('btnBack').onclick = function(){
            window.location.href = "Stylechoose.html";
        }
        document.getElementById('btnCalc').onclick = function(){
            // 保存所有输入
            saveData();
            window.location.href = "poolquotation.html";
        }
    }
    window.renderMain = renderMain;
    document.addEventListener("DOMContentLoaded", renderMain);
})();
