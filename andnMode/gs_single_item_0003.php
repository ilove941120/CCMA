<?php include "head.php" ?>
<link rel="stylesheet" href="css/gs_single_item_0003.css" />

    <section>
    <div id="index_bottom_info_area">
        <div id="index_map_wrap">
            <div id="index_map_block">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3640.3923506770216!2d120.6924125151585!3d24.157969084390075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d5f2cfbd9eb%3A0xfd6a6656b9c24777!2z5oGp5YW45rC06Zu75p2Q5paZ6KGM!5e0!3m2!1szh-TW!2stw!4v1574670009361!5m2!1szh-TW!2stw" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
                
                <div id="index_map_mark">
                    <?php
                    /*
                    <img id="map_logo" src="img/map_logo.png">
                    
                    <div id="index_map_mark_title">我們的據點</div>*/
                    ?>
                
                    <a id="index_map_mark_link" href="">
                        聯絡我們

                        <i class="fa3 fa-long-arrow-right"></i>
                    </a>
                </div>
                
                <a id="index_map_mark_link2" href="">
                    聯絡我們

                    <i class="fa3 fa-long-arrow-right"></i>
                </a>
            </div>
            <script>
                $(window).scroll(function(){
                    //index_animate('#map_logo');
                    //index_animate('#index_map_mark_title');
                    index_animate('#index_map_mark_link');
                    index_animate('#index_map_mark_link2');
                });
                $("#index_map_mark").click(function(){
                    $("#index_map_mark").fadeOut();
                });
            </script>
        </div>
    </div>
    </section>

<?php include "foot.php" ?>
