<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

</head>
<body>
    <?php
        $later = $_GET["date"];
        if(preg_match(("/^\d*$/"),$later) == false){
            return false;
        }
        $now = date("Y-m-d");
        $math1 = strtotime($now);
        echo "伺服器現在時間:".$now."<br>";
        echo $later."天後伺服器時間:".date("Y-m-d",strtotime("+ $later days",$math1))."<br>";
    ?>
    
</body>
</html>