
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

    }
    .newsContent{
        margin-bottom:20px;
    }
</style>
</head>
<body>

<div class="pageTitle">新增消息頁面</div>
<a href="<?php echo base_url(); ?>/Backend/Date/show" class="button">回主畫面</a>

<form action="add" method="post" name="formFix" id="formFix">
  <div class="newTitleBLock">
      <label for="cTitle">標題</label>
      <br>
      <input type="text" name="cTitle" id="cTitle" value="">
  </div>
  <div class="newDayBlock">
    <label for="cTitle">日期</label>
      <br>
      <input type="text" name="cDay" id="cDay" value="">
  </div>
  <div class="newsContent">
    <label for="cTitle">內容</label>
      <br>
    <textarea name="cContent" id="cContent" cols="30" rows="10" value=""></textarea>
  </div>
  <input name="action" type="hidden" value="update">
  <input type="submit" value="新增資料">
  <input type="reset" value="重新填寫">
</form>
</body>
</html>