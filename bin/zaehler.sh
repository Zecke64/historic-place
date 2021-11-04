#!/bin/sh

#-------------------------------------------------------------------------
#	Sorge dafuer, dass beim ersten Fehler abgebrochen wird.
#-------------------------------------------------------------------------

set -e

#-------------------------------------------------------------------------
#	Gehe ins wwwroot Verzeichnis
#-------------------------------------------------------------------------

cd /opt/www/gk.historic.place/htdocs

#-------------------------------------------------------------------------
#	Atomarer Update der Statistikdateien
#-------------------------------------------------------------------------

rm -f texte/tempcounts

while read id pattern
do
	# debug
	#echo "$id..." >&2
	# zaehlen
	count=`egrep -c -w "$pattern" "/opt/www/data.historic.place/cache/csv/historic.csv"`

	# Einzeldatei
	echo "$count" >"texte/tempfile" &&
	        cp -f "texte/tempfile" "/opt/www/themes.historic.place/htdocs/themes/texte/$id.txt" &&
		mv -f "texte/tempfile" "texte/$id.txt"

	#Sammeldatei
	echo "$count\t$id" >>"texte/tempcounts"
done <<EOT && mv -f "texte/tempcounts" "texte/counts.txt"
adit			Adit
adit-r			historic=razed:adit|razed:man_made=adit
aircraft		Aircraft
alignment		megalith_type=alignment
anhalt-meilenstein	Anhaltischer Meilenstein
aqueduct		historic=aqueduct
archaeological_city     site_type=city
archaeological_site	historic=archaeological_site
battlefield		historic=battlefield
baum			natural=tree
bell_tower		tower:type=bell_tower|tower:type=campanile|tower:type=klockstapel|man_made=campanile
bismarck		network=Bismarckturm|tower:network=Bismarckturm
board			board_type=history
bomb_crater		historic=bomb_crater
boundary_marker		marker=stone
boundary_stone		historic=boundary_stone
bohrung		        man_made=drill_hole
bridge		        historic=bridge|building=bridge
building		historic=house|historic=building
bunker			military=bunker|building=bunker|historic=bunker|abandoned:military=bunker|disused:military=bunker|abandoned:building=bunker|disused:building=bunker
burg			castle_type=defensive
camp			prison_camp=concentration_camp 
cannon			historic=cannon
cellar			man_made=cellar_entrance
chamber			megalith_type=chamber
cist			megalith_type=cist
city_gate		historic=city_gate
clock		        amenity=clock
cross			summit:cross=yes|man_made=cross
daen-meilenstein	Dänischer Meilenstein
direction	        direction
exhibit			historic=exhibit
fachwerk		building:architecture=umgebinde|building:architecture=timber_frame
farm			historic=farm
findling		natural=stone
fort			historic=fort|castle_type=fortress|castle_type=kremlin
fortification		site_type=fortification
fountain		man_made=water_well|amenity=fountain
gallows			historic=gallows
geological		geological=palaeontological_site
grenze			Historische Landesgrenze Königreich Sachsen Königreich Preußen 1815 \\\\(Wiener Kongress\\\\)
grenze2			network=Belgisch-Preußische Grenzsteine
grenze3			network=Grenzsteine Neutral-Moresnet
grenze4			network=Neu-Belgisch-Luxemburgische Grenzsteine
grosssteingrab		megalith_type=grosssteingrab|megalith_type=dolmen
heritage		historic=heritage|heritage=yes|heritage=2|heritage=3|heritage=4|heritage=5|heritage=6|heritage=7|heritage=8|heritage=9|heritage=10
halde		        man_made=spoil_heap|landfill=spoil_heap|landfill=mining|landfill=mine_waste
hess-meilenstein	Hessischer Meilenstein
industrial		historic=industrial
kiln	        	man_made=kiln|historic=charcoal_kiln|man_made=tar_kiln|historic=lime_kiln|historic=kiln|abandoned:man_made=kiln|disused:man_made=kiln|razed:man_made=kiln
koen-meilenstein	Königlich sächsischer Meilenstein
koen-trio		network=Königlich-Sächsische Triangulation
kreuze			stone_type=conciliation_cross|memorial:type=de:mordwange
kst			network=Königlich-Sächsische Triangulation
kur-meilenstein		Kursächsische Postmeilensäule
lavoir                  historic=lavoir  
lighthouse		man_made=lighthouse
link			website=|memorial:website=|heritage:website|url=|image=|wikipedia|wikimedia_commons
Lok			historic=locomotive
manor			historic=manor|castle_type=manor
memorial		historic=memorial
menhir			megalith_type=menhir
milestone		historic=milestone
military		historic:landuse=military|abandoned:military=|razed:military=
mine			historic=mine|historic=mine_shaft|man_made=mineshaft|man_made=mine|abandoned:man_made=mineshaft|abandoned:man_made=mine|disused:man_made=mine|disused:man_made=mineshaft
mine-r			historic=razed:mine|historic=razed:mine_shaft|historic=razed:mineshaft|razed:man_made=mineshaft|razed:man_made=mine
monastery		historic=monastery|building=monastery|amenity=monastery
monument		historic=monument
nuraghe			megalith_type=nuraghe
observation		tower:type=observation
obelisk	        	man_made=obelisk|memorial=obelisk|memorial:type=obelisk
pa			historic=pa
palast			historic=palace|castle_type=palace
passage_grave		megalith_type=passage_grave
pillory			historic=pillory
pinge			natural=sinkhole
place_of_worship	amenity=place_of_worship
plakette                historic=plaque|memorial:type=plaque|memorial=plaque|memorial=blue_plaque
plate			memorial:type=plate
petroglyph      site_type=petroglyph
preuß-meilenstein	Preußischer Meilenstein
prison			abandoned:amenity=prison
portal			man_made=portal
pow_camp		prison_camp=pow_camp
pump			pump=manual
quarry			historic=quarry|landuse=quarry|abandoned:lunduse=quarry|disused:landuse=quarry
road			historic=road|historic=roman_road|historic=Altstraße|historic=altstraße|historic=mule_path|historic=packhorse_trail
ruins			historic=ruins
rune_stone		historic=rune_stone
schloß			castle_type=stately
ship			historic=ship
shiro			castle_type=shiro
schornstein		man_made=chimney
ski			abandoned:sport=ski_jumping
spring			natural=spring
statue			artwork_type=statue|memorial:type=statue|memorial=statue|monument=statue|historic=statue|landmark=statue|artwork=statue
stolperstein		memorial:type=stolperstein|memorial=stolperstein|memorial:type=Stolperstein
stone			historic=stone
stone_circle		megalith_type=stone_circle
stone_ship			megalith_type=stone_ship
survey_point		man_made=survey_point
technical_monument	historic=technical_monument|description=technical_monument
telegraph		historic=optical_telegraph|razed:historic=optical_telegraph
threshing_floor		historic=threshing_floor
tholos			megalith_type=tholos
tomb			historic=tomb
tower			historic=tower|man_made=tower
townhall		amenity=townhall
tumulus			site_type=tumulus
umgebindehaus		building:architecture=umgebinde
village			abandoned=village|abandoned:place=village
wachturm		tower:type=watchtower
wall			historic=city_wall|historic=citywalls|barrier=city_wall
wappen			historic=coat_of_arms|stone_type=coat_of_arms
water_tower		man_made=water_tower|disused:man_made=water_tower|abandoned:man_made=water_tower
watermill		man_made=watermill|disused:man_made=watermill|abandoned:man_made=watermill
watermill-r		historic=razed:watermill|razed:man_made=watermill
wayside_chapel		historic=wayside_chapel
wayside_cross		historic=wayside_cross
wayside_shrine		historic=wayside_shrine
weltkulturerbe		heritage=1
windmill		man_made=windmill|disused:man_made=windmill|abandoned:man_made=windmill
wrack		        historic=wreck
windmill-r		historic=razed:windmill|razed:man_made=windmill
EOT
