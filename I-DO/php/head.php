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

	<!-- <base href="<?php //echo base_url(); ?>"> -->

    <link rel="shortcut icon" href="favicon.ico" >
    <!-- <link rel="stylesheet" href="css/gs.css?<?php //echo time(); ?>" /> -->
    <link rel="stylesheet" href="../css/bootstrap4.min.css">
    <link rel="stylesheet" href="../css/slick.css">
    <link rel="stylesheet" href="../css/slick-theme.css">
    <link rel="stylesheet" href="../css/gs.css">
    

    <script language="javascript" src="../js/jquery-1.12.3.min.js"></script>
    <script language="javascript" src="../js/preload/jquery.preload.min.js"></script>
    <script src="../js/bootstrap4.js"></script>
    <script src="../js/slick.js"></script>
    <script src="js/js.js"></script>
    <script language="javascript">
    $.preload('','');
    </script>

</head>
<body>

    <!-- head主選單 -->
    <div class="head">
        <div class="language_block_RWD">
            <a href="#" class="language_RWD language_active">繁中</a>
            <a href="#" class="language_RWD">EN</a>
        </div>
        <div class="container">
            
            <div class="row">
                <div class="menu_block">
                    <a href="#" class="menu_item">首頁</a>
                    <a href="#" class="menu_item">關於我們</a>
                    <div class="menu_logo"></div>
                    <div class="menu_item">產品介紹</div>
                    <div class="menu_item_list">
                        <a href="#" class="list_sort">產品分類1</a>
                        <a href="#" class="list_sort">產品分類2</a>
                        <a href="#" class="list_sort">產品分類3</a>
                        <a href="#" class="list_sort">產品分類4</a>
                        <a href="#" class="list_sort">產品分類5</a>
                    </div>
                    <a href="#" class="menu_item">聯絡我們</a>
                    <div class="language_block">
                        <a href="#" class="language language_active">繁中</a>
                        <a href="#" class="language">EN</a>
                    </div>
                    <div class="menu_RWD"></div>
                    
                </div>
                
            </div>
        </div>
        <div class="menu_item_block_RWD">
            <div class="menu_logo_RWD"></div>
            <a href="" class="menu_item_RWD">首頁</a>
            <a href="" class="menu_item_RWD">關於我們</a>
            <div class="menu_item_RWD">產品介紹</div>
            <div class="menu_item_list_RWD">
                <a href="#" class="list_sort_RWD">產品分類1</a>
                <a href="#" class="list_sort_RWD">產品分類2</a>
                <a href="#" class="list_sort_RWD">產品分類3</a>
                <a href="#" class="list_sort_RWD">產品分類4</a>
                <a href="#" class="list_sort_RWD">產品分類5</a>
            </div>
            <a href="" class="menu_item_RWD">聯絡我們</a>
            <div class="menu_close_RWD">X</div>
        </div>
    </div>
    
    <script>
        // 點擊彈出
        $(".menu_item").click(function(){
            if($(this).next(".menu_item_list").css("display") == "none"){
                $(this).next(".menu_item_list").slideDown();
            }
            else{
                $(this).next(".menu_item_list").slideUp();
            }
        })
        $(".menu_item_RWD").click(function(){
            if($(this).next(".menu_item_list_RWD").css("display") == "none"){
                $(this).addClass("show_list")
                $(this).next(".menu_item_list_RWD").slideDown();
            }
            else{
                $(this).removeClass("show_list")
                $(this).next(".menu_item_list_RWD").slideUp();
            }
        })
        // 漢堡條
        
        $(".menu_RWD").click(function(){
            if($(".menu_item_block_RWD").css("display") == "none"){
                $(".menu_item_block_RWD").slideDown()
            }
        })
        $(window).resize(function(){
            if($(window).width() > 768){
                $(".menu_item_block_RWD").hide()
            }
            if($(window).width() < 768){
                $(".menu_item_list").hide()
            }
        })

        $(".menu_close_RWD").click(function(){
            $(".menu_item_block_RWD").slideUp()

        })

    </script>