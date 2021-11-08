//近期水果售價，請勿更動
let applePrice = 50;
let mangoPrice = 30;
let guavaPrice = 30;
let bananaPrice = 20;
let papayaPrice = 40;
let cost;

cost = applePrice*1+mangoPrice*2+guavaPrice*1
console.log(`小明總共買了${cost}元`)


//醬油、鹽售價，請勿更動
const soySaucePrice = 80;
const saltPrice = 40;
let sale = 0.9;
let mingMoney = 200;

// mingMoney = mingMoney-(soySaucePrice*1+saltPrice*1)*sale
mingMoney -= (soySaucePrice*1+saltPrice*1)*sale
console.log(`小明還剩${mingMoney}元`)

let cabbageNum = 12;
//請依早、中、晚的順序去記算高麗菜數量，並使用 console.log 印出最終數量
cabbageNum -= 2;
cabbageNum -= 3;
cabbageNum += 1;
console.log(`農夫的高麗菜剩下${cabbageNum}顆`)