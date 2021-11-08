// 1
let a = 1 + "我好棒";
// 1我好棒 string
let b = 1 * "我好棒";
// NaN number
let c = 2 > 1;
// true boolean
let d = 1 < 2;
// false boolean
let e;
// undefined、undefined

// 2
let puddingNum = 15;
puddingNum -= 3+5-10+2
console.log(`布丁還有${puddingNum}顆`)

// 3
//帳單從零開始計算
let bill = 0 ;
const blackTeaPrice = 30;
let blackTeaNum = 2;
bill += blackTeaPrice*blackTeaNum;
//請接續步驟指引4，協助小美算出帳單金額
const greenTeaPrice = 25
let greenTeaNum =4
bill += greenTeaPrice*greenTeaNum
const milkTeaPrice = 50
let milkTeaNum = 6
bill += milkTeaPrice*milkTeaNum

console.log(`小美總共花了${bill}元`)

// 4
let number = "123";//將 number 轉型為數字
let string = 123;//將 string 轉型為字串
let myEmail ="  1235487@gmail.com";//請將 myEmail 的空白過濾掉

parseInt(number)
string.toString()

console.log(typeof(number))
console.log(typeof(string))
console.log(myEmail.trim())