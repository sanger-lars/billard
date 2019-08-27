<?php
require_once('../sne/Lars.php');

if(isset($_POST['slet'])){
    slet($_POST['slet'], $_POST['multiNavn']);
}

// hent_tal("peter", "3");

if(isset($_POST['hent'])){
    hent_tal($_POST['multNavn'], $_POST['turNr']);
}

if(isset($_POST['navn'])){
    gem_tal($_POST['multiNavn'], $_POST['turNr'], $_POST['aktivSpiller'], $_POST['navn']);
}


function gem_tal($mulNavn, $turNr, $aktiv, $navn) {
    $mysqli = connectToDB();
    if ($turNr == "1") {
    $query = "INSERT INTO  `lars_f_dk`.`bill` (`multiName`,`turNr`,`aktivSpiller`, `navn`) VALUES ('$mulNavn', '$turNr', '$aktiv', '$navn')"; 
	} else {
	    $query = "UPDATE `lars_f_dk`.`bill` SET `multiName`='$mulNavn',`turNr`='$turNr',`aktivSpiller`='$aktiv',`navn`='$navn' WHERE `multiName` = '$mulNavn'";
	}
	if ($result = $mysqli->query($query)) {
		echo "ok ";
    } else {
	    echo "fejl "; 
	}	
    $mysqli->close();
}

function hent_tal($multiNavn, $turNr) {
	$mysqli = connectToDB();
	$query = "SELECT * FROM `bill` WHERE `multiName`='$multiNavn'";
	
	if ($result = $mysqli->query($query)) {
        
        /* fetch object array */
		$data = array();
	    while ($row = mysqli_fetch_assoc($result)) {
	      $data[] = $row;
	    }
	    echo json_encode($data);
        /* free result set */
        $result->close();
    } else {echo "fejl " . $multiNavn; }
    $mysqli->close();
}

function slet($slet, $mulNavn) {
  if ($slet == "S") { 
    $mysqli = connectToDB();
    $query = "DELETE FROM lars_f_dk.bill WHERE `multiName`='$mulNavn'";
    
    if ($result = $mysqli->query($query)) {
        
      $result->close();
    }
    $mysqli->close();
  }  
}

?>