const inputClick = document.querySelector(".inputClick")
const title = document.querySelector(".title")
inputClick.addEventListener("click",function(e){
    title.textContent = "嗜愛動物"
    console.log(e)
})

let moneyNum = 0
const inputAddOne = document.querySelector(".addOne")
const money = document.querySelector(".money")
inputAddOne.addEventListener("click",function(){
    moneyNum+=1
    money.textContent = moneyNum
})
const inputLowOne =document.querySelector(".lowOne")
inputLowOne.addEventListener("click",function(){
    moneyNum-=1
    money.textContent = moneyNum
})

const abox5 = document.querySelector('.abox5')
const aboxTitle = document.querySelector(".aboxTitle")
const aboxContent = document.querySelector(".aboxContent")

console.log(abox5.innerHTML)
abox5.addEventListener("click",function(e){
    console.log(e)
    if(e.target.className == "abox"){
        alert("你點到白色區域囉")
    }
    if(e.target.nodeName == "A"){
        e.preventDefault()
        console.log("你有點擊到了")
        aboxTitle.textContent = "再等一下就天亮了";
        aboxContent.innerHTML = `
        <iframe width="100%" height="600" src="https://www.youtube.com/embed/HgV11MjLdtU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `
    }
})
// 滑鼠移動
// abox5.addEventListener("mousemove",function(e){
//     console.log(e)
//     if(e.target.className == "abox"){
//         alert("你點到白色區域囉")
//     }
// })