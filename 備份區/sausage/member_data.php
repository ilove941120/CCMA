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
        <div class="member_order_inquiry_in_page">
            <div class="container">
                <div class="member_order_inquiry_in_block">
                    <div class="member_sort_list_block">
                        <div class="member_sort_list_title">會員中心 </div>
                        <a href="#" class="member_sort_list_item list_item_active">帳號管理 <i class="fak fa-chevron-right-mdc icon_active"></i></a>
                        <a href="#" class="member_sort_list_item">交易查詢 <i class="fak fa-chevron-right-mdc"></i></a>
                        <a href="#" class="member_sort_list_item">密碼變更 <i class="fak fa-chevron-right-mdc"></i></a>
                        <a href="#" class="member_sort_list_item">會員登出 <i class="fak fa-chevron-right-mdc"></i></a>
                        <div class="member_sort_list_group_RWD">
                            <a href="#" class="member_sort_list_item_RWD list_item_active">帳號管理</a>
                            <a href="#" class="member_sort_list_item_RWD">交易查詢</a>
                            <a href="#" class="member_sort_list_item_RWD">密碼變更</a>
                            <a href="#" class="member_sort_list_item_RWD">會員登出</a>
                            
                        </div>
                    </div>
                    <div class="member_registered_page">
                        <div class="member_registered_block">
                            <form action="" class="member_registered_form">
                                <div class="member_data_form_item">
                                    <label for="member_phone">會員編號</label>
                                    <input type="text" id="member_phone" name="member_phone"  value="12656788A37656788" readonly="readonly">
                                </div>
                                <div class="member_registered_form_row">
                                    <div class="member_data_form_item_name">
                                        <label for="member_name">姓名</label>
                                        <input type="text" id="member_name" name="member_name" value="陳橘野">
                                    </div>
                                    <div class="member_registered_form_item_gender">
                                        <div class="radio_item"><input type="radio" name="member_gender" id="member_gender" value="male" checked>先生</div>
                                        <div class="radio_item"><input type="radio" name="member_gender" id="member_gender" value="female">小姐</div>
                                    </div>
                                </div>
                                <div class="member_registered_form_row">
                                    <div class="member_registered_form_item_50">
                                        <label for="member_company">公司</label>
                                        <input type="text" id="member_company" name="member_company" value="橘野數位設計有限公司">
                                    </div>
                                    <div class="member_registered_form_item_50">
                                        <label for="member_post">職稱</label>
                                        <input type="text" id="member_post" name="member_post" value="採購">
                                    </div>
                                </div>
                                <div class="member_registered_form_row">
                                    <div class="member_registered_form_item_50">
                                        <label for="member_contact_phone">電話</label>
                                        <input type="text" id="member_contact_phone" name="member_contact_phone" value="0423583302" >
                                    </div>
                                    <div class="member_registered_form_item_50">
                                        <label for="member_fax">傳真</label>
                                        <input type="text" id="member_fax" name="member_fax" value="0423583303">
                                    </div>
                                </div>
                                <div class="member_data_form_item">
                                    <label for="member_phone">會員帳號</label>
                                    <input type="text" id="member_phone" name="member_phone"  value="0912345678" readonly="readonly">
                                </div>
                                <div class="member_registered_form_item">
                                    <label for="member_email">E-mail</label>
                                    <input type="email" id="member_email" name="member_email" value="geyes.service03@gmail.com">
                                </div>
                                <label for="member_phone">地址</label>
                                <div class="member_registered_form_row">
                                    <div class="member_registered_form_item_address">
                                        <div class="select_block">
                                            <select id="country" name="country">
                                                <option value="0">選擇國家</option>
                                                <option value="1">台灣</option>
                                                <option value="2">日本</option>
                                            </select>
                                            <select id="city" name="city">
                                                <option value="0">選擇縣市</option>
                                                <option value="1">台中</option>
                                                <option value="2">台北</option>
                                            </select>
                                            <select id="area" name="area">
                                                <option value="0">選擇區域</option>
                                                <option value="1">西屯</option>
                                                <option value="2">北屯</option>
                                            </select>
                                        </div>
                                        <input type="text" id="member_address" name="member_address"  value="天保街13號">
                                    </div>
                                </div>
                                
                                <div class="member_registered_form_row">
                                    <a href="#" class="member_registered_sent_button">變更儲存</a>
                                </div>
                            </form>
                            <script>
                                var chineseNameCheck = /^[\u4E00-\u9FA5]+$/;
                                var phoneCheck = /^[0][9]\d{8}$/
                                var city_phone_check = /^[0]\d{1,2}-\d{6,8}$/
                                var emailCheck = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                                // 點擊驗證表單
                                $(".member_registered_sent_button").click(function(){
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
                                    if($("#member_address").val() ==""){
                                        alert("請輸入地址,不可以空白")
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
                                    else {
                                        $(".member_registered_form").submit();
                                    }
                                })
                            </script>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="desk_product_page">
            <div class="desk_member_data_bottom">
                <img src="img/deck3_1.png" alt="">
                <div class="desk_member_data_fork">
                    <img src="img/fork1.png" alt="">
                </div>
                <div class="desk_member_data_spoon">
                    <img src="img/Spoon.png" alt="">
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