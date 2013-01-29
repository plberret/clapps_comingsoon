
// requestAnim shim layer by Paul Irish
	var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = 
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };

/* FUNCTIONS
--------------------------------------------------------------------------------------------------------------------------------------*/

var zf = zf || {};


zf.displayIntro = function(){
	
	// init
	zf.$isUpdate=false;
	
	// completer les infos d'une inscription externe
	if((zf.$getEmail!=null)&&(zf.isValidEmail(zf.$getEmail))&&(zf.$getType==92038)){
		zf.$isUpdate=true;
		$.fancybox.open({
			href: './popin/confirmSubscribe.php',
			type: 'ajax',
			closeClick  : false,
			helpers   : { 
				overlay : {closeClick: false}
			},
			afterShow: zf.initNewsletter
		});
		zf.displaySansAnim(); 
		_gaq.push(['_trackPageview', '/modification-fromFB']);
		return false;
	}
	
	// affichage du message d'update
	if((zf.$getEmail!=null)&&(zf.isValidEmail(zf.$getEmail))&&(zf.$getType==92039)){
		zf.$isUpdate=true;
		$.fancybox.open({
			href: './popin/updateSubscribe.php',
			type: 'ajax',
			closeClick  : false,
			helpers   : { 
				overlay : {closeClick: false}
			},
			afterShow: zf.initNewsletter
		});
		zf.displaySansAnim(); 
		_gaq.push(['_trackPageview', '/modification']);
		return false;
	}
	
	// affichage du message de desinscription
	if((zf.$getEmail!=null)&&(zf.isValidEmail(zf.$getEmail))&&(zf.$getType==76639)){
		$.fancybox.open({
			href: './popin/confirmUnsubscribe.php',
			type: 'ajax',
			closeClick  : false,
			helpers   : { 
				overlay : {closeClick: false}
			},
			afterShow: zf.initNewsletter
		});
		zf.displaySansAnim(); 
		_gaq.push(['_trackPageview', '/desinscription']);
		return false;
	}
	
	// affichage des mentions légales
	if(zf.$getType==72919){
		$.fancybox.open({
			href: './popin/mentions.php',
			type: 'ajax'
		});
		zf.displaySansAnim(); 
		_gaq.push(['_trackPageview', '/mentions']);
		return false;
	}
	
	// affichage de la page de contact
	if(zf.$getType==54974){
		$.fancybox.open({
			href: './popin/contact.php',
			type: 'ajax',
			afterShow: zf.initContact
		});
		zf.displaySansAnim(); 
		_gaq.push(['_trackPageview', '/contact']);
		return false;
	}
	
	// detecte ie 7&8
	if ( $.browser.msie ) {
		$ie=parseInt($.browser.version, 10); 
		if($ie<=9){
			zf.fixPlaceholder(); 
			if($ie<9){
				zf.displayShortAnim();
				return; 
			}
		}
	}
	
	// on affiche mais cache le bandeau que l'on va animer, et on affiche le logo
	$('#animBandeau').show();
	$('#bg').show(); 
	$('#fond').css({'opacity': 1}).show(); 
	zf.resize(); 
	$('#animLogo').show();
	
	// animation du logo, puis transition et lancement de l'anim des bandeaux
	zf.startAnimLogo(function() {
		$('#animLogo #canvas').fadeOut(600,function() {
			$('#animLogo').fadeOut(500); 
		}); 
		setTimeout(zf.startAnimBandeau,1200);
	});
	
	// gestion du fond selon resize
	$(window).resize(function(){ 
		zf.resize();
 	});
	
};
zf.startAnimLogo = function(callback) {
	// Canvas
	zf.$animLogo = 	zf.$body.find('#animLogo #canvas');
	zf.$cache = 	zf.$body.find('#animLogo #cache');
	zf.canvas = document.getElementById('canvasLogo');
	zf.context = zf.canvas.getContext('2d');
	zf.buffer = document.createElement('canvas');
	zf.ctx = zf.buffer.getContext('2d');

	zf.buffer.width = zf.canvas.width;
	zf.buffer.height = zf.canvas.height;
	zf.$animLogo.append(zf.buffer);
	var top = (document.documentElement.offsetHeight-zf.buffer.height)/2-30;
	zf.$animLogo.css({top:top})
	top+=220;
	zf.$cache.css({top:top})

	// Add logo to canvas
	zf.logoTop = new Image();
	zf.logoBottom = new Image();
	zf.logoTop.src = 'images/top_logo.png'
	zf.logoBottom.src = 'images/bottom_logo.png'
	zf.leftLogos = 30;
	zf.topLogoB = 272;
	zf.topLogoT = 236;
	// zf.logoBottom.onload = function() {
		zf.context.drawImage(zf.logoBottom,zf.leftLogos,zf.topLogoB);
	// };

	// Start anim
	zf.angle = 0; //init angle

	if(callback){
		zf.callback = callback;
	}
	
	// zf.logoTop.onload = function() {
		zf.ctx.drawImage(zf.logoTop,zf.leftLogos,zf.topLogoT);
		zf.firstTop = parseInt(zf.$animLogo.css('top'));
		zf.TTop = parseInt(zf.$animLogo.css('top'));
		zf.animRate = 0;
	// };
	
		zf.launchAnim();
	
};

Math.easeOutQuad = function (t, b, c, d) {
	t /= d;
	return -c * t*(t-2) + b;
};

zf.launchAnim = function() {
	zf.rAFLaunchAnim = requestAnimationFrame(zf.launchAnim);
	var animRate = Math.easeOutQuad(zf.animRate,5,2,1000);
	if (animRate>0) {
		zf.TTop-=animRate;
		zf.topLogoT-=animRate;
		zf.topLogoB-=animRate;
		zf.animRate-=20;
		zf.ctx.save();
		zf.ctx.clearRect(0,0,zf.buffer.width,zf.buffer.height)
		zf.context.clearRect(0,0,zf.buffer.width,zf.buffer.height)
		zf.ctx.drawImage(zf.logoTop,zf.leftLogos,zf.topLogoT);
		zf.context.drawImage(zf.logoBottom,zf.leftLogos,zf.topLogoB);
		zf.ctx.restore();
	} else {
		cancelAnimationFrame(zf.rAFLaunchAnim);
		zf.animateOne();
	}
};

zf.anim = function() {
	zf.ctx.save();
	zf.ctx.clearRect(0,0,zf.buffer.width,zf.buffer.height)
	zf.ctx.translate( 30,zf.topLogoT+35);
	zf.ctx.rotate( Math.PI*zf.angle/180);
	zf.ctx.translate( 0, -35 );
	zf.ctx.drawImage( zf.logoTop, 0, 0 );
	zf.ctx.restore();
};

zf.animationLogoOne = function() {
	zf.anim();
	if (zf.angle <= -36) {
		cancelAnimationFrame(zf.rAF);
		zf.animateTwo();
	};
};

zf.animationLogoTwo = function() {
	zf.anim();
	if (zf.angle > 1 ) {
		cancelAnimationFrame(zf.rAF2);
		zf.animateThree();
	};
};

zf.animationLogoThree = function() {
	zf.anim();
	if (zf.angle < 1 ) {
		cancelAnimationFrame(zf.rAF3);
		zf.callback();
	};
};

zf.animateOne = function() {
	zf.rAF = requestAnimationFrame(zf.animateOne);
	zf.animationLogoOne();
	zf.angle-=6;
};

zf.animateTwo = function() {
	zf.rAF2 = requestAnimationFrame(zf.animateTwo);
	zf.animationLogoTwo();
	zf.angle+=4;
};

zf.animateThree = function() {
	zf.rAF3 = requestAnimationFrame(zf.animateThree);
	zf.animationLogoThree();
	zf.angle--;
};

zf.startAnimBandeau = function() {
	zf.$body.find('#bandeau_top').animate({'height':0},1000);
	zf.$body.find('#bandeau_bottom').animate({'height':0},1000);
	zf.$body.find('#fond').delay(1000).animate({'opacity':0},1500,function() {
		zf.$body.find('#animBandeau').remove();
		zf.$body.css({'overflow-y': 'auto', 'overflow-x': 'hidden'});
	})
	zf.$body.find('#container').show();
};

zf.displaySansAnim = function() {
	zf.$page.css({display:'block',opacity:0}).delay(700).animate({opacity:0.9},800);
	$('#animBandeau').show();
	$('#animBandeau .bandeau').hide();
	$('#container').show();
	zf.$body.find('#fond').animate({'opacity':0},500,function() {
		zf.$body.find('#animBandeau').remove();
	})
	setTimeout(function(){
		zf.resize();
	},500);
	$('#bg').show();
	zf.$body.css({'overflow-y': 'auto', 'overflow-x': 'hidden'});
	// gestion du fond selon resize
	$(window).resize(function(){ 
		zf.resize();
	});
};

zf.displayShortAnim = function() {
	
	// on affiche mais cache le bandeau que l'on va animer, et on affiche le logo
	zf.$body.css({'overflow': 'hidden'});
	$('#animBandeau').show();
	$('#bg').show(); 
	$('#fond').show(); 
	zf.resize(); 
	
	zf.$body.find('#bandeau_top').animate({'height':0},1000);
	zf.$body.find('#bandeau_bottom').animate({'height':0},1000);
	zf.$body.find('#fond').delay(1000).animate({'opacity':0},1500,function() {
		zf.$body.find('#container').show();
		zf.$body.find('#animBandeau').remove();
		zf.$body.css({'overflow-y': 'auto', 'overflow-x': 'hidden'});
	});
	
	// gestion du fond selon resize
	$(window).resize(function(){ 
		zf.resize();
	});
};

zf.initTweet = function() {
	zf.slide = 0;
	zf.left = 332;
	zf.slideMax = 3;
	zf.$tweetBlock = zf.$page.find('#twitter');
	
	zf.$tweetBlock.find('#twitter_nav .next').click(function(event) {
		event.preventDefault();
		if (zf.slide<zf.slideMax-1) {
			zf.slide++;
			$(this).siblings('.previous').addClass('no-first');

			if (zf.slide==zf.slideMax-1) {
				$(this).addClass('last');
			};
			$this=zf.$tweetBlock.find('#bloc_tweet .ctn ul>li');
			zf.$tweetBlock.find('.tweet_time').css('position','relative');
			$this.animate({'left':-zf.left*zf.slide+'px'});
			$this.find('.tweet_time').eq(zf.slide).hide();
			$this.find('.tweet_time').eq(zf.slide-1).stop(true,false).animate({'left':zf.left+'px',opacity:0},function() {
				$(this).css({left:0,opacity:1});
				$this.find('.tweet_time').eq(zf.slide).fadeIn();
			})
		}
	});
	$('#twitter_nav .previous').click(function(event) {
		event.preventDefault();
		if (zf.slide>=1) {
			zf.slide--;
			$(this).siblings('.next').removeClass('last');
			if (zf.slide==0) {
				$(this).removeClass('no-first');
			};
			$this=zf.$tweetBlock.find('#bloc_tweet .ctn ul>li');
			zf.$tweetBlock.find('.tweet_time').css('position','relative');
			$this.animate({'left':-zf.left*zf.slide+'px'});
			$this.find('.tweet_time').eq(zf.slide).hide()
			$this.find('.tweet_time').eq(zf.slide+1).stop(true,false).animate({'left':-zf.left+'px',opacity:0},function() {
				$(this).css({left:0,opacity:1});
				$this.find('.tweet_time').eq(zf.slide).fadeIn();
			})
		}
	});
	
	zf.$tweetBlock.find("#bloc_tweet .ctn").tweet({
		username: "clapps_fr",
		join_text: "auto",
		count: zf.slideMax,
		loading_text: "Chargement...",
		template: "{text} {time}"
	});
};


zf.initContact = function() {
	
	// detecte ie 7&8
	if ( $.browser.msie ) {
		$ie=parseInt($.browser.version, 10); 
		if($ie<=9){
			zf.fixPlaceholder(); 
		}
	}
	
	// variables
	zf.$contact = $('#contact');
	$msg=zf.$contact.find("#formMsg");
	$msg.hide(); 
	zf.$message= new Array();
	zf.$message[0]="Votre message a bien été envoyé";
	zf.$message[1]="Erreur, vérifiez les champs ci-dessus";
	zf.$message[2]="Une erreur est survenue, veuillez réessayer";
	zf.$message[3]="Veuillez sélectionner un destinataire dans la liste";
	zf.$message[4]="L'email est invalide";
	
	// animation to select contact
	zf.$contact.on('click','#leftCol a',function(event){
		event.preventDefault();
		// set variable
		$this=$(this);
		if($this.parent().hasClass('active')){
			return false; 
		}
		$actif=zf.$contact.find("#leftCol li.active a");
		// reset animation
		$actif.animate({
			'left': '-20'
		}, 300, function() {
			$actif.parent().removeClass('active'); 
		});
		// new animation
		$this.animate({
			'left': '0'
		}, 300, function() {
			$this.parent().addClass('active');
		});
		// change value of input email
		zf.$emailTo=$this.attr('name');
		zf.$contact.find("#contactActif").attr('value', zf.$emailTo);
	});
	
	// ajax to send email
	zf.$contact.on('submit', 'form', function() {
		
		$this=$(this);
		
		// fix ie pour "desactive button au survol"
		if($this.find('#sendEmailButton').attr('disabled')=="disabled"){
			return false; 
		}
		// desactive button au click 
		$this.find('#sendEmailButton').attr('disabled', 'disabled');
		
		// reset message 
		$msg.removeClass('error').removeClass('good').html(' ').hide();
		// variables 
		$objet = zf.$contact.find('#objetField');
		$nom = zf.$contact.find('#nomField');
		$email = zf.$contact.find('#emailField');
		$destinataire = zf.$contact.find('#contactActif');
		$contenu = zf.$contact.find('#contenuField');
		$error=false;
		
		// verif champs valides
		if(($objet.val()=="")||($objet.val()=="Objet de votre message")){
			$msg.addClass('error').html(zf.$message[1]).show();
			$objet.addClass('error').parent().find('span').addClass('error');
			$error=true;
		}
		if(($nom.val()=="")||($nom.val()=="Prénom, Nom")){
			$msg.addClass('error').html(zf.$message[1]).show();
			$nom.addClass('error').parent().find('span').addClass('error');
			$error=true;
		}
		if(($email.val()=="")||(!zf.isValidEmail($email.val()))||($email.val()=="votreadresse@email.com")){
			$msg.addClass('error').html(zf.$message[1]).show();
			$email.addClass('error').parent().find('span').addClass('error');
			$error=true;
		}
		if(($contenu.val()=="")||($contenu.val()=="Votre message...")){
			$msg.addClass('error').html(zf.$message[1]).show();
			$contenu.addClass('error').parent().find('span').addClass('error');
			$error=true;
		}
		
		if($error==true){
			$this.find('#sendEmailButton').removeAttr("disabled");
			return false;
		}
		
		$.ajax({
			url: $this.attr('action'),
			type: $this.attr('method'),
			data: $this.serialize(),
			dataType: 'json',
			success: function(json) {
				if(json == 'good') {
					$msg.addClass('good').html(zf.$message[0]).show();
					$this.find('input[type=text]').attr('value', ''); 
					$this.find('textarea').attr('value', ''); 
				}else if(json == 'bad'){
					$msg.addClass('error').html(zf.$message[1]).show();
				}else{
					$msg.addClass('error').html(zf.$message[2]).show();
				}
				$this.find('#sendEmailButton').removeAttr("disabled");
			}, error: function(json) {
				$msg.addClass('error').html(zf.$message[2]).show();
				$this.find('#sendEmailButton').removeAttr("disabled");
			}
		});
		return false;
	});
	
	// reset field error
	zf.$contact.on('keyup','form p .field.error',function(event){
		$this=$(this);
		if((!$this.hasClass('email'))||(zf.isValidEmail($this.val()))){
			$(this).removeClass('error').parent().find('span').removeClass('error');
			$msg.fadeOut(300);
		}
	}); 

};

zf.initNewsletter = function(){
	
	// detecte ie 7&8
	if ( $.browser.msie ) {
		$ie=parseInt($.browser.version, 10); 
		if($ie<=9){
			zf.fixPlaceholder(); 
		}
	}
	
	// variables
	zf.$update = $('#confirmation');
	zf.$unsubscribe = $('#desinscription');
	
	// Si c'est un update, on met à jour les fields
	if(zf.$isUpdate==true){
		if(zf.getUrlVars()["f"]!=null){
			zf.$update.find('#firstnameField').val(zf.getUrlVars()["f"]);
		}
		if(zf.getUrlVars()["l"]!=null){
			zf.$update.find('#lastnameField').val(zf.getUrlVars()["l"]);
		}
		if(zf.getUrlVars()["j"]!=null){
			zf.$update.find('#jobField').val(zf.getUrlVars()["j"]);
		}
	}
    
	// ecoute de l'inscription à la newsletter
	zf.$page.on('submit', '#formSubscribe', function() {
		// initialisation
		$this=$(this);
		$('#error_subscribe').html('');
		zf.$userEmail = zf.$page.find('#emailNewsletter').val();
		// fix ie pour "desactive button au survol"
		if($this.find('#buttonNewsletter').attr('disabled')=="disabled"){
			return false; 
		}
		// desactive button au click 
		$this.find('#buttonNewsletter').attr('disabled', 'disabled');
		// verification de la validité de l'email
		if((zf.$userEmail=="")||(zf.$userEmail=="votreadresse@email.com")||(!zf.isValidEmail(zf.$userEmail))){
			$('#error_subscribe').html("Votre email n'est pas valide").fadeIn('slow');
			$this.find('#buttonNewsletter').removeAttr("disabled");
			return false; 
		}
		// envoi des données en ajax
		$.ajax({
			url: $this.attr('action'),
			type: $this.attr('method'),
			data: $this.serialize(),
			dataType: 'json',
			success: function(json) {
				$.fancybox.open({
					href: './popin/confirmSubscribe.php',
					type: 'ajax',
					closeClick  : false,
					helpers   : { 
						overlay : {closeClick: false}
					},
					afterShow: zf.initNewsletter
				});
				$this.find('#buttonNewsletter').removeAttr("disabled");
				$this.find('#emailNewsletter').val('');
				_gaq.push(['_trackPageview', '/confirmation']);
			}, error: function(json) {
				$('#error_subscribe').html(json.responseText);
				$this.find('#buttonNewsletter').removeAttr("disabled");
			} 
		}); 
		return false;
	});
	
	// ecoute de la mise à jour de la newsletter
	zf.$update.on('submit', '#formUpdate', function() {
		//variables
		$this=$(this);
		$msg=zf.$update.find("#formMsg");
		$msg.html(' ').removeClass('error').removeClass('good'); 
		$firstname= $this.find('#firstnameField').attr('value');
		$lastname= $this.find('#lastnameField').attr('value');
		$job= $this.find('#jobField').attr('value');
		
		// association du get à l'email selectionné
		if(zf.$isUpdate==true){
			zf.$userEmail=zf.$getEmail;
		}

		// check email available
		if((zf.$userEmail=="")||(zf.$userEmail=="votreadresse@email.com")||(!zf.isValidEmail(zf.$userEmail))){
			$msg.html("Une erreur est survenue, veuillez recharger la page.");
			return false; 
		}
		// fix ie remplissage des champ placeholder
		if($firstname=="Votre prénom"){
			$firstname="";
		}
		if($lastname=="Votre nom"){
			$lastname="";
		}
		if($job=="Votre métier"){
			$job="";
		}
		// requete ajax
		$.ajax({
			url: $this.attr('action'),
			type: $this.attr('method'),
			data: {
				emailSelected: zf.$userEmail,
				firstname: $firstname,
				lastname: $lastname,
				job: $job
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
		if($this.find('input[type=submit]').attr('disabled')=="disabled"){
			return false; 
		}
		// desactive button au click 
		$this.find('input[type=submit]').attr('disabled', 'disabled');
		// init
		$msg=zf.$unsubscribe.find("#formMsg");
		$msg.html(' ').removeClass('error').removeClass('good');
		// check email available 
		if((zf.$getEmail=="")||(!zf.isValidEmail(zf.$getEmail))){
			$msg.html("Une erreur est survenue, veuillez recharger le lien fourni dans l'email de désinscription.");
			$this.find('input[type=submit]').removeAttr("disabled");
			return false; 
		}
		// requete ajax 
	$.ajax({
			url: $this.attr('action'),
			type: $this.attr('method'),
			data: {
				emailSelected: zf.$getEmail,
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

zf.isValidEmail = function(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
};

zf.getUrlVars = function(){
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

zf.resize = function(callback) {
	var $image = $('img.fond');
	var image_width = $image.width(); 
	var image_height = $image.height();     
	var over = image_width / image_height; 
	var under = image_height / image_width; 

	var body_width = $(window).width(); 
	var body_height = $(window).height(); 

	if (body_width / body_height >= over) { 
		$image.css({ 
			'width': body_width + 'px', 
			'height': Math.ceil(under * body_width) + 'px', 
			'left': '0px', 
			'top': Math.abs((under * body_width) - body_height) / -2 + 'px' 
		}); 
	} else { 
		$image.css({ 
			'width': Math.ceil(over * body_height) + 'px', 
			'height': body_height + 'px', 
			'top': '0px', 
			'left': Math.abs((over * body_height) - body_width) / -2 + 'px' 
		}); 
	}
	if(callback){callback();}
};

zf.fixPlaceholder = function() {
	$('input[placeholder]').each(function(){  
		var input = $(this);        
		$(input).val(input.attr('placeholder'));
		$(input).focus(function(){
			if (input.val() == input.attr('placeholder')) {
				input.val('');
			}
		});
		$(input).blur(function(){
			if (input.val() == '' || input.val() == input.attr('placeholder')) {
				input.val(input.attr('placeholder'));
			}
		});
	});
	$('textarea[placeholder]').each(function(){  
		var input = $(this);        
		$(input).val(input.attr('placeholder'));
		$(input).focus(function(){
			if (input.val() == input.attr('placeholder')) {
				input.val('');
			}
		});
		$(input).blur(function(){
			if (input.val() == '' || input.val() == input.attr('placeholder')) {
				input.val(input.attr('placeholder'));
			}
		});
	});
};

zf.closeOverlay = function() {
    $.fancybox.close();
};

zf.init = function(){
	
	// variables
	zf.$body = $('body');
	zf.$page = $('#container>.ctn');
	
	// test js available
	$('body').addClass('has-js');
	
	// Reset form focus
	$('.reset-focus').focus(function(){
		if($(this).attr('value') == this.defaultValue) $(this).attr('value', '');
	}).blur(function(){
		if($.trim(this.value) == '') this.value = (this.defaultValue ? this.defaultValue : '');
	});
	
	// Blank links
	$('a[rel=external]').click(function(){
		window.open($(this).attr('href'));
		return false;
	});
	
	// init fonctionnalités
	zf.initTweet();
	zf.initNewsletter();
	zf.$body.find(".content_overlay").fancybox();
	zf.$body.find(".contact_overlay").fancybox({
		afterShow: zf.initContact
	});
	
	// get url variables
	zf.$getEmail= zf.getUrlVars()["e"];
	zf.$getType= zf.getUrlVars()["m"];
	
};

/* DOM READY
--------------------------------------------------------------------------------------------------------------------------------------*/

$(document).ready(zf.init);
$(window).load(zf.displayIntro);