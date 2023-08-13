//==============================================================================
//	$Id$
//==============================================================================

var sprache='SPRACHE';		// wird durch preprozessor ersetzt

var start_x1;		// Startausschnitt W
var start_x2;		// Startausschnitt O
var start_y1;		// Startausschnitt S
var start_y2;		// Startausschnitt N

// Startausschnitt festlegen
switch ( sprache ) {
case 'de':
	start_x1 = 5.88;
	start_x2 = 15.04;
	start_y1 = 47.26;
	start_y2 = 54.91;
	break;
case 'fr':
	start_x1 = -7;
	start_x2 = 12;
	start_y1 = 42;
	start_y2 = 51;
	break;
case 'nl':
	start_x1 = 0.84;
	start_x2 = 9.6;
	start_y1 = 50.4;
	start_y2 = 53.8;
	break;
case 'pt-br':
	start_x1 = -90;
	start_x2 = -20;
	start_y1 = -33;
	start_y2 = 8;
	break;
case 'cs':
	start_x1 = 12; 
	start_x2 = 19;
	start_y1 = 48,5;
	start_y2 = 51.1;
	break;
case 'es':
	start_x1 = -9.8; 
	start_x2 = 4.5;
	start_y1 = 35.7;
	start_y2 = 43.9;
	break;
case 'gl':
	start_x1 = -10.3; 
	start_x2 = -3.3;
	start_y1 = 40.3;
	start_y2 = 44.3;
	break;
case 'ro':
	start_x1 = 20.2; 
	start_x2 = 30.5;
	start_y1 = 43.5;
	start_y2 = 48.7;
	break;
case 'tr':
	start_x1 = 25.5; 
	start_x2 = 44.9;
	start_y1 = 34.8;
	start_y2 = 42.4;
	break;
case 'ru':
	start_x1 = 38.804; 
	start_x2 = 83.452;
	start_y1 = 52.080;
	start_y2 = 63.685;
	break;
case 'da':
	start_x1 = 8; 
	start_x2 = 15.2;
	start_y1 = 54.5;
	start_y2 = 57.8;
	break;
case 'pl':
	start_x1 = 14; 
	start_x2 = 24.2;
	start_y1 = 48.9;
	start_y2 = 55.5;
	break;
case 'ja':
	start_x1 = 126; 
	start_x2 = 146;
	start_y1 = 26;
	start_y2 = 45.5;
	break;
case 'hu':
	start_x1 = 14; 
	start_x2 = 23;
	start_y1 = 45;
	start_y2 = 49;
	break;
case 'ko':
        start_x1 = 124.2;
        start_x2 = 130.8;
        start_y1 = 33.2;
        start_y2 = 43;
        break;
case 'uk':
        start_x1 = 22.1;
        start_x2 = 40.3;
        start_y1 = 44.4;
        start_y2 = 52.4;
        break;
case 'it':
        start_x1 = 5.8;
        start_x2 = 19.3;
        start_y1 = 36.0;
        start_y2 = 47.6;
        break;
default:
	start_x1 = -23;
	start_x2 = 46;
	start_y1 = 35;
	start_y2 = 62;
	break;
}

//------------------------------------------------------------------------------
//	avoid pink tiles
//------------------------------------------------------------------------------

OpenLayers.IMAGE_RELOAD_ATTEMPTS = 4;
OpenLayers.Util.onImageLoadErrorColor = "transparent";

//------------------------------------------------------------------------------
//	Schaltet die Beschreibung der Karte an- und aus.
//	Toggles the description of the map.
//------------------------------------------------------------------------------

function toggleInfo() {

	var state = document.getElementById('description').className;

	if (state == 'hide') {
		// Info anzeigen
		document.getElementById('description').className = '';
		//document.getElementById('descriptionToggle').innerHTML = text[1];
	} else {
		// Info verstecken
		document.getElementById('description').className = 'hide';
		//document.getElementById('descriptionToggle').innerHTML = text[0];
	}
}

function toggleInfo2() {

	var state = document.getElementById('description2').className;

	if (state == 'hide') {
		// Info anzeigen
		document.getElementById('description2').className = '';
		//document.getElementById('descriptionToggle').innerHTML = text[1];
	} else {
		// Info verstecken
		document.getElementById('description2').className = 'hide';
	
	}
}
function toggleInfo3() {

	var state = document.getElementById('description3').className;

	if (state == 'hide') {
		// Info anzeigen
		document.getElementById('description3').className = '';
		//document.getElementById('descriptionToggle').innerHTML = text[1];
	} else {
		// Info verstecken
		document.getElementById('description3').className = 'hide';
	
	}
}
//------------------------------------------------------------------------------
//	LayerGroup ferngesteuert öffnen
//------------------------------------------------------------------------------

function open_group (groupId) {
        LC.maximizeControl();
        if ( LC.groupsHidden[groupId] ) {
                LC.groupsHidden[groupId] = false;
                LC.redraw(true);
        }
}


//------------------------------------------------------------------------------
//	On load build map
//------------------------------------------------------------------------------

OpenLayers.ImgPath = '../../../j/ol/img/';
var map;
var allPermaIds = "";
var allPins = "";

window.onload = function () {
    
    //----------------------------------------------------------------------
	//	fix default passive==true in newer FF and Chrome
	//----------------------------------------------------------------------

        var oldWinAddEvtLis = window.addEventListener;
        window.addEventListener = function( name, listener, useCapture ) {
		return oldWinAddEvtLis.apply( window, [ name, listener,
		{ capture: useCapture, passive: name != 'DOMMouseScroll' }]);
	}

	//----------------------------------------------------------------------
	//	Karte - der Name ("map") muss mit der id des <div> uebereinstimmen.
	//----------------------------------------------------------------------

	map = new OpenLayers.Map ("map", {controls:[]});

	//----------------------------------------------------------------------
	//	Default-Koordinatensystem fuer alle Controls
	//----------------------------------------------------------------------

	map.displayProjection = new OpenLayers.Projection("EPSG:4326");

	//----------------------------------------------------------------------
	//	Steuerelemente
	//----------------------------------------------------------------------

	//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

	//----------------------------------------------------------------------------
	//	Layer changer
	//----------------------------------------------------------------------------

        // LC ist global, wird auch von globus-Button aus getriggert

	map.addControl (LC = new OpenLayers.Control.LayerChanger({
		withFullZoomButton: true,
		withDeleteButton: true,
	  
	  //--------------------------------------------------------------------
		//	Leere Layergruppen werden *nicht* dargestellt.
		//	Angezeigte Gruppen bekommen die hier gewählte Reihenfolge.
		//--------------------------------------------------------------------
		//	Drei Gruppen 'main', 'data' und 'ctrl' werden automatisch
		//	angelegt, wenn sie hier nicht definiert sind, und zwar wird
		//	'main' vorangestellt und 'data' und 'ctrl' werden angehängt.
		//--------------------------------------------------------------------
		//	Ist dieses Attribut nicht definiert oder ein leeres Array,
		//	entspricht die Anzeige der vom LayerSwitcher bekannten.
		//--------------------------------------------------------------------
		//	Baselayers ohne "layerGroup:" kommen die Gruppe 'main',
		//	andere Layer in die Gruppe 'data', und Controls nach 'ctrl'.
		//--------------------------------------------------------------------
                enableAutoClose: true,
		controlOpacity: true,
		minOpacity:             0.2,


		textShowLayerChanger:   "$$Kartenebenen%%",
		textHideLayerChanger:   "$$Fenster schließen%%",
		textHeaderControls:     "$$Steuerelemente%%",
		textShowGroup:          "$$Zeigt diese Gruppe%%",
		textHideGroup:          "$$Versteckt diese Gruppe%%",
		textShowLayer:          "$$Zeigt diese Ebene%%",
		textHideLayer:          "$$Versteckt diese Ebene%%",
		textMakeBaseLayer:      "$$Wählt diese Ebene als Basisebene%%",
		textShowControl:        "$$Zeigt dieses Steuerelement%%",
		textHideControl:        "$$Versteckt dieses Steuerelement%%",
		textMinusLayerOpacity:  "$$Verringert die Deckkraft der Ebene%%",
		textPlusLayerOpacity:   "$$Erhöht die Deckkraft der Ebene%%",
		textMinusControlOpacity:"$$Verringert die Deckkraft des Steuerelements%%",
		textPlusControlOpacity: "$$Erhöht die Deckkraft des Steuerelements%%",
		textZoomIn: "$$Bitte zuerst von ${zoom} auf ${minZoom} hineinzoomen%%",
		textFullZoom:		"$$Zoomt auf Ausdehnung%%",
	        textDelete:		"$$Entfernt das Layer%%",
		

		//minimizeButtonImageURL: '../../i/b/rarrow.gif',
		maximizeButtonImageURL: '../../../i/layers-icon.png',

		// Gruppen "main" und "data" werden automatisch ergaenzt.
		layerGroups: [
			{id: 'main', name: "$$Grundkarte%%", hidden: true},
			{id: 'link', name: "$$Verweise auf Fremdkarten%%", hidden: true},
			{id: 'oldmap', name: "$$Historische Karten%%", hidden: true},
			{id: 'opendata', name: 'Open Data', hidden: true},
			{id: 'info', name: "$$Hilfsebenen%%", hidden: true},
			{id: 'freizeit', name: "$$Freizeit%%", hidden: true},
			{id: 'ctrl', name: "$$Steuerelemente%%", hidden: true},
			{id: 'linie', name: "$$Historische Objekte%%", hidden: true},
			{id: 'osm', name: "$$Objekte Bearbeiten%%", hidden: true},
			{id: 'download', name: "$$Downloads%%", hidden: true},
			{id: 'local', name: "$$Lokale Dateien%%", hidden: true}
		],
		
		//--------------------------------------------------------------------
		//	Kartenlinks
		//--------------------------------------------------------------------

		mapLinks: [
		{
			label: 'OpenStreetMap',
			title: 'Gleichen Bereich auf der Hauptkarte darstellen',
			baseURL: 'https://www.openstreetmap.org/#map={zoom}/{lat}/{lon}',
			target: 'osm'
		}, 
		{
			label: 'OpenStreetMap mit Notes',
			baseURL: 'https://www.openstreetmap.org/#map={zoom}/{lat}/{lon}&layers=N',
			target: 'osm'
		}, 
		{
			label: 'Lonvia\x27s Hiking Map',
			baseURL: 'https://hiking.waymarkedtrails.org/#?map={zoom}!{lat}!{lon}',
			target: 'lhm'
		},
		{
			label: 'OpenStreetBrowser',
			baseURL: 'https://openstreetbrowser.org/#map={zoom}/{lat}/{lon}',
			target: 'osb'
		},
		{
			label: 'Open Place Reviews',
			baseURL: 'https://openplacereviews.org/map?q={zoom}/{lat}/{lon}',
			target: 'opr'
		},
		{
			label: 'BRouter',
			baseURL: 'https://brouter.de/brouter-web/#zoom={zoom}&lat={lat}&lon={lon}&layer=OpenStreetMap',
			target: 'router'
		},
		{
			label: "$$Topografische Karte von Maxbe%%",
			baseURL: 'https://geo.dianacht.de/topo/?zoom={zoom}&lat={lat}&lon={lon}',
			bounds: new OpenLayers.Bounds(10.00, 47.00, 13.25, 48.65),
			target: 'topo'
		}, 
		{
			label: 'Wikimedia/Wikipedia on OSM',
			baseURL: 'https://tools.wmflabs.org/wikimap/?zoom={zoom}&lat={lat}&lon={lon}',
			//bounds: new OpenLayers.Bounds(10.00, 47.00, 13.25, 48.65),
			target: 'wikimedia'
		},
        {
			label: 'Geopedia',
			baseURL: 'https://www.geopedia.de/?m=0&lat={lat}&lon={lon}&l=en&z={zoom}',
		//	bounds: new OpenLayers.Bounds(10.00, 47.00, 13.25, 48.65),
			target: 'wikimedia'
		},
		//{
		//	label: 'Peripleo Places',
		//	baseURL: 'https://pelagios.org/peripleo/map#at={lat},{lon},{zoom}&ex=true',
		//	bounds: new OpenLayers.Bounds(10.00, 47.00, 13.25, 48.65),
		//	target: 'pelagios'
		//},
		{
			label: 'Archaeological Atlas of Antiquity (Vici.org)',
			bounds: new OpenLayers.Bounds(-15.34, 25.01, 68.55, 59.62),
			baseURL: 'https://vici.org/selectview.php?center={lat},{lon}&zoom={zoom}&labels=1',
			target: 'vici'
		},
		{
			label: 'Flickr',
			baseURL: 'https://www.flickr.com/map?fLat={lat}&fLon={lon}&zl={zoom}&everyone_nearby=1',
		//	bounds: new OpenLayers.Bounds(10.00, 47.00, 13.25, 48.65),
			minZoom: 13,
			target: 'flickr'
		},
		{
			label: 'Mapillary',
			baseURL: 'https://www.mapillary.com/app/?lat={lat}&lng={lon}&z={zoom}',
			minZoom: 13,
			target: 'mapillary'
		},
		{
			label: 'OpenStreetCam',
			baseURL: 'https://openstreetcam.org/map/@{lat},{lon},{zoom}z',
			minZoom: 13,
			target: 'openstreetCam'
		},
	//	{
	//		label: 'Geolocation',
	//		baseURL: 'https://geolocation.ws/map/{lat},{lon}/{zoom}/en?types=Q%2CP%2CE%2CG%2CW%2CF%2CI%2CU%2CK%2CL&limit=300&licenses=',
	//		minZoom: 13,
	//		target: 'geolocation'
	//	}, 
		{
			label: 'OSM-Inspector',
			baseURL: 'https://tools.geofabrik.de/osmi/?lon={lon}&lat={lat}&zoom={zoom}',
		//	bounds: new OpenLayers.Bounds(10.00, 47.00, 13.25, 48.65),
			target: 'osmi'
		}, 
		{
			label: 'BBox-Selector',
			baseURL: '../../../tools/selectbbox.htm',
		//	bounds: new OpenLayers.Bounds(10.00, 47.00, 13.25, 48.65),
			target: 'bbox-selector'
		}, 
		{
			positionInLayerChanger: 1,
			layerGroup: 'oldmap',
			label: "$$Übersichtskarte über verfügbare historische Karten%%",
			baseURL: '../../../Layer_Boundaries/',
		//	bounds: new OpenLayers.Bounds(10.00, 47.00, 13.25, 48.65),
			target: 'overview'
		}, 
		{
			layerGroup: 'osm',
			label: "$$Bearbeiten mit JOSM%%",
			baseURL: 'http://127.0.0.1:8111/load_and_zoom?left={left}&bottom={bottom}&right={right}&top={top}',
			minZoom: 12,
			target: 'josm'
		}, 
		{
			layerGroup: 'osm',
			label: "$$Bearbeiten mit iD%%",
			baseURL: 'https://www.openstreetmap.org/edit?editor=id&zoom={zoom}&lat={lat}&lon={lon}',
			minZoom: 14,
			target: 'edit'
		}, 
		{
			layerGroup: 'osm',
			label: "$$Bearbeiten mit Potlatch%%",
			baseURL: 'https://www.openstreetmap.org/edit?editor=potlatch2&zoom={zoom}&lat={lat}&lon={lon}',
			minZoom: 14,
			target: 'edit'
		},
		{
			label: 'Wikimapia',
			baseURL: 'https://wikimapia.org/#lang=de&lat={lat}&lon={lon}&z={zoom}&m=b&tag=1107',
			minZoom: 14,
			target: 'wikimapia'
		},
		{
			label: 'Geograph UK',
			baseURL: 'https://www.geograph.org.uk/mapper/coverage.php#zoom={zoom}&lat={lat}&lon={lon}&layers=FTTB00000000000FT',
			minZoom: 14,
			bounds: new OpenLayers.Bounds(-12.89693,49.92449,2.48393,59.42395),
			target: 'geograph'
		},
		{
			label: 'Geograph DE',
			baseURL: 'https://geo.hlipp.de/search.php?q={lat},{lon}&distance=5',
			minZoom: 12,
			bounds: new OpenLayers.Bounds(5.185546875,46.845703125,15.46875,55.634765625),
			target: 'geograph'
		},
		{
			label: 'Wikishootme',
			baseURL: 'https://tools.wmflabs.org/wikishootme/#lat={lat}&lng={lon}&zoom=16&layers=commons,flickr,mixnmatch,wikidata_image,wikidata_no_image,wikipedia',
			minZoom: 14,
			target: 'wikishootme'
		},
		{
			label: 'Wikidata Nearby',
			baseURL: 'https://www.wikidata.org/wiki/Special:Nearby#/coord/{lat},{lon}',
			minZoom: 14,
			target: 'wikidata'
		},
		{
			label: 'Wikidata Monumental',
			baseURL: 'https://tools.wmflabs.org/monumental/#/map?c={lat}:{lon}:{zoom}&heritage=1',
			minZoom: 14,
			target: 'wikidata'
		},
		{
			label: 'IGZD-DDR',
			baseURL: 'http://mgv-srb.de/map/projecteXd.html?PoI?{lat}?{lon}?{zoom}?icon',
			minZoom: 9,
			bounds: new OpenLayers.Bounds(5.185546875,46.845703125,15.46875,55.634765625),
			target: 'wikidata'
		},
		{
			label: 'IGZD-Infrastruktur',
			baseURL: 'http://mgv-srb.de/map/projecteXi.html?PoI?{lat}?{lon}?{zoom}?icon',
			minZoom: 9,
			bounds: new OpenLayers.Bounds(5.185546875,46.845703125,15.46875,55.634765625),
			target: 'wikidata'
		},
		{
			label: 'IGZD-Museen',
			baseURL: 'http://mgv-srb.de/map/projecteXm.html?PoI?{lat}?{lon}?{zoom}?icon',
			minZoom: 9,
			bounds: new OpenLayers.Bounds(5.185546875,46.845703125,15.46875,55.634765625),
			target: 'wikidata'
		}
		]
	

	}));
	//----------------------------------------------------------------------------
	//	Control zum Nachladen von Karten
	//----------------------------------------------------------------------------

	map.addControl (new OpenLayers.Control.UserTiles({

		displayInLayerSwitcher: true,

		layerGroup: 'usertiles',
		userTilesVisibility: true,
		debug: true
	}));

	//----------------------------------------------------------------------------
	//	Download der No-Image-GPX
	//----------------------------------------------------------------------------

	map.addControl (new OpenLayers.Control ({
                layerGroup: 'download',
		displayInLayerSwitcher: true,
		title: 'Download No-Image-GPX',
		autoActivate: false,
		autoDeactivate: true,

		draw: function() {
			this.element = document.createElement('a');
			document.getElementsByTagName('body')[0].appendChild(this.element);
		},

		activate: function() {

			if (!OpenLayers.Control.prototype.activate.apply(this, arguments)) return false;

			var bounds = this.map.calculateBounds().
				transform(this.map.getProjectionObject(), this.map.displayProjection);
			var url = mlayer.createUrlForBounds(bounds) + '&format=gpx&image=f';
			this.element.href = url;
			this.element.download = true;
			this.element.click();
			return true;
		}
	}));

	//----------------------------------------------------------------------------
	//	Download GPX
	//----------------------------------------------------------------------------

	map.addControl (new OpenLayers.Control ({
                layerGroup: 'download',
		displayInLayerSwitcher: true,
		title: 'Download GPX',
		autoActivate: false,
		autoDeactivate: true,

		draw: function() {
			this.element = document.createElement('a');
			document.getElementsByTagName('body')[0].appendChild(this.element);
		},

		activate: function() {

			if (!OpenLayers.Control.prototype.activate.apply(this, arguments)) return false;

			var bounds = this.map.calculateBounds().
				transform(this.map.getProjectionObject(), this.map.displayProjection);
			var url = mlayer.createUrlForBounds(bounds) + '&format=gpx';
			this.element.href = url;
			this.element.download = true;
			this.element.click();
			return true;
		}
		

	}));

	//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	
	
//	map.addControl (new OpenLayers.Control.LayerSwitcher());
	map.addControl (new OpenLayers.Control.Attribution({
        displayInLayerSwitcher: true,
        active: true
}));
	map.addControl (new OpenLayers.Control.LocalTracks( {     
		displayInLayerSwitcher: true,
		textButtonTitle: "$$Lese GPX-Datei(en) aus dem lokalen Dateisystem%%",
		textFileSizeWarning: '$$Die Datei ${name} ist ${size} Bytes groß%%.\n' +
		"$$Das Laden kann etwas dauern. Fortsetzen?%%",  
		textButtonLabel: "$$GPX einlesen%%"}));
	map.addControl (new OpenLayers.Control.LoadStatus(
		{html: '<img src="../../../i/ajax-loader.gif" /><br />$$Laden%%...<br/>${layers}'}));

	map.addControl (new OpenLayers.Control.MousePosition({

		formatOutput: function(lonLat) {
			var lola = OpenLayers.Control.MousePosition.prototype.formatOutput.apply(
					this, arguments);
			return 'Z' + this.map.getZoom() + ' ' + lola;
		},

		setMap: function() {
			OpenLayers.Control.MousePosition.prototype.setMap.apply(this, arguments);
			this.map.events.register('moveend',this,function(evt) {
				evt.xy = this.lastXy;
				this.redraw (evt);
			});
		}
	}));

	var navControl = new OpenLayers.Control.Navigation({title: 'Pan/Zoom'});
	map.addControl (navControl);
	// map.addControl (new OpenLayers.Control.Navigation());
	// map.addControl (new OpenLayers.Control.PanZoomBar());
	map.addControl (new OpenLayers.Control.ScaleLine());
	map.addControl (new OpenLayers.Control.ZoomWithDisplay({title: "$$Karten-Zoom%%"}));
	map.addControl (new OpenLayers.Control.ZoomStatus({
		defaultHtml: '<b>Zoom=${actual}, $$bei Zoom=${next} werden weitere Daten eingeblendet%%</b>' }));

	//----------------------------------------------------------------------
	//	Suchbox
	//----------------------------------------------------------------------

	map.addControl (new OpenLayers.Control.SearchBox({
	  
	  	resource: OpenLayers.Util.extend(
			OpenLayers.Control.SearchBox.prototype.resource, {
				textLabel: '$$Suche%%:'
				// für die historischen Objekte nehmen wir dann "Suche (Historische Objekte)"
		}),
		// lang: 'de',
		lang: sprache,
		textNoHits: '$$Kein Treffer%%.',
		resultMinZoom: 16,
		defaultLimit: 50,
		minDistance: 50,
		resultMinZoom: 16,
                autoClose: false,
		textKeepOpen: "$$Stehen lassen%%",

		translate: function (clasz, type) {

			var dict = OpenLayers.NominatimTranslation && OpenLayers.NominatimTranslation[this.lang];

			var trans = dict && dict[clasz+'.'+type];
			if (trans) { return trans; }

			OpenLayers.Request.GET({
                                // url: "https://gk.historic.place/c/log.php?" +
                                url: "../../../c/log.php?" +
					"log=nominatim" + "&lang=" +
					this.lang + "&class=" + clasz + "&type=" + type
                        });

			return clasz+'='+type;
		},

		startSearch: function (q) {
			var match = q.match(/^\s*([nwr][1-9]\d*)\s*$/);
			if (!match) return OpenLayers.Control.SearchBox.prototype.startSearch.apply(this, arguments);
			this.resultDiv.className='busy';
			var control = this; // for closure
			OpenLayers.Request.GET({
				url: '../../../c/csv.phtml?db=historic&id='+match[1],
				success: function (request) {
					control.resultDiv.className='success';
					var lines = OpenLayers.String.trim(request.responseText+'').split('\n');
					if (lines.length<2) {alert ('Object "' + q + '" not in database.'); return; }
					var fields=lines[1].split('\t');
					this.map.moveTo(new OpenLayers.LonLat(fields[1], fields[2]).
					transform(map.displayProjection, map.getProjectionObject()), 16);
				},
				failure: function (request) {
					control.resultDiv.className='failure';
				}
			});
		}
	}));
	
	//----------------------------------------------------------------------------
	//	Distance-Measurement-Control
	//----------------------------------------------------------------------------

	//map.addControl(new OpenLayers.Control.Measure.Distance({

	//	geodesic: true,
	//	 permaId: 'Sd',
	//	formatResult: function (measure, units) {

	//		if (units=='m') return measure.toFixed(0) + ' ' + units;
        //        	return measure.toFixed(3) + ' ' + units;
       // 	}
	//}));
	//----------------------------------------------------------------------------
	//	Messwerkzeug
	//----------------------------------------------------------------------------

	map.addControl (new OpenLayers.Control.MeasureTool({

		title:			"$$Messwerkzeug%% [F9]",
                permaId: 'Sd',
		textLength:		'Länge: ${value}',

		infoDivId:		'helptext',

		autoActivate:		false,
		activationKeyCode:	120,		// F9

		resetOnDeactivate:	false,

		clearKeyCode:		27,		// "Esc"
		deleteLastKeyCode:	[8, 46],	// BACKSPACE, "Entf"
		zoomToExtentKeyCode:	[9],		// TAB
		reverseKeyCode:		[36]		// "Pos1"
	}));

	//----------------------------------------------------------------------------
	//	Routing-Control
	//----------------------------------------------------------------------------

     //   map.addControl (new OpenLayers.Control.OSRMRouting());
	//map.addControl (new OpenLayers.Control.OSRMViaRouting( { permaId: 'Sr' }));


	map.addControl (new OpenLayers.Control.MeasureTool({

		title:			'Routing OSRM V5 [F4]',
                permaId: 'Sr',
		//textLength:		'Entfernung: ${value}',
		textLength:		'Routing mit der OSRM-API V5',
		textNoWay:		'Kein Weg gewählt',
		textAnalyzing:		'Suche Route ...',

		infoDivId:		'helptext-osrm',

		autoActivate:		false,
		//activationKeyCode:	115,		// F4

		resetOnDeactivate:	false,

		clearKeyCode:		27,		// "Esc"
		deleteLastKeyCode:	[8, 46],	// BACKSPACE, "Entf"
		zoomToExtentKeyCode:	9,		// TAB
		reverseKeyCode:		36,		// "Pos1"
		analyzerKeyCode:	45,		// "Einf"
		toggleLineKeyCode:	35,		// "Ende"

		enableAnalyzer:		true,

		markerStyleFirst: {
			externalGraphic: '../../../i/nadel_blau_28x28.png',
			graphicWidth:	28,
			graphicHeight:	28,
			graphicXOffset:	0,
			graphicYOffset:	-28,
			graphicZIndex:	5,
			title: 'Click to select, Strg-Click to delete',
			cursor: 'move'
		},

		markerStyle: {
			externalGraphic: '../../../i/nadel_gelb_24x25.png',
			graphicWidth:	24,
			graphicHeight:	25,
			graphicXOffset:	0,
			graphicYOffset:	-25,
			graphicZIndex:	4,
			title: 'Strg-Click to delete',
			cursor: 'move'
		},

		markerStyleLast: {
			externalGraphic: '../../../i/nadel_rot_26x30.png',
			graphicWidth:	26,
			graphicHeight:	30,
			graphicXOffset:	0,
			graphicYOffset:	-30,
			graphicZIndex:	6,
			title: 'Strg-Click to delete',
			cursor: 'move'
		},

		markerStyleAux: {
			graphicName: 'circle',
			pointRadius: 4,
			strokeWidth: 1,
			strokeColor: 'blue',
			fillColor: 'blue',
			fillOpacity: 0.3,
			graphicZIndex:	2,
			cursor: 'move'
		},

		lineStyle: {
			strokeColor: 'blue',
			strokeWidth: 5,
			strokeOpacity: 0.3,
			graphicZIndex:	1
		},

		analyzer:	OSRM_ANALYZER
	}));
	//----------------------------------------------------------------------------
	//	Geolocation
	//----------------------------------------------------------------------------

	map.addControl (new OpenLayers.Control ({

		displayInLayerSwitcher: !!navigator.geolocation,
		permaId: 'Sl',
		title: "$$auf aktuellen Standort zoomen%%",
		description: 'Geolocation',
		autoActivate: false,

		activate: function() {

			if (!OpenLayers.Control.prototype.activate.apply(this, arguments)) return false;

			//------------------------------------------------------------
			//	start geolocating
			//------------------------------------------------------------

			var control = this;

			navigator.geolocation.getCurrentPosition (

				function (position) {

					map.setCenter (new OpenLayers.LonLat(
						position.coords.longitude, position.coords.latitude).
						transform(new OpenLayers.Projection("EPSG:4326"),
							map.getProjectionObject()), Math.max(map.getZoom(), 14));
					control.deactivate()
				},

				function () {

					control.deactivate()
					alert ('XXX Geolocation: position could not be determined.');
				},

				{enableHighAccuracy: true, maximumAge: 1000}
			);

			return true;
		},

		deactivate: function() {

			var result = OpenLayers.Control.prototype.deactivate.apply(this);
			if (result) {
				this.map.events.triggerEvent('changelayer', {
					layer: this, property: 'visibility'
				});
			}
			return result;
		}

	}));
/*	//----------------------------------------------------------------------
	//	Uebersichtskarte
	//----------------------------------------------------------------------

	 var overviewMap = new OpenLayers.Control.OverviewMap({title: "$$Navigationsfenster%%", permaId: 'Sf',displayInLayerSwitcher: true});
         map.addControl (overviewMap);
	  overviewMap.div.style.display='none';
*/
	//----------------------------------------------------------------------
	//	Permalink modifiziert fuer "detail"
	//----------------------------------------------------------------------

	var mlayer;

	map.addControl (PL = new OpenLayers.Control.Permalink('permalink', null, {

		draw:function() {

			OpenLayers.Control.Permalink.prototype.draw.apply(this,arguments);
			this.map.events.on({
				'popupopen': this.updateLink,
				'popupclose': this.updateLink,
				scope:this
			});
			this.updateLink();
			return this.div;
		},

		createParams: function () {
			var params = OpenLayers.Control.Permalink.prototype.createParams.apply(this, arguments);
			if (this.map.permalinkParams) {
				params = OpenLayers.Util.extend(params, this.map.permalinkParams);
			}
			delete params.select;
			delete params.layers;
			delete params.pins;
			if (mlayer && mlayer.currentPopup && mlayer.currentPopup.markerId) {
				params.select = mlayer.currentPopup.markerId;
			}
			params.pid = allPermaIds;
			if ( allPins ) params.pins = allPins;
			return params;
		}
	}));



	//----------------------------------------------------------------------------
	//	Kompass im LS
	//----------------------------------------------------------------------------

	var compass = new OpenLayers.Control ({

		displayInLayerSwitcher: true,
		permaId: 'Sk',
		title: "$$Kompass%%",

		draw: function() {

			var img = document.createElement('img');
			img.src='../../../i/angles_300x233.png';

			var div = OpenLayers.Control.prototype.draw.apply(this);
			div.style.left='50%';
			div.style.top='50%';
			div.style.marginLeft='-175px';
			div.style.marginTop='-175px';
			div.style.display='none';	// wenn beim Start ausgeblendet sein soll
			div.style.pointerEvents='none';
			div.appendChild(img);

			return div;
		},

		activate: function() {

			if (!OpenLayers.Control.prototype.activate.apply(this, arguments)) return false;

			this.div.style.display='';
			return true;
		},

		deactivate: function() {

			if (!OpenLayers.Control.prototype.deactivate.apply(this, arguments)) return false;

			this.div.style.display='none';
			return true;
		}
	});

	map.addControl (compass);





	//----------------------------------------------------------------------
	//	Tooltipschalter
	//----------------------------------------------------------------------

	map.addControl (new OpenLayers.Control ({

		title: "$$Namen%%",

		displayInLayerSwitcher: true,
		permaId: 'Sn',

		bodyElement: document.getElementsByTagName('body')[0],

		activate: function() {

			if (!OpenLayers.Control.prototype.activate.apply(this)) return false;
			OpenLayers.Element.addClass(this.bodyElement, 'on');
			return true;
		},

		deactivate: function() {

			if (!OpenLayers.Control.prototype.deactivate.apply(this)) return false;
			OpenLayers.Element.removeClass(this.bodyElement, 'on');
			return true;
		}
	}));

	
	//----------------------------------------------------------------------
	//	Umgeht Openlayerlimit von 75 Layern
	//----------------------------------------------------------------------
	OpenLayers.Map.prototype.Z_INDEX_BASE.Feature = 2000;
        OpenLayers.Map.prototype.Z_INDEX_BASE.Popup = 4000;
	OpenLayers.Map.prototype.Z_INDEX_BASE.Control = 5000;
	
	var baseLayerControl = {

		map: map,

		oldMapClass: null,

		onChange: function (event) {

			var layer = event.layer;

			if (layer.minZoom && this.map.getZoom() < layer.minZoom) {

				this.map.zoomTo(layer.minZoom);
			}

			if (this.oldMapClass) {

				OpenLayers.Element.removeClass(this.map.viewPortDiv, this.oldMapClass);
			}

			this.oldMapClass = layer.mapClassName;

			if (this.oldMapClass) {

				OpenLayers.Element.addClass(this.map.viewPortDiv, this.oldMapClass);
			}
		}
	};

	map.events.register('changebaselayer', baseLayerControl, baseLayerControl.onChange);

// ###############################################################################

HPLACE_INCLUDE baselayer.inc
HPLACE_INCLUDE supportlayer.inc
HPLACE_INCLUDE leisurelayer.inc
HPLACE_INCLUDE opendata.inc


// ########################## Ende der Denkmalkarten #################################


	//----------------------------------------------------------------------
	//	Globus div rot und grün machen wenn neue/weniger hist Layer
	//----------------------------------------------------------------------

        function alert_globe (color) {
                var showTime = 1000;

                document.getElementById('globus').src  = '../../../m/globus-' + color + '.png';
                // alert (document.getElementById('globus').src);
                window.setTimeout("document.getElementById('globus').src = '../../../m/globus-blau.png'", showTime);
        }


	//----------------------------------------------------------------------
	//	Übersichtskarte zu hist Layer an und ausschalten
	//----------------------------------------------------------------------

        var areaBbox = new OpenLayers.Bounds(0,0,0,0);
        var hist_layers_visible = 0;


        function flip_map_area(mylayer,myarea,zoomstart) {

                var rand_percentage = 0;				// letztlich unused
                var maxZoomDist = 5;
                var min_relation = 0.3;

                // min_relation beeinflusst ab welchem zoom wird hist layer box im LC angezeigt
                // hohe Aufloesung - frueher anzeigen
                if ( screen.availHeight > 900 ) { min_relation = 0.1; };
                if ( screen.availHeight > 1100 ) { min_relation = 0.03; };

                if ( myarea.extentBox == null ) { return; };            // not yet ready

                var zLevel = map.getZoom();
                areaBbox.left   = myarea.extentBox.left;
                areaBbox.bottom = myarea.extentBox.bottom;
                areaBbox.right  = myarea.extentBox.right;
                areaBbox.top    = myarea.extentBox.top;

                var ausdehnung_layer =
                        (areaBbox.right - areaBbox.left + areaBbox.top - areaBbox.bottom)/2;

                var ausdehnung_viewport = (map.getExtent().right - map.getExtent().left
                                         + map.getExtent().top - map.getExtent().bottom) / 2;

                var dx = (areaBbox.right - areaBbox.left) * rand_percentage / 100;
                var dy = (areaBbox.top - areaBbox.bottom) * rand_percentage / 100;
                areaBbox.left   -= dx;
                areaBbox.right  += dx;
                areaBbox.bottom -= dy;
                areaBbox.top    += dy;

                var newvis =
                        map.getExtent().intersectsBounds(areaBbox) &&
                        (ausdehnung_layer / ausdehnung_viewport > min_relation);

                if ( mylayer.displayInLayerSwitcher != newvis ) {
                        hist_layers_visible += (newvis ? 1 : -1);
                        document.getElementById('globusdiv').title  =
                                '$$Historische Karten im Ausschnitt%%: ' + hist_layers_visible;
                        mylayer.displayInLayerSwitcher = newvis;
                        LC.redraw(true);
                        alert_globe ( newvis ? 'gruen' : 'rot' );
                }

                if ( mylayer.getVisibility() == true ) {        // angeklickt
                        if( zLevel >= zoomstart ) {
                            myarea.setVisibility(false);
                        }
                        else {
                            myarea.setVisibility(newvis);
                        }
                } else {
                    myarea.setVisibility(false);
                };

        }



	function merge (hash1, hash2) {
		for (var attrname in hash2) { 
			hash1[attrname] = hash2[attrname]; 
		}
	}

	function alertHash (hash1) {
		var s = "";
		for (var attrname in hash1) { 
			s += attrname + " " + hash1[attrname] + "\n"; 
		}
		alert (s);
	}

	// common settings für historische Layer
	var settingDefaults = {
		layerGroup: 'oldmap',
		positionInLayerChanger: 2,
		minZoom: 13,
		numZoomLevels: 16,
		opacity: 0.5,
		sphericalMercator: true,
		isBaseLayer: false,
		displayInLayerSwitcher: false,
		visibility: false
	}

        //----------------------------------------------------------------------
	// 	Overview map für historische Karten
        //----------------------------------------------------------------------

        function newOverviewMap (title, layer, subdir, minZoom) {
                var newarea = new OpenLayers.Layer.Vector(title, {
                        sphericalMercator: true,
                        isBaseLayer: false,
                        visibility: true,
                        extentBox: null,
                        noLoadStatus: true,
                        displayInLayerSwitcher: false,
			//
			// getDataExtent() setzt visibility voraus.  Wir speichern den extent
			// zwischen und schalten visiblity erst dann aus.
			//
                        eventListeners: { 
				'loadend': function() {
					this.extentBox = this.getDataExtent();
					this.setVisibility(false);
				} 
			},
                        strategies: [new OpenLayers.Strategy.Fixed()],
                        protocol: new OpenLayers.Protocol.HTTP({
                                url: "../../../shape/" + subdir + ".json",
                                format: new OpenLayers.Format.GeoJSON()
                        })
                });

                map.addLayer (newarea);

                map.events.register('moveend', newarea,
                        function(event) { flip_map_area (layer,newarea,minZoom) });

                map.events.register('changelayer', this,
                        function(event) { flip_map_area (layer,newarea,minZoom)});

                return;
        }



        //----------------------------------------------------------------------
        //      Historische Karten hinzufügen (lokale tiles)
	//	Konvention: tiles unter https://tiles.historic.place/<subdir>
	//		    shape files unter /shape/<subdir>.json
        //----------------------------------------------------------------------

        function addHistmapTiles (title, urlPart, subdir, layerSettings) 

	{
		minZoom = this.minZoom;		// OO magic

		// define some defaults that may be overwritten
		finalSettings = {
			getURL: function(bounds) {
                                if (this.map.getZoom()>=this.minZoom) {
                                        return OpenLayers.Layer.XYZ.prototype.getURL.apply(this, arguments);
                                }
                                return 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
			}
		};
			
		merge (finalSettings, settingDefaults);
		merge (finalSettings, layerSettings);
		// alertHash (finalSettings);

		tiles_prefix = "https://tiles.historic.place/" + urlPart;
		if ( urlPart.indexOf("http") >= 0) {
                        tiles_prefix = urlPart;
                }

                var newlay = new OpenLayers.Layer.XYZ(title,
			[ tiles_prefix + "/${z}/${x}/${y}.png" ],
			finalSettings);

                map.addLayer (newlay);
		newOverviewMap (title, newlay, subdir, finalSettings["minZoom"]);

        }

        //----------------------------------------------------------------------
        //      Historische Karten hinzufügen (über WMS service)
	//	Konvention: shape files unter /shape/<subdir>.json
        //----------------------------------------------------------------------

        function addHistmapWMS (title, wmsUrl, wmsName, subdir, layerSettings) 

	{
		minZoom = this.minZoom;		// OO magic

		// define some defaults that may be overwritten
		finalSettings = {
			getURL: function(bounds) {
                                if (this.map.getZoom()>=this.minZoom) {
                                        return OpenLayers.Layer.WMS.prototype.getURL.apply(this, arguments);
                                }
                                return 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
			},
			// wird nur bei WMS gebraucht?
			sphericalMercator: true,
			projection: "EPSG:3857"
		};
			
		merge (finalSettings, settingDefaults);
		merge (finalSettings, layerSettings);
		// alertHash (finalSettings);

                var newlay = new OpenLayers.Layer.WMS(title, wmsUrl,
			{
			    layers: wmsName,
			    transparent: true,
			    format: "image/jpeg"
			},
			finalSettings);

                map.addLayer (newlay);
		newOverviewMap (title, newlay, subdir, finalSettings["minZoom"]);

        }


        //----------------------------------------------------------------------
	//	
        //      ab hier können jetzt die einzelnen historischen Karten definiert
	//	werden. Entweder mit addHistmapTiles oder addHistmapWMS
	//
	//	default settings stehen weiter oben in settingDefaults. Nur wenn etwas 
	//	davon abweicht, muss es im Parameter layerSettings beim Aufruf
	//	angegeben werden
	//
	//	Parameter:
	//	title: 		OpenLayer Name der Karte
	//	urlPart: 	bei lokalen tiles Teil des Pfades zu den Tiles
	//	wmsUrl:		URL zu den WMS-Daten inkl. "?" (Server)
	//	wmsName: 	Name der Karte auf dem WMS-Server
	//	subdir: 	hier liegen die shapes für den Overview
	//	layerSettings:	hashtable mit speziellen settings für diesen layer
	//	
        //----------------------------------------------------------------------


// ########################## Beginn der historische Karten #########################

HPLACE_INCLUDE histmap-tiles.inc
HPLACE_INCLUDE histmap-wms.inc

// ########

	
	//--------------------------------------------------------------
	//	NLS UK Ordnance Survey map from 1920-1947
	//	Spezialfall: API
	//--------------------------------------------------------------
	
	{

	// Define the XYZ-based layer for NLS Map
	OpenLayers.Layer.NLS = OpenLayers.Class(OpenLayers.Layer.XYZ, {
		name: "NLS Maps API",
		positionInLayerChanger: 4,
		permaId: 'Gl',
		attribution: '<a href="https://geo.nls.uk/maps/api/" target="_blank">NLS Maps API<\/a>',
		getURL: NLSTileUrlOS,
		sphericalMercator: true,
		layerGroup: 'oldmap',
		transitionEffect: 'resize',
		isBaseLayer: false,
		visibility: false,
		displayInLayerSwitcher: false,
		description: 'Ordnance Survey map from 1920-1947 National Library of Scotland',
		opacity: 0.5,
		numZoomLevels: 12,
		CLASS_NAME: "OpenLayers.Layer.NLS"
	});
		
	var nls = new OpenLayers.Layer.NLS( "NLS Ordnance Survey map from 1920-1947");

	map.addLayer(nls);
	newOverviewMap (nls.name, nls, "gb1920", 5);

	}


//############################    Ende der historischen Karten #############################
       

       
	//--------------------------------------------------------------
	//	Filter fuer Vectorobjekte
	//--------------------------------------------------------------

	var filter = new OpenLayers.Filter.Comparison({
		evaluate: function(context) {
			var style = styleFromData (context.attributes, context);
			if (typeof(style)!='boolean') context.style=style;
			return !!style;
		}
	});

        var filter3 = new OpenLayers.Filter.Comparison({
		evaluate: function(context) {
			var style = styleFromData3 (context.attributes, context);
			if (typeof(style)!='boolean') context.style=style;
			return !!style;
		}
	});
	
	var filter4 = new OpenLayers.Filter.Comparison({
		evaluate: function(context) {
			var style = styleFromData4 (context.attributes, context);
			if (typeof(style)!='boolean') context.style=style;
			return !!style;
		}
	});
	

	
	//--------------------------------------------------------------
	//	Straßenlayer
	//--------------------------------------------------------------

	map.addLayer (new OpenLayers.Layer.Vector ("$$Straßen%% ($$experimentell%%)", {
	        radioGroup: 'ovx',
	        layerGroup: 'linie',
		positionInLayerChanger: 3,
		permaId: 'Hs',

		visibility: false,

		//------------------------------------------------------
		//	Vector display style map
		//------------------------------------------------------

		styleMap: new OpenLayers.StyleMap ({

			'default': new OpenLayers.Style ({

				strokeColor: 'blue',
				fillColor: 'yellow',
				strokeWidth: 5,
				strokeOpacity: 0.7,
				fillOpacity: 0.5
			})
		}),

		//------------------------------------------------------
		//	Strategy.BBOX: reload on pan or zoom
		//------------------------------------------------------

		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1.5 }),
			new OpenLayers.Strategy.Filter({filter: filter3})],

		//------------------------------------------------------
		//	Get new track per HTTP request
		//	value of mindist parameter is changed by moveTo()
		//------------------------------------------------------

		protocol: new OpenLayers.Protocol.HTTP({

			url: '../../../c/bbox.phtml',

			params: {
				db:	'historic',
				limit:	1000,
				zoom:	0
			},

			format: new OpenLayers.Format.GeoJSON()
		}),

		//------------------------------------------------------
		//	Discard strategie cache on zoom change
		//------------------------------------------------------

		moveTo: function (bounds, zoomChanged, dragging) {

                	if (zoomChanged) {

				newZoom = Math.min (this.map.getZoom(), 18);

				if (newZoom != this.protocol.params.zoom) {

					this.strategies[0].bounds = null;
				}

				this.protocol.params.zoom = newZoom;
			}

			OpenLayers.Layer.Vector.prototype.moveTo.apply(this, arguments);
		}
	}));
	
	//--------------------------------------------------------------
	//	Historische Grenze
	//--------------------------------------------------------------

	map.addLayer (new OpenLayers.Layer.Vector ("$$Historische Grenzen (experimentell)%%", {
	        radioGroup: 'ovx',
	        layerGroup: 'linie',
		positionInLayerChanger: 5,
		permaId: 'Hg',

		visibility: false,

		//------------------------------------------------------
		//	Vector display style map
		//------------------------------------------------------

		styleMap: new OpenLayers.StyleMap ({

			'default': new OpenLayers.Style ({

				strokeColor: 'blue',
				fillColor: 'yellow',
				strokeWidth: 5,
				strokeOpacity: 0.7,
				fillOpacity: 0.5
			})
		}),

		//------------------------------------------------------
		//	Strategy.BBOX: reload on pan or zoom
		//------------------------------------------------------

		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1.5 }),
			new OpenLayers.Strategy.Filter({filter: filter4})],

		//------------------------------------------------------
		//	Get new track per HTTP request
		//	value of mindist parameter is changed by moveTo()
		//------------------------------------------------------

		protocol: new OpenLayers.Protocol.HTTP({

			url: '../../../c/bbox.phtml',

			params: {
				db:	'historic',
				limit:	1000,
				zoom:	0
			},

			format: new OpenLayers.Format.GeoJSON()
		}),

		//------------------------------------------------------
		//	Discard strategie cache on zoom change
		//------------------------------------------------------

		moveTo: function (bounds, zoomChanged, dragging) {

                	if (zoomChanged) {
				newZoom = Math.min (this.map.getZoom(), 18);
				if (newZoom != this.protocol.params.zoom) {
					this.strategies[0].bounds = null;
				}
				this.protocol.params.zoom = newZoom;
			}
			OpenLayers.Layer.Vector.prototype.moveTo.apply(this, arguments);
		}
	}));
	
	//--------------------------------------------------------------
	//	Vector layer mit Outlines historischer Objekte
	//--------------------------------------------------------------

	map.addLayer (new OpenLayers.Layer.Vector ("$$ausgedehnte Objekte%%", {
	   radioGroup: 'ovx',
	   positionInLayerChanger: 2,
	    permaId: 'Ha',
	   layerGroup: 'linie',

		visibility: true,

		//------------------------------------------------------
		//	Vector display style map
		//------------------------------------------------------

		styleMap: new OpenLayers.StyleMap ({

			'default': new OpenLayers.Style ({

				strokeColor: 'blue',
				fillColor: 'yellow',
				strokeWidth: 5,
				strokeOpacity: 0.7,
				fillOpacity: 0.5
			})
		}),

		//------------------------------------------------------
		//	Strategy.BBOX: reload on pan or zoom
		//------------------------------------------------------

		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1.5 }),
			new OpenLayers.Strategy.Filter({filter: filter})],

		//------------------------------------------------------
		//	Get new track per HTTP request
		//	value of mindist parameter is changed by moveTo()
		//------------------------------------------------------

		protocol: new OpenLayers.Protocol.HTTP({

			url: '../../../c/bbox.phtml',

			params: {
				db:	'historic',
				limit:	1000,
				zoom:	0
			},

			format: new OpenLayers.Format.GeoJSON()
		}),

		//------------------------------------------------------
		//	Discard strategie cache on zoom change
		//------------------------------------------------------

		moveTo: function (bounds, zoomChanged, dragging) {

			if (zoomChanged) {
				newZoom = Math.min (this.map.getZoom(), 18);
				if (newZoom != this.protocol.params.zoom) {
					this.strategies[0].bounds = null;
				}
				this.protocol.params.zoom = newZoom;
			}
			OpenLayers.Layer.Vector.prototype.moveTo.apply(this, arguments);
		}
	}));
	
	
	//======================================================================
	//	PLZ-Grenzen
	//======================================================================

	var plzgrenz = new OpenLayers.Layer.Vector ("PLZ-Grenzen (dach)", {

		//linkGroup: 'PLZ',
		positionInLayerChanger: 4,
		permaId: 'Gg',
		visibility: false,
		displayInLayerSwitcher: false,		// wird mit PLZs geschaltet
		layerGroup: 'info',
		//--------------------------------------------------------------
		//	default style
		//--------------------------------------------------------------

		styleMap: new OpenLayers.StyleMap ({

			'default': new OpenLayers.Style ({

				strokeColor: 'black',
				strokeWidth: 1,
				strokeOpacity: 0.7
				
			})
		}),

		//--------------------------------------------------------------
		//	Strategy.BBOX: reload on pan or zoom
		//--------------------------------------------------------------

		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1.5 })],

		//--------------------------------------------------------------
		//	Get new track per HTTP request
		//	value of mindist parameter is changed by moveTo()
		//--------------------------------------------------------------

		protocol: new OpenLayers.Protocol.HTTP({

			url: '../../../c/bbox.phtml',

			params: {
				db:	'postal',
				limit:	250,
				zoom:	0
			},

			format: new OpenLayers.Format.GeoJSON()
		}),

		//--------------------------------------------------------------
		//	Discard strategie cache on zoom change
		//--------------------------------------------------------------

		moveTo: function (bounds, zoomChanged, dragging) {

			if (zoomChanged) {
				var newZoom = this.map.getZoom()>=11 ? 11 : 0;
				if (newZoom != this.protocol.params.zoom) {
					this.strategies[0].bounds = null;
				}
				this.protocol.params.zoom = newZoom;
			}
			OpenLayers.Layer.Vector.prototype.moveTo.apply(this, arguments);
		}
	});
	
	if ( sprache == 'de' ) {
            map.addLayer(plzgrenz) };


	//----------------------------------------------------------------------------
	//	Postleitzahlen
	//----------------------------------------------------------------------------

	 var plz = new OpenLayers.Layer.PopupMarker("Postleitzahlen (dach)", {

		//linkGroup: 'PLZ',
		positionInLayerChanger: 5,
		 permaId: 'Gz',
                visibility: false,
		layerGroup: 'info',
		setMap: function() { // HMPF!

			this.div.id = 'plzLayer';
			return OpenLayers.Layer.PopupMarker.prototype.setMap.apply(this, arguments);
		},

		createIconFromData: function (data) {

			if (data.postal_code)
			return new OpenLayers.Icon ('../../../i/1x1t.gif', {w:1,h:1});
			return new OpenLayers.Icon ('../../../i/reddot.png', {w:24,h:24});
		},

		createTooltipFromData: function (data) {

			var plz = data.postal_code||'???';

			if (data.name) return this.html(plz + '\n' +data.name);
			if (data.note) return this.html(data.note.replace(/\040/g,'\n'));

			return this.html(plz);
		},

		createUrlForBounds: function (bounds) {
			return '../../../c/csv.phtml?db=postal&limit=250'+
				'&id.peq=r'+
				'&lon.ge='+bounds.left+
				'&lon.lt='+bounds.right+
				'&lat.ge='+bounds.bottom+
				'&lat.lt='+bounds.top;
		},

		popupOnClick: false,
		popupOnHover: false,
		osmlinks: false,
		minZoom: 13,
		blockSize: 0
	} );
	 
	if ( sprache == 'de' ) {
            map.addLayer(plz) ;

	    // wir schalten die PLZ-Grenzen synchron mit den Postleitzahlen
            plz.events.register('visibilitychanged', this,
                        function(event) {
                                var plzgrenzen = map.getLayersBy ("permaId", "Gg");
                                var plztext = map.getLayersBy ("permaId", "Gz");
                                plzgrenzen[0].setVisibility (plztext[0].getVisibility());
                        });
	};
	
	//======================================================================
	//	Regionen-Grenzen
	//======================================================================

	var regiogrenz = new OpenLayers.Layer.Vector ("Region-Boundaries", {

		positionInLayerChanger: 4,
		permaId: 'Hd',
		visibility: false,
		//displayInLayerSwitcher: false,		
		layerGroup: 'info',
		//--------------------------------------------------------------------
		//      add style to features
		//--------------------------------------------------------------------

		preFeatureInsert: function(feature) {

			feature.style = {

			    strokeColor: '#2E120E',
			    strokeWidth: 4,
			    fillOpacity: 0,
			    strokeOpacity: 0.2,
			    graphicTitle: feature.attributes['name:de'] ||
					  feature.attributes['name:en'] ||
					  feature.attributes.name ||
					  null
			};
		},


		//--------------------------------------------------------------
		//	Strategy.BBOX: reload on pan or zoom
		//--------------------------------------------------------------

		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1.5 })],

			//--------------------------------------------------------------
			//	Get new track per HTTP request
			//	value of mindist parameter is changed by moveTo()
			//--------------------------------------------------------------

			protocol: new OpenLayers.Protocol.HTTP({

				url: '../../../c/bbox.phtml',

				params: {
					db:	'regions',
					limit:	250,
					zoom:	9
				},

				format: new OpenLayers.Format.GeoJSON()
			}),

			//--------------------------------------------------------------
			//	Discard strategie cache on zoom change
			//--------------------------------------------------------------

			moveTo: function (bounds, zoomChanged, dragging) {

				if (zoomChanged) {
					//var newZoom = this.map.getZoom()>=11 ? 11 : 0;
					var newZoom = Math.min (this.map.getZoom(), 18);
					if (newZoom != this.protocol.params.zoom) {
						this.strategies[0].bounds = null;
					}
					this.protocol.params.zoom = newZoom;
				}
				OpenLayers.Layer.Vector.prototype.moveTo.apply(this, arguments);
			}
	});
	map.addLayer(regiogrenz) ;


	//----------------------------------------------------------------------
	//	Labellayer-Regionen
	//----------------------------------------------------------------------

	var textLayer = new OpenLayers.Layer.Labels("$$Regionen%%", {
		permaId: 'Hb',
		layerGroup: 'info',
		visibility: true,
		minZoom: 10,
		maxZoom: 16,
		//attribution:'Admin/Region Label Font from Roger White (Public domain)',
		//lang: OpenLayers.Util.getParameters().lang
		lang: [sprache]
	});
	
	map.addLayer(textLayer);

	textLayer.loadCSV ('../../../c/csv.phtml?db=regions&limit=500', {

		filter: function (data) {

			if (data.boundary=='administrative') return false;
			if (data['name:de']=='Südliche Karnische Alpen') return false;
			if (data['name:de']=='Östliche Dolomiten') return false;
			if (data['name:de']=='Westliche Dolomiten') return false;
			if (data['name:de']=='Loferer und Leoganger Steinberge') return false;
			if (data['name:de']=='Wetterstein und Mieminger Kette') return false;
			if (data['name']=='Region Rhein-Neckar') return false;
			if (data['name']=='Region Rhein-Neckar (RP)') return false;
			if (data['name']=='Region Rhein-Neckar (HE)') return false;
            if (data['name']=='Region Donau-Iller (BY)') return false;  
					   
			return true;
		},

		markerStyle: function (data) {

			var style = {
				fontFamily: '"Amerton Outline", Serif',
				lineHeight: '110%'//,
				//color: '#2E120E'
			};
            
            if (data['region:type']== null) style.color = 'brown';  
            if (data['region:type']=='mountain_area') style.color = '#2E120E';  
            if (data['region:type']=='natural_area') style.color = 'blue'; 
            if (data['region:type']=='basin') style.color = 'brown';
            if (data['region:type']=='mountain_range') style.color = '#2E120E'; 
			//if (data['region:type'] != 'mountain_area') style.color = 'blue';

			return style;
		},
		markerOptions: {
			fontSizeFactor:	0.3,
			minFontSize:	1,
			maxFontSize:	100,
			minOpacity:	0.1,
			maxOpacity:	1.0,
			//lightColor:     'black',
			opacityStep:	0.2,	// delta per zoomlevel
			opacityBase:	40	// opacity=max upto this fontsize
		}
		
	});


	//----------------------------------------------------------------------
	//	Labellayer-Admin
	//----------------------------------------------------------------------

	var textLayer = new OpenLayers.Layer.Labels('Admin-Label', {
		layerGroup: 'info',
		permaId: 'Hc',
		//visibility: false,
		minZoom: 3,
		maxZoom: 7,
		//attribution:'<a href="https://www.naturalearthdata.com/about/terms-of-use"target="_blank">Natural Earth</a>,Admin/Region Label Font from Roger White (Public domain)',
		XXXdisplacementFactor: 5,									
		//lang: OpenLayers.Util.getParameters().lang
		lang: [sprache]
	});

	map.addLayer(textLayer);

	textLayer.loadCSV ('../../../c/csv.phtml?db=admin_world_2_withshape', {

		markerStyle: {
			fontFamily: '"Cardiff", Serif',
			lineHeight: '110%',
			color: 'black'
		},
		markerOptions: {
			fontSizeFactor:	0.3,
			minFontSize:	1,
			maxFontSize:	600,
			minOpacity:	0.1,
			maxOpacity:	1.0,
			lightColor:     'black',
			opacityStep:	0.3,	// delta per zoomlevel
			opacityBase:	40	// opacity=max upto this fontsize
		}

	});


        //----------------------------------------------------------------------------
        //      Markerlayer
        //----------------------------------------------------------------------------

        map.addLayer (new OpenLayers.Layer.MultiMark('Marker', {

                icon: new OpenLayers.Icon ('../../../i/Pin_red_right.png',
                        {w:26,h:52}, {x:0,y:-52}),
                queryParam: 'pins',
		layerGroup: 'ctrl',
		visibility: true,
                displayInLayerSwitcher: false,
		permaId: 'Sa',
                permalink: 'permalink',

                updatePermalink: function() {

                        var element = OpenLayers.Util.getElement(this.permalink);
                        if (!element) return;


                        //--------------------------------------------------------------
                        //      gather lonlats of markers
                        //--------------------------------------------------------------

                        var values=[];

                        for (var m in this.markers) {

                                var lonLat = this.markers[m].lonlat.clone().
                                        transform(this.map.getProjectionObject(), this.projection);
                                values.push(lonLat.lon.toFixed(5));
                                values.push(lonLat.lat.toFixed(5));
                        }

                        //--------------------------------------------------------------
                        //      use encoded value as query or hash
                        //--------------------------------------------------------------

                        allPins = encodeURIComponent(values.join('!'));
                        PL.updateLink();
                }
        }));

	

// ###################################################################################

HPLACE_INCLUDE popup.inc

// ###################################################################################



	//----------------------------------------------------------------------------
	//	Uebernehme Detailstufe aus Query
	//----------------------------------------------------------------------------

	mlayer.setDetail (parseInt (OpenLayers.Util.getParameters()['detail'], 10) || 0);

	//----------------------------------------------------------------------------
	//	Clickdivs
	//----------------------------------------------------------------------------

	map.addControl (new OpenLayers.Control.UpDownSwitch ({

		scope: mlayer,
		setValue: mlayer.setDetail,
		getValue: mlayer.getDetail,

		style: null,

		upperText: "$$Mehr Objekte anzeigen%%",
		innerText: "$$Normale Zahl von Objekten anzeigen%%",
		lowerText: "$$Weniger Objekte anzeigen%%"
	}));

	//----------------------------------------------------------------------------
	//	Aenderungsdatum abholen und eintragen
	//----------------------------------------------------------------------------

	OpenLayers.Request.GET({
		url: '../../../c/csv.phtml?db=historic&meta=mtime',
		success: function(request) {
			var values = (request.responseText||'').split('\t');
			var mtime = parseInt(values[0]);
			if (mtime>0) {
				var timestamp = new Date(1000*mtime).toLocaleString();
				document.getElementById('mtime').innerHTML =
				"$$Stand der Daten%%: " + timestamp + '.';
			}
		}
	});

	//----------------------------------------------------------------------------
	//	Anzahl der Objekte abholen und eintragen
	//----------------------------------------------------------------------------

	OpenLayers.Request.GET({
		url: '../../../texte/counts.txt',
		success: function(request) {
			var lines=OpenLayers.String.trim(request.responseText).split('\n');
			for (var lineIndex in lines) {
				var fields = OpenLayers.String.trim(lines[lineIndex]).split('\t');
				if (fields.length!=2) continue;
				var element= document.getElementById(fields[1]+'count');
				if (!element) continue;
				element.appendChild(document.createTextNode(fields[0]));
			}
		}
	});

	//----------------------------------------------------------------------------
	//	Stelle bestimmten Bereich an maximaler Groesse dar
	//----------------------------------------------------------------------------

	if (!map.getCenter()) {

		map.zoomToExtent(
			new OpenLayers.Bounds(start_x1, start_y1, start_x2, start_y2).
		transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()));
	}
        //------------------------------------------------------------------------------
        //      String aus den PermaIDs der sichtbaren layer generieren
        //------------------------------------------------------------------------------

        function LayerSum () {
                var lstr = "";
                var mlayers = map.getLayersBy ("visibility", true);
                mlayers.forEach(function (element,index) {
                        if ( element.permaId ) {
                                lstr += element.permaId;
                        }
                });

                // alert (lstr);
                return lstr;
        }

        map.events.register('changelayer', this,
                function(event) {
                        allPermaIds = LayerSum ();
                        PL.updateLink();
                });



        //--------------------------------------------------------------------------------
        //      Lade sichtbare Layer aus URL (pid=...) oder Cookie (layers) wenn vorhanden
        //--------------------------------------------------------------------------------

        function getURLParameter(name) {
                  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
        }

        function decodePermaIdStr ( permaIdStr ) {
                var layers, permaId, l, layer;
                if ( permaIdStr ) {

                        // alle layer auf invisible setzen

                        map.layers.forEach(function (element,index) {
                                if ( !(element.layerGroup === undefined) )
                                        element.setVisibility (false);
                        });

                        layers = permaIdStr.match(/[A-Z][a-z]+/g);
                        layers.forEach(function (element,index) {
                                l = map.getLayersBy ("permaId", element);
                                if ( 0 < l.length ) {
                                        l[0].setVisibility (true);
                                        if ( l[0].isBaseLayer ) map.setBaseLayer (l[0]);
                                };
                        });

                        // Marker immer an
                        l = map.getLayersBy ("permaId", "Sa");
                        l[0].setVisibility (true);
                }
        }

        var pid = getURLParameter("pid") || getCookie("layers");
        decodePermaIdStr(pid);

};



//==============================================================================
//	$Id$
//==============================================================================
