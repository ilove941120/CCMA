
// <!-- 自己寫 -->
// 漢堡條JS
  $(document).ready(function () {
    // $(".mask").hide();
    $(".navbox_g").hide();
    $(".nav_button").click(function () {
      $(".navbox_g").slideDown("slow");
      $(".mask").fadeIn("slow");
    });
    $(".mask").click(function (evt) {
      if (
        $(evt.target).parents(".navbox_g").length == 0 &&
        evt.target.className != "navbox_g" &&
        evt.target.className != "nav_button" &&
        
      ) {
        $(".navbox_g").slideUp("slow");
        $(".mask").delay("500").fadeOut("slow");
      }
    });
  });
// 導覽列js
$(document).ready(function () {
    $(".li_g").hide();
    $(".navbox_li").click(function () {
        if ($(this).next(".li_g").css("display") == "none") {
            $(this).siblings(".li_g").slideUp();
            $(".navbox_li").find("i").css("transform","none");
            $(this).next(".li_g").slideDown("fast");
            $(this).find("i").css("transform","rotate(90deg)")

        } 
        else {
            $(this).next(".li_g").slideUp("fast");
            $(this).find("i").css("transform","none")

            }
    });

    // $(".nav_li").hover(function(){
    //   if($(this).find(".li_lg_g").css("display") == "none"){
    //     $(this).find(".li_lg_g").fadeIn("slow");
    //   }
    //   else {
    //     $(this).find(".li_lg_g").fadeOut("fast");
    //     }
    // });
  });
    


// <!-- slick.js -->
$(document).ready(function () {
    $(".banner_g").slick({
      arrows: false,
      dots: true,
    });
    $(".project_g").slick({
      dots: true,
      infinite: false,
      arrows: false,

      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true,
          },
        },
      ],
    });
  });

// 分類點擊紅色
  $(".sortItem").click(function(){
    $(".sortItem").removeClass("color_red");
    $(this).addClass("color_red");
  })