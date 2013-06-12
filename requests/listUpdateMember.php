<?php

require_once 'api/mailchimp/MCAPI.class.php';
require_once 'api/mailchimp/config.inc.php'; //contains apikey

$api = new MCAPI($apikey);
$email=stripslashes($_POST['emailSelected']);
$firstname=stripslashes($_POST['firstname']);
$lastname=stripslashes($_POST['lastname']);
$job=stripslashes($_POST['job']);
$provenance=stripslashes($_POST['provenance']);

$merge_vars = array("FIRSTNAME"=> $firstname, "LASTNAME"=> $lastname, "JOB"=> $job, "COMING"=> $provenance);

$retval = $api->listUpdateMember($listId, $email, $merge_vars, 'html', false);

if ($api->errorCode){
	switch ($api->errorCode) {
	    default:
	       echo "Une erreur est survenue, veuillez réessayer. Merci de nous contacter si le problème persiste.";
	}
} else {
	displayMessage('good');
}

function displayMessage($response){
	echo json_encode($response);
}