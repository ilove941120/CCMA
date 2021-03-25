$(".navbarItemGroup").hide()
$(".navbarList").click(function(){
    $(".navbarItemGroup").show();
    $(".navbarItemGroup").addClass("show")

})
$(".closeButton").click(function(){
    $(".navbarItemGroup").removeClass("show").delay(2000).slideUp()
})
$(window).resize(function(){
    if($(window).width() > 997){
    $(".navbarItemGroup").hide()
}
})