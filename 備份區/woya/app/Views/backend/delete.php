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
  #formFix{
    width: 300px;
  }
    .pageTitle{
        font-size:48px;
        text-align: center;
    }
    .newTitleBLock{
      border:1px solid black;
      padding:5px;
    }
    .newDayBlock{
      border:1px solid black;
      padding:5px;
    }
    .newsContent{
      border:1px solid black;
      margin-bottom:20px;
      padding:5px;
    }
</style>
</head>
<body>

<div class="pageTitle">修改頁面</div>
<a href="data.php" class="button">回主畫面</a>
<form action="<?php echo $nowURL=$this->uri = current_url(true); ?>" method="post" name="formFix" id="formFix">
  <div class="newTitleBLock">標題:
      <?php echo $news[0]->cTitle;?>
  </div>
  <div class="newDayBlock">日期:
      <?php echo $news[0]->cDay;?>
  </div>
  <div class="newsContent">內容: <br>
      <?php echo $news[0]->cContent;?>
  </div>
  <input name="cID" type="hidden" value="<?php echo $news[0]->cID;?>">
  <input name="action" type="hidden" value="delete">
  <input type="submit" value="刪除資料">
</form>


</body>
</html>