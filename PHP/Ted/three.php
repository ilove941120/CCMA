<html>
<head>
	<title>我的第一個PHP程式</title>
	<style>
        .listBox{
            width: 500px;
            border-top: 1px solid black;
            border-left: 1px solid black;
        }
        .tr{
            display: flex;
        }
        .td{
            width: 25%;
            border-bottom:1px solid black ;
            border-right: 1px solid black;
        }
    </style>
</head>
<body>
	<div class="listBox">
        <div class="tr">
            <div class="td">姓名</div>
            <div class="td">學號</div>
            <div class="td">電話</div>
            <div class="td">班級</div>
        </div>
        <div class="tr">
            <div class="td"><?php echo 	$_GET["useName"]; ?></div>
            <div class="td"><?php echo 	$_GET["useNumber"]; ?></div>
            <div class="td"><?php echo 	$_GET["usePhone"]; ?></div>
            <div class="td"><?php echo 	$_GET["useClass"]; ?></div>
        </div>
    </div>
</body>
</html>