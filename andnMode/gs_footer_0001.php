<?php include "head.php" ?>
<link rel="stylesheet" href="css/gs_footer_0001.css" />

<style>
    
</style>
<section>
    <div class="box1" style="height:50vh;"></div>
    <div id="foot_wrap">
        <div id="foot_top_wrap">
            <div class="container">
                <div id="foot_top_content">
                    <img id="foot_logo" src="img/foot_logo.png">
            
                    <div class="foot_top_row">
                        <div class="foot_top_title">服務專線：<a href="tel:0422312133" target="_blank">04-2231-2133</a></div>
                        <div class="foot_top_title">傳真：04-2231-2137</div>
                    </div>
                    
                    <div class="foot_top_row">
                        <div class="foot_top_title"><a href="https://goo.gl/maps/WvmtEDnNCrpWpFxB9" target="_blank">404 台中市北區進化路498號</a></div>
                        <div class="foot_top_title">統一編號：82914382</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div id="foot_bottom_wrap">
            <div class="foot_bottom_row">Copyright © 2019 恩典水電材料有限公司 all rights reserved.</div>
            <div class="foot_bottom_row">
                <i class="fa fa-geyes"></i>
                <a id="geyes_link" href="https://www.geyes.com.tw/" target="_blank">網站設計</a>-橘野數位設計
            </div>
        </div>
    </div>

    <div id="top_button">
        <i class="fa3 fa-tools"></i>
        Top
    </div>
    <script>
        $(document).ready(function(e) {
            top_button_visibility();
        });

        $(window).scroll(function(e) {
            top_button_visibility();
            
        });
    
        function top_button_visibility()
        {
            var scrollTop = $(window).scrollTop();


            if( scrollTop == 0 )
            {
                $('#top_button').stop().animate({ opacity:'0' }, 10 );
            }
            else
            {
                $('#top_button').stop().animate({ opacity:'1' }, 10 );
            }
        }

        $('#top_button').click(function(e) {
            var body = $("html, body");

            body.stop().animate({scrollTop:0}, '500', 'swing' );
        });
    </script>
</section>


<?php include "foot.php" ?>