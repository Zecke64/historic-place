	//----------------------------------------------------------------------
	//	Freizeit-Layer
	//----------------------------------------------------------------------
	map.addLayer (new OpenLayers.Layer.XYZ("$$Wanderwege%%", [
		"http://tile.lonvia.de/hiking/${z}/${x}/${y}.png"],
		{description: 'Lonvia`s Waymarked Trails-Wanderwege',
		  layerGroup: 'freizeit',
		  sphericalMercator: true, 
		  isBaseLayer: false , 
		  permaId: 'Lw', 
		  visibility: false, 
		  attribution:'<a href="https://hiking.waymarkedtrails.org"target="_blank">Waymarked Trails</a>'
	}));
	
	map.addLayer (new OpenLayers.Layer.XYZ("$$Radwege%%", [
		"http://tile.lonvia.de/cycling/${z}/${x}/${y}.png"],
		{description: 'Lonvia`s Waymarked Trails-Radwege',
		  layerGroup: 'freizeit',sphericalMercator: true, 
		  isBaseLayer: false, 
		  permaId: 'Lr', 
		  visibility: false, 
		  attribution:'<a href="https://hiking.waymarkedtrails.org"target="_blank">Waymarked Trails</a>'
	}));
	
	map.addLayer (new OpenLayers.Layer.XYZ("$$Mountainbike%%", [
		"http://tile.lonvia.de/mtb/${z}/${x}/${y}.png"],
		{description: 'Lonvia`s Waymarked Trails-Mountainbike-Routen',
		  layerGroup: 'freizeit',
		  sphericalMercator: true, 
		  isBaseLayer: false, 
		  permaId: 'Lm', 
		  visibility: false, 
		  attribution: '<a href="https://hiking.waymarkedtrails.org"target="_blank">Waymarked Trails</a>'
	}));
	
	map.addLayer (new OpenLayers.Layer.XYZ("$$Inline-Skating%%", [
		"http://tile.lonvia.de/skating/${z}/${x}/${y}.png"],
		{description: 'Lonvia`s Waymarked Trails-Inline-Skating',
		  layerGroup: 'freizeit',
		  sphericalMercator: true, 
		  isBaseLayer: false, 
		  permaId: 'Li', 
		  visibility: false, 
		  attribution: '<a href="https://hiking.waymarkedtrails.org"target="_blank">Waymarked Trails</a>'
	}));
	
	map.addLayer (new OpenLayers.Layer.XYZ("$$Reiten%%", [
		"http://tile.lonvia.de/riding/${z}/${x}/${y}.png"],
		{description: 'Lonvia`s Waymarked Trails-Riding.',
		  layerGroup: 'freizeit',
		  sphericalMercator: true, 
		  isBaseLayer: false, 
		  permaId: 'Lj', 
		  visibility: false, 
		  attribution:'<a href="https://hiking.waymarkedtrails.org"target="_blank">Waymarked Trails</a>'
	}));


