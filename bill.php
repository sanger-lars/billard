<?php

if(isset($_POST['navn'])){
    gem_tal($_POST['multiNavn'], $_POST['aktivSpiller'], $_POST['navn'] );
}



function connectToDB() {
	$mysqli = new mysqli("lars-f.dk.mysql", "lars_f_dk", "t9di8hatcB3gt9VkrYj5S8xZ", "lars_f_dk");
	if ($mysqli->connect_errno) {
    	echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
    	exit();
	}

	return $mysqli;
}


function gem_tal($mulNavn, $aktiv, $navn) {
    $mysqli = connectToDB();

    $query = "UPDATE `lars_f_dk`.`bill` SET `multiName`='$mulNavn',`aktivSpiller`='$aktiv',`navn`='$navn' WHERE `multiName` = '$mulNavn'";
    if ($result = $mysqli->query($query)) {
    	echo "ok";
    }
    $mysqli->close();
}



?>