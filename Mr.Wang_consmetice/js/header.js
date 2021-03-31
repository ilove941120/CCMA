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
$(".shoppingCartIcon").click(function(){
    $(".SideShoppingCartBlock").fadeIn()
    $(".SideShoppingCartBlock").animate({
        right:"0px",
        transition:"1s"
    })
})
$(".SideShoppingBlockClose").click(function(){
    $(".SideShoppingCartBlock").animate({
        right:"-100%",
        transition:"1s"
    })
    $(".SideShoppingCartBlock").fadeOut()
})
var headerLastTotal = 0;
$(".SideShoppingCareItemTotal span").each(function(){
        headerLastTotal += parseInt($(this).text())
    })
    $(".headerLastTotal span").text(headerLastTotal)
// 增加按鈕
$(".headerAdd").click(function(){
    var headerLastTotal = 0;
    var itemTotalPrice =0;
    var itemPrice = $(this).parents(".SideShoppingCartItem").find('.SideShoppingCareItemPrice span').text()
    var itemQuantity =$(this).siblings((".headerquantity")).text()
    $(this).parents(".SideShoppingCartItem").find(".headerquantity").text(parseInt(itemQuantity) + 1)
    var itemQuantityNew =$(this).parents(".SideShoppingCartItem").find(".headerquantity").text()
    itemTotalPrice = parseInt(itemQuantityNew) * parseInt(itemPrice)
    $(this).parents(".SideShoppingCartItem").find(".SideShoppingCareItemTotal span").text(itemTotalPrice)

    $(".SideShoppingCareItemTotal span").each(function(){
        headerLastTotal += parseInt($(this).text())
    })
    $(".headerLastTotal span").text(headerLastTotal)
})

// 減少按鈕
$(".headerLess").click(function(){
    var headerLastTotal = 0;
    var itemTotalPrice =0;
    var itemPrice = $(this).parents(".SideShoppingCartItem").find('.SideShoppingCareItemPrice span').text()
    var itemQuantity =$(this).siblings((".headerquantity")).text()
    if(itemQuantity > 0){
    $(this).parents(".SideShoppingCartItem").find(".headerquantity").text(parseInt(itemQuantity) - 1)
    var itemQuantityNew =$(this).parents(".SideShoppingCartItem").find(".headerquantity").text()
    itemTotalPrice = parseInt(itemQuantityNew) * parseInt(itemPrice)
    $(this).parents(".SideShoppingCartItem").find(".SideShoppingCareItemTotal span").text(itemTotalPrice)
    }

    $(".SideShoppingCareItemTotal span").each(function(){
        headerLastTotal += parseInt($(this).text())
    })
    $(".headerLastTotal span").text(headerLastTotal)
})
// 刪除按鈕
$(".SideShoppingCareItemDelete").click(function(){
    var headerLastTotal = 0;
    $(this).parents(".SideShoppingCartItem").remove()
    $(".SideShoppingCareItemTotal span").each(function(){
        headerLastTotal += parseInt($(this).text())
    })
    $(".headerLastTotal span").text(headerLastTotal)
})