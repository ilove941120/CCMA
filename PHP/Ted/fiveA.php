<?php
session_start();
echo  $_SESSION['UserName'];
// unset($_SESSION["membername"]);
session_unset();
?>
<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="fiveB.php" method="GET" id="fiveAForm">
        <label for="useName">請輸入您的名字</label>
        <input type="text" id="useName" name="useName">
        <input type="button" value="送出" class="submit">
        <!-- <input class="clear" type="button" value="清除" > -->
        <div class="clear">清除</div>
    </form>

    <script src="js/jquery-3.5.1.min.js"></script>
    <script>
        $(".submit").click(function(){
            $("#fiveAForm").submit()
        })
        $(".clear").click(function(){
            alert(123)
            <?php session_unset();?> 
        })
    </script>
</body>
</html>