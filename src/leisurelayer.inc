	//----------------------------------------------------------------------
	//	Freizeit-Layer
	//----------------------------------------------------------------------
	map.addLayer (new OpenLayers.Layer.XYZ("$$Wanderwege%%", [
		"https://tile.waymarkedtrails.org/hiking/${z}/${x}/${y}.png"],
		{description: 'Lonvia`s Waymarked Trails-Wanderwege',
		  layerGroup: 'freizeit',
		  sphericalMercator: true, 
		  isBaseLayer: false , 
		  permaId: 'Lw', 
		  visibility: false, 
		  attribution:'<a href="https://hiking.waymarkedtrails.org"target="_blank">Waymarked Trails</a>'
	}));
	
	map.addLayer (new OpenLayers.Layer.XYZ("$$Radwege%%", [
		"https://tile.waymarkedtrails.org/cycling/${z}/${x}/${y}.png"],
		{description: 'Lonvia`s Waymarked Trails-Radwege',
		  layerGroup: 'freizeit',sphericalMercator: true, 
		  isBaseLayer: false, 
		  permaId: 'Lr', 
		  visibility: false, 
		  attribution:'<a href="https://hiking.waymarkedtrails.org"target="_blank">Waymarked Trails</a>'
	}));
	
	map.addLayer (new OpenLayers.Layer.XYZ("$$Mountainbike%%", [
		"https://tile.waymarkedtrails.org/mtb/${z}/${x}/${y}.png"],
		{description: 'Lonvia`s Waymarked Trails-Mountainbike-Routen',
		  layerGroup: 'freizeit',
		  sphericalMercator: true, 
		  isBaseLayer: false, 
		  permaId: 'Lm', 
		  visibility: false, 
		  attribution: '<a href="https://hiking.waymarkedtrails.org"target="_blank">Waymarked Trails</a>'
	}));
	
	map.addLayer (new OpenLayers.Layer.XYZ("$$Inline-Skating%%", [
		"https://tile.waymarkedtrails.org/skating/${z}/${x}/${y}.png"],
		{description: 'Lonvia`s Waymarked Trails-Inline-Skating',
		  layerGroup: 'freizeit',
		  sphericalMercator: true, 
		  isBaseLayer: false, 
		  permaId: 'Li', 
		  visibility: false, 
		  attribution: '<a href="https://hiking.waymarkedtrails.org"target="_blank">Waymarked Trails</a>'
	}));
	
	map.addLayer (new OpenLayers.Layer.XYZ("$$Reiten%%", [
		"https://tile.waymarkedtrails.org/riding/${z}/${x}/${y}.png"],
		{description: 'Lonvia`s Waymarked Trails-Riding.',
		  layerGroup: 'freizeit',
		  sphericalMercator: true, 
		  isBaseLayer: false, 
		  permaId: 'Lj', 
		  visibility: false, 
		  attribution:'<a href="https://hiking.waymarkedtrails.org"target="_blank">Waymarked Trails</a>'
	}));


