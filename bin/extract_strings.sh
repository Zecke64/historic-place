#!/bin/bash
#
#	extrahier aus <scriptfile> alle Strings, die durch $$ und %% begrenzt sind
#	und mischt sie in die Übersetzungstabelle <tablefile>
#
#	15.11.2013 zecke
#

[ $# -ne 2 ] && echo "$0 <scriptfile> <tablefile>" && exit 0

script="$1"
tab="$2"

start='\$\$'
ende='%%'

tmpf=`mktemp -t "extract.XXXXXX"`
touch "$tab"

sed /$start'/!d;s//&\n/;s/.*\n//;:a;/'$ende'/bb;$!{n;ba};:b;s//\n&/;P;D' < "$script" > $tmpf

#alle strings aus Skript stehen jetzt im tmp file
while read line; do
	grep -q "^$line###" "$tab" || echo "$line###" >> "$tab" 
	#found=`sed -n '/^'"$line"'###/p' < "$tab" | wc -l`
	#[ $found -eq 0 ] && echo "$line###" >> "$tab"
done < $tmpf
rm -f $tmpf
sort -u "$tab" -o "$tab"
