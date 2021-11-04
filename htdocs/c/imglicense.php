<?php
#===============================================================================
#
# 	besorgt für verschiedene Image-Hoster Autor und Lizenz
#
#	(c) Zecke 2015
#
#===============================================================================


$USER_AGENT = 'imglicense.php @ http://www.historic.place';

if (!preg_match("#^(https?://\S+)$#", $_GET['image'], $match)) {

        fail ("Parameter 'image=' missing or unknown protocol");
}
$imageurl = $match[1];


if ( !$imageurl ) {
	fail ( "no image parameter specified" );
}





#---------------------------------------------------------------
#       Wikipedia braucht ein wenig Spezialbehandlung bis hin zum
#	eigentlichen COMMONS Bild
#---------------------------------------------------------------

# Wikipediaseite? Laden.

if (preg_match ('#https?://\w+.wikipedia.org/wiki/[^/]+#i', $imageurl, $match)) {

        $options  = array('http' => array('user_agent' => $USER_AGENT ));
        $context  = stream_context_create($options);
        $data = file_get_contents ( $imageurl, false, $context );


	if (preg_match ('#href="https?://upload.wikimedia.org/wikipedia/commons/\w+/\w+/([^<>"]+(?:jpe?g|png))"#i', $data, $match)) {

		$imageurl = "https://commons.wikimedia.org/wiki/File:" . $match[2];
	}


	if (preg_match ('#href="/wiki/[^<>"/]+:([^<>"]+(?:jpe?g|png))"#i', $data, $match)) {

		$imageurl = "https://commons.wikimedia.org/wiki/File:" . $match[1];
	}
}


#---------------------------------------------------------------
# Deeplink auf commons
#---------------------------------------------------------------

if (preg_match ('#https?://upload.wikimedia.org/wikipedia/commons/(thumb/)?\w+/\w+/([^<>/"]+(?:jpe?g|png))#i', $imageurl, $match)) {

	$imageurl = "https://commons.wikimedia.org/wiki/File:" . $match[2];
}


#---------------------------------------------------------------
# Commons-Link?
#---------------------------------------------------------------

if (preg_match ('#https?://commons\.wikimedia\.org/wiki/File(:|%3A|%3a)(.+\.(?:jpe?g|png))$#i', $imageurl, $match)) {
	get_lic_str_commons ( $match[2] );
	exit (0);
}


#---------------------------------------------------------------
# Mapillary?
#---------------------------------------------------------------

if (preg_match ('#https?://www.mapillary.com/map/im/(\w+)$#i', $imageurl, $match)) {
	get_lic_str_mapillary ( $match[1] );
	exit (0);
}

#---------------------------------------------------------------
# Geograph Link?
#---------------------------------------------------------------

if (preg_match ('#https?://www.geograph.org.uk/photo/(\d+)$#i', $imageurl, $match)) {
	get_lic_str_geograph ( $match[1], 'UK' );
	exit (0);
}

if (preg_match ('#https?://geo(-en)?.hlipp.de/photo/(\d+)$#i', $imageurl, $match)) {
	get_lic_str_geograph ( $match[2], 'DE' );
	exit (0);
}

#---------------------------------------------------------------
# Flickr
#---------------------------------------------------------------

if (preg_match ('#https?://www.flickr.com/photos/([\w@-]+)/(\d+)(?:/.*)?$#i', $imageurl, $match)) {
	get_lic_str_flickr ( $match[2], $match[1] );
	exit (0);
}

#---------------------------------------------------------------
# Cloudfront
#---------------------------------------------------------------

if (preg_match ('#https?://\w+.cloudfront.net/\w+/(.+)$#i', $imageurl, $match)) {
	get_lic_str_cloudfront ( $match[1] );
	exit (0);
}

#---------------------------------------------------------------
# other Link? (hier einfügen)
#---------------------------------------------------------------

# echo "no match";

exit (1);

################################################################################################

function fail ($msg) {
	echo ( $msg );
	exit (1);
}

#---------------------------------------------------------------
# Extrahiere author, license aus Wikimedia Commons
#---------------------------------------------------------------

function get_lic_str_commons ($name) {

	global $USER_AGENT, $imageurl;

	$COMMON_TOOLS = "https://tools.wmflabs.org/magnus-toolserver/commonsapi.php?image=";

	$options  = array('http' => array('user_agent' => $USER_AGENT ));
	$context  = stream_context_create($options);
	$data = file_get_contents ( $COMMON_TOOLS . $name, false, $context );

/*
	# Hack...
	echo '<a href="' . $imageurl . '">see license</a>';
	exit (1);

	if ($data == false) {
		echo "License server offline";
		exit (1);
	}
*/

	# echo htmlentities( $data );

	$xmldata = new DOMDocument();
	$xmldata->loadXML($data);
	$xpathvar = new DOMxpath ($xmldata);

	# Author
	$results = $xpathvar->query('//response/file/author');
	$n = 0;
	$author = "";
	foreach ($results as $result) {
		# echo $result->textContent;
		if ( $n == 0 ) {
			$author = $result->textContent;
		} 
		$n++;
	}
	if ( $n > 1 ) {
		$author .= " et al.";
	}

	# bei migrierten Bildern findet sich oft sowas
	$prefix = "The original uploader was ";
	if (substr($author, 0, strlen($prefix)) == $prefix) {
		$author = substr($author, strlen($prefix));
	}
	$prefix = "Original uploader was ";
	if (substr($author, 0, strlen($prefix)) == $prefix) {
		$author = substr($author, strlen($prefix));
	}

	# vCard style
	if (substr ($author, 0, 19) === '<div class="vcard">' &&
		preg_match ('#<span class="fn"[^>]*>(.*)</span>#', $author, $match)) {
		$author = $match[1];
	}

        # noch ein template: File:Stolperstein_M%C3%B6dling_7454.jpg
        if (substr ($author, 0, 17) === '<div style="clear' &&
                preg_match ('#title="w:de:User:[^>]*>(.*)</a></b>(.*)erstellt#', $author, $match)) {
                $author = $match[1] . $match[2];
        }

	# Links in eigenem Fenster
	$author = preg_replace ('#(.*)(<a href="[^<]+)(">)#', '$1$2" target="_blank">', $author);

	# License
	$results = $xpathvar->query('//response/licenses/license/name');
	$n = 0;
	$license = "";
	foreach ($results as $result) {
		# echo $result->textContent;
		if ( $n == 0 ) {
			$license = $result->textContent;
		} 
		$n++;
	}
	if ( $n > 1 ) {
		$license .= " et al.";
	}

	# Ausgabeformatierung
	ausgabe ($author, "",
		$license, $imageurl, 
		'<img src="/i/commons.png" height="12">', 
		"https://commons.wikimedia.org/",
		"Wikimedia Commons");
}


#---------------------------------------------------------------
# Mapillary, derzeit nur Minimalbehandlung
#---------------------------------------------------------------

function get_lic_str_mapillary ($id) {

	global $imageurl;

	echo 'Author and license via <a href="' . $imageurl . '" target="_blank">Mapillary</a>';

}


#---------------------------------------------------------------
# Flickr
#---------------------------------------------------------------

function get_lic_str_flickr ($id, $authid) {

	# erstmal die XML-Seite via API laden

	$apikey = file_get_contents ('HPLACE_CONFIG/flickr_api.key', true);
	$apikey = rtrim ($apikey, "\n");

	$sourceURL = "https://api.flickr.com/services/rest/?api_key="
		. $apikey . "&method=flickr.photos.getInfo&photo_id=" . $id;
	$data = file_get_contents ($sourceURL);

	if (preg_match ('#license="(\d+)"[\S\s]*username="([^"]+)"[\S\s]*>(free4osm)</tag>[\S\s]*photopage">([^<]+)</url>#', $data, $match)) {

		$license   = $match[1];
		$username  = $match[2];
		$free4osm  = $match[3];
		$photopage = $match[4];
		$userlink  = "https://www.flickr.com/people/" . $username . "/";

		if ( ($license == 0 && ! $free4osm == "free4osm") || $license > 8 ) {
			# should never occur
			exit;
		}

		$lictext = array (
			"Free for OSM",
			"CC-BY-NC-SA 2.0",
			"CC-BY-NC 2.0",
			"CC-BY-NC-ND 2.0",
			"CC-BY 2.0",
			"CC-BY-SA 2.0",
			"CC-BY-ND 2.0",
			"No known restrictions",
			"US government work" 
		);
		$liclink = array (
			"https://wiki.openstreetmap.org/wiki/Historical_Objects/Popup",
			"http://creativecommons.org/licenses/by-nc-sa/2.0/",
			"http://creativecommons.org/licenses/by-nc/2.0/",
			"http://creativecommons.org/licenses/by-nc-nd/2.0/",
			"http://creativecommons.org/licenses/by/2.0/",
			"http://creativecommons.org/licenses/by-sa/2.0/",
			"http://creativecommons.org/licenses/by-nd/2.0/",
			"http://flickr.com/commons/usage/",
			"http://www.usa.gov/copyright.shtml"
		);
			
		ausgabe ($username, $userlink,
			$lictext [$license], $liclink [$license],
			"Flickr", 
			"https://www.flickr.com/",
			""
		);
	}
}

#---------------------------------------------------------------
# Cloudfront
#---------------------------------------------------------------

function get_lic_str_cloudfront ($id, $authid) {
	
	global $imageurl;

	echo 'via <a href="' . $imageurl . '" target="_blank">Cloudfront</a>';
}


#---------------------------------------------------------------
# Extrahiere author, license aus Geograph 
#---------------------------------------------------------------
# TODO: Channel islands - derzeit keine Einträge in historic.csv
#

function get_lic_str_geograph ($id, $nation) {

	global $USER_AGENT, $imageurl;

	$apikey = file_get_contents ('HPLACE_CONFIG/geograph_api.key', true);
	$apikey = rtrim ($apikey, "\n");

	if ( $nation == 'UK' ) {
		$apiurl = 'http://api.geograph.org.uk/api/photo/';
		$geolink = 'http://www.geograph.org.uk/';
	} elseif ( $nation == 'DE' ) {
		$apiurl = 'http://geo.hlipp.de/api/photo/';
		$geolink = 'http://geo.hlipp.de/';
	}

	$options  = array('http' => array('user_agent' => $USER_AGENT ));
	$context  = stream_context_create($options);
	$data = file_get_contents ( $apiurl . $id . '/' . $apikey, false, $context );
	# echo htmlentities( $data );

	preg_match ('#user profile="(http://.+)">(.+)</user>#', $data, $match);
	$userlink = $match[1];
	$author = $match[2];

	# Ausgabeformatierung
	ausgabe ($author, $userlink,
		'CC-BY-SA 2.0', "http://creativecommons.org/licenses/by-sa/2.0/",
		"Geograph " . $nation, $geolink, "Geograph Project"
	);
}


#---------------------------------------------------------------
# Generiere und drucke den Licensestring aus Author, License...
#---------------------------------------------------------------

function ausgabe ($author, $authorlink, $license, $liclink, $via, $vialink, $viatooltip) {

	$authorx = truncateHtml ($author, 25, "...", true, true);
	$licensex = truncateHtml ($license, 15, "...", true, true);

	( strlen($authorlink) ) && $authorx = '<a href="' . $authorlink . '" target="_blank">' . $authorx . '</a>';
	( strlen($authorx) ) && $authorx  = '<nobr>&copy; ' . $authorx . "</nobr>";
	
	if ( strlen($licensex) ) {
		( strlen($liclink) ) && $licensex = '<a href="' . $liclink . '" target="_blank">' . $licensex . '</a>';
		$licensex = '<nobr>Lic: ' . $licensex . '</nobr>';
	}

	if ( strlen($via) ) {
		if ( strlen($vialink) ) {
			( strlen($viatooltip) ) && $viatooltip = 'title="' . $viatooltip . '"';
			$via = '<a href="' . $vialink . '" target="_blank" ' . $viatooltip . '>' . $via . '</a>';
		}
		$via = '<nobr>via ' . $via . '</nobr>';
	}

	echo $authorx . ' ' . $licensex . ' ' . $via;
}


#---------------------------------------------------------------
# truncateHtml can truncate a string up to a number of characters while preserving whole words 
# and HTML tags.
# by Alan Whipple
# http://alanwhipple.com/2011/05/25/php-truncate-string-preserving-html-tags-words/
#---------------------------------------------------------------

function truncateHtml($text, $length = 100, $ending = '...', $exact = false, $considerHtml = true) {
	if ($considerHtml) {
		// if the plain text is shorter than the maximum length, return the whole text
		if (strlen(preg_replace('/<.*?>/', '', $text)) <= $length) {
			return $text;
		}
		// splits all html-tags to scanable lines
		preg_match_all('/(<.+?>)?([^<>]*)/s', $text, $lines, PREG_SET_ORDER);
		$total_length = strlen($ending);
		$open_tags = array();
		$truncate = '';
		foreach ($lines as $line_matchings) {
			// if there is any html-tag in this line, handle it and add it (uncounted) to the output
			if (!empty($line_matchings[1])) {
				// if it's an "empty element" with or without xhtml-conform closing slash
				if (preg_match('/^<(\s*.+?\/\s*|\s*(img|br|input|hr|area|base|basefont|col|frame|isindex|link|meta|param)(\s.+?)?)>$/is', $line_matchings[1])) {
					// do nothing
				// if tag is a closing tag
				} else if (preg_match('/^<\s*\/([^\s]+?)\s*>$/s', $line_matchings[1], $tag_matchings)) {
					// delete tag from $open_tags list
					$pos = array_search($tag_matchings[1], $open_tags);
					if ($pos !== false) {
					unset($open_tags[$pos]);
					}
				// if tag is an opening tag
				} else if (preg_match('/^<\s*([^\s>!]+).*?>$/s', $line_matchings[1], $tag_matchings)) {
					// add tag to the beginning of $open_tags list
					array_unshift($open_tags, strtolower($tag_matchings[1]));
				}
				// add html-tag to $truncate'd text
				$truncate .= $line_matchings[1];
			}
			// calculate the length of the plain text part of the line; handle entities as one character
			$content_length = strlen(preg_replace('/&[0-9a-z]{2,8};|&#[0-9]{1,7};|[0-9a-f]{1,6};/i', ' ', $line_matchings[2]));
			if ($total_length+$content_length> $length) {
				// the number of characters which are left
				$left = $length - $total_length;
				$entities_length = 0;
				// search for html entities
				if (preg_match_all('/&[0-9a-z]{2,8};|&#[0-9]{1,7};|[0-9a-f]{1,6};/i', $line_matchings[2], $entities, PREG_OFFSET_CAPTURE)) {
					// calculate the real length of all entities in the legal range
					foreach ($entities[0] as $entity) {
						if ($entity[1]+1-$entities_length <= $left) {
							$left--;
							$entities_length += strlen($entity[0]);
						} else {
							// no more characters left
							break;
						}
					}
				}
				$truncate .= substr($line_matchings[2], 0, $left+$entities_length);
				// maximum lenght is reached, so get off the loop
				break;
			} else {
				$truncate .= $line_matchings[2];
				$total_length += $content_length;
			}
			// if the maximum length is reached, get off the loop
			if($total_length>= $length) {
				break;
			}
		}
	} else {
		if (strlen($text) <= $length) {
			return $text;
		} else {
			$truncate = substr($text, 0, $length - strlen($ending));
		}
	}
	// if the words shouldn't be cut in the middle...
	if (!$exact) {
		// ...search the last occurance of a space...
		$spacepos = strrpos($truncate, ' ');
		if (isset($spacepos)) {
			// ...and cut the text in this position
			$truncate = substr($truncate, 0, $spacepos);
		}
	}
	// add the defined ending to the text
	$truncate .= $ending;
	if($considerHtml) {
		// close all unclosed html-tags
		foreach ($open_tags as $tag) {
			$truncate .= '</' . $tag . '>';
		}
	}
	return $truncate;
}





?>
