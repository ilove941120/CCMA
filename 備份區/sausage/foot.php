    <a href="#">
        <img class="top_button" src="img/logo1.png" alt="">
    </a>
    <script>
        // Top按鈕
        $(document).scroll(function(){
            var windowTop = $(window).height()
            var windowScrollTop = $(window).scrollTop()
            var windowTotalTop = windowTop + windowScrollTop
            var topButtonTop = $(".top_button").offset().top

            if( windowScrollTop > 0){
                $(".top_button").addClass("showTop")
            }
            else{
                $(".top_button").removeClass("showTop")
            }
        })
    </script>
    <div class="foot">
        <div class="foot_block">
            <div class="foot_top">
                <div class="foot_item_group">
                    <a href="#" class="foot_top_item">服務條款</a>
                    <a href="#" class="foot_top_item">購物須知</a>
                    <a href="#" class="foot_top_item">隱私權聲明</a>
                    <a href="#" class="foot_top_line"><i class="fap fa-line02"></i></a>
                </div>
            </div>
            <div class="foot_bottom">
                Copyright © 2021 青粮秫 all rights reserved.網站設計-橘野數位設計
            </div>
        </div>
        <div class="foot_RWD">
            <div class="foot_bottom_RWD">
                <a href="#" class="foot_bottom_item_RWD">服務條款</a>
                <a href="#" class="foot_bottom_item_RWD">購物須知</a>
                <a href="#" class="foot_bottom_item_RWD">隱私權聲明</a>
                <a href="#" class="foot_bottom_item_RWD"><i class="fap fa-line02"></i></a>
            </div>
            <div class="foot_top_RWD">
                <div class="phone_RWD">電話:0937656788</div>
                <div class="address_RWD">地址:台北市大安區復興南路二段一五一巷八號五樓之三</div>
                <div class="copyright">Copyright © 2021 青粮秫 all rights reserved.</div>
                <div class="web_make">網站設計-橘野數位設計</div>
            </div>
            
        </div>
        <div class="desk_foot">
            <div class="desk_foot_bottom">
                <img src="img/foot.png" alt="">
            </div>
            
        </div>
        <div class="desk_foot_after">
            <div class="foot_flower">
                <img src="img/flower.png" alt="">
            </div>
        </div>
    </div>
    

    
</body>
</html>