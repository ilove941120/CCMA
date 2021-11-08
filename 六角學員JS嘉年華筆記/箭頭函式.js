// 函式 陳述式  :運作的時候會把 函式放在最上面,所以當 numA()在函式前面或後面被呼叫都會被執行到
function numA(x){
    return x + x
}
// 函式 表達式  :把函式宣告在變數裡面,所以只有在變數後面 出現才會執行,在前面的話會出現錯誤找不到
const numB = function(x){
    return x + x
}
// 箭頭函式
const numC = (x) => {
    return x + x
}

const numD = (x,y) => {
    const a = 37
    const b = 43
    return (a+b) * ( x + y)
}

console.log(numD(5,8))

// 箭頭函式縮寫
// 1.不用大括號(會用到回傳,且回傳只有一行)
const numE = (x) => `數字相乘${x * x}`
console.log(numE(4))
// 2.如果只有一個參數可以省略參數括號(有兩個參數就還是要用括號)
const numF = x => `數字相乘${x * x}`
console.log(numF(5))
// 3.沒有參數還是要有括號
const numG = () => `數字相乘${9}`
console.log(numG())
// map filter 也可以運用
const numData = [1,15,25,125,625]
// 表達式
// const numH = numData.map(function(item){
//     return item+5
// })
// 箭頭函式
// const numH = numData.map((item) =>{
//     return item+5
// })
// 箭頭函式 縮寫
// const numH = numData.map((item) => item+5)
// 箭頭函式 再縮寫
const numH = numData.map(item => item+5)
console.log(numH)