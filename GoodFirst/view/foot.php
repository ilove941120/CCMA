<!-- TOP按鈕 -->
<div class="topButton">
        <div class="topText">TOP</div>
        <img src="../img/top_img.png" alt="">
    </div>
    <!-- foot -->
    <div class="foot">
        <div class="container">
            <div class="footBar">
                <div class="footLeft">
                    <div class="footIconBar">
                        <i class="fab fa-instagram"></i>
                        <i class="fab fa-facebook-f"></i>
                    </div>
                    <div class="footContent">
                        <div class="footServiceTime">服務時間:11:00-14;00、17;00-21:00</div>
                        <div class="footAddress">地址:新竹縣竹北市環北路一段232號</div>
                        <div class="footPhone">訂位專線:(03)5123456</div>
                    </div>
                </div>
                <div class="footMide">
                    <div class="footLogo">
                        <img src="../img/logo_bl.png" alt="">
                    </div>
                </div>
                <div class="footRight">
                    <div class="footRightContent">
                        <div class="footText">網站設計-橘野數位設計</div>
                        <div class="footText">Copyright © 2019 鑫福國際飲有限公司 all rights reserved.</div>
    
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
        // Top按鈕
        $(document).scroll(function(){
                var windowTop = $(window).height()
                var windowScrollTop = $(window).scrollTop()
                var windowTotalTop = windowTop + windowScrollTop
                var topButtonTop = $(".topButton").offset().top

                if( windowScrollTop > 0){
                    $(".topButton").addClass("showTop")
                }
                else{
                    $(".topButton").removeClass("showTop")
                }
                })
        $(".topButton").click(function(){
            $('html,body').animate({scrollTop:0}, 333);
        })
    </script>

    </body>
</html>