#!/bin/bash
#
#	historic.place build script
#
#	install.sh <path_to_config_file>
#

set -x

raus () {
	echo "$2"
	exit $1
}

dir="$(dirname $0)"
force=$1
[ -z "$force" -o "$force" = "all" ] || raus 2 "illegal parameter $force"

conf="$dir/install.conf"
[ ! -s "$conf" ] && echo "$conf not found" && exit 1

. "$conf" && . "$dir"/bin/check_install_conf || raus 2 "invald configuration"

# the following is just for rsync working properly
[ -d "$hp_webroot/$hp_map" ] && mv "$hp_webroot/$hp_map" "$hp_webroot/historische_objekte"

[ "$hp_install_index" = "1" ] || excl=' --exclude "./index.html" '


# ensure proper permissions
chmod -R g+w $dir/*

# everything should be fine now

rsync -rlv $excl "$hp_root/htdocs/" "$hp_webroot" || raus 2 "copying web to $hp_webroot unsuccessful"
rsync -rlv --ignore-existing "$hp_root/config/" "$hp_config" || raus 2 "copying web to $hp_config unsuccessful"

mv "$hp_webroot/historische_objekte" "$hp_webroot/$hp_map"

# some patches

sed -i 's#HPLACE_DATABASE#'$hp_database'#g' 	"$hp_webroot/c/csvdir.php"
sed -i 's#HPLACE_DYN#'$hp_dyn'#g' 		"$hp_webroot/c/thumbcache.php"
sed -i 's#HPLACE_CONFIG#'$hp_config'#g' 	"$hp_webroot/c/thumbcache.php"
sed -i 's#HPLACE_CONFIG#'$hp_config'#g' 	"$hp_webroot/c/imglicense.php"
sed -i 's#HPLACE_MAP#'$hp_map'#g'	 	"$hp_webroot/index.html"
sed -i 's#HPLACE_MAP#'$hp_map'#g'	 	"$hp_webroot/Layer_Boundaries/index.html"

"$hp_root"/bin/update_translations.sh $force

sed -i 's#HPLACE_MAP#'$hp_map'#g'	 	$hp_webroot/$hp_map/l/*/index.html
