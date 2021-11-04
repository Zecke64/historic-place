	//----------------------------------------------------------------------------
	//	Overlay: Shading
	//----------------------------------------------------------------------------
	
	map.addLayer (new OpenLayers.Layer.XYZ ("$$Schummerung%%", [
		'http://a.tiles.wmflabs.org/hillshading/${z}/${x}/${y}.png',
		'http://b.tiles.wmflabs.org/hillshading/${z}/${x}/${y}.png',
		'http://c.tiles.wmflabs.org/hillshading/${z}/${x}/${y}.png'],
		{layerGroup: 'info',
		 permaId: 'Gs',
		 opacity: 0.5,
		 positionInLayerChanger: 2,
		 attribution:'elevation data by <a href="https://www.nasa.gov/"target="_blank">NASA SRTM</a>',
		 sphericalMercator: true,
		 isBaseLayer: false,
		 visibility: false
		}
	));

	//----------------------------------------------------------------------------
	//	Overlay: Höhenlinien
	//----------------------------------------------------------------------------
	
	if ( sprache == 'de' ) map.addLayer (new OpenLayers.Layer.XYZ ('H\xf6henlinien Z12-16',
		'https://tiles.historic.place/ele/de/${z}/${x}/${y}.png',{

		getURL: function(bounds) {
			if (this.map.getZoom()>=this.minZoom) {
				return OpenLayers.Layer.XYZ.prototype.getURL.apply(this, arguments);
			}
			return 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
		},

		layerGroup: 'info',
		positionInLayerChanger: 1,
		permaId: 'Gh',
		minZoom: 12,
		numZoomLevels: 17,
		sphericalMercator: true,
		alpha: true,
		isBaseLayer: false,
		opacity: 0.4,
		serverResolutions: [ 156543.03390625, 78271.516953125, 39135.7584765625, 19567.87923828125, 9783.939619140625, 4891.9698095703125, 2445.9849047851562, 1222.9924523925781, 611.4962261962891, 305.74811309814453, 152.87405654907226, 76.43702827453613, 38.218514137268066, 19.109257068634033, 9.554628534317017, 4.77731426716 ], 
		visibility: false,
		attribution:'DEM <a href="https://www.eea.europa.eu/data-and-maps/data/eu-dem" target="_blank">"Produced using Copernicus data and information funded by the European Union - EU-DEM layers"</a>, download from <a href="https://opendem.info/index.html" target="_blank">OpenDEM</a>, Data sources <a href="https://www2.jpl.nasa.gov/srtm/" target="_blank">SRTM</a>, <a href="https://asterweb.jpl.nasa.gov/gdem.asp" target="_blank">ASTER GDEM</a>'
	}));
	

	//----------------------------------------------------------------------
	//	Administrative Boundaries
	//----------------------------------------------------------------------

	if ( sprache == 'de' )
		map.addLayer (new OpenLayers.Layer.OSM("Verwaltungsgrenzen",[
		'https://tiles.historic.place/Gemeindegrenzen/${z}/${x}/${y}.png'], {
		        description: 'Geodaten des Bundes © GeoBasis-DE / BKG 2018',
		        layerGroup: 'info',
			positionInLayerChanger: 3,
			permaId: 'Gv',
			tileOptions: {crossOriginKeyword: null},
			transitionEffect: "resize",
			isBaseLayer: false,
			visibility: false,
			attribution:'<a href="http://www.bkg.bund.de"target="_blank">© GeoBasis-DE / BKG 2018 (Daten verändert)</a>'
		}));


	//----------------------------------------------------------------------
	//	OpenRailwayMap
	//----------------------------------------------------------------------

	var openrailwaymap = new OpenLayers.Layer.XYZ("OpenRailwayMap", 
		["https://a.tiles.openrailwaymap.org/standard/${z}/${x}/${y}.png",
		 "https://b.tiles.openrailwaymap.org/standard/${z}/${x}/${y}.png",
		 "https://c.tiles.openrailwaymap.org/standard/${z}/${x}/${y}.png"], {
		sphericalMercator: true,
		layerGroup: 'info',
		opacity: 1,
		permaId: 'Kz',
		visibility: false,
		transparent: true,
		noOpaq: true,
		isBaseLayer: false,
		attribution: '<a href="https://www.openrailwaymap.org/">OpenRailwayMap</a>'
	});
	map.addLayer(openrailwaymap);


	//----------------------------------------------------------------------------
	//	TK25-Layer
	//----------------------------------------------------------------------------
	
	tk25	= new OpenLayers.Layer.TK25 ("TK 25 Blattschnitt" , {
		layerGroup: 'info',
		permaId: 'Sb',
		visibility: false,
		style: ({
			strokeColor:	'blue',
			strokeOpacity:	0.7,
			strokeWidth:	2
		})
	});

	tk50	= new OpenLayers.Layer.TK50 ("TK 50 Blattschnitt" , {
		layerGroup: 'info',
		permaId: 'Sc',
		visibility: false,
		style: ({
			strokeColor:	'red',
			strokeOpacity:	0.7,
			strokeWidth:	3
		})
	});

	tk100	= new OpenLayers.Layer.TK100("TK 100 Blattschnitt", {
		layerGroup: 'info',
		permaId: 'Se',
		visibility: false,
		style: ({
			strokeColor:	'yellow',
			strokeOpacity:	0.7,
			strokeWidth:	4
		})
	});

	tk200	= new OpenLayers.Layer.TK200("TK 200 Blattschnitt", {
		layerGroup: 'info',
		permaId: 'Sg',
		visibility: false,
		style: ({
			strokeColor:	'black',
			strokeOpacity:	0.7,
			strokeWidth:	5
		})
	});

	if ( sprache == 'de' ) 
		map.addLayers ([tk25, tk50, tk100, tk200]);

