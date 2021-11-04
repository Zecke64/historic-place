#!/usr/bin/perl
#-------------------------------------------------------------------------------
#	$Id: analyze.pl,v 1.2 2013/04/29 13:45:31 wolf Exp wolf $
#-------------------------------------------------------------------------------
#	Erklaerung:	http://www.netzwolf.info/kartografie/routing/reachable
#-------------------------------------------------------------------------------
#	Fragen, Wuensche, Bedenken, Anregungen?
#	<openlayers(%40)netzwolf.info>
#-------------------------------------------------------------------------------

use strict;
use utf8;

binmode STDIN, ':utf8';
binmode STDOUT, ':utf8';

# type, id and attributes of current osm object

my $type;
my $id;
my %attr;

# lon lat of nodeIds

my %lon;
my %lat;

# nodeIds of ways

my @nodeIds;


while (<>) {

	# start of osm object

	if (m#^\s*<(changeset|node|way|relation)\s+id=['"](\d+)['"]#) {

		$type = $1;
		$id   = substr($type,0,1).$2;
		%attr = ();
		@nodeIds= ();
	}

	# lon lat of nodeIds

	if (m#^\s*<node\s+id=['"]([^'"]*)['"]\s+lat=['"]([^'"]*)['"]\s+lon=['"]([^'"]*)['"]#) {

		$lat{"n$1"} = $2;
		$lon{"n$1"} = $3;
		next;
	}

	# nodes of ways

	if (m#^\s*<nd\s+ref=['"]([^'"]*)['"]#) {

		push (@nodeIds, "n$1");
		next;
	}

	# tag value

	if (m#^\s*<tag\s+k=['"]([^'"]*)['"]\s+v=['"]([^'"]*)['"]#) {

		# xml entities are left as an exercise to the students™
		$attr{$1} = $2;
		next;
	}

	# end of way

	next unless m#^\s*</way># && @nodeIds>=2;

	#-------------------------------------------------------------------------------------
	#	preprocess way
	#	- test if usable
	#	- determine speed
	#-------------------------------------------------------------------------------------

	# skip if osm way is not a real world way
	# (may accept bus or train or younameit)

	next unless $attr{'highway'};

	# too dangerous

	next if $attr{'name'} =~ /katze/i;

	# compute available forward and backward speed for way (m/s)

	my $speedForward  = 1;
	my $speedBackward = 1;

	$speedForward=$speedBackward = 2 if $attr{'highway'} =~ /^(?:primary|secondary|tertiary)$/;

	# oneway

	$speedForward = 0 if $attr{'oneway'} eq '-1';
	$speedBackward= 0 if $attr{'oneway'} eq 'yes';

	#-------------------------------------------------------------------------------------
	#	generate graph entries
	#-------------------------------------------------------------------------------------

	# coordinates of graph nodes

	foreach my $nid (@nodeIds) {

		print "node\t$nid\t$lon{$nid}\t$lat{$nid}\n";
	}

	# process segments of ways resulting in graph arcs

	for (my $index=0; $index<@nodeIds-1; $index++) {

		# start and end node of segment

		my $snode = $nodeIds[$index  ];
		my $enode = $nodeIds[$index+1];

		# distance in degrees

		my $dLon = ($lon{$snode}-$lon{$enode}) * cos ($lat{$snode} * 3.1415925 / 180.0);
		my $dLat = ($lat{$snode}-$lat{$enode});

		# distance scaled to meters

		my $distance = sqrt($dLon*$dLon + $dLat*$dLat) / 360.0 * 40000000;

		# forward arc

		if ($speedForward>0) {

			my $time = $distance / $speedForward;
			print "arc\t$snode\t$enode\t$time\t$id\tf\t$index\n";
		}

		# backward arc

		if ($speedBackward>0) {

			my $time = $distance / $speedBackward;
			print "arc\t$enode\t$snode\t$time\t$id\tb\t$index\n";
		}
	}
}

exit 0;

#-------------------------------------------------------------------------------
#	$Id: analyze.pl,v 1.2 2013/04/29 13:45:31 wolf Exp wolf $
#-------------------------------------------------------------------------------
