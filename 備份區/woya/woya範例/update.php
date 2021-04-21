<?php
	include("conMysql.php");
    if (!@mysqli_select_db($db_link, "woya")) die("資料庫選擇失敗！");
    if(isset($_POST["action"])&&($_POST["action"]=="update")){
	    $sql_query = "UPDATE news SET ";
        $sql_query .= "cTitle='".$_POST["cTitle"]."',";
        $sql_query .= "cDay='".$_POST["cDay"]."',";
        $sql_query .= "cContent='".$_POST["cContent"]."'";
	    $sql_query .= "WHERE cID=".$_POST["cID"];	
        mysqli_query($db_link, $sql_query);
        //重新導向回到主畫面
	    header("Location: data.php");
    }
    $sql_db = "SELECT * FROM news WHERE cID="$_GET["id"]"";
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

    }
    .newsContent{
        margin-bottom:20px;
    }
</style>
</head>
<body>

<div class="pageTitle">修改頁面</div>
<a href="data.php" class="button">回主畫面</a>

<form action="" method="post" name="formFix" id="formFix">
  <div class="newTitleBLock">
      <label for="cTitle">標題</label>
      <br>
      <input type="text" name="cTitle" id="cTitle" value="<?php echo $row_result["cTitle"];?>">
  </div>
  <div class="newDayBlock">
    <label for="cTitle">日期</label>
      <br>
      <input type="text" name="cDay" id="cDay" value="<?php echo $row_result["cDay"];?>">
  </div>
  <div class="newsContent">
    <label for="cTitle">內容</label>
      <br>
    <textarea  name="cContent" id="cContent" cols="30" rows="10" ><?php echo $row_result["cContent"];?></textarea>
  </div>
  <input name="cID" type="hidden" value="<?php echo $row_result["cID"];?>">
  <input name="action" type="hidden" value="update">
  <input type="submit" value="更新資料">
  <input type="reset" value="重新填寫">
</form>
</body>
</html>