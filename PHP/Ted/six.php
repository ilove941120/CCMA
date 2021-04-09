<?php
function DateDiff($beginDate, $endDate) {
    
    $_beginDate = strtotime($beginDate);
    $_endDate = strtotime($endDate);
    $_diff = abs($_beginDate-$_endDate);
    return round(($_diff)/3600/24);
}

?>

<?php
echo $_GET["date1"];
echo "<br>";
echo $_GET["date2"];
echo "<br>";
$a = $_GET["date1"];
$b = $_GET["date2"];
if(preg_match(("/^\d{4} - \d{2} - \d{2}*$/"),$a) == false || preg_match(("/^\d{4} - \d{2} - \d{2}*$/"),$b) == false){
    return false;
}
echo "日期a:".$a."\n";
echo "日期b:".$b."\n";
echo "兩個日期相差:".DateDiff($a, $b)."天";
?>

