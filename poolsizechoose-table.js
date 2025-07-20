(function(){
    function saveData() {
        localStorage.setItem('poolsizechooseData', JSON.stringify(window.poolsizechooseData));
    }
    function renderTable(){
        let d = window.poolsizechooseData;
        let tableLines = d.tableLines||[{},{},{},{},{},{},{},{},{},{}];
        let rowCnt = d.tableRowCnt||1;
        let html = `<h2 class="step-label">5. Custom Product Table</h2>
        <div class="section table-box">
        <table>
            <tr>
                <th style="width:38px;">No.</th>
                <th style="width:125px;">Product Name</th>
                <th style="width:165px;">Description</th>
                <th style="width:70px;">Price</th>
                <th style="width:55px;">Qty</th>
                <th style="width:80px;">Line Price</th>
                <th style="width:90px;">Remark</th>
            </tr>`;
        for(let i=0;i<rowCnt;i++){
            let l=tableLines[i]||{};
            html+=`<tr data-idx="${i}">
                <td>${i+1}</td>
                <td><input type="text" value="${l.name||""}" class="table-name" style="width:120px;"></td>
                <td><input type="text" value="${l.desc||""}" class="table-desc" style="width:158px;"></td>
                <td><input type="number" step="0.01" value="${l.price||""}" class="table-price" style="width:68px;"></td>
                <td><input type="number" step="1" value="${l.qty||""}" class="table-qty" style="width:47px;"></td>
                <td><input type="number" step="0.01" value="${((l.price||0)*(l.qty||0)).toFixed(2)}" class="table-lineprice" style="width:75px;" readonly></td>
                <td><input type="text" value="${l.remark||""}" class="table-remark" style="width:82px;"></td>
            </tr>`;
        }
        html += `<tr>
            <td colspan="7" style="background:#fafcff;">
                <button id="tableAdd" class="btn table-btn btn-main"${rowCnt>=10?' disabled':''}>+</button>
                <button id="tableRemove" class="btn table-btn btn-default"${rowCnt<=1?' disabled':''}>-</button>
            </td>
        </tr>
        </table></div>`;
        document.getElementById('pooltable').innerHTML = html;

        // 事件绑定
        for(let i=0;i<rowCnt;i++){
            let tr = document.querySelector(`tr[data-idx="${i}"]`);
            if(!tr) continue;
            tr.querySelector('.table-name').oninput = function(){ tableLines[i].name=this.value; save(); };
            tr.querySelector('.table-desc').oninput = function(){ tableLines[i].desc=this.value; save(); };
            tr.querySelector('.table-price').oninput = function(){ tableLines[i].price=+this.value; save(); updateLinePrice(i);}
            tr.querySelector('.table-qty').oninput = function(){ tableLines[i].qty=+this.value; save(); updateLinePrice(i);}
            tr.querySelector('.table-remark').oninput = function(){ tableLines[i].remark=this.value; save(); };
        }
        document.getElementById('tableAdd').onclick = function(){
            if(rowCnt<10){ rowCnt++; save(); renderTable(); }
        }
        document.getElementById('tableRemove').onclick = function(){
            if(rowCnt>1){ rowCnt--; save(); renderTable();}
        }

function save(){
    d.tableLines = tableLines;
    d.tableRowCnt = rowCnt;
    for(let i=0;i<rowCnt;i++){
        let name = (tableLines[i].name||"").trim();
        // 如果这一行没名字，彻底清理数据和localStorage
        if(!name){
            delete d[`poolLine${i+1}Name`];
            delete d[`poolLine${i+1}Desc`];
            delete d[`poolLine${i+1}Price`];
            delete d[`poolLine${i+1}Qty`];
            delete d[`poolLine${i+1}Remark`];
            localStorage.removeItem(`poolLine${i+1}Name`);
            localStorage.removeItem(`poolLine${i+1}Desc`);
            localStorage.removeItem(`poolLine${i+1}Price`);
            localStorage.removeItem(`poolLine${i+1}Qty`);
            localStorage.removeItem(`poolLine${i+1}Remark`);
        }else{
            d[`poolLine${i+1}Name`] = name;
            d[`poolLine${i+1}Desc`] = tableLines[i].desc||"";
            d[`poolLine${i+1}Price`] = tableLines[i].price||"";
            d[`poolLine${i+1}Qty`] = tableLines[i].qty||"";
            d[`poolLine${i+1}Remark`] = tableLines[i].remark||"";
            localStorage.setItem(`poolLine${i+1}Name`, name);
            localStorage.setItem(`poolLine${i+1}Desc`, tableLines[i].desc||"");
            localStorage.setItem(`poolLine${i+1}Price`, tableLines[i].price||"");
            localStorage.setItem(`poolLine${i+1}Qty`, tableLines[i].qty||"");
            localStorage.setItem(`poolLine${i+1}Remark`, tableLines[i].remark||"");
        }
    }
    saveData();
}

        function updateLinePrice(idx){
            let l = tableLines[idx]||{};
            let lp = (l.price||0)*(l.qty||0);
            tr = document.querySelector(`tr[data-idx="${idx}"] .table-lineprice`);
            if(tr) tr.value = lp.toFixed(2);
        }
    }
    window.renderTable = renderTable;
    document.addEventListener("DOMContentLoaded", renderTable);
})();
