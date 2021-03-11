// HKD
var HKD_max = 5;
var HKD_min = 3;
var HKD_new = HKD();
var HKD_old;
var HKD_new = setInterval(function () {
  HKD();
}, 1000);
function HKD() {
  let HKD =
    Math.floor(
      (Math.random() * (HKD_max - HKD_min + 1) + HKD_min) * 100
    ) / 100;
  $(".box2 span").text("答案" + HKD + "!!!");
  if (HKD > HKD_old) {
    $(".box2 span").removeClass();
    $(".box2 span").addClass("cl_red");
    console.log("HKD" + HKD + "比" + HKD_old + "較大所以顏色是紅色");
  } else if (HKD < HKD_old) {
    $(".box2 span").removeClass();
    $(".box2 span").addClass("cl_green");
    console.log("HKD" + HKD + "比" + HKD_old + "比較小所以顏色是綠色");
  } else {
    console.log("第一筆HKD" + HKD + "顏色是黑色");
    $(".box2 span").addClass("cl_black");
  }
  HKD_old = HKD;
}
// GPB
var GPB_max = 39;
var GPB_min = 41;
var GPB_new = GPB();
var GPB_old;
var GPB_new = setInterval(function () {
  GPB();
}, 1000);
function GPB() {
  let GPB =
    Math.floor(
      (Math.random() * (GPB_max - GPB_min + 1) + GPB_min) * 100
    ) / 100;
  $(".box3 span").text("答案" + GPB + "!!!");
  if (GPB > GPB_old) {
    $(".box3 span").removeClass();
    $(".box3 span").addClass("cl_red");
    console.log("GPB" + GPB + "比" + GPB_old + "較大所以顏色是紅色");
  } else if (GPB < GPB_old) {
    $(".box3 span").removeClass();
    $(".box3 span").addClass("cl_green");
    console.log("GPB" + GPB + "比" + GPB_old + "比較小所以顏色是綠色");
  } else {
    console.log("第一筆GPB" + GPB + "顏色是黑色");
    $(".box3 span").addClass("cl_black");
  }
  GPB_old = GPB;
}
// AUD
var AUD_max = 21;
var AUD_min = 23;
var AUD_new = AUD();
var AUD_old;
var AUD_new = setInterval(function () {
  AUD();
}, 1000);
function AUD() {
  let AUD =
    Math.floor(
      (Math.random() * (AUD_max - AUD_min + 1) + AUD_min) * 100
    ) / 100;
  $(".box4 span").text("答案" + AUD + "!!!");
  if (AUD > AUD_old) {
    $(".box4 span").removeClass();
    $(".box4 span").addClass("cl_red");
    console.log("AUD" + AUD + "比" + AUD_old + "較大所以顏色是紅色");
  } else if (AUD < AUD_old) {
    $(".box4 span").removeClass();
    $(".box4 span").addClass("cl_green");
    console.log("AUD" + AUD + "比" + AUD_old + "比較小所以顏色是綠色");
  } else {
    console.log("第一筆AUD" + AUD + "顏色是黑色");
    $(".box4 span").addClass("cl_black");
  }
  AUD_old = AUD;
}
// CAD
var CAD_max = 22;
var CAD_min = 24;
var CAD_new = CAD();
var CAD_old;
var CAD_new = setInterval(function () {
  CAD();
}, 1000);
function CAD() {
  let CAD =
    Math.floor(
      (Math.random() * (CAD_max - CAD_min + 1) + CAD_min) * 100
    ) / 100;
  $(".box5 span").text("答案" + CAD + "!!!");
  if (CAD > CAD_old) {
    $(".box5 span").removeClass();
    $(".box5 span").addClass("cl_red");
    console.log("CAD" + CAD + "比" + CAD_old + "較大所以顏色是紅色");
  } else if (CAD < CAD_old) {
    $(".box5 span").removeClass();
    $(".box5 span").addClass("cl_green");
    console.log("CAD" + CAD + "比" + CAD_old + "比較小所以顏色是綠色");
  } else {
    console.log("第一筆CAD" + CAD + "顏色是黑色");
    $(".box5 span").addClass("cl_black");
  }
  CAD_old = CAD;
}
