<?php 
session_start();
    echo $_GET["useName"]; 
    // header("Location: fiveA.php");
    
    $_SESSION['UserName'] = $_GET["useName"];  

?>
<a href="fiveA.php">回去</a>