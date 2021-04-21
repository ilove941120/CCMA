// 步驟一:思考邏輯 終極密碼 一定會有一個最終答案 所以先宣告最終答案  
//        先用Math.random*100 隨機產生出0~100之間數字 ,再用Math.floor去除小數這樣就能得出一個0~100隨機數字 ,
// 步驟二:設計區間數字讓訪客答案跟區間數字相連,以達成範圍效果
// 步驟三:設立各個事件條件
// 運用:while迴圈,if else條件判斷 ,break迴圈停止, contine只執行到這裡, alert呼叫顯示 ,prompt呼叫輸入 ,

console.log(answer);
let n1 = 0;
let n2 = 99;

while(true){
    let guess = prompt ("這是終極密馬挑戰,請輸入一個數字,在" + n1 + "~" + n2 + "之間數字");
    if( guess < n1 || guess > n2){
        alert("請輸入有效數字");
        continue;
    }
    if ( guess == answer){
        alert ("恭喜密碼是" + answer + "答對,通過這個終極密碼挑戰");
        break;
    }else if(guess < answer){
        n1 = guess;
    }else if(guess >answer){
        n2 = guess;
    }
}