<?php include_once("head.php");  ?>

<section>
        <div class="desk_page_block">
            <div class="desk_page_background">
                <img src="img/black_head_01.png" alt="">
                <div class="des_page_item">
                    <img src="img/member_title.png" alt="">
                </div>
            </div>
            <div class="des_page_item_RWD">
                <img src="img/member_title.png" alt="">
            </div>
        </div>
        <div class="member_login_page">
            <div class="member_login_block">
                <div class="member_login_title_block">
                    <div class="member_login_chinese_title">會員登入</div>
                    <div class="member_login_english_title">member Login</div>
                </div>
                <form action="" class="member_login_form">
                    <div class="member_login_form_item">
                        <div class="member_login_form_icon"><i class="fai fai-user-circle-o"></i></div>
                        <input type="text" id="member_phone" name="member_phone" placeholder="請輸入手機">
                    </div>
                    <div class="member_login_form_item">
                        <div class="member_login_form_icon"><i class="fak fak-lock"></i></div>
                        <input type="text" id="member_password" name="member_password" placeholder="請輸入密碼">
                    </div>
                    <a href="" class="forget_password">忘記密碼</a>
                    <div class="member_login_form_button">
                        <a href="#" class="register_button">註冊</a>
                        <a href="#" class="set_up_button">登入</a>
                    </div>
                    <script>
                        $(".member_login_form_item").find("input").click(function(){
                            $(".member_login_form_icon").removeClass("input_focus")
                            $(this).siblings(".member_login_form_icon").addClass("input_focus")
                        })
                    </script>
                    <!-- JS表單驗證 -->
                    <script>
                        var phoneCheck = /^[0][9]\d{8}$/
                        var passwordCheck = /^[0][9]\d{4}$/;
                        // 點擊驗證表單
                        $(".set_up_button").click(function(){
                            if($("#member_phone").val() =="" || phoneCheck.test($("#member_phone").val()) == false){
                                alert("請輸入手機,不可以空白或格式錯誤")
                                return false;
                            }
                            if($("#member_password").val() =="" || passwordCheck.test($("#member_password").val()) == false){
                                alert("請輸入密碼,不可以空白或格式錯誤")
                                return false;
                            }
                            
                            else {
                                $(".member_login_form").submit();
                            }
                        })
                    </script>
                </form>
            </div>
        </div>
        <div class="desk_product_page">
            <div class="desk_member_forget_bottom">
                <img src="img/deck3_1.png" alt="">
            </div>
            <div class="desk_member_forget_flower">
                <img src="img/flower.png" alt="">
            </div>
            <div class="desk_member_forget_knife">
                <img src="img/knife.png" alt="">
            </div>
            <div class="desk_member_forget_fork">
                <img src="img/fork.png" alt="">
            </div>

        </div>
        <div class="desk_product_page_RWD">
            <div class="desk_product_page_flower1_RWD">
                <img src="img/flower.png" alt="">
            </div>
            <div class="desk_product_page_basket_RWD">
                <img src="img/basket.png" alt="">
            </div>
        </div>
    </section>

<?php include_once("foot.php"); ?>