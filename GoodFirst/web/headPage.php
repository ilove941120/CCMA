<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
    integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
   
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
    <link rel="stylesheet" href="../css/headPage.css">
    <link rel="stylesheet" href="../css/setUp.css">

</head>
<body>

    <!-- headPage -->
    <div class="head">
        <!-- 上方大圖 -->
        <div class="banner">
            <div class="pageTitleBlock">
                <div class="pageTitle">
                    <div class="mainText">關於好初</div>
                </div>
                <div class="subText">ABOUT HAO-CHU</div>
            </div>
            <div class="logoBlock">
                
                
                <img src="../img/logo_bl.png" alt="">
            </div>
        </div>
        <!-- 主選單 -->
        <div class="menuBarBlock">
            <div class="container">
                <div class="menuBar">
                    <a href="" class="menuItem">首頁</a>
                    <a href="" class="menuItem">關於我們</a>
                    <a href="" class="menuItem">最新消息</a>
                    <a href="" class="menuItem">產品介紹</a>
                    <a href="" class="menuItem">聯絡我們</a>
                </div>
            </div>
            <div class="iconBlock">
                <i class="fab fa-facebook-f"></i>
                <i class="fab fa-instagram"></i>
            </div>
        </div>
        <!-- RWD主選單 -->
        <div class="menuBarRWDBlock">
            <div class="container">
                <div class="menuBarRWD">
                    <div class="iconRWDBlock">
                        <i class="fab fa-facebook-f"></i>
                        <i class="fab fa-instagram"></i>
                    </div>
                    <div class="logoRWDBlock">
                        <img src="../img/logo02.png" alt="">
                    </div>
                    <div class="menuRWD">
                        <div class="menuRWDopen"><i class="fas fa-bars"></i></div>
                        <div class="menuRWDClose"><i class="fas fa-times"></i></div>
                        
                    </div>
                </div>
            </div>
        </div>
        <!-- RWD主選單列表 -->
        <div class="menuRWDItemBlock">
            <a href="" class="menuRWDItem">
                <div class="menuRWDItemText">關於好初</div>
                <div class="menuRWDItemSubText">ABOUT</div>
            </a>
            <a href="" class="menuRWDItem">
                <div class="menuRWDItemText">最新消息</div>
                <div class="menuRWDItemSubText">ALL OFF THE NEWS</div>
            </a href="">
            <a href="" class="menuRWDItem">
                <div class="menuRWDItemText">產品介紹</div>
                <div class="menuRWDItemSubText">PRODUCT DESCRIPITION</div>
            </a href="">
            <a href="" class="menuRWDItem">
                <div class="menuRWDItemText">聯絡我們</div>
                <div class="menuRWDItemSubText">CONTACT US</div>
            </a href="">
            <div class="menuFoot">
                <div class="menuFootItem">服務時間:11:00-14;00、17;00-21:00</div>
                <div class="menuFootItem">地址:新竹縣竹北市環北路一段232號</div>
                <div class="menuFootItem">訂位專線:(03)5123456</div>
                <div class="menuFootItem">Copyright © 2019 鑫福國際飲有限公司 all rights reserved.</div>
                <div class="menuFootItem">網站設計-橘野數位設計</div>
            </div>
        </div>
    </div>
    
    
    <script src="../js/jquery-3.5.1.min.js"></script>
    <!-- <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>
    <script>
        

        // RWD列表點擊彈出關閉
        $(".menuRWDItemBlock").hide()
        $(".menuRWDClose").hide()
        $(".menuRWD").click(function(){
            if($(".menuRWDClose").is(":hidden")){
                $(".menuRWDClose").show()
                $(".menuRWDopen").hide()
                $(".menuRWDItemBlock").show()
                $(".menuRWDItemBlock").addClass("show");
            }
            else{
                $(".menuRWDClose").hide()
                $(".menuRWDopen").show()
                $(".menuRWDItemBlock").removeClass("show");
                $(".menuRWDItemBlock").slideUp()

            }
            
        })
        $(window).resize(function(){
            if($(window).width() > 768){
            $(".menuRWDItemBlock").hide()
            $(".menuRWDClose").hide()
            $(".menuRWDopen").show()
            $(".menuRWDItemBlock").removeClass("show");
        }
        })
        
    </script>
</body>
</html>