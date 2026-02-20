<?php
	require_once '../libs/Mobile_Detect.php';
	$detect = new Mobile_Detect;

	if (isset($_GET['request_ids'])){
		session_start();
		$_SESSION['_sens_request_ids'] = $_GET['request_ids'];
		$sufix = '?request_ids='.$_GET['request_ids'];
	}

	if ( $detect->isMobile() ) {
		header("Location: https://www.above.ge/promo/truewhite/".$sufix);
	}
?>
<!DOCTYPE html>
<html>
<head lang="en">
	<meta charset="UTF-8">
	<title>SENSODYNE TRUE White</title>
	<meta property="og:title" 		content="Ιδανική Διαδρομή - Sensodyne True White" />
	<meta property="og:type"		content="website" />
	<meta property="og:image" 		content="http://www.above.ge/promo/truewhite/fb1200x630.jpg" />
	<meta property="og:description" content="Μόλις επέλεξα την διαδρομή με τον χαμηλότερο δείκτη αποτριβής και ανακάλυψα το πραγματικό λευκό. Ακολούθησε και εσύ την ιδανική διαδρομή και κέρδισε οδοντόκρεμες Sensodyne True White για έναν ολόκληρο χρόνο!" />
	<meta property="fb:app_id" 		content="460874684112962" />

	<script>
		top.location.href = 'https://www.facebook.com/masoutis/app/460874684112962/';
	</script>
</head>
<body>

</body>
</html>