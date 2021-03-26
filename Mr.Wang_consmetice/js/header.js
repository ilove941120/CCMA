$('.navbarListItemGroup').hide();
$(".navbarList").click(function(){
    $('.navbarListItemGroup').show().addClass("show");
});

$(".closeButton").click(function(){
    $('.navbarListItemGroup').removeClass("show").delay(1000).fadeOut();
});

$(window).resize(function(){
    if($(window).width() >997){
    $('.navbarListItemGroup').hide()
}
});