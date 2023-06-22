//
//	Include file zu histmap.js
//
//----------------------------------------------------------------------
//	 Popup Marker-Layer
//----------------------------------------------------------------------

map.addLayer (mlayer = new OpenLayers.Layer.PopupMarker("CenterwayObjekte", {
	layerGroup: 'linie',
	positionInLayerChanger: 2,
	permaId: 'Hf',
	visibility: true,
	displayInLayerSwitcher: false,
	selectId: OpenLayers.Util.getParameters(window.location+'').select || null,
														closeKeyCode: 27,
														textAllItems: '$$Alle ${count} Einträge%%',
														textFirstItems: '$$Die ersten ${count} von ${all} Einträgen%%',
														
														// Der letzte Wert gilt auch für alle hoeheren Zoomstufen.
														// Achtung: kein(!) "," nach dem letzten Wert!
														
														iconScale: [
															80,	// 0
														80,	// 1
														80,	// 2
														80,	// 3
														80,	// 4
														80,	// 5
														80,	// 6
														80,	// 7
														80,	// 8
														80,	// 9
														80,	//10
														100	//11
														],
														
														createIconFromData: function (data) {
															
															// get icon parameter from config
															var iconParams = iconParamsFromData (data, null, this.map.zoom);
															
															// get scale from zoom via lookup table
															var scale = this.iconScale[Math.min(this.map.zoom, this.iconScale.length-1)] / 100;
															// scale up site relations
															if (data.type=='site' || data.type=='route') 
																scale *= 1.5;
															
															// feature has image?
															var hasImage = hasImageFromData (data);
															
															// determine icon size
															var width  = 30;	// default width
															var height = 30;	// default height
															var baseOrientation = null;
															
															if (iconParams instanceof Array) {
																
																switch (iconParams.length) {
																	case 2:
																		if (iconParams[1]) {
																			width = height = iconParams[1];
																		}
																		break;
																	case 4:
																		baseOrientation = iconParams[3];
																	case 3:
																		if (iconParams[1] && iconParams[2]) {
																			width = iconParams[1];
																			height= iconParams[2];
																		}
																		break;
																}
																
															} else if (iconParams==null) {
																
																width  = 12;
																height = 12;
															}
															
															icon= new OpenLayers.Icon (
																this.createIconUrlFromParams (iconParams, hasImage),
																					   {w: width*scale, h: height*scale});
															
															if (baseOrientation && data.direction) {
																
																var base = baseOrientation=='U' ? 0 : this.parseDirection(baseOrientation);
																var degrees = this.parseDirection(data.direction);
																
																if (!isNaN(degrees) || !isNaN(base)) {
																	
																	degrees = (1440 + degrees - base) % 360;
																	if (baseOrientation=='U') degrees = (degrees + 90) % 180 - 90;
																	
																	var transform = 'rotate(' + degrees + 'deg)';
																	
																	icon.imageDiv.firstChild.style.transform = transform;
																	icon.imageDiv.firstChild.style.webkitTransform = transform;
																}
															}
															
															return icon;
														},
														
														parseDirection: function (direction) {
															
															var value = parseFloat(direction);
															
															if (!isNaN(value)) 
																return value - Math.floor(value/360)*360;
															value = this.compassToDegrees[(direction+'').toUpperCase()];
															if (!isNaN(value)) 
																return value;
															
															return null;
														},
														
														degreeToCompass: [
															'n', 'nne', 'ne', 'ene', 'e', 'ese', 'se', 'sse',
														's', 'ssw', 'sw', 'wsw', 'w', 'wnw', 'nw', 'nnw', 'n'
														],
														
														compassToDegrees: {
															N:      0,
														NORTH:  0,
														NNE:    22.5,
														NE:     45.0,
														ENE:    67.5,
														E:      90.0,
														EAST:   90.0,
														ESE:    112.5,
														SE:     135.0,
														SSE:    157.5,
														S:      180.0,
														SOUTH:  180.0,
														SSW:    202.5,
														SW:     225.0,
														WSW:    247.5,
														W:      270.0,
														WEST:   270.0,
														WNW:    292.5,
														NW:     315.0,
														NNW:    337.5
														},
														
														iconPath: '../../../m/',
														
														createIconUrlFromParams: function (iconParams, widthImage) {
															
															if (!iconParams) 
																return this.iconPath + 'reddot.png';
															
															var pic = iconParams instanceof Array ? iconParams[0] : iconParams;
															
															if (!pic) 
																return this.iconPath + 'reddot.png';
															
															return this.iconPath + (widthImage ? 'image_' : '') + pic + '.png';
														},
														
														//--------------------------------------------------------------
														//
														//      Zeige im Tooltip den Namen an
														//
														//--------------------------------------------------------------
														
														createTooltipFromData: function (data) {
															if (data['name:'+sprache] || data.name || data.old_name 
																|| data['historic:name'] || data['addr:housename'] || data.ref 
																|| data['addr:street'] + data['addr:housenumber'] )
																
																return this.html(data['name:'+sprache] 
																|| data.name || data.old_name || data['historic:name'] || data['addr:housename']
																|| data.ref 
																|| data['addr:street'] + ' ' + (data['addr:housenumber'] || ' ')
																|| '');
														},
														
														//--------------------------------------------------------------
														//
														//	URL-Prefix des Thumbnail-Generators	*** ANPASSEN! ***
														//
														//--------------------------------------------------------------
														
														thumbBaseURL: '../../../c/thumbcache.php?image=',
														licenseBaseURL: '../../../c/imglicense.php?image=',
														
														//--------------------------------------------------------------
														//	Diese Felder NICHT anzeigen:
														//--------------------------------------------------------------
														
														fieldTypes: {
															'description:de': 'hidden',
														description: 'hidden',
														inscription: 'hidden',
														'~t': 'hidden',
														'~u': 'hidden',
														'~flags': 'hidden',
														'~group': 'hidden',
														'~errors': 'hidden',
														'~members': 'hidden',
														'~ep': 'hidden',
														'~in': 'hidden',
														'heritage:website': 'hidden',
														id: 'hidden',
														lat: 'hidden',
														lon: 'hidden',
														'memorial:text': 'hidden',
														name: 'hidden',
														'~size': 'hidden',
														url: 'hidden' ,
														website: 'hidden',
														'wikipedia:de': 'hidden',
														isLatest: 'hidden',
														wikimedia_commons: 'hidden',
														wikipedia: 'hidden'
														},
														
														//--------------------------------------------------------------
														//
														//	Erzeuge das neue Popup mit Tabs und Reitern
														//
														//--------------------------------------------------------------
														
														createHtmlFromData: function (data) {
															
															//======================================================
															//
															//	Prepare data
															//
															//======================================================
															
															//------------------------------------------------------
															//	prepare Icons
															//------------------------------------------------------
															
															var icons	= [];
															
															var heritage	= isHeritage(data);
															var iconParams	= iconParamsFromData (data, heritage, this.map.zoom);
															
															if (iconParams) icons.push ('<img src="' +
																this.html(this.createIconUrlFromParams (iconParams)) +
															'" style="float: left" />'
															);
															
															if (heritage) icons.push ('<img src="' +
																this.html(this.createIconUrlFromParams (heritage)) +
															'" style="float: left" />'
															);
															
															if (data.direction) {
																
																degrees = this.parseDirection (data.direction);
																
																if (!isNaN(degrees)) {
																	
																	dir = this.degreeToCompass[Math.floor(degrees/22.5+0.5)];
																	icons.push ('<img src="' +
																	this.html('../../../m/direction_' + dir + '.png') +
																	'" style="float: left" />');
																}
															}
															
															//------------------------------------------------------
															//	get Osm Browse URL
															//------------------------------------------------------
															
															var osmURL = 'https://www.openstreetmap.org/browse/' +
{n:'node',w:'way',r:'relation'}[data.id.substr(0,1)] + '/' +
data.id.substr(1);

//------------------------------------------------------
//	get coordinates
//------------------------------------------------------

var coors = (data.lat >= 0 ? 'N' : 'S') + Math.abs(data.lat) + '°, ' +
(data.lon >= 0 ? 'E' : 'W') + Math.abs(data.lon) + '°';

//------------------------------------------------------
//	edit links
//------------------------------------------------------

var josmURL = 'http://127.0.0.1:8111/load_object?objects='+data.id+'&select='+data.id;
var josmHTML = '<a target="josmremote" href="'+this.html(josmURL)+'">JOSM</a>';
var idURL = 'https://www.openstreetmap.org/edit?editor=id&lat=' +
data.lat + '&lon=' + data.lon + '&zoom=17';
var idHTML = '<a target="_blank" href="'+this.html(idURL)+'">iD</a>';
var potlatchURL = 'https://www.openstreetmap.org/edit?editor=potlatch2&lat='
+ data.lat + '&lon=' + data.lon + '&zoom=17';
var potlatchHTML = '<a target="_blank" href="'+this.html(potlatchURL)+'">Potlatch2</a>';

//------------------------------------------------------
//	Berlin Denkmal durch bbox definiert
//------------------------------------------------------

var inBerlin = data.lon>= 13.08820 && data.lon<= 13.76061 &&
data.lat >= 52.34182 && data.lat <= 52.66972;

//------------------------------------------------------
//	Bremen Denkmal durch bbox definiert
//------------------------------------------------------

var inBremen = data.lon>= 8.48135 && data.lon<= 8.98304 &&
data.lat >= 53.01037 && data.lat <= 53.60616;

//------------------------------------------------------
//	Sachsen Denkmal durch bbox definiert
//------------------------------------------------------

var inSachsen = data.lon>= 11.69047 && data.lon<= 15.17313 &&
data.lat >= 50.07279 && data.lat <= 51.70129;

//------------------------------------------------------
//	Wallonien INV
//------------------------------------------------------

var INV = (data['ref:clt']||'').match(/^[0-9\-]+INV[0-9\-]+$/);

//------------------------------------------------------
//	Wallonien CLT
//------------------------------------------------------

var CLT = (data['ref:clt']||'').match(/^[0-9\-]+CLT[0-9\-]+$/);

//------------------------------------------------------
//	Brandenburg BLDAM
//------------------------------------------------------
var BLDAMSource = ('https://ns.gis-bldam-brandenburg.de/hida4web/view?docId=obj'+(data['ref:bldam']||'').toLowerCase())+'.xml';
var BLDAM = BLDAMSource.replace (/,[0-9][0-9][0-9]/g, '');

//------------------------------------------------------
//	Website
//------------------------------------------------------

var websiteURL = (data.website) ||
this.parseURL(data['website:'+sprache]) ||
this.parseURL(data['memorial:website']) ||
this.parseURL(data.url);

//------------------------------------------------------
//	Heritage Website
//------------------------------------------------------

var heritagewebsiteURL = (data['heritage:website']);

//------------------------------------------------------
//	Wikipedia
//------------------------------------------------------

var wikipediaURL = this.getWikipediaURL(data);

//------------------------------------------------------
//	Geopedia
//------------------------------------------------------

var geopediaURL = 'https://www.geopedia.de/?m=0&lat=' +
data.lat + '&lon='+ data.lon + '&l='+sprache +'&z=16';

//------------------------------------------------------
//	Wikishootme
//------------------------------------------------------

var wikishootmeURL = 'https://tools.wmflabs.org/wikishootme/#lat=' +
data.lat + '&lng='+ data.lon + '&zoom=16&layers=commons,flickr,mixnmatch,wikidata_image,wikidata_no_image,wikipedia';

//------------------------------------------------------
//	Wikidata
//------------------------------------------------------

var wikidata = (data.wikidata+'').match(/^(Q\d+)$/);
var wdimage;
var mapillaryimage;
//------------------------------------------------------
//	wikimedia_commons
//------------------------------------------------------

var wikimedia_commonsURL = (data.wikimedia_commons);

//------------------------------------------------------
//	subject:wikipedia / subject:wikidata
//------------------------------------------------------

var subject_wikipediaURL = this.getsubject_WikipediaURL(data);
var subject_wikidataURL = (data['subject:wikidata']+'').match(/^(Q\d+)$/);

//------------------------------------------------------
//	Image
//------------------------------------------------------

if ( data.image == null  && wikidata) {
	wdimage = this.html('https://tools.wmflabs.org/hub/'+wikidata[1]) 
	+ '?format=json&p=P18&fallback=https://gk.historic.place/i/beteilige-'+ sprache +'.jpg';
}

if ( data.image == null  && wikidata == null && data.mapillary) {
	mapillaryimage = this.html('https://images.mapillary.com/'+ data.mapillary + '/thumb-1024.jpg');
}
var imageSourceURL = this.parseURL(data.image) 
|| this.parseURL(data.wikimedia_commons) 
|| wdimage
|| mapillaryimage;
var thumbURL = mapillaryimage && (this.thumbBaseURL + encodeURIComponent(imageSourceURL))|| imageSourceURL 
&& (this.thumbBaseURL + encodeURIComponent(imageSourceURL));
var licenseURL = imageSourceURL 
&& (this.licenseBaseURL + encodeURIComponent(imageSourceURL));
var kontaktURL = '../../../c/kontakt-formular.php';
var kontaktURL2 = '../../../c/kontakt-formular2.php';

//------------------------------------------------------
//	XXX temporär zur Diskussion mit NSDOK in Köln
//------------------------------------------------------

if (data.id=='n655332809') {
	imageSourceURL = 'https://www.museenkoeln.de/ns-dok/default.asp?s=763&tid=323&id=1591&abb=abb_1591_13321';
thumbURL = 'https://www.museenkoeln.de/ns-dok/db_stolpersteine/Abbildungen/lo/abb_1591_13321.jpg';
}


//------------------------------------------------------
//	image onload
//------------------------------------------------------

var imgOnload =
"root=this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;" +
"main = root.parentElement.parentElement.parentElement; " +
"if (main) main.control.updateSize();";

//------------------------------------------------------
//	click on tab
//------------------------------------------------------

OpenLayers.Layer.PopupMarker.clickTab = function (button) {
	
	if (button.className=='active') return;
	
	var container = button.parentElement;
	var card = container;
	
	for (var node=container.firstChild; node; node=node.nextSibling) {
		
		if (node.nodeType != 1 || node.tagName != 'BUTTON') { continue; }
		
		card = card.nextSibling;
		
		card.style.display = node==button ? 'block' : 'none';
node.className = node==button ? 'active' : '';
	}
};

//======================================================
//
//	Create Popup
//
//======================================================

var result = [];

//------------------------------------------------------
//	Tabs
//------------------------------------------------------

result.push ('<div><div class="tabs">');

result.push ('<button onclick="OpenLayers.Layer.PopupMarker.clickTab(this)" class="active">$$Übersicht%%</button>');
result.push ('<button onclick="OpenLayers.Layer.PopupMarker.clickTab(this)">$$Details%%</button>');

//------------------------------------------------------
//	Cooked
//------------------------------------------------------

result.push ('</div><div class="cooked">');

//------------------------------------------------------
//	Table: start
//------------------------------------------------------

result.push ('<table><tbody>');

//------------------------------------------------------
//	Table: 1. Row (both columns)
//------------------------------------------------------

result.push ('<tr><td colspan="2" class="field1">');

//------------------------------------------------------
//	Name
//------------------------------------------------------
var addresstreet = data['addr:street'];
var addresshousenumber = data['addr:housenumber'] || '';
var name = data['name:'+sprache] || data.name || data.old_name 
||data['historic:name'] || data['addr:housename']
|| data.ref;
if (name || addresstreet) {
	result.push (this.html(name || data['addr:street'] + ' ' + addresshousenumber) + '<br style="clear: left"/>');
}

//------------------------------------------------------
//	Icon
//------------------------------------------------------

result.push ('<tr><td colspan="2" class="field1">');
for (i in icons) {
	
	result.push (icons[i]);
}

if ( data.cemetery == 'war_cemetery'){
	result.push ('<a target="_blank"  href="' +
	this.html('https://thebook.toolforge.org/page.cgi?p='+ sprache +'wiki&goto=$$Kriegsgräberstätte%%') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
}

if ( sprache == 'de' && data.defensive == "bergfried"){
	result.push ('<a target="_blank"  href="' +
	this.html('https://www.mittelalter-lexikon.de/wiki/Bergfried') + '"><img src="../../../i/ml.png" border="0" title="Mittelalter-Lexikon"></a>');
	result.push ('<a target="_blank"  href="' +
	this.html('https://tools.wmflabs.org/reasonator/?q=Q2302643&lang=de') + '"><img src="../../../i/Reasonator.png" border="0" title="Wikidata"></a>');
	result.push ('<a target="_blank"  href="' +
	this.html('https://thebook.toolforge.org/page.cgi?p=dewiki&goto=Bergfried') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
}

if ( sprache == 'de' && data.historic == 'mine' && data.natural=='sinkhole'){
	result.push ('<a target="_blank"  href="' +
	this.html('https://www.mittelalter-lexikon.de/wiki/Pinge') + '"><img src="../../../i/ml.png" border="0" title="Mittelalter-Lexikon"></a>');
	result.push ('<a target="_blank"  href="' +
	this.html('https://thebook.toolforge.org/page.cgi?p=dewiki&goto=Pinge') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
}

if ( sprache == 'de' && (data.man_made == 'mineshaft' ||  data.historic=='mineshaft' || data['disused:man_made'] == 'mineshaft' || data['abandoned:man_made'] == 'mineshaft' || data['razed:man_made'] == 'mineshaft')){
	result.push ('<a target="_blank"  href="' +
	this.html('https://www.mittelalter-lexikon.de/wiki/Bergbau') + '"><img src="../../../i/ml.png" border="0" title="Mittelalter-Lexikon"></a>');
}

if ( data.man_made == 'mineshaft' ||  data.historic=='mineshaft' || data['disused:man_made'] == 'mineshaft' || data['abandoned:man_made'] == 'mineshaft' || data['razed:man_made'] == 'mineshaft'){
	result.push ('<a target="_blank"  href="' +
	this.html('https://thebook.toolforge.org/page.cgi?p='+ sprache +'wiki&goto=$$Bergwerk%%') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
}

if ( sprache == 'de' && data.man_made == 'water_well' || data.amenity == 'fountain'){
	result.push ('<a target="_blank"  href="' +
	this.html('https://www.mittelalter-lexikon.de/wiki/Brunnen') + '"><img src="../../../i/ml.png" border="0" title="Mittelalter-Lexikon"></a>');
}

if ( data.man_made == 'water_well' || data.amenity == 'fountain'){
	result.push ('<a target="_blank"  href="' +
	this.html('https://thebook.toolforge.org/page.cgi?p='+ sprache +'wiki&goto=$$Brunnen%%') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
}

if ( sprache == 'de' && data.castle_type == 'defensive'){
	result.push ('<a target="_blank"  href="' +
	this.html('https://www.mittelalter-lexikon.de/wiki/Burg') + '"><img src="../../../i/ml.png" border="0" title="Mittelalter-Lexikon"></a>');
	result.push ('<a target="_blank"  href="' +
	this.html('https://thebook.toolforge.org/page.cgi?p=dewiki&goto=Burg') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
}

if ( sprache == 'de' && data.stone_type == 'conciliation_cross'){
	result.push ('<a target="_blank"  href="' +
	this.html('https://www.mittelalter-lexikon.de/wiki/Sühnekreuz') + '"><img src="../../../i/ml.png" border="0" title="Mittelalter-Lexikon"></a>');
	result.push ('<a target="_blank"  href="' +
	this.html('https://thebook.toolforge.org/page.cgi?p=dewiki&goto=Sühnekreuz') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
}

if ( sprache == 'de' && data['building:architecture'] == 'timber_frame'){
	result.push ('<a target="_blank"  href="' +
	this.html('https://www.mittelalter-lexikon.de/wiki/Fachwerk') + '"><img src="../../../i/ml.png" border="0" title="Mittelalter-Lexikon"></a>');
}

if ( data['building:architecture'] == 'timber_frame'){
	result.push ('<a target="_blank"  href="' +
	this.html('https://thebook.toolforge.org/page.cgi?p='+ sprache +'wiki&goto=$$Fachwerkhaus%%') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
}

if ( sprache == 'de' && data['abandoned:amenity'] == 'prison'){
	result.push ('<a target="_blank"  href="' +
	this.html('https://www.mittelalter-lexikon.de/wiki/Gefängnis') + '"><img src="../../../i/ml.png" border="0" title="Mittelalter-Lexikon"></a>');
	result.push ('<a target="_blank"  href="' +
	this.html('https://thebook.toolforge.org/page.cgi?p=dewiki&goto=Gefängnis') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
}

if ( sprache == 'de' && (data['historic'] == 'wayside_chapel' || data['building'] == 'chapel'|| data['historic'] == 'chapel')){
	result.push ('<a target="_blank"  href="' +
	this.html('https://www.mittelalter-lexikon.de/wiki/Kapelle_(Arch.)') + '"><img src="../../../i/ml.png" border="0" title="Mittelalter-Lexikon"></a>');
}

if ( data['historic'] == 'wayside_chapel' || data['building'] == 'chapel'|| data['historic'] == 'chapel'){
	result.push ('<a target="_blank"  href="' +
	this.html('https://thebook.toolforge.org/page.cgi?p='+ sprache +'wiki&goto=$$Kapelle%%') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
}

if ( sprache == 'de' && (data['historic'] == 'monastery' || data['building'] == 'monastery'|| data['amenity'] == 'monastery')){
	result.push ('<a target="_blank"  href="' +
	this.html('https://www.mittelalter-lexikon.de/wiki/Kloster') + '"><img src="../../../i/ml.png" border="0" title="Mittelalter-Lexikon"></a>');
}

if ( data['historic'] == 'monastery' || data['building'] == 'monastery'|| data['amenity'] == 'monastery'){
	result.push ('<a target="_blank"  href="' +
	this.html('https://thebook.toolforge.org/page.cgi?p='+ sprache +'wiki&goto=$$Kloster%%') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
}

if ( sprache == 'de' && (data['man_made'] == 'watermill' || data['abandoned:man_made'] == 'watermill' || data['razed:man_made'] == 'watermill' || data['disused:man_made'] == 'watermill')){
	result.push ('<a target="_blank"  href="' +
	this.html('https://www.mittelalter-lexikon.de/wiki/Mühlen') + '"><img src="../../../i/ml.png" border="0" title="Mittelalter-Lexikon"></a>');
}

if ( data['man_made'] == 'watermill' || data['abandoned:man_made'] == 'watermill' || data['razed:man_made'] == 'watermill' || data['disused:man_made'] == 'watermill'){
	result.push ('<a target="_blank"  href="' +
	this.html('https://thebook.toolforge.org/page.cgi?p='+ sprache +'wiki&goto=$$Wassermühle%%') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
}

if ( sprache == 'de' && (data['man_made'] == 'windmill' || data['abandoned:man_made'] == 'windmill' || data['razed:man_made'] == 'windmill' || data['disused:man_made'] == 'windmill')){
	result.push ('<a target="_blank"  href="' +
	this.html('https://www.mittelalter-lexikon.de/wiki/Mühlen') + '"><img src="../../../i/ml.png" border="0" title="Mittelalter-Lexikon"></a>');
}

if ( data['man_made'] == 'windmill' || data['abandoned:man_made'] == 'windmill' || data['razed:man_made'] == 'windmill' || data['disused:man_made'] == 'windmill'){
	result.push ('<a target="_blank"  href="' +
	this.html('https://thebook.toolforge.org/page.cgi?p='+ sprache +'wiki&goto=$$Windmühle%%') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
}

if ( sprache == 'de' && data['man_made'] == 'lighthouse'){
	result.push ('<a target="_blank"  href="' +
	this.html('https://www.mittelalter-lexikon.de/wiki/Leuchttürme') + '"><img src="../../../i/ml.png" border="0" title="Mittelalter-Lexikon"></a>');
}

if ( data['man_made'] == 'lighthouse'){
	result.push ('<a target="_blank"  href="' +
	this.html('https://thebook.toolforge.org/page.cgi?p='+ sprache +'wiki&goto=$$Leuchtturm%%') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
}

if ( sprache == 'de' && data['amenity'] == 'townhall'){
	result.push ('<a target="_blank"  href="' +
	this.html('https://www.mittelalter-lexikon.de/wiki/Rathaus') + '"><img src="../../../i/ml.png" border="0" title="Mittelalter-Lexikon"></a>');
}

if ( data['amenity'] == 'townhall'){
	result.push ('<a target="_blank"  href="' +
	this.html('https://thebook.toolforge.org/page.cgi?p='+ sprache +'wiki&goto=$$Rathaus%%') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
}

if ( sprache == 'de' && data['historic'] == 'manor' || data['castle_type'] == 'manor'){
	result.push ('<a target="_blank"  href="' +
	this.html('https://www.mittelalter-lexikon.de/wiki/Rittergut') + '"><img src="../../../i/ml.png" border="0" title="Mittelalter-Lexikon"></a>');
	result.push ('<a target="_blank"  href="' +
	this.html('https://thebook.toolforge.org/page.cgi?p=dewiki&goto=Rittergut') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
}

if ( sprache == 'de' && data['abandoned:place']  || data['abandoned'] == 'village'){
	result.push ('<a target="_blank"  href="' +
	this.html('https://www.mittelalter-lexikon.de/wiki/Wüstungen') + '"><img src="../../../i/ml.png" border="0" title="Mittelalter-Lexikon"></a>');
}

if ( data['abandoned:place']  || data['abandoned'] == 'village'){
	result.push ('<a target="_blank"  href="' +
	this.html('https://thebook.toolforge.org/page.cgi?p='+ sprache +'wiki&goto=$$Wüstung%%') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
}


if ( data.stone_type == "coat_of_arms"){
	result.push ('<a target="_blank"  href="' +
	this.html('https://thebook.toolforge.org/page.cgi?p='+ sprache +'wiki&goto=$$Wappen%%') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
}


if ( data.site_type == "tumulus"){
	result.push ('<a target="_blank"  href="' +
	this.html('https://thebook.toolforge.org/page.cgi?p='+ sprache +'wiki&goto=$$Hügelgrab (Tumulus)%%') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
}

if ( data.historic == "archaeological_site" && data.site_type != "tumulus"){
	result.push ('<a target="_blank"  href="' +
	this.html('https://thebook.toolforge.org/page.cgi?p='+ sprache +'wiki&goto=$$Archäologische Stätte%%') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
}

if ( wikimedia_commonsURL == null && wikidata){
	result.push ('<a target="_blank"  href="' + 
	this.html('https://tools.wmflabs.org/hub/'+wikidata[1]) + '?s=c'+'"><img src="../../../i/Commons-logo.png" border="0" height="12" width="12" title="Wikimedia Commons"></a>');
	
}

if ( wikipediaURL == null && wikidata){
	result.push ('<a target="_blank"  href="' + 
	this.html('https://tools.wmflabs.org/hub/'+wikidata[1]) + '?site=wp'+'"><img src="../../../i/Wikipedia-icon.png" border="0" height="12" width="12" title="Wikipedia"></a>');
	
}

if ( data.image == null && wikidata){
	result.push ('<a target="_blank"  href="' + 
	this.html('https://tools.wmflabs.org/hub/'+wikidata[1]) + '?p=P18'+'"><img src="../../../i/Image_link.png" border="0" height="12" width="12" title="Image from Wikidata"></a>');
	
}

if ( sprache == 'de' )
	result.push ('<a target="_blank"  href="' +
	this.html(kontaktURL) + '"><img src="../../../i/urheberrecht.png" border="0" title="Urheberrechtsverletzung melden"></a>');

else
	result.push ('<a target="_blank"  href="' +
	this.html(kontaktURL2) + '"><img src="../../../i/urheberrecht.png" border="0" title="Report copyright violation"></a>');

//------------------------------------------------------
//	Table: 2. Row, 1. Column
//------------------------------------------------------

result.push ('</td></tr><tr><td class="field2" colspan="1" rowspan="1" style="vertical-align: middle; text-align: center">');

//------------------------------------------------------
//	Content
//------------------------------------------------------

// info
result.push ('<div class="info">' +
this.html(this.createInfoFromData(data)) + '</div>');

//------------------------------------------------------
//	Table: 5. Row, 2. Column
//------------------------------------------------------

result.push ('</td><td rowspan="3" class="thumb" style="vertical-align: middle; text-align: center">');

//------------------------------------------------------
//	Image
//------------------------------------------------------

if (thumbURL) {
	
	result.push ('<a target="_blank" href="' + this.html(imageSourceURL) + '"><img src="' +
	this.html(thumbURL) + '" onload="' + imgOnload + '" alt="loading..."></a>');
	
} else {
	result.push ('<a target="_blank"  href="https://wiki.openstreetmap.org/wiki/Historical_Objects/Popup#Bildvorschau"><img src="../../../i/beteilige.png" border="0" ></a>');
}

if (licenseURL) {
	
	var captid;
	captid = 'CAPT' + Math.floor(Math.random()*10000);
	jQuery.ajax({
		url: licenseURL,
		success: function(html) {
			document.getElementById(captid).innerHTML = html;
		},
		async:true
	});
	result.push ( '<div id="' + captid + '" class="imgcaption"></div>');
}

//------------------------------------------------------
//	Table: 3. Row
//------------------------------------------------------

result.push ('</td></tr><tr><td colspan="1" rowspan="1" class="field3" style="vertical-align: middle; text-align: center">');

//------------------------------------------------------
//	Content
//------------------------------------------------------

result.push ('<div class="lonlat">' + this.html("$$Koordinaten%%: " + coors) + '</div>');

//------------------------------------------------------
//	Table: 4. Row
//------------------------------------------------------

result.push ('</td></tr><tr><td colspan="1" rowspan="1" class="field4" style="vertical-align: middle; text-align: center">');

result.push (this.getSizeFromData(data)||'');

//------------------------------------------------------
//	Table: 6. Row (both columns)
//------------------------------------------------------

if (data.inscription || data['memorial:text'] ||data['inscription:'+sprache]) {
	result.push ('</td></tr><tr><td class="field6" colspan="2">')};
	
	if (data.inscription) {
		
		result.push ('<div class="inscription">' + this.html("$$Inschrift%%: " +
		data.inscription) + '</div>');
	}
	
	if (data['memorial:text']) {
		
		result.push ('<div class="inscription">' + this.html("$$Inschrift%%: " +
		data['memorial:text']) + '</div>');
	}
	
	if (data['inscription:'+sprache]) {
		
		result.push ('<div class="inscription">' + this.html("$$Inschrift%%: " +
		data['inscription:'+sprache]) + '</div>');
	}
	
	//------------------------------------------------------
	//	Table: 7. Row (both columns)
	//------------------------------------------------------
	if (data.old_name || data['historic:name']){
		result.push ('</td></tr><tr><td class="field7" rowspan="1" colspan="2">')};
		
		if (data.old_name) {
			
			result.push ('<div class="">' + this.html("$$Historischer Name%%: " +
			data.old_name) + '</div>');
		}
		
		if (data['historic:name'] ) {
			
			result.push ('<div class="">' + this.html("$$Historischer Name%%: " +
			data['historic:name']) + '</div>');
		}
		
		//------------------------------------------------------
		//	Table: 8. Row (both columns)
		//------------------------------------------------------
		
		if (data.start_date || data.end_date|| data['construction:date'] || data.year) {
			result.push ('</td></tr><tr><td class="field8" rowspan="1" colspan="2">')
		};
		var start_date_str = (data.start_date);
		
		if (typeof start_date_str !== 'undefined') {
			var start_date_new = start_date_str.replace("after","$$nach%% ").replace("\.\."," - ").replace("before","$$vor%% ").replace("\~","$$um%% ").replace("C11","11. $$Jahrhundert%%").replace("C12","12. $$Jahrhundert%%").replace("C13","13. $$Jahrhundert%%").replace("C14","14. $$Jahrhundert%%").replace("C15","15. $$Jahrhundert%%").replace("C16","16. $$Jahrhundert%%").replace("C17","17. $$Jahrhundert%%").replace("C18","18. $$Jahrhundert%%").replace("C19","19. $$Jahrhundert%%").replace("C20","20. $$Jahrhundert%%").replace("C21","21. $$Jahrhundert%%").replace("C22","22. $$Jahrhundert%%").replace("BC","$$vor Christus%%").replace("mid","$$Mitte%% ").replace("late","$$gegen Ende%% ").replace("early","$$Anfang%% ");
			
			var start_date_tree =  (data.natural=='tree' && data.start_date);
			var start_date_artwork = (data.tourism=='artwork' && data.start_date);
			if (start_date_tree) {
				
				result.push ('<div class="">' + this.html("$$Pflanzjahr%%: " +
				start_date_new) + '</div>');
			} 
			if (sprache == 'de' && start_date_artwork) {
				
				result.push ('<div class="">' + this.html("Entstanden: " +
				start_date_new) + '</div>');
			} 
			else if (data.start_date !== start_date_tree || start_date_artwork) {
				
				result.push ('<div class="">' + this.html("$$Erbaut%%: " +
				start_date_new) + '</div>');
			}
		}
		
		if (data.year) {
			
			result.push ('<div class="">' + this.html("$$Erbaut%%: " +
			data.year) + '</div>');
		}
		
		if (data['construction:date']) {
			
			result.push ('<div class="">' + this.html("$$Erbaut%%: " +
			data['construction:date']) + '</div>');
		}
		
		if (data.end_date) {
			
			result.push ('<div class="">' + this.html("$$Ende%%: " +
			data.end_date) + '</div>');
		}
		
		//------------------------------------------------------
		//	Table: 9. Row (both columns)
		//------------------------------------------------------
		
		if (data.description || data['description:'+sprache]) {
			result.push ('</td></tr><tr><td class="field9" rowspan="1" colspan="2">')};
			
			if (data['description:'+sprache]) {
				result.push ('<div class="description">' + this.html("$$Beschreibung%%: " +
				data['description:'+sprache]) + '</div>');
			}
			else if (data['description']) {
				result.push ('<div class="description">' + this.html("$$Beschreibung%%: " +
				data['description']) + '</div>');
			}
			if (data['historic:civilization']) {
				result.push ('</td></tr><tr><td class="field9" rowspan="1" colspan="2">')};
				
				if (data['historic:civilization']) {
					result.push ('<div class="description">' + this.html("Civilization: " +
					data['historic:civilization']) + '</div>');
				}
				//------------------------------------------------------
				//	Table: 10. Row (both columns)
				//------------------------------------------------------
				
				if (data['heritage:operator']) {
					
					var ops = data['heritage:operator'].split(';');
					var names = [];
					
					for (opIndex in ops) {
						
						op = OpenLayers.String.trim (ops[opIndex]);
						if (!op) continue;
						
						var name = HeritageOperatorNames[op] || op;
						data['heritage:operator'];
						var ref = data['ref:' + op];
						if (ref) name += ' (' + ref + ')';

names.push(name);
					}
					
					if (names.length) {
						if (data['heritage:operator'] || data['ref:whc']) {
							result.push ('</td></tr><tr><td class="field10" rowspan="1" colspan="2"><div>')};
							result.push (this.html(
								"$$geschützt durch%%: " + names.join(', ')));
							result.push ('</div>');
							if (data['ref:whc']) {
								result.push ('<div class="wikidata">World Heritage List:&nbsp;<a target="_blank" href="' +
								this.html('https://whc.unesco.org/en/list/'+(data['ref:whc'])) + '">' + this.html(this.shrinkUrl(data['ref:whc'])) +
								'</a></div>');
							}
					}
				}
				
				//------------------------------------------------------
				//	Table: 18. Row (both columns)
				//------------------------------------------------------
				if (wikidata || subject_wikidataURL) {
					result.push ('</td></tr><tr><td class="field11" rowspan="1" colspan="2">')};
					
					//------------------------------------------------------
					//	Wikidata Reasonator
					//------------------------------------------------------
					if (wikidata) {
						result.push ('<div class="Reasonator">'+"$$Mehr Infos von%%"+' Reasonator:&nbsp;<a target="_blank" href="' +
						this.html('https://tools.wmflabs.org/reasonator/?q='+wikidata[1]) +'&lang='+ sprache + '">'+ this.html(this.shrinkUrl(wikidata[1])) +
						'<img src="../../../i/Reasonator.png" border="0"title="Reasonator"></a></div>');
						
					}
					
					//------------------------------------------------------
					//	subject:wikidata
					//------------------------------------------------------
					if (subject_wikidataURL) {
						result.push ('<div class="Reasonator">'+"$$Mehr Infos von%%"+' Reasonator:&nbsp;<a target="_blank" href="' +
						this.html('https://tools.wmflabs.org/reasonator/?q='+subject_wikidataURL[1]) +'&lang='+ sprache + '">'+ this.html(this.shrinkUrl(subject_wikidataURL[1])) +
						'<img src="../../../i/Reasonator.png" border="0"title="Reasonator"></a></div>');
						
					}
					
					//------------------------------------------------------
					//	Table: 11. Row (both columns)
					//------------------------------------------------------
					if (websiteURL || heritagewebsiteURL) {
						result.push ('</td></tr><tr><td class="field11" rowspan="1" colspan="2">')};
						
						//------------------------------------------------------
						//	Website
						//------------------------------------------------------
						if (websiteURL) {
							result.push ('<div class="website">$$Webseite%%:&nbsp;<a target="_blank" href="' +
							this.html(websiteURL) + '">' + this.html(this.shrinkUrl(websiteURL)) +
							'</a></div>');
						}
						//------------------------------------------------------
						//	Heritage Website
						//------------------------------------------------------
						if (heritagewebsiteURL) {
							result.push ('<div class="website">Heritage $$Webseite%%:&nbsp;<a target="_blank" href="' +
							this.html(heritagewebsiteURL) + '">' + this.html(this.shrinkUrl(heritagewebsiteURL)) +
							'</a></div>');
						}
						
						//------------------------------------------------------
						//	Table: 12. Row (both columns)
						//------------------------------------------------------
						if (wikipediaURL || wikimedia_commonsURL || subject_wikipediaURL) {
							result.push ('</td></tr><tr><td class="field11" rowspan="1" colspan="2">')};
							
							//------------------------------------------------------
							//	Wikipedia
							//------------------------------------------------------
							
							if (wikipediaURL) {
								result.push ('<div class="wikipedia">Wikipedia:&nbsp;<a target="_blank" href="' +
								this.html(wikipediaURL) + '">' + this.html(this.shrinkUrl(wikipediaURL)) +
								'</a></div>');
							}
							//------------------------------------------------------
							//	subject:wikipedia
							//------------------------------------------------------
							
							if (subject_wikipediaURL) {
								result.push ('<div class="wikipedia">Wikipedia:&nbsp;<a target="_blank" href="' +
								this.html(subject_wikipediaURL) + '">' + this.html(this.shrinkUrl(subject_wikipediaURL)) +
								'</a></div>');
							}
							//------------------------------------------------------
							//	wikimedia_commons
							//------------------------------------------------------
							
							if (wikimedia_commonsURL) {
								result.push ('<div class="wikipedia">Wikimedia Commons:&nbsp;<a target="_blank" href="' +
								this.html('https://commons.wikimedia.org/wiki/'+wikimedia_commonsURL) + '">' + this.html(this.shrinkUrl(wikimedia_commonsURL)) +
								'</a></div>');
							}
							
							//------------------------------------------------------
							//	Table: 13. Row (both columns)
							//------------------------------------------------------
							
							if (data['openplaques:id'] || data['ref:FR:MemorialGenWeb'] || data['ref:OnroerendErfgoed'] 
								|| data['ref:bldam'] || data['ref:mhs'] || data['ref:lfdh'] || data['ref:LfDH'] 
								|| data['ref:npu'] || inBerlin|| inSachsen || data['ref:kgs'] || inBremen 
								|| data['ref:clt'] || data['ref:rce'] || data['ref:at:bda'] || data['ref:AT:bda'] 
								|| data['ref:ropiky.net']|| data['ref:hs'] || data['ref:he'] || ['ref:MDG'] 
								|| data['HE_ref'] || data['ref:cadw']|| data['ref:lt:kpd'] || data['ref:nrhp']) {
								
								result.push ('</td></tr><tr><td class="field11" rowspan="1" colspan="2">')
								};
							
							//------------------------------------------------------
							//	Openplaques
							//------------------------------------------------------
							
							if (data['openplaques:id']) {
								result.push ('<div class="heritage">Openplaques:&nbsp;<a target="_blank" href="' +
								this.html('https://openplaques.org/plaques/'+(data['openplaques:id'])) + '">' + this.html(this.shrinkUrl(data['openplaques:id'])) +
								'</a></div>');
							}
							//------------------------------------------------------
							//	Mapillary
							//------------------------------------------------------
							
							if (data['mapillary']) {
								result.push ('<div class="heritage">Mapillary:&nbsp;<a target="_blank" href="' +
								this.html('https://www.mapillary.com/app/?focus=photo&pKey='+(data['mapillary'])) + '">' + this.html(this.shrinkUrl('Mapillary images CC-BY-SA')) +
								'</a></div>');
							}
							//------------------------------------------------------
							//	Mémorial Gen Web 
							//------------------------------------------------------
							
							if (data['ref:FR:MemorialGenWeb']) {
								result.push ('<div class="heritage">Mémorial Gen Web:&nbsp;<a target="_blank" href="' +
								this.html('https://www.memorialgenweb.org/memorial3/html/fr/resultcommune.php?idsource='+(data['ref:FR:MemorialGenWeb'])) + '">' + this.html(this.shrinkUrl(data['ref:FR:MemorialGenWeb'])) +
								'</a></div>');
							}
							
							//------------------------------------------------------
							//	Onroerend Erfgoed
							//------------------------------------------------------
							if (data['ref:OnroerendErfgoed']) {
								result.push ('<div class="heritage">Bescherming Vlaams Gewest:&nbsp;<a target="_blank" href="' +
								this.html('https://inventaris.onroerenderfgoed.be/erfgoedobjecten/'+(data['ref:OnroerendErfgoed']||'')) + '">' + this.html(this.shrinkUrl(data['ref:OnroerendErfgoed'])) +
								'</a></div>');
							}
							
							//------------------------------------------------------
							//	Rijksdienst voor het Cultureel Erfgoed 
							//------------------------------------------------------
							if (data['ref:rce']) {
								result.push ('<div class="heritage">Rijksdienst voor het Cultureel Erfgoed :&nbsp;<a target="_blank" href="' +
								this.html('https://monumentenregister.cultureelerfgoed.nl/monumenten/'+(data['ref:rce'])) + '">' + this.html(this.shrinkUrl(data['ref:rce'])) +
								'</a></div>');
							}
							
							//------------------------------------------------------
							//	ref:MDG
							//------------------------------------------------------
							if (data['ref:MDG']) {
								result.push ('<div class="heritage">Schutz Deutschsprachige Gemeinschaft:&nbsp;<a target="_blank" href="' +
								this.html('https://www.ostbelgienkulturerbe.be/desktopdefault.aspx/tabid-3557/linkid-'+(data['ref:MDG'] ||'')) + '">' + this.html(this.shrinkUrl(data['ref:MDG'])) +
								'</a></div>');
							}
							
							//------------------------------------------------------
							//	Protection Wallonie INV
							//------------------------------------------------------
							if (data['ref:MDG'] && INV) {
								result.push ('<div class="heritage">Info Région wallonne:&nbsp;<a target="_blank" href="' +
								this.html('https://spw.wallonie.be/dgo4/site_ipic/index.php/fiche/index?codeInt='+(data['ref:clt'] ||'')) + '">' + this.html(this.shrinkUrl(data['ref:clt'])) +
								'</a></div>');
								
							}
							else if (INV) {
								result.push ('<div class="heritage">Protection Région wallonne:&nbsp;<a target="_blank" href="' +
								this.html('https://spw.wallonie.be/dgo4/site_ipic/index.php/fiche/index?codeInt='+(data['ref:clt'] ||'')) + '">' + this.html(this.shrinkUrl(data['ref:clt'])) +
								'</a></div>');
								
							}
							
							//------------------------------------------------------
							//	Protection Wallonie CLT
							//------------------------------------------------------
							if (data['ref:MDG'] && CLT) {
								result.push ('<div class="heritage">Info Région wallonne:&nbsp;<a target="_blank" href="' +
								this.html('https://spw.wallonie.be/dgo4/site_thema/index.php/dossier/view/BC_PAT/'+(data['ref:clt'] ||'')) + '">' + this.html(this.shrinkUrl(data['ref:clt'])) +
								'</a></div>');
							}
							else if (CLT) {
								result.push ('<div class="heritage">Protection Région wallonne:&nbsp;<a target="_blank" href="' +
								this.html('https://spw.wallonie.be/dgo4/site_thema/index.php/dossier/view/BC_PAT/'+(data['ref:clt'] ||'')) + '">' + this.html(this.shrinkUrl(data['ref:clt'])) +
								'</a></div>');
							}
							
							//------------------------------------------------------
							//	bldam-brandenburg
							//------------------------------------------------------
							if (data['ref:bldam']) {
								result.push ('<div class="heritage">bldam-brandenburg:&nbsp;<a target="_blank" href="' +
								this.html(BLDAM) + '">' + this.html(this.shrinkUrl(data['ref:bldam'])) +
								'</a></div>');
							}
							
							//------------------------------------------------------
							//	ref:lfdh
							//------------------------------------------------------
							if (data['ref:lfdh'] || data['ref:LfDH']) {
								result.push ('<div class="heritage">denkmalpflege-hessen.de:&nbsp;<a target="_blank" href="' +
								this.html('https://denkxweb.denkmalpflege-hessen.de/'+(data['ref:lfdh'] || data['ref:LfDH']||'')) + '">' + this.html(this.shrinkUrl(data['ref:lfdh'] || data['ref:LfDH'])) +
								'</a></div>');
							}
							
							//------------------------------------------------------
							//	denkmaldatenbank.berlin
							//------------------------------------------------------
							if (inBerlin && data['ref:lda']) {
								result.push ('<div class="heritage">denkmaldatenbank.berlin:&nbsp;<a target="_blank" href="' +
								this.html('https://denkmaldatenbank.berlin.de/daobj.php?obj_dok_nr='+(data['ref:lda']||'')) + '">' + this.html(this.shrinkUrl(data['ref:lda'])) +
								'</a></div>');
							}
							
							//------------------------------------------------------
							//	Landesamt für Denkmalpflege Bremen
							//------------------------------------------------------
							if (inBremen && data['ref:lfd']) {
								result.push ('<div class="heritage">LfD Bremen:&nbsp;<a target="_blank" href="' +
								this.html('https://denkmalpflege.bremen.de/sixcms/detail.php?template=20_denkmal_wrapper_d&obj=0000'+(data['ref:lfd']||'')) + '">' + this.html(this.shrinkUrl(data['ref:lfd'])) +
								'</a></div>');
							}
							
							//------------------------------------------------------
							//	Landesamt für Denkmalpflege Sachsen
							//------------------------------------------------------
							if (inSachsen && data['ref:lfd']) {
								result.push ('<div class="heritage">LfD Sachsen:&nbsp;<a target="_blank" href="' +
								this.html('https://denkmalliste.denkmalpflege.sachsen.de/CardoMap/Denkmalliste_Report.aspx?HIDA_Nr='+(data['ref:lfd']||'')) + '">' + this.html(this.shrinkUrl(data['ref:lfd'])) +
								'</a></div>');
							}
							
							//------------------------------------------------------
							//	ref:mhs
							//------------------------------------------------------
							if (data['ref:mhs']) {
								result.push ('<div class="heritage">culture.gouv.fr:&nbsp;<a target="_blank" href="' +
								this.html('https://www.pop.culture.gouv.fr/notice/merimee/'+(data['ref:mhs']||'')) + '">' + this.html(this.shrinkUrl(data['ref:mhs'])) +
								'</a></div>');
							}
							//------------------------------------------------------
							//	ref:npu
							//------------------------------------------------------
							if (data['ref:npu']) {
								result.push ('<div class="heritage">Národní památkový ústav:&nbsp;<a target="_blank" href="' +
								this.html('https://pamatkovykatalog.cz/?mode=parametric&indexId='+(data['ref:npu']||'').toLowerCase())+'&presenter=ElementsResults' + '">' + this.html(this.shrinkUrl(data['ref:npu'])) +
								'</a></div>');
							}
							
							//------------------------------------------------------
							//	KGS Schweiz
							//------------------------------------------------------
							if (data['ref:kgs']) {
								result.push ('<div class="heritage">Kulturgüterschutzinventar BABS geo.admin.ch:&nbsp;<a target="_blank" href="' +
								this.html('https://api3.geo.admin.ch/rest/services/kgs/MapServer/ch.babs.kulturgueter/'+(data['ref:kgs'])+'/extendedHtmlPopup?lang=de') + '">' + this.html(this.shrinkUrl(data['ref:kgs'])) +
								'</a></div>');
							}
							
							//------------------------------------------------------
							//	ref:at:bda
							//------------------------------------------------------
							if (data['ref:at:bda'] || data['ref:AT:bda']) {
								result.push ('<div class="heritage">wmflabs.org/denkmalliste:&nbsp;<a target="_blank" href="' +
								this.html('https://tools.wmflabs.org/denkmalliste/index.php?action=EinzelID&ID='+(data['ref:at:bda'] || data['ref:AT:bda']||'')) + '">' + this.html(this.shrinkUrl(data['ref:at:bda'] || data['ref:AT:bda'])) +
								'</a></div>');
							}
							
							//------------------------------------------------------
							//	ref:ropiky.net
							//------------------------------------------------------
							if (data['ref:ropiky.net']) {
								result.push ('<div class="heritage">ropiky.net:&nbsp;<a target="_blank" href="' +
								this.html('https://www.ropiky.net/dbase_objekt.php?id='+(data['ref:ropiky.net'] ||'')) + '">' + this.html(this.shrinkUrl(data['ref:ropiky.net'])) +
								'</a></div>');
							}
							
							//------------------------------------------------------
							//	ref:hs
							//------------------------------------------------------
							if (data['ref:hs']) {
								result.push ('<div class="heritage">Historic Scotland:&nbsp;<a target="_blank" href="' +
								this.html('https://portal.historicenvironment.scot/designation/'+(data['ref:hs'] ||'')) + '">' + this.html(this.shrinkUrl(data['ref:hs'])) +
								'</a></div>');
							}
							
							//------------------------------------------------------
							//	ref:he HE_ref
							//------------------------------------------------------
							if (data['ref:he'] || data['HE_ref']) {
								result.push ('<div class="heritage">Historic England:&nbsp;<a target="_blank" href="' +
								this.html('https://www.historicengland.org.uk/listing/the-list/list-entry/'+(data['ref:he'] || data['HE_ref'] ||'')) + '">' + this.html(this.shrinkUrl(data['ref:he'] || data['HE_ref'])) +
								'</a></div>');
								result.push ('<div class="heritage">British Listed Buildings:&nbsp;<a target="_blank" href="' +
								this.html('https://www.britishlistedbuildings.co.uk/10'+(data['ref:he'] || data['HE_ref'] ||'')) + '">' + this.html(this.shrinkUrl(data['ref:he'] || data['HE_ref'])) +
								'</a></div>');
							}
							
							//------------------------------------------------------
							//	ref:cadw
							//------------------------------------------------------
							if (data['ref:cadw']) {
								var cadw_split = data['ref:cadw'].split(';');
								var cadw_2 = cadw_split[1];
								var cadw_1 = cadw_split[0];
								result.push ('<div class="heritage">Cadw:&nbsp;<a target="_blank" href="' +
								this.html('https://cadwpublic-api.azurewebsites.net/reports/listedbuilding/FullReport?lang=en&id='+(cadw_2 || cadw_1 ||'')) + '">' + this.html(this.shrinkUrl(cadw_2 || cadw_1 ||'')) +
								'</a></div>');
								
								result.push ('<div class="heritage">British Listed Buildings:&nbsp;<a target="_blank" href="' +
								this.html('https://www.britishlistedbuildings.co.uk/wa-'+(cadw_2 || cadw_1 ||'')) + '">' + this.html(this.shrinkUrl(cadw_2 || cadw_1 ||'')) +
								'</a></div>');
							}
							
							//------------------------------------------------------
							//	ref:lt:kpd
							//------------------------------------------------------
							if (data['ref:lt:kpd']) {
								result.push ('<div class="heritage">Heritage Lithuania:&nbsp;<a target="_blank" href="' +
								this.html('https://kvr.kpd.lt/heritage/Pages/KVRDetail.aspx?lang=lt&MC='+(data['ref:lt:kpd'] ||'')) + '">' + this.html(this.shrinkUrl(data['ref:lt:kpd'])) +
								'</a></div>');
							}
							
							//------------------------------------------------------
							//	ref:nrhp
							//------------------------------------------------------
							if (data['ref:nrhp']) {
								result.push ('<div class="heritage">National Register of Historic Places:&nbsp;<a target="_blank" href="' +
								this.html('https://npgallery.nps.gov/AssetDetail/NRIS/'+(data['ref:nrhp'] ||'')) + '">' + this.html(this.shrinkUrl(data['ref:nrhp'])) +
								'</a></div>');
							}
							
							//------------------------------------------------------
							//	ref:nld
							//------------------------------------------------------
							if (data['ref:nld']) {
								result.push ('<div class="heritage">Niedersächsisches Landesamt für Denkmalpflege:&nbsp;<a target="_blank" href="' +
								this.html('https://denkmalatlas.niedersachsen.de/viewer/metadata/'+(data['ref:nld'] ||'')) + '/' + '">' + this.html(this.shrinkUrl(data['ref:nld'])) +
								'</a></div>');
							}
							
							//------------------------------------------------------
							//	Table: 14. Row (both columns)
							//------------------------------------------------------
							//------------------------------------------------------
							//	Wikidata
							//------------------------------------------------------
							
							if (wikidata) {
								result.push ('<div class="wikidata">Wikidata ('+wikidata[1]+'):&nbsp;<a target="_blank" href="' +
								this.html('https://www.wikidata.org/wiki/'+wikidata[1]) + '">' + 
								'<img src="../../../i/wikidata.png" border="0"title="Wikidata" ></a>  <a target="_blank" href="' +
								this.html('https://tools.wmflabs.org/reasonator/?q='+wikidata[1]) + '">' +
								'<img src="../../../i/Reasonator.png" border="0"title="Reasonator" ></a> <a target="_blank" href="' +
								this.html('https://tools.wmflabs.org/sqid/#/view?id='+wikidata[1]) + '">' +
								'<img src="../../../i/sqid.png" border="0" title="SQID"></a> <a target="_blank" href="' +
								this.html('https://tools.wmflabs.org/portal/'+wikidata[1]) + '/' +sprache + '">' +
								'<img src="../../../i/wikidata.png" border="0" title="Portal"></a></div>');
								
							}
							
							//------------------------------------------------------
							//	inscription:url
							//------------------------------------------------------
							
							if (data['inscription:url']) {
								result.push ('<div class="website">$$Webseite%%:&nbsp;<a target="_blank" href="' +
								this.html(data['inscription:url']) + '">' + this.html(this.shrinkUrl(data['inscription:url'])) +
								'</a></div>');
							}
							
							//------------------------------------------------------
							//	Geopedia
							//------------------------------------------------------
							
							if (wikipediaURL) {
								result.push ('<div class="wikipedia">$$Umgebung mit%% Geopedia:&nbsp;<a target="_blank" href="' +
								this.html(geopediaURL) + '">' + this.html(this.shrinkUrl(geopediaURL)) +
								'</a></div>');
							}
							
							//------------------------------------------------------
							//	Table: 16. Row (both columns)
							//------------------------------------------------------
							if (wikidata) {
								result.push ('</td></tr><tr><td class="field11" rowspan="1" colspan="2">')};
								
								//------------------------------------------------------
								//	Wikishootme / OSM Wikidata
								//------------------------------------------------------
								if (wikidata) {
									result.push ('<div class="Wikidata">Help Wikidata:&nbsp;<a target="_blank" href="' +
									this.html(wikishootmeURL) + '">' +
									'Wikishootme</a>, &nbsp;<a target="_blank" href="' + 
									this.html('https://osm.wikidata.link/'+wikidata[1]) + '">' +
									'OSM↔Wikidata</a></div>');
									
								}
								
								//------------------------------------------------------
								//	Table: Ende
								//------------------------------------------------------
								
								result.push ('</td></tr></tbody></table>');
								
								//------------------------------------------------------
								//	End of Cooked, start of Raw
								//------------------------------------------------------
								
								result.push ('</div><div class="raw" style="display: none">');
								
								//------------------------------------------------------
								//	Table: 1. Row (both columns)
								//------------------------------------------------------
								result.push ('<table><tbody>');
								result.push ('</td></tr><tr><td class="field12" rowspan="1" colspan="2">');
								
								//------------------------------------------------------
								//	Content
								//------------------------------------------------------
								
								var objtyp = '';
switch ((data['~size']||'').substr(0,1)) {
	
	case 'p':
		objtyp = "$$Punkt%%";
		break;
	case 'l':
		objtyp = "$$Linie%%";
		break;
	case 'a':
		objtyp = "$$Fläche%%";
		break;
	default:
		break;
}

result.push ('<div class="object"> $$Objekt%% ('+objtyp+'): <a target="_blank" href="' +
this.html(osmURL) + '">' + data.id + '</a></div>');

//------------------------------------------------------
//	Edit
//------------------------------------------------------

result.push ('<div class="edit">$$Bearbeiten mit%%:&nbsp;' +
josmHTML + ',&nbsp' + idHTML + '&nbsp;$$oder%%&nbsp;' + potlatchHTML + '</div>');

//------------------------------------------------------
//	Raw tags (Key/value)
//------------------------------------------------------

result.push (
	OpenLayers.Layer.PopupMarker.prototype.createHtmlFromData.apply(this,[data]));

//------------------------------------------------------
//	Debug: BILDRELOAD
//------------------------------------------------------

if (imageSourceURL) {
	
	var debugURL = this.thumbBaseURL + encodeURIComponent(imageSourceURL) + '&DEBUG=2';

result.push ('<div style="text-align: right; font-size: xx-small"><a target="_blank" href="' +
this.html(debugURL) + '">Thumb</a></div>');
}

//------------------------------------------------------
//	End Raw, End Tabs
//------------------------------------------------------
result.push ('</td></tr></tbody></table>');
result.push ('</div></div>');

return result.join('\n');
														},
														
														//--------------------------------------------------------------
														//
														//	Lookup wikipedia URL in data
														//
														//--------------------------------------------------------------
														
														getWikipediaURL: function (data) {
															
															//------------------------------------------------------
															//	wikipedia = LANG : LEMMA
															//------------------------------------------------------
															
															match = (data.wikipedia||'').match(/^([a-z]+):([^\;]*[^\;\s])([;\s].*)?$/);
															if (match) {
																return 'https://' + match[1] + '.wikipedia.org/wiki/' +
match[2].replace(/\040/g, '_');
															}
															
															//------------------------------------------------------
															//	wikipedia = http[s]://LANG.wikipedia.org/wiki/LEMMA
															//	wikipedia = LANG.wikipedia.org/wiki/LEMMA
															//------------------------------------------------------
															
															match = (data.wikipedia||'').match(/^(https?:\/\/)?(\w+\.wikipedia\.org\/wiki\/[^\/;]*[^\/;\s])([;\s].*)?$/);
															if (match) { return 'https://' + match[2]; }
																
																//------------------------------------------------------
																//	wikipedia : LANG = ...
																//------------------------------------------------------
																
																for (var tag in data) {
																	
																	var tagMatch = tag.match(/^wikipedia:([a-z]+)$/);
																	
																	if (!tagMatch) continue;
																	
																	//----------------------------------------------
																	//	wikipedia : LANG = LEMMA
																	//----------------------------------------------
																	
																	valueMatch = data[tag].match(/^([^\/;]*[^\/;\s])\s*$/);
																	if (valueMatch) {
																		return 'https://' + tagMatch[1] + '.wikipedia.org/wiki/' +
valueMatch[1].replace(/\040/g, '_');
																	}
																	
																	//----------------------------------------------
																	//	wikipedia : LANG = http[s]://LANG.wikipedia.org/wiki/LEMMA
																	//	wikipedia : LANG = LANG.wikipedia.org/wiki/LEMMA
																	//----------------------------------------------
																	
																	valueMatch = data[tag].match(/^(https?:\/\/)?(\w+\.wikipedia\.org\/wiki\/[^;\s\/]+)([\s;].*)?$/);
																	if (valueMatch) {
																		return 'https://' + valueMatch[2];
																	}
																}
																
																//------------------------------------------------------
																//	No wikipedia
																//------------------------------------------------------
																
																return null;
														},
														
														//--------------------------------------------------------------
														//
														//	Lookup subject:wikipedia URL in data
														//
														//--------------------------------------------------------------
														
														getsubject_WikipediaURL: function (data) {
															
															//------------------------------------------------------
															//	wikipedia = LANG : LEMMA
															//------------------------------------------------------
															
															match = (data['subject:wikipedia'] ||'').match(/^([a-z]+):([^\;]*[^\;\s])([;\s].*)?$/);
															if (match) {
																return 'https://' + match[1] + '.wikipedia.org/wiki/' +
match[2].replace(/\040/g, '_');
															}
															
															//------------------------------------------------------
															//	wikipedia = http[s]://LANG.wikipedia.org/wiki/LEMMA
															//	wikipedia = LANG.wikipedia.org/wiki/LEMMA
															//------------------------------------------------------
															
															match = (data['subject:wikipedia'] ||'').match(/^(https?:\/\/)?(\w+\.wikipedia\.org\/wiki\/[^\/;]*[^\/;\s])([;\s].*)?$/);
															if (match) { return 'https://' + match[2]; }
																
																//------------------------------------------------------
																//	wikipedia : LANG = ...
																//------------------------------------------------------
																
																for (var tag in data) {
																	
																	var tagMatch = tag.match(/^wikipedia:([a-z]+)$/);
																	
																	if (!tagMatch) continue;
																	
																	//----------------------------------------------
																	//	wikipedia : LANG = LEMMA
																	//----------------------------------------------
																	
																	valueMatch = data[tag].match(/^([^\/;]*[^\/;\s])\s*$/);
																	if (valueMatch) {
																		return 'https://' + tagMatch[1] + '.wikipedia.org/wiki/' +
valueMatch[1].replace(/\040/g, '_');
																	}
																	
																	//----------------------------------------------
																	//	wikipedia : LANG = http[s]://LANG.wikipedia.org/wiki/LEMMA
																	//	wikipedia : LANG = LANG.wikipedia.org/wiki/LEMMA
																	//----------------------------------------------
																	
																	valueMatch = dat2[tag].match(/^(https?:\/\/)?(\w+\.wikipedia\.org\/wiki\/[^;\s\/]+)([\s;].*)?$/);
																	if (valueMatch) {
																		return 'https://' + valueMatch[2];
																	}
																}
																
																//------------------------------------------------------
																//	No subject:wikipedia
																//------------------------------------------------------
																
																return null;
														},
														
														
														//--------------------------------------------------------------
														//
														//	parse URL
														//
														//--------------------------------------------------------------
														
														parseURL: function (url) {
															
															if (!url) return null;
															
															var match = (url+'').match (/^\s*(https?:\/\/)?([^:\s\/]+(:\d+)?)((\/[^\s;]*)?)([;\s].*)?$/);
															
															// match[1]: protocol https://
															// match[2]: url+Port  a.b.c:4711
															// match[3]: :Port
															// match[4]: Rest
															// match[5]: /name ohne blank
															// match[6]: ; und/oder blank + rest
															// if (match) { return (match[1] || 'https://') + match[2] + (match[4] || '/'); }
															
															// match5 muss mit / beginnen wenn das eine richtige URL war
															
															if (match && match[5]) { return (match[1] || 'https://') + match[2] + (match[4] || '/'); }
																
																match = url.match (/^(File:.*\S)/);
																if (match) { return 'https://commons.wikimedia.org/wiki/' + match[1].replace(/\040/g,'_'); }
																	
																	return null;
														},
														
														//--------------------------------------------------------------
														//
														//	Erzeuge osm-Links fuer ~user
														//
														//--------------------------------------------------------------
														
														formatValue: function (text, tag) {
															
															var value = OpenLayers.Layer.PopupMarker.prototype.formatValue.apply (this, arguments);
															
															if (tag=='~u') {
																
																var url = 'https://www.openstreetmap.org/user/' + text;
																value = '<a target="_blank" href="' + this.html(url) + '">' + value + '</a>';
															}
															
															return value;
														},
														
														//--------------------------------------------------------------
														//
														//	Erzeugt eine Kurzbeschreibung zu einem Objekt
														//
														//--------------------------------------------------------------
														
														createInfoFromData: infoFromData,	// from config.js
														
														//--------------------------------------------------------------------
														//	get object length or area
														//--------------------------------------------------------------------
														
														getSizeFromData: function (data) {
															
															if (!data['~size']) { return null; }
															
															var value = parseInt (data['~size'].substr(1));
															var digits = Math.floor (Math.log(value) / Math.log(10));
															
															switch (data['~size'].substr(0,1)) {
																
																case 'l':
																	if (value <= 1e3) return value + String.fromCharCode(8239) + 'm';
return (value/1e3).toFixed (Math.max(0,6-digits)) + String.fromCharCode(8239) + 'km';
break;
																case 'a':
																	if (value <= 1e4) return value + String.fromCharCode(8239) + 'm²';
if (value <= 1e6) return (value/1e4).toFixed (Math.max(0,7-digits)) + String.fromCharCode(8239) + 'ha';
return (value/1e6).toFixed (Math.max(0,9-digits)) + String.fromCharCode(8239) + 'km²';
break;
																default:
																	return null;
															}
														},
														
														//--------------------------------------------------------------------
														//	link to up/down-switch
														//--------------------------------------------------------------------
														
														detail:  0,
														
														getDetail: function () {
															
															return this.detail;
														},
														
														setDetail: function (newDetail) {
															
															if (newDetail < -3) newDetail = -3;
															if (newDetail > +3) newDetail = +3;
															
															if (newDetail==this.detail) return this.detail;
															
															this.detail = newDetail;
															
															if (!this.map.permalinkParams) this.map.permalinkParams = {};
															this.map.permalinkParams.detail = this.detail;
															
															this.map.events.triggerEvent('changelayer',{
																layer: this,
											property: 'detail'
															});
															
															this.moveTo (this.map.getExtent(), this.map.getZoom(), false);
															return this.detail;
														},
														
														//--------------------------------------------------------------------
														//	object groups
														//--------------------------------------------------------------------
														
														classByType: {
															'collection': 'site',
														'route': 'route',
														'site': 'site'
														},
														
														undefinedMarkerIconUrl: '../../../m/reddot.png',
														undefinedMarkerIconScale: 0.6,
														
														//--------------------------------------------------------------------
														//	map zoom level to set of groups
														//--------------------------------------------------------------------
														
														createUrlForBounds: function (bounds) {
															
															var level = this.map.getZoom() + this.detail;
															
															return '../../../c/csv.phtml?db=historic2'+
'&zoom='+level+
'&bbox='+bounds.left+','+bounds.bottom+','+bounds.right+','+bounds.top;
														},
														
														clusterMinZoom: 13,
														clusterSize: 16,
														clusterLimit: 50,
														
														osmlinks: false,
														minZoom: 16,
														blockSize: 0
}));

	//----------------------------------------------------------------------
	//	 Popup Marker-Layer
	//----------------------------------------------------------------------

	map.addLayer (mlayer = new OpenLayers.Layer.PopupMarker("$$Einzelobjekte%%", {
                layerGroup: 'linie',
		positionInLayerChanger: 1,
		permaId: 'He',
		selectId: OpenLayers.Util.getParameters(window.location+'').select || null,
		closeKeyCode: 27,
		textAllItems: '$$Alle ${count} Einträge%%',
		textFirstItems: '$$Die ersten ${count} von ${all} Einträgen%%',

		// Der letzte Wert gilt auch für alle hoeheren Zoomstufen.
		// Achtung: kein(!) "," nach dem letzten Wert!

		iconScale: [
			80,	// 0
			80,	// 1
			80,	// 2
			80,	// 3
			80,	// 4
			80,	// 5
			80,	// 6
			80,	// 7
			80,	// 8
			80,	// 9
			80,	//10
			100	//11
		],

		createIconFromData: function (data) {

			// get icon parameter from config
			var iconParams = iconParamsFromData (data, null, this.map.zoom);

			// get scale from zoom via lookup table
			var scale = this.iconScale[Math.min(this.map.zoom, this.iconScale.length-1)] / 100;
			// scale up site relations
			if (data.type=='site' || data.type=='route') 
				scale *= 1.5;

			// feature has image?
			var hasImage = hasImageFromData (data);

			// determine icon size
			var width  = 30;	// default width
			var height = 30;	// default height
			var baseOrientation = null;

			if (iconParams instanceof Array) {

				switch (iconParams.length) {
				case 2:
					if (iconParams[1]) {
						width = height = iconParams[1];
					}
					break;
				case 4:
					baseOrientation = iconParams[3];
				case 3:
					if (iconParams[1] && iconParams[2]) {
						width = iconParams[1];
						height= iconParams[2];
					}
					break;
				}

			} else if (iconParams==null) {

				width  = 12;
				height = 12;
			}

			icon= new OpenLayers.Icon (
				this.createIconUrlFromParams (iconParams, hasImage),
				{w: width*scale, h: height*scale});

			if (baseOrientation && data.direction) {

				var base = baseOrientation=='U' ? 0 : this.parseDirection(baseOrientation);
				var degrees = this.parseDirection(data.direction);

				if (!isNaN(degrees) || !isNaN(base)) {

					degrees = (1440 + degrees - base) % 360;
					if (baseOrientation=='U') degrees = (degrees + 90) % 180 - 90;

					var transform = 'rotate(' + degrees + 'deg)';

					icon.imageDiv.firstChild.style.transform = transform;
					icon.imageDiv.firstChild.style.webkitTransform = transform;
				}
			}

			return icon;
		},

		parseDirection: function (direction) {

			var value = parseFloat(direction);

			if (!isNaN(value)) 
				return value - Math.floor(value/360)*360;
			value = this.compassToDegrees[(direction+'').toUpperCase()];
			if (!isNaN(value)) 
				return value;

			return null;
		},

		degreeToCompass: [
			'n', 'nne', 'ne', 'ene', 'e', 'ese', 'se', 'sse',
			's', 'ssw', 'sw', 'wsw', 'w', 'wnw', 'nw', 'nnw', 'n'
		],

                compassToDegrees: {
                        N:      0,
                        NORTH:  0,
                        NNE:    22.5,
                        NE:     45.0,
                        ENE:    67.5,
                        E:      90.0,
                        EAST:   90.0,
                        ESE:    112.5,
                        SE:     135.0,
                        SSE:    157.5,
                        S:      180.0,
                        SOUTH:  180.0,
                        SSW:    202.5,
                        SW:     225.0,
                        WSW:    247.5,
                        W:      270.0,
                        WEST:   270.0,
                        WNW:    292.5,
                        NW:     315.0,
                        NNW:    337.5
                },

                iconPath: '../../../m/',

                createIconUrlFromParams: function (iconParams, widthImage) {

                        if (!iconParams) 
				return this.iconPath + 'reddot.png';

                        var pic = iconParams instanceof Array ? iconParams[0] : iconParams;

                        if (!pic) 
				return this.iconPath + 'reddot.png';

                        return this.iconPath + (widthImage ? 'image_' : '') + pic + '.png';
                },

                //--------------------------------------------------------------
                //
                //      Zeige im Tooltip den Namen an
                //
                //--------------------------------------------------------------

                createTooltipFromData: function (data) {
			if (data['name:'+sprache] || data.name || data.old_name 
				|| data['historic:name'] || data['addr:housename'] || data.ref 
				|| data['addr:street'] + data['addr:housenumber'] )

				return this.html(data['name:'+sprache] 
					|| data.name || data.old_name || data['historic:name'] || data['addr:housename']
					|| data.ref 
					|| data['addr:street'] + ' ' + (data['addr:housenumber'] || ' ')
					|| '');
		},

		//--------------------------------------------------------------
		//
		//	URL-Prefix des Thumbnail-Generators	*** ANPASSEN! ***
		//
		//--------------------------------------------------------------

		thumbBaseURL: '../../../c/thumbcache.php?image=',
		licenseBaseURL: '../../../c/imglicense.php?image=',

		//--------------------------------------------------------------
		//	Diese Felder NICHT anzeigen:
		//--------------------------------------------------------------

		fieldTypes: {
			'description:de': 'hidden',
			description: 'hidden',
			inscription: 'hidden',
			'~t': 'hidden',
			'~u': 'hidden',
			'~flags': 'hidden',
			'~group': 'hidden',
			'~errors': 'hidden',
			'~members': 'hidden',
			'~ep': 'hidden',
			'~in': 'hidden',
			'heritage:website': 'hidden',
			id: 'hidden',
			lat: 'hidden',
			lon: 'hidden',
			'memorial:text': 'hidden',
			name: 'hidden',
			'~size': 'hidden',
			url: 'hidden' ,
			website: 'hidden',
			'wikipedia:de': 'hidden',
			isLatest: 'hidden',
			wikimedia_commons: 'hidden',
			wikipedia: 'hidden'
		},

		//--------------------------------------------------------------
		//
		//	Erzeuge das neue Popup mit Tabs und Reitern
		//
		//--------------------------------------------------------------

		createHtmlFromData: function (data) {

			//======================================================
			//
			//	Prepare data
			//
			//======================================================

			//------------------------------------------------------
			//	prepare Icons
			//------------------------------------------------------

			var icons	= [];

			var heritage	= isHeritage(data);
			var iconParams	= iconParamsFromData (data, heritage, this.map.zoom);

			if (iconParams) icons.push ('<img src="' +
				this.html(this.createIconUrlFromParams (iconParams)) +
				'" style="float: left" />'
			);

			if (heritage) icons.push ('<img src="' +
				this.html(this.createIconUrlFromParams (heritage)) +
				'" style="float: left" />'
			);

			if (data.direction) {

				degrees = this.parseDirection (data.direction);

				if (!isNaN(degrees)) {

					dir = this.degreeToCompass[Math.floor(degrees/22.5+0.5)];
					icons.push ('<img src="' +
						this.html('../../../m/direction_' + dir + '.png') +
						'" style="float: left" />');
				}
			}

			//------------------------------------------------------
			//	get Osm Browse URL
			//------------------------------------------------------

			var osmURL = 'https://www.openstreetmap.org/browse/' +
				{n:'node',w:'way',r:'relation'}[data.id.substr(0,1)] + '/' +
				data.id.substr(1);

			//------------------------------------------------------
			//	get coordinates
			//------------------------------------------------------

			var coors = (data.lat >= 0 ? 'N' : 'S') + Math.abs(data.lat) + '°, ' +
				(data.lon >= 0 ? 'E' : 'W') + Math.abs(data.lon) + '°';

			//------------------------------------------------------
			//	edit links
			//------------------------------------------------------

			var josmURL = 'http://127.0.0.1:8111/load_object?objects='+data.id+'&select='+data.id;
			var josmHTML = '<a target="josmremote" href="'+this.html(josmURL)+'">JOSM</a>';
			var idURL = 'https://www.openstreetmap.org/edit?editor=id&lat=' +
				data.lat + '&lon=' + data.lon + '&zoom=17';
			var idHTML = '<a target="_blank" href="'+this.html(idURL)+'">iD</a>';
			var potlatchURL = 'https://www.openstreetmap.org/edit?editor=potlatch2&lat='
				+ data.lat + '&lon=' + data.lon + '&zoom=17';
			var potlatchHTML = '<a target="_blank" href="'+this.html(potlatchURL)+'">Potlatch2</a>';
            
			//------------------------------------------------------
			//	Berlin Denkmal durch bbox definiert
			//------------------------------------------------------
            
			var inBerlin = data.lon>= 13.08820 && data.lon<= 13.76061 &&
				data.lat >= 52.34182 && data.lat <= 52.66972;
                
			//------------------------------------------------------
			//	Bremen Denkmal durch bbox definiert
			//------------------------------------------------------
            
			var inBremen = data.lon>= 8.48135 && data.lon<= 8.98304 &&
				data.lat >= 53.01037 && data.lat <= 53.60616;
                
			//------------------------------------------------------
			//	Sachsen Denkmal durch bbox definiert
			//------------------------------------------------------
            
			var inSachsen = data.lon>= 11.69047 && data.lon<= 15.17313 &&
				data.lat >= 50.07279 && data.lat <= 51.70129;
			
			//------------------------------------------------------
			//	Wallonien INV
			//------------------------------------------------------
                
			var INV = (data['ref:clt']||'').match(/^[0-9\-]+INV[0-9\-]+$/);
            
			//------------------------------------------------------
			//	Wallonien CLT
			//------------------------------------------------------
            
			var CLT = (data['ref:clt']||'').match(/^[0-9\-]+CLT[0-9\-]+$/);
            
			//------------------------------------------------------
			//	Brandenburg BLDAM
			//------------------------------------------------------
			var BLDAMSource = ('https://ns.gis-bldam-brandenburg.de/hida4web/view?docId=obj'+(data['ref:bldam']||'').toLowerCase())+'.xml';
			var BLDAM = BLDAMSource.replace (/,[0-9][0-9][0-9]/g, '');
			
			//------------------------------------------------------
			//	Website
			//------------------------------------------------------

			var websiteURL = (data.website) ||
				this.parseURL(data['website:'+sprache]) ||
				this.parseURL(data['memorial:website']) ||
				this.parseURL(data.url);

            //------------------------------------------------------
			//	Heritage Website
			//------------------------------------------------------

			var heritagewebsiteURL = (data['heritage:website']);

			//------------------------------------------------------
			//	Wikipedia
			//------------------------------------------------------

			var wikipediaURL = this.getWikipediaURL(data);
            
			//------------------------------------------------------
			//	Geopedia
			//------------------------------------------------------

			var geopediaURL = 'https://www.geopedia.de/?m=0&lat=' +
				data.lat + '&lon='+ data.lon + '&l='+sprache +'&z=16';
            
			//------------------------------------------------------
			//	Wikishootme
			//------------------------------------------------------

			var wikishootmeURL = 'https://tools.wmflabs.org/wikishootme/#lat=' +
				data.lat + '&lng='+ data.lon + '&zoom=16&layers=commons,flickr,mixnmatch,wikidata_image,wikidata_no_image,wikipedia';
			
			//------------------------------------------------------
			//	Wikidata
			//------------------------------------------------------
            
			var wikidata = (data.wikidata+'').match(/^(Q\d+)$/);
			var wdimage;
			var mapillaryimage;
			//------------------------------------------------------
			//	wikimedia_commons
			//------------------------------------------------------

			var wikimedia_commonsURL = (data.wikimedia_commons);
			
			//------------------------------------------------------
			//	subject:wikipedia / subject:wikidata
			//------------------------------------------------------

			var subject_wikipediaURL = this.getsubject_WikipediaURL(data);
			var subject_wikidataURL = (data['subject:wikidata']+'').match(/^(Q\d+)$/);

			//------------------------------------------------------
			//	Image
			//------------------------------------------------------
			
			if ( data.image == null  && wikidata) {
				wdimage = this.html('https://tools.wmflabs.org/hub/'+wikidata[1]) 
						+ '?format=json&p=P18&fallback=https://gk.historic.place/i/beteilige-'+ sprache +'.jpg';
			}
			
			if ( data.image == null  && wikidata == null && data.mapillary) {
				mapillaryimage = this.html('https://images.mapillary.com/'+ data.mapillary + '/thumb-1024.jpg');
			}
			var imageSourceURL = this.parseURL(data.image) 
				|| this.parseURL(data.wikimedia_commons) 
				|| wdimage
				|| mapillaryimage;
			var thumbURL = mapillaryimage && (this.thumbBaseURL + encodeURIComponent(imageSourceURL))|| imageSourceURL 
				&& (this.thumbBaseURL + encodeURIComponent(imageSourceURL));
			var licenseURL = imageSourceURL 
				&& (this.licenseBaseURL + encodeURIComponent(imageSourceURL));
			var kontaktURL = '../../../c/kontakt-formular.php';
			var kontaktURL2 = '../../../c/kontakt-formular2.php';

			//------------------------------------------------------
			//	XXX temporär zur Diskussion mit NSDOK in Köln
			//------------------------------------------------------

			if (data.id=='n655332809') {
				imageSourceURL = 'https://www.museenkoeln.de/ns-dok/default.asp?s=763&tid=323&id=1591&abb=abb_1591_13321';
				thumbURL = 'https://www.museenkoeln.de/ns-dok/db_stolpersteine/Abbildungen/lo/abb_1591_13321.jpg';
			}


			//------------------------------------------------------
			//	image onload
			//------------------------------------------------------

			var imgOnload =
	"root=this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;" +
	"main = root.parentElement.parentElement.parentElement; " +
	"if (main) main.control.updateSize();";

			//------------------------------------------------------
			//	click on tab
			//------------------------------------------------------

			OpenLayers.Layer.PopupMarker.clickTab = function (button) {

				if (button.className=='active') return;

				var container = button.parentElement;
				var card = container;

				for (var node=container.firstChild; node; node=node.nextSibling) {

					if (node.nodeType != 1 || node.tagName != 'BUTTON') { continue; }

					card = card.nextSibling;

					card.style.display = node==button ? 'block' : 'none';
					node.className = node==button ? 'active' : '';
				}
			};

			//======================================================
			//
			//	Create Popup
			//
			//======================================================

			var result = [];

			//------------------------------------------------------
			//	Tabs
			//------------------------------------------------------

			result.push ('<div><div class="tabs">');

			result.push ('<button onclick="OpenLayers.Layer.PopupMarker.clickTab(this)" class="active">$$Übersicht%%</button>');
			result.push ('<button onclick="OpenLayers.Layer.PopupMarker.clickTab(this)">$$Details%%</button>');

			//------------------------------------------------------
			//	Cooked
			//------------------------------------------------------

			result.push ('</div><div class="cooked">');

			//------------------------------------------------------
			//	Table: start
			//------------------------------------------------------

			result.push ('<table><tbody>');

			//------------------------------------------------------
			//	Table: 1. Row (both columns)
			//------------------------------------------------------

			result.push ('<tr><td colspan="2" class="field1">');

			//------------------------------------------------------
			//	Name
			//------------------------------------------------------
			var addresstreet = data['addr:street'];
			var addresshousenumber = data['addr:housenumber'] || '';
			var name = data['name:'+sprache] || data.name || data.old_name 
				||data['historic:name'] || data['addr:housename']
				|| data.ref;
			if (name || addresstreet) {
				result.push (this.html(name || data['addr:street'] + ' ' + addresshousenumber) + '<br style="clear: left"/>');
			}
			
			//------------------------------------------------------
			//	Icon
			//------------------------------------------------------

			result.push ('<tr><td colspan="2" class="field1">');
			for (i in icons) {

				result.push (icons[i]);
			}
			
			if ( data.cemetery == 'war_cemetery'){
				result.push ('<a target="_blank"  href="' +
					this.html('https://thebook.toolforge.org/page.cgi?p='+ sprache +'wiki&goto=$$Kriegsgräberstätte%%') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
			}

			if ( sprache == 'de' && data.defensive == "bergfried"){
				result.push ('<a target="_blank"  href="' +
					this.html('https://www.mittelalter-lexikon.de/wiki/Bergfried') + '"><img src="../../../i/ml.png" border="0" title="Mittelalter-Lexikon"></a>');
				result.push ('<a target="_blank"  href="' +
					this.html('https://tools.wmflabs.org/reasonator/?q=Q2302643&lang=de') + '"><img src="../../../i/Reasonator.png" border="0" title="Wikidata"></a>');
				result.push ('<a target="_blank"  href="' +
					this.html('https://thebook.toolforge.org/page.cgi?p=dewiki&goto=Bergfried') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
			}

			if ( sprache == 'de' && data.historic == 'mine' && data.natural=='sinkhole'){
				result.push ('<a target="_blank"  href="' +
					this.html('https://www.mittelalter-lexikon.de/wiki/Pinge') + '"><img src="../../../i/ml.png" border="0" title="Mittelalter-Lexikon"></a>');
				result.push ('<a target="_blank"  href="' +
					this.html('https://thebook.toolforge.org/page.cgi?p=dewiki&goto=Pinge') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
			}

			if ( sprache == 'de' && (data.man_made == 'mineshaft' ||  data.historic=='mineshaft' || data['disused:man_made'] == 'mineshaft' || data['abandoned:man_made'] == 'mineshaft' || data['razed:man_made'] == 'mineshaft')){
				result.push ('<a target="_blank"  href="' +
					this.html('https://www.mittelalter-lexikon.de/wiki/Bergbau') + '"><img src="../../../i/ml.png" border="0" title="Mittelalter-Lexikon"></a>');
			}
            
			if ( data.man_made == 'mineshaft' ||  data.historic=='mineshaft' || data['disused:man_made'] == 'mineshaft' || data['abandoned:man_made'] == 'mineshaft' || data['razed:man_made'] == 'mineshaft'){
				result.push ('<a target="_blank"  href="' +
					this.html('https://thebook.toolforge.org/page.cgi?p='+ sprache +'wiki&goto=$$Bergwerk%%') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
			}

			if ( sprache == 'de' && data.man_made == 'water_well' || data.amenity == 'fountain'){
				result.push ('<a target="_blank"  href="' +
					this.html('https://www.mittelalter-lexikon.de/wiki/Brunnen') + '"><img src="../../../i/ml.png" border="0" title="Mittelalter-Lexikon"></a>');
			}

			if ( data.man_made == 'water_well' || data.amenity == 'fountain'){
				result.push ('<a target="_blank"  href="' +
					this.html('https://thebook.toolforge.org/page.cgi?p='+ sprache +'wiki&goto=$$Brunnen%%') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
			}

			if ( sprache == 'de' && data.castle_type == 'defensive'){
				result.push ('<a target="_blank"  href="' +
					this.html('https://www.mittelalter-lexikon.de/wiki/Burg') + '"><img src="../../../i/ml.png" border="0" title="Mittelalter-Lexikon"></a>');
				result.push ('<a target="_blank"  href="' +
					this.html('https://thebook.toolforge.org/page.cgi?p=dewiki&goto=Burg') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
			}

			if ( sprache == 'de' && data.stone_type == 'conciliation_cross'){
				result.push ('<a target="_blank"  href="' +
					this.html('https://www.mittelalter-lexikon.de/wiki/Sühnekreuz') + '"><img src="../../../i/ml.png" border="0" title="Mittelalter-Lexikon"></a>');
				result.push ('<a target="_blank"  href="' +
					this.html('https://thebook.toolforge.org/page.cgi?p=dewiki&goto=Sühnekreuz') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
			}

			if ( sprache == 'de' && data['building:architecture'] == 'timber_frame'){
				result.push ('<a target="_blank"  href="' +
					this.html('https://www.mittelalter-lexikon.de/wiki/Fachwerk') + '"><img src="../../../i/ml.png" border="0" title="Mittelalter-Lexikon"></a>');
			}

			if ( data['building:architecture'] == 'timber_frame'){
				result.push ('<a target="_blank"  href="' +
					this.html('https://thebook.toolforge.org/page.cgi?p='+ sprache +'wiki&goto=$$Fachwerkhaus%%') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
			}

			if ( sprache == 'de' && data['abandoned:amenity'] == 'prison'){
				result.push ('<a target="_blank"  href="' +
					this.html('https://www.mittelalter-lexikon.de/wiki/Gefängnis') + '"><img src="../../../i/ml.png" border="0" title="Mittelalter-Lexikon"></a>');
				result.push ('<a target="_blank"  href="' +
					this.html('https://thebook.toolforge.org/page.cgi?p=dewiki&goto=Gefängnis') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
			}

			if ( sprache == 'de' && (data['historic'] == 'wayside_chapel' || data['building'] == 'chapel'|| data['historic'] == 'chapel')){
				result.push ('<a target="_blank"  href="' +
					this.html('https://www.mittelalter-lexikon.de/wiki/Kapelle_(Arch.)') + '"><img src="../../../i/ml.png" border="0" title="Mittelalter-Lexikon"></a>');
			}

			if ( data['historic'] == 'wayside_chapel' || data['building'] == 'chapel'|| data['historic'] == 'chapel'){
				result.push ('<a target="_blank"  href="' +
					this.html('https://thebook.toolforge.org/page.cgi?p='+ sprache +'wiki&goto=$$Kapelle%%') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
			}

			if ( sprache == 'de' && (data['historic'] == 'monastery' || data['building'] == 'monastery'|| data['amenity'] == 'monastery')){
				result.push ('<a target="_blank"  href="' +
					this.html('https://www.mittelalter-lexikon.de/wiki/Kloster') + '"><img src="../../../i/ml.png" border="0" title="Mittelalter-Lexikon"></a>');
			}

			if ( data['historic'] == 'monastery' || data['building'] == 'monastery'|| data['amenity'] == 'monastery'){
				result.push ('<a target="_blank"  href="' +
					this.html('https://thebook.toolforge.org/page.cgi?p='+ sprache +'wiki&goto=$$Kloster%%') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
			}

			if ( sprache == 'de' && (data['man_made'] == 'watermill' || data['abandoned:man_made'] == 'watermill' || data['razed:man_made'] == 'watermill' || data['disused:man_made'] == 'watermill')){
				result.push ('<a target="_blank"  href="' +
					this.html('https://www.mittelalter-lexikon.de/wiki/Mühlen') + '"><img src="../../../i/ml.png" border="0" title="Mittelalter-Lexikon"></a>');
			}

			if ( data['man_made'] == 'watermill' || data['abandoned:man_made'] == 'watermill' || data['razed:man_made'] == 'watermill' || data['disused:man_made'] == 'watermill'){
				result.push ('<a target="_blank"  href="' +
					this.html('https://thebook.toolforge.org/page.cgi?p='+ sprache +'wiki&goto=$$Wassermühle%%') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
			}

			if ( sprache == 'de' && (data['man_made'] == 'windmill' || data['abandoned:man_made'] == 'windmill' || data['razed:man_made'] == 'windmill' || data['disused:man_made'] == 'windmill')){
				result.push ('<a target="_blank"  href="' +
					this.html('https://www.mittelalter-lexikon.de/wiki/Mühlen') + '"><img src="../../../i/ml.png" border="0" title="Mittelalter-Lexikon"></a>');
			}

			if ( data['man_made'] == 'windmill' || data['abandoned:man_made'] == 'windmill' || data['razed:man_made'] == 'windmill' || data['disused:man_made'] == 'windmill'){
				result.push ('<a target="_blank"  href="' +
					this.html('https://thebook.toolforge.org/page.cgi?p='+ sprache +'wiki&goto=$$Windmühle%%') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
			}

			if ( sprache == 'de' && data['man_made'] == 'lighthouse'){
				result.push ('<a target="_blank"  href="' +
					this.html('https://www.mittelalter-lexikon.de/wiki/Leuchttürme') + '"><img src="../../../i/ml.png" border="0" title="Mittelalter-Lexikon"></a>');
			}

			if ( data['man_made'] == 'lighthouse'){
				result.push ('<a target="_blank"  href="' +
					this.html('https://thebook.toolforge.org/page.cgi?p='+ sprache +'wiki&goto=$$Leuchtturm%%') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
			}

			if ( sprache == 'de' && data['amenity'] == 'townhall'){
				result.push ('<a target="_blank"  href="' +
					this.html('https://www.mittelalter-lexikon.de/wiki/Rathaus') + '"><img src="../../../i/ml.png" border="0" title="Mittelalter-Lexikon"></a>');
			}

			if ( data['amenity'] == 'townhall'){
				result.push ('<a target="_blank"  href="' +
					this.html('https://thebook.toolforge.org/page.cgi?p='+ sprache +'wiki&goto=$$Rathaus%%') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
			}

			if ( sprache == 'de' && data['historic'] == 'manor' || data['castle_type'] == 'manor'){
				result.push ('<a target="_blank"  href="' +
					this.html('https://www.mittelalter-lexikon.de/wiki/Rittergut') + '"><img src="../../../i/ml.png" border="0" title="Mittelalter-Lexikon"></a>');
				result.push ('<a target="_blank"  href="' +
					this.html('https://thebook.toolforge.org/page.cgi?p=dewiki&goto=Rittergut') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
			}

			if ( sprache == 'de' && data['abandoned:place']  || data['abandoned'] == 'village'){
				result.push ('<a target="_blank"  href="' +
					this.html('https://www.mittelalter-lexikon.de/wiki/Wüstungen') + '"><img src="../../../i/ml.png" border="0" title="Mittelalter-Lexikon"></a>');
			}

			if ( data['abandoned:place']  || data['abandoned'] == 'village'){
				result.push ('<a target="_blank"  href="' +
					this.html('https://thebook.toolforge.org/page.cgi?p='+ sprache +'wiki&goto=$$Wüstung%%') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
			}


			if ( data.stone_type == "coat_of_arms"){
				result.push ('<a target="_blank"  href="' +
					this.html('https://thebook.toolforge.org/page.cgi?p='+ sprache +'wiki&goto=$$Wappen%%') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
			}


			if ( data.site_type == "tumulus"){
				result.push ('<a target="_blank"  href="' +
					this.html('https://thebook.toolforge.org/page.cgi?p='+ sprache +'wiki&goto=$$Hügelgrab (Tumulus)%%') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
			}

			if ( data.historic == "archaeological_site" && data.site_type != "tumulus"){
				result.push ('<a target="_blank"  href="' +
					this.html('https://thebook.toolforge.org/page.cgi?p='+ sprache +'wiki&goto=$$Archäologische Stätte%%') + '"><img src="../../../i/book.png" border="0" title="The Book"></a>');
			}

			if ( wikimedia_commonsURL == null && wikidata){
				result.push ('<a target="_blank"  href="' + 
					this.html('https://tools.wmflabs.org/hub/'+wikidata[1]) + '?s=c'+'"><img src="../../../i/Commons-logo.png" border="0" height="12" width="12" title="Wikimedia Commons"></a>');
					
			}

			if ( wikipediaURL == null && wikidata){
				result.push ('<a target="_blank"  href="' + 
					this.html('https://tools.wmflabs.org/hub/'+wikidata[1]) + '?site=wp'+'"><img src="../../../i/Wikipedia-icon.png" border="0" height="12" width="12" title="Wikipedia"></a>');
					
			}

			if ( data.image == null && wikidata){
				result.push ('<a target="_blank"  href="' + 
					this.html('https://tools.wmflabs.org/hub/'+wikidata[1]) + '?p=P18'+'"><img src="../../../i/Image_link.png" border="0" height="12" width="12" title="Image from Wikidata"></a>');
					
			}

			if ( sprache == 'de' )
				result.push ('<a target="_blank"  href="' +
					this.html(kontaktURL) + '"><img src="../../../i/urheberrecht.png" border="0" title="Urheberrechtsverletzung melden"></a>');
			
			else
				result.push ('<a target="_blank"  href="' +
					this.html(kontaktURL2) + '"><img src="../../../i/urheberrecht.png" border="0" title="Report copyright violation"></a>');

			//------------------------------------------------------
			//	Table: 2. Row, 1. Column
			//------------------------------------------------------

			result.push ('</td></tr><tr><td class="field2" colspan="1" rowspan="1" style="vertical-align: middle; text-align: center">');

			//------------------------------------------------------
			//	Content
			//------------------------------------------------------

			// info
			result.push ('<div class="info">' +
				this.html(this.createInfoFromData(data)) + '</div>');

			//------------------------------------------------------
			//	Table: 5. Row, 2. Column
			//------------------------------------------------------

			result.push ('</td><td rowspan="3" class="thumb" style="vertical-align: middle; text-align: center">');

			//------------------------------------------------------
			//	Image
			//------------------------------------------------------

			if (thumbURL) {

				result.push ('<a target="_blank" href="' + this.html(imageSourceURL) + '"><img src="' +
					this.html(thumbURL) + '" onload="' + imgOnload + '" alt="loading..."></a>');

			} else {
				result.push ('<a target="_blank"  href="https://wiki.openstreetmap.org/wiki/Historical_Objects/Popup#Bildvorschau"><img src="../../../i/beteilige.png" border="0" ></a>');
			}

                        if (licenseURL) {

                                var captid;
                                captid = 'CAPT' + Math.floor(Math.random()*10000);
                                jQuery.ajax({
                                        url: licenseURL,
                                        success: function(html) {
                                                document.getElementById(captid).innerHTML = html;
                                        },
                                        async:true
                                });
                                result.push ( '<div id="' + captid + '" class="imgcaption"></div>');
                        }

			//------------------------------------------------------
			//	Table: 3. Row
			//------------------------------------------------------

			result.push ('</td></tr><tr><td colspan="1" rowspan="1" class="field3" style="vertical-align: middle; text-align: center">');

			//------------------------------------------------------
			//	Content
			//------------------------------------------------------

			result.push ('<div class="lonlat">' + this.html("$$Koordinaten%%: " + coors) + '</div>');

			//------------------------------------------------------
			//	Table: 4. Row
			//------------------------------------------------------

			result.push ('</td></tr><tr><td colspan="1" rowspan="1" class="field4" style="vertical-align: middle; text-align: center">');

			result.push (this.getSizeFromData(data)||'');

			//------------------------------------------------------
			//	Table: 6. Row (both columns)
			//------------------------------------------------------

			if (data.inscription || data['memorial:text'] ||data['inscription:'+sprache]) {
			result.push ('</td></tr><tr><td class="field6" colspan="2">')};

			if (data.inscription) {

				result.push ('<div class="inscription">' + this.html("$$Inschrift%%: " +
					data.inscription) + '</div>');
			}

			if (data['memorial:text']) {

				result.push ('<div class="inscription">' + this.html("$$Inschrift%%: " +
					data['memorial:text']) + '</div>');
			}

			if (data['inscription:'+sprache]) {

				result.push ('<div class="inscription">' + this.html("$$Inschrift%%: " +
					data['inscription:'+sprache]) + '</div>');
			}

			//------------------------------------------------------
			//	Table: 7. Row (both columns)
			//------------------------------------------------------
			if (data.old_name || data['historic:name']){
			result.push ('</td></tr><tr><td class="field7" rowspan="1" colspan="2">')};

			if (data.old_name) {

				result.push ('<div class="">' + this.html("$$Historischer Name%%: " +
					data.old_name) + '</div>');
			}

			if (data['historic:name'] ) {

				result.push ('<div class="">' + this.html("$$Historischer Name%%: " +
					data['historic:name']) + '</div>');
			}
			
			//------------------------------------------------------
			//	Table: 8. Row (both columns)
			//------------------------------------------------------

			if (data.start_date || data.end_date|| data['construction:date'] || data.year) {
				result.push ('</td></tr><tr><td class="field8" rowspan="1" colspan="2">')
			};
			var start_date_str = (data.start_date);
				
			if (typeof start_date_str !== 'undefined') {
				var start_date_new = start_date_str.replace("after","$$nach%% ").replace("\.\."," - ").replace("before","$$vor%% ").replace("\~","$$um%% ").replace("C11","11. $$Jahrhundert%%").replace("C12","12. $$Jahrhundert%%").replace("C13","13. $$Jahrhundert%%").replace("C14","14. $$Jahrhundert%%").replace("C15","15. $$Jahrhundert%%").replace("C16","16. $$Jahrhundert%%").replace("C17","17. $$Jahrhundert%%").replace("C18","18. $$Jahrhundert%%").replace("C19","19. $$Jahrhundert%%").replace("C20","20. $$Jahrhundert%%").replace("C21","21. $$Jahrhundert%%").replace("C22","22. $$Jahrhundert%%").replace("BC","$$vor Christus%%").replace("mid","$$Mitte%% ").replace("late","$$gegen Ende%% ").replace("early","$$Anfang%% ");
				
				var start_date_tree =  (data.natural=='tree' && data.start_date);
				var start_date_artwork = (data.tourism=='artwork' && data.start_date);
				if (start_date_tree) {

					result.push ('<div class="">' + this.html("$$Pflanzjahr%%: " +
					start_date_new) + '</div>');
				} 
				if (sprache == 'de' && start_date_artwork) {

					result.push ('<div class="">' + this.html("Entstanden: " +
						start_date_new) + '</div>');
				} 
				else if (data.start_date !== start_date_tree || start_date_artwork) {
                
					result.push ('<div class="">' + this.html("$$Erbaut%%: " +
						start_date_new) + '</div>');
				}
				}
				
			if (data.year) {

				result.push ('<div class="">' + this.html("$$Erbaut%%: " +
					data.year) + '</div>');
			}
			
			if (data['construction:date']) {

				result.push ('<div class="">' + this.html("$$Erbaut%%: " +
					data['construction:date']) + '</div>');
			}
			
			if (data.end_date) {

				result.push ('<div class="">' + this.html("$$Ende%%: " +
					data.end_date) + '</div>');
			}

			//------------------------------------------------------
			//	Table: 9. Row (both columns)
			//------------------------------------------------------

			if (data.description || data['description:'+sprache]) {
				result.push ('</td></tr><tr><td class="field9" rowspan="1" colspan="2">')};

			if (data['description:'+sprache]) {
				result.push ('<div class="description">' + this.html("$$Beschreibung%%: " +
					data['description:'+sprache]) + '</div>');
			}
			else if (data['description']) {
					result.push ('<div class="description">' + this.html("$$Beschreibung%%: " +
						data['description']) + '</div>');
			}
            if (data['historic:civilization']) {
				result.push ('</td></tr><tr><td class="field9" rowspan="1" colspan="2">')};
                
            if (data['historic:civilization']) {
				result.push ('<div class="description">' + this.html("Civilization: " +
					data['historic:civilization']) + '</div>');
			}
			//------------------------------------------------------
			//	Table: 10. Row (both columns)
			//------------------------------------------------------

			if (data['heritage:operator']) {

				var ops = data['heritage:operator'].split(';');
				var names = [];

				for (opIndex in ops) {

					op = OpenLayers.String.trim (ops[opIndex]);
					if (!op) continue;

					var name = HeritageOperatorNames[op] || op;
						data['heritage:operator'];
					var ref = data['ref:' + op];
					if (ref) name += ' (' + ref + ')';

					names.push(name);
				}

				if (names.length) {
					if (data['heritage:operator'] || data['ref:whc']) {
						result.push ('</td></tr><tr><td class="field10" rowspan="1" colspan="2"><div>')};
						result.push (this.html(
							"$$geschützt durch%%: " + names.join(', ')));
						result.push ('</div>');
					if (data['ref:whc']) {
						result.push ('<div class="wikidata">World Heritage List:&nbsp;<a target="_blank" href="' +
							this.html('https://whc.unesco.org/en/list/'+(data['ref:whc'])) + '">' + this.html(this.shrinkUrl(data['ref:whc'])) +
							'</a></div>');
					}
				}
			}

			//------------------------------------------------------
			//	Table: 18. Row (both columns)
			//------------------------------------------------------
			if (wikidata || subject_wikidataURL) {
				result.push ('</td></tr><tr><td class="field11" rowspan="1" colspan="2">')};
            
			//------------------------------------------------------
			//	Wikidata Reasonator
			//------------------------------------------------------
			if (wikidata) {
				result.push ('<div class="Reasonator">'+"$$Mehr Infos von%%"+' Reasonator:&nbsp;<a target="_blank" href="' +
					this.html('https://tools.wmflabs.org/reasonator/?q='+wikidata[1]) +'&lang='+ sprache + '">'+ this.html(this.shrinkUrl(wikidata[1])) +
						'<img src="../../../i/Reasonator.png" border="0"title="Reasonator"></a></div>');
				
			}

			//------------------------------------------------------
			//	subject:wikidata
			//------------------------------------------------------
			if (subject_wikidataURL) {
				result.push ('<div class="Reasonator">'+"$$Mehr Infos von%%"+' Reasonator:&nbsp;<a target="_blank" href="' +
					this.html('https://tools.wmflabs.org/reasonator/?q='+subject_wikidataURL[1]) +'&lang='+ sprache + '">'+ this.html(this.shrinkUrl(subject_wikidataURL[1])) +
						'<img src="../../../i/Reasonator.png" border="0"title="Reasonator"></a></div>');
				
			}

			//------------------------------------------------------
			//	Table: 11. Row (both columns)
			//------------------------------------------------------
			if (websiteURL || heritagewebsiteURL) {
				result.push ('</td></tr><tr><td class="field11" rowspan="1" colspan="2">')};

			//------------------------------------------------------
			//	Website
			//------------------------------------------------------
			if (websiteURL) {
				result.push ('<div class="website">$$Webseite%%:&nbsp;<a target="_blank" href="' +
					this.html(websiteURL) + '">' + this.html(this.shrinkUrl(websiteURL)) +
						'</a></div>');
			}
            //------------------------------------------------------
			//	Heritage Website
			//------------------------------------------------------
			if (heritagewebsiteURL) {
				result.push ('<div class="website">Heritage $$Webseite%%:&nbsp;<a target="_blank" href="' +
					this.html(heritagewebsiteURL) + '">' + this.html(this.shrinkUrl(heritagewebsiteURL)) +
						'</a></div>');
			}
			
			//------------------------------------------------------
			//	Table: 12. Row (both columns)
			//------------------------------------------------------
			if (wikipediaURL || wikimedia_commonsURL || subject_wikipediaURL) {
				result.push ('</td></tr><tr><td class="field11" rowspan="1" colspan="2">')};
			
			//------------------------------------------------------
			//	Wikipedia
			//------------------------------------------------------

			if (wikipediaURL) {
				result.push ('<div class="wikipedia">Wikipedia:&nbsp;<a target="_blank" href="' +
					this.html(wikipediaURL) + '">' + this.html(this.shrinkUrl(wikipediaURL)) +
						'</a></div>');
			}
			//------------------------------------------------------
			//	subject:wikipedia
			//------------------------------------------------------

			if (subject_wikipediaURL) {
				result.push ('<div class="wikipedia">Wikipedia:&nbsp;<a target="_blank" href="' +
					this.html(subject_wikipediaURL) + '">' + this.html(this.shrinkUrl(subject_wikipediaURL)) +
						'</a></div>');
			}
			//------------------------------------------------------
			//	wikimedia_commons
			//------------------------------------------------------
			
			if (wikimedia_commonsURL) {
				result.push ('<div class="wikipedia">Wikimedia Commons:&nbsp;<a target="_blank" href="' +
					this.html('https://commons.wikimedia.org/wiki/'+wikimedia_commonsURL) + '">' + this.html(this.shrinkUrl(wikimedia_commonsURL)) +
						'</a></div>');
			}
			
			//------------------------------------------------------
			//	Table: 13. Row (both columns)
			//------------------------------------------------------

			if (data['openplaques:id'] || data['ref:FR:MemorialGenWeb'] || data['ref:OnroerendErfgoed'] 
				|| data['ref:bldam'] || data['ref:mhs'] || data['ref:lfdh'] || data['ref:LfDH'] 
				|| data['ref:npu'] || inBerlin|| inSachsen || data['ref:kgs'] || inBremen 
				|| data['ref:clt'] || data['ref:rce'] || data['ref:at:bda'] || data['ref:AT:bda'] 
				|| data['ref:ropiky.net']|| data['ref:hs'] || data['ref:he'] || ['ref:MDG'] 
				|| data['HE_ref'] || data['ref:cadw']|| data['ref:lt:kpd'] || data['ref:nrhp']) {

				result.push ('</td></tr><tr><td class="field11" rowspan="1" colspan="2">')
			};

			//------------------------------------------------------
			//	Openplaques
			//------------------------------------------------------
			
			if (data['openplaques:id']) {
				result.push ('<div class="heritage">Openplaques:&nbsp;<a target="_blank" href="' +
					this.html('https://openplaques.org/plaques/'+(data['openplaques:id'])) + '">' + this.html(this.shrinkUrl(data['openplaques:id'])) +
						'</a></div>');
			}
			//------------------------------------------------------
			//	Mapillary
			//------------------------------------------------------
			
			if (data['mapillary']) {
				result.push ('<div class="heritage">Mapillary:&nbsp;<a target="_blank" href="' +
					this.html('https://www.mapillary.com/app/?focus=photo&pKey='+(data['mapillary'])) + '">' + this.html(this.shrinkUrl('Mapillary images CC-BY-SA')) +
						'</a></div>');
			}
			//------------------------------------------------------
			//	Mémorial Gen Web 
			//------------------------------------------------------

			if (data['ref:FR:MemorialGenWeb']) {
				result.push ('<div class="heritage">Mémorial Gen Web:&nbsp;<a target="_blank" href="' +
					this.html('https://www.memorialgenweb.org/memorial3/html/fr/resultcommune.php?idsource='+(data['ref:FR:MemorialGenWeb'])) + '">' + this.html(this.shrinkUrl(data['ref:FR:MemorialGenWeb'])) +
						'</a></div>');
			}

			//------------------------------------------------------
			//	Onroerend Erfgoed
			//------------------------------------------------------
			if (data['ref:OnroerendErfgoed']) {
				result.push ('<div class="heritage">Bescherming Vlaams Gewest:&nbsp;<a target="_blank" href="' +
					this.html('https://inventaris.onroerenderfgoed.be/erfgoedobjecten/'+(data['ref:OnroerendErfgoed']||'')) + '">' + this.html(this.shrinkUrl(data['ref:OnroerendErfgoed'])) +
						'</a></div>');
			}

			//------------------------------------------------------
			//	Rijksdienst voor het Cultureel Erfgoed 
			//------------------------------------------------------
			if (data['ref:rce']) {
				result.push ('<div class="heritage">Rijksdienst voor het Cultureel Erfgoed :&nbsp;<a target="_blank" href="' +
					this.html('https://monumentenregister.cultureelerfgoed.nl/monumenten/'+(data['ref:rce'])) + '">' + this.html(this.shrinkUrl(data['ref:rce'])) +
						'</a></div>');
			}

			//------------------------------------------------------
			//	ref:MDG
			//------------------------------------------------------
			if (data['ref:MDG']) {
				result.push ('<div class="heritage">Schutz Deutschsprachige Gemeinschaft:&nbsp;<a target="_blank" href="' +
					this.html('https://www.ostbelgienkulturerbe.be/desktopdefault.aspx/tabid-3557/linkid-'+(data['ref:MDG'] ||'')) + '">' + this.html(this.shrinkUrl(data['ref:MDG'])) +
						'</a></div>');
			}

			//------------------------------------------------------
			//	Protection Wallonie INV
			//------------------------------------------------------
			if (data['ref:MDG'] && INV) {
				result.push ('<div class="heritage">Info Région wallonne:&nbsp;<a target="_blank" href="' +
					this.html('https://spw.wallonie.be/dgo4/site_ipic/index.php/fiche/index?codeInt='+(data['ref:clt'] ||'')) + '">' + this.html(this.shrinkUrl(data['ref:clt'])) +
						'</a></div>');
				
			}
			else if (INV) {
				result.push ('<div class="heritage">Protection Région wallonne:&nbsp;<a target="_blank" href="' +
					this.html('https://spw.wallonie.be/dgo4/site_ipic/index.php/fiche/index?codeInt='+(data['ref:clt'] ||'')) + '">' + this.html(this.shrinkUrl(data['ref:clt'])) +
						'</a></div>');
				
			}

			//------------------------------------------------------
			//	Protection Wallonie CLT
			//------------------------------------------------------
			if (data['ref:MDG'] && CLT) {
				result.push ('<div class="heritage">Info Région wallonne:&nbsp;<a target="_blank" href="' +
					this.html('https://spw.wallonie.be/dgo4/site_thema/index.php/dossier/view/BC_PAT/'+(data['ref:clt'] ||'')) + '">' + this.html(this.shrinkUrl(data['ref:clt'])) +
						'</a></div>');
			}
			else if (CLT) {
				result.push ('<div class="heritage">Protection Région wallonne:&nbsp;<a target="_blank" href="' +
					this.html('https://spw.wallonie.be/dgo4/site_thema/index.php/dossier/view/BC_PAT/'+(data['ref:clt'] ||'')) + '">' + this.html(this.shrinkUrl(data['ref:clt'])) +
						'</a></div>');
			}

			//------------------------------------------------------
			//	bldam-brandenburg
			//------------------------------------------------------
			if (data['ref:bldam']) {
				result.push ('<div class="heritage">bldam-brandenburg:&nbsp;<a target="_blank" href="' +
					this.html(BLDAM) + '">' + this.html(this.shrinkUrl(data['ref:bldam'])) +
						'</a></div>');
			}
			
			//------------------------------------------------------
			//	ref:lfdh
			//------------------------------------------------------
			if (data['ref:lfdh'] || data['ref:LfDH']) {
				result.push ('<div class="heritage">denkmalpflege-hessen.de:&nbsp;<a target="_blank" href="' +
					this.html('https://denkxweb.denkmalpflege-hessen.de/'+(data['ref:lfdh'] || data['ref:LfDH']||'')) + '">' + this.html(this.shrinkUrl(data['ref:lfdh'] || data['ref:LfDH'])) +
						'</a></div>');
			}

			//------------------------------------------------------
			//	denkmaldatenbank.berlin
			//------------------------------------------------------
			if (inBerlin && data['ref:lda']) {
				result.push ('<div class="heritage">denkmaldatenbank.berlin:&nbsp;<a target="_blank" href="' +
					this.html('https://denkmaldatenbank.berlin.de/daobj.php?obj_dok_nr='+(data['ref:lda']||'')) + '">' + this.html(this.shrinkUrl(data['ref:lda'])) +
						'</a></div>');
			}
			
			//------------------------------------------------------
			//	Landesamt für Denkmalpflege Bremen
			//------------------------------------------------------
			if (inBremen && data['ref:lfd']) {
				result.push ('<div class="heritage">LfD Bremen:&nbsp;<a target="_blank" href="' +
					this.html('https://denkmalpflege.bremen.de/sixcms/detail.php?template=20_denkmal_wrapper_d&obj=0000'+(data['ref:lfd']||'')) + '">' + this.html(this.shrinkUrl(data['ref:lfd'])) +
						'</a></div>');
			}

			//------------------------------------------------------
			//	Landesamt für Denkmalpflege Sachsen
			//------------------------------------------------------
			if (inSachsen && data['ref:lfd']) {
				result.push ('<div class="heritage">LfD Sachsen:&nbsp;<a target="_blank" href="' +
					this.html('https://denkmalliste.denkmalpflege.sachsen.de/CardoMap/Denkmalliste_Report.aspx?HIDA_Nr='+(data['ref:lfd']||'')) + '">' + this.html(this.shrinkUrl(data['ref:lfd'])) +
						'</a></div>');
			}

			//------------------------------------------------------
			//	ref:mhs
			//------------------------------------------------------
			if (data['ref:mhs']) {
				result.push ('<div class="heritage">culture.gouv.fr:&nbsp;<a target="_blank" href="' +
					this.html('https://www.pop.culture.gouv.fr/notice/merimee/'+(data['ref:mhs']||'')) + '">' + this.html(this.shrinkUrl(data['ref:mhs'])) +
						'</a></div>');
			}
			//------------------------------------------------------
			//	ref:npu
			//------------------------------------------------------
			if (data['ref:npu']) {
				result.push ('<div class="heritage">Národní památkový ústav:&nbsp;<a target="_blank" href="' +
					this.html('https://pamatkovykatalog.cz/?mode=parametric&indexId='+(data['ref:npu']||'').toLowerCase())+'&presenter=ElementsResults' + '">' + this.html(this.shrinkUrl(data['ref:npu'])) +
						'</a></div>');
			}

			//------------------------------------------------------
			//	KGS Schweiz
			//------------------------------------------------------
			if (data['ref:kgs']) {
				result.push ('<div class="heritage">Kulturgüterschutzinventar BABS geo.admin.ch:&nbsp;<a target="_blank" href="' +
					this.html('https://api3.geo.admin.ch/rest/services/kgs/MapServer/ch.babs.kulturgueter/'+(data['ref:kgs'])+'/extendedHtmlPopup?lang=de') + '">' + this.html(this.shrinkUrl(data['ref:kgs'])) +
						'</a></div>');
			}

			//------------------------------------------------------
			//	ref:at:bda
			//------------------------------------------------------
			if (data['ref:at:bda'] || data['ref:AT:bda']) {
				result.push ('<div class="heritage">wmflabs.org/denkmalliste:&nbsp;<a target="_blank" href="' +
					this.html('https://tools.wmflabs.org/denkmalliste/index.php?action=EinzelID&ID='+(data['ref:at:bda'] || data['ref:AT:bda']||'')) + '">' + this.html(this.shrinkUrl(data['ref:at:bda'] || data['ref:AT:bda'])) +
						'</a></div>');
			}

			//------------------------------------------------------
			//	ref:ropiky.net
			//------------------------------------------------------
			if (data['ref:ropiky.net']) {
				result.push ('<div class="heritage">ropiky.net:&nbsp;<a target="_blank" href="' +
					this.html('https://www.ropiky.net/dbase_objekt.php?id='+(data['ref:ropiky.net'] ||'')) + '">' + this.html(this.shrinkUrl(data['ref:ropiky.net'])) +
						'</a></div>');
			}

			//------------------------------------------------------
			//	ref:hs
			//------------------------------------------------------
			if (data['ref:hs']) {
				result.push ('<div class="heritage">Historic Scotland:&nbsp;<a target="_blank" href="' +
					this.html('https://portal.historicenvironment.scot/designation/'+(data['ref:hs'] ||'')) + '">' + this.html(this.shrinkUrl(data['ref:hs'])) +
						'</a></div>');
			}

			//------------------------------------------------------
			//	ref:he HE_ref
			//------------------------------------------------------
			if (data['ref:he'] || data['HE_ref']) {
				result.push ('<div class="heritage">Historic England:&nbsp;<a target="_blank" href="' +
					this.html('https://www.historicengland.org.uk/listing/the-list/list-entry/'+(data['ref:he'] || data['HE_ref'] ||'')) + '">' + this.html(this.shrinkUrl(data['ref:he'] || data['HE_ref'])) +
						'</a></div>');
				result.push ('<div class="heritage">British Listed Buildings:&nbsp;<a target="_blank" href="' +
					this.html('https://www.britishlistedbuildings.co.uk/10'+(data['ref:he'] || data['HE_ref'] ||'')) + '">' + this.html(this.shrinkUrl(data['ref:he'] || data['HE_ref'])) +
						'</a></div>');
			}

			//------------------------------------------------------
			//	ref:cadw
			//------------------------------------------------------
			if (data['ref:cadw']) {
				var cadw_split = data['ref:cadw'].split(';');
				var cadw_2 = cadw_split[1];
				var cadw_1 = cadw_split[0];
				result.push ('<div class="heritage">Cadw:&nbsp;<a target="_blank" href="' +
					this.html('https://cadwpublic-api.azurewebsites.net/reports/listedbuilding/FullReport?lang=en&id='+(cadw_2 || cadw_1 ||'')) + '">' + this.html(this.shrinkUrl(cadw_2 || cadw_1 ||'')) +
						'</a></div>');

				result.push ('<div class="heritage">British Listed Buildings:&nbsp;<a target="_blank" href="' +
					this.html('https://www.britishlistedbuildings.co.uk/wa-'+(cadw_2 || cadw_1 ||'')) + '">' + this.html(this.shrinkUrl(cadw_2 || cadw_1 ||'')) +
						'</a></div>');
			}

			//------------------------------------------------------
			//	ref:lt:kpd
			//------------------------------------------------------
			if (data['ref:lt:kpd']) {
				result.push ('<div class="heritage">Heritage Lithuania:&nbsp;<a target="_blank" href="' +
					this.html('https://kvr.kpd.lt/heritage/Pages/KVRDetail.aspx?lang=lt&MC='+(data['ref:lt:kpd'] ||'')) + '">' + this.html(this.shrinkUrl(data['ref:lt:kpd'])) +
						'</a></div>');
			}

			//------------------------------------------------------
			//	ref:nrhp
			//------------------------------------------------------
			if (data['ref:nrhp']) {
				result.push ('<div class="heritage">National Register of Historic Places:&nbsp;<a target="_blank" href="' +
					this.html('https://npgallery.nps.gov/AssetDetail/NRIS/'+(data['ref:nrhp'] ||'')) + '">' + this.html(this.shrinkUrl(data['ref:nrhp'])) +
						'</a></div>');
			}

            //------------------------------------------------------
			//	ref:nld
			//------------------------------------------------------
			if (data['ref:nld']) {
				result.push ('<div class="heritage">Niedersächsisches Landesamt für Denkmalpflege:&nbsp;<a target="_blank" href="' +
					this.html('https://denkmalatlas.niedersachsen.de/viewer/metadata/'+(data['ref:nld'] ||'')) + '/' + '">' + this.html(this.shrinkUrl(data['ref:nld'])) +
						'</a></div>');
			}
			
			//------------------------------------------------------
			//	Table: 14. Row (both columns)
			//------------------------------------------------------
			//------------------------------------------------------
			//	Wikidata
			//------------------------------------------------------
			
			if (wikidata) {
				result.push ('<div class="wikidata">Wikidata ('+wikidata[1]+'):&nbsp;<a target="_blank" href="' +
					this.html('https://www.wikidata.org/wiki/'+wikidata[1]) + '">' + 
						'<img src="../../../i/wikidata.png" border="0"title="Wikidata" ></a>  <a target="_blank" href="' +
					this.html('https://tools.wmflabs.org/reasonator/?q='+wikidata[1]) + '">' +
						'<img src="../../../i/Reasonator.png" border="0"title="Reasonator" ></a> <a target="_blank" href="' +
					this.html('https://tools.wmflabs.org/sqid/#/view?id='+wikidata[1]) + '">' +
						'<img src="../../../i/sqid.png" border="0" title="SQID"></a> <a target="_blank" href="' +
					this.html('https://tools.wmflabs.org/portal/'+wikidata[1]) + '/' +sprache + '">' +
						'<img src="../../../i/wikidata.png" border="0" title="Portal"></a></div>');
				
			}

			//------------------------------------------------------
			//	inscription:url
			//------------------------------------------------------

			if (data['inscription:url']) {
				result.push ('<div class="website">$$Webseite%%:&nbsp;<a target="_blank" href="' +
					this.html(data['inscription:url']) + '">' + this.html(this.shrinkUrl(data['inscription:url'])) +
						'</a></div>');
			}

			//------------------------------------------------------
			//	Geopedia
			//------------------------------------------------------

			if (wikipediaURL) {
				result.push ('<div class="wikipedia">$$Umgebung mit%% Geopedia:&nbsp;<a target="_blank" href="' +
					this.html(geopediaURL) + '">' + this.html(this.shrinkUrl(geopediaURL)) +
						'</a></div>');
			}

			//------------------------------------------------------
			//	Table: 16. Row (both columns)
			//------------------------------------------------------
			if (wikidata) {
				result.push ('</td></tr><tr><td class="field11" rowspan="1" colspan="2">')};
            
			//------------------------------------------------------
			//	Wikishootme / OSM Wikidata
			//------------------------------------------------------
			if (wikidata) {
				result.push ('<div class="Wikidata">Help Wikidata:&nbsp;<a target="_blank" href="' +
					this.html(wikishootmeURL) + '">' +
						'Wikishootme</a>, &nbsp;<a target="_blank" href="' + 
					this.html('https://osm.wikidata.link/'+wikidata[1]) + '">' +
						'OSM↔Wikidata</a></div>');

			}

			//------------------------------------------------------
			//	Table: Ende
			//------------------------------------------------------

			result.push ('</td></tr></tbody></table>');

			//------------------------------------------------------
			//	End of Cooked, start of Raw
			//------------------------------------------------------

			result.push ('</div><div class="raw" style="display: none">');

			//------------------------------------------------------
			//	Table: 1. Row (both columns)
			//------------------------------------------------------
			result.push ('<table><tbody>');
			result.push ('</td></tr><tr><td class="field12" rowspan="1" colspan="2">');

			//------------------------------------------------------
			//	Content
			//------------------------------------------------------

			var objtyp = '';
			switch ((data['~size']||'').substr(0,1)) {

			case 'p':
				objtyp = "$$Punkt%%";
				break;
			case 'l':
				objtyp = "$$Linie%%";
				break;
			case 'a':
				objtyp = "$$Fläche%%";
				break;
			default:
				break;
			}

			result.push ('<div class="object"> $$Objekt%% ('+objtyp+'): <a target="_blank" href="' +
				this.html(osmURL) + '">' + data.id + '</a></div>');

			//------------------------------------------------------
			//	Edit
			//------------------------------------------------------

			result.push ('<div class="edit">$$Bearbeiten mit%%:&nbsp;' +
				josmHTML + ',&nbsp' + idHTML + '&nbsp;$$oder%%&nbsp;' + potlatchHTML + '</div>');

			//------------------------------------------------------
			//	Raw tags (Key/value)
			//------------------------------------------------------

			result.push (
				OpenLayers.Layer.PopupMarker.prototype.createHtmlFromData.apply(this,[data]));

			//------------------------------------------------------
			//	Debug: BILDRELOAD
			//------------------------------------------------------

			if (imageSourceURL) {

				var debugURL = this.thumbBaseURL + encodeURIComponent(imageSourceURL) + '&DEBUG=2';

				result.push ('<div style="text-align: right; font-size: xx-small"><a target="_blank" href="' +
					this.html(debugURL) + '">Thumb</a></div>');
			}

			//------------------------------------------------------
			//	End Raw, End Tabs
			//------------------------------------------------------
			result.push ('</td></tr></tbody></table>');
			result.push ('</div></div>');

			return result.join('\n');
		},

		//--------------------------------------------------------------
		//
		//	Lookup wikipedia URL in data
		//
		//--------------------------------------------------------------

		getWikipediaURL: function (data) {

			//------------------------------------------------------
			//	wikipedia = LANG : LEMMA
			//------------------------------------------------------

			match = (data.wikipedia||'').match(/^([a-z]+):([^\;]*[^\;\s])([;\s].*)?$/);
			if (match) {
				return 'https://' + match[1] + '.wikipedia.org/wiki/' +
					match[2].replace(/\040/g, '_');
			}

			//------------------------------------------------------
			//	wikipedia = http[s]://LANG.wikipedia.org/wiki/LEMMA
			//	wikipedia = LANG.wikipedia.org/wiki/LEMMA
			//------------------------------------------------------

			match = (data.wikipedia||'').match(/^(https?:\/\/)?(\w+\.wikipedia\.org\/wiki\/[^\/;]*[^\/;\s])([;\s].*)?$/);
			if (match) { return 'https://' + match[2]; }

			//------------------------------------------------------
			//	wikipedia : LANG = ...
			//------------------------------------------------------

			for (var tag in data) {

				var tagMatch = tag.match(/^wikipedia:([a-z]+)$/);

				if (!tagMatch) continue;

				//----------------------------------------------
				//	wikipedia : LANG = LEMMA
				//----------------------------------------------

				valueMatch = data[tag].match(/^([^\/;]*[^\/;\s])\s*$/);
				if (valueMatch) {
					return 'https://' + tagMatch[1] + '.wikipedia.org/wiki/' +
						valueMatch[1].replace(/\040/g, '_');
				}

				//----------------------------------------------
				//	wikipedia : LANG = http[s]://LANG.wikipedia.org/wiki/LEMMA
				//	wikipedia : LANG = LANG.wikipedia.org/wiki/LEMMA
				//----------------------------------------------

				valueMatch = data[tag].match(/^(https?:\/\/)?(\w+\.wikipedia\.org\/wiki\/[^;\s\/]+)([\s;].*)?$/);
				if (valueMatch) {
					return 'https://' + valueMatch[2];
				}
			}

			//------------------------------------------------------
			//	No wikipedia
			//------------------------------------------------------

			return null;
		},
		
		//--------------------------------------------------------------
		//
		//	Lookup subject:wikipedia URL in data
		//
		//--------------------------------------------------------------

		getsubject_WikipediaURL: function (data) {

			//------------------------------------------------------
			//	wikipedia = LANG : LEMMA
			//------------------------------------------------------

			match = (data['subject:wikipedia'] ||'').match(/^([a-z]+):([^\;]*[^\;\s])([;\s].*)?$/);
			if (match) {
				return 'https://' + match[1] + '.wikipedia.org/wiki/' +
					match[2].replace(/\040/g, '_');
			}

			//------------------------------------------------------
			//	wikipedia = http[s]://LANG.wikipedia.org/wiki/LEMMA
			//	wikipedia = LANG.wikipedia.org/wiki/LEMMA
			//------------------------------------------------------

			match = (data['subject:wikipedia'] ||'').match(/^(https?:\/\/)?(\w+\.wikipedia\.org\/wiki\/[^\/;]*[^\/;\s])([;\s].*)?$/);
			if (match) { return 'https://' + match[2]; }

			//------------------------------------------------------
			//	wikipedia : LANG = ...
			//------------------------------------------------------

			for (var tag in data) {

				var tagMatch = tag.match(/^wikipedia:([a-z]+)$/);

				if (!tagMatch) continue;

				//----------------------------------------------
				//	wikipedia : LANG = LEMMA
				//----------------------------------------------

				valueMatch = data[tag].match(/^([^\/;]*[^\/;\s])\s*$/);
				if (valueMatch) {
					return 'https://' + tagMatch[1] + '.wikipedia.org/wiki/' +
						valueMatch[1].replace(/\040/g, '_');
				}

				//----------------------------------------------
				//	wikipedia : LANG = http[s]://LANG.wikipedia.org/wiki/LEMMA
				//	wikipedia : LANG = LANG.wikipedia.org/wiki/LEMMA
				//----------------------------------------------

				valueMatch = dat2[tag].match(/^(https?:\/\/)?(\w+\.wikipedia\.org\/wiki\/[^;\s\/]+)([\s;].*)?$/);
				if (valueMatch) {
					return 'https://' + valueMatch[2];
				}
			}

			//------------------------------------------------------
			//	No subject:wikipedia
			//------------------------------------------------------

			return null;
		},


		//--------------------------------------------------------------
		//
		//	parse URL
		//
		//--------------------------------------------------------------

		parseURL: function (url) {

			if (!url) return null;

			var match = (url+'').match (/^\s*(https?:\/\/)?([^:\s\/]+(:\d+)?)((\/[^\s;]*)?)([;\s].*)?$/);

                        // match[1]: protocol https://
                        // match[2]: url+Port  a.b.c:4711
                        // match[3]: :Port
                        // match[4]: Rest
                        // match[5]: /name ohne blank
                        // match[6]: ; und/oder blank + rest
                        // if (match) { return (match[1] || 'https://') + match[2] + (match[4] || '/'); }

                        // match5 muss mit / beginnen wenn das eine richtige URL war

                        if (match && match[5]) { return (match[1] || 'https://') + match[2] + (match[4] || '/'); }

			match = url.match (/^(File:.*\S)/);
			if (match) { return 'https://commons.wikimedia.org/wiki/' + match[1].replace(/\040/g,'_'); }

			return null;
		},

		//--------------------------------------------------------------
		//
		//	Erzeuge osm-Links fuer ~user
		//
		//--------------------------------------------------------------

		formatValue: function (text, tag) {

			var value = OpenLayers.Layer.PopupMarker.prototype.formatValue.apply (this, arguments);

			if (tag=='~u') {

				var url = 'https://www.openstreetmap.org/user/' + text;
				value = '<a target="_blank" href="' + this.html(url) + '">' + value + '</a>';
			}

			return value;
		},

		//--------------------------------------------------------------
		//
		//	Erzeugt eine Kurzbeschreibung zu einem Objekt
		//
		//--------------------------------------------------------------

		createInfoFromData: infoFromData,	// from config.js

		//--------------------------------------------------------------------
		//	get object length or area
		//--------------------------------------------------------------------

		getSizeFromData: function (data) {

			if (!data['~size']) { return null; }

			var value = parseInt (data['~size'].substr(1));
			var digits = Math.floor (Math.log(value) / Math.log(10));

			switch (data['~size'].substr(0,1)) {

			case 'l':
				if (value <= 1e3) return value + String.fromCharCode(8239) + 'm';
				return (value/1e3).toFixed (Math.max(0,6-digits)) + String.fromCharCode(8239) + 'km';
				break;
			case 'a':
				if (value <= 1e4) return value + String.fromCharCode(8239) + 'm²';
				if (value <= 1e6) return (value/1e4).toFixed (Math.max(0,7-digits)) + String.fromCharCode(8239) + 'ha';
				return (value/1e6).toFixed (Math.max(0,9-digits)) + String.fromCharCode(8239) + 'km²';
				break;
			default:
				return null;
			}
		},

		//--------------------------------------------------------------------
		//	link to up/down-switch
		//--------------------------------------------------------------------

		detail:  0,

		getDetail: function () {

			return this.detail;
		},

		setDetail: function (newDetail) {

			if (newDetail < -3) newDetail = -3;
			if (newDetail > +3) newDetail = +3;

			if (newDetail==this.detail) return this.detail;

			this.detail = newDetail;

			if (!this.map.permalinkParams) this.map.permalinkParams = {};
			this.map.permalinkParams.detail = this.detail;

			this.map.events.triggerEvent('changelayer',{
				layer: this,
				property: 'detail'
			});

			this.moveTo (this.map.getExtent(), this.map.getZoom(), false);
			return this.detail;
		},

		//--------------------------------------------------------------------
		//	object groups
		//--------------------------------------------------------------------

		classByType: {
			'collection': 'site',
			'route': 'route',
			'site': 'site'
		},

		undefinedMarkerIconUrl: '../../../m/reddot.png',
		undefinedMarkerIconScale: 0.6,

		//--------------------------------------------------------------------
		//	map zoom level to set of groups
		//--------------------------------------------------------------------

		createUrlForBounds: function (bounds) {

			var level = this.map.getZoom() + this.detail;

			return '../../../c/csv.phtml?db=historic'+
				'&zoom='+level+
				'&bbox='+bounds.left+','+bounds.bottom+','+bounds.right+','+bounds.top;
		},

		clusterMinZoom: 13,
		clusterSize: 16,
		clusterLimit: 50,

		osmlinks: false,
		minZoom: 6,
		blockSize: 0
	}));
