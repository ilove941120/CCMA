<?php include "headPage.php" ?>
<link rel="stylesheet" href="../css/productDescription.css">

<!-- 主要內容 -->
<div class="content">
        <div class="container">
            <div class="row">
                <div class="contactTitle titleAnimation1">
                    產品介紹PRODUCTION DESCRIPITION
                </div>
                <div class="contactTitleRWD titleAnimationRWD1">
                    <div class="chineseTitle">產品介紹</div>
                    <div class="englishTitle">PRODUCTION DESCRIPITION</div>
                </div>
            </div>
            <div class="row">
                <div class="demo1">
                    <div id="my_album1140">
                        <div>
                        <img class="photo" src="../img/product1.png"/>
                        </div>
                    
                        <div>
                        <img class="photo" src="../img/product2.png"/>
                        </div>
                    
                        <div>
                        <img class="photo" src="../img/product1.png"/>
                        </div>
                    
                        <div>
                        <img class="photo" src="../img/product2.png"/>
                        </div>
                    </div>
                </div>
                <div class="demo2">
                    <div id="my_album992">
                        <div>
                        <img class="photo" src="../img/product1.png"/>
                        </div>
                    
                        <div>
                        <img class="photo" src="../img/product2.png"/>
                        </div>
                    
                        <div>
                        <img class="photo" src="../img/product1.png"/>
                        </div>
                    
                        <div>
                        <img class="photo" src="../img/product2.png"/>
                        </div>
                    </div>
                </div>
                <div class="demo3">
                    <div id="my_album600">
                        <div>
                        <img class="photo" src="../img/product1.png"/>
                        </div>
                    
                        <div>
                        <img class="photo" src="../img/product2.png"/>
                        </div>
                    
                        <div>
                        <img class="photo" src="../img/product1.png"/>
                        </div>
                    
                        <div>
                        <img class="photo" src="../img/product2.png"/>
                        </div>
                    </div>
                </div>
                <div class="demo4">
                    <div class="sliderBlock">
                        <div class="sliderItem">
                            <img src="../img/product1.png" alt="">
                        </div>
                        <div class="sliderItem">
                            <img src="../img/product2.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
            
            
        </div>
    </div>

    <script>
        // 翻頁
                    
        $(document).ready(function(){
            $("#my_album1140").wowBook({
            centeredWhenClosed:true,
            container: true,
            height : 600,
            width  : 900,

             });
             $("#my_album992").wowBook({
            centeredWhenClosed:true,
            container: true,
            height : 600,
            width  : 860,

             });
             $("#my_album600").wowBook({
            centeredWhenClosed:true,
            container: true,
            height : 400,
            width  : 600,

             });
        })

        // slick 輪播
        $('.sliderBlock').slick();
        
       
        //  網頁載入動畫
        $(document).ready(function(){
            var windowTop = $(window).height()
            var windowScrollTop = $(window).scrollTop()
            var windowTotalTop = windowTop + windowScrollTop
            var titleAnimationTop1 = $(".titleAnimation1").offset().top
            var titleAnimationRWDTop1 = $(".titleAnimationRWD1").offset().top

            if( windowTop > titleAnimationTop1){
                $(".titleAnimation1").addClass("leftIn")
            }
            if( windowTop > titleAnimationRWDTop1){
                $(".titleAnimationRWD1").addClass("leftIn")
            }
        })
        $(document).scroll(function(){
            var windowTop = $(window).height()
            var windowScrollTop = $(window).scrollTop()
            var windowTotalTop = windowTop + windowScrollTop
            var titleAnimationTop1 = $(".titleAnimation1").offset().top
            var titleAnimationRWDTop1 = $(".titleAnimationRWD1").offset().top

            if( windowTotalTop > titleAnimationTop1){
                $(".titleAnimation1").addClass("leftIn")
            }
            else{
                $(".titleAnimation1").removeClass("leftIn")

            }
            if( windowTotalTop > titleAnimationRWDTop1){
                $(".titleAnimationRWD1").addClass("leftIn")
            }
            else{
                $(".titleAnimationRWD1").removeClass("leftIn")

            }
        })
    </script>

<?php include "foot.php" ?>