 // RWD列表點擊彈出關閉
 $(".menuRWDItemBlock").hide()
 $(".menuRWDClose").hide()
 $(".menuRWD").click(function(){
     if($(".menuRWDClose").is(":hidden")){
         $(".menuRWDClose").show()
         $(".menuRWDopen").hide()
         $(".menuRWDItemBlock").show()
         $(".menuRWDItemBlock").addClass("show");
     }
     else{
         $(".menuRWDClose").hide()
         $(".menuRWDopen").show()
         $(".menuRWDItemBlock").removeClass("show");
         $(".menuRWDItemBlock").slideUp()

     }
     
 })


 $(window).resize(function(){
     if($(window).width() > 768){
     $(".menuRWDItemBlock").hide()
     $(".menuRWDClose").hide()
     $(".menuRWDopen").show()
     $(".menuRWDItemBlock").removeClass("show");
 }
 })

 // Top按鈕
 $(document).scroll(function(){
    var windowTop = $(window).height()
    var windowScrollTop = $(window).scrollTop()
    var windowTotalTop = windowTop + windowScrollTop
    var topButtonTop = $(".topButton").offset().top

    if( windowScrollTop > 0){
        $(".topButton").addClass("showTop")
    }
    else{
        $(".topButton").removeClass("showTop")
    }
})


// index
// swiper輪播
var swiper1 = new Swiper('.swiper-container1', {
    allowTouchMove:false,
    loop:true,
    loopAdditionalSlides : 1,


});
var swiper2 = new Swiper('.swiper-container2', {
    controller: {
        control: swiper1, //控制Swiper1
    },
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 2.5,
    initialSlide:0,
    loop:true,
    loopAdditionalSlides : 1,
    // loopedSlides :8,
    spaceBetween : -40,
    coverflowEffect: {
    rotate: 0,
    stretch: 60,
    depth: 0,
    modifier: 1,
    slideShadows: true,
    },
    pagination: {
    el: '.swiper-pagination',
    },
    breakpoints: { 
//当宽度大于等于768
    768: { 
    slidesPerView: 2,
    spaceBetween: 20
    },
    //当宽度大于等于1280
    1280: {
    slidesPerView: 2.5,
    spaceBetween: 30
    }
},



});
// slick輪播
$('.slickBlockImg').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    asNavFor: '.slickBlockText'
    });
    $('.slickBlockText').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.slickBlockImg',
    arrows: false,
    dots: false,
    centerMode: false,
    focusOnSelect: true
});

// 動畫
$(document).ready(function(){
    // 共用設定
    var windowTop = $(window).height()
    var windowScrollTop = $(window).scrollTop()
    var windowTotalTop = windowTop + windowScrollTop

    // 物件位置宣告
    // 網頁
    var titleAnimationTop1 = $(".titleAnimation1").offset().top
    var titleAnimationTop2 = $(".titleAnimation2").offset().top

    var imgAnimationTop1 = $(".imgAnimation1").offset().top
    var imgAnimationTop2 = $(".imgAnimation2").offset().top
    var imgAnimationTop3 = $(".imgAnimation3").offset().top

    var buttonAnimation1Top = $(".buttonAnimation1").offset().top
    var buttonAnimation2Top = $(".buttonAnimation2").offset().top
    var buttonAnimation3Top = $(".buttonAnimation3").offset().top

    // RWD
    var titleAnimationRWDTop1 = $(".titleAnimationRWD1").offset().top
    var titleAnimationRWDTop2 = $(".titleAnimationRWD2").offset().top
    var titleAnimationRWDTop3 = $(".titleAnimationRWD3").offset().top
    var titleAnimationRWDTop4 = $(".titleAnimationRWD4").offset().top

    var buttonAnimationRWDTop1 = $(".buttonAnimationRWD1").offset().top
    var buttonAnimationRWDTop2 = $(".buttonAnimationRWD2").offset().top


    // 網頁版
    //標題
    if( windowTotalTop > titleAnimationTop1){
        $(".titleAnimation1").addClass("leftIn")
    }
    if( windowTotalTop > titleAnimationTop2){
        $(".titleAnimation2").addClass("leftIn")
    }
    //圖片
    if( windowTotalTop > imgAnimationTop1){
        $(".imgAnimation1").addClass("leftIn1s")
    }
    if( windowTotalTop > imgAnimationTop2){
        $(".imgAnimation2").addClass("leftIn")
    }
    if( windowTotalTop > imgAnimationTop3){
        $(".imgAnimation3").addClass("leftIn1s")
    }
    //按鈕
    if( windowTotalTop > buttonAnimation1Top){
        $(".buttonAnimation1").addClass("rightIn1_5s")
    }
    if( windowTotalTop > buttonAnimation2Top - 100){
        $(".buttonAnimation2").addClass("centerIn")
    }
    if( windowTotalTop > buttonAnimation3Top - 100){
        $(".buttonAnimation3").addClass("centerIn")
    }

    // 手機板
    //標題  
    if( windowTotalTop > titleAnimationRWDTop1){
        $(".titleAnimationRWD1").addClass("leftIn")
    }
    if( windowTotalTop > titleAnimationRWDTop2){
        $(".titleAnimationRWD2").addClass("leftIn")
    }
    if( windowTotalTop > titleAnimationRWDTop3){
        $(".titleAnimationRWD3").addClass("centerIn")
    }
    if( windowTotalTop > titleAnimationRWDTop4){
        $(".titleAnimationRWD4").addClass("centerIn")
    }
    //圖片
    //按鈕
    if( windowTotalTop > buttonAnimationRWDTop1){
        $(".buttonAnimationRWD1").addClass("rightIn")
    }
    if( windowTotalTop > buttonAnimationRWDTop2){
        $(".buttonAnimationRWD2").addClass("rightIn")
    }


})
$(document).scroll(function(){
    // 共用設定
    var windowTop = $(window).height()
    var windowScrollTop = $(window).scrollTop()
    var windowTotalTop = windowTop + windowScrollTop

    // 物件位置宣告
    // 網頁
    var titleAnimationTop1 = $(".titleAnimation1").offset().top
    var titleAnimationTop2 = $(".titleAnimation2").offset().top
    var titleAnimationTop3 = $(".titleAnimation3").offset().top
    var titleAnimationTop4 = $(".titleAnimation4").offset().top

    var imgAnimationTop1 = $(".imgAnimation1").offset().top
    var imgAnimationTop2 = $(".imgAnimation2").offset().top
    var imgAnimationTop3 = $(".imgAnimation3").offset().top

    var buttonAnimation1Top = $(".buttonAnimation1").offset().top
    var buttonAnimation2Top = $(".buttonAnimation2").offset().top
    var buttonAnimation3Top = $(".buttonAnimation3").offset().top

    // RWD
    var titleAnimationRWDTop1 = $(".titleAnimationRWD1").offset().top
    var titleAnimationRWDTop2 = $(".titleAnimationRWD2").offset().top
    var titleAnimationRWDTop3 = $(".titleAnimationRWD3").offset().top
    var titleAnimationRWDTop4 = $(".titleAnimationRWD4").offset().top

    var buttonAnimationRWDTop1 = $(".buttonAnimationRWD1").offset().top
    var buttonAnimationRWDTop2 = $(".buttonAnimationRWD2").offset().top



    //標題
    if( windowTotalTop > titleAnimationTop1){
        $(".titleAnimation1").addClass("leftIn")
    }
    else{
        $(".titleAnimation1").removeClass("leftIn")
    }
    if( windowTotalTop > titleAnimationTop2){
        $(".titleAnimation2").addClass("leftIn")
    }
    else{
        $(".titleAnimation2").removeClass("leftIn")
    }
    if( windowTotalTop > titleAnimationTop3){
        $(".titleAnimation3").addClass("rightIn")
    }
    else{
        $(".titleAnimation3").removeClass("rightIn")
    }
    if( windowTotalTop > titleAnimationTop4){
        $(".titleAnimation4").addClass("rightIn1_5s")
    }
    else{
        $(".titleAnimation4").removeClass("rightIn1_5s")
    }
    //圖片 
    if( windowTotalTop > imgAnimationTop1){
        $(".imgAnimation1").addClass("leftIn1s")
    }
    else{
        $(".imgAnimation1").removeClass("leftIn1s")
    }
    if( windowTotalTop > imgAnimationTop2){
        $(".imgAnimation2").addClass("leftIn")
    }
    else{
        $(".imgAnimation2").removeClass("leftIn")
    }
    if( windowTotalTop > imgAnimationTop3){
        $(".imgAnimation3").addClass("leftIn1s")
    }
    else{
        $(".imgAnimation3").removeClass("leftIn1s")
    }

    // 按鈕
    if( windowTotalTop > buttonAnimation1Top){
        $(".buttonAnimation1").addClass("rightIn1_5s")
    }
    else{
        $(".buttonAnimation1").removeClass("rightIn1_5s")
    }
    if( windowTotalTop > buttonAnimation2Top - 100){
        $(".buttonAnimation2").addClass("centerIn")
    }
    else{
        $(".buttonAnimation2").removeClass("centerIn")
    }
    if( windowTotalTop > buttonAnimation3Top - 100){
        $(".buttonAnimation3").addClass("centerIn")
    }
    else{
        $(".buttonAnimation3").removeClass("centerIn")
    }


    // RWD
    // 手機板
    //標題  
    if( windowTotalTop > titleAnimationRWDTop1){
        $(".titleAnimationRWD1").addClass("leftIn")
    }
    else{
        $(".titleAnimationRWD1").removeClass("leftIn")
    }
    if( windowTotalTop > titleAnimationRWDTop2){
        $(".titleAnimationRWD2").addClass("leftIn")
    }
    else{
        $(".titleAnimationRWD2").removeClass("leftIn")
    }
    if( windowTotalTop > titleAnimationRWDTop3){
        $(".titleAnimationRWD3").addClass("centerIn")
    }
    else{
        $(".titleAnimationRWD3").removeClass("centerIn")
    }
    if( windowTotalTop > titleAnimationRWDTop4){
        $(".titleAnimationRWD4").addClass("centerIn")
    }
    else{
        $(".titleAnimationRWD4").removeClass("centerIn")
    }

    // 按鈕
    if( windowTotalTop > buttonAnimationRWDTop1){
        $(".buttonAnimationRWD1").addClass("rightIn")
    }
    else{
        $(".buttonAnimationRWD1").removeClass("rightIn")
    }
    if( windowTotalTop > buttonAnimationRWDTop2){
        $(".buttonAnimationRWD2").addClass("rightIn")
    }
    else{
        $(".buttonAnimationRWD2").removeClass("rightIn")
    }


})
// index



// about
// 照片寬度等於睪固
$(document).ready(function(){
    // $(".aboutImg1").width()
    var nw =$(".aboutImg").width()
    $(".aboutImg").height(nw)

    var nw =$(".aboutImgRWD").width()
    $(".aboutImgRWD").height(nw)
})
$(window).resize(function(){
    var nw =$(".aboutImg").width()
    $(".aboutImg").height(nw)

    var nw =$(".aboutImgRWD").width()
    $(".aboutImgRWD").height(nw)
})
$(document).ready(function(){
    var windowTop = $(window).height()
    var windowScrollTop = $(window).scrollTop()
    var windowTotalTop = windowTop + windowScrollTop
    var titleAnimationTop1 = $(".titleAnimation1").offset().top
    var titleAnimationTop2 = $(".titleAnimation2").offset().top
    var titleAnimationTop3 = $(".titleAnimation3").offset().top
    var titleAnimationTopRWD1 = $(".titleAnimationRWD1").offset().top
    var titleAnimationTopRWD2 = $(".titleAnimationRWD2").offset().top
    var titleAnimationTopRWD3 = $(".titleAnimationRWD3").offset().top
    var imgAnimationTop1 = $(".imgAnimation1").offset().top
    var imgAnimationTop2 = $(".imgAnimation2").offset().top
    var imgAnimationTop3 = $(".imgAnimation3").offset().top
    var imgAnimationTopRWD1 = $(".imgAnimationRWD1").offset().top
    var imgAnimationTopRWD2 = $(".imgAnimationRWD2").offset().top
    var imgAnimationTopRWD3 = $(".imgAnimationRWD3").offset().top

    if( windowTop > titleAnimationTop1){
        $(".titleAnimation1").addClass("leftIn")
    }
    if( windowTop > titleAnimationTop2){
        $(".titleAnimation2").addClass("rightIn")
    }
    if( windowTop > titleAnimationTop3){
        $(".titleAnimation3").addClass("leftIn")
    }
    if( windowTop > titleAnimationTopRWD1){
        $(".titleAnimationRWD1").addClass("leftIn")
    }
    if( windowTop > titleAnimationTopRWD2){
        $(".titleAnimationRWD2").addClass("rightIn")
    }
    if( windowTop > titleAnimationTopRWD3){
        $(".titleAnimationRWD3").addClass("leftIn")
    }
    if( windowTop > imgAnimationTop1){
        $(".imgAnimation1").addClass("rightIn")
    }
    if( windowTop > imgAnimationTop2){
        $(".imgAnimation2").addClass("leftIn")
    }
    if( windowTop > imgAnimationTop3){
        $(".imgAnimation3").addClass("rightIn")
    }
    if( windowTop > imgAnimationTopRWD1){
        $(".imgAnimationRWD1").addClass("rightIn")
    }
    if( windowTop > imgAnimationTopRWD2){
        $(".imgAnimationRWD2").addClass("leftIn")
    }
    if( windowTop > imgAnimationTopRWD3){
        $(".imgAnimationRWD3").addClass("rightIn")
    }
})

$(document).scroll(function(){
    var windowTop = $(window).height()
    var windowScrollTop = $(window).scrollTop()
    var windowTotalTop = windowTop + windowScrollTop

    var titleAnimationTop1 = $(".titleAnimation1").offset().top
    var titleAnimationTop2 = $(".titleAnimation2").offset().top
    var titleAnimationTop3 = $(".titleAnimation3").offset().top
    var imgAnimationTop1 = $(".imgAnimation1").offset().top
    var imgAnimationTop2 = $(".imgAnimation2").offset().top
    var imgAnimationTop3 = $(".imgAnimation3").offset().top
    var titleAnimationTopRWD1 = $(".titleAnimationRWD1").offset().top
    var titleAnimationTopRWD2 = $(".titleAnimationRWD2").offset().top
    var titleAnimationTopRWD3 = $(".titleAnimationRWD3").offset().top
    var imgAnimationTopRWD1 = $(".imgAnimationRWD1").offset().top
    var imgAnimationTopRWD2 = $(".imgAnimationRWD2").offset().top
    var imgAnimationTopRWD3 = $(".imgAnimationRWD3").offset().top
    
    if( windowTotalTop > titleAnimationTop1){
        $(".titleAnimation1").addClass("leftIn")
    }
    else{
        $(".titleAnimation1").removeClass("leftIn")
    }
    if( windowTotalTop > titleAnimationTop2){
        $(".titleAnimation2").addClass("rightIn")
    }
    else{
        $(".titleAnimation2").removeClass("rightIn")
    }
    if( windowTotalTop > titleAnimationTop3){
        $(".titleAnimation3").addClass("leftIn")
    }
    else{
        $(".titleAnimation3").removeClass("leftIn")
    }
    if( windowTotalTop > titleAnimationTopRWD1){
        $(".titleAnimationRWD1").addClass("leftIn")
    }
    else{
        $(".titleAnimationRWD1").removeClass("leftIn")
    }
    if( windowTotalTop > titleAnimationTopRWD2){
        $(".titleAnimationRWD2").addClass("rightIn")
    }
    else{
        $(".titleAnimationRWD2").removeClass("rightIn")
    }
    if( windowTotalTop > titleAnimationTopRWD3){
        $(".titleAnimationRWD3").addClass("leftIn")
    }
    else{
        $(".titleAnimationRWD3").removeClass("leftIn")
    }
    if( windowTotalTop > imgAnimationTop1){
        $(".imgAnimation1").addClass("rightIn")
    }
    else{
        $(".imgAnimation1").removeClass("rightIn")
    }
    if( windowTotalTop > imgAnimationTop2){
        $(".imgAnimation2").addClass("leftIn")
    }
    else{
        $(".imgAnimation2").removeClass("leftIn")
    }
    if( windowTotalTop > imgAnimationTop3){
        $(".imgAnimation3").addClass("rightIn")
    }
    else{
        $(".imgAnimation3").removeClass("rightIn")
    }
    if( windowTotalTop > imgAnimationTopRWD1){
        $(".imgAnimationRWD1").addClass("rightIn")
    }
    else{
        $(".imgAnimationRWD1").removeClass("rightIn")
    }
    if( windowTotalTop > imgAnimationTopRWD2){
        $(".imgAnimationRWD2").addClass("leftIn")
    }
    else{
        $(".imgAnimationRWD2").removeClass("leftIn")
    }
    if( windowTotalTop > imgAnimationTopRWD3){
        $(".imgAnimationRWD3").addClass("rightIn")
    }
    else{
        $(".imgAnimationRWD3").removeClass("rightIn")
    }
    
})

// about


// contact
// 地圖高度
$(document).ready(function(){
    // $(".aboutImg1").width()
    var nw =$(".mapStyle").width()
    $(".mapStyle").height(nw)
})
$(window).resize(function(){
    var nw =$(".mapStyle").width()
    $(".mapStyle").height(nw)
})

$(document).ready(function(){
    var windowTop = $(window).height()
    var windowScrollTop = $(window).scrollTop()
    var windowTotalTop = windowTop + windowScrollTop
    var titleAnimationTop1 = $(".titleAnimation1").offset().top
    var titleAnimationRWDTop1 = $(".titleAnimationRWD1").offset().top
    var buttonAnimationTop = $(".buttonAnimation").offset().top
    var buttonAnimationRWDTop = $(".buttonAnimationRWD").offset().top

    if( windowTotalTop > titleAnimationTop1){
        $(".titleAnimation1").addClass("leftIn")
    }
    if( windowTotalTop > titleAnimationRWDTop1){
        $(".titleAnimationRWD1").addClass("leftIn")
    }
    if( windowTotalTop > buttonAnimationTop){
        $(".buttonAnimation").addClass("rightIn")
    }
    if( windowTotalTop > buttonAnimationRWDTop){
        $(".buttonAnimationRWD").addClass("rightIn")
    }

})
$(document).scroll(function(){
    var windowTop = $(window).height()
    var windowWidth = $(window).width()
    var windowScrollTop = $(window).scrollTop()
    var windowTotalTop = windowTop + windowScrollTop
    var titleAnimationTop1 = $(".titleAnimation1").offset().top
    var titleAnimationRWDTop1 = $(".titleAnimationRWD1").offset().top
    var buttonAnimationTop = $(".buttonAnimation").offset().top
    var buttonAnimationRWDTop = $(".buttonAnimationRWD").offset().top

    if( windowTotalTop > titleAnimationTop1){
        $(".titleAnimation1").addClass("leftIn")
    }
    else{
        $(".titleAnimation1").removeClass("leftIn")

    }
    if( windowTotalTop > titleAnimationRWDTop1){
        $(".titleAnimationRWD1").addClass("leftIn")
    }
    else{
        $(".titleAnimationRWD1").removeClass("leftIn")

    }
    if( windowTotalTop > buttonAnimationTop){
        $(".buttonAnimation").addClass("rightIn")
    }
    else{
        $(".buttonAnimation").removeClass("rightIn")
    }
    if( windowTotalTop > buttonAnimationRWDTop -100){
        $(".buttonAnimationRWD").addClass("centerIn")
    }
    else{
        $(".buttonAnimationRWD").removeClass("centerIn")
    }
    

})
// contact


// news
$(document).ready(function(){
    var windowTop = $(window).height()
    var windowScrollTop = $(window).scrollTop()
    var windowTotalTop = windowTop + windowScrollTop
    var titleAnimationTop1 = $(".titleAnimation1").offset().top
    var titleAnimationTop2 = $(".titleAnimation2").offset().top
    var titleAnimationTop3 = $(".titleAnimation3").offset().top
    var imgAnimationTop1 = $(".imgAnimation1").offset().top
    var imgAnimationTop2 = $(".imgAnimation2").offset().top
    var imgAnimationTop3 = $(".imgAnimation3").offset().top
    var titleAnimationTopRWD1 = $(".titleAnimationRWD1").offset().top
    var titleAnimationTopRWD2 = $(".titleAnimationRWD2").offset().top
    var titleAnimationTopRWD3 = $(".titleAnimationRWD3").offset().top

    if( windowTop > titleAnimationTop1){
        $(".titleAnimation1").addClass("rightIn")
    }
    if( windowTop > titleAnimationTop2){
        $(".titleAnimation2").addClass("rightIn")
    }
    if( windowTop > titleAnimationTop3){
        $(".titleAnimation3").addClass("rightIn")
    }
    if( windowTop > titleAnimationTopRWD1){
        $(".titleAnimationRWD1").addClass("centerIn")
    }
    if( windowTop > titleAnimationTopRWD2){
        $(".titleAnimationRWD2").addClass("centerIn")
    }
    if( windowTop > titleAnimationTopRWD3){
        $(".titleAnimationRWD3").addClass("centerIn")
    }
    if( windowTop > imgAnimationTop1){
        $(".imgAnimation1").addClass("leftIn")
    }
    if( windowTop > imgAnimationTop2){
        $(".imgAnimation2").addClass("leftIn")
    }
    if( windowTop > imgAnimationTop3){
        $(".imgAnimation3").addClass("leftIn")
    }
})

$(document).scroll(function(){
    var windowTop = $(window).height()
    var windowScrollTop = $(window).scrollTop()
    var windowTotalTop = windowTop + windowScrollTop

    var titleAnimationTop1 = $(".titleAnimation1").offset().top
    var titleAnimationTop2 = $(".titleAnimation2").offset().top
    var titleAnimationTop3 = $(".titleAnimation3").offset().top
    var imgAnimationTop1 = $(".imgAnimation1").offset().top
    var imgAnimationTop2 = $(".imgAnimation2").offset().top
    var imgAnimationTop3 = $(".imgAnimation3").offset().top
    var titleAnimationTopRWD1 = $(".titleAnimationRWD1").offset().top
    var titleAnimationTopRWD2 = $(".titleAnimationRWD2").offset().top
    var titleAnimationTopRWD3 = $(".titleAnimationRWD3").offset().top
    
    if( windowTotalTop > titleAnimationTop1){
        $(".titleAnimation1").addClass("rightIn")
    }
    else{
        $(".titleAnimation1").removeClass("rightIn")
    }
    if( windowTotalTop > titleAnimationTop2){
        $(".titleAnimation2").addClass("rightIn")
    }
    else{
        $(".titleAnimation2").removeClass("rightIn")
    }
    if( windowTotalTop > titleAnimationTop3){
        $(".titleAnimation3").addClass("rightIn")
    }
    else{
        $(".titleAnimation3").removeClass("rightIn")
    }
    if( windowTotalTop > titleAnimationTopRWD1){
        $(".titleAnimationRWD1").addClass("centerIn")
    }
    else{
        $(".titleAnimationRWD1").removeClass("centerIn")
    }
    if( windowTotalTop > titleAnimationTopRWD2){
        $(".titleAnimationRWD2").addClass("centerIn")
    }
    else{
        $(".titleAnimationRWD2").removeClass("centerIn")
    }
    if( windowTotalTop > titleAnimationTopRWD3){
        $(".titleAnimationRWD3").addClass("centerIn")
    }
    else{
        $(".titleAnimationRWD3").removeClass("centerIn")
    }
    if( windowTotalTop > imgAnimationTop1){
        $(".imgAnimation1").addClass("leftIn")
    }
    else{
        $(".imgAnimation1").removeClass("leftIn")
    }
    if( windowTotalTop > imgAnimationTop2){
        $(".imgAnimation2").addClass("leftIn")
    }
    else{
        $(".imgAnimation2").removeClass("leftIn")
    }
    if( windowTotalTop > imgAnimationTop3){
        $(".imgAnimation3").addClass("leftIn")
    }
    else{
        $(".imgAnimation3").removeClass("leftIn")
    }
    
})
// news

// newsInpage
$(document).ready(function(){
    var windowTop = $(window).height()
    var windowScrollTop = $(window).scrollTop()
    var windowTotalTop = windowTop + windowScrollTop
    var titleAnimationTop1 = $(".titleAnimation1").offset().top
    var imgAnimationTop1 = $(".imgAnimation1").offset().top
    var buttonAnimationTop = $(".buttonAnimation").offset().top
    var buttonAnimationRWDTop = $(".buttonAnimationRWD").offset().top


    if( windowTop > titleAnimationTop1){
        $(".titleAnimation1").addClass("centerIn")
    }
    if( windowTop > imgAnimationTop1 -100){
        $(".imgAnimation1").addClass("centerIn")
    }
    if( windowTop > buttonAnimationTop -100){
        $(".buttonAnimation").addClass("centerIn")
    }
    if( windowTop > buttonAnimationRWDTop){
        $(".buttonAnimationRWD").addClass("rightIn")
    }
    
})
$(document).scroll(function(){
    var windowTop = $(window).height()
    var windowScrollTop = $(window).scrollTop()
    var windowTotalTop = windowTop + windowScrollTop
    var titleAnimationTop1 = $(".titleAnimation1").offset().top
    var imgAnimationTop1 = $(".imgAnimation1").offset().top
    var buttonAnimationTop = $(".buttonAnimation").offset().top
    var buttonAnimationRWDTop = $(".buttonAnimationRWD").offset().top


    if( windowTotalTop > titleAnimationTop1){
        $(".titleAnimation1").addClass("centerIn")
    }
    else{
        $(".titleAnimation1").removeClass("centerIn")
    }
    if( windowTotalTop > imgAnimationTop1 - 100){
        $(".imgAnimation1").addClass("centerIn")
    }
    else{
        $(".imgAnimation1").removeClass("centerIn")
    }
    if( windowTotalTop > (buttonAnimationTop - 100)){
        $(".buttonAnimation").addClass("centerIn")
    }
    else{
        $(".buttonAnimation").removeClass("centerIn")
    }
    if( windowTotalTop > buttonAnimationRWDTop){
        $(".buttonAnimationRWD").addClass("rightIn")
    }
    else{
        $(".buttonAnimationRWD").removeClass("rightIn")
    }
})
// newsInpage


// productDescription
// 翻頁
                    
$(document).ready(function(){
    $("#my_album1140").wowBook({
    centeredWhenClosed:true,
    container: true,
    height : 600,
    width  : 900,

     });
     $("#my_album992").wowBook({
    centeredWhenClosed:true,
    container: true,
    height : 600,
    width  : 860,

     });
     $("#my_album600").wowBook({
    centeredWhenClosed:true,
    container: true,
    height : 400,
    width  : 600,

     });
})

// slick 輪播
$('.sliderBlock').slick();


//  網頁載入動畫
$(document).ready(function(){
    var windowTop = $(window).height()
    var windowScrollTop = $(window).scrollTop()
    var windowTotalTop = windowTop + windowScrollTop
    var titleAnimationTop1 = $(".titleAnimation1").offset().top
    var titleAnimationRWDTop1 = $(".titleAnimationRWD1").offset().top

    if( windowTop > titleAnimationTop1){
        $(".titleAnimation1").addClass("leftIn")
    }
    if( windowTop > titleAnimationRWDTop1){
        $(".titleAnimationRWD1").addClass("leftIn")
    }
})
$(document).scroll(function(){
    var windowTop = $(window).height()
    var windowScrollTop = $(window).scrollTop()
    var windowTotalTop = windowTop + windowScrollTop
    var titleAnimationTop1 = $(".titleAnimation1").offset().top
    var titleAnimationRWDTop1 = $(".titleAnimationRWD1").offset().top

    if( windowTotalTop > titleAnimationTop1){
        $(".titleAnimation1").addClass("leftIn")
    }
    else{
        $(".titleAnimation1").removeClass("leftIn")

    }
    if( windowTotalTop > titleAnimationRWDTop1){
        $(".titleAnimationRWD1").addClass("leftIn")
    }
    else{
        $(".titleAnimationRWD1").removeClass("leftIn")

    }
})
// productDescription