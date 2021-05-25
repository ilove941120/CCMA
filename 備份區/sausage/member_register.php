<?php include_once("head.php");  ?>

<!-- 頁面內容 -->
    
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
        <div class="member_registered_page">
            <div class="member_registered_block">
                <div class="member_registered_title_block">
                    <div class="member_registered_chinese_title">會員註冊</div>
                    <div class="member_registered_english_title">member registered</div>
                </div>
                <form action="" class="member_registered_form">
                    <div class="member_registered_form_item">
                        <label for="member_phone">會員帳號</label>
                        <input type="text" id="member_phone" name="member_phone" placeholder="請輸入手機號碼">
                    </div>
                    <div class="member_registered_form_item">
                        <label for="member_password">會員密碼</label>
                        <input type="text" id="member_password" name="member_password" placeholder="請輸入密碼">
                    </div>
                    <div class="member_registered_form_item">
                        <label for="member_password_same">確認密碼</label>
                        <input type="text" id="member_password_same" name="member_password_same" placeholder="請再次確認密碼">
                    </div>
                    <div class="member_registered_form_row">
                        <div class="member_registered_form_item_name">
                            <label for="member_name">姓名</label>
                            <input type="text" id="member_name" name="member_name" placeholder="請輸入中文姓名">
                        </div>
                        <div class="member_registered_form_item_gender">
                            <div class="radio_item"><input type="radio" name="member_gender" id="member_gender" value="male" checked>先生</div>
                            <div class="radio_item"><input type="radio" name="member_gender" id="member_gender" value="female">小姐</div>
                        </div>
                    </div>
                    <div class="member_registered_form_row">
                        <div class="member_registered_form_item_50">
                            <label for="member_company">公司</label>
                            <input type="text" id="member_company" name="member_company" placeholder="請輸入公司">
                        </div>
                        <div class="member_registered_form_item_50">
                            <label for="member_post">職稱</label>
                            <input type="text" id="member_post" name="member_post" placeholder="請輸入職稱">
                        </div>
                    </div>
                    <div class="member_registered_form_row">
                        <div class="member_registered_form_item_50">
                            <label for="member_contact_phone">電話</label>
                            <input type="text" id="member_contact_phone" name="member_contact_phone" placeholder="請輸入電話">
                        </div>
                        <div class="member_registered_form_item_50">
                            <label for="member_fax">傳真</label>
                            <input type="text" id="member_fax" name="member_fax" placeholder="請輸入傳真">
                        </div>
                    </div>
                    <div class="member_registered_form_item">
                        <label for="member_email">E-mail</label>
                        <input type="email" id="member_email" name="member_email" placeholder="請輸入信箱">
                    </div>
                    <label for="member_introducer">介紹</label>
                    <div class="member_registered_form_row">
                        <div class="member_registered_form_item_introducer">
                            <div class="radio_block">
                                <div class="radio_item"><input type="radio" name="member_introducer" id="member_introducer" value="1" checked>無</div>
                                <div class="radio_item"><input type="radio" name="member_introducer" id="member_introducer" value="2">有</div>
                            </div>
                            <input type="text" id="member_introducer" name="member_introducer" placeholder="請輸入介紹人">
                        </div>
                    </div>
                    <label for="member_phone">地址</label>
                    <div class="member_registered_form_row">
                        <div class="member_registered_form_item_address">
                            
                            <div class="select_block">
                                <select id="country" name="country">
                                    <option value="">選擇國家</option>
                                    <option value="">台灣</option>
                                    <option value="">日本</option>
                                </select>
                                <select id="city" name="city">
                                    <option value="">選擇縣市</option>
                                    <option value="">台中</option>
                                    <option value="">台北</option>
                                </select>
                                <select id="area" name="area">
                                    <option value="">選擇區域</option>
                                    <option value="">西屯</option>
                                    <option value="">北屯</option>
                                </select>
                            </div>
                            <input type="text" id="member_address" name="member_address" placeholder="請輸入街/巷/弄/號/樓...">

                        </div>
                    </div>
                    <div class="member_registered_form_row">
                        <div class="i_agree_block"><input type="checkbox" name="i_agree" id="i_agree">我同意本網站<a href="">服務挑款</a> 與<a href="">隱私權政策</a> </div>
                    </div>
                    <div class="member_registered_verificationBlock">
                        <div class="g-recaptcha" data-sitekey="AIzaSyA1pjEmAoe0XG4iW6x1qQ8ZnEcDQdvhHBc"></div>
                    </div>
                    <div class="member_registered_form_row">
                        <a href="#" class="member_registered_sent_button">確認註冊</a>
                    </div>
                </form>
                <script>
                    var chineseNameCheck = /^[\u4E00-\u9FA5]+$/;
                    var phoneCheck = /^[0][9]\d{8}$/
                    var city_phone_check = /^[0]\d{1,2}-\d{6,8}$/
                    var emailCheck = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                    
                    // 點擊驗證表單
                    $(".member_registered_sent_button").click(function(){
                        if($("#member_phone").val() =="" || phoneCheck.test($("#member_phone").val()) == false){
                            alert("請輸入手機號碼,或是格式錯誤")
                            return false;
                        }
                        if($("#member_password").val() ==""){
                            alert("請輸入新密碼,不可以空白")
                            return false;
                        }
                        if($("#member_password_same").val() =="" || $("#member_password_same").val() != $("#member_password").val()){
                            alert("請再次輸入新密碼,不可以空白,新密碼不同")
                            return false;
                        }
                        if($("#member_name").val() =="" || chineseNameCheck.test($("#member_name").val()) == false){
                            alert("請輸入中文姓名")
                            return false;
                        }
                        if($("#member_company").val() ==""){
                            alert("請輸入公司名稱,不可以空白")
                            return false;
                        }
                        if($("#member_post").val() ==""){
                            alert("請輸入職位,不可以空白")
                            return false;
                        }
                        if($("#member_contact_phone ").val() =="" || city_phone_check.test($("#member_contact_phone ").val()) == false){
                            alert("請輸入電話,不可以空白或格式錯誤,電話格式0X-XXXXXXXX")
                            return false;
                        }
                        if($("#member_fax").val() =="" || city_phone_check.test($("#member_fax").val()) == false){
                            alert("請輸入傳真,不可以空白或格式錯誤,電話格式0X-XXXXXXXX")
                            return false;
                        }
                        if($("#member_email").val() =="" || emailCheck.test($("#member_email").val()) == false){
                            alert("請輸入信箱,不可以空白或格式錯誤")
                            return false;
                        }
                        if($("#country").val() =="0"){
                            alert("請選擇國家")
                            return false;
                        }
                        if($("#city").val() =="0"){
                            alert("請選擇縣市")
                            return false;
                        }
                        if($("#area").val() =="0"){
                            alert("請選擇區域")
                            return false;
                        }
                        var check=$("input[name='i_agree']:checked").length;//判斷有多少個方框被勾選
                        if(check==0){
                            alert("您尚同意不能提交表單");
                            return false;//不要提交表單
                        }
                        else {
                            $(".member_registered_form").submit();
                        }
                    })
                </script>
            </div>
        </div>
        <div class="desk_product_page">
            <div class="desk_member_register_bottom">
                <img src="img/deck4.png" alt="">
                <div class="desk_member_register_spoon">
                    <img src="img/Spoon.png" alt="">
                </div>
                <div class="desk_member_register_fork">
                    <img src="img/fork1.png" alt="">
                    <div class="desk_member_sausage">
                        <img src="img/sausage.png" alt="">
                    </div>
                </div>
            </div>
            <div class="desk_member_data_flower">
                <img src="img/flower.png" alt="">
            </div>
            
            <div class="desk_member_data_side">
                <img src="img/side.png" alt="">
            </div>
            <div class="desk_member_data_grass">
                <img src="img/grass2.png" alt="">
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