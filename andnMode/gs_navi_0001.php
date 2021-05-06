<?php include "head.php" ?>
<link rel="stylesheet" href="css/gs_navi_0001.css" />


    <section>
    <div id="main_page">
    <div class="container">
            <div class="row">
                <div class="col-md-3 col-sm-4 col-xs-12">
    <div id="product_navi_wrap">
                        <a class="product_navi" navi_id="all" href="">
                            <span>全部商品</span>
                        </a>
                        <a class="product_navi" navi_id="1">
                                    <span>AAA</span>
                                    <i class="fa3 fa-chevron-small-down"></i>
                        </a>
                        <div class="product_navi2_wrap">
                            <a class="product_navi2" href="" navi_id="">
                                • AAA-1
                            </a>
                            <a class="product_navi2" href="" navi_id="">
                                • AAA-2
                            </a>
                            <a class="product_navi2" href="" navi_id="">
                                • AAA-3
                            </a>
                        </div>
                        <a class="product_navi" navi_id="2">
                                    <span>BBB</span>
                                    <i class="fa3 fa-chevron-small-down"></i>
                        </a>
                        
                        <div class="product_navi2_wrap">
                            <a class="product_navi2" href="" navi_id="">
                                • BBB-1
                            </a>
                            <a class="product_navi2" href="" navi_id="">
                                • BBB-2
                            </a>
                            <a class="product_navi2" href="" navi_id="">
                                • BBB-3
                            </a>
                        </div>
                    </div>
                    <script>
                        $(".product_navi").click(function(){
                            $(".product_navi").removeClass("active");
                            $(".product_navi2_wrap").slideUp();
                            
                            if($(this).next(".product_navi2_wrap").css("display") == "none")
                            {
                                $(this).addClass("active");
                                $(this).next(".product_navi2_wrap").slideDown();
                            }
                            else
                            {
                                $(this).next(".product_navi2_wrap").slideUp();
                            }
                        });
                        
                        $(document).ready(function(){
                            var navi_id = "1";
                            var navi2_id = "2";
                            
                            $(".product_navi").each(function(){
                               if($(this).attr("navi_id") == navi_id)
                               {
                                   $(this).addClass("active");
                                   $(this).next(".product_navi2_wrap").show();
                               } 
                            });
                            $(".product_navi2").each(function(){
                               if($(this).attr("navi_id") == navi2_id)
                               {
                                   $(this).addClass("active");
                               } 
                            });
                        });
                    </script>
                </div>
            </div>
        </div>
    </div>
    </section>

<?php include "foot.php" ?>
