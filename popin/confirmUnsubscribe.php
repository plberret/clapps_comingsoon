<!DOCTYPE html>
<html lang="fr">

<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

	<title>Clapps | Confirmation désinscription | L'application communautaire des professionnels du cinéma et de l'audiovisuel</title>

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

<body id="desinscription" class="bloc-overlay bloc-confirmation">
	
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
	
	<h2>Vous nous quittez déjà ?</h2>
	<div class="bloc">
		<p>Nous sommes désolés de vous voir partir, pour nous aider à comprendre votre choix, vous pouvez remplir le champ ci-dessous.</p>
	</div>
	<form action="../requests/listUnsubscribe.php" method="post" id="formUnsubscribe" class="clearfix">
		<textarea id="contentField" placeholder="Les raisons de votre désinscription..." name="content"></textarea>
		<input type="submit" value="Je valide ma désinscription" onClick="_gaq.push(['_trackEvent', 'desinscription', 'Click', 'Je valide']);"  />
		<div id="formMsg"></div>
	</form>	
</body>

<script src="../js/libs/jquery-1.8.1.min.js" type="text/javascript" charset="utf-8"></script>
<script src="../js/libs/jquery.placeholder.js" type="text/javascript"></script>
<script src="../js/newsletter.js" type="text/javascript"></script>

</html>