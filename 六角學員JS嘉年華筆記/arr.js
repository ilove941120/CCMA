// 語法map,可以把原本的陣列做特定的處理 重新組合回傳新的陣列
// 不影響原本陣列
// 計算

const see = document.querySelector(".see")
const liBlock = document.querySelector(".liBlock")
let numArr = [1,7,9,15,27]
let newNumArr =numArr.map(function(item){
    return item*item
})
console.log(newNumArr)
see.textContent = newNumArr

// 比大小
let bigArr = numArr.map(function(item){
    return item>10
})
console.log(bigArr)
see.textContent = bigArr
// 轉換成物件
let smallArr = numArr.map(function(item){
    let obj ={}
    obj.checkNum = item<10
    return obj
})
console.log(smallArr)
let str =""
smallArr.forEach(function(item){
    if(item.checkNum == false){
        console.log(item)
        str += `<li>${item.checkNum}</li>`
    }
    liBlock.innerHTML = str
})

// JS array filter 篩選
// 1.篩選出符合條件的陣列,然後組合回傳新的陣列
// 2.不影響原本陣列
// 運用:比價網,下拉選擇市區,有誰及格

const filterArr = [1,10,25,47,120]
const newFilterArr = filterArr.filter(function(item){
    return item>20
})
console.log(newFilterArr)

const aClassScore = [
    {
        name:"Mary",
        score:80
    },
    {
        name:"Tom",
        score:70
    },
    {
        name:"Alex",
        score:95
    },
    {
        name:"Emma",
        score:100
    },
    {
        name:"Tony",
        score:65
    },
    {
        name:"Jimmy",
        score:40
    },
    {
        name:"Frank",
        score:27
    },
]
const newAClassScore = aClassScore.filter(function(item){
    return item.score >60
})
console.log(newAClassScore)

let str1 =""
newAClassScore.forEach(function(item){
    str1+= `${item.name}--`
})
see.textContent =  str1

// JS array find 篩選出符合條件的第一筆資料

const findArr = aClassScore.find(function(item){
    return item.score >60
})
console.log(findArr)

// JS array findIndex 
// 1.回傳符合條件資料的索引值
// 2.如果條件相同只會回傳第一個發現的索引值

const orderData = [
    {
        name:"小華",
        orderNum:"T123456"
    },
    {
        name:"小明",
        orderNum:"T123447"
    },
    {
        name:"小忠",
        orderNum:"T123427"
    },
    {
        name:"小風",
        orderNum:"T123471"
    },
    {
        name:"小徹",
        orderNum:"T123455"
    },
    {
        name:"小劉",
        orderNum:"T123455"
    }
]

const findOrder = orderData.findIndex(function(item){
    return item.orderNum == "T123427"
})
console.log(findOrder)
console.log(`這筆訂單是${orderData[findOrder].name}的`)