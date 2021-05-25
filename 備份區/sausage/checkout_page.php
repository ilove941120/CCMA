<?php include_once("head.php");  ?>

<section>
        <div class="desk_page_block">
            <div class="desk_page_background">
                <img src="img/black_head_01.png" alt="">
                <div class="des_page_item">
                    <img src="img/checkout_title.png" alt="">
                </div>
            </div>
            <div class="des_page_item_RWD">
                <img src="img/checkout_title.png" alt="">
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
        <div class="checkout_page">
            <div class="container">
                <div class="checkout_block">
                    <!-- 側邊 -->
                    <div class="checkout_side_block">
                        <div class="checkout_side_item_block ">
                            <div class="checkout_side_item active_side_item" id="checkout_side1">確認訂單項目</div>
                        </div>
                        <div class="checkout_side_item_block">
                            <div class="checkout_side_line610"></div>
                            <div class="checkout_side_item" id="checkout_side2">收件資料</div>
                        </div>
                        <div class="checkout_side_item_block">
                            <div class="checkout_side_line640"></div>
                            <div class="checkout_side_item">發票資料</div>
                        </div>
                        <div class="checkout_side_item_block">
                            <div class="checkout_side_line120"></div>
                            <div class="checkout_side_item">付款方式</div>
                        </div>
                    </div>
                    <!-- 主內容 -->
                    <div class="checkout_content">
                        <div class="checkout_content_title">購物清單確認</div>
                        <form action="" class="shopping_list_form">
                            <!-- 購物清單 -->
                            <div class="shopping_list">
                                <div class="shopping_list_top">
                                    <div class="list_product">
                                        <div class="list_product_img">
                                            <img src="./test_img/12563649_xxl.jpg" alt="">
                                        </div>
                                        <div class="list_product_name">商品名稱</div>
                                        <div class="list_product_quantity">
                                            <div class="list_product_lower_button"><i class="fak fa-minus-btm"></i></div>
                                            <input type="text" value="1" readonly="readonly" id="list_product_1" name="list_product_1">
                                            <div class="list_product_add_button"><i class="fak fa-plus-btm"></i></div>
                                        </div>
                                        <div class="list_product_price favourable">NT$<span class="price_total">100</span></div>
                                        <div class="list_product_unit_price">100</div>
                                        <div class="list_product_remove"><i class="fak fa-trash-fa"></i></div>
                                    </div>
                                    <div class="list_product">
                                        <div class="list_product_img">
                                            <img src="./test_img/12563649_xxl.jpg" alt="">
                                        </div>
                                        <div class="list_product_name">商品名稱</div>
                                        <div class="list_product_quantity">
                                            <div class="list_product_lower_button"><i class="fak fa-minus-btm"></i></div>
                                            <input type="text" value="1" readonly="readonly" id="list_product_2" name="list_product_2">
                                            <div class="list_product_add_button"><i class="fak fa-plus-btm"></i></div>
                                        </div>
                                        <div class="list_product_price favourable">NT$<span class="price_total">100</span></div>
                                        <div class="list_product_unit_price">100</div>
                                        <div class="list_product_remove"><i class="fak fa-trash-fa"></i></div>
                                    </div>
                                </div>
                                <div class="shopping_list_bottom">
                                    <div class="list_count_block">
                                        <div class="count_item">
                                            <div class="cout_item_title">商品金額小計</div>
                                            <div class="cout_item_content">NT$<span class="list_price_total">3160</span> </div>
                                        </div>
                                        <div class="count_item favourable">
                                            <div class="cout_item_title">優惠折抵(<span class="discount">8.5</span>折)</div>
                                            <div class="cout_item_content">-NT$<span class="discount_price">50</span></div>
                                        </div>
                                        <div class="count_item">
                                            <div class="cout_item_title">運費</div>
                                            <div class="cout_item_content">NT$<span class="shipping">50</span></div>
                                        </div>
                                        <div class="list_total_amount">
                                            <div class="list_total_amount_title">總金額</div>
                                            <div class="list_total_amount_content">NT$<span class="list_last_price">2737</span></div>
                                        </div>
                                    </div>
                                </div>
                                <script>
                                    var list_product_lower_button =$(".list_product_lower_button")
                                    var list_product_add_button =$(".list_product_add_button")
                                    var list_product_remove =$(".list_product_remove i")
                                    
                                    // 載入頁面計算
                                    $(document).ready(function(){
                                        var product_price = $(this).parents(".list_product").find(".list_product_unit_price")
                                        var price_total =$(this).parents(".list_product").find(".price_total");
                                        var input_number =$(this).siblings("input")
                                        var all_item_price=0;
                                        // 商品小記價格
                                        $(".price_total").each(function(){
                                            all_item_price += parseInt($(this).text());
                                        })
                                        $(".list_price_total").text(all_item_price)
                                        // 折價
                                        var discount = (($(".discount").text())/100)
                                        var discount_price =all_item_price * (discount)
                                        $(".discount_price").text(parseInt(discount_price))
                                        // 總價格
                                        var last_toal = all_item_price - (parseInt($(".discount_price").text())) + (parseInt($(".shipping").text()))
                                        $(".list_last_price").text(last_toal)
                                    })

                                    // 增加數量按鈕
                                    list_product_add_button.click(function(){
                                        var product_price = $(this).parents(".list_product").find(".list_product_unit_price")
                                        var price_total =$(this).parents(".list_product").find(".price_total");
                                        var input_number =$(this).siblings("input")
                                        var all_item_price=0;
                                        

                                        // 數量+1
                                        input_number.val(parseInt(input_number.val()) + 1)
                                        // 價格變化
                                        price_total.text(parseInt(input_number.val()) * parseInt(product_price.text()) );

                                        // 全部商品小計金額
                                        $(".price_total").each(function(){
                                            all_item_price += parseInt($(this).text());
                                        })
                                        $(".list_price_total").text(all_item_price)
                                        // 折價
                                        var discount = (($(".discount").text())/100)
                                        var discount_price =all_item_price * (discount)
                                        $(".discount_price").text(parseInt(discount_price))
                                        // 總價格
                                        var last_toal = all_item_price - (parseInt($(".discount_price").text())) + (parseInt($(".shipping").text()))
                                        $(".list_last_price").text(last_toal)
                                    })
                                    // 減少數量按鈕
                                    list_product_lower_button.click(function(){
                                        var product_price = $(this).parents(".list_product").find(".list_product_unit_price")
                                        var price_total =$(this).parents(".list_product").find(".price_total");
                                        var input_number =$(this).siblings("input")
                                        var all_item_price=0;
                                        // 數量-1 加價格變化
                                        if(input_number.val()>1){
                                            input_number.val(parseInt(input_number.val()) - 1)
                                            price_total.text(parseInt(input_number.val()) * parseInt(product_price.text()));
                                        }
                                        // 全部商品小計金額
                                        $(".price_total").each(function(){
                                            all_item_price += parseInt($(this).text());
                                        })
                                        $(".list_price_total").text(all_item_price)
                                        // 折價
                                        var discount = (($(".discount").text())/100)
                                        var discount_price =all_item_price * (discount)
                                        $(".discount_price").text(parseInt(discount_price))
                                        // 總價格
                                        var last_toal = all_item_price - (parseInt($(".discount_price").text())) + (parseInt($(".shipping").text()))
                                        $(".list_last_price").text(last_toal)

                                    })
                                    // 移除商品按鈕
                                    list_product_remove.click(function(){
                                        // var shopping_list_hight = $(".shopping_list").height()
                                        // $(".checkout_side_line610").height(shopping_list_hight+100)
                                        // console.log(shopping_list_hight)
                                        var all_item_price=0;
                                        // 商品移除
                                        $(this).parents(".list_product").remove()
                                        // 全部商品小計金額
                                        $(".price_total").each(function(){
                                            all_item_price += parseInt($(this).text());
                                        })
                                        $(".list_price_total").text(all_item_price)
                                        // 折價
                                        var discount = (($(".discount").text())/100)
                                        var discount_price =all_item_price * (discount)
                                        $(".discount_price").text(parseInt(discount_price))
                                        if( last_toal == 0){
                                            $(".discount_price").text(0)
                                        }
                                        // 總價格
                                        var last_toal = all_item_price - (parseInt($(".discount_price").text())) + (parseInt($(".shipping").text()))
                                        $(".list_last_price").text(last_toal)

                                        
                                    })
                                </script>
                            </div>
                            <div class="next_button1">下一步1</div>
                            <!-- 收件資訊 -->
                            <div class="addressee_block">
                                <div class="addressee_form_title">收件資訊</div>
                                <div class="addressee_form_item_block">
                                    <div class="addressee_form_item_title">*收件人姓名</div>
                                    <input type="text" placeholder="請輸入您的姓名" id="addressee_name">
                                </div>
                                <div class="addressee_form_item_block">
                                    <div class="addressee_form_item_title">*手機號碼</div>
                                    <input type="text" placeholder="請輸入您的聯絡手機" id="addressee_phone">
                                </div>
                                <div class="addressee_form_item_block">
                                    <div class="addressee_form_item_title">*收件地址</div>
                                    <div class="select_block">
                                        <input type="text" placeholder="郵遞區號" id="postal_code" name="postal_code">
                                        <select name="city" id="city" >
                                            <option value="0">請選擇縣市</option>
                                            <option value="1">台中市</option>
                                            <option value="2">台北市</option>
                                        </select>
                                        <select name="area" id="area" >
                                            <option value="0">請選擇鄉鎮市區</option>
                                            <option value="1">西屯區</option>
                                            <option value="2">北屯區</option>
                                        </select>
                                    </div>
                                    <input type="text" placeholder="巷/街/弄/號/樓..." name="addressee" id="addressee">
                                </div>
                                <div class="addressee_form_item_block">
                                    <div class="addressee_form_item_title">*信箱</div>
                                    <input type="text" placeholder="請輸入您的E-mail信箱" id="addressee_email">
                                </div>
                                <div class="addressee_form_item_block">
                                    <div class="addressee_form_item_title">備註</div>
                                    <textarea name="addressee_text" id="addressee_text" cols="30" rows="10"></textarea>
                                </div>
                                <div class="next_button2">下一步2</div>
                            </div>
                            <!-- 發票資料 -->
                            <div class="invoice_block">
                                <div class="invoice_title">發票資料</div>
                                <div class="invoice_item_block">
                                    <div class="invoice_item"><input type="radio" name="invoice" id="invoice" value="1" class="electronic_invoice" checked>電子發票</div>
                                </div>
                                <div class="invoice_item_block">
                                    <div class="invoice_item"><input type="radio" name="invoice" id="invoice" value="2" class="prove_electronic_invoice">公司索取電子發票證明聯</div>
                                    <div class="invoice_item"><div class="invoice_item_text">統一編號</div>  <input type="text" name="tax_ID_number" id="tax_ID_number"></div>
                                    <div class="invoice_item"><div class="invoice_item_text">發票抬頭</div> <input type="text" name="invoice_title" id="invoice_title"></div>
                                </div>
                                <div class="next_button3">下一步3</div>
                            </div>
                            <!-- 付款方式 -->
                            <div class="pay_method">
                                <div class="pay_method_title">付款方式</div>
                                <div class="pay_item_block">
                                    <label for="pay_method">付款方式</label>
                                    <select name="pay_method" id="pay_method">
                                        <option value="0">請選擇付款方式</option>
                                        <option value="1">信用卡</option>
                                        <option value="2">匯款</option>
                                    </select>
                                </div>
                            </div>
                            <!-- 送出按鈕區 -->
                            <div class="checkout_form_sent_block">
                                <div class="i_agree_block"><input type="checkbox" name="i_agree" id="i_agree">我同意本網站<a href="">服務挑款</a> 與<a href="">隱私權政策</a> </div>
                                <div class="checkout_sent_button">確認付款</div>
                            </div>
                        </form>
                        <!-- JS表單驗證 -->
                        <script>
                            var chineseNameCheck = /^[\u4E00-\u9FA5]+$/;
                            var phoneCheck = /^[0][9]\d{8}$/
                            var emailCheck = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                            var tax_ID_number_Check = /^[0-9]{8}$/;;
                            var postal_code_Check = /[0-9]d{3}||[0-9]d{5}/;
                            // 點擊驗證表單
                            $(".checkout_sent_button").click(function(){
                                if($("#addressee_name").val() =="" || chineseNameCheck.test($("#addressee_name").val()) == false){
                                    alert("請輸入中文姓名")
                                    return false;
                                }
                                if($("#addressee_phone").val() =="" || phoneCheck.test($("#addressee_phone").val()) == false){
                                    alert("請輸入手機,不可以空白或格式錯誤")
                                    return false;
                                }
                                if($("#postal_code").val() =="" || postal_code_Check.test($("#postal_code").val()) == false){
                                    alert("請輸入郵局區號,不可以空白或格式錯誤");
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
                                if($("#addressee").val() ==""){
                                    alert("請輸入地址,不可以空白")
                                    return false;
                                }
                                if($("#addressee_email").val() =="" || emailCheck.test($("#addressee_email").val()) == false){
                                    alert("請輸入信箱,不可以空白或格式錯誤")
                                    return false;
                                }
                                if(!$.trim($("#addressee_text").val())){
                                    alert("請輸入詢問內容,不可以空白")
                                    return false;
                                }
                                
                                var list= $('input:radio[name="invoice"]:checked').val();
                                if(list==2){
                                    if($("#tax_ID_number").val() =="" || tax_ID_number_Check.test($("#tax_ID_number").val()) == false){
                                        alert("請填寫統一編號")
                                        return false;
                                    }
                                    if($("#invoice_title").val() ==""){
                                        alert("請填寫阿票抬頭")
                                        return false;
                                    }
                                }
                                if($("#pay_method").val() =="0"){
                                    alert("請選擇付款方式")
                                    return false;
                                }
                                var check=$("input[name='i_agree']:checked").length;//判斷有多少個方框被勾選
                                if(check==0){
                                    alert("您尚同意不能提交表單");
                                    return false;//不要提交表單
                                }
                                else {
                                    $(".shopping_list_form").submit();
                                }
                                
                            })
                        </script>
                    </div>
                    <!-- 點擊下一步 -->
                    <script>
                        $(".checkout_side_item").hide()
                        $(".checkout_side_item").eq(0).show()
                        $(".next_button1").click(function(){
                            var checkout_side1 = $("#checkout_side1").offset().top
                            var checkout_side2 = $("#checkout_side2").offset().top
                            var shopping_list_hight = $(".shopping_list").height()
                            var shopping_list_top = $(".shopping_list").offset().top


                            var addressee_form_title_top =$(".addressee_form_title").offset().top

                            // console.log(addressee_form_title_top - shopping_list_top - shopping_list_hight)
                            console.log(addressee_form_title_top)
                            console.log(shopping_list_top)
                            console.log(shopping_list_hight)

                            $(".addressee_block").slideDown()
                            $(".next_button1").addClass("remove")
                            $(".checkout_side_line610").height(shopping_list_hight+100)
                            $(".checkout_side_item").eq(0).removeClass("active_side_item")
                            $(".checkout_side_item").eq(1).delay(1000).slideDown().addClass("active_side_item")
                        })
                        $(".next_button2").click(function(){
                            $(".invoice_block").slideDown()
                            $(".next_button2").addClass("remove")
                            $(".checkout_side_line640").addClass('add_height640')
                            $(".checkout_side_item").eq(1).removeClass("active_side_item")
                            $(".checkout_side_item").eq(2).delay(1000).slideDown().addClass("active_side_item")
                        })
                        $(".next_button3").click(function(){
                            $(".pay_method").slideDown()
                            $(".checkout_form_sent_block").slideDown()
                            $(".next_button3").addClass("remove")
                            $(".checkout_side_line120").addClass('add_height120')
                            $(".checkout_side_item").eq(2).removeClass("active_side_item")
                            $(".checkout_side_item").eq(3).delay(1000).slideDown().addClass("active_side_item")
                        })
                    </script>
                </div>
            </div>
            
        </div>
        <div class="desk_checkout_page">
            <div class="desk_baceground_buttom"></div>
        </div>
        
        
    </section>

<?php include_once("foot.php"); ?>