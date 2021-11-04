#!/bin/bash
#
#	erzeugt aus dem masterfile alle Sprachversionen an der richtigen Stelle
#	
#	17.11.2013 zecke
#

#set -x

home="$( cd "$(dirname "$0")" ; cd .. ; pwd -P )"

. "$home/install.conf" && . "$home"/bin/check_install_conf || exit 1

work="$home/src"
sources="index.html config.js histmap.js"

hist="$hp_webroot/$hp_map"
trans="$hist/l"


for lang in $hp_languages; do
	cd "$trans/$lang"
	rm -f favicon.ico
	ln -s ../../favicon.ico favicon.ico
done


export hp_root hp_webroot hp_map hp_languages

if [ "$1" = "all" ]; then
	# make everything unconditionally
	for lang in $hp_languages; do
		for srcfile in $sources; do
			$hp_root/bin/update_distinct_file $work/table/table.$lang $work/$srcfile
		done
	done
else
	make -f "$hp_root"/bin/upd_transl.mak all
fi
