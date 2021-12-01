// 景點內頁
const attractionsPageTitle = document.querySelector(".attractionsPageTitle")
const intruduceContent = document.querySelector(".intruduceContent")
const OpenTime = document.querySelector(".OpenTime")
const Phone = document.querySelector(".Phone")
const Address = document.querySelector(".Address")
const TicketInfo = document.querySelector(".TicketInfo")
const Remarks = document.querySelector(".Remarks")
const slider = document.querySelector(".slider")
axios.get("https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$filter=contains(ID%2C'C1_315080500H_000068')&$top=30&$format=JSON")

.then(function(response){
    const thisData = response.data;
    console.log(thisData[0])
    attractionsPageTitle.innerHTML =  `<h3>${thisData[0].Name}</h3>`
    intruduceContent.innerHTML =  `${thisData[0].DescriptionDetail}`
    OpenTime.innerHTML = `<span>開放時間：</span>${thisData[0].OpenTime}`
    Phone.innerHTML = `<span>服務電話：</span>${thisData[0].Phone}`
    Address.innerHTML = `<span>景點地址：</span>${thisData[0].Address}`
    TicketInfo.innerHTML = `<span>票價資訊：</span>${thisData[0].TicketInfo}`
    Remarks.innerHTML = `<span>注意事項：</span> <div class="RemarksBox"> ${thisData[0].Remarks}</div>`
    slider.innerHTML =  `<img src=${thisData[0].Picture.PictureUrl1} alt="">`
});


const attractionsContent = document.querySelector(".attractionsContent")
axios.get("https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30&$format=JSON")

.then(function(response){
    const thisData = response.data;
    let str =""
    let n1 =0;
    thisData.some(function(item){
        if(item.Picture.PictureUrl1){
            str += `
            <div class="attractionsItem">
                <div class="attractionsPhoto">
                <img src="${item.Picture.PictureUrl1}" alt="">
                </div>
                <div class="attractionsName">${item.Name}</div>
                <div class="attractionsPlace">${item.Address}</div>
            </div>
            `
            n1+=1
            console.log(n1)
        }
        return n1==4
    })
    attractionsContent.innerHTML = str    
});