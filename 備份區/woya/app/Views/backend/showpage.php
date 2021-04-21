
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>WoyaNews</title>
<style>
	a{
		color:unset;
        text-decoration: none;
	}
	.buttonBar{
		display: flex;
		margin-bottom:10px
	}
	.searchBlock{
		display: flex;
        align-items: center;
		margin-left: 10px;
	}
	.button{
		margin: 10px;
	}
	.button:hover{
		color:red;
	}
    .table{
        display:flex;
        flex-direction: column;
    }
    .row{
        margin-bottom:20px;
		border:1px solid black;
		padding:10px;
    }
    .titleBlock{
        display:flex;
    }
    .number{
		margin-right:20px;
    }
    .tilte{
		margin:0 10px;
        font-size: 24px;
    }
    .day{
        text-align: end;

    }
    .content{

    }
    </style>
</head>
<body>
	<div class="buttonBar">
		<a href="add.php" class="button">新增news</a>
		<a href="dataOld.php" class="button">排列順序:最新日期</a>
		<a href="data.php" class="button">排列順序:最舊日期</a>
		<form action="searchContentPage.php" method="POST" class="searchBlock">
			<label for="searchKey">文字搜尋</label>
			<input type="text" id="searchKey" name="searchKey" placeholder="輸入關鍵字">
			<label for="searchTime">時間搜尋:</label>
			<label for="">從</label>
			<input type="text" id="searchTime" name="searchTimeFirst" placeholder="XXXX-XX-XX">
			<label for="">到</label>
			<input type="text" id="searchTime" name="searchTimeEnd" placeholder="XXXX-XX-XX">
			<input type="submit" valus="送出">
		</form>
	</div>
	

    <!-- 資料內容 -->
	<?php
        $i=0;
		foreach ($news as $row)
		{
            echo "<div class=\"row\">";
                echo "<div class=\"titleBlock\">";
                    echo "<div class=\"number\">#".$i."</div>";	
                    echo "<div class=\"day\">".$row->cDay."</div>";
                    echo "<div class=\"tilte\">".$row->cTitle."</div>";
                    echo "<a class=\"button\" href=".base_url()."/Backend/Date/updatePage/".$row->cID.">修改</a>";
                    echo "<a class=\"button\" href=".base_url()."/Backend/Date/deletePage/".$row->cID.">刪除</a>";
                    echo "<a class=\"button\" href='inpage.php?".$row->cID."'>預覽內頁</a>";
                echo "</div>";
            echo "</div>";
				$i++;
		}
    ?>
    <a href="<?php echo base_url(); ?>/Backend/Date/add">新增項目</a>
    <a href="<?php echo base_url(); ?>/Backend/Date/add">刪除項目</a>
    <a href="<?php echo base_url(); ?>/Backend/Date/add">更新項目</a>
    <a href="<?php echo base_url(); ?>/Backend/Date/add">搜尋項目</a>
    </div>

</body>
</html>