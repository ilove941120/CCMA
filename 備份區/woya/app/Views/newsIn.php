<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .Title{
            margin-bottom: 20px;
        }
        .content{
            margin-bottom: 20px;
        }
        .cDay{
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    

    <h1>最新消息內頁</h1>
    <div class="Title">標題:<?php echo $news[0]->cTitle; ?> </div>
    <div class="content">內容 <br><?php echo $news[0]->cContent; ?> </div>
    <div class="cDay">日期:<?php echo $news[0]->cDay; ?> </div>
    <div class="cID">#ID=<?php echo $news[0]->cID; ?> </div>

</body>
</html>