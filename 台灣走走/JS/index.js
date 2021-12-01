
// 活動照片
const scenes3Content = document.querySelector(".scenes3Content")
axios.get("https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$top=30&$format=JSON")

.then(function(response){
    const thisData = response.data;
    let str =""
    let n1 =0;
    thisData.some(function(item){
        if(item.Picture.PictureUrl1){
            str += `
            <div class="activityItem">
                <div class="activityPhoto">
                    <img src="${item.Picture.PictureUrl1}" alt="">
                </div>
                <div class="activityContent">
                    <div class="activityData">${item.StartTime}</div>
                    <div class="activityName">${item.Name}</div>
                    <div class="activityDown">
                        <div class="activityPlace">${item.City}</div>
                        <a href="./attractionsPage.html"  class="activityMore">詳細介紹</a>
                    </div>
                </div>
            </div>
            `
            n1+=1
            console.log(n1)
        }
        return n1==4
    })
    scenes3Content.innerHTML = str    
});

// 熱門打卡景點
const attractionsContent = document.querySelector(".attractionsContent")
const slider = document.querySelector(".slider")
axios.get("https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30&$format=JSON")

.then(function(response){
    const thisData = response.data;
    let str =""
    let str2 = ""
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
            str2 += `
            <div class="sliderItem">
                <img src="${item.Picture.PictureUrl1}" alt="">
                <span class="placeText">| ${item.Name}</span>
            </div>
            `
            n1+=1
            console.log(n1)
        }
        return n1==4
    })
    attractionsContent.innerHTML = str    
    slider.innerHTML = str2   
    $('.slider').slick({
        dots: true,
        arrows: true,
        autoplay: true,
    });
});
// 一再回訪美食
const foodContent = document.querySelector(".foodContent")
axios.get("https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$top=30&$format=JSON")

.then(function(response){
    const thisData = response.data;
    let str =""
    let n1 =0;
    thisData.some(function(item){
        if(item.Picture.PictureUrl1){
            str += `
            <div class="foodItem">
                <div class="foodPhoto">
                    <img src="${item.Picture.PictureUrl1}" alt="">
                </div>
                <div class="foodName">${item.Name}</div>
                <div class="foodPlace">${item.Address}</div>
            </div>
            `
            n1+=1
            console.log(n1)
        }
        return n1==4
    })
    foodContent.innerHTML = str    
});



