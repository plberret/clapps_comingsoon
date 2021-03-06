<!DOCTYPE html>
<html lang="fr">

<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

	<title>Clapps | Mise à jour des informations | L'application communautaire des professionnels du cinéma et de l'audiovisuel</title>

 	<meta name="description" content="Clapps est une communauté composée de tous les métiers du cinéma et de l’audiovisuel. Vous pourrez rencontrer, dialoguer et collaborer facilement." />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable = no" />

	<link rel="shortcut icon" href="images/favicon.ico" />  
	<link rel="image_src" href="http://www.clapps.fr/images/logo.png" />
	<link href='http://fonts.googleapis.com/css?family=Droid+Sans:400,700' rel='stylesheet' type='text/css'>
	<link href="../css/style.css" rel="stylesheet" type="text/css">
	<!--[if lte IE 8]>
		<link rel="stylesheet" href="../css/ie.css" type="text/css" />
		<script src="../js/libs/html5shiv/html5shiv.js" type="text/javascript"></script>
	<![endif]-->

</head>

<body id="confirmation" class="bloc-overlay bloc-confirmation">
	
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
	
	<h2>Nous sommes ravis de vous revoir</h2>
	<span class="msg_confirm">La communauté Clapps est heureuse de vous accueillir</span>
	<div class="bloc">
		<p><span>Vous n’êtes pas qu’un simple email !</span> Faisons connaissance.<br/>Remplissez les champs ci-dessous (facultatif) pour nous aider à mieux vous connaitre.</p>
	</div>
	<form action="../requests/listUpdateMember.php" method="post" id="formUpdate">
		<div class="clearfix">
			<input type="text" placeholder="Votre prénom" id="firstnameField" name="firstname" />
			<input type="text" placeholder="Votre nom" id="lastnameField" name="lastname" />
			<input type="text" placeholder="Votre métier" id="jobField" name="job" />
		</div>
		<input type="submit" value="Compléter mon profil" onClick="_gaq.push(['_trackEvent', 'update profil', 'Click', 'Completer']);" />
		<div id="formMsg"></div>
	</form>
	<ul class="follow clearfix">
		<li>
			<div><span>Retrouvez-nous</span> sur</div>
			<a href="http://www.facebook.com/Clapps.Network" rel="external" class="fb" target="_blank" onClick="_gaq.push(['_trackEvent', 'update profil', 'Click', 'Lien facebook']);">Facebook</a>
		</li>
		<li>
			<div><span>Suivez-nous</span> sur</div>
			<a href="http://twitter.com/clapps_fr" rel="external" class="twitter" target="_blank" onClick="_gaq.push(['_trackEvent', 'update profil', 'Click', 'Lien twitter']);">Twitter</a>
		</li>
	</ul>
</body>

<script src="../js/libs/jquery-1.8.1.min.js" type="text/javascript" charset="utf-8"></script>
<script src="../js/libs/jquery.placeholder.js" type="text/javascript"></script>
<script src="../js/newsletter.js" type="text/javascript"></script>

</html>