


var innerHtml = "";
var num = 9;

mainFrame(num);
$(".mainBlock").html(innerHtml)

function mainFrame(num) {
    for (var i = 1; i <= num; i++) {
        if (i == 1) {
            innerHtml += `
                <div class="base titleBlock">
                    <div class="upPart">
                        <span>×</span>
                        <div class="lineStyle"></div>
                        <span>×</span>
                    </div>
                    <div class="mainPart">
                        <div class="titleBlock">
                            <div class="maimTitle">九九乘法表</div>
                            <div class="subtitleTitle">MULTIPLICATION CHART</div>
                        </div>
                    </div>
                    <div class="downPart">
                        <span>×</span>
                        <div class="lineStyle"></div>
                        <span>×</span>
                    </div>
                </div>
            `
        }
        else {
            innerHtml += `<div class="base ItemBlock">${itemNum(i)}</div>`
        }
    }
}

function itemNum(i) {
    str = ` 
        <div class="base ItemBlock">
            <div class="rigthBlock">
                <div class="itemTitle">
                    <span>${i}</span> 
                </div>
                <div class="item">${i}×1=${i * 1}</div>
                <div class="item">${i}×2=${i * 2}</div>
                <div class="item">${i}×3=${i * 3}</div>
            </div>
            <div class="leftBlock">
                <div class="item">${i}×4=${i * 4}</div>
                <div class="item">${i}×5=${i * 5}</div>
                <div class="item">${i}×6=${i * 6}</div>
                <div class="item">${i}×7=${i * 7}</div>
                <div class="item">${i}×8=${i * 8}</div>
                <div class="item">${i}×9=${i * 9}</div>
            </div>
        </div>
    `
    return str
}