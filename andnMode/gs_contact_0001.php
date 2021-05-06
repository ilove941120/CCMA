<?php include "head.php" ?>
<link rel="stylesheet" href="css/gs_contact_0001.css" />

    <section>
    <?php //google recaptcha ?>
<script src="https://www.google.com/recaptcha/api.js?onload=CaptchaCallback&render=explicit" async defer></script>
    
    <iframe id="contact_map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3640.3923506770216!2d120.6924125151585!3d24.157969084390075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d5f2cfbd9eb%3A0xfd6a6656b9c24777!2z5oGp5YW45rC06Zu75p2Q5paZ6KGM!5e0!3m2!1szh-TW!2stw!4v1574670009361!5m2!1szh-TW!2stw" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
        
    <div id="main_page">
        <?php
        /*
        <img id="page_background" src="img/page_background.png"> */
        ?>
        
        <div class="container">
            <div class="row">
                <div class="col-sm-6 col-xs-12">
                    <div class="htmleditor" id="contact_content">
                    <p>ds聯絡我們聯絡我們聯絡我們</p>

                    <p>聯絡我們</p>

                    <p>聯絡我們聯絡我們</p>

                    <p>聯絡我們聯絡我們聯絡我們</p>

                    <p>聯絡我們聯絡我們聯絡我們聯絡我們聯絡我們聯絡我們聯絡我們</p>
                    </div>
                </div>
                
                <div class="col-sm-6 col-xs-12">
                    <form action="" method="post">
                        <div id="contact_form_title">
                            聯絡表單
                        </div>
                        
                        <div class="contact_row">
                            <div class="contact_title">姓名</div>
                            <input class="contact_input" type="text" name="name" value="" placeholder="請輸入本名" required>
                        </div>
                        <div class="contact_row">
                            <div class="contact_title">電話</div>
                            <input class="contact_input" type="text" name="mobile" value="" placeholder="請輸入連絡電話" required>
                        </div>
                        <div class="contact_row">
                            <div class="contact_title">Line ID</div>
                            <input class="contact_input" type="text" name="line_id" value="" placeholder="請輸入Line ID" required>
                        </div>
                        <div class="contact_row">
                            <div class="contact_title">詢問內容</div>
                            <textarea class="contact_textarea" name="content" placeholder="請輸入您的需求"></textarea>
                        </div>
                        <div class="contact_form_row2">
                            <div class="google_verification" id="RecaptchaField1"></div>
                            
                            <button type="submit" class="submit_button">
                                <span>確認送出</span>
                                <i class="fa3 fa-long-arrow-right"></i>
                            </button>
                        </div><!-- contact_form_row -->
                        <script type="text/javascript">
                            var CaptchaCallback = function() {
                                grecaptcha.render('RecaptchaField1', {'sitekey' : '6LeTA8UUAAAAAL2WIcxVU_ZG_v5N705R3yzgEZiR'});
                            };
                        </script>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </section>

<?php include "foot.php" ?>
