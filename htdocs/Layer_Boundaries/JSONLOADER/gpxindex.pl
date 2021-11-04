#!/usr/bin/perl
#-------------------------------------------------------------------------------
#	$Id: gpxindex.pl,v 1.4 2014/02/06 12:59:29 wolf Exp wolf $
#-------------------------------------------------------------------------------
#
#	Nutzung:
#		./gpxindex.pl *.gpx >index.csv
#	oder
#		perl.exe gpxindex.pl *.gpx >index.csv
#
#-------------------------------------------------------------------------------
#	Siehe:	http://www.netzwolf.info/kartografie/openlayers/trackloader
#-------------------------------------------------------------------------------

use strict;

foreach my $pattern (@ARGV) {
		foreach my $gpx (glob($pattern)) {

	if (!open (GPX, '<', $gpx)) {

		warn "$gpx: $!\n";
		next;
	}

	my $minLon = +1e10;
	my $minLat = +1e10;
	my $maxLon = -1e10;
	my $maxLat = -1e10;

	my $name='';

	while (<GPX>) {

		$name = $1 if !$name && m#<name>([^<]+)</name>#;

		next unless m#<trkpt([^<>]+)#;

		my $args = $1;

		next unless $args =~ m#\blat="(-?\d+\.?\d*)"#;
		my $lat = $1;

		next unless $args =~ m#\blon="(-?\d+\.?\d*)"#;
		my $lon = $1;

		$minLon = $lon if $lon<$minLon;
		$minLat = $lat if $lat<$minLat;
		$maxLon = $lon if $lon>$maxLon;
		$maxLat = $lat if $lat>$maxLat;
	}

	if ($minLon>$maxLon || $minLat>$maxLat) {

		warn "$gpx: keine Koordinaten gefunden.\n";
		next;
	}

	$name =~ s#&lt;#<#g;
	$name =~ s#&gt;#>#g;
	$name =~ s#&quot;#"#g;
	$name =~ s#&apos;#'#g;
	$name =~ s#&amp;#&#g;

	my $base = $gpx;
	$base =~ s#\.gpx$##i;
	$base .= ".htm";

	my $url = -f $base ? $base : '';

	print join("\t", $gpx, $minLon, $minLat, $maxLon, $maxLat, $name, $url), "\n";
}}

#-------------------------------------------------------------------------------
#	$Id: gpxindex.pl,v 1.4 2014/02/06 12:59:29 wolf Exp wolf $
#-------------------------------------------------------------------------------
