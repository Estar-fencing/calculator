// ========== 数据读取 ===========
const paramsData = JSON.parse(localStorage.getItem('paramsData')||'{}');
const sizechooseData = JSON.parse(localStorage.getItem('sizechooseData')||'{}');
const StylechooseData = JSON.parse(localStorage.getItem('StylechooseData')||'{}');
const installationChooseData = JSON.parse(localStorage.getItem('installationChooseData')||'{}');
const couponCodeValue = Number(installationChooseData.couponCodeValue||0);

// ====== 顶部信息填充 ======
function pad2(n){ return n<10?'0'+n:n; }
const now = new Date();
const orderNo = `NO.: ESQ${now.getFullYear()}${pad2(now.getMonth()+1)}${pad2(now.getDate())}${pad2(now.getHours())}${pad2(now.getMinutes())}`;
document.getElementById('noCell').innerText = orderNo;
document.getElementById('dateCell').innerText = "Date: "+now.toISOString().slice(0,10);
document.getElementById('contactCell').innerText = "Eason 0450 790 119";

document.getElementById('clientName').innerText = paramsData.Name||'';
document.getElementById('clientPhone').innerText = paramsData.PhoneNumber||'';
document.getElementById('clientEmail').innerText = paramsData.Email||'';
document.getElementById('clientAddr').innerText = paramsData.Address||'';

// ======= 明细表 ========
let rows = [];
let idx = 1;
function pushRow(row){ row[0]=idx++; rows.push(row); }

// Fence 多组（fenceValue1/2/3...） 
for(let i=1; i<=30; i++){
    let fv = sizechooseData['fenceValue'+i];
    if(fv && fv>0){
        const fType = StylechooseData.FenceStyleType||'Fence';
        const color = StylechooseData.Colortype||'';
        const h = sizechooseData['FenceHeightValue'+i]||sizechooseData.heightValue0||'';
        const price = (StylechooseData.FenceStyleValue||0)*(StylechooseData.GapValue||1);
        const qty = Number(fv)||0;
        const line = +(price*qty).toFixed(2);
        pushRow([null, fType, color+' '+h, price, qty, line, 'Price Per SQM']);
    }
}
// Inground Post
if(Number(installationChooseData.IngroundPostQty)>0){
    pushRow([
        null,
        installationChooseData.IngroundPoststyle||'Inground Post',
        (StylechooseData.Colortype||'')+' '+(installationChooseData.IngroundPostHeight||'')+'mL',
        Number(installationChooseData.IngroundPostValue||0),
        Number(installationChooseData.IngroundPostQty||0),
        Number(installationChooseData.IngroundPostValue||0)*Number(installationChooseData.IngroundPostQty||0),
        'With Cap'
    ]);
}
// Plate Post
if(Number(installationChooseData.PlatePostQty)>0){
    pushRow([
        null,
        installationChooseData.PlatePoststyle||'Plate Post',
        (StylechooseData.Colortype||'')+' '+(installationChooseData.PlatePostHeight||'')+'mL',
        Number(installationChooseData.PlatePostValue||0),
        Number(installationChooseData.PlatePostQty||0),
        Number(installationChooseData.PlatePostValue||0)*Number(installationChooseData.PlatePostQty||0),
        'With Cap'
    ]);
}
// Bracket
if(Number(installationChooseData.BracketQty)>0){
    pushRow([
        null,'Bracket','40x40',
        Number(paramsData.b1||0),
        Number(installationChooseData.BracketQty||0),
        Number(paramsData.b1||0)*Number(installationChooseData.BracketQty||0),
        StylechooseData.Colortype||''
    ]);
}
// Small Gates
for(let i=1;i<=5;i++){
    let sgVal = sizechooseData['SmallGateValue'+i];
    if(sgVal && sgVal>0){
        pushRow([
            null,'Small gate',
            (sizechooseData['SmallGateHeightValue'+i]||'')+'mH, '+(sizechooseData['SmallGateLengthValue'+i]||'')+'mW',
            Number(paramsData.sm1||0)*Number(sizechooseData['SmallGateHeightValue'+i]||0)*Number(sizechooseData['SmallGateLengthValue'+i]||0),
            Number(installationChooseData.TotalSmallgatePostQty||1),
            Number(paramsData.sm1||0)*Number(sizechooseData['SmallGateHeightValue'+i]||0)*Number(sizechooseData['SmallGateLengthValue'+i]||0)*Number(installationChooseData.TotalSmallgatePostQty||1),
            StylechooseData.Colortype||''
        ]);
    }
}
// Small Gate Post
if(Number(installationChooseData.TotalSmallgatePostQty)>0){
    pushRow([
        null,'Small gate Post','65x65 1.8mH',
        Number(paramsData.p18||0),1,Number(paramsData.p18||0)*1,
        StylechooseData.Colortype||''
    ]);
}
// Lock & Hinges
if(Number(sizechooseData.LockHingesQty)>0){
    pushRow([
        null,'Lock & Hinges','',
        Number(paramsData.l1||0),
        Number(sizechooseData.LockHingesQty||0),
        Number(paramsData.l1||0)*Number(sizechooseData.LockHingesQty||0),
        'Black'
    ]);
}
// Sliding Gates
for(let i=1;i<=5;i++){
    let sgVal = sizechooseData['SlidingGateValue'+i];
    if(sgVal && sgVal>0){
        pushRow([
            null,'Sliding gate',
            (sizechooseData['SlidingGateHeightValue'+i]||'')+'mH, '+(sizechooseData['SlidingGateLengthValue'+i]||'')+'mL',
            Number(paramsData.s1||0)*Number(sizechooseData['SlidingGateHeightValue'+i]||0)*Number(sizechooseData['SlidingGateLengthValue'+i]||0),
            1,
            Number(paramsData.s1||0)*Number(sizechooseData['SlidingGateHeightValue'+i]||0)*Number(sizechooseData['SlidingGateLengthValue'+i]||0),
            (StylechooseData.Colortype||'')+' '+(StylechooseData.FenceStyleType||'')
        ]);
    }
}
// Double Swing Gates
for(let i=1;i<=5;i++){
    let dv = sizechooseData['DoubleSwingGateValue'+i];
    if(dv && dv>0){
        pushRow([
            null,'Double Swing gate',
            (sizechooseData['DoubleSwingGateHeightValue'+i]||'')+'mH, '+(sizechooseData['DoubleSwingGateLengthValue'+i]||'')+'mL',
            Number(paramsData.d1||0)*Number(sizechooseData['DoubleSwingGateHeightValue'+i]||0)*Number(sizechooseData['DoubleSwingGateLengthValue'+i]||0),
            1,
            Number(paramsData.d1||0)*Number(sizechooseData['DoubleSwingGateHeightValue'+i]||0)*Number(sizechooseData['DoubleSwingGateLengthValue'+i]||0),
            (StylechooseData.Colortype||'')+' '+(StylechooseData.FenceStyleType||'')
        ]);
    }
}
// Gate kits & U-Post
if(Number(installationChooseData.GatekitsUPostQty)>0){
    pushRow([
        null,'Gate kits & U-Post','Wheels Catcher Holder etc.',
        Number(paramsData.gku1||0),
        Number(installationChooseData.GatekitsUPostQty||0),
        Number(paramsData.gku1||0)*Number(installationChooseData.GatekitsUPostQty||0),
        StylechooseData.Colortype||''
    ]);
}
// Heavy duty Hinges
if(Number(installationChooseData.HeavyDutyHingesQty)>0){
    pushRow([
        null,'Heavy duty Hinges','65x65 hinges',
        Number(paramsData.hh1||0),
        Number(installationChooseData.HeavyDutyHingesQty||0),
        Number(paramsData.hh1||0)*Number(installationChooseData.HeavyDutyHingesQty||0),
        'Black'
    ]);
}
// Sliding Motor
if(Number(sizechooseData.SlidingGateMotorQty)>0){
    pushRow([
        null,'Sliding Motor',sizechooseData.SlidingGateMotorType||'',
        Number(sizechooseData.SlidingGateMotorValue||0),
        Number(sizechooseData.SlidingGateMotorQty||0),
        Number(sizechooseData.SlidingGateMotorValue||0)*Number(sizechooseData.SlidingGateMotorQty||0),''
    ]);
}
// Swing Motor
if(Number(sizechooseData.SwingarmMotorQty)>0){
    pushRow([
        null,'Swing Motor',sizechooseData.SwingarmMotorType||'',
        Number(sizechooseData.SwingarmMotorValue||0),
        Number(sizechooseData.SwingarmMotorQty||0),
        Number(sizechooseData.SwingarmMotorValue||0)*Number(sizechooseData.SwingarmMotorQty||0),''
    ]);
}
// Steel Track
if(Number(installationChooseData.SteelTrackQty)>0){
    pushRow([
        null,'Steel Track','1mL',
        Number(paramsData.st1||0),
        Number(installationChooseData.SteelTrackQty||0),
        Number(paramsData.st1||0)*Number(installationChooseData.SteelTrackQty||0),''
    ]);
}
// Fence Installation
if(Number(installationChooseData.InstallationFenceQty)>0){
    pushRow([
        null,'Fence Installation','with parts',
        Number(StylechooseData.InstallationStyleValue||0),
        Number(installationChooseData.InstallationFenceQty||0),
        Number(StylechooseData.InstallationStyleValue||0)*Number(installationChooseData.InstallationFenceQty||0),''
    ]);
}
// Small gate Installation
if(Number(installationChooseData.InstallationSmallGateValue)>0){
    pushRow([
        null,'Small gate Installation','with parts',
        Number(paramsData.smi1||0),
        Number(sizechooseData.SmallGateQty||0),
        Number(paramsData.smi1||0)*Number(sizechooseData.SmallGateQty||0),''
    ]);
}
// Sliding gate Installation
if(Number(installationChooseData.InstallationSlidingGateValue)>0){
    pushRow([
        null,sizechooseData.InstallationSlidingMotortype||'Sliding gate Installation',
        'without hard wire from house',
        Number(sizechooseData.InstallationSlidingMotorValue||0),
        Number(sizechooseData.SlidingGateQty||0),
        Number(sizechooseData.InstallationSlidingMotorValue||0)*Number(sizechooseData.SlidingGateQty||0),''
    ]);
}
// Double swing gate Installation
if(Number(installationChooseData.InstallationDoubleSwingGateValue)>0){
    pushRow([
        null,sizechooseData.InstallationArmMotortype||'Double swing gate Installation',
        'without hard wire from house',
        Number(sizechooseData.InstallationArmMotorValue||0),
        Number(sizechooseData.DoubleSwingGateQty||0),
        Number(sizechooseData.InstallationArmMotorValue||0)*Number(sizechooseData.DoubleSwingGateQty||0),''
    ]);
}
// Powder Coating
if(Number(StylechooseData.ColorValue)>0 && Number(installationChooseData.powdercaotingQty)>0){
    pushRow([
        null,'Powder Coating',StylechooseData.Colortype||'',
        Number(StylechooseData.ColorValue||0),
        Number(installationChooseData.powdercaotingQty||0),
        Number(StylechooseData.ColorValue||0)*Number(installationChooseData.powdercaotingQty||0),''
    ]);
}
// Line1/Line2...
for(let i=1;i<=10;i++){
    let name = installationChooseData['Line'+i+'Name'];
    if(name){
        let desc = installationChooseData['Line'+i+'Desc']||'';
        let price = Number(installationChooseData['Line'+i+'Price']||0);
        let qty = Number(installationChooseData['Line'+i+'Qty']||0);
        let line = price*qty;
        let remark = installationChooseData['Line'+i+'Remark']||'';
        pushRow([null,name,desc,price,qty,line,remark]);
    }
}

// ======= 明细表渲染 ======
let tbody = document.getElementById('detailTbody');
let sum = 0;
for(let i=0;i<rows.length;i++){
    let tr = document.createElement('tr');
    for(let j=0;j<7;j++){
        let td = document.createElement('td');
        td.innerText = rows[i][j]!==undefined ? rows[i][j] : '';
        tr.appendChild(td);
    }
    tbody.appendChild(tr);
    sum += Number(rows[i][5]||0);
}

// =========== 汇总金额 =========
let TotalIncludingGST = +(sum).toFixed(2);
let NETAMOUNT = +(TotalIncludingGST/1.1).toFixed(2);
let TotalGST = +(NETAMOUNT*0.1).toFixed(2);
let CouponDiscount = +(couponCodeValue*TotalIncludingGST).toFixed(2);
let BalanceDue = +(TotalIncludingGST-CouponDiscount).toFixed(2);

document.getElementById('netAmount').innerText = NETAMOUNT.toFixed(2);
document.getElementById('totalGST').innerText = TotalGST.toFixed(2);
document.getElementById('totalInclGST').innerText = TotalIncludingGST.toFixed(2);
document.getElementById('couponDisc').innerText = CouponDiscount.toFixed(2);
document.getElementById('balanceDue').innerText = BalanceDue.toFixed(2);

// =========== 产品图片 ==========
let img = document.getElementById('prodImg');
if(StylechooseData.selectedPic){
    img.src = StylechooseData.selectedPic;
} else {
    img.style.display = "none";
}

// =========== 打印功能 ==========
document.getElementById('printBtn').onclick = function(){
    let name = paramsData.Name||'';
    let phone = paramsData.PhoneNumber||'';
    let total = document.getElementById('totalInclGST').innerText;
    let filename = (name+phone+total).replace(/[^a-zA-Z0-9]/g,'')+'.pdf';
    // 打印前更改 title
    let oldtitle = document.title;
    document.title = filename;
    window.print();
    setTimeout(()=>{document.title = oldtitle;},300);
};
