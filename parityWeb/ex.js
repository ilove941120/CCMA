const url = "https://hexschool.github.io/js-filter-data/data.json"

let data
let showData =[]
let tybeData =[]
let keyData =[]
let keyAndTybeData =[]
axios.get(url)
    .then(function (response) {
        data=response.data.filter(i=>i.作物名稱)
    });
// 分類
const sortBar = document.querySelector('.sortBar')
const sortItem = document.querySelectorAll('.sortItem')
sortBar.addEventListener("click",function(e){
    let str =``
    for(i=0;i<=3;i++){
        sortItem[i].classList.remove("sortActive")
    }
    let thisDom =e.target.getAttribute("data-num")
    for(var i=0; i<=4;i++){
        if(thisDom != i){
            upColor[i].classList.remove("sortStatuActive")
            downColor[i].classList.remove("sortStatuActive")
        }
        sortStatu[i].classList.remove("sortStatuActive")

    }
    sequence.value = 1
    sortBar.setAttribute("data-on","2")
    reduction()
    if(e.target.innerText == "全部"){
        e.target.className += " sortActive"
        data.forEach(function(item){
            if(item.種類代碼 != "null"){
                str += `
                    <div class="showItem">
                        <div class="itemName">${item.作物名稱}</div>
                        <div class="itemMarkt">${item.市場名稱}</div>
                        <div class="itemPriceTop">${item.上價}</div>
                        <div class="itemPriceMiddle">${item.中價}</div>
                        <div class="itemPriceDown">${item.下價}</div>
                        <div class="itemPriceAverage">${item.平均價}</div>
                        <div class="itemPriceTrading ">${item.交易量}</div>
                    </div>
                `
            }
        })
        tybeData = data.filter(function(item){
            return item.種類代碼 != "null"
        })
        showDataBlock.innerHTML = str
    }
    else if(e.target.innerText == "蔬果"){
        e.target.className += " sortActive"
        data.forEach(function(item){
            if(item.種類代碼 == "N04"){
                str += `
                    <div class="showItem">
                        <div class="itemName">${item.作物名稱}</div>
                        <div class="itemMarkt">${item.市場名稱}</div>
                        <div class="itemPriceTop">${item.上價}</div>
                        <div class="itemPriceMiddle">${item.中價}</div>
                        <div class="itemPriceDown">${item.下價}</div>
                        <div class="itemPriceAverage">${item.平均價}</div>
                        <div class="itemPriceTrading ">${item.交易量}</div>
                    </div>
                `
            }
        })
        tybeData = data.filter(function(item){
            return item.種類代碼 == "N04"
        })
        showDataBlock.innerHTML = str
    }
    else if(e.target.innerText == "水果"){
        e.target.className += " sortActive"
        data.forEach(function(item){
            if(item.種類代碼 == "N05"){
                str += `
                    <div class="showItem">
                        <div class="itemName">${item.作物名稱}</div>
                        <div class="itemMarkt">${item.市場名稱}</div>
                        <div class="itemPriceTop">${item.上價}</div>
                        <div class="itemPriceMiddle">${item.中價}</div>
                        <div class="itemPriceDown">${item.下價}</div>
                        <div class="itemPriceAverage">${item.平均價}</div>
                        <div class="itemPriceTrading ">${item.交易量}</div>
                    </div>
                `
            }
            
        })
        tybeData = data.filter(function(item){
            return item.種類代碼 == "N05"
        })
        showDataBlock.innerHTML = str
    }
    else if(e.target.innerText == "花卉"){
        e.target.className += " sortActive"
        data.forEach(function(item){
            if(item.種類代碼 == "N06"){
                str += `
                    <div class="showItem">
                        <div class="itemName">${item.作物名稱}</div>
                        <div class="itemMarkt">${item.市場名稱}</div>
                        <div class="itemPriceTop">${item.上價}</div>
                        <div class="itemPriceMiddle">${item.中價}</div>
                        <div class="itemPriceDown">${item.下價}</div>
                        <div class="itemPriceAverage">${item.平均價}</div>
                        <div class="itemPriceTrading ">${item.交易量}</div>
                    </div>
                `
            }
            
        })
        tybeData = data.filter(function(item){
            return item.種類代碼 == "N06"
        })
        showDataBlock.innerHTML = str
    }
})
//關鍵字搜尋 
const searchInput = document.querySelector(".searchInput")
const searchButton = document.querySelector(".searchButton")
const showDataBlock = document.querySelector(".showDataBlock")
const searchResult = document.querySelector(".searchResult")
const showTitle = document.querySelector(".showTitle")
searchButton.addEventListener("click",function(e){
    let str =  ``
    showTitle.setAttribute("data-showData","keyData")
    let thisDom =e.target.getAttribute("data-num")
    for(var i=0; i<=4;i++){
        if(thisDom != i){
            upColor[i].classList.remove("sortStatuActive")
            downColor[i].classList.remove("sortStatuActive")
        }
        sortStatu[i].classList.remove("sortStatuActive")

    }
    if(searchInput.value.trim() == ""){
        alert("請輸入關鍵字")
        return   
    }
    // 0 單純做關鍵字搜尋
    if(sortBar.getAttribute("data-on") == "0"){
        if(e.target.nodeName == "DIV"){
            data.forEach(function(item){
                if(item.作物名稱.match(searchInput.value)){
                    str += `
                        <div class="showItem">
                            <div class="itemName">${item.作物名稱}</div>
                            <div class="itemMarkt">${item.市場名稱}</div>
                            <div class="itemPriceTop">${item.上價}</div>
                            <div class="itemPriceMiddle">${item.中價}</div>
                            <div class="itemPriceDown">${item.下價}</div>
                            <div class="itemPriceAverage">${item.平均價}</div>
                            <div class="itemPriceTrading ">${item.交易量}</div>
                        </div>
                    `
                }
            })
            keyData = data.filter(function(item){
                return item.作物名稱.match(searchInput.value)
            })
            if(str == ""){
                showDataBlock.innerHTML = `
                <div class="preset">
                查詢不到當日的交易資訊QQ
                </div>
                `
            }
            else{
                showDataBlock.innerHTML = str
            }
            searchResult.innerHTML = `查看『${searchInput.value}』搜尋結果`
        }
    }
    // 1 代表分類被點亮 所以做分類下的關鍵字搜尋
    else if(sortBar.getAttribute("data-on") == "2"){
        sortBar.setAttribute("data-on","1")
        if(e.target.nodeName == "DIV"){
            tybeData.forEach(function(item){
                if(item.作物名稱.match(searchInput.value)){
                    str += `
                        <div class="showItem">
                            <div class="itemName">${item.作物名稱}</div>
                            <div class="itemMarkt">${item.市場名稱}</div>
                            <div class="itemPriceTop">${item.上價}</div>
                            <div class="itemPriceMiddle">${item.中價}</div>
                            <div class="itemPriceDown">${item.下價}</div>
                            <div class="itemPriceAverage">${item.平均價}</div>
                            <div class="itemPriceTrading ">${item.交易量}</div>
                        </div>
                    `
                }
            })
            keyAndTybeData = tybeData.filter(function(item){
                return item.作物名稱.match(searchInput.value)
            })
            if(str == ""){
                showDataBlock.innerHTML = `
                <div class="preset">
                查詢不到當日的交易資訊QQ
                </div>
                `
            }
            else{
                showDataBlock.innerHTML = str
            }
            searchResult.innerHTML = `查看『${searchInput.value}』搜尋結果`
        }
    }

    keyAndTybeData = tybeData.filter(function(item){
        return item.作物名稱.match(searchInput.value)
    })
})
// 選單
const sequence =document.querySelector("#sequence")
sequence.addEventListener("change",function(){
    for(var i=0; i<=4;i++){
        upColor[i].classList.remove("sortStatuActive")
        downColor[i].classList.remove("sortStatuActive")
        sortStatu[i].classList.remove("sortStatuActive")
    }
    const switchValue = sequence.options[sequence.selectedIndex].value;
    switch(switchValue){
        case "1":
        up_01();
        break;
        case "2":
        up_02();
        sortStatu[2-2].className += " sortStatuActive"

        break;
        case "3":
        up_03();
        sortStatu[3-2].className += " sortStatuActive"

        break;
        case "4":
        up_04();
        sortStatu[4-2].className += " sortStatuActive"

        break;
        case "5":
        up_05();
        sortStatu[5-2].className += " sortStatuActive"

        break;
        case "6":
        up_06();
        sortStatu[6-2].className += " sortStatuActive"

        break;
        default:
        return;
    }
})
function up_01() {
    // 規則
    // 0的時候 關鍵字
    // 1的時候 關鍵字+分類
    // 2的時候 分類
}
// 排序由大到小
function up_02() {
    if(sortBar.getAttribute("data-on") == "2"){
        tybeData.sort(function(a,b){
            return b.上價-a.上價
        })
        tybeDataHtml()
    }
    else if(sortBar.getAttribute("data-on") == "1"){
        keyAndTybeData.sort(function(a,b){
            return b.上價-a.上價
        })
        keyAndTybeDataHtml()
    }
    else if(sortBar.getAttribute("data-on") == "0"){
        keyData.sort(function(a,b){
            return b.上價-a.上價
        })
        keyDataHtml()
    }
}
function up_03() {
    if(sortBar.getAttribute("data-on") == "2"){
        tybeData.sort(function(a,b){
            return b.中價-a.中價
        })
        tybeDataHtml()
    }
    else if(sortBar.getAttribute("data-on") == "1"){
        keyAndTybeData.sort(function(a,b){
            return b.中價-a.中價
        })
        keyAndTybeDataHtml()
    }
    else if(sortBar.getAttribute("data-on") == "0"){
        keyData.sort(function(a,b){
            return b.中價-a.中價
        })
        keyDataHtml()
    }
}
function up_04() {
    if(sortBar.getAttribute("data-on") == "2"){
        tybeData.sort(function(a,b){
            return b.下價-a.下價
        })
        tybeDataHtml()
    }
    else if(sortBar.getAttribute("data-on") == "1"){
        keyAndTybeData.sort(function(a,b){
            return b.下價-a.下價
        })
        keyAndTybeDataHtml()
    }
    else if(sortBar.getAttribute("data-on") == "0"){
        keyData.sort(function(a,b){
            return b.下價-a.下價
        })
        keyDataHtml()
    }
}
function up_05() {
    if(sortBar.getAttribute("data-on") == "2"){
        tybeData.sort(function(a,b){
            return b.平均價-a.平均價
        })
        tybeDataHtml()
    }
    else if(sortBar.getAttribute("data-on") == "1"){
        keyAndTybeData.sort(function(a,b){
            return b.平均價-a.平均價
        })
        keyAndTybeDataHtml()
    }
    else if(sortBar.getAttribute("data-on") == "0"){
        keyData.sort(function(a,b){
            return b.平均價-a.平均價
        })
        keyDataHtml()
    }
}
function up_06() {
    if(sortBar.getAttribute("data-on") == "2"){
        tybeData.sort(function(a,b){
            return b.交易量-a.交易量
        })
        tybeDataHtml()
    }
    else if(sortBar.getAttribute("data-on") == "1"){
        keyAndTybeData.sort(function(a,b){
            return b.交易量-a.交易量
        })
        keyAndTybeDataHtml()
    }
    else if(sortBar.getAttribute("data-on") == "0"){
        keyData.sort(function(a,b){
            return b.交易量-a.交易量
        })
        keyDataHtml()
    }
}
// 排序小到大
function down_02() {
    if(sortBar.getAttribute("data-on") == "2"){
        tybeData.sort(function(a,b){
            return a.上價-b.上價
        })
        tybeDataHtml()
    }
    else if(sortBar.getAttribute("data-on") == "1"){
        keyAndTybeData.sort(function(a,b){
            return a.上價-b.上價
        })
        keyAndTybeDataHtml()
    }
    else if(sortBar.getAttribute("data-on") == "0"){
        keyData.sort(function(a,b){
            return a.上價-b.上價
        })
        keyDataHtml()
    }
}
function down_03() {
    if(sortBar.getAttribute("data-on") == "2"){
        tybeData.sort(function(a,b){
            return a.中價-b.中價
        })
        tybeDataHtml()
    }
    else if(sortBar.getAttribute("data-on") == "1"){
        keyAndTybeData.sort(function(a,b){
            return a.中價-b.中價
        })
        keyAndTybeDataHtml()
    }
    else if(sortBar.getAttribute("data-on") == "0"){
        keyData.sort(function(a,b){
            return a.中價-b.中價
        })
        keyDataHtml()
    }
}
function down_04() {
    if(sortBar.getAttribute("data-on") == "2"){
        tybeData.sort(function(a,b){
            return a.下價-b.下價
        })
        tybeDataHtml()
    }
    else if(sortBar.getAttribute("data-on") == "1"){
        keyAndTybeData.sort(function(a,b){
            return a.下價-b.下價
        })
        keyAndTybeDataHtml()
    }
    else if(sortBar.getAttribute("data-on") == "0"){
        keyData.sort(function(a,b){
            return a.下價-b.下價
        })
        keyDataHtml()
    }
}
function down_05() {
    if(sortBar.getAttribute("data-on") == "2"){
        tybeData.sort(function(a,b){
            return a.平均價-b.平均價
        })
        tybeDataHtml()
    }
    else if(sortBar.getAttribute("data-on") == "1"){
        keyAndTybeData.sort(function(a,b){
            return a.平均價-b.平均價
        })
        keyAndTybeDataHtml()
    }
    else if(sortBar.getAttribute("data-on") == "0"){
        keyData.sort(function(a,b){
            return a.平均價-b.平均價
        })
        keyDataHtml()
    }
}
function down_06() {
    if(sortBar.getAttribute("data-on") == "2"){
        tybeData.sort(function(a,b){
            return a.交易量-b.交易量
        })
        tybeDataHtml()
    }
    else if(sortBar.getAttribute("data-on") == "1"){
        keyAndTybeData.sort(function(a,b){
            return a.交易量-b.交易量
        })
        keyAndTybeDataHtml()
    }
    else if(sortBar.getAttribute("data-on") == "0"){
        keyData.sort(function(a,b){
            return a.交易量-b.交易量
        })
        keyDataHtml()
    }
}
function tybeDataHtml(){
    let str =``
    tybeData.forEach(function(item){
        str += `
            <div class="showItem">
                <div class="itemName">${item.作物名稱}</div>
                <div class="itemMarkt">${item.市場名稱}</div>
                <div class="itemPriceTop">${item.上價}</div>
                <div class="itemPriceMiddle">${item.中價}</div>
                <div class="itemPriceDown">${item.下價}</div>
                <div class="itemPriceAverage">${item.平均價}</div>
                <div class="itemPriceTrading ">${item.交易量}</div>
            </div>
        `
    })
    
    showDataBlock.innerHTML = str
}
function keyDataHtml(){
    let str =``
    keyData.forEach(function(item){
        str += `
            <div class="showItem">
                <div class="itemName">${item.作物名稱}</div>
                <div class="itemMarkt">${item.市場名稱}</div>
                <div class="itemPriceTop">${item.上價}</div>
                <div class="itemPriceMiddle">${item.中價}</div>
                <div class="itemPriceDown">${item.下價}</div>
                <div class="itemPriceAverage">${item.平均價}</div>
                <div class="itemPriceTrading ">${item.交易量}</div>
            </div>
        `
    })
    
    showDataBlock.innerHTML = str
}
function keyAndTybeDataHtml(){
    let str =``
    keyAndTybeData.forEach(function(item){
        str += `
            <div class="showItem">
                <div class="itemName">${item.作物名稱}</div>
                <div class="itemMarkt">${item.市場名稱}</div>
                <div class="itemPriceTop">${item.上價}</div>
                <div class="itemPriceMiddle">${item.中價}</div>
                <div class="itemPriceDown">${item.下價}</div>
                <div class="itemPriceAverage">${item.平均價}</div>
                <div class="itemPriceTrading ">${item.交易量}</div>
            </div>
        `
    })
    
    showDataBlock.innerHTML = str
}
// 初始化
function reduction(){
    searchInput.value =""
    searchResult.innerHTML =""
}

// 資料排序
const sortStatu =document.querySelectorAll(".sortStatu")
const upColor = document.querySelectorAll(".fa-caret-up")
const downColor = document.querySelectorAll(".fa-sort-down")
showTitle.addEventListener("click",function(e){
    sequence.value =1
    let thisDom =e.target.getAttribute("data-num")
    for(var i=0; i<=4;i++){
        if(thisDom != i){
            sortStatu[i].setAttribute("data-sortStatu","0")
            upColor[i].classList.remove("sortStatuActive")
            downColor[i].classList.remove("sortStatuActive")
        }
        sortStatu[i].classList.remove("sortStatuActive")

    }
    if(e.target.innerText == "上價"){
        if(e.target.getAttribute("data-sortStatu") == "0"){
            e.target.setAttribute("data-sortStatu","up")
            up_02()
            upColor[thisDom].className += " sortStatuActive"
        }
        else if(e.target.getAttribute("data-sortStatu") == "up"){
            e.target.setAttribute("data-sortStatu","down")
            down_02()
            upColor[thisDom].classList.remove("sortStatuActive")
            downColor[thisDom].className += " sortStatuActive"

        }
        else if(e.target.getAttribute("data-sortStatu") == "down"){
            e.target.setAttribute("data-sortStatu","up")
            up_02()
            downColor[thisDom].classList.remove("sortStatuActive")
            upColor[thisDom].className += " sortStatuActive"
        }
    }
    else if(e.target.innerText == "中價"){
        if(e.target.getAttribute("data-sortStatu") == "0"){
            e.target.setAttribute("data-sortStatu","up")
            up_03()
            upColor[thisDom].className += " sortStatuActive"
        }
        else if(e.target.getAttribute("data-sortStatu") == "up"){
            e.target.setAttribute("data-sortStatu","down")
            down_03()
            upColor[thisDom].classList.remove("sortStatuActive")
            downColor[thisDom].className += " sortStatuActive"
        }
        else if(e.target.getAttribute("data-sortStatu") == "down"){
            e.target.setAttribute("data-sortStatu","up")
            up_03()
            downColor[thisDom].classList.remove("sortStatuActive")
            upColor[thisDom].className += " sortStatuActive"
        }
    }
    else if(e.target.innerText == "下價"){
        if(e.target.getAttribute("data-sortStatu") == "0"){
            e.target.setAttribute("data-sortStatu","up")
            up_04()
            upColor[thisDom].className += " sortStatuActive"

        }
        else if(e.target.getAttribute("data-sortStatu") == "up"){
            e.target.setAttribute("data-sortStatu","down")
            down_04()
            upColor[thisDom].classList.remove("sortStatuActive")
            downColor[thisDom].className += " sortStatuActive"
        }
        else if(e.target.getAttribute("data-sortStatu") == "down"){
            e.target.setAttribute("data-sortStatu","up")
            up_04()
            downColor[thisDom].classList.remove("sortStatuActive")
            upColor[thisDom].className += " sortStatuActive"
        }
    }
    else if(e.target.innerText == "平均價"){
        if(e.target.getAttribute("data-sortStatu") == "0"){
            e.target.setAttribute("data-sortStatu","up")
            up_05()
            upColor[thisDom].className += " sortStatuActive"

        }
        else if(e.target.getAttribute("data-sortStatu") == "up"){
            e.target.setAttribute("data-sortStatu","down")
            down_05()
            upColor[thisDom].classList.remove("sortStatuActive")
            downColor[thisDom].className += " sortStatuActive"
            
        }
        else if(e.target.getAttribute("data-sortStatu") == "down"){
            e.target.setAttribute("data-sortStatu","up")
            up_05()
            downColor[thisDom].classList.remove("sortStatuActive")
            upColor[thisDom].className += " sortStatuActive"
        }
    }
    else if(e.target.innerText == "交易量"){
        if(e.target.getAttribute("data-sortStatu") == "0"){
            e.target.setAttribute("data-sortStatu","up")
            up_06()
            upColor[thisDom].className += " sortStatuActive"

        }
        else if(e.target.getAttribute("data-sortStatu") == "up"){
            e.target.setAttribute("data-sortStatu","down")
            down_06()
            upColor[thisDom].classList.remove("sortStatuActive")
            downColor[thisDom].className += " sortStatuActive"
        }
        else if(e.target.getAttribute("data-sortStatu") == "down"){
            e.target.setAttribute("data-sortStatu","up")
            up_06()
            downColor[thisDom].classList.remove("sortStatuActive")
            upColor[thisDom].className += " sortStatuActive"
        }
    }
    
})

let itemName = document.querySelector(".itemName")
let itemMarkt = document.querySelector(".itemMarkt")
window.addEventListener("resize",function(){
    if(window.screen.width < 768){
        itemName.innerText = "作物"
        itemMarkt.innerText = "市場"
    }
    else{
        itemName.innerText = "作物名稱"
        itemMarkt.innerText = "市場名稱"
    }
})
document.addEventListener("DOMContentLoaded",function(){
    if(window.screen.width < 768){
        itemName.innerText = "作物"
        itemMarkt.innerText = "市場"
    }
})