let themesData = [
    {
        ID:1,
        photo:"./photo/1.png",
        name:"自然風景類",
    },
    {
        ID:2,
        photo:"./photo/2.png",
        name:"觀光工廠類",
    },
    {
        ID:3,
        photo:"./photo/3.png",
        name:"遊憩類",
    },
    {
        ID:4,
        photo:"./photo/4.png",
        name:"休閒農場類",
    },
    {
        ID:5,
        photo:"./photo/5.png",
        name:"生態類",
    },
    {
        ID:6,
        photo:"./photo/6.png",
        name:"溫泉類",
    },
    {
        ID:7,
        photo:"./photo/7.png",
        name:"古蹟類",
    },
]
const themesBlock = document.querySelector(".themesBlock")
let str = ""
themesData.forEach(function(item){
    str+=`
        <a href="#" class="themeItem">
            <img src="${item.photo}" alt="">
            <span>${item.name}</span>
        </a>
    `
})
themesBlock.innerHTML = str