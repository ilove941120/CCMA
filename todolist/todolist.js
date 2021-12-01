const doIng = document.querySelector(".addText")
const sentButton = document.querySelector(".sentButton")
const showContent = document.querySelector(".showContent")
const waitThingDOM = document.querySelector(".waitThingNum") 
const clearAll = document.querySelector(".deletFinish")
const showBar = document.querySelector(".showBar")
const showTitle = document.querySelectorAll(".showTitle")

// 資料
let thingData = [
    {
        thing:"1-deca joins | 一去不回來",
        finish:false
    },
    {
        thing:"2-康士坦的變化球 KST－美好的事可不可以發生在我身上",
        finish:false,

    },
    {
        thing:"3-荷爾蒙少年 Hormone Boys - 4:00A.M",
        finish:false,

    },
    {
        thing:"4-荷爾蒙少年",
        finish:true,

    },
    {
        thing:"5-大樹公",
        finish:true,

    },
]
allData()
waitNum()
// 新增事件
sentButton.addEventListener("click",function(){
    const str ={
        thing:doIng.value,
        finish:false
    }
    if(doIng.value.trim() == ""){
        alert("請輸入代辦事項不可空白")
        return
    }
    thingData.push(str)
    allData()
    waitNum()
    doIng.value = ""
})
// 資料Bar顯示狀態
showBar.addEventListener("click",function(e){
    for(i=0;i<=2;i++){
        showTitle[i].classList.remove("activeBar")
    }
    if(e.target.innerText == "全部"){
        showContent.setAttribute("data-statu","1")
        e.target.className += " activeBar"
        allData()
    }
    else if(e.target.innerText == "待完成"){
        showContent.setAttribute("data-statu","2")
        e.target.className += " activeBar"
        waitThingData()
    }
    else if(e.target.innerText == "已完成"){
        showContent.setAttribute("data-statu","3")
        e.target.className += " activeBar"
        finishThingData()
    }
})
// 操控資料顯示畫面
showContent.addEventListener("click",function(e){
    let itemID = e.target.getAttribute("date-num")
    let deleteID = e.target.getAttribute("date-num")
    // 點擊刪除事件
    console.log(e.target)
    if(e.target.nodeName == "IMG"){
        thingData.splice(deleteID,1)
    }
    // 點擊完成或移除完成 事件
    // 全部畫面
    if(showContent.getAttribute("data-statu") == "1"){
        if(e.target.className == "textStatu"){
            e.target.classList.add("active")
            e.target.previousElementSibling.className="finishThing"
            thingData[itemID].finish = true
        }
        else if(e.target.className == "textStatu active"){
            e.target.className ="textStatu"
            e.target.previousElementSibling.className="waitThing"
            thingData[itemID].finish = false
        }
        allData()
    }
    // 待辦事項畫面
    else if(showContent.getAttribute("data-statu") == "2"){
        if(e.target.className == "textStatu"){
            e.target.classList.add("active")
            e.target.previousElementSibling.className="finishThing"
            thingData[itemID].finish = true
    
        }
        else if(e.target.className == "textStatu active"){
            e.target.className ="textStatu"
            e.target.previousElementSibling.className="waitThing"
            thingData[itemID].finish = false
        }
        waitThingData()

    }
    // 完成事項畫面
    else if(showContent.getAttribute("data-statu") == "3"){
        if(e.target.className == "textStatu"){
            e.target.classList.add("active")
            e.target.previousElementSibling.className="finishThing"
            thingData[itemID].finish = true
    
        }
        else if(e.target.className == "textStatu active"){
            e.target.className ="textStatu"
            e.target.previousElementSibling.className="waitThing"
            thingData[itemID].finish = false
        }
        finishThingData()

    }
    waitNum()
        
})
// 清除全部事件
clearAll.addEventListener("click",function(){
    thingData = thingData.filter(function(item){
        return item.finish!=true
    })
    allData()
    }
)

// 全部資料渲染
function allData(){
    let showItem =``
    thingData.forEach(function(item,index){
        if(item.finish == false){
            showItem+= `<div class="showItem" id=showItem${index} >
                <div class="waitThing"></div>
                <div class="textStatu" date-num =${index}>${item.thing}</div>
                <span  class="deleteButton" >
                    <img date-num =${index} src="https://hexschool.github.io/js-todo/assets/cancel.jpg" alt="" >
                </span>
            </div>`
        }
        else{
            showItem+= `<div class="showItem" id=showItem${index} >
                <div class="finishThing"></div>
                <div class="textStatu active" date-num =${index}>${item.thing}</div>
                <span  class="deleteButton" >
                    <img date-num =${index} src="https://hexschool.github.io/js-todo/assets/cancel.jpg" alt="" >
                </span>
            </div>`
        }
        
    })
    showContent.innerHTML = showItem

}
// 待完成資料渲染
function waitThingData(){
    let showItem =``
    thingData.forEach(function(item,index){
        if(item.finish == false){
            showItem+= `<div class="showItem" id=showItem${index} >
                <div class="waitThing"></div>
                <div class="textStatu" date-num =${index}>${item.thing}</div>
                <span  class="deleteButton" >
                    <img date-num =${index} src="https://hexschool.github.io/js-todo/assets/cancel.jpg" alt="" >
                </span>
            </div>`
        }
    })
    showContent.innerHTML = showItem
}
// 已完成資料渲染
function finishThingData(){
    let showItem =``
    thingData.forEach(function(item,index){
        if(item.finish == true){
            showItem+= `<div class="showItem" id=showItem${index} >
                <div class="finishThing"></div>
                <div class="textStatu active" date-num =${index}>${item.thing}</div>
                <span  class="deleteButton" >
                    <img date-num =${index} src="https://hexschool.github.io/js-todo/assets/cancel.jpg" alt="" >
                </span>
            </div>`
        }
        showContent.innerHTML = showItem
    })
    
}

// 待完成項目數
function waitNum(){
    let waitNum = 0
    thingData.forEach(function(item){
        if(item.finish == false){
            waitNum+=1
        }
    })
    waitThingDOM.textContent = `${waitNum}個待完成項目`
}