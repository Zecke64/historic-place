<?php
#===============================================================================
#	$Id: thumbcache.php,v 1.16 2013/04/13 19:52:24 wolf Exp wolf $
#===============================================================================
#
#	Provides Thumbnail-JPEG for Image-URL
#
#	image=		Image or Website URL. Mandatory.
#	DEBUG=		If set, error messages instead of replacement picture
#
#	2015-11-04	Geograph images (Zecke)
#
#===============================================================================

$THUMB_WIDTH	= 150;
$THUMB_HEIGHT	= 100;
$THUMB_MINRATIO	= 0.4;
$THUMB_MAXRATIO	= 2.0;

$IMAGE_POS_CACHE_TIME	= 7 * 24 * 3600;	# 1 week
$IMAGE_NEG_CACHE_TIME	= 1 *  6 * 3600;	# 6 hours
$ROBOTS_CACHE_TIME	= 1 * 24 * 3600;	# 1 day

$ALLOWED_DOMAINS = array (
	"flickr.com",
	"openstreetmap.org",
	"staticflickr.com",
	"wikimedia.org",
	"wikipedia.org",
	"www.mapillary.com",
	"images.mapillary.com",
	"cloudfront.net",
	"geograph.org.uk",
	"channel-islands.geographs.org",
	"hlipp.de",
	"geo.hlipp.de",
	"tools.wmflabs.org",
);

$FLICKR_THUMB_SIZE = "m";

$LC = isset($_GET['lang']) && preg_match ('/^(de|en|fr|nl|pt-br|cs|ru|da|gl|ro|tr|es|pl|ja|hu|uk)$/', $_GET['lang'], $match) ? $match[1] : 'de';

$ERROR_IMAGE	= "./i/no-image-$LC.png";
$ERROR_MIME	= 'image/png';
$CACHE_DIR	= '/var/opt/www/hp/dyn/thumbcache';

$USER_AGENT = 'thumbcache.php ; prereads, thumbnails and caches images to display in map popup info boxes. In case of trouble contact ite owner or <lutzto@t-online.de>.';

#-------------------------------------------------------------------------------
#	Global values
#-------------------------------------------------------------------------------

$DOCUMENT_ROOT	= preg_replace ('#/+$#', '', $_SERVER['DOCUMENT_ROOT']);
$NO_CACHE	= isset($_SERVER['HTTP_PRAGMA']) && $_SERVER['HTTP_PRAGMA']=="no-cache" ||
			isset($_SERVER['HTTP_CACHE_CONTROL']) && $_SERVER['HTTP_CACHE_CONTROL']=='no-cache';
$ROBOT_FRESH	= time() - ($NO_CACHE ? 0 : $ROBOTS_CACHE_TIME);
$DEBUG		= @intval($_GET['DEBUG']) + 0;

#-------------------------------------------------------------------------------
#	Wikimedia commons requires a non default User-Agent
#-------------------------------------------------------------------------------

ini_set('user_agent', $USER_AGENT);

#-------------------------------------------------------------------------------
#	Logger
#-------------------------------------------------------------------------------

$lapTime = microtime(TRUE);

function usedTime () {

	global $lapTime;

	$startTime = $lapTime;
	$lapTime = microtime(TRUE);
	return sprintf ('%.3f', $lapTime - $startTime);
}

#-------------------------------------------------------------------------------
#	file_get_contents sometimes very slow
#-------------------------------------------------------------------------------

function file_get_contents_curl($url) {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_AUTOREFERER, TRUE);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);       
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.2) Gecko/20090729 Firefox/3.5.2 GTB5');       

    $data = curl_exec($ch);
    curl_close($ch);

    return $data;
}

#-------------------------------------------------------------------------------
#	Error handler
#-------------------------------------------------------------------------------

$LOG = array();

function Fail ($message) {

	global $LOG;
	global $DEBUG;
	global $DOCUMENT_ROOT;

	header ("HTTP/1.0 400 Something went wrong.");

	#-----------------------------------------------------------------------
	#	Replacement graphic
	#-----------------------------------------------------------------------

	if (!$DEBUG) {

		global $ERROR_IMAGE;
		global $ERROR_MIME;

		$path = "{$DOCUMENT_ROOT}/{$ERROR_IMAGE}";
		$size = @filesize($path);

		if ($size) {

			header ("Content-Type: {$ERROR_MIME}");
			header ("Content-Length: {$size}");

			readfile ($path);

			exit (1);
		}
	}

	#-----------------------------------------------------------------------
	#	Debug mode
	#-----------------------------------------------------------------------

	header ("Content-Type: text/plain");

	echo implode ("\n", $LOG),"\n";
	if (count($LOG)) echo "\n";
	echo "$message\n";

	exit (1);
}

#-------------------------------------------------------------------------------
#	Image URL
#-------------------------------------------------------------------------------

if (preg_match("#^(https?://\S+)$#", $_GET['image'], $match)) {

	$url = preg_replace ('#^(https?://www\.flickr\.com/photos/[\w@-]+/\d+/).*$#', '$1', $match[1]);
} elseif (preg_match("#^(File:.+)$#", $_GET['image'], $match)) {

	$url = "https://commons.wikimedia.org/wiki/" . '$1';
} else {

	Fail ("Parameter 'image=' missing or unknown protocol");
}


#-------------------------------------------------------------------------------
#	Checksum image url
#-------------------------------------------------------------------------------

$thumbHash = md5 ($url);

#-------------------------------------------------------------------------------
#	Cache entry
#-------------------------------------------------------------------------------

$cachePath = "{$CACHE_DIR}/{$thumbHash}.jpg";
$cacheURL  = "{$CACHE_DIR}/{$thumbHash}.url";

$message = "'$url': negative cached.";

#-------------------------------------------------------------------------------
#	If not in cache, must fetch
#-------------------------------------------------------------------------------

#error_log ("XXX vor file_exists",0);
$mustFetch = !file_exists ($cachePath) || $NO_CACHE;

#-------------------------------------------------------------------------------
#	If in cache, check if stale
#-------------------------------------------------------------------------------

if (!$mustFetch) {

	#-------------------------------------------------------------------------------
	#	Determine max age for positive and negative cache entries
	#-------------------------------------------------------------------------------

	$maxAge = filesize($cachePath)>0 ? $IMAGE_POS_CACHE_TIME : $IMAGE_NEG_CACHE_TIME;

	#-------------------------------------------------------------------------------
	#	If too old, must fetch
	#-------------------------------------------------------------------------------

	if (time() - filemtime ($cachePath) > $maxAge) $mustFetch = TRUE;
}

#-------------------------------------------------------------------------------
#	Fetch if needed
#-------------------------------------------------------------------------------

if ($mustFetch) {

	$message = getThumb ($url, $cachePath, $cacheURL);
	touch ($cachePath);
}

#-------------------------------------------------------------------------------
#	If still not in cache, throw error.
#-------------------------------------------------------------------------------

$size = @filesize ($cachePath);

if (!$size) Fail ($message);

#-------------------------------------------------------------------------------
#	Get Thumb infos
#-------------------------------------------------------------------------------

$mtime		= filemtime ($cachePath);
$redirectURL	= trim (@file_get_contents_curl ($cacheURL));

#-------------------------------------------------------------------------------
#	Show messages instead of thumbnail if requested by DEBUG parameter.
#-------------------------------------------------------------------------------

if ($DEBUG>=2) {
	$stamp = date ('c', $mtime);
	if ($redirectURL)
	Fail ("RedirectURL '{$redirectURL}' created at {$stamp} available.");
	Fail ("Thumbnail '{$thumbHash}' created at {$stamp} available.");
}

#-------------------------------------------------------------------------------
#	Components of HTTP header
#-------------------------------------------------------------------------------

$modtime = date ('r', $mtime);

#-------------------------------------------------------------------------------
#	Redirect if possible
#-------------------------------------------------------------------------------

if ($redirectURL) {

	header ("HTTP/1.0 302 Found");

	header ("Location: {$redirectURL}");
	header ("Last-Modified: {$modtime}");
	header ("Content-Type: text/html");

	$htmlRedirectURL = htmlspecialchars ($redirectURL);

	echo <<<EOT
<html>
<head>
<title>Redirect to {$htmlRedirectURL}</title>
</head>
<body>
<p>
Redirecting to <a href="{$htmlRedirectURL}">{$htmlRedirectURL}</a>.
</p>
</body>
</html>
EOT;
	exit ();
}

#-------------------------------------------------------------------------------
#	Deliver image from cache
#-------------------------------------------------------------------------------


header ("Content-Type: image/jpeg");
header ("Content-Length: {$size}");
header ("Last-Modified: {$modtime}");

readfile ($cachePath);

exit(0);

#-------------------------------------------------------------------------------
#	If webpage instead of image retrieved, try to extract image url.
#-------------------------------------------------------------------------------

function getThumb ($sourceURL, $cachePath, $cacheURL) {

	global $LOG;
	global $NO_CACHE;

	$thumbURL = '';
	$lastProtocol = "http://";


	for ($redirect=0; $redirect<3; $redirect++) {

		$LOG[] = "URL:\t{$sourceURL}";

		#---------------------------------------------------------------
		#	Parse URL into components
		#---------------------------------------------------------------

		# if (!preg_match ('!^(https?://)?(\w+(?:-\w+)*(?:\.\w+(?:-\w+)*)+(?::\d+)?)(/[^#?]*)?(\?[^#]*)?(#.*)?$!s',

		if (!preg_match ('!^((https?:)?//)?(\w+(?:-\w+)*(?:\.\w+(?:-\w+)*)+(?::\d+)?)(/[^#?]*)?(\?[^#]*)?(#.*)?$!s',
			$sourceURL, $match)) {

			@unlink($cachePath);
			@unlink($cacheURL);

			return "Invalid URL";
		}

		global $DEBUG;


		$schema  = $match[2];
		$protocol= $schema ? $match[1] : $lastProtocol;
		$domain  = $match[3];
		$path    = $match[4] ? $match[4] : '/';
		$query   = isset($match[5]) ? $match[5] : '';
		$hash    = isset($match[6]) ? $match[6] : '';

		# Umlaute in OSM-tagvalues machen Probleme wenn locale nicht passt
		# 27.02.2022 zecke
		$path = urlencode (urldecode ($path));
		$path = str_replace("%2F", "/", $path);

		#---------------------------------------------------------------
		#	keep protocol for "//...." URLs
		#---------------------------------------------------------------

		if ($schema) $lastProtocol = $protocol;

		#---------------------------------------------------------------
		#	rebuild URL from components
		#---------------------------------------------------------------

		$sourceURL = "{$protocol}{$domain}{$path}" . ($query!=''?"?{$query}":"") . ($hash!=''?"#{$hash}":"");

		#---------------------------------------------------------------
		#
		#---------------------------------------------------------------

		if ($DEBUG >= 3) {

			$LOG[] = "schema: '{$schema}'";
			$LOG[] = "proto:  '{$protocol}'";
			$LOG[] = "domain: '{$domain}'";
			$LOG[] = "path:   '{$path}'";
			$LOG[] = "query:  '{$query}'";
			$LOG[] = "hash:   '{$hash}'";
			$LOG[] = "last:   '{$lastProtocol}'";
			$LOG[] = "URL:    '{$sourceURL}'";
		}

		#---------------------------------------------------------------
		#	Access control
		#---------------------------------------------------------------

		usedTime();

		if (!checkAccess ($protocol, $domain, preg_replace ('#[^/]+$#', '', $path))) {

			@unlink($cachePath);
			@unlink($cacheURL);

			return "Access not allowed by robots.txt.";
		}

		$LOG[] = usedTime()."s\tused for access check.";

		#---------------------------------------------------------------
		#	Fetch content of URL
		#---------------------------------------------------------------

		#$sourceURL = urlencode($sourceURL);

		#$data = file_get_contents ($sourceURL);
		$data = file_get_contents_curl ($sourceURL);


		if ($data === FALSE || !$data) {

			@unlink($cachePath);
			@unlink($cacheURL);

			$LOG[] = usedTime()."s\tused for failed retrieval.";

			return "Couldn't fetch URL '$sourceURL'.";
		}

		$size = strlen($data);

		$LOG[] = usedTime()."s\tused for retrieval of {$size} bytes.";

		#---------------------------------------------------------------
		#	Decode image.
		#---------------------------------------------------------------

		$image = @imagecreatefromstring ($data);

		$LOG[] = usedTime()."s\tused for decoding image.";

		#---------------------------------------------------------------
		#	If image then :-)
		#---------------------------------------------------------------

		if ($image !== FALSE) break;

		#---------------------------------------------------------------
		#	No image, no thumb.
		#---------------------------------------------------------------

		$thumbURL = '';

		#---------------------------------------------------------------
		#	OSM-Wiki and link to /w/images/ ?
		#---------------------------------------------------------------
		#src="/w/images/thumb/6/68/Stundenstein_Heideweg.jpg/800px-Stundenstein_Heideweg.jpg"
		#---------------------------------------------------------------

		if (preg_match ('#http://(wiki\.openstreetmap\.org)/#', $sourceURL, $host) &&
#			preg_match ('#src="(/w/images/thumb/[^<>"]+)"#', $data, $match)) {
			preg_match ('#src="(/w/images/\d+/\d+/[^<>"]+)"#', $data, $match)) {

			$sourceURL = "http://{$host[1]}{$match[1]}";
			$LOG[] = "Rule:\tLink to '/w/images/thumb/*' on wiki.openstreetmap.org page.";
			continue;
		}

		#---------------------------------------------------------------
		#	On commons page: img from //upload.wikimedia.org/* ?
		#---------------------------------------------------------------

		#--------------------------------------------------------------------------------------
		# if (preg_match ('#//commons\.wikimedia\.org/wiki/File:#', $sourceURL) &&
		#--------------------------------------------------------------------------------------
		# geändert am 20.06.2015
		#--------------------------------------------------------------------------------------
		# if (preg_match ('#//commons\.wikimedia\.org/wiki/File(?:|%3A|%3a)#', $sourceURL) &&
		#	preg_match ('#src="(?:https?:)?(//upload.wikimedia.org/[^\\s"<>]*\bthumb/[^\\s"<>]*(?:jpe?g|png))"#i', $data, $match)) {

		# geändert Jan 2016 zecke: obiges verlässt sich darauf, daß Thumbnails JPG sind

		if (preg_match ('#//commons\.wikimedia\.org/wiki/File(?:|%3A|%3a)#', $sourceURL) &&
			# kleinere Vorschaubilder vorhanden --> nimm das kleinste
                        (preg_match ('#Other resolutions: <a href="(https://upload.wikimedia.org/[^"]*)"#i', $data, $match) ||
			# keine anderen Vorschaubilder vorhanden
                         preg_match ('#fullImageLink" id="file"><a href="(https://upload.wikimedia.org/[^"]*)"#i', $data, $match) ) ) {

				$sourceURL = $match[1];
				$LOG[] = "Rule:\tImage from '//upload.wikimedia.org/*.{jpg,jpeg}' on commons page.";
				continue;
		}

/*
                # berechne Bild-URL anhand MD5 hash, 20.02.2022 zecke
                if (preg_match ('#//commons\.wikimedia\.org/wiki/File(:|%3a)(.*(jpg|jpeg))$#i', $sourceURL, $match) ) {

                                $md5hash = md5($match[2]);
                                $md5path = substr($md5hash,0,1) . "/" . substr($md5hash,0,2);
                                $sourceURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/${md5path}/${match[2]}/150px-${match[2]}";
                                $LOG[] = "Rule:\tImage from '//upload.wikimedia.org/*.{jpg,jpeg}' on commons page.";
                                continue;
                }
*/


		#---------------------------------------------------------------
		#	On any page: Link to //upload.wikimedia.org/* ?
		#---------------------------------------------------------------

		if (preg_match ('#href="(//upload.wikimedia.org/[^\\s"<>]+(?:jpe?g|png))"#i', $data, $match)) {

			$sourceURL = "http:{$match[1]}";
			$LOG[] = "Rule:\tLink to '//upload.wikimedia.org/*.{jpg,jpeg}' on any page.";
			continue;
		}

		#---------------------------------------------------------------
		#	Wikipedia page - remove links to .svg.png
		#---------------------------------------------------------------

		if (preg_match ('!//(\w+\.wikipedia\.org)/!', $sourceURL, $match)) {
	
			$data = preg_replace ('#(//upload.wikimedia.org/[^\\s"<>]+\.svg\.png)#i', 'xxx', $data);
		}
		

		#---------------------------------------------------------------
		#	Wikipedia page and anchor: trim page data
		#---------------------------------------------------------------

		if (preg_match ('!//(\w+\.wikipedia\.org)/[^#]*#(.*)!', $sourceURL, $match)) {

			$id1 = $match[2];
			$trimmed = strstr($data, "id=\"{$id1}\"");

			if ($trimmed && preg_match ('!\A(.+?)<h\d\b.*?\bid="([^"]+?)"!s', $trimmed, $match)) {

				$data = $match[1];
				$id2  = $match[2];
				$LOG[] = "Trim:\tfrom id=\"$id1\" to id=\"$id2\".";

			} else if ($trimmed) {

				$data = $trimmed;
				$LOG[] = "Trim:\tfrom id=\"$id1\".";
			}
		}

		#---------------------------------------------------------------
		#	Wikipedia page and link to /wiki/[Namespace}:* ?
		#---------------------------------------------------------------
		#	<a href="/wiki/{Namespace}:{filename}jp[e]g" class="image"
		#---------------------------------------------------------------

		if (preg_match ('#//(\w+\.wikipedia\.org)/#', $sourceURL, $host) &&
			preg_match ('#<a href="(/wiki/\w+:[^<>"]+(?:jpe?g|png))"\s+class="image"[^>]*><img#i',
				$data, $match)) {

			$sourceURL = "http://{$host[1]}{$match[1]}";
			$LOG[] = "Rule:\tLink to '/wiki/{Namespace}:{Name}.jp[e]g' on *.wikipedia.org page.";
			continue;
		}

		#---------------------------------------------------------------
		#	Wikipedia page and link to /w/index.php?title=[Namespace}:* ?
		#---------------------------------------------------------------
		#	<a href="/w/index.php?title={Namespace}:{filename}jp[e]g&..."
		#---------------------------------------------------------------

		if (preg_match ('#//(\w+\.wikipedia\.org)/#', $sourceURL, $host) &&
			preg_match ('#<a href="(/w/index.php\?title=[^<>"&]+(?:jpe?g|png)(?:&[^<>"]*)?)"#i',
				$data, $match)) {

			$sourceURL = "http://{$host[1]}" . htmlspecialchars_decode($match[1]);
			$LOG[] = "Rule:\tLink to '/w/index.php?title={Namespace}:{Name}.jp[e]g' on *.wikipedia.org page.";
			continue;
		}

		#---------------------------------------------------------------
		#	Wikipedia page and srcset ?
		#---------------------------------------------------------------
		#	srcset="//upload.wikimedia.org/wikipedia/de/1/1a/Denkmal_sanitaetsrat_dr_baumann.jpg 
		#---------------------------------------------------------------

		if (preg_match ('#srcset="(//upload.wikimedia.org/[^\\s"<>]+(?:jpe?g|png))\\s#i', $data, $match) ) {

			$sourceURL = "http:{$match[1]}";
			$LOG[] = "Rule:\tLink to '//upload.wikimedia.org/*.jp[e]g' as srcset on any page.";
			continue;
		}

		#---------------------------------------------------------------
		#	Flickr image page?
		#---------------------------------------------------------------
		#	http://www.flickr.com/photos/{USER}/{IDNUMBER}/?
		#---------------------------------------------------------------
		#	<noscript><img src="http://farm{DIGIT*}.staticflickr.com/{NUMBER}/{DECNUM}_{HEXNUM}_{CHAR}.jpg"
		#---------------------------------------------------------------

		#if (preg_match ('#//www\.flickr\.com/photos/[\w@-]+/\d+(?:/.*)?$#', $sourceURL, $host)) {
			#$LOG[] = "Flickr: HostOk\n".$data;
		#}

/*
		if (preg_match ('#//www\.flickr\.com/photos/[\w@-]+/\d+(?:/.*)?$#', $sourceURL, $host) &&
			preg_match ('#(?:<img src|content|href)="((https?://farm\d+\.staticflickr\.com/\d+/\d+_[a-f\d]+_)([a-gi-z])(\.(?:jpe?g|png)))[?"]#',
				$data, $match)) {

			global $FLICKR_THUMB_SIZE;

			$sourceURL= $match[1];
			$thumbURL = "{$match[2]}{$FLICKR_THUMB_SIZE}{$match[4]}";
			$LOG[] = "Rule:\tFlickr image in flickr page.";
			continue;
		}
*/

		if (preg_match ('#//www\.flickr\.com/photos/[\w@-]+/(\d+)/?$#', $sourceURL, $match)) {
			# erstmal die XML-Seite via API laden

			$apikey = file_get_contents ('/var/opt/www/hp/config/flickr_api.key', true);
			$apikey = rtrim ($apikey, "\n");

			$sourceURL = "https://api.flickr.com/services/rest/?api_key="   
				. $apikey 					
				. "&method=flickr.photos.getInfo&photo_id="
				. $match[1];
			
			$photo_id = $match[1];
			$data = file_get_contents_curl ($sourceURL);

			if (preg_match ('#secret="(.*)" server="(\d+)" farm="(\d+)"[^>]*license="(\d+)"[\S\s]*>(free4osm)</tag>#', $data, $match)) {

				$secret    = $match[1];
				$server    = $match[2];
				$farm      = $match[3];
				$license   = $match[4];
				$free4osm  = $match[5];

				if ( $license > 0 || $free4osm == "free4osm" ) {

					$thumbURL = "https://farm{$farm}.staticflickr.com/{$server}/{$photo_id}_{$secret}_t.jpg";
					$sourceURL = "https://farm{$farm}.staticflickr.com/{$server}/{$photo_id}_{$secret}_m.jpg";
					$LOG[] = "Rule:\tFlickr image in flickr page.";
					continue;
				}
			}
		}

		#---------------------------------------------------------------
		#	Mapillary image page?
		#---------------------------------------------------------------
		#	https://images.mapillary.com/{key}/thumb-1024.jpg
		#---------------------------------------------------------------

		if (preg_match ('#//www\.mapillary\.com/map/im/[\w@-]+$#', $sourceURL, $host) &&
			preg_match ('#content=[\'"](https://image\.mapillary\.com\w+/thumb-640.jpg)[\'"]#',
				$data, $match)) {

			$sourceURL = $match[1];
			$LOG[] = "Rule:\tContent header on www.mapillary.com page.";
			continue;
		}

                #---------------------------------------------------------------
                #       Geograph Images
                #---------------------------------------------------------------
                #       http://http://www.geograph.org.uk/photo/{ID}
                #       http://http://channel-islands.geographs.org/photo/{ID}
                #       http://http://geo.hlipp.de/photo/{ID}
                #       http://http://geo-en.hlipp.de/photo/{ID}
                #---------------------------------------------------------------
                #       UK: about="http://s0.geograph.org.uk/photos/nn/nn/(n*)_HEX.jpg"
                #       UK: about="http://s0.geograph.org.uk/geophotos/nn/nn/nn/(n*)_HEX.jpg"
                #       CI: src="http://channel-islands.geographs.org/photos/nn/nn/(n*)_HEX.jpg"
                #       DE: src="http://geo.hlipp.de/photos/nn/nn/(n*)_HEX.jpg"
                #---------------------------------------------------------------

                # Geograph UK
                if (preg_match ('#//www\.geograph\.org\.uk/photo/\d+#', $sourceURL, $host) &&
                    preg_match ('#about="(https?://s0.geograph.org.uk/(geo)?photos/\d\d/\d\d/(\d\d/)?\w+.jpg)"#',  $data, $match))
                {
                        $sourceURL = $match[1];
                        $LOG[] = "Rule:\tImage from '//www.geograph.org.uk/*.jpg'";
                        continue;
                }

                # Geograph Channel Islands
                if (preg_match ('#//channel-islands\.geographs\.org/photo/\d+#', $sourceURL, $host) 
		    &&
                    preg_match ('#src="(https?://channel-islands.geographs.org/photos/\d\d/\d\d/\w+.jpg)"#',  $data, $match))
                {
                        $sourceURL = $match[1];
                        $LOG[] = "Rule:\tImage from '//channel-islands.geographs.org/*.jpg'";
                        continue;
                }

                # Geograph DE
                if (preg_match ('#//geo(-en)?\.hlipp\.de/photo/\d+#', $sourceURL, $host) && 
		    # preg_match ('#src="(https?://geo.hlipp.de/photos/\d\d/\d\d/\w+.jpg)"#',  $data, $match))
		    preg_match ('#src="(//geo.hlipp.de/photos/\d\d/\d\d/\w+.jpg)"#',  $data, $match))
                {
                        $sourceURL = $match[1];
                        # $sourceURL = "http:"+$match[1];
                        $LOG[] = "Rule:\tImage from '//geo(-en).hlipp.de/*.jpg'";
                        continue;
                }


		#---------------------------------------------------------------
		#	If no image then :-(
		#---------------------------------------------------------------

		break;
	}

	#-----------------------------------------------------------------------
	#	No image ?
	#-----------------------------------------------------------------------

	if ($image === FALSE) {

		@unlink($cachePath);
		@unlink($cacheURL);

		return "No image found for URL '$sourceURL' ($size bytes).";
	}

	#-----------------------------------------------------------------------
	#	Scale image
	#-----------------------------------------------------------------------

	global $THUMB_WIDTH;
	global $THUMB_HEIGHT;
	global $THUMB_MINRATIO;
	global $THUMB_MAXRATIO;

	$origWidth = imagesx($image);
	$origHeight= imagesy($image);

	#-----------------------------------------------------------------------
	#	Trim if neccessary
	#-----------------------------------------------------------------------

	$widthTrim = max (0, round (($origWidth - $origHeight*$THUMB_MAXRATIO) / 2));
	$heightTrim= max (0, round (($origHeight- $origWidth /$THUMB_MINRATIO) / 2));

	$trimmedWidth = $origWidth - 2 * $widthTrim;
	$trimmedHeight= $origHeight- 2 * $heightTrim;

	#-----------------------------------------------------------------------
	#	Scale down into given box preserving w/h-ratio. NO scale up.
	#-----------------------------------------------------------------------

	$scale = min (1, $THUMB_WIDTH/$trimmedWidth, $THUMB_HEIGHT/$trimmedHeight);

	$thumbWidth = round ($scale * $trimmedWidth);
	$thumbHeight= round ($scale * $trimmedHeight);

	$thumb = imagecreatetruecolor($thumbWidth, $thumbHeight);

	imagecopyresampled ($thumb, $image,
		0, 0, $widthTrim, $heightTrim,
		$thumbWidth, $thumbHeight, $trimmedWidth, $trimmedHeight);

	$LOG[] = usedTime()."s\tused for scaling image.";

	#-----------------------------------------------------------------------
	#	Store thumbnail URL
	#-----------------------------------------------------------------------

	if ($thumbURL) {

		$tempFile = "{$cacheURL}." . getmypid() . ".tmp";
		$fh = @fopen ($tempFile, "w");
		if ($fh && @fwrite ($fh, $thumbURL) && @fclose($fh)) {
			@chmod ($tempFile, 0444);
			frename ($tempFile, $cacheURL);
			global $thumbHash;
			$LOG[] = "Ok:\tRedirect '{$thumbHash}' created.";
		}
		@unlink ($tempFile);
	} else {
		@unlink ($cacheURL);
	}

	#-----------------------------------------------------------------------
	#	Store thumbnail
	#-----------------------------------------------------------------------

	$tempFile = "{$cachePath}." . getmypid() . ".tmp";
	if (imagejpeg ($thumb, $tempFile)) {
		@chmod ($tempFile, 0444);
		frename ($tempFile, $cachePath);
		global $thumbHash;
		$LOG[] = "Ok:\tThumbnail '{$thumbHash}' created.";
	}
	@unlink ($tempFile);

	$LOG[] = usedTime()."s\tused for storing thumb.";

	return '';
}

#-------------------------------------------------------------------------------
#	Check access by robot.txt
#-------------------------------------------------------------------------------

function checkAccess ($protocol, $domain, $directory) {

	global $ALLOWED_DOMAINS;
	global $CACHE_DIR;
	global $ROBOT_FRESH;
	global $DEBUG, $LOG;

	if ($DEBUG >= 3) $LOG[] = "checkAccess(proto: '{$protocol}', domain: '{$domain}', dir: '{$directory}')";

	foreach ($ALLOWED_DOMAINS as $allowedDomain) {

		$length = strlen ($allowedDomain);

		if (       $domain               ==    $allowedDomain) return TRUE;
		if (substr($domain, -($length+1))=='.'.$allowedDomain) return TRUE;
	}

	for ($path=$directory; $path; $path = preg_replace('#[^/]*/*[^/]*$#', '', $path)) {

		$url	= "{$protocol}{$domain}{$path}robots.txt";
		$hash	= md5($url);
		$cache	= "{$CACHE_DIR}/{$hash}.acc";
		$mtime	= @filemtime($cache);

		#---------------------------------------------------------------
		#	If outdated, read robot file
		#---------------------------------------------------------------

		if ($mtime < $ROBOT_FRESH) {

			#-------------------------------------------------------
			#	Fetch content of robots.txt
			#-------------------------------------------------------

			$lines = @file($url);

			$temp = $cache . '.' . getmypid() . '.tmp';
			$fh = @fopen ($temp, "w");

			if (!$fh) return FALSE;

			fwrite ($fh, "url\t{$url}\n");

			if ($lines!==FALSE) {

				$itsme	= FALSE;
				$result	= array();

				foreach ($lines as $line) {

					#---------------------------------------
					#	Check if applyable
					#---------------------------------------

					if (preg_match ('#^User-Agent:\s*(\S+)\s*$#i', $line, $match)) {

						$itsme = !strcasecmp ($match[1], 'OpenStreetMap');
						continue;
					}

					if (!$itsme) continue;

					#---------------------------------------
					#	Process
					#---------------------------------------

					if (preg_match ('#^(Allow|DisAllow):\s*(/\S*)\s*$#i', $line, $match)) {

						$result[$match[2]] = strtolower($match[1])=='allow' ?
							'allow' : 'deny';
						continue;
					}
				}

				#-------------------------------------------------------
				#	Order by string length
				#-------------------------------------------------------

				uksort ($result, 'orderbylength');

				foreach ($result as $prefix => $command) {

					fwrite ($fh, "{$command}\t{$prefix}\n");
				}
			}

			fclose ($fh);

			frename ($temp, $cache);
		}

		#---------------------------------------------------------------
		#	Check if allowed
		#---------------------------------------------------------------

		$rules = @file($cache);

		if ($rules === FALSE) continue;

		foreach ($rules as $rule) {

			$fields = explode ("\t", trim ($rule));

			if ($fields[0]=='allow' && strpos($directory, $fields[1])===0) return TRUE;
			if ($fields[0]=='deny'  && strpos($directory, $fields[1])===0) return FALSE;
		}
	}

	return FALSE;
}

#-------------------------------------------------------------------------------
#	Helper
#-------------------------------------------------------------------------------

function frename ($temp, $file) {

	if (!@rename ($temp, $file)) {
		@unlink ($file);
		@rename ($temp, $file);
	}
	@unlink ($temp);
}

function orderbylength ($a, $b) {

	$diff = strlen($b) - strlen($a);
	return $diff ? $diff : strcmp ($a, $b);
}

#===============================================================================
#	$Id: thumbcache.php,v 1.16 2013/04/13 19:52:24 wolf Exp wolf $
#===============================================================================
?>
