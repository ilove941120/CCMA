console.log("歡迎")

const el = document.querySelector(".box1")
el.textContent = "HEHEEHEHE";

const mainEl = document.querySelector(".main")
mainEl.innerHTML = `<h1>測試完畢</h1>`

const podcastMm = document.querySelector(".podcastMm");
let mmLink = "https://www.youtube.com/c/MARCORANGE";
let mmText = "上班可以聽";
let content = `<a class="aTest" href="${mmLink}">${mmText}</a>`
podcastMm.innerHTML = content

const  aTest = document.querySelector(".aTest")
aTest.setAttribute("href","https://www.youtube.com/watch?v=zvEEZy5AFTo&ab_channel=%E4%B8%8A%E7%8F%AD%E5%8F%AF%E4%BB%A5%E8%81%BDLWW")
aTest.setAttribute("class","aTest red")

const inputTxt = document.querySelector(".txt")
inputTxt.value = "一去不回";
const listEx = document.querySelector(".listEx")
listEx.value = 2

const mylinkA =document.querySelectorAll('a')
console.log(mylinkA)
mylinkA[1].setAttribute("class","blue")