<?php include "headPage.php" ?>
<link rel="stylesheet" href="../css/newsInPage.css">

 <!-- 主要內容 -->
 <div class="content">
        <!-- newsContent -->
        <div class="container">
                <div class="newsImg imgAnimation1">
                    <img src="../img/news.png" alt="">
                </div>
                <div class="newsContentBlock">
                    <div class="newsContentTop">
                        <div class="newsDate">
                            活動
                            <br>
                            2020/03/03
                        </div>
                        <div class="newsTitle titleAnimation1">一女一兒謂之好．共享佳餚亦如初</div>
                    </div>
                    <div class="newsContentDown">
                        <div class="newsText">
                            湯底天然食材新鮮熬煮，純天然、無添加任何人工調味；「好的湯．好的料．好的醬」，莫忘初衷，給您最單純的味蕾饗宴。
                        </div>
                    </div>
                    <a href="" class="backButton buttonAnimation">BACK</a>
                    <a href="" class="backButtonRWD buttonAnimationRWD">BACK</a>
                    
                </div>
        </div>
    </div>

    <script>
        $(document).ready(function(){
            var windowTop = $(window).height()
            var windowScrollTop = $(window).scrollTop()
            var windowTotalTop = windowTop + windowScrollTop
            var titleAnimationTop1 = $(".titleAnimation1").offset().top
            var imgAnimationTop1 = $(".imgAnimation1").offset().top
            var buttonAnimationTop = $(".buttonAnimation").offset().top
            var buttonAnimationRWDTop = $(".buttonAnimationRWD").offset().top


            if( windowTop > titleAnimationTop1){
                $(".titleAnimation1").addClass("centerIn")
            }
            if( windowTop > imgAnimationTop1 -100){
                $(".imgAnimation1").addClass("centerIn")
            }
            if( windowTop > buttonAnimationTop -100){
                $(".buttonAnimation").addClass("centerIn")
            }
            if( windowTop > buttonAnimationRWDTop){
                $(".buttonAnimationRWD").addClass("rightIn")
            }
            
        })
        $(document).scroll(function(){
            var windowTop = $(window).height()
            var windowScrollTop = $(window).scrollTop()
            var windowTotalTop = windowTop + windowScrollTop
            var titleAnimationTop1 = $(".titleAnimation1").offset().top
            var imgAnimationTop1 = $(".imgAnimation1").offset().top
            var buttonAnimationTop = $(".buttonAnimation").offset().top
            var buttonAnimationRWDTop = $(".buttonAnimationRWD").offset().top


            if( windowTotalTop > titleAnimationTop1){
                $(".titleAnimation1").addClass("centerIn")
            }
            else{
                $(".titleAnimation1").removeClass("centerIn")
            }
            if( windowTotalTop > imgAnimationTop1 - 100){
                $(".imgAnimation1").addClass("centerIn")
            }
            else{
                $(".imgAnimation1").removeClass("centerIn")
            }
            if( windowTotalTop > (buttonAnimationTop - 100)){
                $(".buttonAnimation").addClass("centerIn")
            }
            else{
                $(".buttonAnimation").removeClass("centerIn")
            }
            if( windowTotalTop > buttonAnimationRWDTop){
                $(".buttonAnimationRWD").addClass("rightIn")
            }
            else{
                $(".buttonAnimationRWD").removeClass("rightIn")
            }
        })
    </script>

<?php include "foot.php" ?>