        // navbarList彈出
        $(".navbarList").click(function(){
            $(".navbarListGroup").slideDown()
            $(".mask").fadeIn("slow");
        })
        // 遮罩區關閉
        $(".mask").click(function(evt){
            if(
                $(evt.target).parents(".navbarListGroup").length == 0 &&
                evt.target.className != "navbarListGroup" &&
                evt.target.className != "navbarList" 
            ){
                $(".navbarListGroup").slideUp("slow")
                $(".mask").delay("500").fadeOut("slow")
            }
        })
        // 打叉叉關閉
        $(".closeButton").click(function(){
            $(".mask").fadeOut("slow");
            $(".navbarListGroup").slideUp();
        })

        $(".searchButton").click(function(){
            $(".searchBlock").slideToggle()
        })

        $(window).resize(function(){
            if($(window).width() > 997){
                $(".mask").hide();
                $(".navbarListGroup").hide();
            }
        })

        // 購物車數量變色
        if($(".shopQuantityRWD").text() > 0){
            $(".shopQuantityRWD").css("backgroundColor","red")
        }
        if($(".shopQuantity").text() > 0){
            $(".shopQuantity").css("backgroundColor","red")
        }