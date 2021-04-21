<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Hello world</h1>
    <?php
        foreach ($news as $row)
        {
            echo "<div class=\"new\">";
                echo "<div class=\"new_time\">".$row->cDay."</div>";
                echo $row->cTitle;
                echo "<div class=\"phpButtonBar\">";
                echo "<a class=\"button\" href='update.php?id=".$row->cID."'>修改</a>";
                echo "<a class=\"button\" href='delete.php?id=".$row->cID."'>刪除</a>";
                echo "<a class=\"button\" href='inpage.php?id=".$row->cID."'>預覽內頁</a>";
                echo "</div>";
                echo $row->cContent;;
            echo "</div>";
        }
        // foreach ($banner_title as $row){
        //     echo "<div class=\"ba_item\">";
        //         echo "<div class=\"banner\">";
        //           echo "<div class=\"ba_lg\">";
        //             echo "<div class=\"ba_img\">";
        //               echo "<img src=".$row->img."/>";
        //             echo "</div>";
        //             echo "<div class=\"ba_content\">";
        //               echo "<div class=\"title_bg ".$row->color."\"></div>";
        //             echo "</div>";
        //             echo "<div class=\"ba_title\">".$row->mainTitle."</div>";
        //             echo "<div class=\"ba_title_sub\">".$row->subTitle."</div>";
        //           echo "</div>";
  
        //           echo "<div class=\"ba_sm\">";
        //           echo "</div>";
  
        //         echo "</div>";
        //     echo "</div>";
        //   }
    ?>
</body>
</html>