

const box = document.querySelector(".box")

box.addEventListener("click",function(e){
    // title.getAttribute()
    // console.log(e.target.textContent)
    // console.log(e.target.getAttribute("class"))
    if(e.target.getAttribute("class") == "view"){
        console.log(e.target.getAttribute("value"))
    }
    if(e.target.getAttribute("class") == "title"){
        console.log(e.target.getAttribute("data-content"))
    }
})

//  實作toOList
const toOList = document.querySelector(".toOList")
const text = document.querySelector(".text")
const list = document.querySelector(".list")
// 自己方法
// toOList.addEventListener("click",function(e){
//     if(e.target.getAttribute("class") == "save"){
//         let str = document.createElement("li")
//         str.innerHTML = `${text.value}<input type="button" class="delete" value="delete">`
//         list.appendChild(str)
//     }
//     if(e.target.getAttribute("class") == "delete"){
//         e.target.parentNode.remove()
//     }
// })
// 老師

data =[
    {content:"代辦事項1"},
    {content:"代辦事項2"},
    {content:"代辦事項3"},
    {content:"代辦事項4"},
    
    ]

toOList.addEventListener("click",function(e){
    if(e.target.getAttribute("class") == "save"){
        newData()
        allData()
    }
    if(e.target.getAttribute("class") == "delete"){
        // 方法一 DOM刪除
        // e.target.parentNode.remove()
        // 方法二 陣列刪除 刪除後要再更新資料
        let num =e.target.getAttribute("data-num")
        data.splice(num,1)
        allData()
    }
})

function allData(){
    let str = ""
    data.forEach(function(item,index){
        let content =`<li>${item.content}<input type="button" class="delete" value="delete" data-num="${index}"></li>`
        str+= content
    })
    list.innerHTML = str
}
function newData(){
    // 方法一直接puch
    data.push(
        {
            content:text.value
        } 
    )
    // 方法二 宣告物件在puch到data陣列李
    // let obj ={}
    // obj.content = text.value
    // data.push(obj)
}