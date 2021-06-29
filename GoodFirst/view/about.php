<?php include "headPage.php" ?>
<link rel="stylesheet" href="../css/about.css">

<!-- 主要內容 -->
<div class="content">
        <div class="container">
            <div class="row">
                <div class="aboutBlock">
                    <div class="aboutContent">
                        <div class="aboutTitle titleAnimation1">
                            好初故事
                        </div>
                        <div class="aboutText">
                            頂級麻辣鴛鴦鍋提供麻辣鍋、鴛鴦鍋給饕客們選擇：麻辣鍋好吃與否，就靠獨家湯底一戰高下！齊味主打兩種湯頭：
                            昆布大骨湯熬煮而成，清澈透底飄散出濃厚清香，再加上排骨酥的香味在口腔中綻放，享受美味的同時也懷念了一下在地的風味！
                            麻辣湯底，取四川麻辣精隨，再配合台灣人的口味，調整出麻而不辣、辣而不嗆的香醇湯底，隨著滾煮的時間越長，辣度更是直直飆升，但入口溫醇、
                            不辛辣、不傷脾胃！
                        </div>
                    </div>
                    <div class="aboutImg imgAnimation1">
                        <img src="../img/about1.jpg" alt="">
                    </div>
                </div>
                <div class="aboutBlockRWD">
                    <div class="aboutTop">
                        <div class="aboutTitleRWD1 titleAnimationRWD1">好初故事</div>
                        <div class="aboutImgRWD imgAnimationRWD1">
                            <img src="../img/about1.jpg" alt="">
                        </div>
                    </div>
                    <div class="aboutDown">
                        <div class="aboutTextRWD">
                            頂級麻辣鴛鴦鍋提供麻辣鍋、鴛鴦鍋給饕客們選擇：麻辣鍋好吃與否，就靠獨家湯底一戰高下！齊味主打兩種湯頭：
                            昆布大骨湯熬煮而成，清澈透底飄散出濃厚清香，再加上排骨酥的香味在口腔中綻放，享受美味的同時也懷念了一下在地的風味！
                            麻辣湯底，取四川麻辣精隨，再配合台灣人的口味，調整出麻而不辣、辣而不嗆的香醇湯底，隨著滾煮的時間越長，辣度更是直直飆升，但入口溫醇、
                            不辛辣、不傷脾胃！
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="row">
                <div class="aboutBlock">
                    <div class="aboutImg imgAnimation2">
                        <img src="../img/about2.JPG" alt="">
                    </div>
                    <div class="aboutContent">
                        <div class="aboutTitle titleAnimation2">
                            用心款待服務無價
                        </div>
                        <div class="aboutText">
                            以親和力建造如家般的親切與溫馨，注重服務的每個小細節，每一個環節都是謹慎且專業的態度，只為凝聚顧客用餐時的溫暖與幸福感。
                        </div>
                    </div>
                </div>
                <div class="aboutBlockRWD">
                    <div class="aboutTop">
                        <div class="aboutImgRWD imgAnimationRWD2">
                            <img src="../img/about2.JPG" alt="">
                        </div>
                        <div class="aboutTitleRWD titleAnimationRWD2">用心款待服務無價</div>
                        
                    </div>
                    <div class="aboutDown">
                        <div class="aboutTextRWD">
                            以親和力建造如家般的親切與溫馨，注重服務的每個小細節，每一個環節都是謹慎且專業的態度，只為凝聚顧客用餐時的溫暖與幸福感。
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="row">
                <div class="aboutBlock">
                    <div class="aboutContent">
                        <div class="aboutTitle titleAnimation3">
                            堅持使用天然食材熬製湯底
                        </div>
                        <div class="aboutText">
                            創辦人特地前往名店取經，經過不斷試煉，創造出精、粹、醇、厚，喝了讓人回味的湯底，美味的石頭湯底成了鎖住客人回籠的獨門配方，新鮮的食材，最高的性價比滿足顧客需求。
                        </div>
                    </div>
                    <div class="aboutImg imgAnimation3">
                        <img src="../img/about3.jpg" alt="">
                    </div>
                </div>
                <div class="aboutBlockRWD">
                    <div class="aboutTop">
                        <div class="aboutTitleRWD titleAnimationRWD3">天然食材熬製湯底</div>
                        <div class="aboutImgRWD imgAnimationRWD3">
                            <img src="../img/about3.jpg" alt="">
                        </div>
                    </div>
                    <div class="aboutDown">
                        <div class="aboutTextRWD">
                            創辦人特地前往名店取經，經過不斷試煉，創造出精、粹、醇、厚，喝了讓人回味的湯底，美味的石頭湯底成了鎖住客人回籠的獨門配方，新鮮的食材，最高的性價比滿足顧客需求。
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>

    <script>
        
        // 照片寬度等於睪固
        $(document).ready(function(){
            // $(".aboutImg1").width()
            var nw =$(".aboutImg").width()
            $(".aboutImg").height(nw)

            var nw =$(".aboutImgRWD").width()
            $(".aboutImgRWD").height(nw)
        })
        $(window).resize(function(){
            var nw =$(".aboutImg").width()
            $(".aboutImg").height(nw)

            var nw =$(".aboutImgRWD").width()
            $(".aboutImgRWD").height(nw)
        })
        $(document).ready(function(){
            var windowTop = $(window).height()
            var windowScrollTop = $(window).scrollTop()
            var windowTotalTop = windowTop + windowScrollTop
            var titleAnimationTop1 = $(".titleAnimation1").offset().top
            var titleAnimationTop2 = $(".titleAnimation2").offset().top
            var titleAnimationTop3 = $(".titleAnimation3").offset().top
            var titleAnimationTopRWD1 = $(".titleAnimationRWD1").offset().top
            var titleAnimationTopRWD2 = $(".titleAnimationRWD2").offset().top
            var titleAnimationTopRWD3 = $(".titleAnimationRWD3").offset().top
            var imgAnimationTop1 = $(".imgAnimation1").offset().top
            var imgAnimationTop2 = $(".imgAnimation2").offset().top
            var imgAnimationTop3 = $(".imgAnimation3").offset().top
            var imgAnimationTopRWD1 = $(".imgAnimationRWD1").offset().top
            var imgAnimationTopRWD2 = $(".imgAnimationRWD2").offset().top
            var imgAnimationTopRWD3 = $(".imgAnimationRWD3").offset().top

            if( windowTop > titleAnimationTop1){
                $(".titleAnimation1").addClass("leftIn")
            }
            if( windowTop > titleAnimationTop2){
                $(".titleAnimation2").addClass("rightIn")
            }
            if( windowTop > titleAnimationTop3){
                $(".titleAnimation3").addClass("leftIn")
            }
            if( windowTop > titleAnimationTopRWD1){
                $(".titleAnimationRWD1").addClass("leftIn")
            }
            if( windowTop > titleAnimationTopRWD2){
                $(".titleAnimationRWD2").addClass("rightIn")
            }
            if( windowTop > titleAnimationTopRWD3){
                $(".titleAnimationRWD3").addClass("leftIn")
            }
            if( windowTop > imgAnimationTop1){
                $(".imgAnimation1").addClass("rightIn")
            }
            if( windowTop > imgAnimationTop2){
                $(".imgAnimation2").addClass("leftIn")
            }
            if( windowTop > imgAnimationTop3){
                $(".imgAnimation3").addClass("rightIn")
            }
            if( windowTop > imgAnimationTopRWD1){
                $(".imgAnimationRWD1").addClass("rightIn")
            }
            if( windowTop > imgAnimationTopRWD2){
                $(".imgAnimationRWD2").addClass("leftIn")
            }
            if( windowTop > imgAnimationTopRWD3){
                $(".imgAnimationRWD3").addClass("rightIn")
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
            var imgAnimationTopRWD1 = $(".imgAnimationRWD1").offset().top
            var imgAnimationTopRWD2 = $(".imgAnimationRWD2").offset().top
            var imgAnimationTopRWD3 = $(".imgAnimationRWD3").offset().top
            
            if( windowTotalTop > titleAnimationTop1){
                $(".titleAnimation1").addClass("leftIn")
            }
            else{
                $(".titleAnimation1").removeClass("leftIn")
            }
            if( windowTotalTop > titleAnimationTop2){
                $(".titleAnimation2").addClass("rightIn")
            }
            else{
                $(".titleAnimation2").removeClass("rightIn")
            }
            if( windowTotalTop > titleAnimationTop3){
                $(".titleAnimation3").addClass("leftIn")
            }
            else{
                $(".titleAnimation3").removeClass("leftIn")
            }
            if( windowTotalTop > titleAnimationTopRWD1){
                $(".titleAnimationRWD1").addClass("leftIn")
            }
            else{
                $(".titleAnimationRWD1").removeClass("leftIn")
            }
            if( windowTotalTop > titleAnimationTopRWD2){
                $(".titleAnimationRWD2").addClass("rightIn")
            }
            else{
                $(".titleAnimationRWD2").removeClass("rightIn")
            }
            if( windowTotalTop > titleAnimationTopRWD3){
                $(".titleAnimationRWD3").addClass("leftIn")
            }
            else{
                $(".titleAnimationRWD3").removeClass("leftIn")
            }
            if( windowTotalTop > imgAnimationTop1){
                $(".imgAnimation1").addClass("rightIn")
            }
            else{
                $(".imgAnimation1").removeClass("rightIn")
            }
            if( windowTotalTop > imgAnimationTop2){
                $(".imgAnimation2").addClass("leftIn")
            }
            else{
                $(".imgAnimation2").removeClass("leftIn")
            }
            if( windowTotalTop > imgAnimationTop3){
                $(".imgAnimation3").addClass("rightIn")
            }
            else{
                $(".imgAnimation3").removeClass("rightIn")
            }
            if( windowTotalTop > imgAnimationTopRWD1){
                $(".imgAnimationRWD1").addClass("rightIn")
            }
            else{
                $(".imgAnimationRWD1").removeClass("rightIn")
            }
            if( windowTotalTop > imgAnimationTopRWD2){
                $(".imgAnimationRWD2").addClass("leftIn")
            }
            else{
                $(".imgAnimationRWD2").removeClass("leftIn")
            }
            if( windowTotalTop > imgAnimationTopRWD3){
                $(".imgAnimationRWD3").addClass("rightIn")
            }
            else{
                $(".imgAnimationRWD3").removeClass("rightIn")
            }
            
        })
        
        
    </script>

<?php include "foot.php" ?>