#!/bin/sh
QUIET='-q'
if test -t 2
then
	set -x
	QUIET=''
fi

set -e

cd "/opt/www/data.historic.place/cache/csv/"

for ii in 00 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18;
do
	for ext in dat idx;
	do
		wget ${QUIET} -N http://geo.netzwolf.info/csv/historic-$ii.$ext
	done
done
