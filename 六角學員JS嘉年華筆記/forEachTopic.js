let data = [
    {
        name:"A充電站",
        charge:"免費"
    },
    {
        name:"B充電站",
        charge:"投幣式"
    },
    {
        name:"C充電站",
        charge:"免費"
    },
    {
        name:"D充電站",
        charge:"免費"
    },
    {
        name:"E充電站",
        charge:"投幣式"
    },
    {
        name:"F充電站",
        charge:"投幣式"
    },
    {
        name:"G充電站",
        charge:"免費"
    },
    {
        name:"H充電站",
        charge:"免費"
    },
    {
        name:"I充電站",
        charge:"免費"
    },
]

// const allButton = document.querySelector(".allButton")
// const freeButton = document.querySelector(".freeButton")
// const payButton = document.querySelector(".payButton")
const dataContent = document.querySelector(".dataContent ul")
const sentButton = document.querySelector(".sentButton")
const stationFliter = document.querySelector(".filterBlock") 

stationFliter.addEventListener("click",function(e){
    if(e.target.value == undefined ){
        console.log("你點到空白區域了")
        return
    }
    let str = ""
    data.forEach(function(item,index){
        if(e.target.value == item.charge){
            str+=`<li>${item.name}，${item.charge}</li>`
        }
        else if(e.target.value == "全部"){
            str+=`<li>${item.name}，${item.charge}</li>`
        }
    })
    dataContent.innerHTML = str
    
    // else if(e.target.value == "全部"){
    //     allData()
    // }
    // else if(e.target.value == "免費"){
    //     freeData()
    // }
    // else if(e.target.value == "投幣式"){
    //     payData()
    // }
    console.log(e.target.value == undefined)

})  

// ---------

// 進入顯示全部資料
allData()

// 新增資料
sentButton.addEventListener("click",function(e){
    e.preventDefault();
    let inputText = document.getElementById("inputText").value
    let selectValue = document.getElementById("chargeData").value
    console.log(inputText ,selectValue)
    data.push({
        name:inputText,
        charge:selectValue
    })
    allData()
console.log(data)

})
// 全部資料
function allData(){
    let str = ""
    data.forEach(function(item,index){
        let liContent = `<li>${item.name}，${item.charge}</li>`
        str+=liContent
    })
    dataContent.innerHTML = str
}
// // 免費資料
// function freeData(){
//     let str = ""
//     data.forEach(function(item,index){
//         let liContent = `<li>${item.name}，${item.charge}</li>`
//         if(item.charge == "免費"){
//             str+=liContent
//         }
//     })
//     dataContent.innerHTML = str
// }
// // 投幣式資料
// function payData(){
//     let str = ""
//     data.forEach(function(item,index){
//         let liContent = `<li>${item.name}，${item.charge}</li>`
//         if(item.charge == "投幣式"){
//             str+=liContent
//         }
//     })
//     dataContent.innerHTML = str
// }



// // 全部資料按鈕
// allButton.addEventListener("click",function(){
//     allData()
// })
// // 免費充電站按鈕
// freeButton.addEventListener("click",function(){
//     let str = ""
//     data.forEach(function(item,index){
//         let liContent = `<li>${item.name}，${item.charge}</li>`
//         if(item.charge == "免費"){
//             str+=liContent
//         }
//     })
//     dataContent.innerHTML = str
// })
// // 付費充電站按鈕
// payButton.addEventListener("click",function(){
//     let str = ""
//     data.forEach(function(item,index){
//         let liContent = `<li>${item.name}，${item.charge}</li>`
//         if(item.charge == "投幣式"){
//             str+=liContent
//         }
//     })
//     dataContent.innerHTML = str
// })


