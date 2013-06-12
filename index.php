<?php
	require_once './requests/api/mobileDetect/Mobile_Detect.php';
	$detect = new Mobile_Detect;
	$deviceType = ($detect->isMobile() ? ($detect->isTablet() ? 'tablet' : 'phone') : 'computer');
?>
<!DOCTYPE html>
<html lang="fr">

<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

	<title>Clapps | L'application communautaire des professionnels du cinéma et de l'audiovisuel</title>
	<meta property="og:type" content="website">
    <meta property="og:url" content="http://www.clapps.fr">
    <meta property="og:image" content="http://backup.clapps.fr/img/logo_clapps.png">
    <meta property="og:site_name" content="Clapps">
    <meta property="og:description" content="L’application communautaire des professionnels du cinéma et de l'audiovisuel. Clapps centralise toutes les offres d’emplois dans le secteur du cinéma et vous donne la possibilité de mettre en avant vos plus beaux projets."/>
 	<meta name="description" content="Clapps est une communauté composée de tous les métiers du cinéma et de l’audiovisuel. Vous pourrez rencontrer, dialoguer et collaborer facilement." />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable = no" />
	<link rel="shortcut icon" href="images/favicon.ico" />  
	
	<?php if ($deviceType=="phone"): ?>
		<link href="css/mobile.css" rel="stylesheet" type="text/css">
	<?php else: ?>
		<link href="css/style.css" rel="stylesheet" type="text/css">
		<!--[if lte IE 8]>
			<link rel="stylesheet" href="css/ie.css" type="text/css" />
			<script src="js/libs/html5shiv/html5shiv.js" type="text/javascript"></script>
		<![endif]-->
	<?php endif; ?>
	
	<link rel="image_src" href="http://www.clapps.fr/images/logo.png" />
	<link href='http://fonts.googleapis.com/css?family=Droid+Sans:400,700' rel='stylesheet' type='text/css'>

</head>

<body>
	
	<!-- Google analytics -->
	<script type="text/javascript">
		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', 'UA-36398282-3']);
		_gaq.push(['_trackPageview']);
		(function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		})();
	</script>
	<!-- Google analytics -->
	
	<?php if ($deviceType!="phone"): ?>
		
		<div id="page" style="display:none;">
			<header>
				<div class="wrapper clearfix" id="top_wrapper">
					<h1><a href="http://www.clapps.fr?a=false" class="logo" onClick="_gaq.push(['_trackEvent', 'header', 'Click', 'logo']);">Clapps</a></h1>
					<nav>
						<ul class="clearfix">
							<li class="current"><a href="#first_part">Le concept</a></li>
							<li><a href="#second_part">L'application <span>new</span></a></li>
							<li><a href="#third_part">L'équipe</a></li>
						</ul>
					</nav>
					<ul class="follow">
						<li class="social_link fb_link">
							<a href="http://www.facebook.com/Clapps.Network" rel="external" onClick="_gaq.push(['_trackEvent', 'header', 'Click', 'Facebook']);" >Facebook</a>
						</li>
						<li class="social_link twitter_link">
							<a href="http://twitter.com/Clapps_fr" rel="external" onClick="_gaq.push(['_trackEvent', 'header', 'Click', 'Twitter']);">Twitter</a>
						</li>
					</ul>
				</div>
			</header>

			<section id="first_part" class="part">
				<div id="intro" class="left_col col">
					<div class="wrapper"></div>
					<div class="first_left_content content">
						<div class="text">
							<div class="hang">
								<h2 class="clearfix">Vous êtes <strong>Cinéaste ?</strong></h2>
								<h3>Avez-vous déjà rêvé d’un espace dédié à votre métier ?</h3>
							</div>
							<div class="desc">
								<p>Imaginez un réseau professionnel pensé pour vous, où dévoiler votre univers vous permettra d’entrer en connexion avec celui des autres.
								</p>
								<p>Accroître votre visibilité et mettre en avant vos compétences, étoffer votre carnet d’adresses et trouver de nouvelles collaborations seront autant de fonctionnalités qui s’offriront à vous. </p>
								<p>Clapps mettra à votre disposition les outils adaptés à votre profil pour toutes les situations.</p>
								<p><strong>Vos rêves se réaliseront à partir de mai 2013 !</strong></p>
							</div>
							<a href="#" id="buttonAbout">En savoir +</a>
							<form action="requests/listSubscribe.php" method="post" id="formSubscribe" >
								<legend>En attendant, <span>restez informé de l’avancement du projet</span><br/>inscrivez-vous à la newsletter</legend>
								<div class="field">
									<input type="text" placeholder="votreadresse@email.com" name="email" id="emailNewsletter" />
									<button>Je reste <span>informé</span></button>
								</div>
							</form>
							<div id="error_subscribe"></div>
						</div>
					</div>
				</div> <!-- end #intro -->
				<div id="about" class="left_col col">
					<div class="wrapper"></div>
					<div class="first_left_content content">
						<a href="#" id="buttonBackAbout">Retour</a>
						<div class="about_content"></div>
					</div>
				</div> <!-- end #about -->
				<div class="right_col col">
					<div class="wrapper"></div>
					<div class="slider">
						<ul class="slider_display clearfix">
							<li class="display current">
								<img src="images/slide_1.jpg" alt="Fond Clapps" />
							</li>
							<li class="display">
								<img src="images/slide_2.jpg" alt="Fond Clapps" />
							</li>
							<li class="display">
								<img src="images/slide_3.jpg" alt="Fond Clapps" />
							</li>
							<li class="display">
								<img src="images/slide_4.jpg" alt="Fond Clapps" />
							</li>
						</ul>
						<ul class="slider_desc clearfix">
							<li class="desc current">
								<div><span>Le réseau communautaire</span></div>
								<div><span>des <strong>professionnels du cinéma</strong></span></div>
								<div><span>et de <strong>l'audiovisuel</strong></span></div>
							</li>
							<li class="desc" style="display: none;">
								<div><span>Vous n’avez pas envie </span></div>
								<div><span>que votre tournage devienne</span></div>
								<div><span>le prochain <strong>“L’homme</strong></span></div>
								<div><span><strong>qui tua Don Quichotte”</strong></span></div>
							</li>
							<li class="desc" style="display: none;">
								<div><span>Le calcul de vos fiches </span></div>
								<div><span>d’intermittent vous semble </span></div>
								<div><span>être sortie tout droit</strong></span></div>
								<div><span>de <strong>“Will Hunting”</strong></span></div>
							</li>
							<li class="desc" style="display: none;"> 
								<div><span>Le financement d’un projet</span></div>
								<div><span>c’est de <strong>“L’histoire sans fin”</strong></span></div>
							</li>
						</ul>
						<ul class="slider_control clearfix">
							<li class="current control"><a href="javascript:void(0);">1</a></li>
							<li class="control"><a href="javascript:void(0);">2</a></li>
							<li class="control"><a href="javascript:void(0);">3</a></li>
							<li class="control"><a href="javascript:void(0);">4</a></li>
						</ul>
						<div class="slider_frame"></div>
					</div> 
				</div> <!-- end .right_col -->
			</section>

			<section id="second_part" class="part">
				<div class="bg"></div>
				<div class="second_content content">
					<div class="title">
						<h2>En attendant la sortie du site <span>Mai 2013</span>,<br/> 
						Clapps vous présente son <span>application Facebook</span></h2>
					</div>
					<img src="images/display_appli.png" alt="" />
					<a href="http://www.my.clapps.fr" id="appli_button" rel="external" onClick="_gaq.push(['_trackEvent', 'Application', 'Click', 'acceder']);" >Je découvre l'application</a>
					<div class="subcontent clearfix">
						<div class="desc">
							<div class="col col_left">
								<h3>Une application autonome</h3>
								<p>Renseignez vos critères dans les filtres et sauvegardez les. L’application reviendra vers vous, dès qu’il y aura des annonces correspondant à votre profil.</p>
								<h3>Une application organisée</h3>
								<p>Finie l’époque où l’on perdait du temps à fouiller dans des listes sans fin. Désormais la gestion des filtres se fait en quelques clics pour vous proposer des annonces toujours à jour et pertinentes.</p>
								<strong>En plus de ça l’application est gratuite, alors comment ne pas y résister !</strong>
							</div>
							<ul class="col col_right">
								<li><span>Sauvegardez</span> facilement vos filtres<br/> et <span>soyez informé</span> des nouvelles annonces</li>
								<li><span>Ajoutez et partagez</span><br/> vos annonces favorites</li>
								<li><span>Créez</span> très facilement vos annonces<br/> et recevez les candidatures inbox</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			<section id="third_part" class="part">
				<div class="third_content content">
					<h2>Contact</h2>
					<p>Des questions, des suggestions, envie de rejoindre l’aventure ou tout simplement de nous dire bonjour,<br/>
					n’hésitez pas à utiliser le <span>formulaire de contact ci-dessous</span> :</p>
					<div class="clearfix" id="contact">
						<div id="leftCol">
							<p><span>Sélectionner</span> la personne à contacter :</p>
							<ul>
								<li>
									<a href="#" class="clearfix" name="jt">
										<img src="./images/jeremy.jpg" alt="Jeremy thery" />
										<strong>Jérémy Théry</strong>
										<em>Chef de projet / Stratégie digitale</em>
									</a>
								</li>
								<li>
									<a href="#" class="clearfix" name="mb">
										<img src="./images/maxime.jpg" alt="Maxime Briand" />
										<strong>Maxime Briand</strong>
										<em>Responsable marketing</em>
									</a>
								</li>
								<li>
									<a href="#" class="clearfix" name="rb">
										<img src="./images/romain.jpg" alt="Romain Briaux" />
										<strong>Romain Briaux</strong>
										<em>Directeur artistique</em>
									</a>
								</li>
								<li>
									<a href="#" class="clearfix" name="plb">
										<img src="./images/pierre-loic.jpg" alt="Pierre-loic Berret" />
										<strong>Pierre-loic Berret</strong>
										<em>Chef de projet technique</em>
									</a>
								</li>
								<li class="last">
									<a href="#" class="clearfix" name="ld">
										<img src="./images/leonard.jpg" alt="Léonard Drouillas" />
										<strong>Léonard Drouillas</strong>
										<em>Responsable développement</em>
									</a>
								</li>
							</ul>
						</div>
						<form action="requests/sendEmail.php" method="post">
							<div class="field">
								<input type="text" placeholder="Objet de votre message" name="objet" id="objetField" class="field" />
								<span></span>
							</div>
							<div class="field">
								<input type="text" placeholder="Prénom, Nom" name="nom" id="nomField" class="field" />
								<span></span>
							</div>
							<div class="field">
								<input type="text" placeholder="votreadresse@email.com" name="email" id="emailField" class="field email" />
								<span></span>
							</div>
							<div class="field">
								<input type="hidden" id="contactActif" name="contactActif" value="c" />
								<span></span>
							</div>
							<div class="field">
								<textarea placeholder="Votre message..." name="contenu" id="contenuField" class="field" ></textarea>
								<span></span>
							</div>
							<div id="blocButton">
								<input type="submit" value="Envoyer le message" id="sendEmailButton" onClick="_gaq.push(['_trackEvent', 'contact', 'Click', 'Envoyer']);_gaq.push(['_trackEvent', 'contact', 'Click', "+zf.$emailTo+"]);" />
								<div id="formMsg"></div>
							</div>
						</form>
					</div> <!-- end #contact -->
				</div>
			</section>

			<footer>
				<div class="wrapper">
					<nav>
						<ul>
							<li><a href="http://clapps.fr/about" onClick="_gaq.push(['_trackEvent', 'footer', 'Click', 'À propos']);" >À propos</a></li>
							<li><a href="http://clapps.fr/mentions" onClick="_gaq.push(['_trackEvent', 'footer', 'Click', 'Mentions Legales']);" >Mentions légales</a></li>
						</ul>
					</nav>
					<div><span>Clapps.fr</span> - © Copyright 2013</div>
				</div>
			</footer>

		</div> <!-- end #page -->

		<!-- Animation -->
		<div id="animLogo" class="anim" style="display:none">
			<div id="cache"></div>
			<div id="canvas">
				<canvas id="canvasLogo" width="250" height="250"></canvas>
			</div>
		</div>
		
	<?php else: ?>
		
		<div id="container">
			<h1><a href="http://clapps.fr" id="logo">Clapps</a></h1>
			<p>
				<span>Version mobile prochainement disponible !</span>
				En attendant, rejoignez notre communauté :
			</p>
			<a href="http://www.facebook.com/Clapps.Network" rel="external" class="fb" target="_blank" onClick="_gaq.push(['_trackEvent', 'home', 'Click', 'Lien facebook mobile']);" >Facebook</a>
			<a href="http://twitter.com/clapps_fr" rel="external" class="twitter" target="_blank" onClick="_gaq.push(['_trackEvent', 'home', 'Click', 'Lien twitter mobile']);">Twitter</a>
		</div>
		
	<?php endif; ?>
	
	<?php if ($deviceType!="phone"): ?>
		
		<!-- jquery -->
		<script src="js/libs/jquery-1.8.1.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/libs/jquery.shuffleLetters.js" type="text/javascript"></script>
		<script src="js/libs/jquery.placeholder.js" type="text/javascript"></script>
		<!-- fancybox -->
		<script src="js/libs/fancybox/jquery.fancybox.js" type="text/javascript"></script>
		<link href="js/libs/fancybox/jquery.fancybox.css" rel="stylesheet" type="text/css">
		<!-- main js -->
		<script src="js/main.js" type="text/javascript" charset="utf-8"></script>
		
		<?php if ($_GET['a']!=null){ echo '<script>zf.param_anim= '.$_GET['a'].';</script>'; } ?>
		<?php if ($_GET['e']!=null){ echo '<script>zf.param_email= '.$_GET['e'].';</script>'; } ?>
		<?php if ($_GET['f']!=null){ echo '<script>zf.param_fn= '.$_GET['f'].';</script>'; } ?>
		<?php if ($_GET['l']!=null){ echo '<script>zf.param_ln= '.$_GET['l'].';</script>'; } ?>
		<?php if ($_GET['j']!=null){ echo '<script>zf.param_job= '.$_GET['j'].';</script>'; } ?>
		<?php if ($_GET['p']!=null){ echo '<script>zf.param_provenance= '.$_GET['p'].';</script>'; } ?>
		<?php if ($_GET['m']!=null){ echo '<script>zf.param_method= '.$_GET['m'].';</script>'; } ?>
		<?php if ($_GET['c']!=null){ echo '<script>zf.param_adword= '.$_GET['c'].';</script>'; } ?>
		
	<?php else: ?>
		
		<script src="js/mobile.js" type="text/javascript" charset="utf-8"></script>
		
	<?php endif; ?>
	
</body>

</html>
