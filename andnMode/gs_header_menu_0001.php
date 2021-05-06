<?php include "head.php" ?>
<link rel="stylesheet" href="css/gs_header_menu_0001.css" />

<section>
    <div class="box1"></div>
    <div class="box2"></div>
    <div id="main_menu2_wrap">
        <div id="logo2_wrap">
            <a href="index.php">
                <img id="logo2" src="img/head_logo.png">
            </a>
            
            <a id="head_tel_link" href="tel:0422312133">
                <i class="fa3 fa-whatsapp"></i>
                04-2231-2133
            </a>
        </div>
        
        <div id="main_menu_block2">
            <a class="main_menu2" href="">首頁</a>
            <a class="main_menu2" href="">線上型錄</a>
            <a class="main_menu2" href="">最新消息</a>
            <a class="main_menu2" href="">產品介紹</a>
            <a class="main_menu2" href="">聯絡我們</a>
        </div>
        
        <span class="main_menu_span2"></span>
        
        <i class="fa fa-bars" id="mobile_menu_button2"></i>
        
        <?php
        /*
        <a id="head_fb_button2" href="https://www.facebook.com/pages/%E6%81%A9%E5%85%B8%E6%B0%B4%E9%9B%BB%E6%9D%90%E6%96%99%E8%A1%8C/227299470731996" target="_blank">
            <i class="fa3 fa-facebook"></i>
        </a>
        */
        ?>
        
        <div id="head_search_button2_wrap">
            <i class="fa2 fa-aas" onclick="do_search_wrap();"></i>
        </div>
        
        <div id="head_search_pc_wrap">
            <div class="head_search_wrap">
                <input type="text" class="head_search_input" placeholder="請輸入商品名稱"> 
                <i class="fa fa-search head_search_button"></i>
            </div>
        </div>
    </div>
    <script>
        $(document).ready(function(){
            var menu_id = 2;
            menu_id = menu_id - 1;
            $(".main_menu2:eq("+menu_id+")").addClass("active");
            
            if($(window).width() >= 850)
            {
                var menuLift = $(".main_menu2.active").offset().left;
                var menuWidth = $(".main_menu2.active").width();
                var menuHeight = $(".main_menu2.active").css("height");
                $(".main_menu_span2").css("left",menuLift+"px").css("width", menuWidth+"px").css("height", menuHeight);
            } 
        });
        
        $("#main_menu_block2").mouseout(function(){
            if($(window).width() >= 850)
            {
                var menu_id = 2;
                menu_id = menu_id - 1;
                $(".main_menu2").removeClass("active");
                $(".main_menu2:eq("+menu_id+")").addClass("active");
                
                var menuLift = $(".main_menu2.active").offset().left;
                var menuWidth = $(".main_menu2.active").width();
                var menuHeight = $(".main_menu2.active").css("height");
                $(".main_menu_span2").css("left",menuLift+"px").css("width", menuWidth+"px").css("height", menuHeight);
            }
        });
        
        $(window).scroll(function(){
            var scrollTop = $(window).scrollTop();
            var itemBottom = $(".box1").offset().top;
            var itemHeight = $(".box1").height();
            var menuHeight = $("#main_menu2_wrap").height();
            
            if(scrollTop > (itemBottom + itemHeight - menuHeight))
            {
                $("#main_menu2_wrap").addClass("sticky");
            }
            else
            {
                $("#main_menu2_wrap").removeClass("sticky");
            }
        });
        
        $("#mobile_menu_button2").click(function(){
            $("#mobile_menu2_wrap").fadeIn();
        });
        
        function do_search_wrap()
        {
            if($("#head_search_pc_wrap").css("display") == "none")
            {
                $("#head_search_pc_wrap").fadeIn();
                $("#head_search_button_wrap i").attr("class","fa fa-times-btb");
            }
            else
            {
                $("#head_search_pc_wrap").fadeOut();
                $("#head_search_button_wrap i").attr("class","fa2 fa-aas");
            }
        }
    </script>
    
    <div id="mobile_menu2_wrap">
        <div id="mobile_menu_block">
            <div class="head_search_wrap" style="margin-bottom: 10px;">
                <input type="text" class="head_search_input" placeholder="請輸入商品名稱"> 
                <i class="fa fa-search head_search_button"></i>
            </div>
            
            <a class="mobile_menu" href="">首頁</a>
            <a class="mobile_menu" href="">線上型錄</a>
            <a class="mobile_menu" href="">最新消息</a>
            <a class="mobile_menu" href="">產品介紹</a>
            <a class="mobile_menu" href="">聯絡我們</a>
            
            <div style="text-align: center;padding-top: 15px;">
                <i class="fa fa-times-btb" id="mobile_menu_cancel_button"></i>
            </div>
        </div>
    </div>
    <script>
        $("#mobile_menu_cancel_button").click(function(){
            $("#mobile_menu2_wrap").fadeOut();
        });
        $("#mobile_menu2_wrap").click(function(e){
          var div = $('#mobile_menu_block');   // 设置目标区域
          if(!div.is(e.target) && div.has(e.target).length === 0){
            $("#mobile_menu2_wrap").fadeOut();
          }
        });
        $(".head_search_button").click(function(){
            var search_name = $(this).siblings("input").val();

            if(search_name.trim() != "")
            {
                window.location.href = "";
            }
            else
            {
                alert("請輸入商品名稱!!");
                return false;
            }
        });
    </script>
    

</section>
    
    
<?php include "foot.php" ?>