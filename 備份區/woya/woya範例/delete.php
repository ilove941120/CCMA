<?php
	include("conMysql.php");
    if (!@mysqli_select_db($db_link, "woya")) die("資料庫選擇失敗！");
    if(isset($_POST["action"])&&($_POST["action"]=="delete")){
	    $sql_query = "DELETE FROM news WHERE cID=".$_POST["cID"];
        mysqli_query($db_link, $sql_query);
        //重新導向回到主畫面
	    header("Location: data.php");
    }
    $sql_db = "SELECT * FROM news WHERE cID=".$_GET["id"];
    $result = mysqli_query($db_link, $sql_db);
    $row_result=mysqli_fetch_assoc($result);
?>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>WoyaNews</title>
<style>
    a{
		color:unset;
        text-decoration: none;
        
	}
	.button{
		margin: 10px;
        display: block;
        text-align: center;
	}
	.button:hover{
		color:red;
	}
    .pageTitle{
        font-size:48px;
        text-align: center;
    }
    .newTitleBLock{
        font-size: 24px;
    }
    .newsContent{
        margin-bottom:20px;
    }
</style>
</head>
<body>

<div class="pageTitle">刪除頁面</div>
<a href="data.php" class="button">回主畫面</a>

<form action="" method="post" name="formFix" id="formFix">
    <div class="number">
        <?php echo "資料ID:".$row_result["cID"];?>
    </div>
    <div class="pageTitle">
        <?php echo $row_result["cTitle"];?>
    </div>
    <div class="dayBLock">
        <?php echo $row_result["cDay"];?>
    </div>

    <div class="contentBLock">
        <?php echo $row_result["cContent"];?>
    </div>
  <input name="cID" type="hidden" value="<?php echo $row_result["cID"];?>">
  <input name="action" type="hidden" value="delete">
  <input type="submit" value="更新確定刪除這筆資料嗎？">
</form>
</body>
</html>