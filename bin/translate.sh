#!/bin/bash
#
#	übersetzt die Strings im masterfile anhand der translate table
#
#	15.11.2013 zecke
#

master="$1"
table="$2"
outf="$3"
trenner="###"
start='\$\$'
ende='%%'

[ $# -ne 3 ] && echo "$0 <masterfile> <table file> <output file>" && exit 1

cp "$master" "$outf"

# wir brauchen auch eine deutsche Karte ohne Platzhalter
if [ "$table" = "-strip" ] || [[ "$table" =~ table.de$ ]]; then
	sed -i 's#'$start'##g' "$outf"
	sed -i 's#'$ende'##g' "$outf"
	exit 0
fi

# checken ob translate table vollständig übersetzt ist

[ ! -f "$table" ] && echo -e "Tabelle $table nicht vorhanden!\n" && exit 1

cnt=`egrep -v -c "^.+###.+$" "$table"`
if [ $cnt -gt 0 ]; then
	echo -e "Es gibt fehlende Übersetzungen oder Syntaxfehler:\n"
	egrep -v "^.+###.+$" "$table"
	exit 1
fi

# wir crosschecken jetzt nicht nochmal ob jemand den Key aus der table rausgelöscht hat
# in dem Fall wird halt nicht übersetzt, das fällt schon irgendwann auf

# IFS='#'
# shopt -s extglob
# while read orig dummy dummy transl; do		# "###" is interpreted as 4 fields w/ delims
        # x="${orig//\[/\\[}"			# erlaube eckige Klammern im Pattern
        # x="${x//\]/\\]}"
	# x="${x##*( )}"				# trim trleading whitespace
	# x="${x%%*( )}"				# trim trailing whitespace

	# sed -i 's#'"$start$x$ende"'#'"$transl"'#g' "$outf" 
# done < "$table"


while true; do
	line=$( grep -e "\$\$.*%%" $outf |head -1 )
	#echo $line
	[ -z "$line" ] && break
	key=$( echo $line | sed -e 's/.*\$\$\(.*\)%%.*/\1/' )

	value=$( grep -e "^$key""###" $table |head -1 )
	value=${value#*###}
	value="${value##*( )}"				# trim trleading whitespace
	value="${value%%*( )}"				# trim trailing whitespace

	#echo "Key: $key      Value: $value"

	sed -i 's#'"$start$key$ende"'#'"$value"'#g' "$outf" 
done
