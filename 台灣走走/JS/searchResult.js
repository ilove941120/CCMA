const keyInput = document.querySelector(".keyInput")
const searchResultBlock = document.querySelector(".searchResultBlock")
const search = document.querySelector(".search")
search.addEventListener("click",function(){
    
    let key = keyInput.value
    if()
    axios.get("https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$top=30&$format=JSON")
    .then(function(response){
        const thisData = response.data;
        let str =""
        if(response.Name)
    })
})