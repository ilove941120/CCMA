<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<?php echo $nowURL=$this->uri = current_url(true); ?>/loginPage
    <form action="index.php/Backend/Date/check_login" method="post">
        <label for="">帳號</label>
        <input type="text" name="ID">
        <label for="">密碼</label>
        <input type="text" name="Password">
        <input name="action" type="hidden" value="login">
        <input type="submit" value="送出">
    </form>
    
</body>
</html>