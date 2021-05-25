<?php include_once("head.php");  ?>

<!-- 頁面內容 -->
<section>
        <div class="desk_page_block">
            <div class="desk_page_background">
                <img src="img/black_head_01.png" alt="">
                <div class="des_page_item">
                    <img src="img/contact_page_title.png" alt="">
                </div>
            </div>
            <div class="des_page_item_RWD">
                <img src="img/contact_page_title.png" alt="">
            </div>
        </div>
        <div class="contact_page">
            <div class="contact_news_RWD">
                <div class="contact_news_item_RWD">
                    <div class="contact_icon_RWD"><i class="fak fa-phone-in-talk"></i></div>
                    <div class="contact_text_RWD">0937656788</div>
                </div>
                <div class="contact_news_item_RWD">
                    <div class="contact_icon_RWD"><i class="fai fa-pl1"></i></div>
                    <div class="contact_text_RWD">台北市大安區復興南路二段一五一巷八號五樓之三</div>
                </div>
            </div>

            <form action="" class="contact_form_style">
                <div class="contact_form_item">
                    <div class="input_icon">
                        <i class="fap fa-user"></i>
                    </div>
                    <input type="text" placeholder="姓名" id="visitor_name" name="visitor_name">
                </div>
                <div class="contact_form_item">
                    <div class="input_icon">
                        <i class="fap fa-phone-bts"></i>
                    </div>
                    <input type="text" placeholder="手機" id="visitor_phone" name="visitor_phone">
                </div>
                <div class="contact_form_item">
                    <div class="input_icon">
                        <i class="fap fa-line02"></i>
                    </div>
                    <input type="text" placeholder="Line ID" id="visitor_line" name="visitor_line">
                </div>
                <div class="contact_form_item">
                    <div class="input_icon">
                        <i class="fag fa-flag"></i>
                    </div>
                    <input type="text" placeholder="詢問產品" id="ask_product" name="ask_product">
                </div>
                <div class="contact_form_textarea">
                    <label for="ask_content" class="label_style">
                        <div class="input_icon">
                            <i class="fag fa-flag"></i>
                        </div>
                        <div class="ask_title">詢問內容</div>
                    </label>
                    <textarea name="" id="ask_content" cols="30" rows="5" name="ask_content"></textarea>
                </div>
                <div class="contact_form_bottom">
                    <div class="prompt_block">↓↓↓請勾選『我不是機器人』↓↓↓</div>
                    <div class="verificationBlock">
                        <div class="g-recaptcha" data-sitekey="AIzaSyA1pjEmAoe0XG4iW6x1qQ8ZnEcDQdvhHBc"></div>
                    </div>
                    <div class="sent_button">送出表單</div>
                </div>
            </form>
            <!-- JS表單驗證 -->
            <script>
                var chineseNameCheck = /^[\u4E00-\u9FA5]+$/;
                var phoneCheck = /^[0][9]\d{8}$/
                var emailCheck = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                // 點擊驗證表單
                $(".sent_button").click(function(){
                    if($("#visitor_name").val() =="" || chineseNameCheck.test($("#visitor_name").val()) == false){
                        alert("請輸入中文姓名")
                        return false;
                    }
                    if($("#visitor_phone").val() =="" || phoneCheck.test($("#visitor_phone").val()) == false){
                        alert("請輸入手機,不可以空白或格式錯誤")
                        return false;
                    }
                    if($("#visitor_line").val() ==""){
                        alert("請輸入lineID,不可以空白或格式錯誤")
                        return false;
                    }
                    if($("#ask_product").val() ==""){
                        alert("請輸入詢問產品,不可以空白")
                        return false;
                    }
                    if(!$.trim($("#ask_content").val())){
                        alert("請輸入詢問內容,不可以空白")
                        return false;
                    }
                    else {
                        $(".contact_form_style").submit();
                    }
                })
            </script>
        </div>
        <div class="desk_product_page">
            <div class="desk_contact_page_bottom">
                <img src="img/deck4.png" alt="">
                <div class="desk_contact_page_bottom_fork">
                    <img src="img/fork1.png" alt="">
                </div>
                <div class="desk_contact_page_bottom_spoon">
                    <img src="img/Spoon.png" alt="">
                </div>
            </div>
            <div class="desk_contact_page_top">
                <img class="desk_contack_bottom" src="img/desk_contack_bottom.png" alt="">
                <img class="desk_shop" src="img/shop_decoration.png" alt="">
                <div class="contact_phone">
                    <div class="phone_icon"><i class="fak fa-phone-in-talk"></i></div>
                    <div class="contact_phone_text">0937656788</div>
                </div>
                <div class="contact_address">
                    <div class="address_icon"><i class="fai fa-pl1"></i></div>
                    <div class="contact_adress_text">台北市大安區復興南路二段
                        一五一巷八號五樓之三</div>
                </div>
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