<?php
$errors = array();

//Prüfen ob Formular abgesendet
if(isset($_POST['submit'])) {
	
	$spamcheck = false;

	//Spamcheck
	if(!isset($_POST["repeat_email"]) ||  !empty($_POST["repeat_email"]) || isset($_POST["terms"])) {
		$errors[] = "Additional fields have been completed, we suspect spam and break off here.";	
	} else {
		$spamcheck = true;
	}

	// Eingaben Validieren
	if($spamcheck == true) {	
		
		if(empty($_POST['name'])) { //Wenn Name leer
			$errors[] = "Please enter your name";
		}

		if (!empty($_POST['phone']) && is_numeric($_POST['phone']) == false) { //Wenn Feld nicht leer, dann auf nur Ziffern prüfen
			$errors[] = "Please indicate telephone only with numbers";
		}
		
		if(empty($_POST['email'])){ //Wenn Email leer
			$errors[] = "Please enter email address";
		} elseif (filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) == false) { //Emailformat überprüfen ab PHP 5.2
			$errors[] = "Please enter a valid email address";
		}

		if (!empty($_POST['url']) && filter_var($_POST['url'], FILTER_VALIDATE_URL) == false) { //Wenn Feld nicht leer dann URL überprüfen ab PHP 5.2
			$errors[] = "Specify please valid URL, including  http: / /";
		}
		if(empty($_POST['link'])){ //Wenn Nachricht leer
			$errors[] = "Please enter the link";
		} elseif (filter_var($_POST['link'], FILTER_VALIDATE_URL) == false) { //Emailformat überprüfen ab PHP 5.2
			$errors[] = "Please specify a valid link";
		}

				
		if(empty($_POST['message'])){ //Wenn Nachricht leer
			$errors[] = "Please enter your message";
		} 
		
		if(!isset($_POST["gender"])){ //Wenn Spamcheck nicht markiert
			$errors[] = "Please confirm the SpamCheck";
		}	
	}

    if(isset($_POST['send']) && empty($errors) && $spamcheck == true) {

        //Formular weiter verarbeiten

    }
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Kontakt-Historic.Place</title>

	
<script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
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
  <h4> We show only pictures declared as public domain or under free
        licenses like CC, CC-BY, CC-BY-SA or pictures free for use by
        <a href="https://wiki.openstreetmap.org/wiki/Main_Page" target="_blank">OSM</a> based maps.<br />
        If you find an image or an link on our map on which you have rights and of
        which you do not wish us to display it, please send an email to:<br />

  E-Mail: <a href="mailto:lutz@historic.place">lutz@historic.place</a><br />
  E-Mail: <a href="mailto:zecke@historic.place">zecke@historic.place</a><br />

We will respond as quickly as we can.<br/> You can use this contact form also to disable thumbnail preview pending clarification. </h4> 


	<noscript>Please enable JavaScript to submit the form </noscript>

      <?php if(isset($_POST['submit']) && empty($errors) == false) {?>
      <div style="background:#FCC">
          <strong>Please check your information!</strong><br />
          <?php echo '<ul><li>'.implode('</li><li>',$errors).'</li></ul>'; ?>
      </div>
      <?php } ?>        
        
        <form id="phpform" method="post" action="formular-spamschutz2.php"  autocomplete="on">

            <p><label for="name">Name<span>*</span></label>
            <input type="text" name="name" value="<?=(isset($_POST['name'])) ? $_POST['name'] :''?>"></p>

            <p><label for="phone">Phone</label>
			<input type="text" name="phone" value="<?=(isset($_POST['phone'])) ? $_POST['phone'] :''?>"></p>

            <p><label for="email">Email<span>*</span></label>
			<input type="text" name="email" value="<?=(isset($_POST['email'])) ? $_POST['email'] :''?>"></p>

            <p><label for="url">Website</label>
			<input type="text" name="url" value="<?=(isset($_POST['url'])) ? $_POST['url'] :''?>"></p>

	    <p><label for="link">Link<span>*</span></label>
			<input type="text" name="link" value="<?=(isset($_POST['link'])) ? $_POST['link'] :''?>"></p>

            <p><label for="message">Message<span>*</span></label><br />
            <textarea name="message" rows="8"><?=(isset($_POST['message'])) ? $_POST['message'] :''?></textarea></p>

			<p><input type="checkbox" name="gender" <?=(isset($_POST['gender'])) ? "checked='checked'" : ''?>><span>*</span> I send no unsolicited email</p>

            <p><input type="submit" name="submit" value="send"></p>

        	<div class="terms">
            Please leave the following fields!
            <input type="checkbox" name="terms">
        	</div>          
        </form>
        <span>*</span>Required Fields
  

</body>
</html>
