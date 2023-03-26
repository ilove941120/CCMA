$(document).ready(function () {
    creatClock()
    $(".outRound").html(innerHtml)
    setInterval(() => GetTimeSecond(), 1000);
})

var innerHtml = "";

function creatClock() {
    for (var i = 1; i <= 6; i++) {
        innerHtml += `
                <div class="item">
                    <div class="base itemBase" style="transform: rotate(${60 + (i * 30)}deg);">
                        <div class="numBase">
                            <span style="transform: rotate(${300 - (i * 30)}deg);">${24 - 13 + i == 12 ? 24 : 24 - 13 + i}</span>
                            <div class="line">✦</div>
                            <span style="transform: rotate(${300 - (i * 30)}deg);">${12 - 13 + i == 0 ? 12 : (12 - 13 + i).toString().padStart(2, "0")}</span>
                        </div>
                        <div class="numBase">
                            <span class="span2" style="transform: rotate(${300 - (i * 30)}deg);">${(i + 5).toString().padStart(2, "0")}</span>
                            <span class="line">✦</span>
                            <span class="span2"style="transform: rotate(${300 - (i * 30)}deg);">${18 - 1 + i}</span>
                        </div>
                    </div>
                    ${itemBlock(i)}
                </div>
            `
    }
}

function itemBlock(i) {
    var str = "";
    var num = 0;
    num = i + (4 * (i - 1))
    var firstEnter = 0;
    for (var n = num; n <= i * 5; n++) {
        if (firstEnter == 3) {

        }
        else {
            str += `
                    <div class="base minuteBase" style="transform: rotate(${96 + (n * 6)}deg);">
                        <span>∙</span>
                        <span>∙</span>
                    </div>
                    `
        }
        firstEnter++
    }
    return str
}

function GetTimeSecond() {
    var dayDate = new Date()
    var s = dayDate.getSeconds()
    var m = dayDate.getMinutes()
    var h = dayDate.getHours()

    $(".secondHand").css("transform", `rotate(${90 + s * 6}deg)`)
    $(".minuteHand").css("transform", `rotate(${90 + m * 6}deg)`)
    $(".hourHand").css("transform", `rotate(${90 + h * 30}deg)`)
    $(".title").text(`${h.toString().padStart(2, "0")}：${m.toString().padStart(2, "0")}：${s.toString().padStart(2, "0")}`)
}