<?php
	header("Content-Type: text/html; charset=utf-8");
    // echo $_POST["searchKey"];
    // $key =$_POST["searchTime"];
    $keyFirst =$_POST["searchTimeFirst"];
    $keyEnd =$_POST["searchTimeEnd"];
	include("conMysql.php");
	$seldb = @mysqli_select_db($db_link, "woya");
	if (!$seldb) die("資料庫選擇失敗！");
	// $sql_query = "SELECT * FROM news WHERE cDay LIKE '%$key%' ORDER BY cDay DESC";
	$sql_query = "SELECT * FROM news WHERE cDay BETWEEN '$keyFirst' AND '$keyEnd'";
	// $sql_query = "SELECT * FROM news ORDER BY cDay ASC";
	// $to_old = "SELECT * FROM news ORDER BY 'cDay' DESC";
	$result = $db_link->query($sql_query);
	// $total_records = $result->num_rows;
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
    <h1>搜尋結果</h1>
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
	<a href="data.php" class="button">回主畫面</a>

    </div>

</body>
</html>