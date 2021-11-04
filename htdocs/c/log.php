<?php
$BASEDIR = preg_replace("#/?[^/]+/?$#", '', $_SERVER['DOCUMENT_ROOT']);

$log = "default";
if (@preg_match ('#^(\w+)$#', @$_GET['log'], $m)) $log = $m[1];
unset ($_GET['log']);

$yyyymmdd = date("Ymd");
$timestamp = date("Y-m-d H:i:s");
$filename = "$BASEDIR/var/log/log_{$log}_{$yyyymmdd}.txt";

$result[] = $timestamp;
foreach ($_GET as $tag => $value) {
	$result[] = "{$tag}={$value}";
}
$line = join ("\t", $result);

header ("Content-Type: text/plain");

$fh = @fopen($filename, "a");
fwrite ($fh, "{$line}\n");
fclose($fh);

echo "Ok\n";
?>
