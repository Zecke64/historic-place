<?php
#-----------------------------------------------------
#	Set $CSVDIR to directory containing CSV files
#-----------------------------------------------------

require_once './csvdir.php';

#-----------------------------------------------------
#	Get name of dataset
#-----------------------------------------------------

if (!preg_match ('#^(\w+([/.-]\w+)*)$#', @$_GET['db'], $match))
	exit ("Parameter 'db=' missing or invalid");

$database= $match[1];
$csvfile = "{$CSVDIR}/{$database}.csv";
$cgxfile = "{$CSVDIR}/{$database}.cgx";

#-----------------------------------------------------
#	Meta data request?
#-----------------------------------------------------

if (isset($_GET['meta']) && $_GET['meta']=='mtime') {
	header ("Content-Type: text/plain; charset=utf-8");
	echo @filemtime($csvfile);
	exit(0);
}

#-----------------------------------------------------
#	Open CSV
#-----------------------------------------------------

$fh = @fopen ($csvfile, 'r');
if (!$fh) exit ("Cannot open '{$csvfile}'");

#-----------------------------------------------------
#	Max number of result lines
#-----------------------------------------------------

$limit = @intval (@$_GET['limit']);
if (!$limit) $limit = 250;

#-----------------------------------------------------
#	Groups
#-----------------------------------------------------

include "{$database}.php";

if (!isset($Groups) && @$_GET['groups']) $Groups = mb_split (",", $_GET['groups']);

#-----------------------------------------------------
#	Lookup single feature
#-----------------------------------------------------

$Id = preg_match ('/^(\w+)$/', @$_GET['id'], $match) ? $match[1]."\t" : FALSE;

#-----------------------------------------------------
#	Get field names from first line
#-----------------------------------------------------

$headline = fgets ($fh, 64000);
$headernames = explode ("\t", trim ($headline));

#-----------------------------------------------------
#	Create name to index mapping
#-----------------------------------------------------

$name2index = array();
for ($i=0; $i<count($headernames); $i++) {
	$name2index[$headernames[$i]]=$i;
}

#-----------------------------------------------------
#	Parse conditions from $_GET
#-----------------------------------------------------

$Cindex = array();
$Ropref = array();
$Cvalue = array();

$unknownnames = array();
$unknownops   = array();

$bboxMinLon = -180;
$bboxMaxLon = +180;
$bboxMinLat =  -90;
$bboxMaxLat =  +90;

if (isset($_GET['bbox'])) {

        list ($minLon, $minLat, $maxLon, $maxLat) = mb_split (',', $_GET['bbox']);

        $bboxMinLon = 1.0 * $minLon;
        $bboxMaxLon = 1.0 * $maxLon;
        $bboxMinLat = 1.0 * $minLat;
        $bboxMaxLat = 1.0 * $maxLat;

	$Cindex[] = $name2index['lon'];
	$Ccondt[] = 'ge';
	$Cvalue[] = $bboxMinLon;

	$Cindex[] = $name2index['lon'];
	$Ccondt[] = 'le';
	$Cvalue[] = $bboxMaxLon;

	$Cindex[] = $name2index['lat'];
	$Ccondt[] = 'ge';
	$Cvalue[] = $bboxMinLat;

	$Cindex[] = $name2index['lat'];
	$Ccondt[] = 'le';
	$Cvalue[] = $bboxMaxLat;
}


foreach ($_GET as $tag => $value) {

	#-----------------------------------------------------
	#	Conditions look like:
	#	[fieldname].[operator]=[value]
	#-----------------------------------------------------

	if (!preg_match ('#^(\w+([:-]\w+)?)[._]([a-z]+)$#', $tag, $match))
		continue;

	#-----------------------------------------------------
	#	Check for valid fieldname
	#-----------------------------------------------------

	$name = $match[1];
	$index= $name2index[$name];
	if (!isset ($index)) {
		$unknownnames[$name]++;
		continue;
	}

	#-----------------------------------------------------
	#	Bbox check
	#-----------------------------------------------------

	switch ($tag) {

        case 'lon.ge':
        case 'lon_ge':
		$bboxMinLon = 1.0 * $value;
		break;

        case 'lon_le':
        case 'lon.le':
        case 'lon_lt':
        case 'lon.lt':
		$bboxMaxLon = 1.0 * $value;
		break;

        case 'lat.ge':
        case 'lat_ge':
		$bboxMinLat = 1.0 * $value;
		break;

        case 'lat_le':
        case 'lat.le':
        case 'lat_lt':
        case 'lat.lt':
		$bboxMaxLat = 1.0 * $value;
		break;
	}

	#-----------------------------------------------------
	#	Check for valid operator
	#-----------------------------------------------------

	switch ($match[3]) {
	default:
		$unknownops[$match[3]]++;
		continue;
	case 'eq':
	case 'ne':
	case 'le':
	case 'lt':
	case 'ge':
	case 'gt':
	case 'seq':
	case 'sne':
	case 'sle':
	case 'slt':
	case 'sge':
	case 'sgt':
	case 'smatch':
	case 'sfind':
	case 'contains':
	case 'peq':
	case 'pge':
	case 'ple':
	case 'isin':
	case 'isinall':
	case 'isnotin':
	case 'leq':
	case 'lne':
	case 'lle':
	case 'llt':
	case 'lge':
	case 'lgt':
		$condt = $match[3];
	}

	$Cindex[] = $index;
	$Ccondt[] = $condt;
	$Cvalue[] = $value;
}

#-----------------------------------------------------
#	Unknown fieldnames?
#-----------------------------------------------------

if ($unknownnames) {
	$names = join (', ', array_keys ($unknownnames));
	exit ("Unknown field: {$names}");
}

#-----------------------------------------------------
#	Unknown operators?
#-----------------------------------------------------

if ($unknownops) {
	$names = join (', ', array_keys ($unknownops));
	exit ("Unknown operator: {$names}");
}

#-----------------------------------------------------
#	Format?
#-----------------------------------------------------

$Formats = array (
	'gpx' => array (
		'ext' => 'gpx',
		'param' => 'gpx',
		'mimetype' => 'application/gpx+xml',
	),
	'gpi' => array (
		'ext' => 'gpi',
		'param' => 'garmin_gpi,unique=0,descr',
		'mimetype' => 'application/octetstream',
	),
);

$Format = NULL;

if (isset($_GET['format']) && preg_match ('/^(\w+)$/', $_GET['format'], $match)) {

	$Format = $Formats[$match[1]];
	if (!$Format) exit ("Unknown parameter: format={$match[1]}");
}

$Image = NULL;

if (isset($_GET['image']) && preg_match ('/^([ft])$/', $_GET['image'], $match)) {

	$Image = $match[1];
}

#-----------------------------------------------------
#	HTTP header
#-----------------------------------------------------

$pipe = NULL;

if ($Format) {

	#---------------------------------------------
	#	temp filename
	#---------------------------------------------

	$tempname = tempnam(NULL, 'unicsv');

	#---------------------------------------------
	#	command line
	#---------------------------------------------

	$cmdline = "LD_LIBRARY_PATH={$BINDIR}/lib {$BINDIR}/gpsbabel -i unicsv -c UTF-8 -f - -o {$Format['param']} -F {$tempname}";

	#---------------------------------------------
	#	pipe open
	#---------------------------------------------

	$pipe = popen ($cmdline, "w");

	#---------------------------------------------
	#	unicsv header
	#---------------------------------------------

	fwrite ($pipe, "name,lon,lat,ele,desc,notes,country,post,city,addr,phone,url\n");

} else {

	#---------------------------------------------
	#	HTTP header
	#---------------------------------------------

	#header ("Content-Type: text/csv; charset=utf-8");
	header ("Content-Type: text/plain; charset=utf-8");
	header ("Last-Modified: ". date ('r', filemtime ($csvfile)));

	#-----------------------------------------------------
	#	CSV header
	#-----------------------------------------------------

	echo $headline;
}

#-----------------------------------------------------
#	Try to open the index (.cgx)
#-----------------------------------------------------

$nChunks = 0;
$nEntries = 0;

$nChunksTried = 0;
$nEntriesTried = 0;

$index = array();

$cgx = @fopen ($cgxfile, 'r');
if ($cgx) {

	while ($line = fgets ($cgx, 64000)) {

		@list ($minLon, $minLat, $maxLon, $maxLat, $entries, $position, $group)
			= mb_split ("\t", trim ($line));

		$nChunks++;
		$nEntries+=$entries;

		if ($Groups && $group && !in_array ($group, $Groups)) {
			$dotpos = strpos($group, ".");
			if (dotpos===FALSE) continue;
			if (!in_array(substr($group, 0, $dotpos), $Groups)) continue;
		}

		if ($bboxMaxLon < $minLon) continue;
		if ($bboxMinLon > $maxLon) continue;
		if ($bboxMaxLat < $minLat) continue;
		if ($bboxMinLat > $maxLat) continue;

		$index[] = $position;
		$index[] = $entries;

		$nChunksTried ++;
		$nEntriesTried += $entries;
	}
	@fclose($cgx);
} else {
	$index[] = 0;
	$index[] = 999999999;
}

#-----------------------------------------------------
#	CSV body
#-----------------------------------------------------

$linecount=0;

while (count($index)>= 2) {

	$seek  = array_shift ($index);
	$count = array_shift ($index);

	if ($seek) fseek ($fh, $seek, 0);

	for ($e=1; $e<=$count; $e++) {

		$line = fgets ($fh, 64000);
		if (!$line) break;

		if ($Id && substr($line, 0, strlen($Id)) != $Id) continue;

		if ($Image) {
			$hasImageOrWikipedia = preg_match ('!\timage=|\twikipedia=[^#\t]+(\t.*)$!', $line);

			if ($hasImageOrWikipedia) {
				if ($Image==='f') continue;
			} else {
				if ($Image==='t') continue;
			}
		}
		$data = mb_split ("\t", trim ($line));
		for ($i=0; $i<count($Cindex); $i++) {
			$a = $data[$Cindex[$i]];
			$b = $Cvalue[$i];
			switch ($Ccondt[$i]) {
			case 'eq':	if (1*$a == 1*$b) continue 2;
					break;
			case 'ne':	if (1*$a != 1*$b) continue 2;
					break;
			case 'le':	if (1*$a <= 1*$b) continue 2;
					break;
			case 'lt':	if (1*$a <  1*$b) continue 2;
					break;
			case 'ge':	if (1*$a >= 1*$b) continue 2;
					break;
			case 'gt':	if (1*$a >  1*$b) continue 2;
					break;
			case 'seq':	if ("{$a}" == "{$b}") continue 2;
					break;
			case 'sne':	if ("{$a}" != "{$b}") continue 2;
					break;
			case 'sle':	if ("{$a}" <= "{$b}") continue 2;
					break;
			case 'slt':	if ("{$a}" <  "{$b}") continue 2;
					break;
			case 'sge':	if ("{$a}" >= "{$b}") continue 2;
					break;
			case 'sgt':	if ("{$a}" >  "{$b}") continue 2;
					break;
			case 'peq':	if (substr($a, 0, strlen($b)) == "{$b}") continue 2;
					break;
			case 'pge':	if (substr($a, 0, strlen($b)) >= "{$b}") continue 2;
					break;
			case 'ple':	if (substr($a, 0, strlen($b)) <= "{$b}") continue 2;
					break;
			case 'smatch':	if (strpos($a, $b)!==FALSE) continue 2;
					break;
			case 'sfind':	if (strpos($b, $a)!==FALSE) continue 2;
					break;
			case 'contains':if (!preg_match ('#^(\w+)$#', $b, $match)) break;
					$pattern = $match[1];
					if (preg_match ("#^(.*[,;])?({$pattern})([,;].*)?$#", $a)) continue 2;
					break;
			case 'isin':	if (!preg_match ('#^(\w+(,\w+)*)$#', $b, $match)) break;
					$pattern = join ('|', mb_split (',', $match[1]));
					if (preg_match ("#^(.*[,;])?({$pattern})([,;].*)?$#", $a)) continue 2;
					break;
			case 'isinall':	if (!preg_match ('#^(\w+(,\w+)*)$#', $b, $match)) break;
					foreach (mb_split (',', $match[1]) as $pattern) {
						if (!preg_match ("#^(.*[,;])?{$pattern}([,;].*)?$#", $a)) break 2;
					}
					continue 2;
			case 'isnotin': if (!preg_match ('#^\w+(,\w+)*$#', $b, $match)) break;
					foreach (mb_split (',', $match[1]) as $pattern) {
						if (preg_match ("#^(.*,)?{$pattern}(,.*)?$#", $a)) break 2;
					}
					continue 2;
			case 'leq':	if (strlen($a) == intval($b)) continue 2;
					break;
			case 'lne':	if (strlen($a) != intval($b)) continue 2;
					break;
			case 'lle':	if (strlen($a) <= intval($b)) continue 2;
					break;
			case 'llt':	if (strlen($a) <  intval($b)) continue 2;
					break;
			case 'lge':	if (strlen($a) >= intval($b)) continue 2;
					break;
			case 'lgt':	if (strlen($a) >  intval($b)) continue 2;
					break;
			}
			continue 2;
		}

		if ($pipe) {

			#---------------------------------------------
			#	colname fields
			#---------------------------------------------

			$values = array();
			for ($i=0; $i<count($headernames); $i++) {
				$values[$headernames[$i]] = $data[$i];
			}

			#---------------------------------------------
			#	colnameless fields
			#---------------------------------------------

			$assigns = array_slice (mb_split("\t",trim($line)),count($headernames));
			foreach ($assigns as $assign) {
				if (preg_match ('/^([^=]+)=(.*)$/', $assign, $match) && !isset($values[$match[1]])) {
					$values[$match[1]] = $match[2];
				}
			}

			#---------------------------------------------
			#	unicsv data line
			#---------------------------------------------

			$desc = array();
			$desc[] = g1($values,'name');
			$desc[] = g2($values,'ref');
			$desc[] = g2($values,'amenity');
			$desc[] = g2($values,'building');
			$desc[] = g2($values,'historic');
			$desc[] = g2($values,'man_made');
			$desc[] = g2($values,'shop');
			$desc = join (';', array_filter($desc, "notempty"));

			$field = array();
			$field[] = quote(g1($values,'id'));
			$field[] = quote(g1($values,'lon'));
			$field[] = quote(g1($values,'lat'));
			$field[] = quote(g1($values,'ele'));
			$field[] = quote(isset($desc) ? $desc : "");
			$field[] = quote(isset($node) ? $note : "");
			$field[] = quote(g1($values,'addr:country'));
			$field[] = quote(g1($values,'addr:post_code'));
			$field[] = quote(g1($values,'addr:city'));
			$field[] = quote(g1($values,'addr:street').g1($values,'addr:housenumber'));
			$field[] = quote(g1($values,'phone'));
			$field[] = quote(g1($values,'website'));

			fwrite ($pipe, join(',', $field) . "\n");

		} else {

			echo $line;
		}
		if (++$linecount > $limit) break; # return one too many
	}
	if ($linecount > $limit) break;
}

#-----------------------------------------------------
#	Close CSV
#-----------------------------------------------------

fclose ($fh);

#-----------------------------------------------------
#	If formatted output
#-----------------------------------------------------

if ($pipe) {

	#---------------------------------------------
	#	CLose pipe
	#---------------------------------------------

	fclose ($pipe);

	#---------------------------------------------
	#	HTTP header
	#---------------------------------------------

	$name = date ('Ymd-His') . (strlen($Image) ? "-{$Image}" : "") . ".{$Format['ext']}";

	header("Content-Type: {$Format['mimetype']}");
	header("Content-Length: " . filesize ($tempname));
	header("Last-Modified: ". date ('r', filemtime ($csvfile)));
	header("Content-Disposition: attachment; filename=\"{$name}\"");

	readfile ($tempname);

	unlink ($tempname);
}

exit ();

function notempty ($v) {
	return strlen($v)>0;
}

function quote ($value) {
	return '"' . str_replace ('"', '""', $value) . '"';
}

function g1 ($values, $name) {
	return isset($values[$name]) ? $values[$name] : '';
}

function g2 ($values, $name) {
	if (!isset($values[$name])) return '';
	return "{$name}={$values[$name]}";
}

?>
