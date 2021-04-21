<?php
	header("Content-Type: text/html; charset=utf-8");
    $key =$_POST["searchKey"];
    $dateFirst =$_POST["searchTimeFirst"];
    $dateEnd =$_POST["searchTimeEnd"];
	include("conMysql.php");
	$seldb = @mysqli_select_db($db_link, "woya");
	if (!$seldb) die("資料庫選擇失敗！");
	// 日期輸入框 不等於空值
	if($dateFirst !="" && $dateEnd !=""){
		$sql_query = "SELECT * FROM news 
		if()$sql_query .= WHERE cTitle LIKE '%$key%' 
		AND cDay>='$dateFirst' 
		AND cDay<='$dateEnd'  
		ORDER BY cDay DESC";
	}
	// 日期輸入框 開始日期不等於空值 結束日期等於空值
	else if($dateFirst !="" && $dateEnd ==""){
		$sql_query = "SELECT * FROM news WHERE cTitle LIKE '%$key%' AND cDay>='$dateFirst' ORDER BY cDay ASC";
	}
	// 日期輸入框 開始日期等於空值 結束日期不等於空值
	else if($dateFirst =="" && $dateEnd !=""){
		$sql_query = "SELECT * FROM news WHERE cTitle LIKE '%$key%' AND cDay<='$dateEnd' ORDER BY cDay DESC";
	}
	else{
		$sql_query = "SELECT * FROM news ORDER BY cDay DESC";
	}
	// $to_old = "SELECT * FROM news ORDER BY 'cDay' DESC";
	// $sql_query = "SELECT * FROM news ORDER BY cDay ASC";

	$result = $db_link->query($sql_query);
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
	.buttonBar{
		display: flex;
		margin-bottom:10px
	}
	h1{
		margin:0;
	}
	.searchTitleBlock{
		display: flex;
	}
	.searchDay{
		display: flex;
        align-items: flex-end;
		margin-left:10px;
	}
	.searchBlock{
		display: flex;
        align-items: center;
		margin: 0;
	}
	.button{
		margin: 10px;
		display: block;
        text-align: center;
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
		margin-right:10px;
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
    <!-- 資料內容 -->


	<?php
	if(($_POST["searchKey"]) != "" && ($_POST["searchTimeFirst"]) =="" && ($_POST["searchTimeEnd"]) == ""){
		echo "<div class=\"searchTitleBlock\">";
			echo "<h1>"."搜尋關鍵字『".$_POST["searchKey"]."』的結果"."</h1>";
		echo "</div>";
	}
	else if(($_POST["searchKey"]) == "" && ($_POST["searchTimeFirst"]) != "" && ($_POST["searchTimeEnd"]) != ""){
		echo "<div class=\"searchTitleBlock\">";
			echo "<div class=\"searchDay\">"."搜尋日期從『".$_POST["searchTimeFirst"]."』到『".$_POST["searchTimeEnd"]."』</div>";
		echo "</div>";
	}
	else if(($_POST["searchKey"]) == "" && ($_POST["searchTimeFirst"]) != "" && ($_POST["searchTimeEnd"]) == ""){
		echo "<div class=\"searchTitleBlock\">";
			echo "<div class=\"searchDay\">"."搜尋日期從『".$_POST["searchTimeFirst"]."』開始</div>";
		echo "</div>";
	}
	else if(($_POST["searchKey"]) == "" && ($_POST["searchTimeFirst"]) == "" && ($_POST["searchTimeEnd"]) != ""){
		echo "<div class=\"searchTitleBlock\">";
			echo "<div class=\"searchDay\">"."搜尋日期『".$_POST["searchTimeEnd"]."』之前</div>";
		echo "</div>";
	}
	else if(($_POST["searchKey"]) != "" && ($_POST["searchTimeFirst"]) != "" && ($_POST["searchTimeEnd"]) != ""){
		echo "<div class=\"searchTitleBlock\">";
			echo "<h1>"."搜尋關鍵字『".$_POST["searchKey"]."』的結果"."</h1>";
			echo "<div class=\"searchDay\">"."搜尋日期從『".$_POST["searchTimeFirst"]."』到『".$_POST["searchTimeEnd"]."』</div>";
		echo "</div>";
	}
	else if(($_POST["searchKey"]) != "" && ($_POST["searchTimeFirst"]) != "" && ($_POST["searchTimeEnd"]) == ""){
		echo "<div class=\"searchTitleBlock\">";
			echo "<h1>"."搜尋關鍵字『".$_POST["searchKey"]."』的結果"."</h1>";
			echo "<div class=\"searchDay\">"."搜尋日期從『".$_POST["searchTimeFirst"]."』開始</div>";
		echo "</div>";
	}
	else if(($_POST["searchKey"]) != "" && ($_POST["searchTimeFirst"]) == "" && ($_POST["searchTimeEnd"]) != ""){
		echo "<div class=\"searchTitleBlock\">";
			echo "<h1>"."搜尋關鍵字『".$_POST["searchKey"]."』的結果"."</h1>";
			echo "<div class=\"searchDay\">"."搜尋日期『".$_POST["searchTimeEnd"]."』之前</div>";
		echo "</div>";
	}
	else if(($_POST["searchKey"]) != "" && ($_POST["searchTimeFirst"]) == "" && ($_POST["searchTimeEnd"]) == ""){
		echo "<div class=\"searchTitleBlock\">";
			echo "<h1>"."搜尋關鍵字『".$_POST["searchKey"]."』的結果"."</h1>";
		echo "</div>";
	}
	
	?>
	<a href="data.php" class="button">回主畫面</a>
	<?php
	$i=1;
	while($row_result=$result->fetch_assoc()){
		echo "<div class=\"row\">";
			echo "<div class=\"titleBlock\">";
				echo "<div class=\"number\">#".$i."</div>";	
				echo "<div class=\"day\">".$row_result["cDay"]."</div>";
				echo "<div class=\"tilte\">".$row_result["cTitle"]."</div>";
				echo "<a class=\"button\" href='inpage.php?id=".$row_result["cID"]."'>查看</a>";
			echo "</div>";
		echo "</div>";
		$i++;
	}
	?>
    </div>

</body>
</html>