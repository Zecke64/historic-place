	//----------------------------------------------------------------------
        //      Moers Denkmale Linien
        //----------------------------------------------------------------------
	if ( sprache == 'de' )	map.addLayer (new OpenLayers.Layer.Vector("Moers Denkmal-Linien", {
                        // projection: "EPSG:4326",
			positionInLayerChanger: 6,
			sphericalMercator: true,
			isBaseLayer: false,
			layerGroup: 'opendata',
			permaId: 'Ns',
			description: 'Stadt Mo­ers, (dl-de/zero-2-0)',
			visibility: false,
			attribution:'<a href="https://www.govdata.de/dl-de/zero-2-0"target="_blank">Stadt Mo­ers, (dl-de/zero-2-0)</a>',
			strategies: [new OpenLayers.Strategy.BBOX({ratio: 1})],
			protocol: new OpenLayers.Protocol.HTTP({
			url: "../../../opendata/moers-denkmale-linien-geojosn",
			format: new OpenLayers.Format.GeoJSON({extractStyles: false})
    }),
    		//--------------------------------------------------------------------
		//	style map
		//--------------------------------------------------------------------

		styleMap: new OpenLayers.StyleMap ({

			//------------------------------------------------------------
			//	default style
			//------------------------------------------------------------

			'default': new OpenLayers.Style ({
				    pointRadius: 10,
				    strokeColor: 'red',
				    strokeWidth: 5,
				    strokeOpacity: 0.7,
				    fillColor: 'yellow',
				    fillOpacity: 0.3,
				    
				    
				//----------------------------------------------------
				//	Label (tooltip)
				//----------------------------------------------------

				fontSize: 12,
				fontColor: 'blue',

			//	label: '\${KURZBEZEIC}',	// use field "name" from CSV

				labelAlign: 'ct',
				labelYOffset: -10

			})
		}),
		
		//--------------------------------------------------------------------
		//	Zoombegrenzung
		//--------------------------------------------------------------------

		MIN_ZOOM: 14,

		moveTo: function (bounds, zoomChanged, dragging) {

                        if (zoomChanged) {

				this.strategies[0].bounds = null;

				if (this.map.getZoom() >= this.MIN_ZOOM) {

					this.strategies[0].triggerRead =
						OpenLayers.Strategy.BBOX.prototype.triggerRead;

				} else {

					this.strategies[0].triggerRead = function(){};
					this.destroyFeatures();
				}
			}

			return OpenLayers.Layer.Vector.prototype.moveTo.apply (this, arguments);
		}
}));
	
	//----------------------------------------------------------------------
        //      Moers Denkmale
        //----------------------------------------------------------------------
	if ( sprache == 'de' )	map.addLayer (new OpenLayers.Layer.Vector("Moers Denkmal-Punkte", {
                        // projection: "EPSG:4326",
			positionInLayerChanger: 6,
			sphericalMercator: true,
			isBaseLayer: false,
			layerGroup: 'opendata',
			permaId: 'Nr',
			description: 'Stadt Mo­ers, (dl-de/zero-2-0)',
			visibility: false,
			attribution:'<a href="https://www.govdata.de/dl-de/zero-2-0"target="_blank">Stadt Mo­ers, (dl-de/zero-2-0)</a>',
			strategies: [new OpenLayers.Strategy.BBOX({ratio: 1})],
			protocol: new OpenLayers.Protocol.HTTP({
			url: "../../../opendata/moers-denkmale-punkte-geojosn",
			format: new OpenLayers.Format.GeoJSON({extractStyles: false})
    }),
    		//--------------------------------------------------------------------
		//	style map
		//--------------------------------------------------------------------

		styleMap: new OpenLayers.StyleMap ({

			//------------------------------------------------------------
			//	default style
			//------------------------------------------------------------

			'default': new OpenLayers.Style ({
				    pointRadius: 10,
				    strokeColor: 'red',
				    strokeWidth: 5,
				    strokeOpacity: 0.7,
				    fillColor: 'yellow',
				    fillOpacity: 0.3,
				    
				    
				//----------------------------------------------------
				//	Label (tooltip)
				//----------------------------------------------------

				fontSize: 12,
				fontColor: 'blue',

			//	label: '\${KURZBEZEIC}',	// use field "name" from CSV

				labelAlign: 'ct',
				labelYOffset: -10

			})
		}),
		
		//--------------------------------------------------------------------
		//	Zoombegrenzung
		//--------------------------------------------------------------------

		MIN_ZOOM: 14,

		moveTo: function (bounds, zoomChanged, dragging) {

                        if (zoomChanged) {

				this.strategies[0].bounds = null;

				if (this.map.getZoom() >= this.MIN_ZOOM) {

					this.strategies[0].triggerRead =
						OpenLayers.Strategy.BBOX.prototype.triggerRead;

				} else {

					this.strategies[0].triggerRead = function(){};
					this.destroyFeatures();
				}
			}

			return OpenLayers.Layer.Vector.prototype.moveTo.apply (this, arguments);
		}
}));
	

	//----------------------------------------------------------------------
        //      Moers Flächendenkmal
        //----------------------------------------------------------------------
	if ( sprache == 'de' )	
		map.addLayer (new OpenLayers.Layer.Vector("Moers Denkmal-Flächen", {

		// projection: "EPSG:4326",
		positionInLayerChanger: 6,
		sphericalMercator: true,
		isBaseLayer: false,
		layerGroup: 'opendata',
		permaId: 'Nq',
		description: 'Stadt Mo­ers, (dl-de/zero-2-0)',
		visibility: false,
		attribution:'<a href="https://www.govdata.de/dl-de/zero-2-0"target="_blank">Stadt Mo­ers, (dl-de/zero-2-0)</a>',
		strategies: [new OpenLayers.Strategy.BBOX({ratio: 1})],
		protocol: new OpenLayers.Protocol.HTTP({
			url: "../../../opendata/moers-denkmale-flaechen-geojosn",
			format: new OpenLayers.Format.GeoJSON({extractStyles: false})
		}),

    		//--------------------------------------------------------------------
		//	style map
		//--------------------------------------------------------------------

		styleMap: new OpenLayers.StyleMap ({

			//------------------------------------------------------------
			//	default style
			//------------------------------------------------------------


			'default': new OpenLayers.Style ({
				    strokeColor: 'black',
				    strokeWidth: 0.5,
				    strokeOpacity: 0.7,
				    fillColor: 'peru',
				    fillOpacity: 0.3,
				    
				    //----------------------------------------------------
				    //	Label (tooltip)
				    //----------------------------------------------------

				    fontSize: 12,
				    fontColor: 'blue',
				    labelAlign: 'ct',
				    labelYOffset: -10
			})
		}),
		
		//--------------------------------------------------------------------
		//	Zoombegrenzung
		//--------------------------------------------------------------------

		MIN_ZOOM: 14,

		moveTo: function (bounds, zoomChanged, dragging) {

                        if (zoomChanged) {
				this.strategies[0].bounds = null;
				if (this.map.getZoom() >= this.MIN_ZOOM) {
					this.strategies[0].triggerRead =
						OpenLayers.Strategy.BBOX.prototype.triggerRead;
				} else {
					this.strategies[0].triggerRead = function(){};
					this.destroyFeatures();
				}
			}
			return OpenLayers.Layer.Vector.prototype.moveTo.apply (this, arguments);
		}
	}));

	
	//----------------------------------------------------------------------
        //      Open Data Hamburg Denkmalobjekte
        //----------------------------------------------------------------------

	if ( sprache == 'de' )	
		map.addLayer (new OpenLayers.Layer.Vector("Hamburg Denkmalobjekte", {

                        // projection: "EPSG:4326",
			positionInLayerChanger: 6,
			sphericalMercator: true,
			isBaseLayer: false,
			layerGroup: 'opendata',
			permaId: 'Ne',
			description: 'Freie und Hansestadt Hamburg, Kulturbehörde, (dl-de/by-2-0)',
			visibility: false,
			attribution:'<a href="https://transparenz.hamburg.de/"target="_blank">Freie und Hansestadt Hamburg, Kulturbehörde</a>, <a href="https://www.govdata.de/dl-de/by-2-0"target="_blank">(dl-de/by-2-0)</a>',
			strategies: [new OpenLayers.Strategy.BBOX({ratio: 1})],
			protocol: new OpenLayers.Protocol.HTTP({
				url: "../../../opendata/Denkmal-Hamburg.geojson",
				format: new OpenLayers.Format.GeoJSON({extractStyles: false})
			}),

			//--------------------------------------------------------------------
			//	style map
			//--------------------------------------------------------------------

			styleMap: new OpenLayers.StyleMap ({

				//------------------------------------------------------------
				//	default style
				//------------------------------------------------------------

				'default': new OpenLayers.Style ({
					    pointRadius: 10,
					    strokeColor: 'red',
					    strokeWidth: 5,
					    strokeOpacity: 0.7,
					    fillColor: 'yellow',
					    fillOpacity: 0.3,
					    
					    //----------------------------------------------------
					    //	Label (tooltip)
					    //----------------------------------------------------
					    fontSize: 12,
					    fontColor: 'blue',
					    labelAlign: 'ct',
					    labelYOffset: -10

				})
			}),
		
			//--------------------------------------------------------------------
			//	Zoombegrenzung
			//--------------------------------------------------------------------

			MIN_ZOOM: 14,

			moveTo: function (bounds, zoomChanged, dragging) {
				if (zoomChanged) {
					this.strategies[0].bounds = null;
					if (this.map.getZoom() >= this.MIN_ZOOM) {
						this.strategies[0].triggerRead =
							OpenLayers.Strategy.BBOX.prototype.triggerRead;
					} else {
						this.strategies[0].triggerRead = function(){};
						this.destroyFeatures();
					}
				}
				return OpenLayers.Layer.Vector.prototype.moveTo.apply (this, arguments);
			}
	}));

		
	//----------------------------------------------------------------------
        //      Open Data Hamburg Grenzsteine
        //----------------------------------------------------------------------
	if ( sprache == 'de' )	
		map.addLayer (new OpenLayers.Layer.Vector("Hamburg Grenzstein", {
                        // projection: "EPSG:4326",
			positionInLayerChanger: 7,
			sphericalMercator: true,
			isBaseLayer: false,
			layerGroup: 'opendata',
			permaId: 'Nf',
			description: 'Freie und Hansestadt Hamburg, Kulturbehörde, (dl-de/by-2-0)',
			visibility: false,
			attribution:'<a href="https://transparenz.hamburg.de/"target="_blank">Freie und Hansestadt Hamburg, Kulturbehörde</a>, <a href="https://www.govdata.de/dl-de/by-2-0"target="_blank">(dl-de/by-2-0)</a>',
			strategies: [new OpenLayers.Strategy.BBOX({ratio: 1})],
			protocol: new OpenLayers.Protocol.HTTP({
				url: "../../../opendata/Grenzsteine-Hamburg.geojson",
				format: new OpenLayers.Format.GeoJSON({extractStyles: false})
			}),

			//--------------------------------------------------------------------
			//	style map
			//--------------------------------------------------------------------

			styleMap: new OpenLayers.StyleMap ({

				//------------------------------------------------------------
				//	default style
				//------------------------------------------------------------

				'default': new OpenLayers.Style ({
					    pointRadius: 10,
					    strokeColor: 'blue',
					    strokeWidth: 5,
					    strokeOpacity: 0.7,
					    fillColor: 'withe',
					    fillOpacity: 0.3,
				    
					    //----------------------------------------------------
					    //	Label (tooltip)
					    //----------------------------------------------------

					    fontSize: 12,
					    fontColor: 'blue',
					    labelAlign: 'ct',
					    labelYOffset: -10
				})
			}),
		
			//--------------------------------------------------------------------
			//	Zoombegrenzung
			//--------------------------------------------------------------------

			MIN_ZOOM: 14,

			moveTo: function (bounds, zoomChanged, dragging) {
				if (zoomChanged) {
					this.strategies[0].bounds = null;
					if (this.map.getZoom() >= this.MIN_ZOOM) {
						this.strategies[0].triggerRead =
							OpenLayers.Strategy.BBOX.prototype.triggerRead;
					} else {
						this.strategies[0].triggerRead = function(){};
						this.destroyFeatures();
					}
				}
				return OpenLayers.Layer.Vector.prototype.moveTo.apply (this, arguments);
			}
	}));

		
	//----------------------------------------------------------------------
        //      Open Data Hamburg Gartendenkmale
        //----------------------------------------------------------------------
	if ( sprache == 'de' )	
		map.addLayer (new OpenLayers.Layer.Vector("Hamburg Gartendenkmal", {
                        // projection: "EPSG:4326",
			positionInLayerChanger: 8,
			sphericalMercator: true,
			isBaseLayer: false,
			layerGroup: 'opendata',
			permaId: 'Ng',
			description: 'Freie und Hansestadt Hamburg, Kulturbehörde, (dl-de/by-2-0)',
			visibility: false,
			attribution:'<a href="https://transparenz.hamburg.de/"target="_blank">Freie und Hansestadt Hamburg, Kulturbehörde</a>, <a href="https://www.govdata.de/dl-de/by-2-0"target="_blank">(dl-de/by-2-0)</a>',
			strategies: [new OpenLayers.Strategy.BBOX({ratio: 1})],
			protocol: new OpenLayers.Protocol.HTTP({
				url: "../../../opendata/Gartendenkmale-Hamburg.geojson",
				format: new OpenLayers.Format.GeoJSON({extractStyles: false})
			}),

			//--------------------------------------------------------------------
			//	style map
			//--------------------------------------------------------------------

			styleMap: new OpenLayers.StyleMap ({

				//------------------------------------------------------------
				//	default style
				//------------------------------------------------------------

				'default': new OpenLayers.Style ({
				    strokeColor: 'green',
				    strokeWidth: 5,
				    strokeOpacity: 0.7,
				    fillColor: 'green',
				    fillOpacity: 0.3,
				    
				    //----------------------------------------------------
				    //	Label (tooltip)
				    //----------------------------------------------------

				    fontSize: 12,
				    fontColor: 'blue',
				    labelAlign: 'ct',
				    labelYOffset: -10

				})
			}),
		
			//--------------------------------------------------------------------
			//	Zoombegrenzung
			//--------------------------------------------------------------------

			MIN_ZOOM: 14,

			moveTo: function (bounds, zoomChanged, dragging) {
				if (zoomChanged) {
					this.strategies[0].bounds = null;
					if (this.map.getZoom() >= this.MIN_ZOOM) {
						this.strategies[0].triggerRead =
							OpenLayers.Strategy.BBOX.prototype.triggerRead;
					} else {
						this.strategies[0].triggerRead = function(){};
						this.destroyFeatures();
					}
				}
				return OpenLayers.Layer.Vector.prototype.moveTo.apply (this, arguments);
			}
	}));


	//----------------------------------------------------------------------
        //      Open Data Hamburg Baudenkmale
        //----------------------------------------------------------------------
	if ( sprache == 'de' )
		map.addLayer (new OpenLayers.Layer.Vector("Hamburg Baudenkmal", {

			bgImage: false,

			//--------------------------------------------------------------------
			//	add style to features including a background image
			//--------------------------------------------------------------------

			preFeatureInsert: function(feature) {

				if (this.bgImage===false) {

					//----------------------------------------------------
					// returns "url(#id)" if SVG renderer
					//----------------------------------------------------

					this.bgImage = this.registerImage('/i/hatching_red_8x8.png', 8, 8);
				}

				feature.style = {

					strokeWidth: 2,
					strokeColor: 'red',
					fillColor: this.bgImage || 'red',
					fillOpacity: this.bgImage? 1.0 : 0.4,
					graphicTitle: feature.attributes.name
				};
			},
			sphericalMercator: true,
			positionInLayerChanger: 9,
			isBaseLayer: false,
			layerGroup: 'opendata',
			permaId: 'Nh',
			description: 'Freie und Hansestadt Hamburg, Kulturbehörde, (dl-de/by-2-0)',
			visibility: false,
			attribution:'<a href="https://transparenz.hamburg.de/"target="_blank">Freie und Hansestadt Hamburg, Kulturbehörde</a>, <a href="https://www.govdata.de/dl-de/by-2-0"target="_blank">(dl-de/by-2-0)</a>',
			strategies: [new OpenLayers.Strategy.BBOX({ratio: 1})],
			protocol: new OpenLayers.Protocol.HTTP({
				url: "../../../opendata/Baudenkmale-Hamburg.geojson",
				format: new OpenLayers.Format.GeoJSON({extractStyles: false})
			}),
    
    
			//----------------------------------------------------
			//	Label (tooltip)
			//----------------------------------------------------

			fontSize: 12,
			fontColor: 'blue',
			labelAlign: 'ct',
			labelYOffset: -10,
				
			//--------------------------------------------------------------------
			//	Zoombegrenzung
			//--------------------------------------------------------------------

			MIN_ZOOM: 14,

			moveTo: function (bounds, zoomChanged, dragging) {
				if (zoomChanged) {
					this.strategies[0].bounds = null;
					if (this.map.getZoom() >= this.MIN_ZOOM) {
						this.strategies[0].triggerRead =
							OpenLayers.Strategy.BBOX.prototype.triggerRead;
					} else {
						this.strategies[0].triggerRead = function(){};
						this.destroyFeatures();
					}
				}
				return OpenLayers.Layer.Vector.prototype.moveTo.apply (this, arguments);
			}
	}));
		

	//----------------------------------------------------------------------
        //      Open Data Hamburg Denkmal-Ensembles
        //----------------------------------------------------------------------
	if ( sprache == 'de' )	
		map.addLayer (new OpenLayers.Layer.Vector("Hamburg Denkmal-Ensemble", {
                        // projection: "EPSG:4326",
			positionInLayerChanger: 10,
			sphericalMercator: true,
			isBaseLayer: false,
			layerGroup: 'opendata',
			permaId: 'Ni',
			description: 'Freie und Hansestadt Hamburg, Kulturbehörde, (dl-de/by-2-0)',
			visibility: false,
			attribution:'<a href="https://transparenz.hamburg.de/"target="_blank">Freie und Hansestadt Hamburg, Kulturbehörde</a>, <a href="https://www.govdata.de/dl-de/by-2-0"target="_blank">(dl-de/by-2-0)</a>',
			strategies: [new OpenLayers.Strategy.BBOX({ratio: 1})],
			protocol: new OpenLayers.Protocol.HTTP({
				url: "../../../opendata/Denkmal-Ensembles-Hamburg.geojson",
				format: new OpenLayers.Format.GeoJSON({extractStyles: false})
			}),
			//--------------------------------------------------------------------
			//	style map
			//--------------------------------------------------------------------

			styleMap: new OpenLayers.StyleMap ({

				//------------------------------------------------------------
				//	default style
				//------------------------------------------------------------

				'default': new OpenLayers.Style ({
				    strokeColor: 'black',
				    strokeWidth: 0.5,
				    strokeOpacity: 0.7,
				    fillColor: 'peru',
				    fillOpacity: 0.3,
				    
				    //----------------------------------------------------
				    //	Label (tooltip)
				    //----------------------------------------------------
				    fontSize: 12,
				    fontColor: 'blue',
				    labelAlign: 'ct',
				    labelYOffset: -10
				})
			}),
		
			//--------------------------------------------------------------------
			//	Zoombegrenzung
			//--------------------------------------------------------------------

			MIN_ZOOM: 14,

			moveTo: function (bounds, zoomChanged, dragging) {
				if (zoomChanged) {
					this.strategies[0].bounds = null;
					if (this.map.getZoom() >= this.MIN_ZOOM) {
						this.strategies[0].triggerRead =
							OpenLayers.Strategy.BBOX.prototype.triggerRead;
					} else {
						this.strategies[0].triggerRead = function(){};
						this.destroyFeatures();
					}
				}
				return OpenLayers.Layer.Vector.prototype.moveTo.apply (this, arguments);
			}
	}));
		
	//----------------------------------------------------------------------
        //      Open Data Hamburg Denkmal-Gewaesser
        //----------------------------------------------------------------------
	if ( sprache == 'de' )	
		map.addLayer (new OpenLayers.Layer.Vector("Hamburg Denkmal-Gewaesser", {
                        // projection: "EPSG:4326",
			positionInLayerChanger: 11,
			sphericalMercator: true,
			isBaseLayer: false,
			layerGroup: 'opendata',
			permaId: 'Np',
			description: 'Freie und Hansestadt Hamburg, Kulturbehörde, (dl-de/by-2-0)',
			visibility: false,
			attribution:'<a href="https://transparenz.hamburg.de/"target="_blank">Freie und Hansestadt Hamburg, Kulturbehörde</a>, <a href="https://www.govdata.de/dl-de/by-2-0"target="_blank">(dl-de/by-2-0)</a>',
			strategies: [new OpenLayers.Strategy.BBOX({ratio: 1})],
			protocol: new OpenLayers.Protocol.HTTP({
				url: "../../../opendata/Denkmal-Gewaesser-Hamburg.geojson",
				format: new OpenLayers.Format.GeoJSON({extractStyles: false})
			}),
			//--------------------------------------------------------------------
			//	style map
			//--------------------------------------------------------------------

			styleMap: new OpenLayers.StyleMap ({

				//------------------------------------------------------------
				//	default style
				//------------------------------------------------------------

				'default': new OpenLayers.Style ({
					    strokeColor: 'black',
					    strokeWidth: 0.5,
					    strokeOpacity: 0.7,
					    fillColor: 'blue',
					    fillOpacity: 0.3,
				    
					    //----------------------------------------------------
					    //	Label (tooltip)
					    //----------------------------------------------------

					    fontSize: 12,
					    fontColor: 'red',
					    labelAlign: 'ct',
					    labelYOffset: -10

				})
			}),
		
			//--------------------------------------------------------------------
			//	Zoombegrenzung
			//--------------------------------------------------------------------

			MIN_ZOOM: 14,

			moveTo: function (bounds, zoomChanged, dragging) {
				if (zoomChanged) {
					this.strategies[0].bounds = null;
					if (this.map.getZoom() >= this.MIN_ZOOM) {
						this.strategies[0].triggerRead =
							OpenLayers.Strategy.BBOX.prototype.triggerRead;
					} else {
						this.strategies[0].triggerRead = function(){};
						this.destroyFeatures();
					}
				}
				return OpenLayers.Layer.Vector.prototype.moveTo.apply (this, arguments);
			}
	}));


	//----------------------------------------------------------------------
        //      Open Data Berlin Baudenkmal
        //----------------------------------------------------------------------
	if ( sprache == 'de' )	
		map.addLayer (new OpenLayers.Layer.Vector("Berlin Baudenkmal", {
			bgImage: false,

			//--------------------------------------------------------------------
			//	add style to features including a background image
			//--------------------------------------------------------------------

			preFeatureInsert: function(feature) {

				if (this.bgImage===false) {

					//----------------------------------------------------
					// returns "url(#id)" if SVG renderer
					//----------------------------------------------------

					this.bgImage = this.registerImage('../../../i/hatching_red_8x8.png', 8, 8);
				}

				feature.style = {

					strokeWidth: 2,
					strokeColor: 'red',
					fillColor: this.bgImage || 'red',
					fillOpacity: this.bgImage? 1.0 : 0.4,
					graphicTitle: feature.attributes.name
				};
			},

                        // projection: "EPSG:4326",
			positionInLayerChanger: 1,
			sphericalMercator: true,
			isBaseLayer: false,
			layerGroup: 'opendata',
			permaId: 'Nj',
			description: 'Landesdenkmalamt Berlin, GeoNutzV-Berlin',
			visibility: false,
			attribution:'<a href="https://daten.berlin.de/datensaetze?field_publisher_tid=1446"target="_blank">Landesdenkmalamt Berlin</a>, <a href="https://www.stadtentwicklung.berlin.de/geoinformation/download/nutzIII.pdf"target="_blank">GeoNutzV-Berlin</a>',
			strategies: [new OpenLayers.Strategy.BBOX({ratio: 1})],
			protocol: new OpenLayers.Protocol.HTTP({
				url: "../../../opendata/Baudenkmal-Berlin.geojson",
				format: new OpenLayers.Format.GeoJSON({extractStyles: false})
			}),
    
			//----------------------------------------------------
			//	Label (tooltip)
			//----------------------------------------------------

			fontSize: 16,
			fontColor: 'black',
			labelAlign: 'ct',
			labelYOffset: -10,
				
			//--------------------------------------------------------------------
			//	Zoombegrenzung
			//--------------------------------------------------------------------

			MIN_ZOOM: 14,

			moveTo: function (bounds, zoomChanged, dragging) {
				if (zoomChanged) {
					this.strategies[0].bounds = null;
					if (this.map.getZoom() >= this.MIN_ZOOM) {
						this.strategies[0].triggerRead =
							OpenLayers.Strategy.BBOX.prototype.triggerRead;
					} else {
						this.strategies[0].triggerRead = function(){};
						this.destroyFeatures();
					}
				}
				return OpenLayers.Layer.Vector.prototype.moveTo.apply (this, arguments);
			}
	}));
		

	//----------------------------------------------------------------------
        //      Open Data Bodendenkmale Berlin
        //----------------------------------------------------------------------
	if ( sprache == 'de' )	
		map.addLayer (new OpenLayers.Layer.Vector("Berlin Bodendenkmal", {
                        // projection: "EPSG:4326",
			positionInLayerChanger: 2,
			sphericalMercator: true,
			isBaseLayer: false,
			layerGroup: 'opendata',
			permaId: 'Nk',
			description: 'Landesdenkmalamt Berlin, GeoNutzV-Berlin',
			visibility: false,
			attribution:'<a href="https://daten.berlin.de/datensaetze?field_publisher_tid=1446"target="_blank">Landesdenkmalamt Berlin</a>, <a href="https://www.stadtentwicklung.berlin.de/geoinformation/download/nutzIII.pdf"target="_blank">GeoNutzV-Berlin</a>',
			strategies: [new OpenLayers.Strategy.BBOX({ratio: 1})],
			protocol: new OpenLayers.Protocol.HTTP({
				url: "../../../opendata/Bodendenkmal-Berlin.geojson",
				format: new OpenLayers.Format.GeoJSON({extractStyles: false})
			}),
			//--------------------------------------------------------------------
			//	style map
			//--------------------------------------------------------------------

			styleMap: new OpenLayers.StyleMap ({

				//------------------------------------------------------------
				//	default style
				//------------------------------------------------------------

				'default': new OpenLayers.Style ({
					    pointRadius: 10,
					    strokeColor: 'blue',
					    strokeWidth: 5,
					    strokeOpacity: 0.7,
					    fillColor: 'withe',
					    fillOpacity: 0.3,
				    
					    //----------------------------------------------------
					    //	Label (tooltip)
					    //----------------------------------------------------

					    fontSize: 16,
					    fontColor: 'black',
					    labelAlign: 'ct',
					    labelYOffset: -10

				})
			}),
		
			//--------------------------------------------------------------------
			//	Zoombegrenzung
			//--------------------------------------------------------------------

			MIN_ZOOM: 14,

			moveTo: function (bounds, zoomChanged, dragging) {
				if (zoomChanged) {
					this.strategies[0].bounds = null;
					if (this.map.getZoom() >= this.MIN_ZOOM) {
						this.strategies[0].triggerRead =
							OpenLayers.Strategy.BBOX.prototype.triggerRead;
					} else {
						this.strategies[0].triggerRead = function(){};
						this.destroyFeatures();
					}
				}
				return OpenLayers.Layer.Vector.prototype.moveTo.apply (this, arguments);
			}
	}));

		
	//----------------------------------------------------------------------
        //      Open Data Denkmal-Ensemble Berlin
        //----------------------------------------------------------------------
	if ( sprache == 'de' )	
		map.addLayer (new OpenLayers.Layer.Vector("Berlin Denkmal-Ensemble", {
                        // projection: "EPSG:4326",
			positionInLayerChanger: 3,
			sphericalMercator: true,
			isBaseLayer: false,
			layerGroup: 'opendata',
			permaId: 'Nl',
			description: 'Landesdenkmalamt Berlin, GeoNutzV-Berlin',
			visibility: false,
			attribution:'<a href="https://daten.berlin.de/datensaetze?field_publisher_tid=1446"target="_blank">Landesdenkmalamt Berlin</a>, <a href="https://www.stadtentwicklung.berlin.de/geoinformation/download/nutzIII.pdf"target="_blank">GeoNutzV-Berlin</a>',
			strategies: [new OpenLayers.Strategy.BBOX({ratio: 1})],
			protocol: new OpenLayers.Protocol.HTTP({
				url: "../../../opendata/Denkmal-Ensemble-Berlin.geojson",
				format: new OpenLayers.Format.GeoJSON({extractStyles: false})
			}),
			//--------------------------------------------------------------------
			//	style map
			//--------------------------------------------------------------------

			styleMap: new OpenLayers.StyleMap ({

				//------------------------------------------------------------
				//	default style
				//------------------------------------------------------------

				'default': new OpenLayers.Style ({
				    strokeColor: 'black',
				    strokeWidth: 0.5,
				    strokeOpacity: 0.7,
				    fillColor: 'peru',
				    fillOpacity: 0.3,
				    
				    //----------------------------------------------------
				    //	Label (tooltip)
				    //----------------------------------------------------

				    fontSize: 16,
				    fontColor: 'black',
				    labelAlign: 'ct',
				    labelYOffset: -10

				})
			}),
		
			//--------------------------------------------------------------------
			//	Zoombegrenzung
			//--------------------------------------------------------------------

			MIN_ZOOM: 14,

			moveTo: function (bounds, zoomChanged, dragging) {
				if (zoomChanged) {
					this.strategies[0].bounds = null;
					if (this.map.getZoom() >= this.MIN_ZOOM) {
						this.strategies[0].triggerRead =
							OpenLayers.Strategy.BBOX.prototype.triggerRead;
					} else {
						this.strategies[0].triggerRead = function(){};
						this.destroyFeatures();
					}
				}
				return OpenLayers.Layer.Vector.prototype.moveTo.apply (this, arguments);
			}
	}));
		

	//----------------------------------------------------------------------
        //      Open Data Gartendenkmal Berlin
        //----------------------------------------------------------------------
	if ( sprache == 'de' )	
		map.addLayer (new OpenLayers.Layer.Vector("Berlin Gartendenkmal", {
                        // projection: "EPSG:4326",
			positionInLayerChanger: 4,
			sphericalMercator: true,
			isBaseLayer: false,
			layerGroup: 'opendata',
			permaId: 'Nm',
			description: 'Landesdenkmalamt Berlin, GeoNutzV-Berlin',
			visibility: false,
			attribution:'<a href="https://daten.berlin.de/datensaetze?field_publisher_tid=1446"target="_blank">Landesdenkmalamt Berlin</a>, <a href="https://www.stadtentwicklung.berlin.de/geoinformation/download/nutzIII.pdf"target="_blank">GeoNutzV-Berlin</a>',
			strategies: [new OpenLayers.Strategy.BBOX({ratio: 1})],
			protocol: new OpenLayers.Protocol.HTTP({
				url: "../../../opendata/Gartendenkmal-Berlin.geojson",
				format: new OpenLayers.Format.GeoJSON({extractStyles: false})
			}),
			//--------------------------------------------------------------------
			//	style map
			//--------------------------------------------------------------------

			styleMap: new OpenLayers.StyleMap ({

				//------------------------------------------------------------
				//	default style
				//------------------------------------------------------------

				'default': new OpenLayers.Style ({
				    strokeColor: 'green',
				    strokeWidth: 5,
				    strokeOpacity: 0.7,
				    fillColor: 'green',
				    fillOpacity: 0.3,
				    
				    //----------------------------------------------------
				    //	Label (tooltip)
				    //----------------------------------------------------

				    fontSize: 16,
				    fontColor: 'black',
				    labelAlign: 'ct',
				    labelYOffset: -10

				})
			}),
		
			//--------------------------------------------------------------------
			//	Zoombegrenzung
			//--------------------------------------------------------------------

			MIN_ZOOM: 14,

			moveTo: function (bounds, zoomChanged, dragging) {
				if (zoomChanged) {
					this.strategies[0].bounds = null;
					if (this.map.getZoom() >= this.MIN_ZOOM) {
							OpenLayers.Strategy.BBOX.prototype.triggerRead;
					} else {
						this.strategies[0].triggerRead = function(){};
						this.destroyFeatures();
					}
				}
				return OpenLayers.Layer.Vector.prototype.moveTo.apply (this, arguments);
			}
	}));

		
	//----------------------------------------------------------------------
        //      Open Data Denkmal-Gesamtanlage-Berlin
        //----------------------------------------------------------------------
	if ( sprache == 'de' )	
		map.addLayer (new OpenLayers.Layer.Vector("Berlin Denkmal-Gesamtanlage", {
                        // projection: "EPSG:4326",
			positionInLayerChanger: 5,
			sphericalMercator: true,
			isBaseLayer: false,
			layerGroup: 'opendata',
			permaId: 'No',
			description: 'Landesdenkmalamt Berlin, GeoNutzV-Berlin',
			visibility: false,
			attribution:'<a href="https://daten.berlin.de/datensaetze?field_publisher_tid=1446"target="_blank">Landesdenkmalamt Berlin</a>, <a href="https://www.stadtentwicklung.berlin.de/geoinformation/download/nutzIII.pdf"target="_blank">GeoNutzV-Berlin</a>',
			strategies: [new OpenLayers.Strategy.BBOX({ratio: 1})],
			protocol: new OpenLayers.Protocol.HTTP({
				url: "../../../opendata/Denkmal-Gesamtanlage-Berlin.geojson",
				format: new OpenLayers.Format.GeoJSON({extractStyles: false})
			}),
			//--------------------------------------------------------------------
			//	style map
			//--------------------------------------------------------------------

			styleMap: new OpenLayers.StyleMap ({

				//------------------------------------------------------------
				//	default style
				//------------------------------------------------------------

				'default': new OpenLayers.Style ({
				    strokeColor: 'black',
				    strokeWidth: 0.5,
				    strokeOpacity: 0.7,
				    fillColor: 'sienna',
				    fillOpacity: 0.5,
				    
				    //----------------------------------------------------
				    //	Label (tooltip)
				    //----------------------------------------------------

				    fontSize: 16,
				    fontColor: 'black',
				    labelAlign: 'ct',
				    labelYOffset: -10

				})
			}),
			
			//--------------------------------------------------------------------
			//	Zoombegrenzung
			//--------------------------------------------------------------------

			MIN_ZOOM: 14,

			moveTo: function (bounds, zoomChanged, dragging) {
				if (zoomChanged) {
					this.strategies[0].bounds = null;
					if (this.map.getZoom() >= this.MIN_ZOOM) {
						this.strategies[0].triggerRead =
							OpenLayers.Strategy.BBOX.prototype.triggerRead;
					} else {
						this.strategies[0].triggerRead = function(){};
						this.destroyFeatures();
					}
				}
				return OpenLayers.Layer.Vector.prototype.moveTo.apply (this, arguments);
			}
	}));

