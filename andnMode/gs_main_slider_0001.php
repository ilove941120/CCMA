<?php include "head.php" ?>
<link rel="stylesheet" href="css/gs_main_slider_0001.css" />

    <section>
    <div id="main_slider_wrap">
        <div id="main_slider">
            
            <a href="">
                <div class="main_slider_list">
                    <img style="width:100%;" src="uploads/ufW8A2QvwPG6mPU6yPkfaVyJu4KFyBkx.jpg">
                </div>
            </a>
            <a href="">
                <div class="main_slider_list">
                    <img style="width:100%;" src="uploads/QFqjIlwZIjU4izcRcfmhm8e4kx92qXun.jpeg">
                </div>
            </a>
            <a href="">
                <div class="main_slider_list">
                    <img style="width:100%;" src="uploads/b20da854cca2628ce7c00c87ac0ea4b9.jpg">
                </div>
            </a>
        </div>
        
        <img id="logo" src="img/logo.png">
        <div id="main_slider_bottom_mark"></div>
        <img id="main_slider_left_mark" src="img/main_slider_mask.png">
        
        <div id="main_slider_control_button"></div>
    </div>
    <script>
        $("#main_slider").slick({
             dots: true,		/* 是否有dots */
             appendDots: '#main_slider_control_button', /* dot 顯示位置 */
             infinite: true,		/* 是否能重頭開始播放 */
             autoplay:true,		/* 是否自動播放 */
             autoplaySpeed: 4000,		/* 自動播放頻率 */
             speed:800,		/* 圖片動畫速度 */
             arrows:false,		/* 是否有前後箭頭 */
             slidesToShow: 1,		/* 圖片顯示數量 */
             slidesToScroll: 1,		/* 圖片跳轉數量 */
             fade:true		/* 是否有fade-in fade-out */
        });
    </script>
    </section>

<?php include "foot.php" ?>
