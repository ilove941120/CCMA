// navbarRWD
$('.navbarListItemGroup').hide();
$(".humburger").click(function(){
    $('.navbarListItemGroup').show().addClass("show");
});

$(".closeButton").click(function(){
    $('.navbarListItemGroup').removeClass("show").delay(1000).slideUp();
});

$(window).resize(function(){
    if($(window).width() >997){
    $('.navbarListItemGroup').hide()
}
});




// 側邊購物車滑出
$(".shoppingCarIcon").click(function(){
    // $(".SideShoppingCarBlock").fadeIn()
    $(".SideShoppingCarBlock").animate({
        right:"0px",
        transition:"1s"
    })
})
$(".SideShoppingBlockClose").click(function(){
    $(".SideShoppingCarBlock").animate({
        right:"-100%",
        transition:"1s"
    })
    // $(".SideShoppingCarBlock").fadeOut()
})
var headerLastTotal = 0;
$(".SideShoppingCarItemTotal span").each(function(){
        headerLastTotal += parseInt($(this).text())
    })
    $(".headerLastTotal span").text(headerLastTotal)
// 增加按鈕
$(".headerAdd").click(function(){
    var headerLastTotal = 0;
    var itemTotalPrice =0;
    var itemPrice = $(this).parents(".SideShoppingCarItem").find('.SideShoppingCarItemPrice span').text()
    var itemQuantity =$(this).siblings((".headerQuantity")).text()
    $(this).parents(".SideShoppingCarItem").find(".headerQuantity").text(parseInt(itemQuantity) + 1)
    var itemQuantityNew =$(this).parents(".SideShoppingCarItem").find(".headerQuantity").text()
    itemTotalPrice = parseInt(itemQuantityNew) * parseInt(itemPrice)
    $(this).parents(".SideShoppingCarItem").find(".SideShoppingCarItemTotal span").text(itemTotalPrice)

    $(".SideShoppingCarItemTotal span").each(function(){
        headerLastTotal += parseInt($(this).text())
    })
    $(".headerLastTotal span").text(headerLastTotal)
})

// 減少按鈕
$(".headerLess").click(function(){
    var headerLastTotal = 0;
    var itemTotalPrice =0;
    var itemPrice = $(this).parents(".SideShoppingCarItem").find('.SideShoppingCarItemPrice span').text()
    var itemQuantity =$(this).siblings((".headerQuantity")).text()
    if(itemQuantity > 0){
    $(this).parents(".SideShoppingCarItem").find(".headerQuantity").text(parseInt(itemQuantity) - 1)
    var itemQuantityNew =$(this).parents(".SideShoppingCarItem").find(".headerQuantity").text()
    itemTotalPrice = parseInt(itemQuantityNew) * parseInt(itemPrice)
    $(this).parents(".SideShoppingCarItem").find(".SideShoppingCarItemTotal span").text(itemTotalPrice)
    }

    $(".SideShoppingCarItemTotal span").each(function(){
        headerLastTotal += parseInt($(this).text())
    })
    $(".headerLastTotal span").text(headerLastTotal)
})
// 刪除按鈕
$(".SideShoppingCarItemDelete").click(function(){
    var headerLastTotal = 0;
    $(this).parents(".SideShoppingCarItem").remove()
    $(".SideShoppingCarItemTotal span").each(function(){
        headerLastTotal += parseInt($(this).text())
    })
    $(".headerLastTotal span").text(headerLastTotal)
})