<?php
    $weekArray[] = 'Wednesday';
    $weekArray[] = 'Sunday';
    $weekArray[] = 'Monday';
    $weekArray[] = 'Tuesday';
    for($i=0;$i<=3;$i++){
        echo $weekArray[$i] . "<br>";
    }

    $myArray['myName'] = '賴小名';
    $myArray['myHeight'] = 178;
    $myArray['myWeight'] = 78;
    echo "大家好!我的名字叫".$myArray['myName']."我的身高".$myArray['myHeight']."我的體重".$myArray['myWeight'];
    echo "<br>";
    echo "大家好!我的名字叫{$myArray['myName']}我的身高{$myArray['myHeight']}我的體重{$myArray['myWeight']}";
?>