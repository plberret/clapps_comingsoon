
var zf = zf || {};

/* ANIMATION FRAME
--------------------------------------------------------------------------------------------------------------------------------------*/

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

/* ANIMATION INTRO
--------------------------------------------------------------------------------------------------------------------------------------*/

zf.initDisplay = function(){
	
	// init
	zf.$isUpdate=false;
	zf.initAnimation();
	
	// url direct: about, mentions, confirmation subscribe, update, unsubscribe, profil ciblé
	// a = animation 
	// f = firstname
	// l = lastname
	// j = job 
	// e = email 
	// p = provenance 
	// m = method 
	// c = ciblage adword 
	// desinscription : 76639, confirmation inscription : 92038, update profil : 92039
	// ex: ?a=false&m=92038&e=pl.berret@gmail.com&f=pl&l=&j=test&p=test
	// ?a=false&m=92038&e='pl.berret@gmail.com'&f='pl'&l=''&j='test'&p='test'
	
	// detecte ie 7&8
	if ( $.browser.msie ) {
		$ie=parseInt($.browser.version, 10); 
		if($ie<=9){
			if($ie<9){
				zf.displayContent();
				return false; 
			}
		}
	}

	// animation  
	if(zf.param_anim==false){
		zf.displayContent();
	}else{
		$('#animLogo').show();
		zf.startAnimLogo(function() {
			$('#animLogo #canvas').fadeOut(600); 
			setTimeout(function(){
				zf.displayContent();
				$('#animLogo').fadeOut(300); 
			},700);
		});
	}
	
	// provenance adwords
	zf.$fieldJob = zf.$page.find('#first_part #intro h2 strong');
	$.getJSON('js/jobs.json', function(data) {
		if(zf.param_adword==null){
			// get jobs
			zf.jobs = [];
			$.each(data.jobs, function(key, val) {
				for(var i=0;i<val.priority;i++){
					zf.jobs.push(val.name);
				}
			});
			zf.$fieldJob.html(zf.jobs[0]);
			zf.changeJob();
		}else{
			zf.$fieldJob.html(data.jobs[zf.param_adword].name);
		}
	});
	
	// completer les infos d'une inscription externe
	if((zf.isValidEmail(zf.param_email))&&(zf.param_method==92038)){
		$.fancybox.open({
			href: './popin/confirmSubscribe.php?p='+zf.param_provenance+'&e='+zf.param_email+'&f='+zf.param_fn+'&l='+zf.param_ln+'&j='+zf.param_job,
			type: 'iframe',
			closeClick  : false,
			helpers   : { 
				overlay : {closeClick: false}
			}
		//	afterShow: zf.initNewsletter
		});
		//_gaq.push(['_trackPageview', '/modification-fromFB']);
		return false;
	}
	
	// affichage du message d'update
	if((zf.isValidEmail(zf.param_email))&&(zf.param_method==92039)){
		$.fancybox.open({
			href: './popin/updateSubscribe.php?p='+zf.param_provenance+'&e='+zf.param_email+'&f='+zf.param_fn+'&l='+zf.param_ln+'&j='+zf.param_job,
			type: 'iframe',
			closeClick  : false,
			helpers   : { 
				overlay : {closeClick: false}
			}
		//	afterShow: zf.initNewsletter
		});
		//_gaq.push(['_trackPageview', '/modification']);
		return false;
	}
	
	// affichage du message de desinscription
	if((zf.isValidEmail(zf.param_email))&&(zf.param_method==76639)){
		$.fancybox.open({
			href: './popin/confirmUnsubscribe.php?e='+zf.param_email,
			type: 'iframe',
			closeClick  : false,
			helpers   : { 
				overlay : {closeClick: false}
			}
		//	afterShow: zf.initNewsletter
		});
	//	_gaq.push(['_trackPageview', '/desinscription']);
		return false;
	}
	
};

zf.initAnimation = function() {
	
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
		zf.context.drawImage(zf.logoBottom,zf.leftLogos,zf.topLogoB);

		// Start anim
		zf.angle = 0; //init angle

		if(callback){
			zf.callback = callback;
		}

		zf.ctx.drawImage(zf.logoTop,zf.leftLogos,zf.topLogoT);
		zf.firstTop = parseInt(zf.$animLogo.css('top'));
		zf.TTop = parseInt(zf.$animLogo.css('top'));
		zf.animRate = 0;
		zf.launchAnim();
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
	
	zf.animateOne = function() {
		zf.rAF = requestAnimationFrame(zf.animateOne);
		zf.animationLogoOne();
		zf.angle-=6;
	};
	
	zf.animationLogoOne = function() {
		zf.anim();
		if (zf.angle <= -36) {
			cancelAnimationFrame(zf.rAF);
			zf.animateTwo();
		};
	};
	
	zf.animateTwo = function() {
		zf.rAF2 = requestAnimationFrame(zf.animateTwo);
		zf.animationLogoTwo();
		zf.angle+=4;
	};
	
	zf.animationLogoTwo = function() {
		zf.anim();
		if (zf.angle > 1 ) {
			cancelAnimationFrame(zf.rAF2);
			zf.animateThree();
		};
	};
	
	zf.animateThree = function() {
		zf.rAF3 = requestAnimationFrame(zf.animateThree);
		zf.animationLogoThree();
		zf.angle--;
	};
	
	zf.animationLogoThree = function() {
		zf.anim();
		if (zf.angle < 1 ) {
			cancelAnimationFrame(zf.rAF3);
			zf.callback();
		};
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
	
	Math.easeOutQuad = function (t, b, c, d) {
		t /= d;
		return -c * t*(t-2) + b;
	};
	
};


/* OTHERS FUNCTIONS
--------------------------------------------------------------------------------------------------------------------------------------*/

zf.displayContent = function() {
	zf.$page.show();
	zf.$page.find('section').css({'min-height': $(window).height()});
	zf.$page.find('section .slider').css({'min-height': $(window).height()-79});
	zf.resizeSlider();
	zf.responsiveHeader();
	
	$(window).resize(function(){
		zf.$page.find('section').css({'min-height': $(window).height()});
		zf.$page.find('section .slider').css({'min-height': $(window).height()-79});
		zf.resizeSlider();
		zf.responsiveHeader();
 	});
	
	zf.currentPart = '#first_part';
	zf.navAnim = false;
	
	zf.displayTrame();
	
	$(window).scroll(function(){
		
		var scroll = $(this).scrollTop();
		$first_part = $('#first_part').position().top;
		$second_part = $('#second_part').position().top;
		$third_part = $('#third_part').position().top;
		var lastCurrentPart = zf.currentPart;
		
		if(scroll < ($second_part - 80)){
			zf.currentPart = '#first_part';
		}else if((scroll >= ($second_part - 80))&&(scroll < ($third_part - 80))){
			zf.currentPart = '#second_part';
		}else{
			zf.currentPart = '#third_part';
		}
		
		if((lastCurrentPart != zf.currentPart)&&(zf.navAnim==false)){
			$('header nav').find('li.current').removeClass('current');
			$('header nav li a').each(function(){
				$this = $(this);
				if($this.attr('href')==zf.currentPart){
					$this.parent().addClass('current');
				}
			});
		}
		
		// bandeau noir scroll 
		if((scroll < 5)&&($(this).width() > 960)){
			if(zf.$page.find('header').hasClass('top')){
				zf.$page.find('header').removeClass('top');
			}
		}else{
			if(!zf.$page.find('header').hasClass('top')){
				zf.$page.find('header').addClass('top');
			}
		}
		
		if(zf.$page.find('#first_part .slider_frame').css('display')!="none"){
			zf.$page.find('#first_part .slider_frame').hide(); 
		}
		
	}); 
	
	// slider navigation
	zf.startSlider();
	zf.$page.on('click', '.slider .control a',function(event){
		clearInterval(zf.animSlider);
		index = $(this).parent().index();
		$next = zf.$page.find('.slider .display').eq(index);
		$next.css({'z-index': 5});
		zf.$page.find('.slider .display.current').fadeOut(1200, function(){
			$next.addClass('current').css({'z-index': 6});
			$(this).removeClass('current').css({'z-index': 4}).show();
		});
		zf.$page.find('.slider .desc.current').fadeOut(1200, function(){
			zf.$page.find('.slider .desc').eq(index).addClass('current').fadeIn(500);
			$(this).removeClass('current');
		});
		zf.$page.find('.slider .control.current').removeClass('current');
		$(this).parent().addClass('current');
		zf.startSlider();
	});

};

zf.responsiveHeader = function() {
	// fix header < 960 
	var width = $(window).width();
	if((width < 960) && (zf.$page.find('header nav').css('margin-left') != "50px" )){
		zf.$page.find('header nav').css({'margin-left': '50px'});
		zf.$page.find('header').addClass('top');
	}else if((width >= 960) && (zf.$page.find('header nav').css('margin-left') == "50px" )){
		zf.$page.find('header nav').css({'margin-left': '40%'});
	}
};

zf.displayTrame = function() {
	if(zf.$page.find('#first_part .slider_frame').css('display')=="none"){
		setTimeout(function(){
			if(zf.$page.find('#first_part .slider_frame').css('display')=="none"){
				zf.$page.find('#first_part .slider_frame').fadeIn(300); 
			}
		}, 500);
	}
	zf.rAFDisplayTrame = requestAnimationFrame(zf.displayTrame);
}; 

zf.initContact = function() {

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
		// set variable
		$this=$(this);
		$actif=zf.$contact.find("#leftCol li.active a");
		if($this.parent().hasClass('active')){
			return false; 
		}
		// reset animation
		zf.$contact.find("#leftCol li a").stop().animate({
			'left': '-20'
		}, 300, function() {
			$actif.parent().removeClass('active'); 
		});
		// new animation
		$this.stop().animate({
			'left': '0'
		}, 300, function() {
			$this.parent().addClass('active');
		});
		// change value of input email
		zf.$emailTo=$this.attr('name');
		zf.$contact.find("#contactActif").attr('value', zf.$emailTo);
		return false;
	});
	
	// ajax to send email
	zf.$contact.on('submit', 'form', function(){
		$this=$(this);
		$this.find('#sendEmailButton').attr('disabled', 'disabled');
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
	zf.$contact.on('keyup','form div .field.error',function(event){
		$this=$(this);
		if((!$this.hasClass('email'))||(zf.isValidEmail($this.val()))){
			$(this).removeClass('error').parent().find('span').removeClass('error');
			$msg.fadeOut(300);
		}
	}); 

};

zf.initNewsletter = function(){
	
	// variables
	zf.$update = $('#confirmation');
//	zf.$unsubscribe = $('#desinscription');
    
	// ecoute de l'inscription à la newsletter
	zf.$page.on('submit', '#formSubscribe', function() {
		// initialisation
		$form=$(this);
		$('#error_subscribe').html('');
		zf.$userEmail = zf.$page.find('#emailNewsletter').val();

		if((zf.$userEmail=="")||(zf.$userEmail=="votreadresse@email.com")||(!zf.isValidEmail(zf.$userEmail))){
			$('#error_subscribe').html("Votre email n'est pas valide !").fadeIn('slow');
			$("#first_part").find("form button").fadeIn(100);
			return false; 
		}
		
		$form.find("button").fadeOut(100, function(){
			setTimeout(function(){
				$.ajax({
					url: $form.attr('action'),
					type: $form.attr('method'),
					data: $form.serialize(),
					dataType: 'json',
					success: function(json) {
						$.fancybox.open({
							href: './popin/confirmSubscribe.php?p=comingSoon&e='+zf.$userEmail,
							type: 'iframe',
							closeClick  : false,
							helpers   : { 
								overlay : {closeClick: false}
							}//,
						//	afterShow: zf.initNewsletter
						});
						$("#first_part").find("form button").fadeIn(100);
						zf.$page.find('#emailNewsletter').val('');
						//	_gaq.push(['_trackPageview', '/confirmation']);
					}, error: function(json) {
						$('#error_subscribe').html(json.responseText);
						$("#first_part").find("form button").fadeIn(100);
					} 
				});
			}, 1000);
		});
		
		return false;
	});
	
};

zf.changeJob = function(){
	setTimeout(function(){
		var choice = Math.floor(Math.random()*zf.jobs.length)
		zf.$page.find('#intro h2 strong').shuffleLetters({
				"text": zf.jobs[choice]
		});
		zf.changeJob();
	}, 2500);
};

zf.initHeader = function(){
	// nav control
	zf.$page.on('click','header nav a',function(event){
		// var
		$link = $(this);
		zf.navAnim = true;
		// disable click if current menu 
		if($link.parent().hasClass('current')){
			return false;
		}
		// animation
		var position = zf.$page.find($link.attr('href')).position().top;
		$('body,html').animate({
			scrollTop : position
		},'slow', function(){
			zf.navAnim = false;
			$link.parents('nav').find('li.current').removeClass('current');
			$link.parent('li').addClass('current');
		});
		return false;
	});
};

zf.startSlider = function(){
	zf.animSlider = setInterval(function(){
		// display
		$slides = $('#first_part').find('.slider .display');
		$current = $('#first_part').find('.slider .display.current');
		if($slides.last().hasClass('current')){
			$next = $slides.first();
		}else{
			$next = $current.next();
		}
		$next.css({'z-index': 5});
		$current.fadeOut(1200, function(){
			$next.addClass('current').css({'z-index': 6});
			$current.removeClass('current').css({'z-index': 4}).show();
		});
		//text
		$('#first_part').find('.slider .desc.current').fadeOut(1200, function(){
			$this = $(this);
			$desc = $('#first_part').find('.slider .desc');
			if($desc.last().hasClass('current')){
				$desc.first().addClass('current').fadeIn(500);
			}else{
				$this.next().addClass('current').fadeIn(500);
			}
			$this.removeClass('current');
		});
		// control 
		$control = $('#first_part').find('.slider .control');
		$current_control = $('#first_part').find('.slider .control.current');
		if($control.last().hasClass('current')){
			$control.first().addClass('current');
		}else{
			$current_control.next().addClass('current');
		}
		$current_control.removeClass('current');
	}, 10000);
};


zf.init = function(){
	
	// variables
	zf.$body = $('body');
	zf.$page = $('#page');
	
	// test js available
	$('body').addClass('has-js');
	
	// Blank links
	$('a[rel=external]').click(function(){
		window.open($(this).attr('href'));
		return false;
	});
	
	// init 
	zf.initHeader();
	zf.initNewsletter();
	zf.initContact();
	zf.fixPlaceholder(zf.$page);
	
	// ajax content about
	zf.$page.find('#about .about_content').load('content/about.php .text');
	
	// lancer animation about
	zf.$page.on('click','#buttonAbout',function(event){
		zf.$page.find('#first_part #intro').animate({
			left:'-41.5%'
		},300, function(){
			zf.$page.find('#first_part #intro .text').hide();
			if($('#first_part').width() < 1050){
				zf.$page.find('#first_part #intro').hide();
			}
		});
		return false;
	});
	
	zf.$page.on('click','#buttonBackAbout',function(event){
		zf.$page.find('#first_part #intro').show();
		zf.$page.find('#first_part #intro').animate({
			left:'0'
		});
		zf.$page.find('#first_part #intro .text').fadeIn('slow');
		return false;
	});
	
};


/* TOOLS
--------------------------------------------------------------------------------------------------------------------------------------*/

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

zf.fixPlaceholder = function($conteneur) {	
	$conteneur.find('input, textarea').placeholder();
};

zf.resizeSlider = function(callback) {
	var $image = $('#first_part').find('.slider img');
	var image_width = $image.width(); 
	var image_height = $image.height();     
	var over = image_width / image_height; 
	var under = image_height / image_width; 

	var body_width = $('#first_part .slider').width(); 
	var body_height = $('#first_part .slider').height(); 

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

/* DOM READY
--------------------------------------------------------------------------------------------------------------------------------------*/

$(document).ready(zf.init);
$(window).load(zf.initDisplay);