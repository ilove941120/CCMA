<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="utf-8" lang="zh-TW" />
    <meta http-equiv="Content-Language" content="zh-tw" />
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="distribution" content="Taiwan">
    <meta name="keywords" content="<?php //echo ($keywords[0]->web_keyword != "") ? $keywords[0]->web_keyword : $default_keywords[0]->web_keyword;  ?>">
    <meta name="description" content="<?php //echo ($keywords[0]->web_description != "") ? $keywords[0]->web_description : $default_keywords[0]->web_description; ?>">
    <meta name="robots" content="none">

	<title><?php //echo ($keywords[0]->web_title != "") ? $keywords[0]->web_title : $default_keywords[0]->web_title; ?></title>

	<base href="<?php //echo base_url(); ?>">

    <link rel="shortcut icon" href="favicon.ico" >
    <link rel="stylesheet" href="css/bootstrap4.min.css">
    <link rel="stylesheet" href="css/external_i.css">
    <link rel="stylesheet" href="css/external_k.css">
    <link rel="stylesheet" href="css/external_g.css">
    <link rel="stylesheet" href="css/external_p.css">
    <link rel="stylesheet" href="css/slick.css">
    <link rel="stylesheet" href="css/slick-theme.css">
    <link rel="stylesheet" href="css/gs.css">

    <script language="javascript" src="js/jquery-1.12.3.min.js"></script>
    <script language="javascript" src="js/preload/jquery.preload.min.js"></script>
    <script src="js/slick.js"></script>
    <script src='https://www.google.com/recaptcha/api.js'></script>

    <!-- <script src="js/js.js"></script>
    <script language="javascript">
    $.preload('','');
    </script> -->
    
    <div class="head">
        <div class="head_block">
            <div class="menu_bar">
                <div class="head_search">
                    <div class="head_search_icon_block"><i class="fap fa-search-btb"></i></div>
                    <input type="text" placeholder="尋找產品">
                </div>
                <a href="#" class="menu_item">產品專區</a>
                <a href="#" class="menu_item">聯絡我們</a>
                <a href="#" class="menu_item">會員中心</a>
                <a href="#" class="menu_line"><i class="fap fa-line02"></i></a>
                <div class="menu_group_RWD"><i class="fap fa-bars"></i></div>
            </div>
            
        </div>
        <div class="desk_head_block">
            <img src="img/head_background.png" alt="">
            <div class="desk_head_logo">
                <img src="img/logo1.png" alt="">
            </div>
        </div>
    </div>
    <div class="menu_group">
        <div class="menu_group_close"><i class="fak fa-close"></i></div>
        <a href="#" class="menu_group_item">產品專區</a>
        <a href="#" class="menu_group_item">聯絡我們</a>
        <a href="#" class="menu_group_item">立即結帳</a>
        <a href="#" class="menu_group_item">會員中心</a>
    </div>
    <script>
        $(".menu_group_RWD").click(function(){
            $(".menu_group").fadeIn()
        })
        $(".menu_group_close").click(function(){
            $(".menu_group").fadeOut()
        })
    </script>
   
    <!-- 側邊購物車 -->
    <section>
        <div class="side_cart_button">
            <div class="side_item">
                <i class="fak fak-shopping-cart-typcn"></i>
                <div class="quantity">(<span class="all_product_number_out">5</span>)</div>
            </div>
            <div class="divider"></div>
            <div class="side_item">
                <i class="fak fa-heart-fi"></i>
                <div class="quantity">(<span>5</span>)</div>
            </div>
            <div class="divider"></div>
            <div class="side_item">
                <i class="fak fak-clock-btm"></i>
                <div class="record">瀏覽紀錄</div>
            </div>
        </div>
        
        <div class="side_shop_cart">
            <div class="shop_cart_head">
                <i class="fap fa-chevron-left"></i>
                瀏覽紀錄(<span class="all_product_number">4</span>)
                <div class="close_button">	
                    <i class="fak fa-cross"></i>
                </div>
            </div>
            <div class="shop_cart_content">
                <div class="shop_cart_item">
                    <div class="checkbox">
                        <input type="checkbox" name="" id="">
                    </div>
                    <div class="shop_cart_item_img">
                        <img src="img/test1.png" alt="">
                    </div>
                    <div class="shop_cart_item_content">
                        <div class="shop_cart_item_name">商品名稱商品名稱商品名稱商</div>
                        <div class="shop_cart_item_price">NT$ <span>6000</span></div>
                    </div>
                    <div class="shop_cart_item_delete"><i class="fak fa-trash-fa"></i></div>
                </div>
                <div class="shop_cart_item">
                    <div class="checkbox">
                        <input type="checkbox" name="" id="">
                    </div>
                    <div class="shop_cart_item_img">
                        <img src="img/test1.png" alt="">
                    </div>
                    <div class="shop_cart_item_content">
                        <div class="shop_cart_item_name">商品名稱</div>
                        <div class="shop_cart_item_price">NT$ <span>6000</span></div>
                    </div>
                    <div class="shop_cart_item_delete"><i class="fak fa-trash-fa"></i></div>
                </div>
                <div class="shop_cart_item">
                    <div class="checkbox">
                        <input type="checkbox" name="" id="">
                    </div>
                    <div class="shop_cart_item_img">
                        <img src="img/test1.png" alt="">
                    </div>
                    <div class="shop_cart_item_content">
                        <div class="shop_cart_item_name">商品名稱</div>
                        <div class="shop_cart_item_price">NT$ <span>6000</span></div>
                    </div>
                    <div class="shop_cart_item_delete"><i class="fak fa-trash-fa"></i></div>
                </div>
                <div class="shop_cart_item">
                    <div class="checkbox">
                        <input type="checkbox" name="" id="">
                    </div>
                    <div class="shop_cart_item_img">
                        <img src="img/test1.png" alt="">
                    </div>
                    <div class="shop_cart_item_content">
                        <div class="shop_cart_item_name">商品名稱</div>
                        <div class="shop_cart_item_price">NT$ <span>6000</span></div>
                    </div>
                    <div class="shop_cart_item_delete"><i class="fak fa-trash-fa"></i></div>
                </div>
                
                
            </div>
            <div class="shop_cart_foot">
                <div class="delete_button">刪除</div>
                <div class="join_button">加入購物車</div>
            </div>
        </div>
        <script>
            $(".side_cart_button").click(function(){
                $(".side_shop_cart").slideToggle()
                var product_width = $(".shop_cart_item_img").width()
                $(".shop_cart_item_img").height(product_width)
            })
            $(".close_button").click(function(){
                $(".side_shop_cart").hide()
            })
            $(".shop_cart_item_delete").click(function(){
                var all_item=0;
                $(this).parents(".shop_cart_item").remove()

                $(".shop_cart_item").each(function(){
                    all_item++
                })
                $(".all_product_number").text(all_item)
                $(".all_product_number_out").text(all_item)
                

            })
            $(document).ready(function(){
                var all_item=0;
                $(".shop_cart_item").each(function(){
                    all_item++
                })
                $(".all_product_number").text(all_item)
                $(".all_product_number_out").text(all_item)
            })
        </script>
        <script>
            $(document).ready(function(){
                var product_width = $(".shop_cart_item_img").width()
                $(".shop_cart_item_img").height(product_width)
            })
            $(window).resize(function(){
                var product_width = $(".shop_cart_item_img").width()
                $(".shop_cart_item_img").height(product_width)
            })
        </script>
    </section>

</head>
<body>
