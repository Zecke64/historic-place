<?php header('Content-Type: text/html; charset=utf-8');
$errors = array();
$name = htmlentities ($_POST['name']);
$email = htmlentities ($_POST['email']);
$message = htmlentities ($_POST['message']);
$url = htmlentities ($_POST['url']);
$link = htmlentities ($_POST['link']);
$phone = htmlentities ($_POST['phone']);
$name_tag[0] = "Sonntag";         
$name_tag[1] = "Montag";  
$name_tag[2] = "Dienstag";  
$name_tag[3] = "Mittwoch";  
$name_tag[4] = "Donnerstag";  
$name_tag[5] = "Freitag";  
$name_tag[6] = "Samstag";
$num_tag	= date( "w");
$day		= $name_tag[$num_tag];
$year		= date("Y");  
$day_num	= date("d");
$month		= date("m");
$time		= (date("H:i"));

// die variablen der email, die sie erhalten - bitte entsprechend anpassen!
$sender 	=	"Historic.Place Team"; // ihr name oder firma (kann natürlich auch ihre web-adresse sein oder sonstwas)
$email01	=	"lutz@historic.place"; // ihre email adresse (an die das formular geschickt wird)
$email02	=	"zecke@historic.place";// zweite email adresse (an die das formular geschickt wird)
$subject01	=	"Urheberrechtsverletzung bei Historic.Place"; // betreff der email, die sie erhalten

$body01 = "IP-Adresse: ".$_SERVER["REMOTE_ADDR"]."\n"; 
$body01		.=	"Nachricht gesendet am $day, $day_num.$month.$year um $time: 

----------------------------------------------------------------
Name     : $name 
eMail    : $email 
Website  : $url
Phone    : $phone
Bildlink : $link
----------------------------------------------------------------
Nachricht: 
$message ";

// die variablen der bestätigungsmail an den absender - bitte entsprechend anpassen! (nur, wenn diese funktion aktiviert ist)
$subject02	=	"Vielen Dank für Ihre Nachricht"; // betreff der bestätigungsmail
$body02		=	"Am $day, $day_num.$month.$year um $time haben wir folgende Nachricht von Ihnen erhalten:
-----------------------------------------------------------------------------------
Name     : $name
eMail    : $email
Website  : $url
Phone    : $phone
Bildlink : $link
-----------------------------------------------------------------------------------
Nachricht: 
$message
-----------------------------------------------------------------------------------
Wir werden uns umgehend um Ihre Anfrage kümmern.
Sollte es sich um einen Irrtum handeln, informieren Sie uns bitte unter mailto:$email01
			
Gruss
$sender"; // das sind sie ;-)
//Prüfen ob Formular abgesendet
if(isset($_POST['submit'])) {
	
	//Spamcheck mit jedem neuem Absenden zurücksetzen
	$spamcheck = false; 

	//Spamcheck
	if(!isset($_POST["repeat_email"]) || !empty($_POST["repeat_email"]) || isset($_POST["terms"])) {
		$errors[] = "Zusatzfelder wurden ausgefüllt, wir vermuten Spam und brechen hier ab.";	
	} else {
		$spamcheck = true;
	}

	// Eingaben Validieren
	if($spamcheck == true) {	

		if(empty($_POST['name'])) { //Wenn Name leer
			$errors[] = "Bitte geben Sie Ihren Namen an";
		}
		if (!empty($_POST['phone']) && is_numeric($_POST['phone']) == false) { //Wenn Feld nicht leer, dann auf nur Ziffern prüfen
			$errors[] = "Telefonnummer bitte nur mit Ziffern angeben";
		}
		
		if(empty($_POST['email'])){ //Wenn Email leer
			$errors[] = "Bitte Emailadresse angeben";
		} elseif (filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) == false) { //Emailformat überprüfen ab PHP 5.2
			$errors[] = "Bitte geben Sie ein gültige Emailadresse an";
		}
				
		if(empty($_POST['message'])){ //Wenn Nachricht leer
			$errors[] = "Bitte geben Sie Ihre Nachricht ein";
		}
		if(empty($_POST['link'])){ //Wenn Nachricht leer
			$errors[] = "Bitte geben Sie den Bildlink ein";
		} elseif (filter_var($_POST['link'], FILTER_VALIDATE_URL) == false) { //Emailformat überprüfen ab PHP 5.2
			$errors[] = "Bitte geben Sie ein gültigen Bildlink an";
		}

		if(!isset($_POST["gender"])){ //Wenn Spamcheck nicht markiert
			$errors[] = "Bitte bestätigen Sie den Spamcheck";
		}		
	
	}

    if(isset($_POST['submit']) && empty($errors) && $spamcheck == true) {
        // Spamtest bestanden, alle erforderlichen Felder richtig ausgefüllt
		// Eintrag in Datenbank oder Email Versand
		echo "Ihre IP-Adresse, sowie folgende Daten wurden Erfolgreich gesendet.";
		echo "<br>";
		echo "Name : $name";
		echo "<br>";
		echo "eMail : $email";
		echo "<br>";
		echo  "Website : $url";
		echo "<br>";
		echo "Phone : $phone";
		echo "<br>";
		echo "Bildlink : $link";
		echo "<br>";
		echo "Nachricht : $message";
		mail ($email01, $subject01, $body01, "From:$email");
		mail ($email02, $subject01, $body01, "From:$email");
		mail ($email, $subject02, $body02, "From:$email01");
    }

}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	
<title>Fehlermeldung Historic.Place</title>
	
<script src="https://codeorigin.jquery.com/jquery-1.10.2.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	$('.terms').append('<input type="text" name="repeat_email" />');
});
</script> 
<style>
	/*Demo Formular Styles*/
	label { display:inline-block; width:100px; }
	input { padding:5px; width:300px; }
	input[name="plz"] { width:60px; }
	input[name="city"] { width:222px; }
	input[type="submit"] { width:160px; background:#09F; }
	input[type="checkbox"] { width:20px; margin-right:10px; }
	textarea { width:410px; }
	span { color: #c00; }
	
	.terms{ display:none; }

</style>   
</head>

<body>	

     <h4>Wir zeigen nur Bilder, die als gemeinfrei, einer freien Lizenz wie CC, CC-BY, CC-BY-SA oder frei zur Darstellung
im Umfeld von <a href="https://wiki.openstreetmap.org/wiki/Main_Page" target="_blank">OSM</a> deklariert sind,<br /> können also durch Falschdeklaration
von Bildern und Links betrogen werden.<br />

Sollten Sie bei uns ein Bild oder Link finden, an dem Sie Rechte besitzen und von
dem Sie nicht wünschen, dass wir es darstellen, senden Sie bitte eine
kurze Mail an:<br />

  E-Mail: <a href="mailto:lutz@historic.place">lutz@historic.place</a><br />
  E-Mail: <a href="mailto:zecke@historic.place">zecke@historic.place</a><br />

Wir reagieren so schnell es uns möglich ist.<br/> Sie können auch dieses Kontaktformular benutzen, um ein Vorschaubild oder Link bis zur Klärung zu sperren.</h4>



	<noscript>Bitte aktivieren Sie Javascript zum Absenden des Formulars</noscript>

      <?php if(isset($_POST['submit']) && empty($errors) == false) {?>
      <div style="background:#FCC">
          <strong>Bitte überprüfen Sie Ihre Angaben!</strong><br />
          <?php echo '<ul><li>'.implode('</li><li>',$errors).'</li></ul>'; ?>
      </div>
      <?php } ?>        
        
        <form id="phpform" method="post" action="formular-spamschutz.php"  autocomplete="on">

            <p><label for="name">Name<span>*</span></label>
            <input type="text" name="name" value="<?=(isset($_POST['name'])) ? $_POST['name'] :''?>"></p>
            <p><label for="phone">Telefon</label>
	    <input type="text" name="phone" value="<?=(isset($_POST['phone'])) ? $_POST['phone'] :''?>"></p>
	    <p><label for="email">Email<span>*</span></label>
	    <input type="text" name="email" value="<?=(isset($_POST['email'])) ? $_POST['email'] :''?>"></p>
	    <p><label for="url">Website</label>
	    <input type="text" name="url" value="<?=(isset($_POST['url'])) ? $_POST['url'] :''?>"></p>
	    <p><label for="link">Link<span>*</span></label><br />
            <input type="text" name="link" value="<?=(isset($_POST['link'])) ? $_POST['link'] :''?>"></p>	

            <p><label for="message">Nachricht<span>*</span></label><br />
            <textarea name="message" rows="8"><?=(isset($_POST['message'])) ? $_POST['message'] :''?></textarea></p>
            


			<p><input type="checkbox" name="gender" <?=(isset($_POST['human'])) ? "checked='checked'" : ''?>><span>*</span> Ich versende keine unerwünschte Mail</p>

            <p><input type="submit" name="submit" value="Absenden"></p>

        	<div class="terms">
            Folgende Felder bitte frei lassen!
            <input type="checkbox" name="terms">
        	</div>          
        </form>

</body>
</html>
