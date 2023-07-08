//
//	Base layer
//

	//----------------------------------------------------------------------
	//	Kartenlayer
	//----------------------------------------------------------------------
	if ( sprache == 'de' || sprache =='fr' || sprache =='nl' || sprache =='cs' || sprache =='ro' || sprache =='da' || sprache =='pl' || sprache =='hu') {
	map.addLayer (new OpenLayers.Layer.OSM('$$Grundkarte%%', null, {
		numZoomLevels: 20,
		tileOptions: {

			crossOriginKeyword: null
		},

		mapnikTiles: [
			'//a.tile.openstreetmap.org/${z}/${x}/${y}.png',
			'//b.tile.openstreetmap.org/${z}/${x}/${y}.png',
			'//c.tile.openstreetmap.org/${z}/${x}/${y}.png'
		],

		historicplaceTiles: [
			'//tiles.historic.place/World/${z}/${x}/${y}.png'
		],

		moveTo: function (bounds, zoomChanged, dragging) {

                        if (zoomChanged) {

				var zoom = this.map.zoom;
				this.url = zoom <=11 ? this.historicplaceTiles : this.mapnikTiles;

				// this.url = zoom <= 6 ? this.eigene : this.fremde;
			}

			return OpenLayers.Layer.OSM.prototype.moveTo.apply (this, arguments);
		},

		attribution: '&copy;<a href="https://www.openstreetmap.org/copyright"target="_blank">OpenStreetMap</a> contributors, Zoom 6-7 <a href="https://www.naturalearthdata.com/about/terms-of-use"target="_blank">Made with Natural Earth</a>, Zoom 8-9 <a href="https://openrouteservice.org/terms-of-service/#/attribution"target="_blank">© openrouteservice.org</a> and <a href="https://www.openstreetmap.fr/mentions-legales/"target="_blank">Yohan Boniface & Humanitarian OpenStreetMap Team,OSM France</a>, Zoom 10 <a href="https://foundation.wikimedia.org/wiki/Maps_Terms_of_Use"target="_blank">Wikimedia Maps</a>, Zoom 11 <a href="https://sgx.geodatenzentrum.de/web_public/gdz/datenquellen/Datenquellen_TopPlusOpen_15.12.2022.pdf"target="_blank">Bundesamt für Kartographie und Geodäsie (2022)</a>'

	}));
	}
	else
	{
		map.addLayer (new OpenLayers.Layer.OSM('$$Grundkarte%%', null, {
		numZoomLevels: 20,
		tileOptions: {

			crossOriginKeyword: null
		},

		mapnikTiles: [
			'//a.tile.openstreetmap.org/${z}/${x}/${y}.png',
			'//b.tile.openstreetmap.org/${z}/${x}/${y}.png',
			'//c.tile.openstreetmap.org/${z}/${x}/${y}.png'
		],

		historicplaceTiles: [
			'//tiles.historic.place/World/${z}/${x}/${y}.png'
		],

		moveTo: function (bounds, zoomChanged, dragging) {

                        if (zoomChanged) {

				var zoom = this.map.zoom;
				this.url = zoom <=9 ? this.historicplaceTiles : this.mapnikTiles;

				// this.url = zoom <= 6 ? this.eigene : this.fremde;
			}

			return OpenLayers.Layer.OSM.prototype.moveTo.apply (this, arguments);
		},

		attribution: '&copy;<a href="https://www.openstreetmap.org/copyright"target="_blank">OpenStreetMap</a> contributors, Zoom 6-7 <a href="https://www.naturalearthdata.com/about/terms-of-use"target="_blank">Made with Natural Earth</a>, Zoom 8-9 <a href="https://openrouteservice.org/terms-of-service/#/attribution"target="_blank">© openrouteservice.org</a> and <a href="https://www.openstreetmap.fr/mentions-legales/"target="_blank">Yohan Boniface & Humanitarian OpenStreetMap Team,OSM France</a>'

	}));
	}

	//map.addLayer (new OpenLayers.Layer.XYZ ('Hike & Bike Map',[
	//		 'https://tiles.wmflabs.org/hikebike/${z}/${x}/${y}.png'],
    //              {description: 'Colin Marquardt Hike & Bike Map',
	//		permaId: 'Kh',
	//		sphericalMercator: true, 
	//		attribution:'&copy;<a href="https://www.openstreetmap.org/copyright"target="_blank">OpenStreetMap</a> contributors,<a href="https://hikebikemap.com/"target="_blank">Hike & Bike Map</a>@ Colin Marquardt'
	//}));

        map.addLayer (new OpenLayers.Layer.XYZ("TransportMap", [
			"https://tiles.historic.place/thunderforest/a/transport/${z}/${x}/${y}.png",
			"https://tiles.historic.place/thunderforest/b/transport/${z}/${x}/${y}.png",
			"https://tiles.historic.place/thunderforest/c/transport/${z}/${x}/${y}.png"],
			{description: 'Thunderforest.com',
			 permaId: 'Kt',
			 sphericalMercator: true, 
			 attribution:'&copy;<a href="https://www.openstreetmap.org/copyright"target="_blank">OpenStreetMap</a> contributors,<a href="https://www.thunderforest.com/"target="_blank">Thunderforest.com</a>'
	}));

        map.addLayer (new OpenLayers.Layer.XYZ("CycleMap", [
			"https://tiles.historic.place/thunderforest/a/cycle/${z}/${x}/${y}.png",
			"https://tiles.historic.place/thunderforest/b/cycle/${z}/${x}/${y}.png",
			"https://tiles.historic.place/thunderforest/c/cycle/${z}/${x}/${y}.png" ],
			{description: 'Thunderforest.com',
			 permaId: 'Kc',
			 sphericalMercator: true, 
			 attribution:'&copy;<a href="https://www.openstreetmap.org/copyright"target="_blank">OpenStreetMap</a> contributors,<a href="https://www.thunderforest.com/"target="_blank">Thunderforest.com</a>'
	}));

        map.addLayer (new OpenLayers.Layer.XYZ("Landscape", [
			"https://tiles.historic.place/thunderforest/a/landscape/${z}/${x}/${y}.png",
			"https://tiles.historic.place/thunderforest/b/landscape/${z}/${x}/${y}.png",
			"https://tiles.historic.place/thunderforest/c/landscape/${z}/${x}/${y}.png"],
			{description: 'Thunderforest.com',
			 permaId: 'Kl',
			 sphericalMercator: true, 
			 attribution:'&copy;<a href="https://www.openstreetmap.org/copyright"target="_blank">OpenStreetMap</a> contributors,<a href="https://www.thunderforest.com/"target="_blank">Thunderforest.com</a>'
	}));

        map.addLayer (new OpenLayers.Layer.XYZ("Neighbourhood", [
			"https://tiles.historic.place/thunderforest/a/neighbourhood/${z}/${x}/${y}.png",
			"https://tiles.historic.place/thunderforest/b/neighbourhood/${z}/${x}/${y}.png",
			"https://tiles.historic.place/thunderforest/c/neighbourhood/${z}/${x}/${y}.png"],
			{description: 'Thunderforest.com',
			 permaId: 'Ky',
			 sphericalMercator: true, 
			 attribution:'&copy;<a href="https://www.openstreetmap.org/copyright"target="_blank">OpenStreetMap</a> contributors,<a href="https://www.thunderforest.com/"target="_blank">Thunderforest.com</a>'
	}));

        map.addLayer (new OpenLayers.Layer.XYZ("Outdoors", [
			"https://tiles.historic.place/thunderforest/a/outdoors/${z}/${x}/${y}.png",
			"https://tiles.historic.place/thunderforest/b/outdoors/${z}/${x}/${y}.png",
			"https://tiles.historic.place/thunderforest/c/outdoors/${z}/${x}/${y}.png"],
			{description: 'Thunderforest.com',
			 permaId: 'Ku',
			 sphericalMercator: true, 
			 attribution:'&copy;<a href="https://www.openstreetmap.org/copyright"target="_blank">OpenStreetMap</a> contributors,<a href="https://www.thunderforest.com/"target="_blank">Thunderforest.com</a>' 
	}));

	if ( sprache == 'ja' ) 

		map.addLayer (new OpenLayers.Layer.XYZ("OSM Japan tile", [
			"https://tile.openstreetmap.jp/${z}/${x}/${y}.png"],
			{sphericalMercator: true, 
			 permaId: 'Kx',
			 attribution:'&copy; Openstreetmap Japan  <a href="https://www.openstreetmap.org/copyright"target="_blank">OpenStreetMap</a> contributors'
		}));

	if ( sprache == 'fr' ) {

		map.addLayer (new OpenLayers.Layer.XYZ("OSM style français", [
			"https://a.tile.openstreetmap.fr/osmfr/${z}/${x}/${y}.png",
			"https://b.tile.openstreetmap.fr/osmfr/${z}/${x}/${y}.png",
			"https://c.tile.openstreetmap.fr/osmfr/${z}/${x}/${y}.png"],
			{sphericalMercator: true, 
			 permaId: 'Kf',
			 attribution:'&copy; Openstreetmap France | Données <a href="https://www.openstreetmap.org/copyright"target="_blank">&copy; les contributeurs OpenStreetMap</a>'
		}));

	} else {

		map.addLayer (new OpenLayers.Layer.XYZ("$$OSM deutscher Stil%%", [
			"https://tile.openstreetmap.de/${z}/${x}/${y}.png",
			{description: 'openstreetmap.de', 
			 sphericalMercator: true,  
			 permaId: 'Kd',
			 attribution:'&copy;<a href="https://www.openstreetmap.org/copyright"target="_blank">OpenStreetMap</a> contributors'
		}));

	}

	map.addLayer (new OpenLayers.Layer.XYZ("$$Reit- und Wanderkarte%%", [
		"https://wanderreitkarte.de/topo/${z}/${x}/${y}.png"], {

		description: 'https://www.wanderreitkarte.de',
		sphericalMercator: true,
		isBaseLayer: true,
		permaId: 'Kr',
		visibility: false,
		numZoomLevels: 16,
		minZoom: 10,
		mapClassName: 'ruwk',
		attribution:'&copy;<a href="https://www.openstreetmap.org/copyright"target="_blank">OpenStreetMap</a> contributors,<a href="https://www.wanderreitkarte.de/licence_de.php"target="_blank">Nop`s Reit-& Wanderkarte</a>',
		subdomains: [ 'www', 'topo', 'topo2', 'topo3', 'topo4', 'topo5', 'topo6', 'topo7' ]
	}));

	map.addLayer (new OpenLayers.Layer.XYZ("OpenTopoMap", [
  
		"https://a.tile.opentopomap.org/${z}/${x}/${y}.png",
		"https://b.tile.opentopomap.org/${z}/${x}/${y}.png",
		"https://c.tile.opentopomap.org/${z}/${x}/${y}.png"],
		{numZoomLevels: 18,
		 minZoom: 10, 
		 mapClassName: 'otm', 
		 permaId: 'Kp', 
		 description: 'opentopomap.org',
		 sphericalMercator: true , 
		 attribution:'&copy;<a href="https://www.openstreetmap.org/copyright"target="_blank">OpenStreetMap</a> contributors,<a href="https://opentopomap.org"target="_blank">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
	}));
	
	map.addLayer (new OpenLayers.Layer.XYZ("Pioneer", [
  
		"https://tiles.historic.place/thunderforest/a/pioneer/${z}/${x}/${y}.png",
		"https://tiles.historic.place/thunderforest/b/pioneer/${z}/${x}/${y}.png",
		"https://tiles.historic.place/thunderforest/c/pioneer/${z}/${x}/${y}.png"],
		{permaId: 'Ks', 
		 description: 'Thunderforest.com',
		 sphericalMercator: true , 
		 attribution:'&copy;<a href="https://www.openstreetmap.org/copyright"target="_blank">OpenStreetMap</a> contributors,<a href="https://www.thunderforest.com/"target="_blank">Thunderforest.com</a>'
	}));
		
	map.addLayer(new OpenLayers.Layer.OSM("No Background","../../../i/1x1w.gif",
		{ maxZoomLevel: 17,
		  permaId: 'Kv',  
		  numZoomLevels: 18 
	}));
		
	//----------------------------------------------------------------------------
	//	Mapnik sw
	//----------------------------------------------------------------------------
		
	//layerMapnikBW = new OpenLayers.Layer.OSM.Toolserver("bw-mapnik", {permaId: 'Kw'});
	//layerMapnikBW.setName("Mapnik black/white");
	//map.addLayer(layerMapnikBW);
			
	//----------------------------------------------------------------------------
	//	GeoBasis-DE
	//----------------------------------------------------------------------------
	if ( sprache == 'de' )
		map.addLayer (new OpenLayers.Layer.XYZ("Topographische Uebersichtskarte Deutschland", [
			"https://tiles.historic.place/DTK200-V/${z}/${x}/${y}.png"],
			{sphericalMercator: true, 
			 permaId: 'Ka',
			 numZoomLevels: 15,
			 isBaseLayer: true,
			 visibility: false,
			 opacity: 0.5,
			 attribution:'&copy;<a href="https://www.openstreetmap.org/copyright"target="_blank">OpenStreetMap</a> contributors, <a href="https://www.bkg.bund.de"target="_blank">© GeoBasis-DE / BKG 2017</a>, Zoom 6-7 <a href="https://www.naturalearthdata.com/about/terms-of-use"target="_blank">Made with Natural Earth</a>'
		}));

