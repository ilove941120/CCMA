//====== 捲動執行動畫 ======
function index_animate(element)
{
    var itemTop = $(element).offset().top;
    var itemHeight = $(element).height();
    var scrollTop =  $(window).scrollTop();
    var windowHeight = $(window).height();
    var itemOpacity = $(element).css('opacity');
    var windowWidth = $(window).width();

    if(scrollTop <= (itemTop + itemHeight) && itemTop <= (scrollTop + windowHeight))
    {
        if(windowWidth > 991)
        {
            //動畫 
            $(element).addClass('animation');
        }
    }
    else
    {
        if(windowWidth > 991)
        {
            $(element).removeClass('animation');  
        }
    }
}
//====== 捲動執行動畫 ======
