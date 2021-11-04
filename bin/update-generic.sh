#!/bin/bash
#==================================================================
#
#	Dieses Script wird an einem sicheren Ort abgelegt.
#	Moeglichst nicht im per http sichtbaren Bereich.
#
#	Ausführbar machen mit:
#
#		chmod 755 update-historic.sh
#
#	Starten mit (wenn im Scriptverzeichnis):
#
#		./update-historic.sh
#
#==================================================================

#------------------------------------------------------------------
#	Konfiguration
#	Damit wird Skript auch für andere Projekte nutzbar
#------------------------------------------------------------------


[ $# -eq 0 ] && exit 1

THEME="$1"
[ -n "$2" ] && overview=1


SRCURL="http://geo.netzwolf.info/csv"
DSTDIR="/opt/www/data.historic.place/cache/csv/"
LOG="$DSTDIR/$THEME.log"

{

echo -e "\n------------------------------------------------------------------\n$(date)\n"

#------------------------------------------------------------------
#	-e Brich beim ersten Fehler ab
#------------------------------------------------------------------

# set -e

#------------------------------------------------------------------
#	-x Zeige alle ausgeführten Befehle an (+x zeige nicht an)
#------------------------------------------------------------------

set -x

#------------------------------------------------------------------
#	Wechsle in das Zielverzeichnis
#------------------------------------------------------------------

cd "$DSTDIR"

#------------------------------------------------------------------
#	Hole die aktuelle Version des Zipfiles
#------------------------------------------------------------------

zipstat_old=$(stat -c "%Y-%s" "$THEME.zip")

wget  -N "$SRCURL/$THEME.zip"

if [ ! -s "$THEME.zip" ]; then
	echo "zip file $THEME.zip size zero or failed totally"
	rm -f "$THEME.zip" 
	exit 1
fi

zipstat_new=$(stat -c "%Y-%s" "$THEME.zip")

#------------------------------------------------------------------
#	Wenn ZIP nicht neuer als CSV, fertig
#------------------------------------------------------------------

if test -e "$THEME.csv" -a ! "$THEME.zip" -nt "$THEME.csv" -a \
	-e "$THEME.cgx" -a ! "$THEME.zip" -nt "$THEME.cgx"
then
	echo "nicht neuer"
	exit 0
fi

[ "$zipstat_old" = "$zipstat_new" ] && echo "Zip ist alt" && exit 0

#------------------------------------------------------------------
#	Loesche den alten Index (besser keiner als ein falscher)
#------------------------------------------------------------------

rm -f "$THEME.cgx"

unzip -o "$THEME.zip" "$THEME.csv"
unzip -o "$THEME.zip" "$THEME.cgx"


if [ -n "$overview" ]; then

	rm -f "$THEME.ovw.cgx"
	unzip -uo "$THEME.zip" "$THEME.ovw.csv"
	unzip -uo "$THEME.zip" "$THEME.ovw.cgx"
fi


#------------------------------------------------------------------
#	Fertig.
#------------------------------------------------------------------

} 2>&1 | tee -a $LOG

exit 0
