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
        <div class="member_password_update_page">
            <div class="container">
                <div class="member_password_update_block">
                    <div class="member_sort_list_block">
                        <div class="member_sort_list_title">會員中心 </div>
                        <a href="#" class="member_sort_list_item">帳號管理 <i class="fak fa-chevron-right-mdc"></i></a>
                        <a href="#" class="member_sort_list_item">交易查詢 <i class="fak fa-chevron-right-mdc"></i></a>
                        <a href="#" class="member_sort_list_item list_item_active">密碼變更 <i class="fak fa-chevron-right-mdc icon_active"></i></a>
                        <a href="#" class="member_sort_list_item">會員登出 <i class="fak fa-chevron-right-mdc"></i></a>
                        <div class="member_sort_list_group_RWD">
                            <a href="#" class="member_sort_list_item_RWD">帳號管理</a>
                            <a href="#" class="member_sort_list_item_RWD">交易查詢</a>
                            <a href="#" class="member_sort_list_item_RWD list_item_active">密碼變更</a>
                            <a href="#" class="member_sort_list_item_RWD">會員登出</a>
                            
                        </div>
                    </div>
                    <div class="member_password_update_content_block">
                        <form action="" class="member_password_update_form">
                            <div class="member_password_update_item">
                                <label for="">會員舊密碼</label>
                                <input type="text" id="old_password">
                            </div>
                            <div class="member_password_update_item">
                                <label for="">會員密碼</label>
                                <input type="text" id="new_password">
                            </div>
                            <div class="member_password_update_item">
                                <label for="">確認密碼</label>
                                <input type="text" id="check_new_password">
                            </div>
                            <div class="member_password_update_sent_button">
                                確認變更
                            </div>
                        </form>
                        <script>
                            var phoneCheck = /^[0][9]\d{8}$/
                            var old_password_check = /^[0][0][1]$/
                            var new_password = $("#member_password").val()
                            // 點擊驗證表單
                            $(".member_password_update_sent_button").click(function(){
                                if($("#old_password").val() =="" || old_password_check.test($("#old_password").val()) == false){
                                    alert("請輸入舊密碼,不可以空白或格式錯誤")
                                    return false;
                                }
                                if($("#new_password").val() ==""){
                                    alert("請輸入新密碼,不可以空白")
                                    return false;
                                }
                                if($("#check_new_password").val() =="" || $("#check_new_password").val() != $("#new_password").val()){
                                    alert("請再次輸入新密碼,不可以空白,新密碼不同")
                                    return false;
                                }
                                else {
                                    $(".member_password_update_form").submit();
                                }
                            })
                        </script>
                    </div>
                </div>
            </div>
        </div>
        <div class="desk_product_page">
            <div class="desk_member_forget_bottom">
                <img src="img/deck3_1.png" alt="">
            </div>
            <div class="desk_member_data_flower">
                <img src="img/flower.png" alt="">
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