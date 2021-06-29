<?php include "headPage.php" ?>
<link rel="stylesheet" href="../css/news.css">

<!-- 主要內容 -->
<div class="content">
        <!-- newsContent -->
        <div class="container">
                <div class="newsItemBlock">
                    <a href="" class="newsItem">
                        <div class="newsItemImg imgAnimation1">
                            <img src="../img/news.png" alt="">
                        </div>
                        <div class="newsItemDate">
                            活動
                            <br>
                            2020/03/03
                        </div>
                        <div class="newsContent">
                            <div class="newsItemTitle titleAnimation1">
                                一女一兒謂之好．共享佳餚亦如初
                            </div>
                            <div class="newsItemText">
                                湯底天然食材新鮮熬煮，純天然、無添加任何人工調味；「好的湯．好的料．好的醬」，
                                莫忘初衷，給您最單純的味蕾饗宴
                            </div>
                        </div>
                        <div class="newsContentRWD">
                            <div class="newsItemTopBlock">
                                <div class="newsItemDateRWD">
                                    活動
                                    <br>
                                    2020/03/03
                                </div>
                                <div class="newsItemTitleRWD titleAnimationRWD1">一女一兒謂之好．共享佳餚亦如初</div>
                            </div>
                            <div class="newsItemTextRWD">
                                湯底天然食材新鮮熬煮，純天然、無添加任何人工調味；「好的湯．好的料．好的醬」，
                                莫忘初衷，給您最單純的味蕾饗宴
                            </div>
                        </div>
    
                    </a>
                    <a href="" class="newsItem">
                        <div class="newsItemImg imgAnimation2">
                            <img src="../img/news.png" alt="">
                        </div>
                        <div class="newsItemDate">
                            活動
                            <br>
                            2020/03/03
                        </div>
                        <div class="newsContent">
                            <div class="newsItemTitle titleAnimation2">
                                一女一兒謂之好．共享佳餚亦如初
                            </div>
                            <div class="newsItemText">
                                湯底天然食材新鮮熬煮，純天然、無添加任何人工調味；「好的湯．好的料．好的醬」，
                                莫忘初衷，給您最單純的味蕾饗宴
                            </div>
                        </div>
                        <div class="newsContentRWD">
                            <div class="newsItemTopBlock">
                                <div class="newsItemDateRWD">
                                    活動
                                    <br>
                                    2020/03/03
                                </div>
                                <div class="newsItemTitleRWD titleAnimationRWD2">一女一兒謂之好．共享佳餚亦如初</div>
                            </div>
                            <div class="newsItemTextRWD">
                                湯底天然食材新鮮熬煮，純天然、無添加任何人工調味；「好的湯．好的料．好的醬」，
                                莫忘初衷，給您最單純的味蕾饗宴
                            </div>
                        </div>
    
                    </a>
                    <a href="" class="newsItem">
                        <div class="newsItemImg imgAnimation3">
                            <img src="../img/news.png" alt="">
                        </div>
                        <div class="newsItemDate">
                            活動
                            <br>
                            2020/03/03
                        </div>
                        <div class="newsContent">
                            <div class="newsItemTitle titleAnimation3">
                                一女一兒謂之好．共享佳餚亦如初
                            </div>
                            <div class="newsItemText">
                                湯底天然食材新鮮熬煮，純天然、無添加任何人工調味；「好的湯．好的料．好的醬」，
                                莫忘初衷，給您最單純的味蕾饗宴
                            </div>
                        </div>
                        <div class="newsContentRWD">
                            <div class="newsItemTopBlock">
                                <div class="newsItemDateRWD">
                                    活動
                                    <br>
                                    2020/03/03
                                </div>
                                <div class="newsItemTitleRWD titleAnimationRWD3">一女一兒謂之好．共享佳餚亦如初</div>
                            </div>
                            <div class="newsItemTextRWD">
                                湯底天然食材新鮮熬煮，純天然、無添加任何人工調味；「好的湯．好的料．好的醬」，
                                莫忘初衷，給您最單純的味蕾饗宴
                            </div>
                        </div>
    
                    </a>
                    <!-- 分頁列 -->
                    <div class="pagination">
                        <a href="" class="page">1</a>
                        <a href="" class="page">2</a>
                        <a href="" class="page">3</a>
                        <div class="page1">...</div>
                        <a href="" class="page">7</a>
                        <a href="" class="page">></a>

                    </div>
                </div>
        </div>
    </div>

    <script>
        // news
        $(document).ready(function(){
            var windowTop = $(window).height()
            var windowScrollTop = $(window).scrollTop()
            var windowTotalTop = windowTop + windowScrollTop
            var titleAnimationTop1 = $(".titleAnimation1").offset().top
            var titleAnimationTop2 = $(".titleAnimation2").offset().top
            var titleAnimationTop3 = $(".titleAnimation3").offset().top
            var imgAnimationTop1 = $(".imgAnimation1").offset().top
            var imgAnimationTop2 = $(".imgAnimation2").offset().top
            var imgAnimationTop3 = $(".imgAnimation3").offset().top
            var titleAnimationTopRWD1 = $(".titleAnimationRWD1").offset().top
            var titleAnimationTopRWD2 = $(".titleAnimationRWD2").offset().top
            var titleAnimationTopRWD3 = $(".titleAnimationRWD3").offset().top

            if( windowTop > titleAnimationTop1){
                $(".titleAnimation1").addClass("rightIn")
            }
            if( windowTop > titleAnimationTop2){
                $(".titleAnimation2").addClass("rightIn")
            }
            if( windowTop > titleAnimationTop3){
                $(".titleAnimation3").addClass("rightIn")
            }
            if( windowTop > titleAnimationTopRWD1){
                $(".titleAnimationRWD1").addClass("centerIn")
            }
            if( windowTop > titleAnimationTopRWD2){
                $(".titleAnimationRWD2").addClass("centerIn")
            }
            if( windowTop > titleAnimationTopRWD3){
                $(".titleAnimationRWD3").addClass("centerIn")
            }
            if( windowTop > imgAnimationTop1){
                $(".imgAnimation1").addClass("leftIn")
            }
            if( windowTop > imgAnimationTop2){
                $(".imgAnimation2").addClass("leftIn")
            }
            if( windowTop > imgAnimationTop3){
                $(".imgAnimation3").addClass("leftIn")
            }
        })

        $(document).scroll(function(){
            var windowTop = $(window).height()
            var windowScrollTop = $(window).scrollTop()
            var windowTotalTop = windowTop + windowScrollTop

            var titleAnimationTop1 = $(".titleAnimation1").offset().top
            var titleAnimationTop2 = $(".titleAnimation2").offset().top
            var titleAnimationTop3 = $(".titleAnimation3").offset().top
            var imgAnimationTop1 = $(".imgAnimation1").offset().top
            var imgAnimationTop2 = $(".imgAnimation2").offset().top
            var imgAnimationTop3 = $(".imgAnimation3").offset().top
            var titleAnimationTopRWD1 = $(".titleAnimationRWD1").offset().top
            var titleAnimationTopRWD2 = $(".titleAnimationRWD2").offset().top
            var titleAnimationTopRWD3 = $(".titleAnimationRWD3").offset().top
            
            if( windowTotalTop > titleAnimationTop1){
                $(".titleAnimation1").addClass("rightIn")
            }
            else{
                $(".titleAnimation1").removeClass("rightIn")
            }
            if( windowTotalTop > titleAnimationTop2){
                $(".titleAnimation2").addClass("rightIn")
            }
            else{
                $(".titleAnimation2").removeClass("rightIn")
            }
            if( windowTotalTop > titleAnimationTop3){
                $(".titleAnimation3").addClass("rightIn")
            }
            else{
                $(".titleAnimation3").removeClass("rightIn")
            }
            if( windowTotalTop > titleAnimationTopRWD1){
                $(".titleAnimationRWD1").addClass("centerIn")
            }
            else{
                $(".titleAnimationRWD1").removeClass("centerIn")
            }
            if( windowTotalTop > titleAnimationTopRWD2){
                $(".titleAnimationRWD2").addClass("centerIn")
            }
            else{
                $(".titleAnimationRWD2").removeClass("centerIn")
            }
            if( windowTotalTop > titleAnimationTopRWD3){
                $(".titleAnimationRWD3").addClass("centerIn")
            }
            else{
                $(".titleAnimationRWD3").removeClass("centerIn")
            }
            if( windowTotalTop > imgAnimationTop1){
                $(".imgAnimation1").addClass("leftIn")
            }
            else{
                $(".imgAnimation1").removeClass("leftIn")
            }
            if( windowTotalTop > imgAnimationTop2){
                $(".imgAnimation2").addClass("leftIn")
            }
            else{
                $(".imgAnimation2").removeClass("leftIn")
            }
            if( windowTotalTop > imgAnimationTop3){
                $(".imgAnimation3").addClass("leftIn")
            }
            else{
                $(".imgAnimation3").removeClass("leftIn")
            }
            
        })
    </script>

<?php include "foot.php" ?>