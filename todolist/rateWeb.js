const url = "https://hexschool.github.io/js-filter-data/data.json"
const cropSet = document.querySelector("#crop")
const seachGroup = document.querySelector(".seach-group")
const dataRanderBlock = document.querySelector(".js-sort-advanced")

let data
let showData =[]
axios.get(url)
    .then(function (response) {
        data=response.data.filter(i=>i.作物名稱)
    });

//關鍵字搜尋 
seachGroup.addEventListener("click",function(e){
    let str =  `
    <tr>
        <th width="16.6%">作物名稱</th>
        <th width="16.6%">市場名稱</th>
        <th  width="16.6%">
            <div class="inline-flex sort-advanced">上價
            <span>
                <i data-price="上價" data-sort="up" class="fas fa-caret-up"></i>
                
                <i data-price="上價" data-sort="down" class="fas fa-caret-down"></i>
            </span>
            </div>
        </th>
        <th width="16.6%">
            <div class="inline-flex sort-advanced">中價
            <span>
                <i data-price="中價" data-sort="up" class="fas fa-caret-up"></i>
                
                <i data-price="中價" data-sort="down" class="fas fa-caret-down"></i>
            </span>
            </div>
        </th>
        <th width="16.6%">
            <div class="inline-flex sort-advanced">下價
            <span>
                <i data-price="下價" data-sort="up" class="fas fa-caret-up"></i>
                
                <i data-price="下價" data-sort="down" class="fas fa-caret-down"></i>
            </span>
            </div>
        </th>
        <th width="16.6%">
            <div class="inline-flex sort-advanced">平均價
            <span>
            <i data-price="平均價" data-sort="up" class="fas fa-caret-up"></i>
                
                <i data-price="平均價" data-sort="down" class="fas fa-caret-down"></i>
            </span>
            </div>
        </th>
        <th width="16.6%">
            <div class="inline-flex sort-advanced">交易量
            <span>
                <i data-price="交易量" data-sort="up" class="fas fa-caret-up"></i>
                
                <i data-price="交易量" data-sort="down" class="fas fa-caret-down"></i>
            </span>
            </div>
        </th>
        </tr>
    `
    if(e.target.nodeName == "BUTTON"){
        data.forEach(function(item){
            if(item.作物名稱.match(cropSet.value)){
                console.log(item)
                str += `
                <tr>
                <th width="16.6%">${item.作物名稱}</th>
                <th width="16.6%">${item.市場名稱}</th>
                <th  width="16.6%">
                  <div class="inline-flex sort-advanced">${item.上價}
                    <span>
                      <i data-price="上價" data-sort="up" class="fas fa-caret-up"></i>
                      
                      <i data-price="上價" data-sort="down" class="fas fa-caret-down"></i>
                    </span>
                  </div>
                </th>
                <th width="16.6%">
                  <div class="inline-flex sort-advanced">${item.中價}
                    <span>
                       <i data-price="中價" data-sort="up" class="fas fa-caret-up"></i>
                      
                      <i data-price="中價" data-sort="down" class="fas fa-caret-down"></i>
                    </span>
                  </div>
                </th>
                <th width="16.6%">
                  <div class="inline-flex sort-advanced">${item.下價}
                    <span>
                       <i data-price="下價" data-sort="up" class="fas fa-caret-up"></i>
                      
                      <i data-price="下價" data-sort="down" class="fas fa-caret-down"></i>
                    </span>
                  </div>
                </th>
                <th width="16.6%">
                  <div class="inline-flex sort-advanced">${item.平均價}
                    <span>
                    <i data-price="平均價" data-sort="up" class="fas fa-caret-up"></i>
                      
                      <i data-price="平均價" data-sort="down" class="fas fa-caret-down"></i>
                    </span>
                  </div>
                </th>
                <th width="16.6%">
                  <div class="inline-flex sort-advanced">${item.交易量}
                    <span>
                     <i data-price="交易量" data-sort="up" class="fas fa-caret-up"></i>
                      
                      <i data-price="交易量" data-sort="down" class="fas fa-caret-down"></i>
                    </span>
                  </div>
                </th>
              </tr>
                `
            }
            else{
                str += ""
            }
        })
    dataRanderBlock.innerHTML = str
    }
})

const priceUpDown = document.querySelector("fas fa-caret-up")
// priceUpDown.addEventListener("click",function(){

// })
dataRanderBlock.addEventListener("click",function(e){
    // if(e.target.)
    console.log(e)
})


string str ="";
