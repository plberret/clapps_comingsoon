
var zf = zf || {};

/* FUNCTIONS
--------------------------------------------------------------------------------------------------------------------------------------*/

zf.initNewsletter = function(){
	
	$("#first_part").find("form button").fadeIn(100);
	
	// variables
	zf.$update = $('#confirmation');
	zf.$unsubscribe = $('#desinscription');
	
	// fix placeholder
	zf.fixPlaceholder(zf.$update);
	zf.fixPlaceholder(zf.$unsubscribe);
	
	// Si c'est un update, on met à jour les fields
	if(zf.getUrlVars()["f"]!=null){
		zf.$update.find('#firstnameField').val(zf.getUrlVars()["f"]);
	}
	if(zf.getUrlVars()["l"]!=null){
		zf.$update.find('#lastnameField').val(zf.getUrlVars()["l"]);
	}
	if(zf.getUrlVars()["j"]!=null){
		zf.$update.find('#jobField').val(zf.getUrlVars()["j"]);
	}
	// on mets à jours les fields required
	if(zf.getUrlVars()["p"]!=null){
		zf.provenance = zf.getUrlVars()["p"];
	}
	if(zf.getUrlVars()["e"]!=null){
		zf.userEmail=zf.getUrlVars()["e"];
	}
	
	// ecoute de la mise à jour de la newsletter
	zf.$update.on('submit', '#formUpdate', function() {
		//variables
		$this=$(this);
		$msg=zf.$update.find("#formMsg");
		$msg.html(' ').removeClass('error').removeClass('good'); 
		$firstname= $this.find('#firstnameField').attr('value');
		$lastname= $this.find('#lastnameField').attr('value');
		$job= $this.find('#jobField').attr('value');

		// check email available
		if((zf.userEmail=="")||(zf.userEmail=="votreadresse@email.com")||(!zf.isValidEmail(zf.userEmail))){
			$msg.html("Une erreur est survenue, veuillez recharger la page.").addClass('error');
			return false; 
		}
		// fix ie remplissage des champ placeholder
	/*	if($firstname=="Votre prénom"){
			$firstname="";
		}
		if($lastname=="Votre nom"){
			$lastname="";
		}
		if($job=="Votre métier"){
			$job="";
		} */
		
		// requete ajax
		$.ajax({
			url: $this.attr('action'),
			type: $this.attr('method'),
			data: {
				emailSelected: zf.userEmail,
				firstname: $firstname,
				lastname: $lastname,
				job: $job,
				provenance: zf.provenance
			},
			dataType: 'json',
			success: function(json) {
				if(zf.$isUpdate==true){
					$msg.html('Merci '+$firstname+', vos informations ont bien été mises à jour.').addClass('good');
				}else{
					$msg.html('Content de vous compter parmi nous '+$firstname).addClass('good');
				}
				zf.$update.find('.follow').show(); 
			}, error: function(json) {
				$msg.html(json.responseText).addClass('error');
			} 
		}); 
		return false;
	});
	
	// ecoute de la desinscription de la newsletter
	zf.$unsubscribe.on('submit', '#formUnsubscribe', function() {
		//variables
		$this=$(this);
		// fix ie pour "desactive button au survol"
	/*	if($this.find('input[type=submit]').attr('disabled')=="disabled"){
			return false; 
		} */
		// desactive button au click 
	//	$this.find('input[type=submit]').attr('disabled', 'disabled');
		
		// init
		$msg=zf.$unsubscribe.find("#formMsg");
		$msg.html(' ').removeClass('error').removeClass('good');
		if((zf.userEmail=="")||(!zf.isValidEmail(zf.userEmail))){
			$msg.html("Une erreur est survenue, veuillez recharger le lien fourni dans l'email de désinscription.").addClass('error');
		//	$this.find('input[type=submit]').removeAttr("disabled");
			return false;
		}
		
		// requete ajax 
		$.ajax({
			url: $this.attr('action'),
			type: $this.attr('method'),
			data: {
				emailSelected: zf.userEmail,
				message: $this.find('#contentField').attr('value')
			},
			dataType: 'json',
			success: function(json) {
				$msg.html('Vous avez été désinscrit avec succès.').addClass('good');
				$this.find('input[type=submit]').removeAttr("disabled");
			}, error: function(json) {
				$msg.html(json.responseText).addClass('error');
				$this.find('input[type=submit]').removeAttr("disabled");
			} 
		});

		return false;
	});
	
};

zf.init = function(){
	
	zf.initNewsletter();

	// Blank links
	$('a[rel=external]').click(function(){
		window.open($(this).attr('href'));
		return false;
	});
	
};


/* TOOLS
--------------------------------------------------------------------------------------------------------------------------------------*/

zf.isValidEmail = function(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
};

zf.fixPlaceholder = function($conteneur) {	
	$conteneur.find('input, textarea').placeholder();
};

zf.getUrlVars = function(){
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

/* DOM READY
--------------------------------------------------------------------------------------------------------------------------------------*/

$(document).ready(zf.init);