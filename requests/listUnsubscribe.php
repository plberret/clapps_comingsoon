<?php

require_once 'api/mailchimp/MCAPI.class.php';
require_once 'api/mailchimp/config.inc.php';

$api = new MCAPI($apikey);

// get variables
$email=stripslashes($_POST['emailSelected']);
$msg = stripslashes($_POST['message']);

$retval = $api->listUnsubscribe( $listId,$email);

if ($api->errorCode){
	switch ($api->errorCode) {
		case 215:
			echo "Vous n'êtes pas inscrit à la newsletter Clapps.";
			break;
		default:
			echo "Une erreur est survenue, veuillez réessayer. Merci de nous contacter si le problème persiste.";
	}
} else {
	sendEmail($email, $msg);
}

function sendEmail($from, $message){
	
	// variables
	$subject = "Email de désinscription"; 
	$to = "contact@clapps.fr";
	
	// Création du header de l'e-mail
	$headers = 'From: <'.$from.'>'."\r\n";
	$headers .= 'Content-Type: text/plain; charset="utf-8"'." ";
	$headers .= 'Content-Transfer-Encoding: 8bit';
	$headers .= "\r\n";
	
	// envoi de l'email
	$envoi= mail($to, $subject, $message, $headers);
	
	if(!$envoi){
		echo "une erreur est survenue pendant l'envoi, veuillez réessayer. Merci de nous contacter si le problème persiste.";
	}else{
		echo json_encode('good');
	}
	
}

?>
