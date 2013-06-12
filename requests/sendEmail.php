<?php

	// initialisation
	testVariables();  
	
	function testVariables(){
		
		if(($_POST['objet']=="")||($_POST['nom']=="")||($_POST['email']=="")||($_POST['contenu']=="")){
			displayMessage('bad');
			exit(0); 
		}
		
		if(VerifierAdresseMail($_POST['email'])==false){
			displayMessage('bad');
			exit(0); 
		}
		
		if($_POST['contactActif']==""){
			displayMessage('error');
			exit(0); 
		}
		
		// si il n'y a pas de problème, on envoie le mail
		sendEmail();
	}
	
	function sendEmail(){
		
		// variables
		$nom = stripslashes($_POST['nom']);
		$from= stripslashes($_POST['email']);
		$subject = stripslashes($_POST['objet']). " - Formulaire de contact"; 
		$msg = stripslashes($_POST['contenu']);
		$to = stripslashes($_POST['contactActif']);
		
		// Création du header de l'e-mail
		$headers = 'From: '.$nom.' <'.$from.'>'."\r\n";
		$headers .= 'cc: Équipe <contact@clapps.fr>;'."\r\n";
		$headers .= 'Content-Type: text/plain; charset="utf-8"'." ";
		$headers .= 'Content-Transfer-Encoding: 8bit';
		$headers .= "\r\n";
		
		// equipe 
		$emails= Array();
		$emails['c']="contact@clapps.fr";
		$emails['rm']="robin@clapps.fr";
		$emails['rb']="romain@clapps.fr";
		$emails['jt']="jeremy@clapps.fr";
		$emails['mb']="maxime@clapps.fr";
		$emails['plb']="pierre-loic@clapps.fr";
		$emails['ld']="leonard@clapps.fr";
		
		// envoi de l'email
		$envoi= mail($emails[$to], $subject, $msg, $headers);
		
		if(!$envoi){
			displayMessage('error');
			exit(0);
		}else{
			displayMessage('good');
		}
		
	}
	
	function displayMessage($response){
		echo json_encode($response);
	}
	
	function VerifierAdresseMail($adresse)  
	{  
	   $Syntaxe='#^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$#';  
	   if(preg_match($Syntaxe,$adresse))  
	      return true;  
	   else  
	     return false;  
	}
	
	
?>
